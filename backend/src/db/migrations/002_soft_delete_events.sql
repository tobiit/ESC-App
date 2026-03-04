ALTER TABLE events ADD COLUMN deleted_at DATETIME NULL DEFAULT NULL;
CREATE INDEX idx_events_deleted ON events (deleted_at);
