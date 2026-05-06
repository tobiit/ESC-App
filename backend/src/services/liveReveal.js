import { createHash, randomUUID } from "node:crypto";

export const REVEAL_POINT_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];

const toSeconds = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.floor(parsed);
};

const parseDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const toIso = (value) => {
  const date = parseDate(value);
  return date ? date.toISOString() : null;
};

const toLiveStateDto = (row) => ({
  eventId: Number(row.event_id),
  tipEndState: row.tip_end_state,
  tipEndSource: row.tip_end_source,
  tipEndCountdownStartedAt: toIso(row.tip_end_countdown_started_at),
  tipEndCountdownSeconds: Number(row.tip_end_countdown_seconds || 20),
  tipEndReachedAt: toIso(row.tip_end_reached_at),
  revealState: row.reveal_state,
  revealStartedAt: toIso(row.reveal_started_at),
  revealFinishedAt: toIso(row.reveal_finished_at),
  revealPointPauseSeconds: Number(row.reveal_point_pause_seconds || 5),
  revealParticipantPauseSeconds: Number(row.reveal_participant_pause_seconds || 30),
  winnerEntryId: row.winner_entry_id != null ? Number(row.winner_entry_id) : null,
  winnerReason: row.winner_reason || null,
  winnerTiebreakSeed: row.winner_tiebreak_seed || null,
  winnerResolvedAt: toIso(row.winner_resolved_at),
  updatedAt: toIso(row.updated_at)
});

const getNow = () => new Date();

const queryOne = async (db, sql, params = []) => {
  const rows = await db.query(sql, params);
  return rows[0] || null;
};

export const ensureEventLiveState = async (db, eventId) => {
  await db.query("INSERT IGNORE INTO event_live_state (event_id) VALUES (?)", [eventId]);
};

export const getEventLiveState = async (db, eventId) => {
  await ensureEventLiveState(db, eventId);
  const row = await queryOne(
    db,
    `SELECT event_id, tip_end_state, tip_end_source, tip_end_countdown_started_at, tip_end_countdown_seconds,
            tip_end_reached_at, reveal_state, reveal_started_at, reveal_finished_at,
            reveal_point_pause_seconds, reveal_participant_pause_seconds,
            winner_entry_id, winner_reason, winner_tiebreak_seed, winner_resolved_at, updated_at
       FROM event_live_state
      WHERE event_id = ?
      LIMIT 1`,
    [eventId]
  );
  return row ? toLiveStateDto(row) : null;
};

export const getSubmissionOverview = async (db, eventId) => {
  const row = await queryOne(
    db,
    `SELECT COUNT(*) AS totalParticipants,
            SUM(CASE WHEN COALESCE(r.status, 'draft') = 'submitted' AND COALESCE(p.status, 'draft') = 'submitted' THEN 1 ELSE 0 END) AS fullySubmitted
       FROM users u
       LEFT JOIN ratings r ON r.event_id = ? AND r.participant_id = u.id
       LEFT JOIN predictions p ON p.event_id = ? AND p.participant_id = u.id
      WHERE u.role = 'participant'
        AND u.is_active = TRUE
        AND COALESCE(u.is_approved, TRUE) = TRUE`,
    [eventId, eventId]
  );

  const totalParticipants = Number(row?.totalParticipants || 0);
  const fullySubmitted = Number(row?.fullySubmitted || 0);
  return {
    totalParticipants,
    fullySubmitted,
    allSubmitted: totalParticipants > 0 && fullySubmitted === totalParticipants
  };
};

export const syncCountdownState = async (db, eventId) => {
  await ensureEventLiveState(db, eventId);
  const updated = await db.query(
    `UPDATE event_live_state
        SET tip_end_state = 'reached',
            tip_end_reached_at = COALESCE(tip_end_reached_at, UTC_TIMESTAMP())
      WHERE event_id = ?
        AND tip_end_state = 'countdown'
        AND tip_end_countdown_started_at IS NOT NULL
        AND TIMESTAMPDIFF(SECOND, tip_end_countdown_started_at, UTC_TIMESTAMP()) >= tip_end_countdown_seconds`,
    [eventId]
  );
  return Number(updated?.affectedRows || 0) > 0;
};

export const maybeAutoStartTipEndCountdown = async (db, eventId) => {
  await ensureEventLiveState(db, eventId);
  const submission = await getSubmissionOverview(db, eventId);
  if (!submission.allSubmitted) return false;

  const updated = await db.query(
    `UPDATE event_live_state
        SET tip_end_state = 'countdown',
            tip_end_source = 'auto_all_submitted',
            tip_end_countdown_started_at = UTC_TIMESTAMP(),
            tip_end_reached_at = NULL
      WHERE event_id = ?
        AND tip_end_state = 'open'`,
    [eventId]
  );

  return Number(updated?.affectedRows || 0) > 0;
};

export const startTipEndCountdown = async (db, eventId, source = "admin") => {
  await ensureEventLiveState(db, eventId);
  const updated = await db.query(
    `UPDATE event_live_state
        SET tip_end_state = 'countdown',
            tip_end_source = ?,
            tip_end_countdown_started_at = UTC_TIMESTAMP(),
            tip_end_reached_at = NULL
      WHERE event_id = ?
        AND tip_end_state = 'open'`,
    [source, eventId]
  );
  return Number(updated?.affectedRows || 0) > 0;
};

export const cancelTipEndCountdown = async (db, eventId) => {
  await ensureEventLiveState(db, eventId);
  const updated = await db.query(
    `UPDATE event_live_state
        SET tip_end_state = 'open',
            tip_end_source = NULL,
            tip_end_countdown_started_at = NULL,
            tip_end_reached_at = NULL
      WHERE event_id = ?
        AND tip_end_state = 'countdown'
        AND tip_end_source = 'admin'`,
    [eventId]
  );
  return Number(updated?.affectedRows || 0) > 0;
};

export const updateLiveSettings = async (db, eventId, settings) => {
  await ensureEventLiveState(db, eventId);
  const participantPause = toSeconds(settings.revealParticipantPauseSeconds);
  const pointPause = toSeconds(settings.revealPointPauseSeconds);
  const countdown = toSeconds(settings.tipEndCountdownSeconds);

  await db.query(
    `UPDATE event_live_state
        SET reveal_participant_pause_seconds = ?,
            reveal_point_pause_seconds = ?,
            tip_end_countdown_seconds = ?
      WHERE event_id = ?`,
    [participantPause, pointPause, countdown, eventId]
  );
};

const buildStepPlan = (participants, ratingItemsByParticipant) => {
  const steps = [];

  for (const participant of participants) {
    const items = (ratingItemsByParticipant.get(participant.participantId) || [])
      .filter((item) => REVEAL_POINT_ORDER.includes(Number(item.points)))
      .sort((left, right) => REVEAL_POINT_ORDER.indexOf(Number(left.points)) - REVEAL_POINT_ORDER.indexOf(Number(right.points)));

    for (const item of items) {
      steps.push({
        participantId: participant.participantId,
        displayName: participant.displayName,
        entryId: Number(item.entryId),
        points: Number(item.points)
      });
    }
  }

  return steps;
};

const buildStepTimeline = (steps, participants, pointPauseSeconds, participantPauseSeconds) => {
  let cursorSeconds = 0;
  const participantStepCount = new Map();
  const participantOrder = participants.map((p) => p.participantId);
  for (const step of steps) {
    participantStepCount.set(step.participantId, (participantStepCount.get(step.participantId) || 0) + 1);
  }

  const remainingPerParticipant = new Map(participantStepCount);

  return steps.map((step, index) => {
    const startAt = cursorSeconds;
    const left = (remainingPerParticipant.get(step.participantId) || 1) - 1;
    remainingPerParticipant.set(step.participantId, left);

    const isLastForParticipant = left === 0;
    const isLastOverall = index === steps.length - 1;

    if (!isLastOverall) {
      if (isLastForParticipant) {
        cursorSeconds += participantPauseSeconds;
      } else {
        cursorSeconds += pointPauseSeconds;
      }
    }

    return {
      ...step,
      stepIndex: index,
      startAtSeconds: startAt
    };
  });
};

const buildRankingSnapshot = (entries, timeline, appliedStepCount) => {
  const pointsByEntry = new Map();
  const counts12ByEntry = new Map();

  for (const entry of entries) {
    pointsByEntry.set(entry.entryId, 0);
    counts12ByEntry.set(entry.entryId, 0);
  }

  for (let i = 0; i < appliedStepCount; i++) {
    const step = timeline[i];
    if (!step) continue;
    pointsByEntry.set(step.entryId, (pointsByEntry.get(step.entryId) || 0) + step.points);
    if (step.points === 12) {
      counts12ByEntry.set(step.entryId, (counts12ByEntry.get(step.entryId) || 0) + 1);
    }
  }

  const rows = entries
    .map((entry) => ({
      ...entry,
      points: pointsByEntry.get(entry.entryId) || 0,
      twelveCount: counts12ByEntry.get(entry.entryId) || 0
    }))
    .sort((left, right) => {
      if (right.points !== left.points) return right.points - left.points;
      if (right.twelveCount !== left.twelveCount) return right.twelveCount - left.twelveCount;
      return left.startOrder - right.startOrder;
    });

  return rows.map((row, index) => ({ ...row, rank: index + 1 }));
};

const resolveWinnerFromRanking = (rankingRows, seed) => {
  if (!rankingRows.length) return { winner: null, reason: null, seed };

  const topPoints = rankingRows[0].points;
  const topByPoints = rankingRows.filter((row) => row.points === topPoints);
  if (topByPoints.length === 1) {
    return { winner: topByPoints[0], reason: "points", seed };
  }

  const max12 = Math.max(...topByPoints.map((row) => row.twelveCount));
  const topBy12 = topByPoints.filter((row) => row.twelveCount === max12);
  if (topBy12.length === 1) {
    return { winner: topBy12[0], reason: "most_12s", seed };
  }

  const effectiveSeed = seed || randomUUID();
  const ordered = [...topBy12].sort((a, b) => a.entryId - b.entryId);
  const hash = createHash("sha256").update(effectiveSeed).digest("hex");
  const num = Number.parseInt(hash.slice(0, 12), 16);
  const winner = ordered[num % ordered.length];
  return { winner, reason: "random_tiebreak", seed: effectiveSeed };
};

export const buildRevealRuntime = (liveState, entries, participants, ratingItemsByParticipant, now = getNow()) => {
  const revealStartedAt = parseDate(liveState.revealStartedAt);
  const pointPauseSeconds = toSeconds(liveState.revealPointPauseSeconds || 5);
  const participantPauseSeconds = toSeconds(liveState.revealParticipantPauseSeconds || 30);

  const steps = buildStepPlan(participants, ratingItemsByParticipant);
  const timeline = buildStepTimeline(steps, participants, pointPauseSeconds, participantPauseSeconds);

  if (liveState.revealState === "finished") {
    const ranking = buildRankingSnapshot(entries, timeline, timeline.length);
    return {
      steps,
      timeline,
      totalSteps: timeline.length,
      appliedStepCount: timeline.length,
      activeStep: timeline[timeline.length - 1] || null,
      isFinished: true,
      ranking
    };
  }

  if (!revealStartedAt || liveState.revealState !== "running") {
    return {
      steps,
      timeline,
      totalSteps: timeline.length,
      appliedStepCount: 0,
      activeStep: null,
      isFinished: false,
      ranking: buildRankingSnapshot(entries, timeline, 0)
    };
  }

  const elapsedSeconds = Math.max(0, Math.floor((now.getTime() - revealStartedAt.getTime()) / 1000));
  let appliedStepCount = 0;
  let activeStep = null;

  for (const step of timeline) {
    if (elapsedSeconds >= step.startAtSeconds) {
      appliedStepCount += 1;
      activeStep = step;
    } else {
      break;
    }
  }

  const isFinished = appliedStepCount >= timeline.length && timeline.length > 0;
  const ranking = buildRankingSnapshot(entries, timeline, appliedStepCount);

  return {
    steps,
    timeline,
    totalSteps: timeline.length,
    appliedStepCount,
    activeStep,
    isFinished,
    ranking
  };
};

export const maybeFinalizeRevealAndWinner = async (db, eventId, liveState, rankingRows) => {
  if (liveState.revealState !== "running") return null;

  const { winner, reason, seed } = resolveWinnerFromRanking(rankingRows, liveState.winnerTiebreakSeed);

  await db.query(
    `UPDATE event_live_state
        SET reveal_state = 'finished',
            reveal_finished_at = COALESCE(reveal_finished_at, UTC_TIMESTAMP()),
            winner_entry_id = ?,
            winner_reason = ?,
            winner_tiebreak_seed = ?,
            winner_resolved_at = COALESCE(winner_resolved_at, UTC_TIMESTAMP())
      WHERE event_id = ?`,
    [winner?.entryId || null, reason, seed || null, eventId]
  );

  const next = await getEventLiveState(db, eventId);
  return {
    liveState: next,
    winner
  };
};

export const startReveal = async (db, eventId) => {
  await ensureEventLiveState(db, eventId);
  const updated = await db.query(
    `UPDATE event_live_state
        SET reveal_state = 'running',
            reveal_started_at = UTC_TIMESTAMP(),
            reveal_finished_at = NULL,
            winner_entry_id = NULL,
            winner_reason = NULL,
            winner_resolved_at = NULL
      WHERE event_id = ?
        AND reveal_state = 'idle'`,
    [eventId]
  );
  return Number(updated?.affectedRows || 0) > 0;
};

export const getCountdownRemainingSeconds = (liveState, now = getNow()) => {
  if (liveState.tipEndState !== "countdown") return 0;
  const started = parseDate(liveState.tipEndCountdownStartedAt);
  if (!started) return 0;
  const total = toSeconds(liveState.tipEndCountdownSeconds || 20);
  const elapsed = Math.floor((now.getTime() - started.getTime()) / 1000);
  return Math.max(0, total - elapsed);
};
