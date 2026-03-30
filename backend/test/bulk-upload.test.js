import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../src/index.js";
import { pool } from "../src/db/pool.js";

describe("Admin Bulk Upload API", () => {
  let adminToken = "";
  let eventId = 0;
  let dbReady = false;
  const fullEntries = [
    { country: "SE", song: "Unicorn", artist: "Jane Doe" },
    { country: "DE", song: "Fireworks", artist: "Max Mustermann" },
    { country: "IT", song: "Amore", artist: "Maria Rossi" },
    { country: "FR", song: "Chanson", artist: "Pierre Dubois" },
    { country: "NO", song: "Storm", artist: "Lena Nord" },
    { country: "ES", song: "Luz", artist: "Sofia" },
    { country: "GB", song: "Skyline", artist: "John Smith" },
    { country: "PL", song: "Echo", artist: "Anna" },
    { country: "MT", song: "Wave", artist: "Mia" },
    { country: "PT", song: "Saudade", artist: "Luis" }
  ];

  beforeAll(async () => {
    await pool.query("SELECT 1");
    dbReady = true;

    // Login as admin to get token
    const loginResponse = await request(app)
      .post("/auth/admin/login")
      .send({ username: "admin", password: "admin123" });

    if (loginResponse.status !== 200 || !loginResponse.body.accessToken) {
      throw new Error(
        `Admin login fehlgeschlagen: ${loginResponse.status} ${JSON.stringify(loginResponse.body)}`
      );
    }
    
    adminToken = loginResponse.body.accessToken;

    // Create a test event
    const eventResponse = await request(app)
      .post("/admin/events")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Test ESC 2026", year: 2026, status: "draft", isActive: true });

    if (eventResponse.status !== 201) {
      throw new Error(
        `Test-Event konnte nicht erstellt werden: ${eventResponse.status} ${JSON.stringify(eventResponse.body)}`
      );
    }
    
    const events = await pool.query("SELECT id FROM events WHERE name = 'Test ESC 2026' ORDER BY id DESC LIMIT 1");
    if (!events[0]?.id) {
      throw new Error("Test-Event wurde nicht in der Datenbank gefunden.");
    }
    eventId = events[0].id;
  }, 30_000);

  afterAll(async () => {
    if (!dbReady) return;

    // Cleanup: Delete test data
    if (eventId) {
      await pool.query("DELETE FROM entries WHERE event_id = ?", [eventId]);
      await pool.query("DELETE FROM events WHERE id = ?", [eventId]);
    }
    await pool.query("DELETE FROM users WHERE username IN ('testuser1', 'testuser2')");
  }, 30_000);

  describe("POST /admin/events/:id/entries/bulk", () => {
    it("sollte Songs/Länder per Bulk-Upload erstellen", async () => {
      const entries = fullEntries;

      const response = await request(app)
        .post(`/admin/events/${eventId}/entries/bulk`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ entries });

      expect(response.status).toBe(201);
      expect(response.body.ok).toBe(true);
      expect(response.body.count).toBe(10);

      // Verify entries were created
      const dbEntries = await pool.query("SELECT * FROM entries WHERE event_id = ? ORDER BY sort_order", [eventId]);
      expect(dbEntries).toHaveLength(10);
      expect(dbEntries[0].country_code).toBe("SE");
      expect(dbEntries[1].country_code).toBe("DE");
      expect(dbEntries[2].country_code).toBe("IT");
    });

    it("sollte bestehende Einträge ersetzen", async () => {
      const newEntries = [
        { country: "AT", song: "Alpen", artist: "Klara" },
        { country: "CH", song: "Alpenlicht", artist: "Marco" }
      ];

      const response = await request(app)
        .post(`/admin/events/${eventId}/entries/bulk`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ entries: newEntries });

      expect(response.status).toBe(201);

      // Verify old entries were replaced
      const dbEntries = await pool.query("SELECT * FROM entries WHERE event_id = ?", [eventId]);
      expect(dbEntries).toHaveLength(2);
      expect(dbEntries[0].country_code).toBe("AT");
    });
  });

  describe("POST /admin/participants/bulk", () => {
    it("sollte Teilnehmer per Bulk-Upload erstellen", async () => {
      const participants = [
        { username: "testuser1", display_name: "Test User 1", email: "test1@example.com" },
        { username: "testuser2", display_name: "Test User 2", email: "test2@example.com" },
      ];

      const response = await request(app)
        .post("/admin/participants/bulk")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ participants });

      expect(response.status).toBe(201);
      expect(response.body.ok).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.defaultPassword).toBe("Welcome123!");

      // Verify participants were created
      const dbUsers = await pool.query("SELECT * FROM users WHERE username IN ('testuser1', 'testuser2')");
      expect(dbUsers).toHaveLength(2);
    });

    it("sollte doppelte Benutzernamen überspringen", async () => {
      const participants = [
        { username: "testuser1", display_name: "Test User 1 Duplicate", email: "test1@example.com" },
        { username: "testuser3", display_name: "Test User 3", email: "test3@example.com" },
      ];

      const response = await request(app)
        .post("/admin/participants/bulk")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ participants });

      expect(response.status).toBe(201);

      // Verify only new user was created
      const user3 = await pool.query("SELECT * FROM users WHERE username = 'testuser3'");
      expect(user3).toHaveLength(1);

      // Cleanup
      await pool.query("DELETE FROM users WHERE username = 'testuser3'");
    });
  });

  describe("POST /admin/events/:id/predictions/bulk", () => {
    beforeAll(async () => {
      await request(app)
        .post(`/admin/events/${eventId}/entries/bulk`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ entries: fullEntries });
    });
    it("sollte Ranglistentipps per Bulk-Upload erstellen", async () => {
      const rankings = [
        { username: "testuser1", country: "SE", rank: "1" },
        { username: "testuser1", country: "DE", rank: "2" },
        { username: "testuser1", country: "IT", rank: "3" },
        { username: "testuser1", country: "FR", rank: "4" },
        { username: "testuser1", country: "NO", rank: "5" },
        { username: "testuser1", country: "ES", rank: "6" },
        { username: "testuser1", country: "GB", rank: "7" },
        { username: "testuser1", country: "PL", rank: "8" },
        { username: "testuser1", country: "MT", rank: "9" },
        { username: "testuser1", country: "PT", rank: "10" }
      ];

      const response = await request(app)
        .post(`/admin/events/${eventId}/predictions/bulk`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ rankings });

      expect(response.status).toBe(201);
      expect(response.body.ok).toBe(true);
      expect(response.body.count).toBe(10);

      // Verify predictions were created
      const predictions = await pool.query(
        "SELECT p.* FROM predictions p JOIN users u ON p.participant_id = u.id WHERE u.username = 'testuser1' AND p.event_id = ?",
        [eventId]
      );
      expect(predictions).toHaveLength(1);

      const predictionId = predictions[0].id;
      const items = await pool.query("SELECT * FROM prediction_items WHERE prediction_id = ? ORDER BY rank_position", [predictionId]);
      expect(items).toHaveLength(10);
    });

    it("sollte mehrere Benutzer gleichzeitig verarbeiten", async () => {
      const rankings = [
        { username: "testuser1", country: "SE", rank: "10" },
        { username: "testuser1", country: "DE", rank: "9" },
        { username: "testuser1", country: "IT", rank: "8" },
        { username: "testuser1", country: "FR", rank: "7" },
        { username: "testuser1", country: "NO", rank: "6" },
        { username: "testuser1", country: "ES", rank: "5" },
        { username: "testuser1", country: "GB", rank: "4" },
        { username: "testuser1", country: "PL", rank: "3" },
        { username: "testuser1", country: "MT", rank: "2" },
        { username: "testuser1", country: "PT", rank: "1" },
        { username: "testuser2", country: "SE", rank: "1" },
        { username: "testuser2", country: "DE", rank: "2" },
        { username: "testuser2", country: "IT", rank: "3" },
        { username: "testuser2", country: "FR", rank: "4" },
        { username: "testuser2", country: "NO", rank: "5" },
        { username: "testuser2", country: "ES", rank: "6" },
        { username: "testuser2", country: "GB", rank: "7" },
        { username: "testuser2", country: "PL", rank: "8" },
        { username: "testuser2", country: "MT", rank: "9" },
        { username: "testuser2", country: "PT", rank: "10" }
      ];

      const response = await request(app)
        .post(`/admin/events/${eventId}/predictions/bulk`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ rankings });

      expect(response.status).toBe(201);
      expect(response.body.count).toBe(20);

      // Verify both users have predictions
      const predictions = await pool.query(
        "SELECT p.*, u.username FROM predictions p JOIN users u ON p.participant_id = u.id WHERE p.event_id = ? AND u.username IN ('testuser1', 'testuser2')",
        [eventId]
      );
      expect(predictions).toHaveLength(2);
    });
  });

  describe("POST /admin/events/:id/ratings/bulk", () => {
    it("sollte Ratings per Bulk-Upload erstellen", async () => {
      const ratings = [
        { username: "testuser1", country: "SE", points: "12" },
        { username: "testuser1", country: "DE", points: "10" },
        { username: "testuser1", country: "IT", points: "8" },
        { username: "testuser1", country: "FR", points: "7" },
        { username: "testuser1", country: "NO", points: "6" },
        { username: "testuser1", country: "ES", points: "5" },
        { username: "testuser1", country: "GB", points: "4" },
        { username: "testuser1", country: "PL", points: "3" },
        { username: "testuser1", country: "MT", points: "2" },
        { username: "testuser1", country: "PT", points: "1" }
      ];

      const response = await request(app)
        .post(`/admin/events/${eventId}/ratings/bulk`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ ratings });

      expect(response.status).toBe(201);
      expect(response.body.ok).toBe(true);
      expect(response.body.count).toBe(10);

      const ratingRows = await pool.query(
        "SELECT r.* FROM ratings r JOIN users u ON r.participant_id = u.id WHERE u.username = 'testuser1' AND r.event_id = ?",
        [eventId]
      );
      expect(ratingRows).toHaveLength(1);

      const items = await pool.query("SELECT * FROM rating_items WHERE rating_id = ?", [ratingRows[0].id]);
      expect(items).toHaveLength(10);
    });
  });

  describe("POST /admin/events/:id/officialresult/bulk", () => {
    it("sollte offizielles Ergebnis per Bulk-Upload erstellen", async () => {
      const results = [
        { country: "SE", rank: "1" },
        { country: "DE", rank: "2" },
        { country: "IT", rank: "3" },
        { country: "FR", rank: "4" },
        { country: "NO", rank: "5" },
        { country: "ES", rank: "6" },
        { country: "GB", rank: "7" },
        { country: "PL", rank: "8" },
        { country: "MT", rank: "9" },
        { country: "PT", rank: "10" }
      ];

      const response = await request(app)
        .post(`/admin/events/${eventId}/officialresult/bulk`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ results });

      expect(response.status).toBe(201);
      expect(response.body.ok).toBe(true);
      expect(response.body.count).toBe(10);

      const official = await pool.query(
        "SELECT * FROM official_results WHERE event_id = ?",
        [eventId]
      );
      expect(official).toHaveLength(1);

      const items = await pool.query(
        "SELECT * FROM official_result_items WHERE official_result_id = ?",
        [official[0].id]
      );
      expect(items).toHaveLength(10);
    });
  });
});
