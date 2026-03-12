import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, clearTokens } from "../api";
import { getCountryNameDe } from "../lib/countries";

type Entry = { id: number; countryCode: string; songTitle?: string; artistName?: string; sortOrder: number };
type User = { id: number; role: "admin" | "participant"; username: string; displayName: string };
type DropIndicatorPosition = "before" | "after";

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
  const [toastFading, setToastFading] = useState(false);
  const [tab, setTab] = useState<"rating" | "prediction" | "results">("rating");
  const [draggedEntryId, setDraggedEntryId] = useState<number | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{ entryId: number; position: DropIndicatorPosition } | null>(null);
  const [rankInputs, setRankInputs] = useState<Record<number, string>>({});
  const [expandedLeaderboardA, setExpandedLeaderboardA] = useState(false);
  const [expandedLeaderboardB, setExpandedLeaderboardB] = useState(false);
  const navigate = useNavigate();

  const selectedPoints = useMemo(() => new Set(Object.values(ratingMap)), [ratingMap]);

  // Auto-fade toast after 8 seconds.
  useEffect(() => {
    if (!message) return;
    setToastFading(false);
    const fadeTimer = setTimeout(() => {
      setToastFading(true);
    }, 8000);
    const clearTimer = setTimeout(() => {
      setMessage("");
      setToastFading(false);
    }, 8300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(clearTimer);
    };
  }, [message]);

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

  const moveToDropPosition = (fromIndex: number, targetIndex: number, position: DropIndicatorPosition) => {
    if (fromIndex < 0 || targetIndex < 0) return;
    if (fromIndex >= prediction.length || targetIndex >= prediction.length) return;

    let insertionIndex = targetIndex + (position === "after" ? 1 : 0);
    if (fromIndex < insertionIndex) insertionIndex -= 1;
    if (fromIndex === insertionIndex) return;

    const next = [...prediction];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(insertionIndex, 0, moved);
    setPrediction(next);
  };

  useEffect(() => {
    const nextInputs: Record<number, string> = {};
    prediction.forEach((entryId, index) => {
      nextInputs[entryId] = String(index + 1);
    });
    setRankInputs(nextInputs);
  }, [prediction]);

  const commitRankChange = (entryId: number) => {
    const fromIndex = prediction.findIndex((id) => id === entryId);
    if (fromIndex < 0) return;

    const typedRank = Number.parseInt((rankInputs[entryId] ?? "").trim(), 10);
    if (Number.isNaN(typedRank)) return;

    const clampedRank = Math.min(prediction.length, Math.max(1, typedRank));
    const targetIndex = clampedRank - 1;
    if (targetIndex === fromIndex) return;

    if (targetIndex > fromIndex) {
      moveToDropPosition(fromIndex, targetIndex, "after");
      return;
    }
    moveToDropPosition(fromIndex, targetIndex, "before");
  };

  const truncateSongTitle = (songTitle?: string) => {
    if (!songTitle) return "-";
    return songTitle.length > 10 ? `${songTitle.slice(0, 10)}...` : songTitle;
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
            <button className={`tab-item${tab === "rating" ? " tab-item--active" : ""}`} onClick={() => setTab("rating")}>
              <span className="tab-item__icon" aria-hidden="true">♥</span>
              Bewertung
            </button>
            <button className={`tab-item${tab === "prediction" ? " tab-item--active" : ""}`} onClick={() => setTab("prediction")}>
              <span className="tab-item__icon" aria-hidden="true">€</span>
              Tipp
            </button>
            <button className={`tab-item${tab === "results" ? " tab-item--active" : ""}`} onClick={() => setTab("results")}>
              <span className="tab-item__icon" aria-hidden="true">🏆</span>
              Ergebnis
            </button>
          </div>

          {tab === "rating" && (
            <div className="card">
              <h3>Rating (1-8, 10, 12)</h3>
              <table className="data-table prediction-table rating-table">
                <thead>
                  <tr>
                    <th className="prediction-table__country-header">Land</th>
                    <th className="prediction-table__song-header">Song</th>
                    <th className="rating-table__points-header">Bewertung</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="prediction-table__country-cell">{getCountryNameDe(entry.countryCode)}</td>
                      <td className="prediction-table__song-cell" title={entry.songTitle ?? ""}>{truncateSongTitle(entry.songTitle)}</td>
                      <td className="rating-table__points-cell">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <table className="data-table prediction-table">
                <thead>
                  <tr>
                    <th className="prediction-table__rank-header">Rang</th>
                    <th className="prediction-table__country-header">Land</th>
                    <th className="prediction-table__song-header">Song</th>
                    <th>Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {prediction.map((entryId, index) => {
                    const entry = entries.find((item) => item.id === entryId);
                    const dragEnabled = !predictionSubmitted && event.status === "open";
                    return (
                      <tr
                        key={entryId}
                        className={`prediction-table__row${dragEnabled ? " prediction-table__row--movable" : ""}${draggedEntryId === entryId ? " prediction-table__row--dragging" : ""}${dropIndicator?.entryId === entryId && dropIndicator.position === "before" ? " prediction-table__row--drop-before" : ""}${dropIndicator?.entryId === entryId && dropIndicator.position === "after" ? " prediction-table__row--drop-after" : ""}`}
                        draggable={dragEnabled}
                        onDragStart={() => {
                          setDraggedEntryId(entryId);
                          setDropIndicator(null);
                        }}
                        onDragEnd={() => {
                          setDraggedEntryId(null);
                          setDropIndicator(null);
                        }}
                        onDragOver={(dragEvent) => {
                          if (!dragEnabled || draggedEntryId === null) return;
                          dragEvent.preventDefault();
                          const rowRect = dragEvent.currentTarget.getBoundingClientRect();
                          const position: DropIndicatorPosition = dragEvent.clientY < rowRect.top + rowRect.height / 2 ? "before" : "after";
                          if (draggedEntryId !== entryId) {
                            setDropIndicator({ entryId, position });
                          }
                        }}
                        onDragLeave={(dragEvent) => {
                          if (dropIndicator?.entryId !== entryId) return;
                          const related = dragEvent.relatedTarget as Node | null;
                          if (!related || !dragEvent.currentTarget.contains(related)) {
                            setDropIndicator(null);
                          }
                        }}
                        onDrop={() => {
                          if (!dragEnabled || draggedEntryId === null || !dropIndicator) return;
                          const fromIndex = prediction.findIndex((id) => id === draggedEntryId);
                          moveToDropPosition(fromIndex, index, dropIndicator.position);
                          setDraggedEntryId(null);
                          setDropIndicator(null);
                        }}
                      >
                        <td className="prediction-table__rank-cell">
                          <input
                            className="prediction-table__rank-input"
                            type="number"
                            min={1}
                            max={prediction.length}
                            inputMode="numeric"
                            disabled={!dragEnabled}
                            value={rankInputs[entryId] ?? String(index + 1)}
                            onChange={(inputEvent) => {
                              const nextValue = inputEvent.target.value;
                              setRankInputs((previous) => ({ ...previous, [entryId]: nextValue }));
                            }}
                            onBlur={() => {
                              commitRankChange(entryId);
                            }}
                            onKeyDown={(keyboardEvent) => {
                              if (keyboardEvent.key === "Enter") {
                                keyboardEvent.preventDefault();
                                commitRankChange(entryId);
                                keyboardEvent.currentTarget.blur();
                              }
                              if (keyboardEvent.key === "Tab") {
                                commitRankChange(entryId);
                              }
                            }}
                          />
                        </td>
                        <td className="prediction-table__country-cell">{getCountryNameDe(entry?.countryCode ?? "") ?? "-"}</td>
                        <td className="prediction-table__song-cell" title={entry?.songTitle ?? ""}>{truncateSongTitle(entry?.songTitle)}</td>
                        <td>
                          <div className="inline">
                            <button className="btn btn-icon" disabled={!dragEnabled} onClick={() => move(index, -1)}>↑</button>
                            <button className="btn btn-icon" disabled={!dragEnabled} onClick={() => move(index, 1)}>↓</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!predictionSubmitted && event.status === "open" && (
                <p className="hint">Tipp: Ziehe ein Land per Drag-and-Drop oder gib den Rang direkt numerisch ein.</p>
              )}
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
                  {/* Leaderboard against Official Ranking */}
                  <div className="results-section">
                    <h4>Platzierungen gegen offizielles Ranking</h4>
                    {results.leaderboardB && results.leaderboardB.length > 0 ? (
                      <>
                        <table className="data-table results-table">
                          <thead>
                            <tr>
                              <th className="results-table__rank">Platz</th>
                              <th>Teilnehmer</th>
                              <th className="results-table__points">Punkte</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(expandedLeaderboardB ? results.leaderboardB : results.leaderboardB.slice(0, 5)).map(
                              (participant: any, idx: number) => (
                                <tr
                                  key={participant.participantId}
                                  className={`results-table__row${
                                    participant.rank <= 3 ? ` results-table__row--top-${participant.rank}` : ""
                                  }${participant.participantId === Number(user.id) ? " results-table__row--me" : ""}`}
                                >
                                  <td className="results-table__rank-cell">
                                    {participant.rank === 1
                                      ? "🥇"
                                      : participant.rank === 2
                                        ? "🥈"
                                        : participant.rank === 3
                                          ? "🥉"
                                          : participant.rank}
                                  </td>
                                  <td>{participant.displayName}</td>
                                  <td className="results-table__points-cell">{participant.points}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        {results.leaderboardB.length > 5 && !expandedLeaderboardB && (
                          <button className="btn btn-plain" onClick={() => setExpandedLeaderboardB(true)}>
                            {results.leaderboardB.length - 5} weitere Teilnehmer anzeigen
                          </button>
                        )}
                        {expandedLeaderboardB && results.leaderboardB.length > 5 && (
                          <button className="btn btn-plain" onClick={() => setExpandedLeaderboardB(false)}>
                            Einklappen
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="hint">Keine Ergebnisse verfügbar.</p>
                    )}
                  </div>

                  {/* Leaderboard against Ratings Ranking */}
                  <div className="results-section">
                    <h4>Platzierungen gegen internes Ranking</h4>
                    {results.leaderboardA && results.leaderboardA.length > 0 ? (
                      <>
                        <table className="data-table results-table">
                          <thead>
                            <tr>
                              <th className="results-table__rank">Platz</th>
                              <th>Teilnehmer</th>
                              <th className="results-table__points">Punkte</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(expandedLeaderboardA ? results.leaderboardA : results.leaderboardA.slice(0, 5)).map(
                              (participant: any) => (
                                <tr
                                  key={participant.participantId}
                                  className={`results-table__row${
                                    participant.rank <= 3 ? ` results-table__row--top-${participant.rank}` : ""
                                  }${participant.participantId === Number(user.id) ? " results-table__row--me" : ""}`}
                                >
                                  <td className="results-table__rank-cell">
                                    {participant.rank === 1
                                      ? "🥇"
                                      : participant.rank === 2
                                        ? "🥈"
                                        : participant.rank === 3
                                          ? "🥉"
                                          : participant.rank}
                                  </td>
                                  <td>{participant.displayName}</td>
                                  <td className="results-table__points-cell">{participant.points}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        {results.leaderboardA.length > 5 && !expandedLeaderboardA && (
                          <button className="btn btn-plain" onClick={() => setExpandedLeaderboardA(true)}>
                            {results.leaderboardA.length - 5} weitere Teilnehmer anzeigen
                          </button>
                        )}
                        {expandedLeaderboardA && results.leaderboardA.length > 5 && (
                          <button className="btn btn-plain" onClick={() => setExpandedLeaderboardA(false)}>
                            Einklappen
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="hint">Keine Ergebnisse verfügbar.</p>
                    )}
                  </div>

                  {/* Rating Ranking */}
                  <div className="results-section">
                    <h4>Internes Ranking (aus Teilnehmer-Bewertungen)</h4>
                    {results.ratingRanking && results.ratingRanking.length > 0 ? (
                      <table className="data-table results-table">
                        <thead>
                          <tr>
                            <th className="results-table__rank">Rang</th>
                            <th>Land</th>
                            <th className="results-table__points">Gesamt-Punkte</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.ratingRanking.map((entry: any, idx: number) => (
                            <tr key={entry.entryId} className={idx % 2 === 0 ? "results-table__row--even" : ""}>
                              <td className="results-table__rank-cell">{entry.rank}</td>
                              <td>{getCountryNameDe(entry.countryCode)}</td>
                              <td className="results-table__points-cell">{entry.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="hint">Keine Bewertungsrangliste verfügbar.</p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {message && <div className={`toast ${toastFading ? 'toast--fade-out' : ''}`}>{message}</div>}
        </div>
      )}
    </div>
  );
}
