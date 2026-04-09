import bcrypt from "bcryptjs";
import { config } from "../config.js";
import { pool } from "./pool.js";

const run = async () => {
  const conn = await pool.getConnection();
  try {
    const existing = await conn.query("SELECT id FROM users WHERE username = ?", [
      config.adminBootstrap.username
    ]);
    if (existing.length > 0) {
      process.stdout.write("Bootstrap admin already exists\n");
      return;
    }
    const passwordHash = await bcrypt.hash(config.adminBootstrap.password, 12);
    await conn.query(
      `INSERT INTO users (role, username, password_hash, display_name, is_active, is_approved)
       VALUES ('admin', ?, ?, ?, TRUE, TRUE)`,
      [config.adminBootstrap.username, passwordHash, config.adminBootstrap.displayName]
    );
    process.stdout.write("Bootstrap admin created\n");
  } finally {
    conn.release();
    await pool.end();
  }
};

run().catch((error) => {
  process.stderr.write(`${error.stack}\n`);
  process.exit(1);
});
