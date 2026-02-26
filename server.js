import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import SQLiteStoreFactory from "connect-sqlite3";
import { nanoid } from "nanoid";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const dataDir = path.join(__dirname, "data");
const uploadDir = path.join(__dirname, "uploads");
fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(uploadDir, { recursive: true });

const SQLiteStore = SQLiteStoreFactory(session);

app.use(express.json({ limit: "2mb" }));
app.use(
  session({
    store: new SQLiteStore({ db: "sessions.db", dir: dataDir }),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 6 }
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(uploadDir));

const db = await open({
  filename: path.join(dataDir, "quiz.db"),
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    access_password TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS person_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER NOT NULL,
    filename TEXT NOT NULL,
    orientation TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS group_people (
    group_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    sort_order INTEGER NOT NULL,
    PRIMARY KEY (group_id, person_id)
  );
  CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER NOT NULL,
    nickname TEXT NOT NULL,
    session_id TEXT NOT NULL,
    current_session_id INTEGER,
    last_active INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER NOT NULL,
    mode TEXT NOT NULL,
    state TEXT NOT NULL,
    per_person_seconds INTEGER NOT NULL,
    started_at INTEGER NOT NULL,
    ended_at INTEGER,
    current_index INTEGER NOT NULL,
    reveal INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS session_people (
    session_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    order_index INTEGER NOT NULL,
    PRIMARY KEY (session_id, person_id)
  );
  CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL,
    participant_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    answer_text TEXT NOT NULL,
    submitted_at INTEGER NOT NULL,
    UNIQUE (session_id, participant_id, person_id)
  );
`);

const upload = multer({ storage: multer.memoryStorage() });

const sessionStates = new Map();

const now = () => Date.now();
const fiveMinutesAgo = () => now() - 1000 * 60 * 5;

const ensureAdmin = (req, res, next) => {
  if (!req.session.admin) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

const ensureParticipant = async (req, res, next) => {
  if (!req.session.participantId) {
    return res.status(401).send("Unauthorized");
  }
  const participant = await db.get("SELECT last_active FROM participants WHERE id = ?", [
    req.session.participantId
  ]);
  if (!participant || participant.last_active < fiveMinutesAgo()) {
    req.session.destroy(() => {});
    return res.status(401).send("Session abgelaufen");
  }
  next();
};

const ITALIAN_WORDS = [
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "sabato",
  "domani",
  "pietra",
  "strada",
  "piazza",
  "barche",
  "cugina",
  "amiche",
  "canile",
  "giallo",
  "bianco",
  "scuola",
  "cucina",
  "lavoro",
  "sereno",
  "sicuro",
  "giusto"
];

const randomAccessPassword = () => {
  const pick = ITALIAN_WORDS[Math.floor(Math.random() * ITALIAN_WORDS.length)];
  return pick.toLowerCase();
};

const normalizeAccessPassword = (value) => {
  const trimmed = (value || "").trim();
  return trimmed ? trimmed.toLowerCase() : "";
};

const getActiveCount = async (groupId) => {
  const row = await db.get(
    "SELECT COUNT(*) as count FROM participants WHERE group_id = ? AND last_active >= ?",
    [groupId, fiveMinutesAgo()]
  );
  return row?.count || 0;
};

const getGroupRunning = async (groupId) => {
  const row = await db.get(
    "SELECT id FROM sessions WHERE group_id = ? AND state = 'running' ORDER BY started_at DESC LIMIT 1",
    [groupId]
  );
  return Boolean(row);
};

const getPersonPayload = async (personId) => {
  const person = await db.get("SELECT id, name FROM people WHERE id = ?", [personId]);
  const images = await db.all(
    "SELECT id, filename, orientation FROM person_images WHERE person_id = ? ORDER BY id ASC",
    [personId]
  );
  return {
    person,
    images: images.map((img) => ({
      id: img.id,
      url: `/uploads/${img.filename}`,
      orientation: img.orientation
    }))
  };
};

const buildResultsForParticipant = async (participantId, sessionId) => {
  const peopleRows = await db.all(
    "SELECT pe.id, pe.name FROM session_people sp JOIN people pe ON pe.id = sp.person_id WHERE sp.session_id = ? ORDER BY sp.order_index",
    [sessionId]
  );

  const items = [];
  for (const person of peopleRows) {
    const img = await db.get(
      "SELECT filename FROM person_images WHERE person_id = ? ORDER BY id ASC LIMIT 1",
      [person.id]
    );
    const answerRow = await db.get(
      "SELECT answer_text FROM answers WHERE session_id = ? AND participant_id = ? AND person_id = ?",
      [sessionId, participantId, person.id]
    );
    items.push({
      personName: person.name,
      answer: answerRow?.answer_text || "",
      thumbUrl: img ? `/uploads/${img.filename}` : ""
    });
  }

  return items;
};

const broadcastGroupStatus = async (groupId) => {
  const activeCount = await getActiveCount(groupId);
  const running = await getGroupRunning(groupId);
  io.to("admins").emit("groupStatus", { groupId, activeCount, running });
};

const cleanupParticipants = async () => {
  const stale = await db.all("SELECT id, group_id FROM participants WHERE last_active < ?", [fiveMinutesAgo()]);
  if (!stale.length) return;
  await db.run("UPDATE participants SET last_active = 0 WHERE last_active < ?", [fiveMinutesAgo()]);
  for (const row of stale) {
    await broadcastGroupStatus(row.group_id);
  }
};

setInterval(cleanupParticipants, 60 * 1000);

const emitCountdown = (groupId, seconds) => {
  io.to(`group-${groupId}`).emit("countdown", { seconds });
};

const startCountdown = async (state) => {
  if (state.countdownInterval) return;
  let seconds = 10;
  emitCountdown(state.groupId, seconds);
  state.countdownInterval = setInterval(() => {
    seconds -= 1;
    emitCountdown(state.groupId, seconds);
    if (seconds <= 0) {
      clearInterval(state.countdownInterval);
      state.countdownInterval = null;
      advancePerson(state.groupId);
    }
  }, 1000);
};

const advancePerson = async (groupId) => {
  const state = sessionStates.get(groupId);
  if (!state) return;
  state.currentIndex += 1;
  state.reveal = 0;
  clearTimeout(state.autoTimer);
  clearTimeout(state.countdownTimeout);
  clearInterval(state.countdownInterval);
  state.autoTimer = null;
  state.countdownTimeout = null;
  state.countdownInterval = null;

  if (state.currentIndex >= state.peopleIds.length) {
    await endSession(groupId);
    return;
  }

  await db.run(
    "UPDATE sessions SET current_index = ?, reveal = 0 WHERE id = ?",
    [state.currentIndex, state.sessionId]
  );

  const payload = await getPersonPayload(state.peopleIds[state.currentIndex]);
  io.to(`group-${groupId}`).emit("personChanged", payload);
  io.to("admins").emit("groupStatus", { groupId });

  if (state.mode === "auto") {
    scheduleAutoAdvance(state);
  }
};

const scheduleAutoAdvance = (state) => {
  const totalMs = state.perPersonSeconds * 1000;
  const countdownMs = Math.max(totalMs - 10000, 0);
  state.countdownTimeout = setTimeout(() => startCountdown(state), countdownMs);
  state.autoTimer = setTimeout(() => advancePerson(state.groupId), totalMs);
};

const endSession = async (groupId) => {
  const state = sessionStates.get(groupId);
  if (!state) return;
  clearTimeout(state.autoTimer);
  clearTimeout(state.countdownTimeout);
  clearInterval(state.countdownInterval);
  await db.run("UPDATE sessions SET state = 'ended', ended_at = ? WHERE id = ?", [now(), state.sessionId]);
  io.to(`group-${groupId}`).emit("sessionEnded", {});
  sessionStates.delete(groupId);
  await broadcastGroupStatus(groupId);
};

const startSession = async (groupId, mode, perPersonSeconds) => {
  const peopleRows = await db.all(
    "SELECT person_id FROM group_people WHERE group_id = ? ORDER BY sort_order ASC",
    [groupId]
  );
  if (!peopleRows.length) {
    throw new Error("Keine Personen in der Gruppe zugeordnet");
  }

  const peopleIds = peopleRows.map((row) => row.person_id);
  const sessionId = (await db.run(
    "INSERT INTO sessions (group_id, mode, state, per_person_seconds, started_at, current_index, reveal) VALUES (?, ?, 'running', ?, ?, 0, 0)",
    [groupId, mode, perPersonSeconds, now()]
  )).lastID;

  for (let i = 0; i < peopleIds.length; i += 1) {
    await db.run(
      "INSERT INTO session_people (session_id, person_id, order_index) VALUES (?, ?, ?)",
      [sessionId, peopleIds[i], i]
    );
  }

  await db.run(
    "UPDATE participants SET current_session_id = ? WHERE group_id = ?",
    [sessionId, groupId]
  );

  const state = {
    groupId,
    sessionId,
    mode,
    perPersonSeconds,
    currentIndex: 0,
    peopleIds,
    reveal: 0,
    autoTimer: null,
    countdownTimeout: null,
    countdownInterval: null
  };

  sessionStates.set(groupId, state);

  const payload = await getPersonPayload(peopleIds[0]);
  io.to(`group-${groupId}`).emit("sessionStarted", payload);
  await broadcastGroupStatus(groupId);

  if (mode === "auto") {
    scheduleAutoAdvance(state);
  }

  return sessionId;
};

app.post("/api/admin/login", async (req, res) => {
  const { password } = req.body;
  if (password !== config.adminPassword) {
    return res.status(401).send("Falsches Passwort");
  }
  req.session.admin = true;
  res.json({ ok: true });
});

app.post("/api/admin/logout", (req, res) => {
  req.session.destroy(() => {});
  res.json({ ok: true });
});

app.get("/api/admin/me", (req, res) => {
  res.json({ loggedIn: Boolean(req.session.admin) });
});

app.get("/api/admin/groups", ensureAdmin, async (req, res) => {
  const groups = await db.all("SELECT * FROM groups ORDER BY created_at DESC");
  const items = [];
  for (const group of groups) {
    items.push({
      ...group,
      activeCount: await getActiveCount(group.id),
      running: await getGroupRunning(group.id)
    });
  }
  res.json({ items });
});

app.post("/api/admin/groups", ensureAdmin, async (req, res) => {
  const name = req.body.name?.trim();
  if (!name) return res.status(400).send("Name erforderlich");
  const provided = normalizeAccessPassword(req.body.accessPassword);
  const accessPassword = provided || randomAccessPassword();
  await db.run(
    "INSERT INTO groups (name, access_password, created_at) VALUES (?, ?, ?)",
    [name, accessPassword, now()]
  );
  res.json({ ok: true });
});

app.patch("/api/admin/groups/:id", ensureAdmin, async (req, res) => {
  const name = req.body.name?.trim();
  const accessPassword = normalizeAccessPassword(req.body.accessPassword);
  if (name) {
    await db.run("UPDATE groups SET name = ? WHERE id = ?", [name, req.params.id]);
  }
  if (accessPassword) {
    await db.run("UPDATE groups SET access_password = ? WHERE id = ?", [accessPassword, req.params.id]);
  }
  res.json({ ok: true });
});

app.post("/api/admin/groups/:id/regen-password", ensureAdmin, async (req, res) => {
  const accessPassword = randomAccessPassword();
  await db.run("UPDATE groups SET access_password = ? WHERE id = ?", [accessPassword, req.params.id]);
  res.json({ ok: true, accessPassword });
});

app.get("/api/admin/people", ensureAdmin, async (req, res) => {
  const people = await db.all("SELECT * FROM people ORDER BY created_at DESC");
  const items = [];
  for (const person of people) {
    const count = await db.get("SELECT COUNT(*) as count FROM person_images WHERE person_id = ?", [person.id]);
    const groups = await db.all(
      `
        SELECT g.id, g.name
        FROM group_people gp
        JOIN groups g ON g.id = gp.group_id
        WHERE gp.person_id = ?
        ORDER BY g.name ASC
      `,
      [person.id]
    );
    items.push({ ...person, imageCount: count.count, groups });
  }
  res.json({ items });
});

app.get("/api/admin/people/:id", ensureAdmin, async (req, res) => {
  const person = await db.get("SELECT id, name FROM people WHERE id = ?", [req.params.id]);
  if (!person) return res.status(404).send("Person nicht gefunden");
  res.json({ person });
});

app.post("/api/admin/people", ensureAdmin, async (req, res) => {
  const name = req.body.name?.trim();
  if (!name) return res.status(400).send("Name erforderlich");
  await db.run("INSERT INTO people (name, created_at) VALUES (?, ?)", [name, now()]);
  res.json({ ok: true });
});

app.patch("/api/admin/people/:id", ensureAdmin, async (req, res) => {
  const name = req.body.name?.trim();
  await db.run("UPDATE people SET name = ? WHERE id = ?", [name, req.params.id]);
  res.json({ ok: true });
});

app.delete("/api/admin/people/:id", ensureAdmin, async (req, res) => {
  const personId = Number(req.params.id);
  const images = await db.all("SELECT filename FROM person_images WHERE person_id = ?", [personId]);

  await db.run("DELETE FROM answers WHERE person_id = ?", [personId]);
  await db.run("DELETE FROM session_people WHERE person_id = ?", [personId]);
  await db.run("DELETE FROM group_people WHERE person_id = ?", [personId]);
  await db.run("DELETE FROM person_images WHERE person_id = ?", [personId]);
  await db.run("DELETE FROM people WHERE id = ?", [personId]);

  images.forEach((img) => {
    const filePath = path.join(uploadDir, img.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  res.json({ ok: true });
});

app.post("/api/admin/people/:id/images", ensureAdmin, upload.array("images"), async (req, res) => {
  const orientations = req.body.orientations;
  const files = req.files || [];
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const orientationRaw = Array.isArray(orientations) ? orientations[i] : orientations;
    const orientation = orientationRaw === "landscape" ? "landscape" : "portrait";
    const { width, height } = orientation === "landscape" ? config.landscapeSize : config.portraitSize;
    const filename = `${nanoid(12)}.jpg`;
    await sharp(file.buffer).resize(width, height, { fit: "cover" }).jpeg({ quality: 82 }).toFile(path.join(uploadDir, filename));
    await db.run(
      "INSERT INTO person_images (person_id, filename, orientation, created_at) VALUES (?, ?, ?, ?)",
      [req.params.id, filename, orientation, now()]
    );
  }
  res.json({ ok: true });
});

app.get("/api/admin/people/:id/images", ensureAdmin, async (req, res) => {
  const images = await db.all(
    "SELECT id, filename, orientation FROM person_images WHERE person_id = ? ORDER BY id DESC",
    [req.params.id]
  );
  res.json({
    items: images.map((img) => ({
      id: img.id,
      url: `/uploads/${img.filename}`,
      orientation: img.orientation
    }))
  });
});

app.patch("/api/admin/images/:id", ensureAdmin, async (req, res) => {
  const orientation = req.body.orientation === "landscape" ? "landscape" : "portrait";
  const img = await db.get("SELECT filename FROM person_images WHERE id = ?", [req.params.id]);
  if (!img) return res.status(404).send("Bild nicht gefunden");
  const { width, height } = orientation === "landscape" ? config.landscapeSize : config.portraitSize;
  const filePath = path.join(uploadDir, img.filename);
  const tempPath = path.join(uploadDir, `${nanoid(6)}-${img.filename}`);
  await sharp(filePath).resize(width, height, { fit: "cover" }).jpeg({ quality: 82 }).toFile(tempPath);
  fs.renameSync(tempPath, filePath);
  await db.run("UPDATE person_images SET orientation = ? WHERE id = ?", [orientation, req.params.id]);
  res.json({ ok: true });
});

app.delete("/api/admin/images/:id", ensureAdmin, async (req, res) => {
  const img = await db.get("SELECT filename FROM person_images WHERE id = ?", [req.params.id]);
  if (!img) return res.status(404).send("Bild nicht gefunden");
  await db.run("DELETE FROM person_images WHERE id = ?", [req.params.id]);
  const filePath = path.join(uploadDir, img.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  res.json({ ok: true });
});

app.post("/api/admin/groups/:id/people", ensureAdmin, async (req, res) => {
  const personIds = req.body.personIds || [];
  await db.run("DELETE FROM group_people WHERE group_id = ?", [req.params.id]);
  for (let i = 0; i < personIds.length; i += 1) {
    await db.run(
      "INSERT INTO group_people (group_id, person_id, sort_order) VALUES (?, ?, ?)",
      [req.params.id, personIds[i], i]
    );
  }
  res.json({ ok: true });
});

app.post("/api/admin/groups/:groupId/people/:personId", ensureAdmin, async (req, res) => {
  const groupId = Number(req.params.groupId);
  const personId = Number(req.params.personId);
  const exists = await db.get(
    "SELECT 1 FROM group_people WHERE group_id = ? AND person_id = ?",
    [groupId, personId]
  );
  if (!exists) {
    const row = await db.get(
      "SELECT COALESCE(MAX(sort_order), -1) as maxOrder FROM group_people WHERE group_id = ?",
      [groupId]
    );
    const nextOrder = (row?.maxOrder ?? -1) + 1;
    await db.run(
      "INSERT INTO group_people (group_id, person_id, sort_order) VALUES (?, ?, ?)",
      [groupId, personId, nextOrder]
    );
  }
  res.json({ ok: true });
});

app.delete("/api/admin/groups/:groupId/people/:personId", ensureAdmin, async (req, res) => {
  await db.run("DELETE FROM group_people WHERE group_id = ? AND person_id = ?", [
    req.params.groupId,
    req.params.personId
  ]);
  res.json({ ok: true });
});

app.post("/api/admin/groups/:id/start-auto", ensureAdmin, async (req, res) => {
  try {
    const seconds = Math.max(Number(req.body.seconds) || 30, 15);
    await startSession(Number(req.params.id), "auto", seconds);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).send(err.message || "Start fehlgeschlagen");
  }
});

app.post("/api/admin/groups/:id/start-moderated", ensureAdmin, async (req, res) => {
  try {
    await startSession(Number(req.params.id), "moderated", 30);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).send(err.message || "Start fehlgeschlagen");
  }
});

app.post("/api/admin/groups/:id/reveal", ensureAdmin, async (req, res) => {
  const groupId = Number(req.params.id);
  const state = sessionStates.get(groupId);
  if (!state) return res.status(400).send("Keine aktive Sitzung");
  state.reveal = 1;
  await db.run("UPDATE sessions SET reveal = 1 WHERE id = ?", [state.sessionId]);
  const currentPersonId = state.peopleIds[state.currentIndex];
  const person = await db.get("SELECT name FROM people WHERE id = ?", [currentPersonId]);
  io.to(`group-${groupId}`).emit("reveal", { personName: person?.name || "" });
  res.json({ ok: true });
});

app.post("/api/admin/groups/:id/countdown", ensureAdmin, async (req, res) => {
  const groupId = Number(req.params.id);
  const state = sessionStates.get(groupId);
  if (!state) return res.status(400).send("Keine aktive Sitzung");
  await startCountdown(state);
  res.json({ ok: true });
});

app.post("/api/admin/groups/:id/next", ensureAdmin, async (req, res) => {
  await advancePerson(Number(req.params.id));
  res.json({ ok: true });
});

app.get("/api/admin/groups/:id/status", ensureAdmin, async (req, res) => {
  const groupId = Number(req.params.id);
  const state = sessionStates.get(groupId);
  const activeCount = await getActiveCount(groupId);
  if (!state) {
    const latest = await db.get(
      "SELECT id, state FROM sessions WHERE group_id = ? ORDER BY started_at DESC LIMIT 1",
      [groupId]
    );
    if (!latest) {
      return res.json({ state: "idle", activeCount, answersCount: 0 });
    }
    const results = await db.all(
      `
        SELECT p.nickname as participant, pe.name as person, a.answer_text as answer
        FROM answers a
        JOIN participants p ON p.id = a.participant_id
        JOIN people pe ON pe.id = a.person_id
        WHERE a.session_id = ?
        ORDER BY p.nickname ASC
      `,
      [latest.id]
    );
    return res.json({ state: latest.state, activeCount, answersCount: 0, results });
  }
  const currentPersonId = state.peopleIds[state.currentIndex];
  const person = await db.get("SELECT name FROM people WHERE id = ?", [currentPersonId]);
  const answersRow = await db.get(
    "SELECT COUNT(*) as count FROM answers WHERE session_id = ? AND person_id = ?",
    [state.sessionId, currentPersonId]
  );
  const results = await db.all(
    `
      SELECT p.nickname as participant, pe.name as person, a.answer_text as answer
      FROM answers a
      JOIN participants p ON p.id = a.participant_id
      JOIN people pe ON pe.id = a.person_id
      WHERE a.session_id = ?
      ORDER BY p.nickname ASC
    `,
    [state.sessionId]
  );
  res.json({
    state: "running",
    activeCount,
    currentPerson: person?.name,
    answersCount: answersRow.count,
    results
  });
});

app.get("/api/admin/sessions", ensureAdmin, async (req, res) => {
  const sessions = await db.all(
    `
      SELECT s.*, g.name as groupName
      FROM sessions s
      JOIN groups g ON g.id = s.group_id
      ORDER BY s.started_at DESC
      LIMIT 50
    `
  );
  const items = [];
  for (const sessionRow of sessions) {
    const count = await db.get("SELECT COUNT(*) as count FROM participants WHERE current_session_id = ?", [
      sessionRow.id
    ]);
    items.push({ ...sessionRow, participantCount: count.count });
  }
  res.json({ items });
});

app.post("/api/participant/join", async (req, res) => {
  const accessPassword = req.body.accessPassword?.trim().toLowerCase();
  const nickname = req.body.nickname?.trim();
  if (!accessPassword || !nickname) return res.status(400).send("Angaben fehlen");
  const group = await db.get("SELECT * FROM groups WHERE access_password = ?", [accessPassword]);
  if (!group) return res.status(404).send("Gruppe nicht gefunden");
  const result = await db.run(
    "INSERT INTO participants (group_id, nickname, session_id, last_active, created_at) VALUES (?, ?, ?, ?, ?)",
    [group.id, nickname, nanoid(8), now(), now()]
  );
  req.session.participantId = result.lastID;
  req.session.groupId = group.id;
  res.json({ participantId: result.lastID, groupId: group.id, groupName: group.name });
  await broadcastGroupStatus(group.id);
});

app.get("/api/participant/state", async (req, res) => {
  if (!req.session.participantId) {
    return res.json({ loggedIn: false });
  }
  const participant = await db.get("SELECT * FROM participants WHERE id = ?", [req.session.participantId]);
  if (!participant) {
    return res.json({ loggedIn: false });
  }
  await db.run("UPDATE participants SET last_active = ? WHERE id = ?", [now(), participant.id]);
  const state = sessionStates.get(participant.group_id);
  if (!state) {
    if (participant.current_session_id) {
      const sessionRow = await db.get("SELECT state FROM sessions WHERE id = ?", [participant.current_session_id]);
      if (sessionRow?.state === "ended") {
        const items = await buildResultsForParticipant(participant.id, participant.current_session_id);
        return res.json({
          loggedIn: true,
          status: "ended",
          participantId: participant.id,
          groupId: participant.group_id,
          items
        });
      }
    }
    return res.json({ loggedIn: true, status: "waiting", participantId: participant.id, groupId: participant.group_id });
  }
  if (state.currentIndex >= state.peopleIds.length) {
    return res.json({ loggedIn: true, status: "ended", participantId: participant.id, groupId: participant.group_id });
  }
  const current = await getPersonPayload(state.peopleIds[state.currentIndex]);
  res.json({
    loggedIn: true,
    status: "running",
    participantId: participant.id,
    groupId: participant.group_id,
    current
  });
});

app.post("/api/participant/answer", ensureParticipant, async (req, res) => {
  const participantId = req.session.participantId;
  const participant = await db.get("SELECT * FROM participants WHERE id = ?", [participantId]);
  if (!participant) return res.status(401).send("Unauthorized");
  await db.run("UPDATE participants SET last_active = ? WHERE id = ?", [now(), participantId]);

  const state = sessionStates.get(participant.group_id);
  if (!state) return res.status(400).send("Keine aktive Sitzung");
  const personId = Number(req.body.personId);
  const answer = req.body.answer?.trim();
  if (!answer) return res.status(400).send("Antwort fehlt");

  await db.run(
    `
      INSERT INTO answers (session_id, participant_id, person_id, answer_text, submitted_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(session_id, participant_id, person_id)
      DO UPDATE SET answer_text = excluded.answer_text, submitted_at = excluded.submitted_at
    `,
    [state.sessionId, participantId, personId, answer, now()]
  );

  await broadcastGroupStatus(participant.group_id);
  res.json({ ok: true });
});

app.get("/api/participant/results", ensureParticipant, async (req, res) => {
  const participantId = req.session.participantId;
  const participant = await db.get("SELECT * FROM participants WHERE id = ?", [participantId]);
  if (!participant) return res.status(401).send("Unauthorized");
  const sessionId = participant.current_session_id;
  if (!sessionId) return res.json({ items: [] });

  const items = await buildResultsForParticipant(participantId, sessionId);
  res.json({ items });
});

app.post("/api/participant/leave", ensureParticipant, async (req, res) => {
  const participantId = req.session.participantId;
  const participant = await db.get("SELECT * FROM participants WHERE id = ?", [participantId]);
  await db.run("UPDATE participants SET last_active = 0 WHERE id = ?", [participantId]);
  req.session.destroy(() => {});
  if (participant) {
    await broadcastGroupStatus(participant.group_id);
  }
  res.json({ ok: true });
});

io.on("connection", (socket) => {
  socket.on("join", async ({ role, groupId, participantId }) => {
    if (role === "participant") {
      socket.join(`group-${groupId}`);
      if (participantId) {
        await db.run("UPDATE participants SET last_active = ? WHERE id = ?", [now(), participantId]);
      }
    }
    if (role === "admin") {
      socket.join("admins");
    }
  });

  socket.on("heartbeat", async ({ participantId }) => {
    if (participantId) {
      await db.run("UPDATE participants SET last_active = ? WHERE id = ?", [now(), participantId]);
    }
  });
});

app.use((req, res) => {
  res.status(404).send("Not found");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
