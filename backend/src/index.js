import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config.js";
import { pool } from "./db/pool.js";
import { adminRouter } from "./routes/admin.js";
import { authRouter } from "./routes/auth.js";
import { eventsRouter } from "./routes/events.js";
import { participantRouter } from "./routes/participant.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

app.use("/auth", authRouter);
app.use("/events", eventsRouter);
app.use("/admin", adminRouter);
app.use(participantRouter);

app.use((error, _req, res, _next) => {
  const message = error?.message || "Interner Fehler";
  const status = error?.status || 500;
  if (config.nodeEnv !== "test") {
    process.stderr.write(`${error.stack || message}\n`);
  }
  res.status(status).json({ message });
});

app.listen(config.port, () => {
  process.stdout.write(`ESC backend listening on ${config.port}\n`);
});

export { app };
