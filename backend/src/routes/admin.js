import bcrypt from "bcryptjs";
import express from "express";
import { z } from "zod";
import { pool, withTx } from "../db/pool.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { writeAuditLog } from "../middleware/audit.js";
import { validatePredictionItems, validateRatingItems } from "../services/validation.js";

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
      "SELECT id, username, display_name AS displayName, is_active AS isActive, created_at AS createdAt FROM users WHERE role = 'participant' ORDER BY display_name ASC"
    );
    res.json(rows);
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
      "INSERT INTO users (role, username, password_hash, display_name, is_active) VALUES ('participant', ?, ?, ?, TRUE)",
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

adminRouter.delete("/participants/:id", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM users WHERE id = ? AND role = 'participant'", [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/events", async (_req, res, next) => {
  try {
    const rows = await pool.query(
      "SELECT id, name, year, status, is_active AS isActive, created_at AS createdAt, updated_at AS updatedAt FROM events ORDER BY id DESC"
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

adminRouter.get("/events/:id/entries", async (req, res, next) => {
  try {
    const rows = await pool.query(
      `SELECT id, event_id AS eventId, country_name AS countryName, song_title AS songTitle,
              artist_name AS artistName, sort_order AS sortOrder
       FROM entries WHERE event_id = ? ORDER BY sort_order ASC, country_name ASC`,
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/events/:id/entries", async (req, res, next) => {
  try {
    const schema = z.object({ countryName: z.string().min(1), songTitle: z.string().optional(), artistName: z.string().optional(), sortOrder: z.number().int() });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    await pool.query(
      "INSERT INTO entries (event_id, country_name, song_title, artist_name, sort_order) VALUES (?, ?, ?, ?, ?)",
      [req.params.id, parsed.data.countryName, parsed.data.songTitle || null, parsed.data.artistName || null, parsed.data.sortOrder]
    );
    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/entries/:entryId", async (req, res, next) => {
  try {
    const schema = z.object({ countryName: z.string().min(1), songTitle: z.string().optional(), artistName: z.string().optional(), sortOrder: z.number().int() });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });
    await pool.query(
      "UPDATE entries SET country_name = ?, song_title = ?, artist_name = ?, sort_order = ? WHERE id = ?",
      [parsed.data.countryName, parsed.data.songTitle || null, parsed.data.artistName || null, parsed.data.sortOrder, req.params.entryId]
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
    validatePredictionItems(parsed.data.items, expected);

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
