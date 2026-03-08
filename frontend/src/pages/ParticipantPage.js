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
    const navigate = useNavigate();
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
                if ((myPrediction.items || []).length === loadedEntries.length) {
                    setPrediction(myPrediction.items.map((item) => item.entryId));
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
    const saveRating = async () => {
        if (!event)
            return;
        const items = Object.entries(ratingMap).map(([entryId, points]) => ({ entryId: Number(entryId), points }));
        await api.saveMyRating(event.id, items);
        setMessage("Rating gespeichert");
    };
    const submitRating = async () => {
        if (!event)
            return;
        await api.submitMyRating(event.id);
        setRatingSubmitted(true);
        setMessage("Rating eingereicht");
    };
    const savePrediction = async () => {
        if (!event)
            return;
        const items = prediction.map((entryId, index) => ({ entryId, rank: index + 1 }));
        await api.saveMyPrediction(event.id, items);
        setMessage("Prediction gespeichert");
    };
    const submitPrediction = async () => {
        if (!event)
            return;
        await api.submitMyPrediction(event.id);
        setPredictionSubmitted(true);
        setMessage("Prediction eingereicht");
    };
    const move = (index, delta) => {
        const next = [...prediction];
        const target = index + delta;
        if (target < 0 || target >= next.length)
            return;
        [next[index], next[target]] = [next[target], next[index]];
        setPrediction(next);
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
    };
    const truncateSongTitle = (songTitle) => {
        if (!songTitle)
            return "-";
        return songTitle.length > 10 ? `${songTitle.slice(0, 10)}...` : songTitle;
    };
    return (_jsxs("div", { className: "shell", children: [_jsxs("div", { className: "topbar", children: [_jsx("strong", { children: "ESC Tippspiel" }), _jsx("span", { children: user.displayName }), _jsx("button", { className: "btn btn-plain", onClick: () => void handleLogout(), children: "Logout" })] }), !event ? (_jsx("div", { className: "layout", children: _jsx("div", { className: "card", children: _jsx("p", { children: "Kein aktives Event vorhanden." }) }) })) : (_jsxs("div", { className: "layout", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: event.name }), _jsxs("p", { children: ["Hallo ", user.displayName, " \u00B7 Status: ", _jsx("span", { className: "badge", children: event.status })] })] }), _jsxs("div", { className: "tab-bar", children: [_jsx("button", { className: `tab-item${tab === "rating" ? " tab-item--active" : ""}`, onClick: () => setTab("rating"), children: "Bewertung" }), _jsx("button", { className: `tab-item${tab === "prediction" ? " tab-item--active" : ""}`, onClick: () => setTab("prediction"), children: "Tipp" }), _jsx("button", { className: `tab-item${tab === "results" ? " tab-item--active" : ""}`, onClick: () => setTab("results"), children: "Ergebnis" })] }), tab === "rating" && (_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Rating (1-8, 10, 12)" }), entries.map((entry) => (_jsxs("div", { className: "row", children: [_jsx("span", { children: getCountryNameDe(entry.countryCode) }), _jsxs("select", { className: "form-input form-input--inline", disabled: ratingSubmitted || event.status !== "open", value: ratingMap[entry.id] || "", onChange: (eventValue) => {
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
                                        }, children: [_jsx("option", { value: "", children: "0" }), ESC_POINTS.map((point) => (_jsx("option", { value: point, disabled: selectedPoints.has(point) && ratingMap[entry.id] !== point, children: point }, point)))] })] }, entry.id))), !ratingSubmitted && event.status === "open" && (_jsxs("div", { className: "actions", children: [_jsx("button", { className: "btn", onClick: () => void saveRating(), children: "Entwurf speichern" }), _jsx("button", { className: "btn btn-primary", onClick: () => void submitRating(), children: "Einreichen" })] })), ratingSubmitted && _jsx("p", { className: "hint", children: "Rating ist eingereicht und gesperrt." })] })), tab === "prediction" && (_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Prediction Rangliste" }), _jsxs("table", { className: "data-table prediction-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "prediction-table__rank-header", children: "Rang" }), _jsx("th", { children: "Land" }), _jsx("th", { children: "Song" }), _jsx("th", { children: "Aktion" })] }) }), _jsx("tbody", { children: prediction.map((entryId, index) => {
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
                                                }, children: [_jsx("td", { className: "prediction-table__rank-cell", children: index + 1 }), _jsx("td", { children: getCountryNameDe(entry?.countryCode ?? "") ?? "-" }), _jsx("td", { title: entry?.songTitle ?? "", children: truncateSongTitle(entry?.songTitle) }), _jsx("td", { children: _jsxs("div", { className: "inline", children: [_jsx("button", { className: "btn btn-icon", disabled: !dragEnabled, onClick: () => move(index, -1), children: "\u2191" }), _jsx("button", { className: "btn btn-icon", disabled: !dragEnabled, onClick: () => move(index, 1), children: "\u2193" })] }) })] }, entryId));
                                        }) })] }), !predictionSubmitted && event.status === "open" && (_jsx("p", { className: "hint", children: "Tipp: Ziehe ein Land per Drag-and-Drop direkt auf den gewuenschten Rang." })), !predictionSubmitted && event.status === "open" && (_jsxs("div", { className: "actions", children: [_jsx("button", { className: "btn", onClick: () => void savePrediction(), children: "Entwurf speichern" }), _jsx("button", { className: "btn btn-primary", onClick: () => void submitPrediction(), children: "Einreichen" })] })), predictionSubmitted && _jsx("p", { className: "hint", children: "Prediction ist eingereicht und gesperrt." })] })), tab === "results" && (_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Ergebnisse" }), event.status !== "finished" && _jsx("p", { children: "Ergebnisse werden nach Event-Abschluss angezeigt." }), results && (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Liste A (gegen Teilnehmer-Ranking): ", results.me?.scoreAgainstRatingsRanking?.points ?? "-", " Punkte, Platz ", results.me?.scoreAgainstRatingsRanking?.rank ?? "-"] }), _jsxs("p", { children: ["Liste B (gegen offizielles Ranking): ", results.me?.scoreAgainstOfficialRanking?.points ?? "-", " Punkte, Platz ", results.me?.scoreAgainstOfficialRanking?.rank ?? "-"] })] }))] })), message && _jsx("div", { className: `toast ${toastFading ? 'toast--fade-out' : ''}`, children: message })] }))] }));
}
