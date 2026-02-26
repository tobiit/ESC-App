import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { api, clearTokens, setTokens } from "./api";
const ESC_POINTS = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];
const storedUserRaw = localStorage.getItem("esc_user");
const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState("");
    return (_jsxs("div", { className: "card login", children: [_jsx("h1", { children: "ESC Finale Tippspiel" }), _jsx("p", { children: "Teilnehmer und Admin Login" }), _jsx("input", { value: username, onChange: (event) => setUsername(event.target.value), placeholder: "Benutzername" }), _jsx("input", { value: password, onChange: (event) => setPassword(event.target.value), placeholder: "Passwort", type: "password" }), _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: admin, onChange: (event) => setAdmin(event.target.checked) }), " Admin Login"] }), _jsx("button", { onClick: async () => {
                    setError("");
                    try {
                        const payload = await api.login(username, password, admin);
                        setTokens(payload);
                        localStorage.setItem("esc_user", JSON.stringify(payload.user));
                        onLogin(payload.user);
                    }
                    catch (err) {
                        setError(err.message);
                    }
                }, children: "Anmelden" }), error && _jsx("p", { className: "error", children: error })] }));
}
function ParticipantArea({ user }) {
    const [event, setEvent] = useState(null);
    const [entries, setEntries] = useState([]);
    const [ratingMap, setRatingMap] = useState({});
    const [ratingSubmitted, setRatingSubmitted] = useState(false);
    const [prediction, setPrediction] = useState([]);
    const [predictionSubmitted, setPredictionSubmitted] = useState(false);
    const [results, setResults] = useState(null);
    const [message, setMessage] = useState("");
    const [tab, setTab] = useState("rating");
    const selectedPoints = useMemo(() => new Set(Object.values(ratingMap)), [ratingMap]);
    useEffect(() => {
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
    }, []);
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
    if (!event) {
        return _jsx("div", { className: "card", children: "Kein aktives Event vorhanden." });
    }
    return (_jsxs("div", { className: "layout", children: [_jsx("div", { className: "header card", children: _jsxs("div", { children: [_jsx("h2", { children: event.name }), _jsxs("p", { children: ["Hallo ", user.displayName, " \u00B7 Status: ", _jsx("strong", { children: event.status })] })] }) }), _jsxs("div", { className: "tabs", children: [_jsx("button", { onClick: () => setTab("rating"), children: "Bewertung" }), _jsx("button", { onClick: () => setTab("prediction"), children: "Tipp" }), _jsx("button", { onClick: () => setTab("results"), children: "Ergebnis" })] }), tab === "rating" && (_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Rating (1-8, 10, 12)" }), entries.map((entry) => (_jsxs("div", { className: "row", children: [_jsx("span", { children: entry.countryName }), _jsxs("select", { disabled: ratingSubmitted || event.status !== "open", value: ratingMap[entry.id] || "", onChange: (eventValue) => {
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
                                }, children: [_jsx("option", { value: "", children: "0" }), ESC_POINTS.map((point) => (_jsx("option", { value: point, disabled: selectedPoints.has(point) && ratingMap[entry.id] !== point, children: point }, point)))] })] }, entry.id))), !ratingSubmitted && event.status === "open" && (_jsxs("div", { className: "actions", children: [_jsx("button", { onClick: () => void saveRating(), children: "Entwurf speichern" }), _jsx("button", { className: "primary", onClick: () => void submitRating(), children: "Einreichen" })] })), ratingSubmitted && _jsx("p", { className: "hint", children: "Rating ist eingereicht und gesperrt." })] })), tab === "prediction" && (_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Prediction Rangliste" }), prediction.map((entryId, index) => {
                        const entry = entries.find((item) => item.id === entryId);
                        return (_jsxs("div", { className: "row", children: [_jsxs("span", { children: [index + 1, ". ", entry?.countryName] }), _jsxs("div", { className: "inline", children: [_jsx("button", { disabled: predictionSubmitted || event.status !== "open", onClick: () => move(index, -1), children: "\u2191" }), _jsx("button", { disabled: predictionSubmitted || event.status !== "open", onClick: () => move(index, 1), children: "\u2193" })] })] }, entryId));
                    }), !predictionSubmitted && event.status === "open" && (_jsxs("div", { className: "actions", children: [_jsx("button", { onClick: () => void savePrediction(), children: "Entwurf speichern" }), _jsx("button", { className: "primary", onClick: () => void submitPrediction(), children: "Einreichen" })] })), predictionSubmitted && _jsx("p", { className: "hint", children: "Prediction ist eingereicht und gesperrt." })] })), tab === "results" && (_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Ergebnisse" }), event.status !== "finished" && _jsx("p", { children: "Ergebnisse werden nach Event-Abschluss angezeigt." }), results && (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Liste A (gegen Teilnehmer-Ranking): ", results.me?.scoreAgainstRatingsRanking?.points ?? "-", " Punkte, Platz ", results.me?.scoreAgainstRatingsRanking?.rank ?? "-"] }), _jsxs("p", { children: ["Liste B (gegen offizielles Ranking): ", results.me?.scoreAgainstOfficialRanking?.points ?? "-", " Punkte, Platz ", results.me?.scoreAgainstOfficialRanking?.rank ?? "-"] })] }))] })), message && _jsx("div", { className: "toast", children: message })] }));
}
function AdminArea() {
    const [events, setEvents] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [entries, setEntries] = useState([]);
    const [official, setOfficial] = useState([]);
    const [message, setMessage] = useState("");
    const load = async () => {
        const [eventRows, participantRows] = await Promise.all([api.adminEvents(), api.adminParticipants()]);
        setEvents(eventRows);
        setParticipants(participantRows);
        const active = eventRows.find((event) => event.isActive) || eventRows[0];
        if (active) {
            setSelectedEventId(active.id);
            const loadedEntries = await api.adminEntries(active.id);
            setEntries(loadedEntries);
            const officialResult = await api.adminOfficialResult(active.id);
            if ((officialResult.items || []).length === loadedEntries.length) {
                setOfficial(officialResult.items.map((item) => item.entryId));
            }
            else {
                setOfficial(loadedEntries.map((item) => item.id));
            }
        }
    };
    useEffect(() => {
        void load();
    }, []);
    return (_jsxs("div", { className: "layout", children: [_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Teilnehmer Verwaltung" }), _jsx("button", { onClick: async () => {
                            const username = prompt("Benutzername");
                            const password = prompt("Passwort");
                            const displayName = prompt("Anzeige Name");
                            if (!username || !password || !displayName)
                                return;
                            await api.adminCreateParticipant({ username, password, displayName });
                            await load();
                        }, children: "Teilnehmer anlegen" }), participants.map((participant) => (_jsxs("div", { className: "row", children: [_jsx("span", { children: participant.displayName }), _jsxs("div", { className: "inline", children: [_jsx("button", { onClick: async () => {
                                            const displayName = prompt("Neuer Anzeige Name", participant.displayName) || participant.displayName;
                                            await api.adminUpdateParticipant(participant.id, {
                                                displayName,
                                                isActive: !participant.isActive ? true : participant.isActive
                                            });
                                            await load();
                                        }, children: "Bearbeiten" }), _jsx("button", { onClick: async () => {
                                            const password = prompt("Neues Passwort");
                                            if (!password)
                                                return;
                                            await api.adminResetPassword(participant.id, password);
                                            setMessage("Passwort zurückgesetzt");
                                        }, children: "Passwort" }), _jsx("button", { onClick: async () => {
                                            await api.adminDeleteParticipant(participant.id);
                                            await load();
                                        }, children: "L\u00F6schen" })] })] }, participant.id)))] }), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "Event Verwaltung" }), _jsx("button", { onClick: async () => {
                            const name = prompt("Event Name", "ESC Finale") || "ESC Finale";
                            const year = Number(prompt("Jahr", String(new Date().getFullYear())));
                            await api.adminCreateEvent({ name, year, status: "draft", isActive: events.length === 0 });
                            await load();
                        }, children: "Event anlegen" }), _jsx("select", { value: selectedEventId || "", onChange: async (event) => {
                            const eventId = Number(event.target.value);
                            setSelectedEventId(eventId);
                            const loadedEntries = await api.adminEntries(eventId);
                            setEntries(loadedEntries);
                            setOfficial(loadedEntries.map((item) => item.id));
                        }, children: events.map((event) => (_jsxs("option", { value: event.id, children: [event.name, " (", event.status, ")"] }, event.id))) }), selectedEventId && (_jsx("div", { className: "inline", children: ["draft", "open", "locked", "finished"].map((status) => (_jsx("button", { onClick: async () => {
                                const eventRow = events.find((row) => row.id === selectedEventId);
                                await api.adminUpdateEvent(selectedEventId, {
                                    name: eventRow.name,
                                    year: eventRow.year,
                                    status,
                                    isActive: true
                                });
                                await load();
                            }, children: status }, status))) }))] }), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "Entries & Official Result" }), selectedEventId && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: async () => {
                                    const countryName = prompt("Land") || "";
                                    if (!countryName)
                                        return;
                                    await api.adminAddEntry(selectedEventId, { countryName, sortOrder: entries.length + 1 });
                                    await load();
                                }, children: "Entry anlegen" }), entries.map((entry, index) => (_jsxs("div", { className: "row", children: [_jsxs("span", { children: [index + 1, ". ", entry.countryName] }), _jsxs("div", { className: "inline", children: [_jsx("button", { onClick: async () => {
                                                    const countryName = prompt("Land", entry.countryName) || entry.countryName;
                                                    await api.adminUpdateEntry(entry.id, {
                                                        countryName,
                                                        songTitle: entry.songTitle,
                                                        artistName: entry.artistName,
                                                        sortOrder: entry.sortOrder
                                                    });
                                                    await load();
                                                }, children: "Bearbeiten" }), _jsx("button", { onClick: async () => { await api.adminDeleteEntry(entry.id); await load(); }, children: "L\u00F6schen" })] })] }, entry.id))), _jsx("h4", { children: "Offizielles Ergebnis (Up/Down)" }), official.map((entryId, index) => {
                                const entry = entries.find((item) => item.id === entryId);
                                return (_jsxs("div", { className: "row", children: [_jsxs("span", { children: [index + 1, ". ", entry?.countryName] }), _jsxs("div", { className: "inline", children: [_jsx("button", { onClick: () => {
                                                        if (index === 0)
                                                            return;
                                                        const copy = [...official];
                                                        [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
                                                        setOfficial(copy);
                                                    }, children: "\u2191" }), _jsx("button", { onClick: () => {
                                                        if (index === official.length - 1)
                                                            return;
                                                        const copy = [...official];
                                                        [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
                                                        setOfficial(copy);
                                                    }, children: "\u2193" })] })] }, entryId));
                            }), _jsx("button", { className: "primary", onClick: async () => {
                                    await api.adminSaveOfficialResult(selectedEventId, official.map((entryId, index) => ({ entryId, rank: index + 1 })));
                                    setMessage("Official Result gespeichert");
                                }, children: "Official Result speichern" })] }))] }), message && _jsx("div", { className: "toast", children: message })] }));
}
export function App() {
    const [user, setUser] = useState(storedUser);
    if (!user) {
        return _jsx(Login, { onLogin: setUser });
    }
    return (_jsxs("div", { className: "shell", children: [_jsxs("div", { className: "topbar", children: [_jsx("strong", { children: "ESCAPP" }), _jsx("span", { children: user.displayName }), _jsx("button", { onClick: async () => {
                            try {
                                await api.logout();
                            }
                            finally {
                                clearTokens();
                                setUser(null);
                            }
                        }, children: "Logout" })] }), user.role === "admin" ? _jsx(AdminArea, {}) : _jsx(ParticipantArea, { user: user })] }));
}
