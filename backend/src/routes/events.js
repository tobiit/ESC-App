import express from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";

export const eventsRouter = express.Router();

eventsRouter.get("/active", requireAuth, async (_req, res, next) => {
  try {
    const rows = await pool.query(
      "SELECT id, name, year, status, is_active AS isActive FROM events WHERE is_active = TRUE LIMIT 1"
    );
    res.json(rows[0] || null);
  } catch (error) {
    next(error);
  }
});

eventsRouter.get("/:id/entries", requireAuth, async (req, res, next) => {
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
