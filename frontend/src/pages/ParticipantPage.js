import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, clearTokens } from "../api";
import { getCountryNameDe } from "../lib/countries";
const ESC_POINTS = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];
export function ParticipantPage({ user, onLogout }) {
    const [event, setEvent] = useState(null);
    const [entries, setEntries] = useState([]);
    const [ratingMap, setRatingMap] = useState({});
    const [ratingSubmitted, setRatingSubmitted] = useState(false);
    const [prediction, setPrediction] = useState([]);
    const [predictionSubmitted, setPredictionSubmitted] = useState(false);
    const [results, setResults] = useState(null);
    const [message, setMessage] = useState("");
    const [toastFading, setToastFading] = useState(false);
    const [tab, setTab] = useState("rating");
    const [draggedEntryId, setDraggedEntryId] = useState(null);
    const [dropIndicator, setDropIndicator] = useState(null);
    const [rankInputs, setRankInputs] = useState({});
    const [expandedLeaderboardA, setExpandedLeaderboardA] = useState(false);
    const [expandedLeaderboardB, setExpandedLeaderboardB] = useState(false);
    const [tutorialOpen, setTutorialOpen] = useState(false);
    const [tutorialIndex, setTutorialIndex] = useState(0);
    const [submitConfirmation, setSubmitConfirmation] = useState(null);
    const navigate = useNavigate();
    const tutorialSteps = [
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
            body: "Ordnen Sie Länder per Drag-and-Drop, Pfeiltasten oder direkter Rang-Eingabe. Die Rangnummern passen sich sofort an.",
            tab: "prediction",
            target: "prediction-table"
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
        if (!message)
            return;
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
                if (!activeEvent)
                    return;
                const loadedEntries = await api.getEntries(activeEvent.id);
                setEntries(loadedEntries);
                setPrediction(loadedEntries.map((entry) => entry.id));
                const myRating = await api.getMyRating(activeEvent.id);
                setRatingSubmitted(myRating.status === "submitted");
                const map = {};
                for (const item of myRating.items || [])
                    map[item.entryId] = item.points;
                setRatingMap(map);
                const myPrediction = await api.getMyPrediction(activeEvent.id);
                setPredictionSubmitted(myPrediction.status === "submitted");
                if ((myPrediction.items || []).length > 0) {
                    const byRank = [...myPrediction.items].sort((a, b) => Number(a.rank) - Number(b.rank));
                    const rankedIds = byRank.map((item) => Number(item.entryId));
                    const remainingIds = loadedEntries
                        .map((entry) => entry.id)
                        .filter((entryId) => !rankedIds.includes(entryId));
                    setPrediction([...rankedIds, ...remainingIds]);
                    const draftRankInputs = {};
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
            }
            catch (err) {
                setMessage(err.message);
            }
        })();
    }, [user, navigate]);
    const handleLogout = async () => {
        try {
            await api.logout();
        }
        finally {
            clearTokens();
            onLogout();
            navigate("/");
        }
    };
    const buildRatingItems = () => Object.entries(ratingMap).map(([entryId, points]) => ({ entryId: Number(entryId), points }));
    const buildPredictionItems = () => {
        const items = [];
        const usedRanks = new Set();
        for (const entryId of prediction) {
            const rank = Number.parseInt((rankInputs[entryId] ?? "").trim(), 10);
            if (Number.isNaN(rank))
                continue;
            if (rank < 1 || rank > entries.length)
                continue;
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
        if (!event)
            return;
        const items = buildRatingItems();
        await api.saveMyRating(event.id, items);
        setMessage(items.length < 10 ? "Rating-Entwurf gespeichert" : "Rating gespeichert");
    };
    const submitRating = async () => {
        if (!event)
            return;
        try {
            const items = buildRatingItems();
            await api.saveMyRating(event.id, items);
            await api.submitMyRating(event.id);
            setRatingSubmitted(true);
            setSubmitConfirmation(null);
            setMessage("Rating eingereicht");
        }
        catch (error) {
            setMessage(error.message);
        }
    };
    const savePrediction = async () => {
        if (!event)
            return;
        let items;
        try {
            items = buildPredictionItems();
        }
        catch (error) {
            setMessage(error.message);
            return;
        }
        await api.saveMyPrediction(event.id, items);
        setMessage(items.length < entries.length ? "Prediction-Entwurf gespeichert" : "Prediction gespeichert");
    };
    const submitPrediction = async () => {
        if (!event)
            return;
        try {
            const items = buildPredictionItems();
            await api.saveMyPrediction(event.id, items);
            await api.submitMyPrediction(event.id);
            setPredictionSubmitted(true);
            setSubmitConfirmation(null);
            setMessage("Prediction eingereicht");
        }
        catch (error) {
            setMessage(error.message);
        }
    };
    const buildSequentialRankInputs = (orderedEntryIds) => {
        const nextInputs = {};
        orderedEntryIds.forEach((entryId, index) => {
            nextInputs[entryId] = String(index + 1);
        });
        return nextInputs;
    };
    const move = (index, delta) => {
        const next = [...prediction];
        const target = index + delta;
        if (target < 0 || target >= next.length)
            return;
        [next[index], next[target]] = [next[target], next[index]];
        setPrediction(next);
        setRankInputs(buildSequentialRankInputs(next));
    };
    const moveToDropPosition = (fromIndex, targetIndex, position) => {
        if (fromIndex < 0 || targetIndex < 0)
            return;
        if (fromIndex >= prediction.length || targetIndex >= prediction.length)
            return;
        let insertionIndex = targetIndex + (position === "after" ? 1 : 0);
        if (fromIndex < insertionIndex)
            insertionIndex -= 1;
        if (fromIndex === insertionIndex)
            return;
        const next = [...prediction];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(insertionIndex, 0, moved);
        setPrediction(next);
        setRankInputs(buildSequentialRankInputs(next));
    };
    useEffect(() => {
        setRankInputs((previous) => {
            const nextInputs = {};
            prediction.forEach((entryId, index) => {
                const defaultRank = String(index + 1);
                const existing = previous[entryId];
                nextInputs[entryId] = existing === undefined ? defaultRank : existing;
            });
            return nextInputs;
        });
    }, [prediction]);
    useEffect(() => {
        if (!tutorialOpen)
            return;
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
    const tutorialHighlightClass = (target) => tutorialOpen && tutorialStep.target === target ? " tutorial-target tutorial-target--active" : "";
    useEffect(() => {
        if (!tutorialOpen)
            return;
        const scrollActiveTargetIntoView = () => {
            const activeTarget = document.querySelector(".tutorial-target--active");
            if (!activeTarget)
                return;
            const viewportTopPadding = 180;
            const viewportBottomPadding = 28;
            const rect = activeTarget.getBoundingClientRect();
            const isLargeTarget = rect.height > window.innerHeight * 0.58;
            const preferTopAnchoring = isLargeTarget || tutorialStep.target === "rating-table" || tutorialStep.target === "prediction-table";
            const isAboveViewport = rect.top < viewportTopPadding;
            const isBelowViewport = rect.bottom > window.innerHeight - viewportBottomPadding;
            if (!isAboveViewport && !isBelowViewport)
                return;
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
    const commitRankChange = (entryId) => {
        const fromIndex = prediction.findIndex((id) => id === entryId);
        if (fromIndex < 0)
            return;
        const typedRank = Number.parseInt((rankInputs[entryId] ?? "").trim(), 10);
        if (Number.isNaN(typedRank))
            return;
        const clampedRank = Math.min(prediction.length, Math.max(1, typedRank));
        const targetIndex = clampedRank - 1;
        if (targetIndex === fromIndex)
            return;
        if (targetIndex > fromIndex) {
            moveToDropPosition(fromIndex, targetIndex, "after");
            return;
        }
        moveToDropPosition(fromIndex, targetIndex, "before");
    };
    const truncateSongTitle = (songTitle) => {
        if (!songTitle)
            return "-";
        return songTitle.length > 10 ? `${songTitle.slice(0, 10)}...` : songTitle;
    };
    return (_jsxs("div", { className: "shell", children: [_jsxs("div", { className: "topbar", children: [_jsx("strong", { children: "ESC Tippspiel" }), _jsxs("div", { className: "topbar__actions", children: [_jsx("span", { children: user.displayName }), _jsx("button", { className: "btn btn-plain btn-plain--on-dark", onClick: startTutorial, disabled: !event, children: "So geht's" }), _jsx("button", { className: "btn btn-plain btn-plain--on-dark", onClick: () => void handleLogout(), children: "Logout" })] })] }), !event ? (_jsx("div", { className: "layout", children: _jsx("div", { className: "card", children: _jsx("p", { children: "Kein aktives Event vorhanden." }) }) })) : (_jsxs("div", { className: "layout", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: event.name }), _jsxs("p", { children: ["Hallo ", user.displayName, " \u00B7 Status: ", _jsx("span", { className: "badge", children: event.status })] })] }), _jsxs("div", { className: "tab-bar", children: [_jsxs("button", { className: `tab-item${tab === "rating" ? " tab-item--active" : ""}${tutorialHighlightClass("tab-rating")}`, onClick: () => setTab("rating"), children: [_jsx("span", { className: "tab-item__icon", "aria-hidden": "true", children: "\u2665" }), "Bewertung"] }), _jsxs("button", { className: `tab-item${tab === "prediction" ? " tab-item--active" : ""}${tutorialHighlightClass("tab-prediction")}`, onClick: () => setTab("prediction"), children: [_jsx("span", { className: "tab-item__icon", "aria-hidden": "true", children: "\u20AC" }), "Tipp"] }), _jsxs("button", { className: `tab-item${tab === "results" ? " tab-item--active" : ""}${tutorialHighlightClass("tab-results")}`, onClick: () => setTab("results"), children: [_jsx("span", { className: "tab-item__icon", "aria-hidden": "true", children: "\uD83C\uDFC6" }), "Ergebnis"] })] }), tab === "rating" && (_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Rating (1-8, 10, 12)" }), _jsxs("table", { className: `data-table prediction-table rating-table${tutorialHighlightClass("rating-table")}`, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "prediction-table__country-header", children: "Land" }), _jsx("th", { className: "prediction-table__song-header", children: "Song" }), _jsx("th", { className: "rating-table__points-header", children: "Bewertung" })] }) }), _jsx("tbody", { children: entries.map((entry) => (_jsxs("tr", { children: [_jsx("td", { className: "prediction-table__country-cell", children: getCountryNameDe(entry.countryCode) }), _jsx("td", { className: "prediction-table__song-cell", title: entry.songTitle ?? "", children: truncateSongTitle(entry.songTitle) }), _jsx("td", { className: "rating-table__points-cell", children: _jsxs("select", { className: "form-input form-input--inline", disabled: ratingSubmitted || event.status !== "open", value: ratingMap[entry.id] || "", onChange: (eventValue) => {
                                                            const value = Number(eventValue.target.value);
                                                            setRatingMap((previous) => {
                                                                const next = { ...previous };
                                                                for (const [key, existing] of Object.entries(next)) {
                                                                    if (existing === value)
                                                                        delete next[Number(key)];
                                                                }
                                                                if (!value) {
                                                                    delete next[entry.id];
                                                                }
                                                                else {
                                                                    next[entry.id] = value;
                                                                }
                                                                return next;
                                                            });
                                                        }, children: [_jsx("option", { value: "", children: "0" }), ESC_POINTS.map((point) => (_jsx("option", { value: point, disabled: selectedPoints.has(point) && ratingMap[entry.id] !== point, children: point }, point)))] }) })] }, entry.id))) })] }), !ratingSubmitted && event.status === "open" && (_jsxs("div", { className: `actions${tutorialHighlightClass("rating-actions")}`, children: [_jsx("button", { className: "btn", onClick: () => void saveRating(), children: "Entwurf speichern" }), _jsx("button", { className: "btn btn-primary", onClick: () => setSubmitConfirmation("rating"), children: "Einreichen" })] })), !ratingSubmitted && event.status === "open" && (_jsx("p", { className: "hint", children: "Entwurf darf unvollst\u00E4ndig sein. F\u00FCr Einreichen m\u00FCssen alle 10 Punkte vergeben sein." })), ratingSubmitted && _jsx("p", { className: "hint", children: "Rating ist eingereicht und gesperrt." })] })), tab === "prediction" && (_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Prediction Rangliste" }), _jsxs("table", { className: `data-table prediction-table${tutorialHighlightClass("prediction-table")}`, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "prediction-table__rank-header", children: "Rang" }), _jsx("th", { className: "prediction-table__country-header", children: "Land" }), _jsx("th", { className: "prediction-table__song-header", children: "Song" }), _jsx("th", { children: "Aktion" })] }) }), _jsx("tbody", { children: prediction.map((entryId, index) => {
                                            const entry = entries.find((item) => item.id === entryId);
                                            const dragEnabled = !predictionSubmitted && event.status === "open";
                                            return (_jsxs("tr", { className: `prediction-table__row${dragEnabled ? " prediction-table__row--movable" : ""}${draggedEntryId === entryId ? " prediction-table__row--dragging" : ""}${dropIndicator?.entryId === entryId && dropIndicator.position === "before" ? " prediction-table__row--drop-before" : ""}${dropIndicator?.entryId === entryId && dropIndicator.position === "after" ? " prediction-table__row--drop-after" : ""}`, draggable: dragEnabled, onDragStart: () => {
                                                    setDraggedEntryId(entryId);
                                                    setDropIndicator(null);
                                                }, onDragEnd: () => {
                                                    setDraggedEntryId(null);
                                                    setDropIndicator(null);
                                                }, onDragOver: (dragEvent) => {
                                                    if (!dragEnabled || draggedEntryId === null)
                                                        return;
                                                    dragEvent.preventDefault();
                                                    const rowRect = dragEvent.currentTarget.getBoundingClientRect();
                                                    const position = dragEvent.clientY < rowRect.top + rowRect.height / 2 ? "before" : "after";
                                                    if (draggedEntryId !== entryId) {
                                                        setDropIndicator({ entryId, position });
                                                    }
                                                }, onDragLeave: (dragEvent) => {
                                                    if (dropIndicator?.entryId !== entryId)
                                                        return;
                                                    const related = dragEvent.relatedTarget;
                                                    if (!related || !dragEvent.currentTarget.contains(related)) {
                                                        setDropIndicator(null);
                                                    }
                                                }, onDrop: () => {
                                                    if (!dragEnabled || draggedEntryId === null || !dropIndicator)
                                                        return;
                                                    const fromIndex = prediction.findIndex((id) => id === draggedEntryId);
                                                    moveToDropPosition(fromIndex, index, dropIndicator.position);
                                                    setDraggedEntryId(null);
                                                    setDropIndicator(null);
                                                }, children: [_jsx("td", { className: "prediction-table__rank-cell", children: _jsx("input", { className: "prediction-table__rank-input", type: "number", min: 1, max: prediction.length, inputMode: "numeric", disabled: !dragEnabled, value: rankInputs[entryId] ?? String(index + 1), onChange: (inputEvent) => {
                                                                const nextValue = inputEvent.target.value;
                                                                setRankInputs((previous) => ({ ...previous, [entryId]: nextValue }));
                                                            }, onBlur: () => {
                                                                commitRankChange(entryId);
                                                            }, onKeyDown: (keyboardEvent) => {
                                                                if (keyboardEvent.key === "Enter") {
                                                                    keyboardEvent.preventDefault();
                                                                    commitRankChange(entryId);
                                                                    keyboardEvent.currentTarget.blur();
                                                                }
                                                                if (keyboardEvent.key === "Tab") {
                                                                    commitRankChange(entryId);
                                                                }
                                                            } }) }), _jsx("td", { className: "prediction-table__country-cell", children: getCountryNameDe(entry?.countryCode ?? "") ?? "-" }), _jsx("td", { className: "prediction-table__song-cell", title: entry?.songTitle ?? "", children: truncateSongTitle(entry?.songTitle) }), _jsx("td", { children: _jsxs("div", { className: "inline", children: [_jsx("button", { className: "btn btn-icon", disabled: !dragEnabled, onClick: () => move(index, -1), children: "\u2191" }), _jsx("button", { className: "btn btn-icon", disabled: !dragEnabled, onClick: () => move(index, 1), children: "\u2193" })] }) })] }, entryId));
                                        }) })] }), !predictionSubmitted && event.status === "open" && (_jsx("p", { className: "hint", children: "Tipp: Ziehe ein Land per Drag-and-Drop oder gib den Rang direkt numerisch ein. Entwurf darf unvollst\u00E4ndig sein." })), !predictionSubmitted && event.status === "open" && (_jsxs("div", { className: `actions${tutorialHighlightClass("prediction-actions")}`, children: [_jsx("button", { className: "btn", onClick: () => void savePrediction(), children: "Entwurf speichern" }), _jsx("button", { className: "btn btn-primary", onClick: () => setSubmitConfirmation("prediction"), children: "Einreichen" })] })), predictionSubmitted && _jsx("p", { className: "hint", children: "Prediction ist eingereicht und gesperrt." })] })), tab === "results" && (_jsxs("div", { className: `card${tutorialHighlightClass("results-section")}`, children: [_jsx("h3", { children: "Ergebnisse" }), event.status !== "finished" && _jsx("p", { children: "Ergebnisse werden nach Event-Abschluss angezeigt." }), results && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "results-section", children: [_jsx("h4", { children: "Platzierungen gegen offizielles Ranking" }), results.leaderboardB && results.leaderboardB.length > 0 ? (_jsxs(_Fragment, { children: [_jsxs("table", { className: "data-table results-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "results-table__rank", children: "Platz" }), _jsx("th", { children: "Teilnehmer" }), _jsx("th", { className: "results-table__points", children: "Punkte" })] }) }), _jsx("tbody", { children: (expandedLeaderboardB ? results.leaderboardB : results.leaderboardB.slice(0, 5)).map((participant, idx) => (_jsxs("tr", { className: `results-table__row${participant.rank <= 3 ? ` results-table__row--top-${participant.rank}` : ""}${participant.participantId === Number(user.id) ? " results-table__row--me" : ""}`, children: [_jsx("td", { className: "results-table__rank-cell", children: participant.rank === 1
                                                                                ? "🥇"
                                                                                : participant.rank === 2
                                                                                    ? "🥈"
                                                                                    : participant.rank === 3
                                                                                        ? "🥉"
                                                                                        : participant.rank }), _jsx("td", { children: participant.displayName }), _jsx("td", { className: "results-table__points-cell", children: participant.points })] }, participant.participantId))) })] }), results.leaderboardB.length > 5 && !expandedLeaderboardB && (_jsxs("button", { className: "btn btn-plain", onClick: () => setExpandedLeaderboardB(true), children: [results.leaderboardB.length - 5, " weitere Teilnehmer anzeigen"] })), expandedLeaderboardB && results.leaderboardB.length > 5 && (_jsx("button", { className: "btn btn-plain", onClick: () => setExpandedLeaderboardB(false), children: "Einklappen" }))] })) : (_jsx("p", { className: "hint", children: "Keine Ergebnisse verf\u00FCgbar." }))] }), _jsxs("div", { className: "results-section", children: [_jsx("h4", { children: "Platzierungen gegen internes Ranking" }), results.leaderboardA && results.leaderboardA.length > 0 ? (_jsxs(_Fragment, { children: [_jsxs("table", { className: "data-table results-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "results-table__rank", children: "Platz" }), _jsx("th", { children: "Teilnehmer" }), _jsx("th", { className: "results-table__points", children: "Punkte" })] }) }), _jsx("tbody", { children: (expandedLeaderboardA ? results.leaderboardA : results.leaderboardA.slice(0, 5)).map((participant) => (_jsxs("tr", { className: `results-table__row${participant.rank <= 3 ? ` results-table__row--top-${participant.rank}` : ""}${participant.participantId === Number(user.id) ? " results-table__row--me" : ""}`, children: [_jsx("td", { className: "results-table__rank-cell", children: participant.rank === 1
                                                                                ? "🥇"
                                                                                : participant.rank === 2
                                                                                    ? "🥈"
                                                                                    : participant.rank === 3
                                                                                        ? "🥉"
                                                                                        : participant.rank }), _jsx("td", { children: participant.displayName }), _jsx("td", { className: "results-table__points-cell", children: participant.points })] }, participant.participantId))) })] }), results.leaderboardA.length > 5 && !expandedLeaderboardA && (_jsxs("button", { className: "btn btn-plain", onClick: () => setExpandedLeaderboardA(true), children: [results.leaderboardA.length - 5, " weitere Teilnehmer anzeigen"] })), expandedLeaderboardA && results.leaderboardA.length > 5 && (_jsx("button", { className: "btn btn-plain", onClick: () => setExpandedLeaderboardA(false), children: "Einklappen" }))] })) : (_jsx("p", { className: "hint", children: "Keine Ergebnisse verf\u00FCgbar." }))] }), _jsxs("div", { className: "results-section", children: [_jsx("h4", { children: "Internes Ranking (aus Teilnehmer-Bewertungen)" }), results.ratingRanking && results.ratingRanking.length > 0 ? (_jsxs("table", { className: "data-table results-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "results-table__rank", children: "Rang" }), _jsx("th", { children: "Land" }), _jsx("th", { className: "results-table__points", children: "Gesamt-Punkte" })] }) }), _jsx("tbody", { children: results.ratingRanking.map((entry, idx) => (_jsxs("tr", { className: idx % 2 === 0 ? "results-table__row--even" : "", children: [_jsx("td", { className: "results-table__rank-cell", children: entry.rank }), _jsx("td", { children: getCountryNameDe(entry.countryCode) }), _jsx("td", { className: "results-table__points-cell", children: entry.total })] }, entry.entryId))) })] })) : (_jsx("p", { className: "hint", children: "Keine Bewertungsrangliste verf\u00FCgbar." }))] })] }))] })), submitConfirmation && (_jsxs("div", { className: "submit-confirmation", role: "dialog", "aria-modal": "true", "aria-labelledby": "submit-confirmation-title", children: [_jsx("div", { className: "submit-confirmation__backdrop", onClick: () => setSubmitConfirmation(null) }), _jsxs("div", { className: "submit-confirmation__card card", children: [_jsx("h3", { id: "submit-confirmation-title", children: "Endg\u00FCltig einreichen?" }), _jsx("p", { children: submitConfirmation === "rating"
                                            ? "Sie reichen Ihre Bewertung endgültig ein. Danach können Sie daran nichts mehr ändern. Wollen Sie jetzt einreichen?"
                                            : "Sie reichen Ihren Gewinntipp endgültig ein. Danach können Sie daran nichts mehr ändern. Wollen Sie jetzt einreichen?" }), _jsxs("div", { className: "submit-confirmation__actions", children: [_jsx("button", { className: "btn", onClick: () => setSubmitConfirmation(null), children: "Nein" }), _jsx("button", { className: "btn btn-primary", onClick: () => void (submitConfirmation === "rating" ? submitRating() : submitPrediction()), children: "Ja" })] })] })] })), message && _jsx("div", { className: `toast ${toastFading ? 'toast--fade-out' : ''}`, children: message }), tutorialOpen && (_jsxs("div", { className: "tutorial-overlay", role: "dialog", "aria-modal": "true", "aria-label": "Einweisungstour", children: [_jsxs("div", { className: "tutorial-overlay__controls", children: [_jsx("button", { className: "tutorial-overlay__nav", onClick: previousTutorialStep, disabled: tutorialIndex === 0, children: "\u2190" }), _jsxs("div", { className: "tutorial-overlay__progress", children: [tutorialIndex + 1, " / ", tutorialSteps.length] }), _jsx("button", { className: "tutorial-overlay__nav", onClick: nextTutorialStep, disabled: tutorialIndex === tutorialSteps.length - 1, children: "\u2192" }), _jsx("button", { className: "tutorial-overlay__close", onClick: stopTutorial, "aria-label": "Tutorial schlie\u00DFen", children: "x" })] }), _jsxs("div", { className: "tutorial-overlay__bubble", children: [_jsx("h4", { children: tutorialStep.title }), _jsx("p", { children: tutorialStep.body })] })] }))] }))] }));
}
