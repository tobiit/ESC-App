import bcrypt from "bcryptjs";
import express from "express";
import { z } from "zod";
import { pool, withTx } from "../db/pool.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { writeAuditLog } from "../middleware/audit.js";
import { validateOfficialResultItems, validatePredictionItems, validateRatingItems } from "../services/validation.js";
import { getCountryNameDe, isValidCountryCode } from "../services/countries.js";

/** Countries von der Eurovision-API laden (ESC API gibt Codes bereits zurück) */
async function fetchEscCountries() {
  const resp = await fetch("https://eurovisionapi.runasp.net/api/countries");
  if (!resp.ok) return null;
  return resp.json();
}

/**
 * Lookup entry by country code, with fallback to any matching prefix
 * Falls back to old country_name for backward compatibility during migration
 * @param {string} countryIdentifier - Country code ("DE") or country name ("Deutschland")
 * @param {Map} codeMap - Map of country_code -> entryId
 * @returns {number|null} - Entry ID or null if not found
 */
function lookupEntryByCountry(countryIdentifier, codeMap) {
  if (!countryIdentifier) return null;
  const normalized = (countryIdentifier || "").toUpperCase().trim();
  
  // Try exact code match first
  if (codeMap.has(normalized)) return codeMap.get(normalized);
  
  // Fallback: try any code that starts with the identifier (for backward compat)
  for (const [code, id] of codeMap.entries()) {
    if (code.startsWith(normalized) || normalized.startsWith(code)) {
      return id;
    }
  }
  
  return null;
}

function resolveCountryName(code, countriesData) {
  const normalizedCode = String(code || "").toUpperCase().trim();
  if (!normalizedCode) return "Unbekannt";

  // First try local static mapping.
  const localName = getCountryNameDe(normalizedCode);
  if (localName && localName !== normalizedCode) return localName;

  // Fallback to ESC API country payload if available.
  if (Array.isArray(countriesData)) {
    const match = countriesData.find((country) => {
      const candidateCode = String(
        country?.code || country?.countryCode || country?.iso2 || country?.alpha2 || ""
      ).toUpperCase().trim();
      return candidateCode === normalizedCode;
    });
    const apiName = match?.nameDe || match?.name || match?.countryName;
    if (apiName) return String(apiName);
  }

  // Last resort: keep code visible instead of blank.
  return localName || normalizedCode;
}

export const adminRouter = express.Router();

adminRouter.use(requireAuth, requireRole("admin"));

const eventSchema = z.object({
  name: z.string().min(2),
  year: z.number().int().optional(),
  status: z.enum(["draft", "open", "locked", "finished"]).optional(),
  isActive: z.boolean().optional()
});

adminRouter.get("/participants", async (_req, res, next) => {
  try {
    const rows = await pool.query(
      "SELECT id, username, display_name AS displayName, full_name AS fullName, is_active AS isActive, is_approved AS isApproved, created_at AS createdAt FROM users WHERE role = 'participant' ORDER BY display_name ASC"
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// Get pending approval users
adminRouter.get("/participants/pending", async (_req, res, next) => {
  try {
    const rows = await pool.query(
      "SELECT id, username, display_name AS displayName, full_name AS fullName, created_at AS createdAt FROM users WHERE role = 'participant' AND is_approved = FALSE ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// Approve user
adminRouter.post("/participants/:id/approve", async (req, res, next) => {
  try {
    const userId = req.params.id;
    await pool.query("UPDATE users SET is_approved = TRUE WHERE id = ? AND role = 'participant'", [userId]);
    await writeAuditLog({
      actorUserId: req.user.id,
      actionType: "approve",
      entityType: "participant",
      entityId: userId
    });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

// Reject/delete user
adminRouter.delete("/participants/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    await pool.query("DELETE FROM users WHERE id = ? AND role = 'participant'", [userId]);
    await writeAuditLog({
      actorUserId: req.user.id,
      actionType: "delete",
      entityType: "participant",
      entityId: userId
    });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

// Bulk Upload Routes
adminRouter.post("/events/:id/entries/bulk", async (req, res, next) => {
  try {
    const schema = z.object({
      entries: z.array(z.object({
        country: z.string().min(1),
        song: z.string().optional(),
        artist: z.string().optional()
      }))
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    
    await withTx(async (conn) => {
      // Delete existing entries for this event
      await conn.query("DELETE FROM entries WHERE event_id = ?", [req.params.id]);
      
      // Insert new entries
      for (let i = 0; i < parsed.data.entries.length; i++) {
        const entry = parsed.data.entries[i];
        const countryCode = String(entry.country || "").toUpperCase().trim();
        if (!isValidCountryCode(countryCode)) {
          throw new Error(`Ungültiger Ländercode: ${entry.country}`);
        }
        const countryName = resolveCountryName(countryCode, null);
        await conn.query(
          "INSERT INTO entries (event_id, country_name, country_code, song_title, artist_name, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
          [req.params.id, countryName, countryCode, entry.song || null, entry.artist || null, i + 1]
        );
      }
    });
    
    res.status(201).json({ ok: true, count: parsed.data.entries.length });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/participants/bulk", async (req, res, next) => {
  try {
    const schema = z.object({
      participants: z.array(z.object({
        username: z.string().min(2),
        display_name: z.string().min(1),
        email: z.string().email().optional()
      }))
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    
    const defaultPassword = "Welcome123!";
    const hash = await bcrypt.hash(defaultPassword, 12);
    
    await withTx(async (conn) => {
      for (const participant of parsed.data.participants) {
        const existing = await conn.query("SELECT id FROM users WHERE username = ?", [participant.username]);
        if (existing.length > 0) continue;
        
        await conn.query(
          "INSERT INTO users (role, username, password_hash, display_name, is_active) VALUES ('participant', ?, ?, ?, TRUE)",
          [participant.username, hash, participant.display_name]
        );
      }
    });
    
    res.status(201).json({ ok: true, count: parsed.data.participants.length, defaultPassword });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/events/:id/predictions/bulk", async (req, res, next) => {
  try {
    const schema = z.object({
      rankings: z.array(z.object({
        username: z.string().min(1),
        country: z.string().min(1),
        rank: z.string().min(1)
      }))
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    
    await withTx(async (conn) => {
      const entryRows = await conn.query("SELECT id, country_code FROM entries WHERE event_id = ?", [req.params.id]);
      const codeMap = new Map(entryRows.map((row) => [row.country_code, Number(row.id)]));
      const entrySet = new Set(entryRows.map((row) => Number(row.id)));

      const byUser = {};
      for (const ranking of parsed.data.rankings) {
        if (!byUser[ranking.username]) byUser[ranking.username] = [];
        byUser[ranking.username].push(ranking);
      }

      for (const [username, rankings] of Object.entries(byUser)) {
        const userRows = await conn.query("SELECT id FROM users WHERE username = ? AND role = 'participant'", [username]);
        if (userRows.length === 0) continue;
        const userId = userRows[0].id;

        let predictionRows = await conn.query(
          "SELECT id FROM predictions WHERE event_id = ? AND participant_id = ?",
          [req.params.id, userId]
        );

        let predictionId;
        if (predictionRows.length === 0) {
          const result = await conn.query(
            "INSERT INTO predictions (event_id, participant_id, status) VALUES (?, ?, 'draft')",
            [req.params.id, userId]
          );
          predictionId = result.insertId;
        } else {
          predictionId = predictionRows[0].id;
        }

        const items = rankings.map((ranking) => {
          const entryId = lookupEntryByCountry(ranking.country, codeMap);
          if (!entryId) throw new Error(`Ungültiges Land: ${ranking.country}`);
          return { entryId, rank: Number(ranking.rank) };
        });
        validatePredictionItems(items, entrySet);

        await conn.query("DELETE FROM prediction_items WHERE prediction_id = ?", [predictionId]);
        for (const item of items) {
          await conn.query(
            "INSERT INTO prediction_items (prediction_id, entry_id, rank_position) VALUES (?, ?, ?)",
            [predictionId, item.entryId, item.rank]
          );
        }
      }
    });
    
    res.status(201).json({ ok: true, count: parsed.data.rankings.length });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/events/:id/ratings/bulk", async (req, res, next) => {
  try {
    const schema = z.object({
      ratings: z.array(z.object({
        username: z.string().min(1),
        country: z.string().min(1),
        points: z.string().min(1)
      }))
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    await withTx(async (conn) => {
      const entryRows = await conn.query("SELECT id, country_code FROM entries WHERE event_id = ?", [req.params.id]);
      const codeMap = new Map(entryRows.map((row) => [row.country_code, Number(row.id)]));
      const entrySet = new Set(entryRows.map((row) => Number(row.id)));

      const byUser = {};
      for (const rating of parsed.data.ratings) {
        if (!byUser[rating.username]) byUser[rating.username] = [];
        byUser[rating.username].push(rating);
      }

      for (const [username, ratings] of Object.entries(byUser)) {
        const userRows = await conn.query("SELECT id FROM users WHERE username = ? AND role = 'participant'", [username]);
        if (userRows.length === 0) continue;
        const userId = userRows[0].id;

        let ratingRows = await conn.query(
          "SELECT id FROM ratings WHERE event_id = ? AND participant_id = ?",
          [req.params.id, userId]
        );

        let ratingId;
        if (ratingRows.length === 0) {
          const result = await conn.query(
            "INSERT INTO ratings (event_id, participant_id, status) VALUES (?, ?, 'draft')",
            [req.params.id, userId]
          );
          ratingId = result.insertId;
        } else {
          ratingId = ratingRows[0].id;
        }

        const items = ratings.map((rating) => {
          const entryId = lookupEntryByCountry(rating.country, codeMap);
          if (!entryId) throw new Error(`Ungültiges Land: ${rating.country}`);
          return { entryId, points: Number(rating.points) };
        });
        validateRatingItems(items, entrySet);

        await conn.query("DELETE FROM rating_items WHERE rating_id = ?", [ratingId]);
        for (const item of items) {
          await conn.query(
            "INSERT INTO rating_items (rating_id, entry_id, points) VALUES (?, ?, ?)",
            [ratingId, item.entryId, item.points]
          );
        }
      }
    });

    res.status(201).json({ ok: true, count: parsed.data.ratings.length });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/events/:id/officialresult/bulk", async (req, res, next) => {
  try {
    const schema = z.object({
      results: z.array(z.object({
        country: z.string().min(1),
        rank: z.string().min(1)
      }))
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    await withTx(async (conn) => {
      const entryRows = await conn.query("SELECT id, country_code FROM entries WHERE event_id = ?", [req.params.id]);
      const codeMap = new Map(entryRows.map((row) => [row.country_code, Number(row.id)]));
      const entrySet = new Set(entryRows.map((row) => Number(row.id)));

      const items = parsed.data.results.map((result) => {
        const entryId = lookupEntryByCountry(result.country, codeMap);
        if (!entryId) throw new Error(`Ungültiges Land: ${result.country}`);
        return { entryId, rank: Number(result.rank) };
      });
      validatePredictionItems(items, entrySet);

      const existing = await conn.query("SELECT id FROM official_results WHERE event_id = ? LIMIT 1", [req.params.id]);
      let officialResultId = existing[0]?.id;
      if (!officialResultId) {
        await conn.query("INSERT INTO official_results (event_id, status) VALUES (?, 'unset')", [req.params.id]);
        const created = await conn.query("SELECT id FROM official_results WHERE event_id = ? LIMIT 1", [req.params.id]);
        officialResultId = created[0].id;
      }

      await conn.query("DELETE FROM official_result_items WHERE official_result_id = ?", [officialResultId]);
      for (const item of items) {
        await conn.query(
          "INSERT INTO official_result_items (official_result_id, entry_id, rank_position) VALUES (?, ?, ?)",
          [officialResultId, item.entryId, item.rank]
        );
      }
      await conn.query("UPDATE official_results SET status = 'set' WHERE id = ?", [officialResultId]);
    });

    res.status(201).json({ ok: true, count: parsed.data.results.length });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/participants", async (req, res, next) => {
  try {
    const schema = z.object({ username: z.string().min(2), password: z.string().min(6), displayName: z.string().min(1) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    const hash = await bcrypt.hash(parsed.data.password, 12);
    await pool.query(
      "INSERT INTO users (role, username, password_hash, display_name, is_active, is_approved) VALUES ('participant', ?, ?, ?, TRUE, TRUE)",
      [parsed.data.username, hash, parsed.data.displayName]
    );
    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/participants/:id", async (req, res, next) => {
  try {
    const schema = z.object({ displayName: z.string().min(1), isActive: z.boolean() });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    await pool.query("UPDATE users SET display_name = ?, is_active = ? WHERE id = ? AND role = 'participant'", [
      parsed.data.displayName,
      parsed.data.isActive,
      req.params.id
    ]);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/participants/:id/reset-password", async (req, res, next) => {
  try {
    const schema = z.object({ password: z.string().min(6) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    const hash = await bcrypt.hash(parsed.data.password, 12);
    await pool.query("UPDATE users SET password_hash = ? WHERE id = ? AND role = 'participant'", [hash, req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/events", async (_req, res, next) => {
  try {
    const rows = await pool.query(
      "SELECT id, name, year, status, is_active AS isActive, deleted_at AS deletedAt, created_at AS createdAt, updated_at AS updatedAt FROM events ORDER BY deleted_at IS NOT NULL ASC, id DESC"
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/events", async (req, res, next) => {
  try {
    const parsed = eventSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    await withTx(async (conn) => {
      if (parsed.data.isActive) {
        await conn.query("UPDATE events SET is_active = FALSE");
      }
      await conn.query("INSERT INTO events (name, year, status, is_active) VALUES (?, ?, ?, ?)", [
        parsed.data.name,
        parsed.data.year || null,
        parsed.data.status || "draft",
        parsed.data.isActive || false
      ]);
    });
    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/events/:id", async (req, res, next) => {
  try {
    const parsed = eventSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    await withTx(async (conn) => {
      if (parsed.data.isActive) {
        await conn.query("UPDATE events SET is_active = FALSE");
      }
      await conn.query(
        "UPDATE events SET name = ?, year = ?, status = ?, is_active = ? WHERE id = ?",
        [
          parsed.data.name,
          parsed.data.year || null,
          parsed.data.status || "draft",
          parsed.data.isActive || false,
          req.params.id
        ]
      );
    });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

/* ── Soft-delete / Restore ── */

adminRouter.post("/events/:id/soft-delete", async (req, res, next) => {
  try {
    const result = await pool.query(
      "UPDATE events SET deleted_at = NOW(), is_active = FALSE WHERE id = ? AND deleted_at IS NULL",
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Event nicht gefunden oder bereits gelöscht" });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/events/:id/restore", async (req, res, next) => {
  try {
    const result = await pool.query(
      "UPDATE events SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL",
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Event nicht gefunden oder nicht gelöscht" });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/events/:id/entries", async (req, res, next) => {
  try {
    const rows = await pool.query(
      `SELECT id, event_id AS eventId, country_code AS countryCode, song_title AS songTitle,
       artist_name AS artistName, sort_order AS sortOrder
       FROM entries WHERE event_id = ? ORDER BY sort_order ASC, country_code ASC`,
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/events/:id/entries", async (req, res, next) => {
  try {
    const schema = z.object({
      countryCode: z.string().length(2).toUpperCase(),
      songTitle: z.string().optional(),
      artistName: z.string().optional(),
      sortOrder: z.number().int()
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    if (!isValidCountryCode(parsed.data.countryCode)) {
      return res.status(400).json({ message: "Ungültiger Ländercode" });
    }
    await pool.query(
      "INSERT INTO entries (event_id, country_code, song_title, artist_name, sort_order) VALUES (?, ?, ?, ?, ?)",
      [req.params.id, parsed.data.countryCode, parsed.data.songTitle || null, parsed.data.artistName || null, parsed.data.sortOrder]
    );
    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/entries/:entryId", async (req, res, next) => {
  try {
    const schema = z.object({
      countryCode: z.string().length(2).toUpperCase(),
      songTitle: z.string().optional(),
      artistName: z.string().optional(),
      sortOrder: z.number().int()
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    if (!isValidCountryCode(parsed.data.countryCode)) {
      return res.status(400).json({ message: "Ungültiger Ländercode" });
    }
    const countryName = resolveCountryName(parsed.data.countryCode, null);
    await pool.query(
      "UPDATE entries SET country_name = ?, country_code = ?, song_title = ?, artist_name = ?, sort_order = ? WHERE id = ?",
      [countryName, parsed.data.countryCode, parsed.data.songTitle || null, parsed.data.artistName || null, parsed.data.sortOrder, req.params.entryId]
    );
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/entries/:entryId", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM entries WHERE id = ?", [req.params.entryId]);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/events/:id/ratings", async (req, res, next) => {
  try {
    const rows = await pool.query(
      `SELECT r.id, r.participant_id AS participantId, u.display_name AS displayName, r.status,
              r.submitted_at AS submittedAt, r.updated_at AS updatedAt
       FROM ratings r
       JOIN users u ON u.id = r.participant_id
       WHERE r.event_id = ?
       ORDER BY u.display_name ASC`,
      [req.params.id]
    );
    for (const row of rows) {
      row.items = await pool.query("SELECT entry_id AS entryId, points FROM rating_items WHERE rating_id = ?", [row.id]);
    }
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/events/:id/ratings/:participantId", async (req, res, next) => {
  try {
    const schema = z.object({
      status: z.enum(["draft", "submitted"]),
      items: z.array(z.object({ entryId: z.number(), points: z.number() }))
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    const entries = await pool.query("SELECT id FROM entries WHERE event_id = ?", [req.params.id]);
    const entrySet = new Set(entries.map((row) => Number(row.id)));
    validateRatingItems(parsed.data.items, entrySet);

    await withTx(async (conn) => {
      const rows = await conn.query(
        "SELECT id, status FROM ratings WHERE event_id = ? AND participant_id = ? LIMIT 1",
        [req.params.id, req.params.participantId]
      );
      let ratingId = rows[0]?.id;
      if (!ratingId) {
        await conn.query("INSERT INTO ratings (event_id, participant_id, status) VALUES (?, ?, 'draft')", [
          req.params.id,
          req.params.participantId
        ]);
        const created = await conn.query(
          "SELECT id FROM ratings WHERE event_id = ? AND participant_id = ? LIMIT 1",
          [req.params.id, req.params.participantId]
        );
        ratingId = created[0].id;
      }
      const before = await conn.query("SELECT entry_id, points FROM rating_items WHERE rating_id = ?", [ratingId]);
      await conn.query("DELETE FROM rating_items WHERE rating_id = ?", [ratingId]);
      for (const item of parsed.data.items) {
        await conn.query("INSERT INTO rating_items (rating_id, entry_id, points) VALUES (?, ?, ?)", [
          ratingId,
          item.entryId,
          item.points
        ]);
      }
      await conn.query("UPDATE ratings SET status = ?, submitted_at = IF(?='submitted', UTC_TIMESTAMP(), NULL) WHERE id = ?", [
        parsed.data.status,
        parsed.data.status,
        ratingId
      ]);
      await writeAuditLog({
        actorUserId: req.user.id,
        actionType: "ADMIN_RATING_OVERRIDE",
        entityType: "rating",
        entityId: ratingId,
        before,
        after: parsed.data
      });
    });

    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/events/:id/ratings/:participantId/reset", async (req, res, next) => {
  try {
    await withTx(async (conn) => {
      const rows = await conn.query(
        "SELECT id FROM ratings WHERE event_id = ? AND participant_id = ? LIMIT 1",
        [req.params.id, req.params.participantId]
      );
      if (!rows[0]) return;
      const ratingId = rows[0].id;
      const before = await conn.query("SELECT entry_id, points FROM rating_items WHERE rating_id = ?", [ratingId]);
      await conn.query("DELETE FROM rating_items WHERE rating_id = ?", [ratingId]);
      await conn.query("UPDATE ratings SET status = 'draft', submitted_at = NULL WHERE id = ?", [ratingId]);
      await writeAuditLog({
        actorUserId: req.user.id,
        actionType: "ADMIN_RATING_RESET",
        entityType: "rating",
        entityId: ratingId,
        before,
        after: []
      });
    });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/events/:id/predictions", async (req, res, next) => {
  try {
    const rows = await pool.query(
      `SELECT p.id, p.participant_id AS participantId, u.display_name AS displayName, p.status,
              p.submitted_at AS submittedAt, p.updated_at AS updatedAt
       FROM predictions p
       JOIN users u ON u.id = p.participant_id
       WHERE p.event_id = ?
       ORDER BY u.display_name ASC`,
      [req.params.id]
    );
    for (const row of rows) {
      row.items = await pool.query(
        "SELECT entry_id AS entryId, rank_position AS rank FROM prediction_items WHERE prediction_id = ? ORDER BY rank_position ASC",
        [row.id]
      );
    }
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/events/:id/predictions/:participantId", async (req, res, next) => {
  try {
    const schema = z.object({
      status: z.enum(["draft", "submitted"]),
      items: z.array(z.object({ entryId: z.number(), rank: z.number() }))
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    const entries = await pool.query("SELECT id FROM entries WHERE event_id = ?", [req.params.id]);
    const entrySet = new Set(entries.map((row) => Number(row.id)));
    validatePredictionItems(parsed.data.items, entrySet);

    await withTx(async (conn) => {
      const rows = await conn.query(
        "SELECT id FROM predictions WHERE event_id = ? AND participant_id = ? LIMIT 1",
        [req.params.id, req.params.participantId]
      );
      let predictionId = rows[0]?.id;
      if (!predictionId) {
        await conn.query("INSERT INTO predictions (event_id, participant_id, status) VALUES (?, ?, 'draft')", [
          req.params.id,
          req.params.participantId
        ]);
        const created = await conn.query(
          "SELECT id FROM predictions WHERE event_id = ? AND participant_id = ? LIMIT 1",
          [req.params.id, req.params.participantId]
        );
        predictionId = created[0].id;
      }
      const before = await conn.query(
        "SELECT entry_id, rank_position FROM prediction_items WHERE prediction_id = ?",
        [predictionId]
      );
      await conn.query("DELETE FROM prediction_items WHERE prediction_id = ?", [predictionId]);
      for (const item of parsed.data.items) {
        await conn.query("INSERT INTO prediction_items (prediction_id, entry_id, rank_position) VALUES (?, ?, ?)", [
          predictionId,
          item.entryId,
          item.rank
        ]);
      }
      await conn.query(
        "UPDATE predictions SET status = ?, submitted_at = IF(?='submitted', UTC_TIMESTAMP(), NULL) WHERE id = ?",
        [parsed.data.status, parsed.data.status, predictionId]
      );
      await writeAuditLog({
        actorUserId: req.user.id,
        actionType: "ADMIN_PREDICTION_OVERRIDE",
        entityType: "prediction",
        entityId: predictionId,
        before,
        after: parsed.data
      });
    });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/events/:id/predictions/:participantId/reset", async (req, res, next) => {
  try {
    await withTx(async (conn) => {
      const rows = await conn.query(
        "SELECT id FROM predictions WHERE event_id = ? AND participant_id = ? LIMIT 1",
        [req.params.id, req.params.participantId]
      );
      if (!rows[0]) return;
      const predictionId = rows[0].id;
      const before = await conn.query(
        "SELECT entry_id, rank_position FROM prediction_items WHERE prediction_id = ?",
        [predictionId]
      );
      await conn.query("DELETE FROM prediction_items WHERE prediction_id = ?", [predictionId]);
      await conn.query("UPDATE predictions SET status = 'draft', submitted_at = NULL WHERE id = ?", [predictionId]);
      await writeAuditLog({
        actorUserId: req.user.id,
        actionType: "ADMIN_PREDICTION_RESET",
        entityType: "prediction",
        entityId: predictionId,
        before,
        after: []
      });
    });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/events/:id/officialresult", async (req, res, next) => {
  try {
    const rows = await pool.query("SELECT id, status, updated_at AS updatedAt FROM official_results WHERE event_id = ? LIMIT 1", [
      req.params.id
    ]);
    if (!rows[0]) return res.json({ status: "unset", items: [] });
    const items = await pool.query(
      "SELECT entry_id AS entryId, rank_position AS rank FROM official_result_items WHERE official_result_id = ? ORDER BY rank_position ASC",
      [rows[0].id]
    );
    res.json({ ...rows[0], items });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/events/:id/officialresult", async (req, res, next) => {
  try {
    const schema = z.object({ items: z.array(z.object({ entryId: z.number(), rank: z.number() })) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    const entries = await pool.query("SELECT id FROM entries WHERE event_id = ?", [req.params.id]);
    const expected = new Set(entries.map((entry) => Number(entry.id)));
    validateOfficialResultItems(parsed.data.items, expected);

    await withTx(async (conn) => {
      const existing = await conn.query("SELECT id, status FROM official_results WHERE event_id = ? LIMIT 1", [
        req.params.id
      ]);
      let officialResultId = existing[0]?.id;
      if (!officialResultId) {
        await conn.query("INSERT INTO official_results (event_id, status) VALUES (?, 'unset')", [req.params.id]);
        const created = await conn.query("SELECT id FROM official_results WHERE event_id = ? LIMIT 1", [req.params.id]);
        officialResultId = created[0].id;
      }

      const before = await conn.query(
        "SELECT entry_id, rank_position FROM official_result_items WHERE official_result_id = ?",
        [officialResultId]
      );
      await conn.query("DELETE FROM official_result_items WHERE official_result_id = ?", [officialResultId]);
      for (const item of parsed.data.items) {
        await conn.query(
          "INSERT INTO official_result_items (official_result_id, entry_id, rank_position) VALUES (?, ?, ?)",
          [officialResultId, item.entryId, item.rank]
        );
      }
      await conn.query("UPDATE official_results SET status = 'set' WHERE id = ?", [officialResultId]);
      await writeAuditLog({
        actorUserId: req.user.id,
        actionType: "OFFICIAL_RESULT_SET",
        entityType: "official_result",
        entityId: officialResultId,
        before,
        after: parsed.data.items
      });
    });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

/* ── ESC API Import ── */

// Preview: Daten vom Eurovision-API abrufen ohne Import
adminRouter.get("/esc-import/preview/:year", async (req, res, next) => {
  try {
    const year = Number(req.params.year);
    if (!year || year < 1956 || year > 2100) {
      return res.status(400).json({ message: "Ungültiges Jahr" });
    }

    const [contestResp, countriesData] = await Promise.all([
      fetch(`https://eurovisionapi.runasp.net/api/senior/contests/${year}`),
      fetchEscCountries()
    ]);

    if (!contestResp.ok) {
      return res.status(404).json({ message: `Keine ESC-Daten für ${year} gefunden` });
    }

    const contest = await contestResp.json();
    const finalRound = contest.rounds?.find(r => r.name?.toLowerCase() === "final");
    if (!finalRound) {
      return res.status(404).json({ message: `Kein Finale für ${year} gefunden` });
    }

    const contestantMap = new Map(
      (contest.contestants || []).map(c => [c.id, c])
    );

    const entries = [];
    for (const perf of finalRound.performances || []) {
      const contestant = contestantMap.get(perf.contestantId);
      if (!contestant) continue;
      const code = (contestant.country || "").toUpperCase();
      const countryName = resolveCountryName(code, countriesData);
      entries.push({
        countryCode: code,
        country: countryName,
        countryName,
        artist: contestant.artist,
        song: contestant.song,
        sortOrder: perf.running,
        place: perf.place
      });
    }

    entries.sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));

    res.json({
      year,
      slogan: contest.slogan || `ESC ${year}`,
      finaleDate: finalRound.date || null,
      entries,
      entryCount: entries.length
    });
  } catch (error) {
    next(error);
  }
});

// Import: Event + Entries + Official Results anlegen
adminRouter.post("/esc-import", async (req, res, next) => {
  try {
    const schema = z.object({
      year: z.number().int().min(1956).max(2100),
      setActive: z.boolean().optional()
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    const { year, setActive } = parsed.data;

    const [contestResp, countriesData] = await Promise.all([
      fetch(`https://eurovisionapi.runasp.net/api/senior/contests/${year}`),
      fetchEscCountries()
    ]);

    if (!contestResp.ok) {
      return res.status(404).json({ message: `Keine ESC-Daten für ${year} gefunden` });
    }

    const contest = await contestResp.json();
    const finalRound = contest.rounds?.find(r => r.name?.toLowerCase() === "final");
    if (!finalRound) {
      return res.status(404).json({ message: `Kein Finale für ${year} gefunden` });
    }

    const contestantMap = new Map(
      (contest.contestants || []).map(c => [c.id, c])
    );

    const entries = [];
    for (const perf of finalRound.performances || []) {
      const contestant = contestantMap.get(perf.contestantId);
      if (!contestant) continue;
      const code = (contestant.country || "").toUpperCase();
      const countryName = resolveCountryName(code, countriesData);
      entries.push({
        countryCode: code,
        countryName,
        artist: contestant.artist || null,
        song: contestant.song || null,
        sortOrder: perf.running || 0,
        place: perf.place || null
      });
    }

    entries.sort((a, b) => a.sortOrder - b.sortOrder);
    const eventName = contest.slogan || `ESC ${year}`;

    let eventId;
    await withTx(async (conn) => {
      // Event anlegen
      if (setActive) {
        await conn.query("UPDATE events SET is_active = FALSE");
      }
      const eventResult = await conn.query(
        "INSERT INTO events (name, year, status, is_active) VALUES (?, ?, 'draft', ?)",
        [eventName, year, setActive || false]
      );
      eventId = Number(eventResult.insertId);

      // Entries anlegen
      for (const entry of entries) {
        // Validiere dass country_code gültig ist und in uppercase
        const code = (entry.countryCode || "").toUpperCase();
        if (!isValidCountryCode(code)) {
          console.warn(`Skipping invalid country code: ${entry.countryCode}`);
          continue;
        }
        const countryName = entry.countryName || resolveCountryName(code, countriesData);
        await conn.query(
          "INSERT INTO entries (event_id, country_name, country_code, song_title, artist_name, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
          [eventId, countryName, code, entry.song, entry.artist, entry.sortOrder]
        );
      }

      // Official Results anlegen (falls Platzierungen vorhanden)
      const hasResults = entries.some(e => e.place != null);
      if (hasResults) {
        await conn.query("INSERT INTO official_results (event_id, status) VALUES (?, 'unset')", [eventId]);
        const orRow = await conn.query("SELECT id FROM official_results WHERE event_id = ? LIMIT 1", [eventId]);
        const officialResultId = orRow[0].id;

        const entryRows = await conn.query("SELECT id, country_code FROM entries WHERE event_id = ?", [eventId]);
        const codeMap = new Map(entryRows.map(r => [r.country_code, Number(r.id)]));

        for (const entry of entries) {
          const rank = Number(entry.place);
          if (!Number.isInteger(rank) || rank < 1) continue;
          const entryId = lookupEntryByCountry(entry.countryCode, codeMap);
          if (!entryId) continue;
          await conn.query(
            "INSERT INTO official_result_items (official_result_id, entry_id, rank_position) VALUES (?, ?, ?)",
            [officialResultId, entryId, rank]
          );
        }
        await conn.query("UPDATE official_results SET status = 'set' WHERE id = ?", [officialResultId]);
      }

      await writeAuditLog({
        actorUserId: req.user.id,
        actionType: "ESC_IMPORT",
        entityType: "event",
        entityId: eventId,
        before: null,
        after: { year, eventName, entryCount: entries.length, hasResults }
      });
    });

    res.status(201).json({
      ok: true,
      eventId,
      eventName,
      entryCount: entries.length,
      hasResults: entries.some(e => e.place != null)
    });
  } catch (error) {
    next(error);
  }
});
