import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, "migrations");

const run = async () => {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      "CREATE TABLE IF NOT EXISTS schema_migrations (id VARCHAR(120) PRIMARY KEY, applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)"
    );
    const files = fs.readdirSync(migrationsDir).filter((file) => file.endsWith(".sql")).sort();
    for (const file of files) {
      const existing = await conn.query("SELECT id FROM schema_migrations WHERE id = ?", [file]);
      if (existing.length > 0) {
        continue;
      }
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      const statements = sql
        .split(";")
        .map((statement) => statement.trim())
        .filter((statement) => statement.length > 0);
      for (const statement of statements) {
        await conn.query(statement);
      }
      await conn.query("INSERT INTO schema_migrations (id) VALUES (?)", [file]);
      process.stdout.write(`Applied migration ${file}\n`);
    }
  } finally {
    conn.release();
    await pool.end();
  }
};

run().catch((error) => {
  process.stderr.write(`${error.stack}\n`);
  process.exit(1);
});
