import { useEffect, useMemo, useState } from "react";
import { api, clearTokens, setTokens } from "./api";

type Entry = { id: number; countryName: string; songTitle?: string; artistName?: string; sortOrder: number };
type User = { id: number; role: "admin" | "participant"; username: string; displayName: string };

const ESC_POINTS = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

const storedUserRaw = localStorage.getItem("esc_user");
const storedUser: User | null = storedUserRaw ? JSON.parse(storedUserRaw) : null;

function Login({ onLogin }: { onLogin: (user: User) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="card login">
      <h1>ESC Finale Tippspiel</h1>
      <p>Teilnehmer und Admin Login</p>
      <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Benutzername" />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Passwort"
        type="password"
      />
      <label>
        <input type="checkbox" checked={admin} onChange={(event) => setAdmin(event.target.checked)} /> Admin Login
      </label>
      <button
        onClick={async () => {
          setError("");
          try {
            const payload = await api.login(username, password, admin);
            setTokens(payload);
            localStorage.setItem("esc_user", JSON.stringify(payload.user));
            onLogin(payload.user);
          } catch (err) {
            setError((err as Error).message);
          }
        }}
      >
        Anmelden
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

function ParticipantArea({ user }: { user: User }) {
  const [event, setEvent] = useState<any>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ratingMap, setRatingMap] = useState<Record<number, number>>({});
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [prediction, setPrediction] = useState<number[]>([]);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"rating" | "prediction" | "results">("rating");

  const selectedPoints = useMemo(() => new Set(Object.values(ratingMap)), [ratingMap]);

  useEffect(() => {
    void (async () => {
      try {
        const activeEvent = await api.getActiveEvent();
        setEvent(activeEvent);
        if (!activeEvent) return;
        const loadedEntries = await api.getEntries(activeEvent.id);
        setEntries(loadedEntries);
        setPrediction(loadedEntries.map((entry: Entry) => entry.id));

        const myRating = await api.getMyRating(activeEvent.id);
        setRatingSubmitted(myRating.status === "submitted");
        const map: Record<number, number> = {};
        for (const item of myRating.items || []) map[item.entryId] = item.points;
        setRatingMap(map);

        const myPrediction = await api.getMyPrediction(activeEvent.id);
        setPredictionSubmitted(myPrediction.status === "submitted");
        if ((myPrediction.items || []).length === loadedEntries.length) {
          setPrediction(myPrediction.items.map((item: any) => item.entryId));
        }

        if (activeEvent.status === "finished") {
          const data = await api.getResults(activeEvent.id);
          setResults(data);
        }
      } catch (err) {
        setMessage((err as Error).message);
      }
    })();
  }, []);

  const saveRating = async () => {
    if (!event) return;
    const items = Object.entries(ratingMap).map(([entryId, points]) => ({ entryId: Number(entryId), points }));
    await api.saveMyRating(event.id, items);
    setMessage("Rating gespeichert");
  };

  const submitRating = async () => {
    if (!event) return;
    await api.submitMyRating(event.id);
    setRatingSubmitted(true);
    setMessage("Rating eingereicht");
  };

  const savePrediction = async () => {
    if (!event) return;
    const items = prediction.map((entryId, index) => ({ entryId, rank: index + 1 }));
    await api.saveMyPrediction(event.id, items);
    setMessage("Prediction gespeichert");
  };

  const submitPrediction = async () => {
    if (!event) return;
    await api.submitMyPrediction(event.id);
    setPredictionSubmitted(true);
    setMessage("Prediction eingereicht");
  };

  const move = (index: number, delta: -1 | 1) => {
    const next = [...prediction];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setPrediction(next);
  };

  if (!event) {
    return <div className="card">Kein aktives Event vorhanden.</div>;
  }

  return (
    <div className="layout">
      <div className="header card">
        <div>
          <h2>{event.name}</h2>
          <p>
            Hallo {user.displayName} · Status: <strong>{event.status}</strong>
          </p>
        </div>
      </div>

      <div className="tabs">
        <button onClick={() => setTab("rating")}>Bewertung</button>
        <button onClick={() => setTab("prediction")}>Tipp</button>
        <button onClick={() => setTab("results")}>Ergebnis</button>
      </div>

      {tab === "rating" && (
        <div className="card">
          <h3>Rating (1-8, 10, 12)</h3>
          {entries.map((entry) => (
            <div className="row" key={entry.id}>
              <span>{entry.countryName}</span>
              <select
                disabled={ratingSubmitted || event.status !== "open"}
                value={ratingMap[entry.id] || ""}
                onChange={(eventValue) => {
                  const value = Number(eventValue.target.value);
                  setRatingMap((previous) => {
                    const next = { ...previous };
                    for (const [key, existing] of Object.entries(next)) {
                      if (existing === value) delete next[Number(key)];
                    }
                    if (!value) {
                      delete next[entry.id];
                    } else {
                      next[entry.id] = value;
                    }
                    return next;
                  });
                }}
              >
                <option value="">0</option>
                {ESC_POINTS.map((point) => (
                  <option key={point} value={point} disabled={selectedPoints.has(point) && ratingMap[entry.id] !== point}>
                    {point}
                  </option>
                ))}
              </select>
            </div>
          ))}
          {!ratingSubmitted && event.status === "open" && (
            <div className="actions">
              <button onClick={() => void saveRating()}>Entwurf speichern</button>
              <button className="primary" onClick={() => void submitRating()}>Einreichen</button>
            </div>
          )}
          {ratingSubmitted && <p className="hint">Rating ist eingereicht und gesperrt.</p>}
        </div>
      )}

      {tab === "prediction" && (
        <div className="card">
          <h3>Prediction Rangliste</h3>
          {prediction.map((entryId, index) => {
            const entry = entries.find((item) => item.id === entryId);
            return (
              <div key={entryId} className="row">
                <span>
                  {index + 1}. {entry?.countryName}
                </span>
                <div className="inline">
                  <button disabled={predictionSubmitted || event.status !== "open"} onClick={() => move(index, -1)}>
                    ↑
                  </button>
                  <button disabled={predictionSubmitted || event.status !== "open"} onClick={() => move(index, 1)}>
                    ↓
                  </button>
                </div>
              </div>
            );
          })}
          {!predictionSubmitted && event.status === "open" && (
            <div className="actions">
              <button onClick={() => void savePrediction()}>Entwurf speichern</button>
              <button className="primary" onClick={() => void submitPrediction()}>Einreichen</button>
            </div>
          )}
          {predictionSubmitted && <p className="hint">Prediction ist eingereicht und gesperrt.</p>}
        </div>
      )}

      {tab === "results" && (
        <div className="card">
          <h3>Ergebnisse</h3>
          {event.status !== "finished" && <p>Ergebnisse werden nach Event-Abschluss angezeigt.</p>}
          {results && (
            <>
              <p>
                Liste A (gegen Teilnehmer-Ranking): {results.me?.scoreAgainstRatingsRanking?.points ?? "-"} Punkte,
                Platz {results.me?.scoreAgainstRatingsRanking?.rank ?? "-"}
              </p>
              <p>
                Liste B (gegen offizielles Ranking): {results.me?.scoreAgainstOfficialRanking?.points ?? "-"} Punkte,
                Platz {results.me?.scoreAgainstOfficialRanking?.rank ?? "-"}
              </p>
            </>
          )}
        </div>
      )}
      {message && <div className="toast">{message}</div>}
    </div>
  );
}

function AdminArea() {
  const [events, setEvents] = useState<any[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [official, setOfficial] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  const load = async () => {
    const [eventRows, participantRows] = await Promise.all([api.adminEvents(), api.adminParticipants()]);
    setEvents(eventRows);
    setParticipants(participantRows);
    const active = eventRows.find((event: any) => event.isActive) || eventRows[0];
    if (active) {
      setSelectedEventId(active.id);
      const loadedEntries = await api.adminEntries(active.id);
      setEntries(loadedEntries);
      const officialResult = await api.adminOfficialResult(active.id);
      if ((officialResult.items || []).length === loadedEntries.length) {
        setOfficial(officialResult.items.map((item: any) => item.entryId));
      } else {
        setOfficial(loadedEntries.map((item: any) => item.id));
      }
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="layout">
      <div className="card">
        <h3>Teilnehmer Verwaltung</h3>
        <button
          onClick={async () => {
            const username = prompt("Benutzername");
            const password = prompt("Passwort");
            const displayName = prompt("Anzeige Name");
            if (!username || !password || !displayName) return;
            await api.adminCreateParticipant({ username, password, displayName });
            await load();
          }}
        >
          Teilnehmer anlegen
        </button>
        {participants.map((participant) => (
          <div className="row" key={participant.id}>
            <span>{participant.displayName}</span>
            <div className="inline">
              <button
                onClick={async () => {
                  const displayName = prompt("Neuer Anzeige Name", participant.displayName) || participant.displayName;
                  await api.adminUpdateParticipant(participant.id, {
                    displayName,
                    isActive: !participant.isActive ? true : participant.isActive
                  });
                  await load();
                }}
              >
                Bearbeiten
              </button>
              <button
                onClick={async () => {
                  const password = prompt("Neues Passwort");
                  if (!password) return;
                  await api.adminResetPassword(participant.id, password);
                  setMessage("Passwort zurückgesetzt");
                }}
              >
                Passwort
              </button>
              <button
                onClick={async () => {
                  await api.adminDeleteParticipant(participant.id);
                  await load();
                }}
              >
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Event Verwaltung</h3>
        <button
          onClick={async () => {
            const name = prompt("Event Name", "ESC Finale") || "ESC Finale";
            const year = Number(prompt("Jahr", String(new Date().getFullYear())));
            await api.adminCreateEvent({ name, year, status: "draft", isActive: events.length === 0 });
            await load();
          }}
        >
          Event anlegen
        </button>
        <select
          value={selectedEventId || ""}
          onChange={async (event) => {
            const eventId = Number(event.target.value);
            setSelectedEventId(eventId);
            const loadedEntries = await api.adminEntries(eventId);
            setEntries(loadedEntries);
            setOfficial(loadedEntries.map((item: any) => item.id));
          }}
        >
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} ({event.status})
            </option>
          ))}
        </select>
        {selectedEventId && (
          <div className="inline">
            {(["draft", "open", "locked", "finished"] as const).map((status) => (
              <button
                key={status}
                onClick={async () => {
                  const eventRow = events.find((row) => row.id === selectedEventId);
                  await api.adminUpdateEvent(selectedEventId, {
                    name: eventRow.name,
                    year: eventRow.year,
                    status,
                    isActive: true
                  });
                  await load();
                }}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h3>Entries & Official Result</h3>
        {selectedEventId && (
          <>
            <button
              onClick={async () => {
                const countryName = prompt("Land") || "";
                if (!countryName) return;
                await api.adminAddEntry(selectedEventId, { countryName, sortOrder: entries.length + 1 });
                await load();
              }}
            >
              Entry anlegen
            </button>
            {entries.map((entry, index) => (
              <div key={entry.id} className="row">
                <span>{index + 1}. {entry.countryName}</span>
                <div className="inline">
                  <button
                    onClick={async () => {
                      const countryName = prompt("Land", entry.countryName) || entry.countryName;
                      await api.adminUpdateEntry(entry.id, {
                        countryName,
                        songTitle: entry.songTitle,
                        artistName: entry.artistName,
                        sortOrder: entry.sortOrder
                      });
                      await load();
                    }}
                  >
                    Bearbeiten
                  </button>
                  <button onClick={async () => { await api.adminDeleteEntry(entry.id); await load(); }}>Löschen</button>
                </div>
              </div>
            ))}

            <h4>Offizielles Ergebnis (Up/Down)</h4>
            {official.map((entryId, index) => {
              const entry = entries.find((item) => item.id === entryId);
              return (
                <div className="row" key={entryId}>
                  <span>{index + 1}. {entry?.countryName}</span>
                  <div className="inline">
                    <button
                      onClick={() => {
                        if (index === 0) return;
                        const copy = [...official];
                        [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
                        setOfficial(copy);
                      }}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => {
                        if (index === official.length - 1) return;
                        const copy = [...official];
                        [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
                        setOfficial(copy);
                      }}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              );
            })}
            <button
              className="primary"
              onClick={async () => {
                await api.adminSaveOfficialResult(
                  selectedEventId,
                  official.map((entryId, index) => ({ entryId, rank: index + 1 }))
                );
                setMessage("Official Result gespeichert");
              }}
            >
              Official Result speichern
            </button>
          </>
        )}
      </div>
      {message && <div className="toast">{message}</div>}
    </div>
  );
}

export function App() {
  const [user, setUser] = useState<User | null>(storedUser);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="shell">
      <div className="topbar">
        <strong>ESCAPP</strong>
        <span>{user.displayName}</span>
        <button
          onClick={async () => {
            try {
              await api.logout();
            } finally {
              clearTokens();
              setUser(null);
            }
          }}
        >
          Logout
        </button>
      </div>
      {user.role === "admin" ? <AdminArea /> : <ParticipantArea user={user} />}
    </div>
  );
}
