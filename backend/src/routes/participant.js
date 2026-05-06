import express from "express";
import { z } from "zod";
import { pool, withTx } from "../db/pool.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { writeAuditLog } from "../middleware/audit.js";
import { buildParticipantRanking, buildRatingsReferenceRanking } from "../services/scoring.js";
import {
  validatePredictionDraftItems,
  validatePredictionItems,
  validateRatingDraftItems,
  validateRatingItems
} from "../services/validation.js";
import { getEventLiveState, maybeAutoStartTipEndCountdown, syncCountdownState } from "../services/liveReveal.js";

export const participantRouter = express.Router();

participantRouter.use(requireAuth, requireRole("participant"));

const ensureEventExists = async (eventId) => {
  const rows = await pool.query("SELECT id, status FROM events WHERE id = ? LIMIT 1", [eventId]);
  return rows[0] || null;
};

const getEntrySet = async (eventId) => {
  const entries = await pool.query("SELECT id FROM entries WHERE event_id = ?", [eventId]);
  return new Set(entries.map((entry) => Number(entry.id)));
};

const getOrCreateRating = async (conn, eventId, participantId) => {
  const rows = await conn.query(
    "SELECT id, status, submitted_at FROM ratings WHERE event_id = ? AND participant_id = ? LIMIT 1",
    [eventId, participantId]
  );
  if (rows[0]) return rows[0];
  await conn.query("INSERT INTO ratings (event_id, participant_id, status) VALUES (?, ?, 'draft')", [
    eventId,
    participantId
  ]);
  const created = await conn.query(
    "SELECT id, status, submitted_at FROM ratings WHERE event_id = ? AND participant_id = ? LIMIT 1",
    [eventId, participantId]
  );
  return created[0];
};

const getOrCreatePrediction = async (conn, eventId, participantId) => {
  const rows = await conn.query(
    "SELECT id, status, submitted_at FROM predictions WHERE event_id = ? AND participant_id = ? LIMIT 1",
    [eventId, participantId]
  );
  if (rows[0]) return rows[0];
  await conn.query("INSERT INTO predictions (event_id, participant_id, status) VALUES (?, ?, 'draft')", [
    eventId,
    participantId
  ]);
  const created = await conn.query(
    "SELECT id, status, submitted_at FROM predictions WHERE event_id = ? AND participant_id = ? LIMIT 1",
    [eventId, participantId]
  );
  return created[0];
};

const ensureTipWindowOpen = async (eventId) => {
  await syncCountdownState(pool, eventId);
  const liveState = await getEventLiveState(pool, eventId);
  if (liveState?.tipEndState === "reached") {
    const error = new Error("Tippende wurde erreicht. Änderungen sind gesperrt.");
    error.status = 409;
    throw error;
  }
};

participantRouter.get("/events/:id/ratings/me", async (req, res, next) => {
  try {
    const rows = await pool.query(
      "SELECT id, status, submitted_at AS submittedAt, updated_at AS updatedAt FROM ratings WHERE event_id = ? AND participant_id = ? LIMIT 1",
      [req.params.id, req.user.id]
    );
    if (!rows[0]) return res.json({ status: "draft", items: [] });
    const items = await pool.query(
      "SELECT entry_id AS entryId, points FROM rating_items WHERE rating_id = ? ORDER BY points DESC",
      [rows[0].id]
    );
    res.json({ ...rows[0], items });
  } catch (error) {
    next(error);
  }
});

participantRouter.put("/events/:id/ratings/me", async (req, res, next) => {
  try {
    await ensureTipWindowOpen(req.params.id);
    const event = await ensureEventExists(req.params.id);
    if (!event) return res.status(404).json({ message: "Event nicht gefunden" });
    if (event.status !== "open") return res.status(409).json({ message: "Event ist nicht offen" });

    const schema = z.object({ items: z.array(z.object({ entryId: z.number(), points: z.number() })) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    const allowed = await getEntrySet(req.params.id);
    validateRatingDraftItems(parsed.data.items, allowed);

    const result = await withTx(async (conn) => {
      const rating = await getOrCreateRating(conn, req.params.id, req.user.id);
      if (rating.status === "submitted") {
        return { locked: true };
      }
      const before = await conn.query("SELECT entry_id, points FROM rating_items WHERE rating_id = ?", [rating.id]);
      await conn.query("DELETE FROM rating_items WHERE rating_id = ?", [rating.id]);
      for (const item of parsed.data.items) {
        await conn.query("INSERT INTO rating_items (rating_id, entry_id, points) VALUES (?, ?, ?)", [
          rating.id,
          item.entryId,
          item.points
        ]);
      }
      await conn.query("UPDATE ratings SET status = 'draft', submitted_at = NULL WHERE id = ?", [rating.id]);
      await writeAuditLog({
        actorUserId: req.user.id,
        actionType: "RATING_DRAFT_SAVED",
        entityType: "rating",
        entityId: rating.id,
        before,
        after: parsed.data.items
      });
      return { locked: false };
    });

    if (result.locked) {
      return res.status(409).json({ message: "Rating bereits eingereicht und gesperrt" });
    }
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

participantRouter.post("/events/:id/ratings/me/submit", async (req, res, next) => {
  try {
    await ensureTipWindowOpen(req.params.id);
    const event = await ensureEventExists(req.params.id);
    if (!event) return res.status(404).json({ message: "Event nicht gefunden" });
    if (!["open", "locked"].includes(event.status)) {
      return res.status(409).json({ message: "Einreichung aktuell nicht möglich" });
    }

    const allowed = await getEntrySet(req.params.id);
    const response = await withTx(async (conn) => {
      const rating = await getOrCreateRating(conn, req.params.id, req.user.id);
      if (rating.status === "submitted") {
        return { idempotent: true };
      }
      const items = await conn.query("SELECT entry_id AS entryId, points FROM rating_items WHERE rating_id = ?", [
        rating.id
      ]);
      validateRatingItems(items, allowed);
      await conn.query("UPDATE ratings SET status = 'submitted', submitted_at = UTC_TIMESTAMP() WHERE id = ?", [
        rating.id
      ]);
      await writeAuditLog({
        actorUserId: req.user.id,
        actionType: "RATING_SUBMITTED",
        entityType: "rating",
        entityId: rating.id,
        before: { status: "draft" },
        after: { status: "submitted" }
      });
      return { idempotent: false };
    });

    await maybeAutoStartTipEndCountdown(pool, req.params.id);
    await syncCountdownState(pool, req.params.id);

    res.json({ ok: true, idempotent: response.idempotent });
  } catch (error) {
    next(error);
  }
});

participantRouter.get("/events/:id/predictions/me", async (req, res, next) => {
  try {
    const rows = await pool.query(
      "SELECT id, status, submitted_at AS submittedAt, updated_at AS updatedAt FROM predictions WHERE event_id = ? AND participant_id = ? LIMIT 1",
      [req.params.id, req.user.id]
    );
    if (!rows[0]) return res.json({ status: "draft", items: [] });
    const items = await pool.query(
      "SELECT entry_id AS entryId, rank_position AS rank FROM prediction_items WHERE prediction_id = ? ORDER BY rank_position ASC",
      [rows[0].id]
    );
    res.json({ ...rows[0], items });
  } catch (error) {
    next(error);
  }
});

participantRouter.put("/events/:id/predictions/me", async (req, res, next) => {
  try {
    await ensureTipWindowOpen(req.params.id);
    const event = await ensureEventExists(req.params.id);
    if (!event) return res.status(404).json({ message: "Event nicht gefunden" });
    if (event.status !== "open") return res.status(409).json({ message: "Event ist nicht offen" });

    const schema = z.object({ items: z.array(z.object({ entryId: z.number(), rank: z.number() })) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    const allowed = await getEntrySet(req.params.id);
    validatePredictionDraftItems(parsed.data.items, allowed);

    const result = await withTx(async (conn) => {
      const prediction = await getOrCreatePrediction(conn, req.params.id, req.user.id);
      if (prediction.status === "submitted") {
        return { locked: true };
      }
      const before = await conn.query("SELECT entry_id, rank_position FROM prediction_items WHERE prediction_id = ?", [
        prediction.id
      ]);
      await conn.query("DELETE FROM prediction_items WHERE prediction_id = ?", [prediction.id]);
      for (const item of parsed.data.items) {
        await conn.query("INSERT INTO prediction_items (prediction_id, entry_id, rank_position) VALUES (?, ?, ?)", [
          prediction.id,
          item.entryId,
          item.rank
        ]);
      }
      await conn.query("UPDATE predictions SET status = 'draft', submitted_at = NULL WHERE id = ?", [prediction.id]);
      await writeAuditLog({
        actorUserId: req.user.id,
        actionType: "PREDICTION_DRAFT_SAVED",
        entityType: "prediction",
        entityId: prediction.id,
        before,
        after: parsed.data.items
      });
      return { locked: false };
    });

    if (result.locked) {
      return res.status(409).json({ message: "Prediction bereits eingereicht und gesperrt" });
    }
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

participantRouter.post("/events/:id/predictions/me/submit", async (req, res, next) => {
  try {
    await ensureTipWindowOpen(req.params.id);
    const event = await ensureEventExists(req.params.id);
    if (!event) return res.status(404).json({ message: "Event nicht gefunden" });
    if (!["open", "locked"].includes(event.status)) {
      return res.status(409).json({ message: "Einreichung aktuell nicht möglich" });
    }

    const allowed = await getEntrySet(req.params.id);
    const response = await withTx(async (conn) => {
      const prediction = await getOrCreatePrediction(conn, req.params.id, req.user.id);
      if (prediction.status === "submitted") {
        return { idempotent: true };
      }
      const items = await conn.query(
        "SELECT entry_id AS entryId, rank_position AS rank FROM prediction_items WHERE prediction_id = ?",
        [prediction.id]
      );
      validatePredictionItems(items, allowed);
      await conn.query("UPDATE predictions SET status = 'submitted', submitted_at = UTC_TIMESTAMP() WHERE id = ?", [
        prediction.id
      ]);
      await writeAuditLog({
        actorUserId: req.user.id,
        actionType: "PREDICTION_SUBMITTED",
        entityType: "prediction",
        entityId: prediction.id,
        before: { status: "draft" },
        after: { status: "submitted" }
      });
      return { idempotent: false };
    });

    await maybeAutoStartTipEndCountdown(pool, req.params.id);
    await syncCountdownState(pool, req.params.id);

    res.json({ ok: true, idempotent: response.idempotent });
  } catch (error) {
    next(error);
  }
});

participantRouter.get("/events/:id/results", async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    const entries = await pool.query(
      "SELECT id, country_code FROM entries WHERE event_id = ? ORDER BY sort_order ASC, country_code ASC",
      [eventId]
    );
    if (entries.length === 0) {
      return res.status(400).json({ message: "Keine Entries für Event" });
    }

    const ratingItems = await pool.query(
      `SELECT ri.entry_id, ri.points
       FROM rating_items ri
       JOIN ratings r ON r.id = ri.rating_id
       WHERE r.event_id = ? AND r.status = 'submitted'`,
      [eventId]
    );
    const ratingRanking = buildRatingsReferenceRanking(entries, ratingItems);

    const participantPredictions = await pool.query(
      `SELECT p.id AS prediction_id, p.participant_id, u.display_name
       FROM predictions p
       JOIN users u ON u.id = p.participant_id
       WHERE p.event_id = ? AND p.status = 'submitted'`,
      [eventId]
    );

    const predictionsWithItems = [];
    for (const row of participantPredictions) {
      const items = await pool.query(
        "SELECT entry_id, rank_position FROM prediction_items WHERE prediction_id = ?",
        [row.prediction_id]
      );
      predictionsWithItems.push({ ...row, items });
    }

    const leaderboardA = buildParticipantRanking(predictionsWithItems, ratingRanking, entries);

    const officialRows = await pool.query(
      "SELECT id FROM official_results WHERE event_id = ? AND status = 'set' LIMIT 1",
      [eventId]
    );

    let officialRanking = [];
    let leaderboardB = [];
    if (officialRows[0]) {
      officialRanking = await pool.query(
        `SELECT ori.entry_id AS entryId, ori.rank_position AS rank, e.country_code AS countryCode
         FROM official_result_items ori
         JOIN entries e ON e.id = ori.entry_id
         WHERE ori.official_result_id = ?
         ORDER BY ori.rank_position ASC`,
        [officialRows[0].id]
      );
      leaderboardB = buildParticipantRanking(predictionsWithItems, officialRanking, entries);
    }

    const meA = leaderboardA.find((row) => row.participantId === Number(req.user.id)) || null;
    const meB = leaderboardB.find((row) => row.participantId === Number(req.user.id)) || null;

    res.json({
      ratingRanking,
      leaderboardA,
      top3A: leaderboardA.slice(0, 3),
      officialRanking,
      leaderboardB,
      top3B: leaderboardB.slice(0, 3),
      me: {
        scoreAgainstRatingsRanking: meA,
        scoreAgainstOfficialRanking: meB
      }
    });
  } catch (error) {
    next(error);
  }
});
