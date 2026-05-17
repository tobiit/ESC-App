import { pool } from "../db/pool.js";

const KEY_ACCESS_TTL_MINUTES = "session_access_ttl_minutes";
const KEY_WARNING_SECONDS = "session_warning_seconds";

const DEFAULT_ACCESS_TTL_MINUTES = 360;
const DEFAULT_WARNING_SECONDS = 30;
const MIN_ACCESS_TTL_MINUTES = 360;
const MAX_ACCESS_TTL_MINUTES = 60 * 24;
const MIN_WARNING_SECONDS = 5;
const MAX_WARNING_SECONDS = 5 * 60;

const cache = {
  loadedAt: 0,
  value: null
};

const parseIntSafe = (value, fallback) => {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const normalize = (rawAccessTtlMinutes, rawWarningSeconds) => {
  const accessTtlMinutes = clamp(
    parseIntSafe(rawAccessTtlMinutes, DEFAULT_ACCESS_TTL_MINUTES),
    MIN_ACCESS_TTL_MINUTES,
    MAX_ACCESS_TTL_MINUTES
  );
  const warningSeconds = clamp(
    parseIntSafe(rawWarningSeconds, DEFAULT_WARNING_SECONDS),
    MIN_WARNING_SECONDS,
    MAX_WARNING_SECONDS
  );
  return { accessTtlMinutes, warningSeconds };
};

const loadFromDb = async () => {
  const rows = await pool.query(
    "SELECT setting_key AS settingKey, setting_value AS settingValue FROM app_settings WHERE setting_key IN (?, ?)",
    [KEY_ACCESS_TTL_MINUTES, KEY_WARNING_SECONDS]
  );

  let rawAccessTtlMinutes = DEFAULT_ACCESS_TTL_MINUTES;
  let rawWarningSeconds = DEFAULT_WARNING_SECONDS;

  for (const row of rows) {
    if (row.settingKey === KEY_ACCESS_TTL_MINUTES) rawAccessTtlMinutes = row.settingValue;
    if (row.settingKey === KEY_WARNING_SECONDS) rawWarningSeconds = row.settingValue;
  }

  return normalize(rawAccessTtlMinutes, rawWarningSeconds);
};

export const getSessionSettings = async ({ force = false } = {}) => {
  const now = Date.now();
  if (!force && cache.value && now - cache.loadedAt < 30_000) {
    return cache.value;
  }

  const loaded = await loadFromDb();
  cache.value = loaded;
  cache.loadedAt = now;
  return loaded;
};

export const saveSessionSettings = async ({ accessTtlMinutes, warningSeconds }) => {
  const normalized = normalize(accessTtlMinutes, warningSeconds);

  await pool.query(
    `INSERT INTO app_settings (setting_key, setting_value)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = CURRENT_TIMESTAMP`,
    [KEY_ACCESS_TTL_MINUTES, String(normalized.accessTtlMinutes)]
  );
  await pool.query(
    `INSERT INTO app_settings (setting_key, setting_value)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = CURRENT_TIMESTAMP`,
    [KEY_WARNING_SECONDS, String(normalized.warningSeconds)]
  );

  cache.value = normalized;
  cache.loadedAt = Date.now();
  return normalized;
};

export const getAccessTokenTtlString = async () => {
  const settings = await getSessionSettings();
  return `${settings.accessTtlMinutes}m`;
};
