import express from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";
import { buildRatingsReferenceRanking } from "../services/scoring.js";

export const eventsRouter = express.Router();

eventsRouter.get("/public/live", async (_req, res, next) => {
  try {
    const rows = await pool.query(
      `SELECT id, name, year, status, is_active AS isActive
       FROM events
       WHERE is_active = TRUE
       LIMIT 1`
    );

    if (!rows[0]) {
      return res.status(404).json({ message: "Kein aktives Event" });
    }

    const event = rows[0];
    event.isActive = Boolean(event.isActive);

    const [entries, participants, ratingItems] = await Promise.all([
      pool.query(
        `SELECT id, country_code AS countryCode, song_title AS songTitle, artist_name AS artistName, sort_order AS sortOrder
         FROM entries
         WHERE event_id = ?
         ORDER BY sort_order ASC, country_code ASC`,
        [event.id]
      ),
      pool.query(
        `SELECT u.id AS participantId,
                u.display_name AS displayName,
                CASE WHEN r.status = 'submitted' THEN TRUE ELSE FALSE END AS ratingSubmitted,
                CASE WHEN p.status = 'submitted' THEN TRUE ELSE FALSE END AS predictionSubmitted
         FROM users u
         LEFT JOIN ratings r ON r.event_id = ? AND r.participant_id = u.id
         LEFT JOIN predictions p ON p.event_id = ? AND p.participant_id = u.id
         WHERE u.role = 'participant'
           AND u.is_active = TRUE
           AND COALESCE(u.is_approved, TRUE) = TRUE
         ORDER BY u.display_name ASC`,
        [event.id, event.id]
      ),
      pool.query(
        `SELECT ri.entry_id, ri.points
         FROM rating_items ri
         JOIN ratings r ON r.id = ri.rating_id
         WHERE r.event_id = ? AND r.status = 'submitted'`,
        [event.id]
      )
    ]);

    const localRankingBase = buildRatingsReferenceRanking(
      entries.map((entry) => ({
        id: entry.id,
        countryCode: entry.countryCode,
        countryName: entry.countryCode
      })),
      ratingItems
    );

    const entriesById = new Map(entries.map((entry) => [Number(entry.id), entry]));
    const localRanking = localRankingBase.map((row) => {
      const entry = entriesById.get(Number(row.entryId));
      const votes = Object.values(row.counts || {}).reduce((sum, value) => sum + Number(value || 0), 0);

      return {
        entryId: Number(row.entryId),
        rank: Number(row.rank),
        countryCode: row.countryCode,
        artistName: entry?.artistName || "",
        songTitle: entry?.songTitle || "",
        votes,
        points: Number(row.total),
        counts: row.counts
      };
    });

    res.json({
      event,
      participants: participants.map((participant) => ({
        participantId: Number(participant.participantId),
        displayName: participant.displayName,
        ratingSubmitted: Boolean(participant.ratingSubmitted),
        predictionSubmitted: Boolean(participant.predictionSubmitted)
      })),
      localRanking,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

eventsRouter.get("/active", requireAuth, async (_req, res, next) => {
  try {
    const rows = await pool.query(
      "SELECT id, name, year, status, is_active AS isActive FROM events WHERE is_active = TRUE LIMIT 1"
    );
    if (!rows[0]) return res.status(404).json({ message: "Kein aktives Event" });
    const event = rows[0];
    event.isActive = Boolean(event.isActive); // MariaDB TINYINT zu Boolean konvertieren
    res.json(event);
  } catch (error) {
    next(error);
  }
});

eventsRouter.get("/:id/entries", requireAuth, async (req, res, next) => {
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
