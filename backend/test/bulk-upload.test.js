import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../src/index.js";
import { pool } from "../src/db/pool.js";

describe("Admin Bulk Upload API", () => {
  let adminToken = "";
  let eventId = 0;
  const fullEntries = [
    { country: "Schweden", song: "Unicorn", artist: "Jane Doe" },
    { country: "Deutschland", song: "Fireworks", artist: "Max Mustermann" },
    { country: "Italien", song: "Amore", artist: "Maria Rossi" },
    { country: "Frankreich", song: "Chanson", artist: "Pierre Dubois" },
    { country: "Norwegen", song: "Storm", artist: "Lena Nord" },
    { country: "Spanien", song: "Luz", artist: "Sofia" },
    { country: "UK", song: "Skyline", artist: "John Smith" },
    { country: "Polen", song: "Echo", artist: "Anna" },
    { country: "Malta", song: "Wave", artist: "Mia" },
    { country: "Portugal", song: "Saudade", artist: "Luis" }
  ];

  beforeAll(async () => {
    // Login as admin to get token
    const loginResponse = await request(app)
      .post("/auth/admin/login")
      .send({ username: "admin", password: "admin123" });
    
    adminToken = loginResponse.body.accessToken;

    // Create a test event
    const eventResponse = await request(app)
      .post("/admin/events")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Test ESC 2026", year: 2026, status: "draft", isActive: true });
    
    const events = await pool.query("SELECT id FROM events WHERE name = 'Test ESC 2026' ORDER BY id DESC LIMIT 1");
    eventId = events[0].id;
  });

  afterAll(async () => {
    // Cleanup: Delete test data
    if (eventId) {
      await pool.query("DELETE FROM entries WHERE event_id = ?", [eventId]);
      await pool.query("DELETE FROM events WHERE id = ?", [eventId]);
    }
    await pool.query("DELETE FROM users WHERE username IN ('testuser1', 'testuser2')");
  });

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
      expect(dbEntries[0].country_name).toBe("Schweden");
      expect(dbEntries[1].country_name).toBe("Deutschland");
      expect(dbEntries[2].country_name).toBe("Italien");
    });

    it("sollte bestehende Einträge ersetzen", async () => {
      const newEntries = [
        { country: "Österreich", song: "Alpen", artist: "Klara" },
        { country: "Schweiz", song: "Alpenlicht", artist: "Marco" }
      ];

      const response = await request(app)
        .post(`/admin/events/${eventId}/entries/bulk`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ entries: newEntries });

      expect(response.status).toBe(201);

      // Verify old entries were replaced
      const dbEntries = await pool.query("SELECT * FROM entries WHERE event_id = ?", [eventId]);
      expect(dbEntries).toHaveLength(2);
      expect(dbEntries[0].country_name).toBe("Österreich");
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
        { username: "testuser1", country: "Schweden", rank: "1" },
        { username: "testuser1", country: "Deutschland", rank: "2" },
        { username: "testuser1", country: "Italien", rank: "3" },
        { username: "testuser1", country: "Frankreich", rank: "4" },
        { username: "testuser1", country: "Norwegen", rank: "5" },
        { username: "testuser1", country: "Spanien", rank: "6" },
        { username: "testuser1", country: "UK", rank: "7" },
        { username: "testuser1", country: "Polen", rank: "8" },
        { username: "testuser1", country: "Malta", rank: "9" },
        { username: "testuser1", country: "Portugal", rank: "10" }
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
        { username: "testuser1", country: "Schweden", rank: "10" },
        { username: "testuser1", country: "Deutschland", rank: "9" },
        { username: "testuser1", country: "Italien", rank: "8" },
        { username: "testuser1", country: "Frankreich", rank: "7" },
        { username: "testuser1", country: "Norwegen", rank: "6" },
        { username: "testuser1", country: "Spanien", rank: "5" },
        { username: "testuser1", country: "UK", rank: "4" },
        { username: "testuser1", country: "Polen", rank: "3" },
        { username: "testuser1", country: "Malta", rank: "2" },
        { username: "testuser1", country: "Portugal", rank: "1" },
        { username: "testuser2", country: "Schweden", rank: "1" },
        { username: "testuser2", country: "Deutschland", rank: "2" },
        { username: "testuser2", country: "Italien", rank: "3" },
        { username: "testuser2", country: "Frankreich", rank: "4" },
        { username: "testuser2", country: "Norwegen", rank: "5" },
        { username: "testuser2", country: "Spanien", rank: "6" },
        { username: "testuser2", country: "UK", rank: "7" },
        { username: "testuser2", country: "Polen", rank: "8" },
        { username: "testuser2", country: "Malta", rank: "9" },
        { username: "testuser2", country: "Portugal", rank: "10" }
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
        { username: "testuser1", country: "Schweden", points: "12" },
        { username: "testuser1", country: "Deutschland", points: "10" },
        { username: "testuser1", country: "Italien", points: "8" },
        { username: "testuser1", country: "Frankreich", points: "7" },
        { username: "testuser1", country: "Norwegen", points: "6" },
        { username: "testuser1", country: "Spanien", points: "5" },
        { username: "testuser1", country: "UK", points: "4" },
        { username: "testuser1", country: "Polen", points: "3" },
        { username: "testuser1", country: "Malta", points: "2" },
        { username: "testuser1", country: "Portugal", points: "1" }
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
        { country: "Schweden", rank: "1" },
        { country: "Deutschland", rank: "2" },
        { country: "Italien", rank: "3" },
        { country: "Frankreich", rank: "4" },
        { country: "Norwegen", rank: "5" },
        { country: "Spanien", rank: "6" },
        { country: "UK", rank: "7" },
        { country: "Polen", rank: "8" },
        { country: "Malta", rank: "9" },
        { country: "Portugal", rank: "10" }
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
