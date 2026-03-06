import { describe, it, expect } from "vitest";

// CSV Parsing Tests
describe("CSV Upload Validation", () => {
  const parseCsv = (text: string): Record<string, string>[] => {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length === 0) return [];
    const [header, ...dataLines] = lines;
    const keys = header.split(",").map((k) => k.trim());
    return dataLines.map((line) => {
      const values = line.split(",").map((v) => v.trim());
      const obj: Record<string, string> = {};
      keys.forEach((k, i) => (obj[k] = values[i] || ""));
      return obj;
    });
  };

  const validateSongs = (songs: Record<string, string>[]): string[] => {
    const errors: string[] = [];
    songs.forEach((song, i) => {
      if (!song.country) errors.push(`Zeile ${i + 2}: Land fehlt`);
      if (!song.song) errors.push(`Zeile ${i + 2}: Song fehlt`);
      if (!song.artist) errors.push(`Zeile ${i + 2}: Künstler fehlt`);
    });
    return errors;
  };

  const validateParticipants = (participants: Record<string, string>[]): string[] => {
    const errors: string[] = [];
    const usernames = new Set<string>();
    participants.forEach((p, i) => {
      if (!p.username) errors.push(`Zeile ${i + 2}: Benutzername fehlt`);
      else if (usernames.has(p.username)) errors.push(`Zeile ${i + 2}: Benutzername "${p.username}" doppelt`);
      else usernames.add(p.username);
      if (!p.display_name) errors.push(`Zeile ${i + 2}: Anzeigename fehlt`);
    });
    return errors;
  };

  const validateRankings = (rankings: Record<string, string>[], songCount: number): string[] => {
    const errors: string[] = [];
    const byUser: Record<string, Record<string, string>[]> = {};
    rankings.forEach((r) => {
      if (!byUser[r.username]) byUser[r.username] = [];
      byUser[r.username].push(r);
    });

    Object.entries(byUser).forEach(([username, items]: [string, Record<string, string>[]]) => {
      if (items.length !== songCount) {
        errors.push(`Benutzer "${username}": ${items.length} Songs/Länder statt ${songCount}`);
      }
      const ranks = items.map((item: Record<string, string>) => Number(item.rank));
      const uniqueRanks = new Set(ranks);
      if (uniqueRanks.size !== ranks.length) {
        errors.push(`Benutzer "${username}": Doppelte Platzierungen`);
      }
      ranks.forEach((rank: number) => {
        if (rank < 1 || rank > songCount) {
          errors.push(`Benutzer "${username}": Ungültiger Platz ${rank} (muss 1-${songCount} sein)`);
        }
      });
    });

    return errors;
  };

  const validateRatings = (ratings: Record<string, string>[]): string[] => {
    const errors: string[] = [];
    const allowedPoints = new Set([1, 2, 3, 4, 5, 6, 7, 8, 10, 12]);
    const byUser: Record<string, Record<string, string>[]> = {};
    ratings.forEach((r) => {
      if (!byUser[r.username]) byUser[r.username] = [];
      byUser[r.username].push(r);
    });

    Object.entries(byUser).forEach(([username, items]: [string, Record<string, string>[]]) => {
      if (items.length !== 10) {
        errors.push(`Benutzer "${username}": ${items.length} Einträge statt 10`);
      }
      const seenCountries = new Set();
      const seenPoints = new Set();
      items.forEach((item: Record<string, string>) => {
        const points = Number(item.points);
        if (!item.country) {
          errors.push(`Benutzer "${username}": Land fehlt`);
        }
        if (!allowedPoints.has(points)) {
          errors.push(`Benutzer "${username}": Ungültige Punkte ${item.points}`);
        }
        if (seenCountries.has(item.country)) {
          errors.push(`Benutzer "${username}": Doppelte Länderzuordnung`);
        }
        if (seenPoints.has(points)) {
          errors.push(`Benutzer "${username}": Doppelte Punktewerte`);
        }
        seenCountries.add(item.country);
        seenPoints.add(points);
      });
    });

    return errors;
  };

  const validateOfficialResults = (results: Record<string, string>[], songCount: number): string[] => {
    const errors: string[] = [];
    if (results.length !== songCount) {
      errors.push(`Offizielles Ergebnis: ${results.length} Einträge statt ${songCount}`);
    }
    const ranks = results.map((item: Record<string, string>) => Number(item.rank));
    const uniqueRanks = new Set(ranks);
    if (uniqueRanks.size !== ranks.length) {
      errors.push("Offizielles Ergebnis: Doppelte Platzierungen");
    }
    ranks.forEach((rank: number) => {
      if (rank < 1 || rank > songCount) {
        errors.push(`Offizielles Ergebnis: Ungültiger Platz ${rank} (muss 1-${songCount} sein)`);
      }
    });
    return errors;
  };

  describe("Songs/Länder CSV", () => {
    it("sollte gültige Songs/Länder parsen", () => {
      const csv = "country,song,artist\nSchweden,Unicorn,Jane Doe\nDeutschland,Fireworks,Max Mustermann";
      const result = parseCsv(csv);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ country: "Schweden", song: "Unicorn", artist: "Jane Doe" });
      expect(result[1]).toEqual({ country: "Deutschland", song: "Fireworks", artist: "Max Mustermann" });
    });

    it("sollte Fehler bei fehlenden Feldern zurückgeben", () => {
      const songs = [
        { country: "Schweden", song: "Unicorn", artist: "" },
        { country: "", song: "Test", artist: "Artist" },
      ];
      const errors = validateSongs(songs);
      expect(errors).toContain("Zeile 2: Künstler fehlt");
      expect(errors).toContain("Zeile 3: Land fehlt");
    });

    it("sollte keine Fehler bei vollständigen Songs zurückgeben", () => {
      const songs = [
        { country: "Schweden", song: "Unicorn", artist: "Jane Doe" },
        { country: "Deutschland", song: "Fireworks", artist: "Max Mustermann" },
      ];
      const errors = validateSongs(songs);
      expect(errors).toHaveLength(0);
    });
  });

  describe("Teilnehmer CSV", () => {
    it("sollte gültige Teilnehmer parsen", () => {
      const csv = "username,display_name,email\ntobiit,Tobias Example,tobi@example.com\nlisa,Lisa Musterfrau,lisa@example.com";
      const result = parseCsv(csv);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ username: "tobiit", display_name: "Tobias Example", email: "tobi@example.com" });
    });

    it("sollte Fehler bei doppelten Benutzernamen zurückgeben", () => {
      const participants = [
        { username: "tobiit", display_name: "Tobias Example", email: "" },
        { username: "tobiit", display_name: "Tobias 2", email: "" },
      ];
      const errors = validateParticipants(participants);
      expect(errors.some((e) => e.includes("doppelt"))).toBe(true);
    });

    it("sollte Fehler bei fehlenden Feldern zurückgeben", () => {
      const participants = [
        { username: "", display_name: "Tobias Example", email: "" },
        { username: "lisa", display_name: "", email: "" },
      ];
      const errors = validateParticipants(participants);
      expect(errors).toContain("Zeile 2: Benutzername fehlt");
      expect(errors).toContain("Zeile 3: Anzeigename fehlt");
    });
  });

  describe("Ranglistentipps CSV", () => {
    it("sollte gültige Ranglistentipps parsen", () => {
      const csv = "username,country,rank\ntobiit,Deutschland,23\ntobiit,Italien,3\ntobiit,Schweden,1";
      const result = parseCsv(csv);
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ username: "tobiit", country: "Deutschland", rank: "23" });
    });

    it("sollte Fehler bei falscher Anzahl von Einträgen zurückgeben", () => {
      const rankings = [
        { username: "tobiit", country: "Deutschland", rank: "1" },
        { username: "tobiit", country: "Italien", rank: "2" },
      ];
      const errors = validateRankings(rankings, 3); // 3 Songs erwartet, aber nur 2 vorhanden
      expect(errors.some((e) => e.includes("2 Songs/Länder statt 3"))).toBe(true);
    });

    it("sollte Fehler bei doppelten Platzierungen zurückgeben", () => {
      const rankings = [
        { username: "tobiit", country: "Deutschland", rank: "1" },
        { username: "tobiit", country: "Italien", rank: "1" },
        { username: "tobiit", country: "Schweden", rank: "3" },
      ];
      const errors = validateRankings(rankings, 3);
      expect(errors.some((e) => e.includes("Doppelte Platzierungen"))).toBe(true);
    });

    it("sollte Fehler bei ungültigen Platzierungen zurückgeben", () => {
      const rankings = [
        { username: "tobiit", country: "Deutschland", rank: "0" },
        { username: "tobiit", country: "Italien", rank: "2" },
        { username: "tobiit", country: "Schweden", rank: "5" },
      ];
      const errors = validateRankings(rankings, 3);
      expect(errors.some((e) => e.includes("Ungültiger Platz 0"))).toBe(true);
      expect(errors.some((e) => e.includes("Ungültiger Platz 5"))).toBe(true);
    });

    it("sollte keine Fehler bei gültigen Ranglistentipps zurückgeben", () => {
      const rankings = [
        { username: "tobiit", country: "Deutschland", rank: "1" },
        { username: "tobiit", country: "Italien", rank: "2" },
        { username: "tobiit", country: "Schweden", rank: "3" },
      ];
      const errors = validateRankings(rankings, 3);
      expect(errors).toHaveLength(0);
    });

    it("sollte mehrere Benutzer korrekt validieren", () => {
      const rankings = [
        { username: "tobiit", country: "Deutschland", rank: "1" },
        { username: "tobiit", country: "Italien", rank: "2" },
        { username: "lisa", country: "Deutschland", rank: "2" },
        { username: "lisa", country: "Italien", rank: "1" },
      ];
      const errors = validateRankings(rankings, 2);
      expect(errors).toHaveLength(0);
    });
  });

  describe("Ratings CSV", () => {
    it("sollte gültige Ratings akzeptieren", () => {
      const ratings = [
        { username: "tobiit", country: "Schweden", points: "12" },
        { username: "tobiit", country: "Deutschland", points: "10" },
        { username: "tobiit", country: "Italien", points: "8" },
        { username: "tobiit", country: "Frankreich", points: "7" },
        { username: "tobiit", country: "Norwegen", points: "6" },
        { username: "tobiit", country: "Spanien", points: "5" },
        { username: "tobiit", country: "UK", points: "4" },
        { username: "tobiit", country: "Polen", points: "3" },
        { username: "tobiit", country: "Malta", points: "2" },
        { username: "tobiit", country: "Portugal", points: "1" }
      ];
      const errors = validateRatings(ratings);
      expect(errors).toHaveLength(0);
    });

    it("sollte Fehler bei falscher Anzahl von Einträgen zurückgeben", () => {
      const ratings = [
        { username: "tobiit", country: "Schweden", points: "12" }
      ];
      const errors = validateRatings(ratings);
      expect(errors.some((e) => e.includes("statt 10"))).toBe(true);
    });

    it("sollte Fehler bei ungültigen Punkten zurückgeben", () => {
      const ratings = [
        { username: "tobiit", country: "Schweden", points: "15" },
        { username: "tobiit", country: "Deutschland", points: "10" },
        { username: "tobiit", country: "Italien", points: "8" },
        { username: "tobiit", country: "Frankreich", points: "7" },
        { username: "tobiit", country: "Norwegen", points: "6" },
        { username: "tobiit", country: "Spanien", points: "5" },
        { username: "tobiit", country: "UK", points: "4" },
        { username: "tobiit", country: "Polen", points: "3" },
        { username: "tobiit", country: "Malta", points: "2" },
        { username: "tobiit", country: "Portugal", points: "1" }
      ];
      const errors = validateRatings(ratings);
      expect(errors.some((e) => e.includes("Ungültige Punkte"))).toBe(true);
    });
  });

  describe("Offizielles Ergebnis CSV", () => {
    it("sollte gültige Ergebnisse akzeptieren", () => {
      const results = [
        { country: "Schweden", rank: "1" },
        { country: "Deutschland", rank: "2" },
        { country: "Italien", rank: "3" }
      ];
      const errors = validateOfficialResults(results, 3);
      expect(errors).toHaveLength(0);
    });

    it("sollte Fehler bei doppelten Platzierungen zurückgeben", () => {
      const results = [
        { country: "Schweden", rank: "1" },
        { country: "Deutschland", rank: "1" },
        { country: "Italien", rank: "3" }
      ];
      const errors = validateOfficialResults(results, 3);
      expect(errors.some((e) => e.includes("Doppelte Platzierungen"))).toBe(true);
    });
  });
});
