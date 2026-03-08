import React, { useState, useEffect } from "react";
import { CsvUpload } from "./CsvUpload";
import { DataTable } from "./DataTable";
import { api } from "../api";
import { isValidCountryCode, normalizeCountryCode, getCountryNameDe } from "../lib/countries";

// Beispiel-CSV-Header für Songs/Länder
const SONGS_HEADER = "country,song,artist\n";
const PARTICIPANTS_HEADER = "username,display_name,email\n";
const RANKINGS_HEADER = "username,country,rank\n";
const RATINGS_HEADER = "username,country,points\n";
const OFFICIAL_HEADER = "country,rank\n";

type CsvRow = Record<string, string>;

type SongRow = { country: string; song: string; artist: string; [key: string]: string };
type ParticipantRow = { username: string; display_name: string; email: string; [key: string]: string };
type RankingRow = { username: string; country: string; rank: string; [key: string]: string };
type RatingRow = { username: string; country: string; points: string; [key: string]: string };
type OfficialRow = { country: string; rank: string; [key: string]: string };

function parseCsv(text: string): CsvRow[] {
  if (!text || text.trim() === "") return [];
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const [header, ...dataLines] = lines;
  const strip = (s: string) => s.trim().replace(/^["']|["']$/g, "");
  const keys = header.split(",").map(strip);
  return dataLines.map((line) => {
    const values = line.split(",").map(strip);
    const obj: CsvRow = {};
    keys.forEach((k, i) => (obj[k] = values[i] || ""));
    return obj;
  });
}

function validateSongs(songs: CsvRow[]): string[] {
  const errors: string[] = [];
  songs.forEach((song, i) => {
    if (!song.country) {
      errors.push(`Zeile ${i + 2}: Land fehlt`);
    } else {
      const normalized = normalizeCountryCode(song.country);
      if (!normalized || !isValidCountryCode(normalized)) {
        errors.push(`Zeile ${i + 2}: "${song.country}" ist kein gültiger 2-stelliger ISO-Ländercode`);
      }
    }
    if (!song.song) errors.push(`Zeile ${i + 2}: Song fehlt`);
    if (!song.artist) errors.push(`Zeile ${i + 2}: Künstler fehlt`);
  });
  return errors;
}

function validateParticipants(participants: CsvRow[]): string[] {
  const errors: string[] = [];
  const usernames = new Set<string>();
  participants.forEach((p, i) => {
    if (!p.username) errors.push(`Zeile ${i + 2}: Benutzername fehlt`);
    else if (usernames.has(p.username)) errors.push(`Zeile ${i + 2}: Benutzername "${p.username}" doppelt`);
    else usernames.add(p.username);
    if (!p.display_name) errors.push(`Zeile ${i + 2}: Anzeigename fehlt`);
  });
  return errors;
}

function validateRankings(rankings: CsvRow[], songCount: number): string[] {
  const errors: string[] = [];
  const byUser: Record<string, CsvRow[]> = {};
  rankings.forEach((r, i) => {
    const normalized = normalizeCountryCode(r.country);
    if (!normalized || !isValidCountryCode(normalized)) {
      errors.push(`Zeile ${i + 2}: "${r.country}" ist kein gültiger 2-stelliger ISO-Ländercode`);
    }
    if (!byUser[r.username]) byUser[r.username] = [];
    byUser[r.username].push(r);
  });

  Object.entries(byUser).forEach(([username, items]) => {
    if (items.length !== songCount) {
      errors.push(`Benutzer "${username}": ${items.length} Songs/Länder statt ${songCount}`);
    }
    const ranks = items.map((item) => Number(item.rank));
    const uniqueRanks = new Set(ranks);
    if (uniqueRanks.size !== ranks.length) {
      errors.push(`Benutzer "${username}": Doppelte Platzierungen`);
    }
    ranks.forEach((rank) => {
      if (rank < 1 || rank > songCount) {
        errors.push(`Benutzer "${username}": Ungültiger Platz ${rank} (muss 1-${songCount} sein)`);
      }
    });
  });

  return errors;
}

function validateRatings(ratings: CsvRow[]): string[] {
  const errors: string[] = [];
  const allowedPoints = new Set([1, 2, 3, 4, 5, 6, 7, 8, 10, 12]);
  const byUser: Record<string, CsvRow[]> = {};
  ratings.forEach((r) => {
    if (!byUser[r.username]) byUser[r.username] = [];
    byUser[r.username].push(r);
  });

  Object.entries(byUser).forEach(([username, items]) => {
    if (items.length !== 10) {
      errors.push(`Benutzer "${username}": ${items.length} Einträge statt 10`);
    }
    const seenCountries = new Set<string>();
    const seenPoints = new Set<number>();
    items.forEach((item) => {
      const points = Number(item.points);
      if (!item.country) {
        errors.push(`Benutzer "${username}": Land fehlt`);
      } else {
        const normalized = normalizeCountryCode(item.country);
        if (!normalized || !isValidCountryCode(normalized)) {
          errors.push(`Benutzer "${username}": "${item.country}" ist kein gültiger 2-stelliger ISO-Ländercode`);
        }
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
}

function validateOfficialResults(results: CsvRow[], songCount: number): string[] {
  const errors: string[] = [];
  results.forEach((result, i) => {
    const normalized = normalizeCountryCode(result.country);
    if (!normalized || !isValidCountryCode(normalized)) {
      errors.push(`Zeile ${i + 2}: "${result.country}" ist kein gültiger 2-stelliger ISO-Ländercode`);
    }
  });
  if (results.length !== songCount) {
    errors.push(`Offizielles Ergebnis: ${results.length} Einträge statt ${songCount}`);
  }
  const ranks = results.map((item) => Number(item.rank));
  const uniqueRanks = new Set(ranks);
  if (uniqueRanks.size !== ranks.length) {
    errors.push("Offizielles Ergebnis: Doppelte Platzierungen");
  }
  ranks.forEach((rank) => {
    if (rank < 1 || rank > songCount) {
      errors.push(`Offizielles Ergebnis: Ungültiger Platz ${rank} (muss 1-${songCount} sein)`);
    }
  });
  return errors;
}

type EventRow = { id: number; name: string; year?: number; status: string; deletedAt?: string | null };

interface AdminEventManagerProps {
  events: EventRow[];
  onSave?: () => void;
}

// Eurovision API Types
type EurovisionContestant = {
  id: number;
  country: string;
  artist: string;
  song: string;
};

type EurovisionPerformance = {
  contestantId: number;
  running: number;
  place: number | null;
  scores: any[];
};

type EurovisionRound = {
  name: string;
  date: string;
  time: string;
  performances: EurovisionPerformance[];
  disqualifieds: number[];
};

type EurovisionContest = {
  year: number;
  arena: string;
  city: string;
  country: string;
  contestants: EurovisionContestant[];
  rounds: EurovisionRound[];
};

export function AdminEventManager({ events, onSave }: AdminEventManagerProps) {
  const manageableEvents = events.filter((e) => e.status !== "finished" && !e.deletedAt);
  const [eventId, setEventId] = useState<number | null>(manageableEvents[0]?.id ?? null);
  const [songs, setSongs] = useState<SongRow[]>([]);
  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [rankings, setRankings] = useState<RankingRow[]>([]);
  const [ratings, setRatings] = useState<RatingRow[]>([]);
  const [officialResults, setOfficialResults] = useState<OfficialRow[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (eventId && !manageableEvents.some((e) => e.id === eventId)) {
      setEventId(manageableEvents[0]?.id ?? null);
    }
  }, [events]);

  const showMessage = (msg: string, isError = false) => {
    if (isError) {
      setError(msg);
      setMessage("");
    } else {
      setMessage(msg);
      setError("");
    }
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 5000);
  };

  const handleSongsUpload = (text: string) => {
    try {
      const parsed = parseCsv(text);
      const errors = validateSongs(parsed);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      setSongs(parsed as SongRow[]);
      showMessage(`${parsed.length} Songs/Länder geladen`);
    } catch (err: any) {
      showMessage("CSV-Parse-Fehler: " + err.message, true);
    }
  };

  const handleParticipantsUpload = (text: string) => {
    try {
      const parsed = parseCsv(text);
      const errors = validateParticipants(parsed);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      setParticipants(parsed as ParticipantRow[]);
      showMessage(`${parsed.length} Teilnehmer geladen`);
    } catch (err: any) {
      showMessage("CSV-Parse-Fehler: " + err.message, true);
    }
  };

  const handleRankingsUpload = (text: string) => {
    try {
      const parsed = parseCsv(text);
      const errors = validateRankings(parsed, songs.length);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      setRankings(parsed as RankingRow[]);
      showMessage(`${parsed.length} Ranglisteneinträge geladen`);
    } catch (err: any) {
      showMessage("CSV-Parse-Fehler: " + err.message, true);
    }
  };

  const handleRatingsUpload = (text: string) => {
    try {
      const parsed = parseCsv(text);
      const errors = validateRatings(parsed);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      setRatings(parsed as RatingRow[]);
      showMessage(`${parsed.length} Ratings geladen`);
    } catch (err: any) {
      showMessage("CSV-Parse-Fehler: " + err.message, true);
    }
  };

  const handleOfficialUpload = (text: string) => {
    try {
      const parsed = parseCsv(text);
      const errors = validateOfficialResults(parsed, songs.length);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      setOfficialResults(parsed as OfficialRow[]);
      showMessage(`${parsed.length} Offizielle Platzierungen geladen`);
    } catch (err: any) {
      showMessage("CSV-Parse-Fehler: " + err.message, true);
    }
  };

  const addSongRow = () => {
    setSongs([...songs, { country: "", song: "", artist: "" }]);
  };

  const addParticipantRow = () => {
    setParticipants([...participants, { username: "", display_name: "", email: "" }]);
  };

  const addRatingRow = () => {
    setRatings([...ratings, { username: "", country: "", points: "" }]);
  };

  const addOfficialRow = () => {
    setOfficialResults([...officialResults, { country: "", rank: "" }]);
  };

  const importOfficialFromEurovisionApi = async () => {
    try {
      if (eventId == null) {
        showMessage("Kein Event ausgewählt.", true);
        return;
      }
      
      const selectedEvent = events.find((e) => e.id === eventId);
      if (!selectedEvent?.year) {
        showMessage("Event hat kein Jahr definiert.", true);
        return;
      }

      const year = selectedEvent.year;
      showMessage(`Lade Daten aus Eurovision API für Jahr ${year}...`);

      const response = await fetch(`https://eurovisionapi.runasp.net/api/senior/contests/${year}`);
      if (!response.ok) {
        throw new Error(`Eurovision API Fehler: ${response.status} ${response.statusText}`);
      }

      const contest: EurovisionContest = await response.json();

      // Nur die Final Round berücksichtigen
      const finalRound = contest.rounds.find((r) => r.name === "final");
      if (!finalRound) {
        showMessage("Keine Final-Runde in den API-Daten gefunden.", true);
        return;
      }

      // Performances mit Platzierung extrahieren (place !== null = hat im Finale angetreten)
      const finalists = finalRound.performances
        .filter((p) => p.place !== null)
        .map((p) => {
          const contestant = contest.contestants.find((c) => c.id === p.contestantId);
          return {
            country: contestant?.country || "",
            rank: String(p.place)
          };
        })
        .filter((item) => item.country && isValidCountryCode(item.country));

      if (finalists.length === 0) {
        showMessage("Keine gültigen Finalteilnehmer in den API-Daten gefunden.", true);
        return;
      }

      setOfficialResults(finalists);
      showMessage(`${finalists.length} offizielle Platzierungen aus Eurovision API ${year} geladen`);
    } catch (err: any) {
      showMessage("Fehler beim Import aus Eurovision API: " + err.message, true);
    }
  };

  const saveSongs = async () => {
    try {
      if (eventId == null) {
        showMessage("Kein Event ausgewählt.", true);
        return;
      }
      const errors = validateSongs(songs);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      await api.adminBulkUploadEntries(eventId, songs);
      showMessage("Songs/Länder gespeichert");
      if (onSave) onSave();
    } catch (err: any) {
      showMessage("Fehler beim Speichern: " + err.message, true);
    }
  };

  const saveParticipants = async () => {
    try {
      const errors = validateParticipants(participants);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      await api.adminBulkUploadParticipants(participants);
      showMessage("Teilnehmer gespeichert");
      if (onSave) onSave();
    } catch (err: any) {
      showMessage("Fehler beim Speichern: " + err.message, true);
    }
  };

  const saveRankings = async () => {
    try {
      if (eventId == null) {
        showMessage("Kein Event ausgewählt.", true);
        return;
      }
      const errors = validateRankings(rankings, songs.length);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      await api.adminBulkUploadRankings(eventId, rankings);
      showMessage("Ranglistentipps gespeichert");
      if (onSave) onSave();
    } catch (err: any) {
      showMessage("Fehler beim Speichern: " + err.message, true);
    }
  };

  const saveRatings = async () => {
    try {
      if (eventId == null) {
        showMessage("Kein Event ausgewählt.", true);
        return;
      }
      const errors = validateRatings(ratings);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      await api.adminBulkUploadRatings(eventId, ratings);
      showMessage("Ratings gespeichert");
      if (onSave) onSave();
    } catch (err: any) {
      showMessage("Fehler beim Speichern: " + err.message, true);
    }
  };

  const saveOfficialResults = async () => {
    try {
      if (eventId == null) {
        showMessage("Kein Event ausgewählt.", true);
        return;
      }
      const errors = validateOfficialResults(officialResults, songs.length);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      await api.adminBulkUploadOfficialResults(eventId, officialResults);
      showMessage("Offizielles Ergebnis gespeichert");
      if (onSave) onSave();
    } catch (err: any) {
      showMessage("Fehler beim Speichern: " + err.message, true);
    }
  };

  useEffect(() => {
    if (!eventId) return;
    void (async () => {
      try {
        const existingEntries = await api.adminEntries(eventId);
        if (existingEntries?.length) {
          setSongs(
            existingEntries.map((entry: any) => ({
              country: entry.countryCode,
              song: entry.songTitle || "",
              artist: entry.artistName || ""
            }))
          );
        }
        const existingParticipants = await api.adminParticipants();
        if (existingParticipants?.length) {
          setParticipants(
            existingParticipants.map((participant: any) => ({
              username: participant.username,
              display_name: participant.displayName,
              email: participant.email || ""
            }))
          );
        }
      } catch (err: any) {
        showMessage("Fehler beim Laden: " + err.message, true);
      }
    })();
  }, [eventId]);

  const selectedEventName = manageableEvents.find((e) => e.id === eventId)?.name || "–";

  return (
    <div className="admin-section">
      <h2>Event-Daten verwalten</h2>

      <div className="form-field">
        <label className="form-label">Event auswählen</label>
        <select
          className="form-input"
          value={eventId || ""}
          onChange={(e) => setEventId(Number(e.target.value))}
        >
          <option value="" disabled>– Event wählen –</option>
          {manageableEvents.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.name} ({ev.status})
            </option>
          ))}
        </select>
      </div>

      {!eventId && <p style={{ color: "#888" }}>Bitte ein Event auswählen.</p>}

      {eventId && <><div className="card">
        <h3>Songs/Länder – {selectedEventName}</h3>
        <CsvUpload
          label="Songs/Länder CSV hochladen"
          onUpload={handleSongsUpload}
          example={
            "data:text/csv;charset=utf-8," +
            encodeURIComponent(
              SONGS_HEADER + "SE,Unicorn,Jane Doe\nDE,Fireworks,Max Mustermann"
            )
          }
        />
        <DataTable
          columns={[
            { 
              key: "country", 
              label: "Land", 
              editable: true,
              render: (row) => (
                <div>
                  <input
                    value={row.country || ""}
                    onChange={(e) => {
                      const idx = songs.findIndex(s => s === row);
                      if (idx >= 0) {
                        const next = [...songs];
                        next[idx].country = e.target.value;
                        setSongs(next);
                      }
                    }}
                    placeholder="z.B. DE"
                    style={{ width: "60px", marginRight: "8px" }}
                  />
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    {row.country && getCountryNameDe(row.country.toUpperCase())}
                  </span>
                </div>
              )
            },
            { key: "song", label: "Song", editable: true },
            { key: "artist", label: "Künstler", editable: true }
          ]}
          data={songs}
          onChange={(i, k, v) => {
            const next = [...songs];
            next[i][k] = v as string;
            setSongs(next);
          }}
        />
        <div className="admin-actions">
          <button onClick={addSongRow}>Zeile hinzufügen</button>
          <button onClick={saveSongs} className="primary">
            Songs/Länder speichern
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Teilnehmer</h3>
        <CsvUpload
          label="Teilnehmer CSV hochladen"
          onUpload={handleParticipantsUpload}
          example={
            "data:text/csv;charset=utf-8," +
            encodeURIComponent(
              PARTICIPANTS_HEADER +
                "tobiit,Tobias Example,tobi@example.com\nlisa,Lisa Musterfrau,lisa@example.com"
            )
          }
        />
        <DataTable
          columns={[
            { key: "username", label: "Benutzername", editable: true },
            { key: "display_name", label: "Anzeigename", editable: true },
            { key: "email", label: "E-Mail", editable: true }
          ]}
          data={participants}
          onChange={(i, k, v) => {
            const next = [...participants];
            next[i][k] = v as string;
            setParticipants(next);
          }}
        />
        <div className="admin-actions">
          <button onClick={addParticipantRow}>Zeile hinzufügen</button>
          <button onClick={saveParticipants} className="primary">
            Teilnehmer speichern
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Ranglistentipps</h3>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
          Die Datei muss genau {songs.length} Einträge pro Teilnehmer enthalten.
          Jeder Platz (1-{songs.length}) darf pro Teilnehmer nur einmal vorkommen.
        </p>
        <CsvUpload
          label="Ranglistentipps CSV hochladen"
          onUpload={handleRankingsUpload}
          example={
            "data:text/csv;charset=utf-8," +
            encodeURIComponent(
              RANKINGS_HEADER +
                "tobiit,DE,23\ntobiit,IT,3\ntobiit,SE,1\ntobiit,MT,18"
            )
          }
        />
        <DataTable
          columns={[
            { key: "username", label: "Benutzername", editable: true },
            { 
              key: "country", 
              label: "Land", 
              editable: true,
              render: (row) => (
                <div>
                  <input
                    value={row.country || ""}
                    onChange={(e) => {
                      const idx = rankings.findIndex(r => r === row);
                      if (idx >= 0) {
                        const next = [...rankings];
                        next[idx].country = e.target.value;
                        setRankings(next);
                      }
                    }}
                    placeholder="z.B. DE"
                    style={{ width: "60px", marginRight: "8px" }}
                  />
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    {row.country && getCountryNameDe(row.country.toUpperCase())}
                  </span>
                </div>
              )
            },
            { key: "rank", label: "Platz", editable: true }
          ]}
          data={rankings}
          onChange={(i, k, v) => {
            const next = [...rankings];
            next[i][k] = v as string;
            setRankings(next);
          }}
        />
        <div className="admin-actions">
          <button onClick={saveRankings} className="primary">
            Ranglistentipps speichern
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Bewertungen (Punkte)</h3>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
          Pro Teilnehmer genau 10 Einträge mit Punkten: 1-8, 10, 12.
        </p>
        <CsvUpload
          label="Ratings CSV hochladen"
          onUpload={handleRatingsUpload}
          example={
            "data:text/csv;charset=utf-8," +
            encodeURIComponent(
              RATINGS_HEADER +
                "tobiit,DE,12\ntobiit,IT,10\ntobiit,SE,8\ntobiit,MT,7"
            )
          }
        />
        <DataTable
          columns={[
            { key: "username", label: "Benutzername", editable: true },
            { 
              key: "country", 
              label: "Land", 
              editable: true,
              render: (row) => (
                <div>
                  <input
                    value={row.country || ""}
                    onChange={(e) => {
                      const idx = ratings.findIndex(r => r === row);
                      if (idx >= 0) {
                        const next = [...ratings];
                        next[idx].country = e.target.value;
                        setRatings(next);
                      }
                    }}
                    placeholder="z.B. DE"
                    style={{ width: "60px", marginRight: "8px" }}
                  />
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    {row.country && getCountryNameDe(row.country.toUpperCase())}
                  </span>
                </div>
              )
            },
            { key: "points", label: "Punkte", editable: true }
          ]}
          data={ratings}
          onChange={(i, k, v) => {
            const next = [...ratings];
            next[i][k] = v as string;
            setRatings(next);
          }}
        />
        <div className="admin-actions">
          <button onClick={addRatingRow}>Zeile hinzufügen</button>
          <button onClick={saveRatings} className="primary">
            Ratings speichern
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Offizielles Ergebnis (TV-Rangliste)</h3>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
          Die Datei muss genau {songs.length} Einträge enthalten. Jeder Platz (1-{songs.length}) darf nur einmal vorkommen.
        </p>
        <div style={{ marginBottom: "12px" }}>
          <button onClick={importOfficialFromEurovisionApi} style={{ marginBottom: "8px" }}>
            🌍 Aus Eurovision API importieren
          </button>
          <span style={{ fontSize: "13px", color: "#666", marginLeft: "12px" }}>
            Lädt offizielle Finalergebnisse basierend auf dem Event-Jahr
          </span>
        </div>
        <CsvUpload
          label="Offizielles Ergebnis CSV hochladen"
          onUpload={handleOfficialUpload}
          example={
            "data:text/csv;charset=utf-8," +
            encodeURIComponent(
              OFFICIAL_HEADER + "SE,1\nDE,23\nIT,3\nMT,18"
            )
          }
        />
        <DataTable
          columns={[
            { 
              key: "country", 
              label: "Land", 
              editable: true,
              render: (row) => (
                <div>
                  <input
                    value={row.country || ""}
                    onChange={(e) => {
                      const idx = officialResults.findIndex(r => r === row);
                      if (idx >= 0) {
                        const next = [...officialResults];
                        next[idx].country = e.target.value;
                        setOfficialResults(next);
                      }
                    }}
                    placeholder="z.B. DE"
                    style={{ width: "60px", marginRight: "8px" }}
                  />
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    {row.country && getCountryNameDe(row.country.toUpperCase())}
                  </span>
                </div>
              )
            },
            { key: "rank", label: "Platz", editable: true }
          ]}
          data={officialResults}
          onChange={(i, k, v) => {
            const next = [...officialResults];
            next[i][k] = v as string;
            setOfficialResults(next);
          }}
        />
        <div className="admin-actions">
          <button onClick={addOfficialRow}>Zeile hinzufügen</button>
          <button onClick={saveOfficialResults} className="primary">
            Offizielles Ergebnis speichern
          </button>
        </div>
      </div>

      </>}

      {message && (
        <div className="toast" style={{ background: "var(--core-color-green-700, #2c7b2e)" }}>
          {message}
        </div>
      )}
      {error && (
        <div className="toast" style={{ background: "var(--core-color-red-600, #d12800)" }}>
          {error}
        </div>
      )}
    </div>
  );
}
