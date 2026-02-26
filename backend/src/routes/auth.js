import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import express from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { config } from "../config.js";
import { pool } from "../db/pool.js";
import { signAccessToken, signRefreshToken } from "../middleware/auth.js";

export const authRouter = express.Router();

const loginLimiter = rateLimit({ windowMs: 60_000, max: 30, standardHeaders: true, legacyHeaders: false });

const loginSchema = z.object({ username: z.string().min(2), password: z.string().min(4) });

const hashRefreshToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const issueTokens = async (user) => {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  const payload = jwt.verify(refreshToken, config.jwt.refreshSecret);
  await pool.query("INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)", [
    user.id,
    hashRefreshToken(refreshToken),
    new Date(payload.exp * 1000)
  ]);
  return { accessToken, refreshToken };
};

const performLogin = async (req, res, expectedRole) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

  const { username, password } = parsed.data;
  const rows = await pool.query(
    "SELECT id, role, username, display_name, password_hash, is_active, failed_login_count, locked_until FROM users WHERE username = ? LIMIT 1",
    [username]
  );
  const user = rows[0];
  if (!user || user.role !== expectedRole) {
    return res.status(401).json({ message: "Anmeldung fehlgeschlagen" });
  }
  if (!user.is_active) {
    return res.status(403).json({ message: "Konto deaktiviert" });
  }
  if (user.locked_until && new Date(user.locked_until).getTime() > Date.now()) {
    return res.status(423).json({ message: "Konto vorübergehend gesperrt" });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    const nextCount = Number(user.failed_login_count || 0) + 1;
    const lockUntil = nextCount >= 8 ? new Date(Date.now() + 15 * 60_000) : null;
    await pool.query("UPDATE users SET failed_login_count = ?, locked_until = ? WHERE id = ?", [
      nextCount,
      lockUntil,
      user.id
    ]);
    return res.status(401).json({ message: "Anmeldung fehlgeschlagen" });
  }

  await pool.query("UPDATE users SET failed_login_count = 0, locked_until = NULL WHERE id = ?", [user.id]);
  const tokenPair = await issueTokens(user);
  return res.json({
    user: { id: user.id, role: user.role, username: user.username, displayName: user.display_name },
    ...tokenPair
  });
};

authRouter.post("/login", loginLimiter, async (req, res, next) => {
  try {
    await performLogin(req, res, "participant");
  } catch (error) {
    next(error);
  }
});

authRouter.post("/admin/login", loginLimiter, async (req, res, next) => {
  try {
    await performLogin(req, res, "admin");
  } catch (error) {
    next(error);
  }
});

authRouter.post("/refresh", async (req, res, next) => {
  try {
    const schema = z.object({ refreshToken: z.string().min(16) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    const { refreshToken } = parsed.data;
    const payload = jwt.verify(refreshToken, config.jwt.refreshSecret);
    const tokenHash = hashRefreshToken(refreshToken);

    const rows = await pool.query(
      "SELECT id, user_id, expires_at FROM refresh_tokens WHERE token_hash = ? AND user_id = ? LIMIT 1",
      [tokenHash, payload.sub]
    );
    const dbToken = rows[0];
    if (!dbToken || new Date(dbToken.expires_at).getTime() < Date.now()) {
      return res.status(401).json({ message: "Refresh ungültig" });
    }
    const userRows = await pool.query(
      "SELECT id, role, username, display_name, is_active FROM users WHERE id = ? LIMIT 1",
      [payload.sub]
    );
    const user = userRows[0];
    if (!user || !user.is_active) {
      return res.status(401).json({ message: "Benutzer ungültig" });
    }
    const accessToken = signAccessToken(user);
    return res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", async (req, res, next) => {
  try {
    const schema = z.object({ refreshToken: z.string().min(16) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(200).json({ ok: true });
    const tokenHash = hashRefreshToken(parsed.data.refreshToken);
    await pool.query("DELETE FROM refresh_tokens WHERE token_hash = ?", [tokenHash]);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});
