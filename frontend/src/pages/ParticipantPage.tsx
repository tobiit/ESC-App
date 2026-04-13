import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, clearTokens } from "../api";
import { getCountryNameDe } from "../lib/countries";

type Entry = { id: number; countryCode: string; songTitle?: string; artistName?: string; sortOrder: number };
type User = { id: number; role: "admin" | "participant"; username: string; displayName: string };
type DropIndicatorPosition = "before" | "after";
type TutorialStep = {
  title: string;
  body: string;
  tab: "rating" | "prediction" | "results";
  target:
    | "tab-rating"
    | "tab-prediction"
    | "tab-results"
    | "rating-table"
    | "rating-actions"
    | "prediction-table"
    | "prediction-actions"
    | "results-section";
};

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
  const [predictionOrderLocked, setPredictionOrderLocked] = useState(false);
  const [predictionRankErrors, setPredictionRankErrors] = useState<Record<number, string>>({});
  const [expandedLeaderboardA, setExpandedLeaderboardA] = useState(false);
  const [expandedLeaderboardB, setExpandedLeaderboardB] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [submitConfirmation, setSubmitConfirmation] = useState<null | "rating" | "prediction">(null);
  const rankInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const navigate = useNavigate();

  const tutorialSteps: TutorialStep[] = [
    {
      title: "Tab: Bewertung",
      body: "Hier gibt es nichts zu gewinnen, aber Sie bewerten die Songs nach Ihrem eigenen Geschmack.",
      tab: "rating",
      target: "tab-rating"
    },
    {
      title: "Bewertungsliste",
      body: "Jedes Land kann genau einen Punktwert bekommen: 1-8, 10 oder 12. Jeder Wert darf nur einmal vergeben werden.",
      tab: "rating",
      target: "rating-table"
    },
    {
      title: "Bewertung speichern",
      body: "Sie können Entwürfe jederzeit unvollständig speichern und später ergänzen. Erst beim Einreichen wird gesperrt.",
      tab: "rating",
      target: "rating-actions"
    },
    {
      title: "Tab: Tipp",
      body: "Das ist Ihre Gewinnchance, tippen Sie die tatsächliche Platzierung  , für alle Songs (jeder Rang darf nur einmal vorkommen).",
      tab: "prediction",
      target: "tab-prediction"
    },
    {
      title: "Tippliste sortieren",
      body: "Ordnen Sie Länder per Drag-and-Drop oder Pfeiltasten. Sie können auch direkt Ihre Lieblingssongs neu anordnen oder verschieben.",
      tab: "prediction",
      target: "prediction-table"
    },
    {
      title: "Startreihenfolge fixieren",
      body: "Mit dieser Funktion geben Sie die Rangnummern direkt ein – ideal, wenn Sie einen Tipp von Papier abtippen. Tippen Sie alle Rang-Nummern ein und klicken dann 'Tabelle nach Rangeingabe neu sortieren', um die Reihenfolge automatisch zu berechnen.",
      tab: "prediction",
      target: "prediction-sort-mode"
    },
    {
      title: "Tipp speichern und einreichen",
      body: "Auch Tipps können als unvollständiger Entwurf gespeichert werden. Für die Einreichung muss die Rangliste vollständig sein.",
      tab: "prediction",
      target: "prediction-actions"
    },
    {
      title: "Tab: Ergebnis",
      body: "Nach Event-Ende sehen Sie hier Ihre Platzierungen gegen internes und offizielles Ranking sowie die Siegerlisten.",
      tab: "results",
      target: "tab-results"
    },
    {
      title: "Ergebnistabellen",
      body: "Diese Tabellen zeigen Punkte, Top-3 und interne Ranglisten. Mit " +
        "'weitere Teilnehmer anzeigen' können Sie die Ansicht erweitern.",
      tab: "results",
      target: "results-section"
    }
  ];

  const tutorialStep = tutorialSteps[tutorialIndex];

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
        if ((myPrediction.items || []).length > 0) {
          const byRank = [...myPrediction.items].sort((a: any, b: any) => Number(a.rank) - Number(b.rank));
          const rankedIds = byRank.map((item: any) => Number(item.entryId));
          const remainingIds = loadedEntries
            .map((entry: Entry) => entry.id)
            .filter((entryId: number) => !rankedIds.includes(entryId));
          setPrediction([...rankedIds, ...remainingIds]);

          const draftRankInputs: Record<number, string> = {};
          for (const entry of loadedEntries) {
            draftRankInputs[entry.id] = "";
          }
          for (const item of byRank) {
            draftRankInputs[Number(item.entryId)] = String(item.rank);
          }
          setRankInputs(draftRankInputs);
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

  const buildRatingItems = () =>
    Object.entries(ratingMap).map(([entryId, points]) => ({ entryId: Number(entryId), points }));

  const buildPredictionItems = () => {
    const items: Array<{ entryId: number; rank: number }> = [];
    const usedRanks = new Set<number>();
    for (const entryId of prediction) {
      const rank = Number.parseInt((rankInputs[entryId] ?? "").trim(), 10);
      if (Number.isNaN(rank)) continue;
      if (rank < 1 || rank > entries.length) {
        throw new Error(`Ungültiger Rang für ${getCountryNameDe(entries.find((e) => e.id === entryId)?.countryCode ?? "") ?? "Eintrag"}.`);
      }
      if (usedRanks.has(rank)) {
        throw new Error(`Rang ${rank} ist doppelt vergeben. Bitte korrigieren und erneut speichern.`);
      }
      usedRanks.add(rank);
      items.push({ entryId, rank });
    }
    items.sort((a, b) => a.rank - b.rank);
    return items;
  };

  const saveRating = async () => {
    if (!event) return;
    const items = buildRatingItems();
    await api.saveMyRating(event.id, items);
    setMessage(items.length < 10 ? "Rating-Entwurf gespeichert" : "Rating gespeichert");
  };

  const submitRating = async () => {
    if (!event) return;
    try {
      const items = buildRatingItems();
      await api.saveMyRating(event.id, items);
      await api.submitMyRating(event.id);
      setRatingSubmitted(true);
      setSubmitConfirmation(null);
      setMessage("Rating eingereicht");
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  const savePrediction = async () => {
    if (!event) return;
    let items: Array<{ entryId: number; rank: number }>;
    try {
      items = buildPredictionItems();
    } catch (error) {
      setMessage((error as Error).message);
      return;
    }
    await api.saveMyPrediction(event.id, items);
    setMessage(items.length < entries.length ? "Prediction-Entwurf gespeichert" : "Prediction gespeichert");
  };

  const submitPrediction = async () => {
    if (!event) return;
    try {
      const items = buildPredictionItems();
      await api.saveMyPrediction(event.id, items);
      await api.submitMyPrediction(event.id);
      setPredictionSubmitted(true);
      setSubmitConfirmation(null);
      setMessage("Prediction eingereicht");
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  const buildSequentialRankInputs = (orderedEntryIds: number[]) => {
    const nextInputs: Record<number, string> = {};
    orderedEntryIds.forEach((entryId, index) => {
      nextInputs[entryId] = String(index + 1);
    });
    return nextInputs;
  };

  const move = (index: number, delta: -1 | 1) => {
    const next = [...prediction];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setPrediction(next);
    setRankInputs(buildSequentialRankInputs(next));
    setPredictionRankErrors({});
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
    setRankInputs(buildSequentialRankInputs(next));
    setPredictionRankErrors({});
  };

  useEffect(() => {
    setRankInputs((previous) => {
      const nextInputs: Record<number, string> = {};
      prediction.forEach((entryId, index) => {
        const defaultRank = String(index + 1);
        const existing = previous[entryId];
        nextInputs[entryId] = existing === undefined ? defaultRank : existing;
      });
      return nextInputs;
    });
  }, [prediction]);

  useEffect(() => {
    if (!tutorialOpen) return;
    if (tab !== tutorialStep.tab) {
      setTab(tutorialStep.tab);
    }
  }, [tutorialOpen, tutorialStep, tab]);

  const startTutorial = () => {
    setTutorialIndex(0);
    setTutorialOpen(true);
    setTab(tutorialSteps[0].tab);
  };

  const stopTutorial = () => {
    setTutorialOpen(false);
  };

  const nextTutorialStep = () => {
    setTutorialIndex((prev) => Math.min(tutorialSteps.length - 1, prev + 1));
  };

  const previousTutorialStep = () => {
    setTutorialIndex((prev) => Math.max(0, prev - 1));
  };

  const tutorialHighlightClass = (target: TutorialStep["target"]) =>
    tutorialOpen && tutorialStep.target === target ? " tutorial-target tutorial-target--active" : "";

  useEffect(() => {
    if (!tutorialOpen) return;

    const scrollActiveTargetIntoView = () => {
      const activeTarget = document.querySelector(".tutorial-target--active") as HTMLElement | null;
      if (!activeTarget) return;

      const viewportTopPadding = 180;
      const viewportBottomPadding = 28;
      const rect = activeTarget.getBoundingClientRect();
      const isLargeTarget = rect.height > window.innerHeight * 0.58;
      const preferTopAnchoring =
        isLargeTarget || tutorialStep.target === "rating-table" || tutorialStep.target === "prediction-table";
      const isAboveViewport = rect.top < viewportTopPadding;
      const isBelowViewport = rect.bottom > window.innerHeight - viewportBottomPadding;

      if (!isAboveViewport && !isBelowViewport) return;

      const targetScrollTop = preferTopAnchoring
        ? Math.max(0, window.scrollY + rect.top - viewportTopPadding)
        : Math.max(0, window.scrollY + rect.top - (window.innerHeight / 2 - rect.height / 2));

      window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    };

    const frame = requestAnimationFrame(() => {
      setTimeout(scrollActiveTargetIntoView, 40);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [tutorialOpen, tutorialIndex, tab, tutorialStep.target, results, entries.length, prediction.length]);

  const validatePredictionRankInputs = (
    source: Record<number, string>,
    options?: { requireComplete?: boolean; focusFirstError?: boolean }
  ) => {
    const errors: Record<number, string> = {};
    const firstByRank = new Map<number, number>();
    let firstInvalidId: number | null = null;

    for (const entryId of prediction) {
      const raw = (source[entryId] ?? "").trim();
      if (!raw) {
        if (options?.requireComplete) {
          errors[entryId] = "Bitte Rang eingeben.";
          if (firstInvalidId === null) firstInvalidId = entryId;
        }
        continue;
      }

      const rank = Number.parseInt(raw, 10);
      if (Number.isNaN(rank) || rank < 1 || rank > prediction.length) {
        errors[entryId] = `Erlaubt sind nur Werte von 1 bis ${prediction.length}.`;
        if (firstInvalidId === null) firstInvalidId = entryId;
        continue;
      }

      const existingEntryId = firstByRank.get(rank);
      if (existingEntryId !== undefined && existingEntryId !== entryId) {
        errors[entryId] = `Rang ${rank} ist doppelt vergeben.`;
        if (!errors[existingEntryId]) {
          errors[existingEntryId] = `Rang ${rank} ist doppelt vergeben.`;
        }
        if (firstInvalidId === null) firstInvalidId = existingEntryId;
        continue;
      }

      firstByRank.set(rank, entryId);
    }

    setPredictionRankErrors(errors);

    if (options?.focusFirstError && firstInvalidId !== null) {
      const element = rankInputRefs.current[firstInvalidId];
      if (element) {
        element.focus();
        element.select();
      }
    }

    return { valid: Object.keys(errors).length === 0, errors };
  };

  const handlePredictionSortModeToggle = () => {
    if (predictionSubmitted || event?.status !== "open") return;

    if (!predictionOrderLocked) {
      setPredictionOrderLocked(true);
      setPredictionRankErrors({});
      return;
    }

    const validation = validatePredictionRankInputs(rankInputs, {
      requireComplete: true,
      focusFirstError: true
    });
    if (!validation.valid) {
      setMessage("Bitte korrigieren Sie die markierten Rangfelder.");
      return;
    }

    const sorted = [...prediction].sort((leftId, rightId) => {
      const leftRank = Number.parseInt((rankInputs[leftId] ?? "").trim(), 10);
      const rightRank = Number.parseInt((rankInputs[rightId] ?? "").trim(), 10);
      return leftRank - rightRank;
    });

    setPrediction(sorted);
    setRankInputs(buildSequentialRankInputs(sorted));
    setPredictionOrderLocked(false);
    setPredictionRankErrors({});
  };

  const truncateSongTitle = (songTitle?: string) => {
    if (!songTitle) return "-";
    return songTitle.length > 10 ? `${songTitle.slice(0, 10)}...` : songTitle;
  };

  return (
    <div className="shell">
      <div className="topbar">
        <strong>ESC Tippspiel</strong>
        <div className="topbar__actions">
          <span>{user.displayName}</span>
          <button className="btn btn-plain btn-plain--on-dark" onClick={startTutorial} disabled={!event}>So geht's</button>
          <button className="btn btn-plain btn-plain--on-dark" onClick={() => void handleLogout()}>Logout</button>
        </div>
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
            <button className={`tab-item${tab === "rating" ? " tab-item--active" : ""}${tutorialHighlightClass("tab-rating")}`} onClick={() => setTab("rating")}>
              <span className="tab-item__icon" aria-hidden="true">♥</span>
              Bewertung
            </button>
            <button className={`tab-item${tab === "prediction" ? " tab-item--active" : ""}${tutorialHighlightClass("tab-prediction")}`} onClick={() => setTab("prediction")}>
              <span className="tab-item__icon" aria-hidden="true">€</span>
              Tipp
            </button>
            <button className={`tab-item${tab === "results" ? " tab-item--active" : ""}${tutorialHighlightClass("tab-results")}`} onClick={() => setTab("results")}>
              <span className="tab-item__icon" aria-hidden="true">🏆</span>
              Ergebnis
            </button>
          </div>

          {tab === "rating" && (
            <div className="card">
              <h3>Rating (1-8, 10, 12)</h3>
              <table className={`data-table prediction-table rating-table${tutorialHighlightClass("rating-table")}`}>
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
                <div className={`actions${tutorialHighlightClass("rating-actions")}`}>
                  <button className="btn" onClick={() => void saveRating()}>Entwurf speichern</button>
                  <button className="btn btn-primary" onClick={() => setSubmitConfirmation("rating")}>Einreichen</button>
                </div>
              )}
              {!ratingSubmitted && event.status === "open" && (
                <p className="hint">Entwurf darf unvollständig sein. Für Einreichen müssen alle 10 Punkte vergeben sein.</p>
              )}
              {ratingSubmitted && <p className="hint">Rating ist eingereicht und gesperrt.</p>}
            </div>
          )}

          {tab === "prediction" && (
            <div className="card">
              <h3>Ihr Gewinntipp auf die Rangliste</h3>
              {!predictionSubmitted && event.status === "open" && (
                <div className="actions--prediction-sort-mode">
                  <button className="btn btn-primary" onClick={handlePredictionSortModeToggle}>
                    {predictionOrderLocked ? "Tabelle nach Rangeingabe neu sortieren" : "Startreihenfolge fixieren"}
                  </button>
                </div>
              )}
              <table className={`data-table prediction-table${tutorialHighlightClass("prediction-table")}`}>
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
                    const dragEnabled = !predictionSubmitted && event.status === "open" && !predictionOrderLocked;
                    const rankInputEnabled = !predictionSubmitted && event.status === "open" && predictionOrderLocked;
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
                            ref={(element) => {
                              rankInputRefs.current[entryId] = element;
                            }}
                            className={`prediction-table__rank-input${predictionRankErrors[entryId] ? " prediction-table__rank-input--error" : ""}`}
                            type="number"
                            min={1}
                            max={prediction.length}
                            inputMode="numeric"
                            disabled={!rankInputEnabled}
                            value={rankInputs[entryId] ?? String(index + 1)}
                            onChange={(inputEvent) => {
                              const nextValue = inputEvent.target.value;
                              if (nextValue !== "") {
                                const parsed = Number.parseInt(nextValue, 10);
                                if (Number.isNaN(parsed) || parsed < 1 || parsed > prediction.length) {
                                  setPredictionRankErrors((previous) => ({
                                    ...previous,
                                    [entryId]: `Erlaubt sind nur Werte von 1 bis ${prediction.length}.`
                                  }));
                                  return;
                                }
                              }
                              const nextInputs = { ...rankInputs, [entryId]: nextValue };
                              setRankInputs(nextInputs);
                              validatePredictionRankInputs(nextInputs);
                            }}
                          />
                        </td>
                        <td className="prediction-table__country-cell">{getCountryNameDe(entry?.countryCode ?? "") ?? "-"}</td>
                        <td className="prediction-table__song-cell" title={entry?.songTitle ?? ""}>{truncateSongTitle(entry?.songTitle)}</td>
                        <td>
                          <div className="inline">
                            <button className="btn btn-icon prediction-table__move-btn" disabled={!dragEnabled} onClick={() => move(index, -1)}>↑</button>
                            <button className="btn btn-icon prediction-table__move-btn" disabled={!dragEnabled} onClick={() => move(index, 1)}>↓</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!predictionSubmitted && event.status === "open" && (
                <p className="hint">Tipp: Ziehe ein Land per Drag-and-Drop oder gib den Rang direkt numerisch ein. Entwurf darf unvollständig sein.</p>
              )}
              {!predictionSubmitted && event.status === "open" && (
                <div className={`actions${tutorialHighlightClass("prediction-actions")}`}>
                  <button className="btn" onClick={() => void savePrediction()}>Entwurf speichern</button>
                  <button className="btn btn-primary" onClick={() => setSubmitConfirmation("prediction")}>Einreichen</button>
                </div>
              )}
              {predictionSubmitted && <p className="hint">Prediction ist eingereicht und gesperrt.</p>}
            </div>
          )}

          {tab === "results" && (
            <div className={`card${tutorialHighlightClass("results-section")}`}>
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

          {submitConfirmation && (
            <div className="submit-confirmation" role="dialog" aria-modal="true" aria-labelledby="submit-confirmation-title">
              <div className="submit-confirmation__backdrop" onClick={() => setSubmitConfirmation(null)} />
              <div className="submit-confirmation__card card">
                <h3 id="submit-confirmation-title">Endgültig einreichen?</h3>
                <p>
                  {submitConfirmation === "rating"
                    ? "Sie reichen Ihre Bewertung endgültig ein. Danach können Sie daran nichts mehr ändern. Wollen Sie jetzt einreichen?"
                    : "Sie reichen Ihren Gewinntipp endgültig ein. Danach können Sie daran nichts mehr ändern. Wollen Sie jetzt einreichen?"}
                </p>
                <div className="submit-confirmation__actions">
                  <button className="btn" onClick={() => setSubmitConfirmation(null)}>Nein</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => void (submitConfirmation === "rating" ? submitRating() : submitPrediction())}
                  >
                    Ja
                  </button>
                </div>
              </div>
            </div>
          )}

          {message && <div className={`toast ${toastFading ? 'toast--fade-out' : ''}`}>{message}</div>}

          {tutorialOpen && (
            <div className="tutorial-overlay" role="dialog" aria-modal="true" aria-label="Einweisungstour">
              <div className="tutorial-overlay__controls">
                <button className="tutorial-overlay__nav" onClick={previousTutorialStep} disabled={tutorialIndex === 0}>
                  ←
                </button>
                <div className="tutorial-overlay__progress">{tutorialIndex + 1} / {tutorialSteps.length}</div>
                <button
                  className="tutorial-overlay__nav"
                  onClick={nextTutorialStep}
                  disabled={tutorialIndex === tutorialSteps.length - 1}
                >
                  →
                </button>
                <button className="tutorial-overlay__close" onClick={stopTutorial} aria-label="Tutorial schließen">
                  x
                </button>
              </div>
              <div className="tutorial-overlay__bubble">
                <h4>{tutorialStep.title}</h4>
                <p>{tutorialStep.body}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
