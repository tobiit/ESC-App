CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  role ENUM('admin','participant') NOT NULL,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  failed_login_count INT NOT NULL DEFAULT 0,
  locked_until DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_role (role)
);

CREATE TABLE IF NOT EXISTS events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  year INT NULL,
  status ENUM('draft','open','locked','finished') NOT NULL DEFAULT 'draft',
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_events_active (is_active)
);

CREATE TABLE IF NOT EXISTS entries (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  event_id BIGINT NOT NULL,
  country_name VARCHAR(120) NOT NULL,
  song_title VARCHAR(200) NULL,
  artist_name VARCHAR(200) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_entries_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  UNIQUE KEY uq_event_country (event_id, country_name),
  INDEX idx_entries_event (event_id)
);

CREATE TABLE IF NOT EXISTS ratings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  event_id BIGINT NOT NULL,
  participant_id BIGINT NOT NULL,
  status ENUM('draft','submitted') NOT NULL DEFAULT 'draft',
  submitted_at DATETIME NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_ratings_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  CONSTRAINT fk_ratings_participant FOREIGN KEY (participant_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_rating_user_event (event_id, participant_id),
  INDEX idx_ratings_event_status (event_id, status)
);

CREATE TABLE IF NOT EXISTS rating_items (
  rating_id BIGINT NOT NULL,
  entry_id BIGINT NOT NULL,
  points INT NOT NULL,
  PRIMARY KEY (rating_id, entry_id),
  CONSTRAINT fk_rating_items_rating FOREIGN KEY (rating_id) REFERENCES ratings(id) ON DELETE CASCADE,
  CONSTRAINT fk_rating_items_entry FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE,
  UNIQUE KEY uq_rating_points (rating_id, points)
);

CREATE TABLE IF NOT EXISTS predictions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  event_id BIGINT NOT NULL,
  participant_id BIGINT NOT NULL,
  status ENUM('draft','submitted') NOT NULL DEFAULT 'draft',
  submitted_at DATETIME NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_predictions_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  CONSTRAINT fk_predictions_participant FOREIGN KEY (participant_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_prediction_user_event (event_id, participant_id),
  INDEX idx_predictions_event_status (event_id, status)
);

CREATE TABLE IF NOT EXISTS prediction_items (
  prediction_id BIGINT NOT NULL,
  entry_id BIGINT NOT NULL,
  rank_position INT NOT NULL,
  PRIMARY KEY (prediction_id, entry_id),
  CONSTRAINT fk_prediction_items_prediction FOREIGN KEY (prediction_id) REFERENCES predictions(id) ON DELETE CASCADE,
  CONSTRAINT fk_prediction_items_entry FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE,
  UNIQUE KEY uq_prediction_rank (prediction_id, rank_position)
);

CREATE TABLE IF NOT EXISTS official_results (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  event_id BIGINT NOT NULL UNIQUE,
  status ENUM('unset','set') NOT NULL DEFAULT 'unset',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_official_results_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS official_result_items (
  official_result_id BIGINT NOT NULL,
  entry_id BIGINT NOT NULL,
  rank_position INT NOT NULL,
  PRIMARY KEY (official_result_id, entry_id),
  CONSTRAINT fk_official_result_items_result FOREIGN KEY (official_result_id) REFERENCES official_results(id) ON DELETE CASCADE,
  CONSTRAINT fk_official_result_items_entry FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE,
  UNIQUE KEY uq_official_rank (official_result_id, rank_position)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_refresh_user_expiry (user_id, expires_at)
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  actor_user_id BIGINT NULL,
  action_type VARCHAR(80) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id VARCHAR(120) NOT NULL,
  before_json JSON NULL,
  after_json JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_actor FOREIGN KEY (actor_user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_audit_entity (entity_type, entity_id),
  INDEX idx_audit_actor (actor_user_id)
);
