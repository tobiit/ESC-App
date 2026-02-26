import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { pool } from "../db/pool.js";

export const signAccessToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role, displayName: user.display_name }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessTtl
  });

export const signRefreshToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role }, config.jwt.refreshSecret, {
    expiresIn: `${config.jwt.refreshTtlDays}d`
  });

const extractBearer = (header) => {
  if (!header || !header.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length);
};

export const requireAuth = async (req, res, next) => {
  try {
    const token = extractBearer(req.headers.authorization);
    if (!token) return res.status(401).json({ message: "Nicht authentifiziert" });
    const payload = jwt.verify(token, config.jwt.accessSecret);
    req.auth = {
      sub: payload.sub,
      role: payload.role ? String(payload.role).trim().toLowerCase() : ""
    };
    const [user] = await pool.query(
      "SELECT id, role, username, display_name, is_active FROM users WHERE id = ? LIMIT 1",
      [payload.sub]
    );
    if (!user || !user.is_active) {
      return res.status(401).json({ message: "Benutzer deaktiviert oder nicht gefunden" });
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Token ungültig" });
  }
};

export const requireRole = (role) => (req, res, next) => {
  const roleFromUser = req.user?.role ? String(req.user.role).trim().toLowerCase() : "";
  const roleFromToken = req.auth?.role || "";
  if (!req.user || (roleFromUser !== role && roleFromToken !== role)) {
    return res.status(403).json({ message: "Keine Berechtigung" });
  }
  next();
};
