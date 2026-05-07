import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import express from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { config } from "../config.js";
import { pool, withTx } from "../db/pool.js";
import { signAccessToken, signRefreshToken } from "../middleware/auth.js";

export const authRouter = express.Router();

const loginLimiter = rateLimit({ windowMs: 60_000, max: 30, standardHeaders: true, legacyHeaders: false });

const loginSchema = z.object({ username: z.string().min(2), password: z.string().min(4) });

const registrationSchema = z.object({
  displayName: z.string().min(2).max(120),
  fullName: z.string().min(2).max(120),
  username: z.string().min(3).max(64),
  password: z.string().min(6).max(100),
  acceptedTerms: z.boolean().refine(val => val === true, { message: "Nutzungsbedingungen müssen akzeptiert werden" })
});

const deleteAccountSchema = z.object({ username: z.string().min(2), password: z.string().min(4) });

const hashRefreshToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const validateParticipantCredentialsForDeletion = async (username, password) => {
  const rows = await pool.query(
    "SELECT id, role, username, password_hash, is_active FROM users WHERE username = ? LIMIT 1",
    [username]
  );
  const user = rows[0];
  if (!user || user.role !== "participant") {
    return { ok: false, status: 401, message: "Anmeldung fehlgeschlagen" };
  }

  if (!user.is_active) {
    return { ok: false, status: 400, message: "Konto ist bereits gelöscht oder deaktiviert" };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return { ok: false, status: 401, message: "Anmeldung fehlgeschlagen" };
  }

  return { ok: true, user };
};

const generateDeletedUsername = () => crypto.randomBytes(6).toString("hex");

const generateUniqueDeletedUsername = async (conn) => {
  for (let attempt = 0; attempt < 10; attempt++) {
    const candidate = generateDeletedUsername();
    const existing = await conn.query("SELECT id FROM users WHERE username = ? LIMIT 1", [candidate]);
    if (existing.length === 0) return candidate;
  }

  const fallback = `${Date.now().toString(36)}${crypto.randomBytes(4).toString("hex")}`
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 12);
  return fallback.padEnd(12, "0");
};

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
    "SELECT id, role, username, display_name, password_hash, is_active, is_approved, failed_login_count, locked_until FROM users WHERE username = ? LIMIT 1",
    [username]
  );
  const user = rows[0];
  if (!user || user.role !== expectedRole) {
    return res.status(401).json({ message: "Anmeldung fehlgeschlagen" });
  }
  if (!user.is_active) {
    return res.status(403).json({ message: "Konto deaktiviert" });
  }
  if (!user.is_approved) {
    return res.status(403).json({ message: "Ihr Konto muß noch durch einen Administrator freigegeben werden" });
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

authRouter.post("/register", loginLimiter, async (req, res, next) => {
  try {
    const parsed = registrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Ungültige Nutzdaten", errors: parsed.error.errors });
    }

    const { displayName, fullName, username, password } = parsed.data;

    // Check if username already exists
    const existing = await pool.query("SELECT id FROM users WHERE username = ? LIMIT 1", [username]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Benutzername bereits vergeben" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create participant user (requires admin approval)
    await pool.query(
      "INSERT INTO users (role, username, password_hash, display_name, full_name, is_active, is_approved) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ["participant", username, passwordHash, displayName, fullName, true, false]
    );

    return res.status(201).json({
      message: "Registrierung erfolgreich. Ihr Konto muß noch durch einen Administrator freigegeben werden."
    });
  } catch (error) {
    next(error);
  }
});

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

authRouter.post("/delete-account/verify", loginLimiter, async (req, res, next) => {
  try {
    const parsed = deleteAccountSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    const validation = await validateParticipantCredentialsForDeletion(parsed.data.username, parsed.data.password);
    if (!validation.ok) {
      return res.status(validation.status).json({ message: validation.message });
    }

    return res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/delete-account", loginLimiter, async (req, res, next) => {
  try {
    const parsed = deleteAccountSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Ungültige Nutzdaten" });

    const validation = await validateParticipantCredentialsForDeletion(parsed.data.username, parsed.data.password);
    if (!validation.ok) {
      return res.status(validation.status).json({ message: validation.message });
    }

    const userId = Number(validation.user.id);

    await withTx(async (conn) => {
      const anonymizedUsername = await generateUniqueDeletedUsername(conn);
      const disabledPasswordHash = await bcrypt.hash(crypto.randomUUID(), 12);

      await conn.query(
        `UPDATE users
            SET username = ?,
                password_hash = ?,
                display_name = 'Gelöscht',
                full_name = 'Gelöschter User',
                is_active = FALSE,
                is_approved = FALSE,
                failed_login_count = 0,
                locked_until = NULL
          WHERE id = ?`,
        [anonymizedUsername, disabledPasswordHash, userId]
      );

      await conn.query("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
    });

    return res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});
