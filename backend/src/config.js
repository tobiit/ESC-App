import dotenv from "dotenv";

dotenv.config();

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const config = {
  port: toInt(process.env.PORT, 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  db: {
    host: process.env.DB_HOST || "localhost",
    port: toInt(process.env.DB_PORT, 33306),
    user: process.env.DB_USER || "escapp",
    password: process.env.DB_PASSWORD || "escapp",
    database: process.env.DB_NAME || "escapp"
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "change-me-access",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "change-me-refresh",
    accessTtl: process.env.ACCESS_TOKEN_TTL || "15m",
    refreshTtlDays: toInt(process.env.REFRESH_TOKEN_TTL_DAYS, 30)
  },
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  adminBootstrap: {
    username: process.env.ADMIN_BOOTSTRAP_USERNAME || "admin",
    password: process.env.ADMIN_BOOTSTRAP_PASSWORD || "admin123",
    displayName: process.env.ADMIN_BOOTSTRAP_DISPLAY_NAME || "Administrator"
  }
};
