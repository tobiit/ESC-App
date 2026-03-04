import React, { useState, useEffect } from "react";
import { CsvUpload } from "./CsvUpload.jsx";
import { DataTable } from "./DataTable.jsx";
import { api } from "../api";

// Beispiel-CSV-Header für Songs/Länder
const SONGS_HEADER = "country,song,artist\n";
const PARTICIPANTS_HEADER = "username,display_name,email\n";
const RANKINGS_HEADER = "username,country,rank\n";
const RATINGS_HEADER = "username,country,points\n";
const OFFICIAL_HEADER = "country,rank\n";

function parseCsv(text) {
  if (!text || text.trim() === "") return [];
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const [header, ...dataLines] = lines;
  const keys = header.split(",").map(k => k.trim());
  return dataLines.map((line) => {
    const values = line.split(",").map(v => v.trim());
    const obj = {};
    keys.forEach((k, i) => (obj[k] = values[i] || ""));
    return obj;
  });
}

function validateSongs(songs) {
  const errors = [];
  songs.forEach((song, i) => {
    if (!song.country) errors.push(`Zeile ${i + 2}: Land fehlt`);
    if (!song.song) errors.push(`Zeile ${i + 2}: Song fehlt`);
    if (!song.artist) errors.push(`Zeile ${i + 2}: Künstler fehlt`);
  });
  return errors;
}

function validateParticipants(participants) {
  const errors = [];
  const usernames = new Set();
  participants.forEach((p, i) => {
    if (!p.username) errors.push(`Zeile ${i + 2}: Benutzername fehlt`);
    else if (usernames.has(p.username)) errors.push(`Zeile ${i + 2}: Benutzername "${p.username}" doppelt`);
    else usernames.add(p.username);
    if (!p.display_name) errors.push(`Zeile ${i + 2}: Anzeigename fehlt`);
  });
  return errors;
}

function validateRankings(rankings, songCount) {
  const errors = [];
  const byUser = {};
  rankings.forEach((r) => {
    if (!byUser[r.username]) byUser[r.username] = [];
    byUser[r.username].push(r);
  });
  
  Object.entries(byUser).forEach(([username, items]) => {
    if (items.length !== songCount) {
      errors.push(`Benutzer "${username}": ${items.length} Songs/Länder statt ${songCount}`);
    }
    const ranks = items.map(item => Number(item.rank));
    const uniqueRanks = new Set(ranks);
    if (uniqueRanks.size !== ranks.length) {
      errors.push(`Benutzer "${username}": Doppelte Platzierungen`);
    }
    ranks.forEach((rank, i) => {
      if (rank < 1 || rank > songCount) {
        errors.push(`Benutzer "${username}": Ungültiger Platz ${rank} (muss 1-${songCount} sein)`);
      }
    });
  });
  
  return errors;
}

function validateRatings(ratings) {
  const errors = [];
  const allowedPoints = new Set([1, 2, 3, 4, 5, 6, 7, 8, 10, 12]);
  const byUser = {};
  ratings.forEach((r) => {
    if (!byUser[r.username]) byUser[r.username] = [];
    byUser[r.username].push(r);
  });

  Object.entries(byUser).forEach(([username, items]) => {
    if (items.length !== 10) {
      errors.push(`Benutzer "${username}": ${items.length} Einträge statt 10`);
    }
    const seenCountries = new Set();
    const seenPoints = new Set();
    items.forEach((item) => {
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
}

function validateOfficialResults(results, songCount) {
  const errors = [];
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

export function AdminEventManager({ eventId, onSave }) {
  const [songs, setSongs] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [officialResults, setOfficialResults] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const showMessage = (msg, isError = false) => {
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

  const handleSongsUpload = (text) => {
    try {
      const parsed = parseCsv(text);
      const errors = validateSongs(parsed);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      setSongs(parsed);
      showMessage(`${parsed.length} Songs/Länder geladen`);
    } catch (err) {
      showMessage("CSV-Parse-Fehler: " + err.message, true);
    }
  };

  const handleParticipantsUpload = (text) => {
    try {
      const parsed = parseCsv(text);
      const errors = validateParticipants(parsed);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      setParticipants(parsed);
      showMessage(`${parsed.length} Teilnehmer geladen`);
    } catch (err) {
      showMessage("CSV-Parse-Fehler: " + err.message, true);
    }
  };

  const handleRankingsUpload = (text) => {
    try {
      const parsed = parseCsv(text);
      const errors = validateRankings(parsed, songs.length);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      setRankings(parsed);
      showMessage(`${parsed.length} Ranglisteneinträge geladen`);
    } catch (err) {
      showMessage("CSV-Parse-Fehler: " + err.message, true);
    }
  };

  const handleRatingsUpload = (text) => {
    try {
      const parsed = parseCsv(text);
      const errors = validateRatings(parsed);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      setRatings(parsed);
      showMessage(`${parsed.length} Ratings geladen`);
    } catch (err) {
      showMessage("CSV-Parse-Fehler: " + err.message, true);
    }
  };

  const handleOfficialUpload = (text) => {
    try {
      const parsed = parseCsv(text);
      const errors = validateOfficialResults(parsed, songs.length);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      setOfficialResults(parsed);
      showMessage(`${parsed.length} Offizielle Platzierungen geladen`);
    } catch (err) {
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

  const saveSongs = async () => {
    try {
      const errors = validateSongs(songs);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      await api.adminBulkUploadEntries(eventId, songs);
      showMessage("Songs/Länder gespeichert");
      if (onSave) onSave();
    } catch (err) {
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
    } catch (err) {
      showMessage("Fehler beim Speichern: " + err.message, true);
    }
  };

  const saveRankings = async () => {
    try {
      const errors = validateRankings(rankings, songs.length);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      await api.adminBulkUploadRankings(eventId, rankings);
      showMessage("Ranglistentipps gespeichert");
      if (onSave) onSave();
    } catch (err) {
      showMessage("Fehler beim Speichern: " + err.message, true);
    }
  };

  const saveRatings = async () => {
    try {
      const errors = validateRatings(ratings);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      await api.adminBulkUploadRatings(eventId, ratings);
      showMessage("Ratings gespeichert");
      if (onSave) onSave();
    } catch (err) {
      showMessage("Fehler beim Speichern: " + err.message, true);
    }
  };

  const saveOfficialResults = async () => {
    try {
      const errors = validateOfficialResults(officialResults, songs.length);
      if (errors.length > 0) {
        showMessage(errors.join("; "), true);
        return;
      }
      await api.adminBulkUploadOfficialResults(eventId, officialResults);
      showMessage("Offizielles Ergebnis gespeichert");
      if (onSave) onSave();
    } catch (err) {
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
            existingEntries.map((entry) => ({
              country: entry.countryName,
              song: entry.songTitle || "",
              artist: entry.artistName || ""
            }))
          );
        }
        const existingParticipants = await api.adminParticipants();
        if (existingParticipants?.length) {
          setParticipants(
            existingParticipants.map((participant) => ({
              username: participant.username,
              display_name: participant.displayName,
              email: participant.email || ""
            }))
          );
        }
      } catch (err) {
        showMessage("Fehler beim Laden: " + err.message, true);
      }
    })();
  }, [eventId]);

  return (
    <div className="admin-section">
      <h2>Event-Daten verwalten</h2>

      <div className="card">
        <h3>Songs/Länder</h3>
        <CsvUpload
          label="Songs/Länder CSV hochladen"
          onUpload={handleSongsUpload}
          example={
            "data:text/csv;charset=utf-8," +
            encodeURIComponent(
              SONGS_HEADER + "Schweden,Unicorn,Jane Doe\nDeutschland,Fireworks,Max Mustermann"
            )
          }
        />
        <DataTable
          columns={[
            { key: "country", label: "Land", editable: true },
            { key: "song", label: "Song", editable: true },
            { key: "artist", label: "Künstler", editable: true },
          ]}
          data={songs}
          onChange={(i, k, v) => {
            const next = [...songs];
            next[i][k] = v;
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
            { key: "email", label: "E-Mail", editable: true },
          ]}
          data={participants}
          onChange={(i, k, v) => {
            const next = [...participants];
            next[i][k] = v;
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
                "tobiit,Deutschland,23\ntobiit,Italien,3\ntobiit,Schweden,1\ntobiit,Malta,18"
            )
          }
        />
        <DataTable
          columns={[
            { key: "username", label: "Benutzername", editable: true },
            { key: "country", label: "Land", editable: true },
            { key: "rank", label: "Platz", editable: true },
          ]}
          data={rankings}
          onChange={(i, k, v) => {
            const next = [...rankings];
            next[i][k] = v;
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
                "tobiit,Deutschland,12\ntobiit,Italien,10\ntobiit,Schweden,8\ntobiit,Malta,7"
            )
          }
        />
        <DataTable
          columns={[
            { key: "username", label: "Benutzername", editable: true },
            { key: "country", label: "Land", editable: true },
            { key: "points", label: "Punkte", editable: true }
          ]}
          data={ratings}
          onChange={(i, k, v) => {
            const next = [...ratings];
            next[i][k] = v;
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
        <CsvUpload
          label="Offizielles Ergebnis CSV hochladen"
          onUpload={handleOfficialUpload}
          example={
            "data:text/csv;charset=utf-8," +
            encodeURIComponent(
              OFFICIAL_HEADER + "Schweden,1\nDeutschland,23\nItalien,3\nMalta,18"
            )
          }
        />
        <DataTable
          columns={[
            { key: "country", label: "Land", editable: true },
            { key: "rank", label: "Platz", editable: true }
          ]}
          data={officialResults}
          onChange={(i, k, v) => {
            const next = [...officialResults];
            next[i][k] = v;
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

      {message && <div className="toast" style={{ background: "var(--core-color-green-700, #2c7b2e)" }}>{message}</div>}
      {error && <div className="toast" style={{ background: "var(--core-color-red-600, #d12800)" }}>{error}</div>}
    </div>
  );
}
