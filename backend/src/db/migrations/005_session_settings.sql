CREATE TABLE IF NOT EXISTS app_settings (
  setting_key VARCHAR(120) PRIMARY KEY,
  setting_value VARCHAR(255) NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO app_settings (setting_key, setting_value)
VALUES ('session_access_ttl_minutes', '360')
ON DUPLICATE KEY UPDATE setting_value = setting_value;

INSERT INTO app_settings (setting_key, setting_value)
VALUES ('session_warning_seconds', '30')
ON DUPLICATE KEY UPDATE setting_value = setting_value;
