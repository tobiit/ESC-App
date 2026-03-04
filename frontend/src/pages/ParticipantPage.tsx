import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, clearTokens } from "../api";

type Entry = { id: number; countryName: string; songTitle?: string; artistName?: string; sortOrder: number };
type User = { id: number; role: "admin" | "participant"; username: string; displayName: string };

const ESC_POINTS = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

export function ParticipantPage({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [event, setEvent] = useState<any>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ratingMap, setRatingMap] = useState<Record<number, number>>({});
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [prediction, setPrediction] = useState<number[]>([]);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"rating" | "prediction" | "results">("rating");
  const navigate = useNavigate();

  const selectedPoints = useMemo(() => new Set(Object.values(ratingMap)), [ratingMap]);

  useEffect(() => {
    if (user.role !== "participant") {
      navigate("/verwaltung/");
      return;
    }
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
  }, [user, navigate]);

  const handleLogout = async () => {
    try { await api.logout(); } finally { clearTokens(); onLogout(); navigate("/"); }
  };

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

  return (
    <div className="shell">
      <div className="topbar">
        <strong>ESC Tippspiel</strong>
        <span>{user.displayName}</span>
        <button className="btn btn-plain" onClick={() => void handleLogout()}>Logout</button>
      </div>

      {!event ? (
        <div className="layout"><div className="card"><p>Kein aktives Event vorhanden.</p></div></div>
      ) : (
        <div className="layout">
          <div className="card">
            <h2>{event.name}</h2>
            <p>Hallo {user.displayName} · Status: <span className="badge">{event.status}</span></p>
          </div>

          <div className="tab-bar">
            <button className={`tab-item${tab === "rating" ? " tab-item--active" : ""}`} onClick={() => setTab("rating")}>Bewertung</button>
            <button className={`tab-item${tab === "prediction" ? " tab-item--active" : ""}`} onClick={() => setTab("prediction")}>Tipp</button>
            <button className={`tab-item${tab === "results" ? " tab-item--active" : ""}`} onClick={() => setTab("results")}>Ergebnis</button>
          </div>

          {tab === "rating" && (
            <div className="card">
              <h3>Rating (1-8, 10, 12)</h3>
              {entries.map((entry) => (
                <div className="row" key={entry.id}>
                  <span>{entry.countryName}</span>
                  <select
                    className="form-input form-input--inline"
                    disabled={ratingSubmitted || event.status !== "open"}
                    value={ratingMap[entry.id] || ""}
                    onChange={(eventValue) => {
                      const value = Number(eventValue.target.value);
                      setRatingMap((previous) => {
                        const next = { ...previous };
                        for (const [key, existing] of Object.entries(next)) {
                          if (existing === value) delete next[Number(key)];
                        }
                        if (!value) { delete next[entry.id]; } else { next[entry.id] = value; }
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
                  <button className="btn" onClick={() => void saveRating()}>Entwurf speichern</button>
                  <button className="btn btn-primary" onClick={() => void submitRating()}>Einreichen</button>
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
                    <span>{index + 1}. {entry?.countryName}</span>
                    <div className="inline">
                      <button className="btn btn-icon" disabled={predictionSubmitted || event.status !== "open"} onClick={() => move(index, -1)}>↑</button>
                      <button className="btn btn-icon" disabled={predictionSubmitted || event.status !== "open"} onClick={() => move(index, 1)}>↓</button>
                    </div>
                  </div>
                );
              })}
              {!predictionSubmitted && event.status === "open" && (
                <div className="actions">
                  <button className="btn" onClick={() => void savePrediction()}>Entwurf speichern</button>
                  <button className="btn btn-primary" onClick={() => void submitPrediction()}>Einreichen</button>
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
                  <p>Liste A (gegen Teilnehmer-Ranking): {results.me?.scoreAgainstRatingsRanking?.points ?? "-"} Punkte, Platz {results.me?.scoreAgainstRatingsRanking?.rank ?? "-"}</p>
                  <p>Liste B (gegen offizielles Ranking): {results.me?.scoreAgainstOfficialRanking?.points ?? "-"} Punkte, Platz {results.me?.scoreAgainstOfficialRanking?.rank ?? "-"}</p>
                </>
              )}
            </div>
          )}

          {message && <div className="toast">{message}</div>}
        </div>
      )}
    </div>
  );
}
