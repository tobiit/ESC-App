ALTER TABLE event_live_state
  ADD COLUMN IF NOT EXISTS reveal_paused_at DATETIME NULL AFTER reveal_finished_at,
  ADD COLUMN IF NOT EXISTS reveal_paused_elapsed_seconds INT NOT NULL DEFAULT 0 AFTER reveal_paused_at;
