import express from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";
import {
  buildRevealRuntime,
  getCountdownRemainingSeconds,
  getEventLiveState,
  getSubmissionOverview,
  maybeAutoStartTipEndCountdown,
  maybeFinalizeRevealAndWinner,
  syncCountdownState
} from "../services/liveReveal.js";
import { getCountryNameDe } from "../services/countries.js";

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

    await syncCountdownState(pool, event.id);
    await maybeAutoStartTipEndCountdown(pool, event.id);
    await syncCountdownState(pool, event.id);

    const [entries, participants, ratingItems, liveStateRaw, submission] = await Promise.all([
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
        `SELECT ri.entry_id AS entryId, ri.points,
                r.participant_id AS participantId,
                u.display_name AS displayName
         FROM rating_items ri
         JOIN ratings r ON r.id = ri.rating_id
         JOIN users u ON u.id = r.participant_id
         WHERE r.event_id = ? AND r.status = 'submitted'`,
        [event.id]
      ),
      getEventLiveState(pool, event.id),
      getSubmissionOverview(pool, event.id)
    ]);

    let liveState = liveStateRaw;

    const revealEntries = entries.map((entry) => ({
      entryId: Number(entry.id),
      countryCode: entry.countryCode,
      artistName: entry.artistName || "",
      songTitle: entry.songTitle || "",
      startOrder: Number(entry.sortOrder || 0)
    }));

    const byParticipant = new Map();
    for (const item of ratingItems) {
      const participantId = Number(item.participantId);
      if (!byParticipant.has(participantId)) {
        byParticipant.set(participantId, {
          participantId,
          displayName: item.displayName || `Teilnehmer ${participantId}`
        });
      }
    }

    const revealParticipants = [...byParticipant.values()].sort((left, right) =>
      String(left.displayName).localeCompare(String(right.displayName), "de")
    );

    const ratingItemsByParticipant = new Map();
    for (const item of ratingItems) {
      const participantId = Number(item.participantId);
      if (!ratingItemsByParticipant.has(participantId)) ratingItemsByParticipant.set(participantId, []);
      ratingItemsByParticipant.get(participantId).push({ entryId: Number(item.entryId), points: Number(item.points) });
    }

    let revealRuntime = buildRevealRuntime(liveState, revealEntries, revealParticipants, ratingItemsByParticipant);

    if (liveState.revealState === "running" && revealRuntime.isFinished) {
      const finalized = await maybeFinalizeRevealAndWinner(pool, event.id, liveState, revealRuntime.ranking);
      if (finalized?.liveState) {
        liveState = finalized.liveState;
        revealRuntime = buildRevealRuntime(liveState, revealEntries, revealParticipants, ratingItemsByParticipant);
      }
    }

    const revealVotesByEntry = new Map();
    for (let i = 0; i < revealRuntime.appliedStepCount; i++) {
      const step = revealRuntime.timeline[i];
      if (!step) continue;
      revealVotesByEntry.set(step.entryId, (revealVotesByEntry.get(step.entryId) || 0) + 1);
    }

    const localRanking = revealRuntime.ranking.map((row) => ({
      entryId: Number(row.entryId),
      rank: Number(row.rank),
      countryCode: row.countryCode,
      artistName: row.artistName,
      songTitle: row.songTitle,
      votes: Number(revealVotesByEntry.get(row.entryId) || 0),
      points: Number(row.points)
    }));

    const countdownRemainingSeconds = getCountdownRemainingSeconds(liveState);

    const phase =
      liveState.revealState === "finished"
        ? "finished"
        : liveState.revealState === "running"
          ? "revealing"
          : liveState.tipEndState === "open"
            ? "collecting"
            : liveState.tipEndState === "countdown"
              ? "tip_end_countdown"
              : "post_tip_end_pre_reveal";

    const activeStep = revealRuntime.activeStep;
    const winnerRow =
      liveState.winnerEntryId != null
        ? localRanking.find((row) => Number(row.entryId) === Number(liveState.winnerEntryId))
        : null;

    res.json({
      event,
      phase,
      submission,
      liveState,
      countdownRemainingSeconds,
      participants: participants.map((participant) => ({
        participantId: Number(participant.participantId),
        displayName: participant.displayName,
        ratingSubmitted: Boolean(participant.ratingSubmitted),
        predictionSubmitted: Boolean(participant.predictionSubmitted)
      })),
      localRanking: liveState.tipEndState === "reached" || liveState.revealState !== "idle" ? localRanking : [],
      reveal: {
        state: liveState.revealState,
        activeParticipantId: activeStep ? Number(activeStep.participantId) : null,
        activeParticipantName: activeStep ? activeStep.displayName : null,
        currentStepIndex: revealRuntime.appliedStepCount,
        totalSteps: revealRuntime.totalSteps,
        currentAnnouncement: activeStep
          ? `${activeStep.displayName} vergibt ${activeStep.points} Punkte an ${
              getCountryNameDe(localRanking.find((row) => row.entryId === activeStep.entryId)?.countryCode || "")
            }`
          : null,
        winner: winnerRow
          ? {
              entryId: winnerRow.entryId,
              artistName: winnerRow.artistName,
              songTitle: winnerRow.songTitle,
              countryCode: winnerRow.countryCode,
              reason: liveState.winnerReason
            }
          : null
      },
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
