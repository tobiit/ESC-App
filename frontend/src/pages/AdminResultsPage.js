import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, clearTokens } from "../api";
import { getCountryNameDe } from "../lib/countries";
const ESC_POINTS = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];
function getThird(rank, total) {
    const base = Math.floor(total / 3);
    const remainder = total % 3;
    const topSize = base + (remainder >= 1 ? 1 : 0);
    const middleSize = base + (remainder >= 2 ? 1 : 0);
    if (rank <= topSize)
        return "top";
    if (rank <= topSize + middleSize)
        return "middle";
    return "bottom";
}
function scorePrediction(predictedRank, actualRank, total) {
    if (predictedRank === actualRank)
        return 3;
    if (Math.abs(predictedRank - actualRank) === 1)
        return 2;
    if (getThird(predictedRank, total) === getThird(actualRank, total))
        return 1;
    return 0;
}
function buildRatingsRanking(entries, ratingItems) {
    if (!entries || entries.length === 0) {
        console.warn("buildRatingsRanking: no entries provided");
        return [];
    }
    const stats = new Map(entries.map((entry) => [
        Number(entry.id),
        {
            entryId: Number(entry.id),
            countryCode: entry.countryCode,
            countryName: getCountryNameDe(entry.countryCode),
            total: 0,
            counts: Object.fromEntries([12, 10, 8, 7, 6, 5, 4, 3, 2, 1].map((point) => [point, 0]))
        }
    ]));
    for (const item of ratingItems) {
        const record = stats.get(Number(item.entryId));
        if (!record) {
            console.warn("Rating item entry not found:", item.entryId);
            continue;
        }
        record.total += Number(item.points);
        if (record.counts[item.points] !== undefined) {
            record.counts[item.points] += 1;
        }
    }
    return [...stats.values()]
        .sort((a, b) => {
        if (b.total !== a.total)
            return b.total - a.total;
        for (const p of ESC_POINTS) {
            if (b.counts[p] !== a.counts[p])
                return b.counts[p] - a.counts[p];
        }
        const aName = getCountryNameDe(a.countryCode) || "";
        const bName = getCountryNameDe(b.countryCode) || "";
        return aName.localeCompare(bName, "de");
    })
        .map((item, index) => ({
        ...item,
        rank: index + 1
    }));
}
function buildParticipantScores(participants, referenceRanking) {
    if (!referenceRanking || referenceRanking.length === 0) {
        console.warn("buildParticipantScores: empty reference ranking");
        return [];
    }
    const total = referenceRanking.length;
    const actualRanksByEntry = new Map(referenceRanking.map((row) => [Number(row.entryId), row.rank]));
    return participants.map((participant) => {
        const predictedByEntry = new Map(participant.items.map((item) => [Number(item.entryId), Number(item.rank)]));
        let points = 0;
        for (const entry of referenceRanking) {
            const predicted = predictedByEntry.get(Number(entry.entryId));
            if (predicted) {
                points += scorePrediction(predicted, entry.rank, total);
            }
        }
        return {
            participantId: participant.participant_id,
            username: participant.username,
            displayName: participant.displayName,
            points
        };
    }).sort((a, b) => b.points - a.points || a.displayName.localeCompare(b.displayName, "de"));
}
export function AdminResultsPage({ user, onLogout }) {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [entries, setEntries] = useState([]);
    const [ratingItems, setRatingItems] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [officialRanking, setOfficialRanking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [toastFading, setToastFading] = useState(false);
    // Auto-fade toast after 8 seconds
    useEffect(() => {
        if (message) {
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
        }
    }, [message]);
    useEffect(() => {
        console.log("AdminResultsPage mounted", { eventId, user: user?.role, loading });
        if (user.role !== "admin") {
            navigate("/verwaltung/login");
            return;
        }
        if (!eventId)
            return;
        void load();
    }, [user.role, eventId]);
    const load = async () => {
        try {
            setLoading(true);
            const [events, entriesData, ratingsData, predictionsData, officialData] = await Promise.all([
                api.adminEvents(),
                api.adminEntries(Number(eventId)),
                api.adminRatings(Number(eventId)),
                api.adminPredictions(Number(eventId)),
                api.adminOfficialResult(Number(eventId))
            ]);
            const evt = events.find((e) => e.id === Number(eventId));
            console.log("Event loaded:", { found: !!evt, eventId, eventsCount: events.length });
            setEvent(evt);
            setEntries(entriesData || []);
            console.log("Entries loaded:", { count: entriesData?.length || 0 });
            const ratings = ratingsData || [];
            const ratingItemsList = ratings.flatMap((r) => (r.items || []).map((item) => ({
                entryId: item.entryId,
                points: item.points
            })));
            setRatingItems(ratingItemsList);
            const preds = (predictionsData || []).map((p) => ({
                participant_id: p.participantId,
                username: p.username || p.displayName,
                displayName: p.displayName,
                items: (p.items || []).map((item) => ({
                    entryId: item.entryId,
                    rank: item.rank
                }))
            }));
            setPredictions(preds);
            if (officialData && officialData.items) {
                setOfficialRanking(officialData.items);
            }
            setLoading(false);
        }
        catch (err) {
            const errorMsg = err.message;
            console.error("AdminResultsPage load error:", errorMsg);
            setMessage(errorMsg);
            setLoading(false);
        }
    };
    const handleLogout = async () => {
        try {
            await api.logout();
        }
        finally {
            clearTokens();
            onLogout();
            navigate("/verwaltung/login");
        }
    };
    // Fallback: Always show something
    if (!user || user.role !== "admin") {
        return (_jsxs("div", { className: "shell shell--admin", children: [_jsxs("div", { className: "topbar topbar--admin", children: [_jsx("strong", { children: "ESCAPP Verwaltung" }), _jsx("button", { className: "btn btn-plain btn-plain--on-dark", onClick: () => void handleLogout(), children: "Logout" })] }), _jsx("div", { className: "layout", children: _jsx("div", { className: "card", children: _jsx("p", { children: "Zugriff verweigert." }) }) })] }));
    }
    if (!eventId) {
        return (_jsxs("div", { className: "shell shell--admin", children: [_jsxs("div", { className: "topbar topbar--admin", children: [_jsx("strong", { children: "ESCAPP Verwaltung" }), _jsx("span", { children: user.displayName }), _jsx("button", { className: "btn btn-plain btn-plain--on-dark", onClick: () => void handleLogout(), children: "Logout" })] }), _jsx("div", { className: "layout", children: _jsx("div", { className: "card", children: _jsx("p", { children: "Event-ID fehlt." }) }) })] }));
    }
    const localRanking = buildRatingsRanking(entries, ratingItems);
    console.log("Local ranking built:", { count: localRanking.length });
    const participantScoresLocal = buildParticipantScores(predictions, localRanking);
    console.log("Participant scores (local) built:", { count: participantScoresLocal.length });
    let participantScoresOfficial = null;
    if (officialRanking && Array.isArray(officialRanking)) {
        console.log("Building official ranking scores...", { count: officialRanking.length });
        const officialMapped = officialRanking.map((item, index) => {
            const officialEntryId = Number(item.entryId ?? item.entry_id);
            const entry = entries.find((e) => Number(e.id) === officialEntryId);
            return {
                entryId: officialEntryId,
                countryCode: entry?.countryCode || "",
                countryName: getCountryNameDe(entry?.countryCode || "") || `Country ${officialEntryId}`,
                rank: index + 1,
                total: 0,
                counts: {}
            };
        });
        participantScoresOfficial = buildParticipantScores(predictions, officialMapped);
        console.log("Participant scores (official) built:", { count: participantScoresOfficial.length });
    }
    if (!event) {
        return (_jsxs("div", { className: "shell shell--admin", children: [_jsxs("div", { className: "topbar topbar--admin", children: [_jsx("strong", { children: "ESCAPP Verwaltung" }), _jsx("span", { children: user.displayName }), _jsx("button", { className: "btn btn-plain btn-plain--on-dark", onClick: () => void handleLogout(), children: "Logout" })] }), _jsx("div", { className: "layout", children: _jsxs("div", { className: "card", children: [_jsx("p", { children: loading ? "Lädt Event..." : `Event ${eventId} nicht gefunden.` }), message && _jsx("p", { style: { color: 'red', fontSize: '12px', marginTop: '8px' }, children: message }), _jsx("button", { className: "btn", onClick: () => navigate("/verwaltung/"), style: { marginTop: '12px' }, children: "\u2190 Zur\u00FCck" })] }) })] }));
    }
    return (_jsxs("div", { className: "shell shell--admin", children: [_jsxs("div", { className: "topbar topbar--admin", children: [_jsx("strong", { children: "ESCAPP Verwaltung \u2013 Ergebnisse" }), _jsx("span", { children: user.displayName }), _jsx("button", { className: "btn btn-plain btn-plain--on-dark", onClick: () => void handleLogout(), children: "Logout" })] }), _jsxs("div", { className: "layout", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: event.name }), _jsxs("p", { children: ["Status: ", _jsx("span", { className: "badge", children: event.status })] }), _jsx("button", { className: "btn", onClick: () => navigate("/verwaltung/"), children: "\u2190 Zur\u00FCck" })] }), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "Lokale Rangliste (aus Bewertungen)" }), _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Rang" }), _jsx("th", { children: "Land" }), _jsx("th", { children: "Punkte" }), _jsx("th", { children: "Stimmen" })] }) }), _jsx("tbody", { children: localRanking.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: item.rank }) }), _jsx("td", { children: item.countryName }), _jsx("td", { children: item.total }), _jsx("td", { children: Object.values(item.counts).reduce((a, b) => a + b, 0) })] }, item.entryId))) })] })] }), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "Teilnehmer-Rangliste (gegen lokale Liste)" }), _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Rang" }), _jsx("th", { children: "Teilnehmer" }), _jsx("th", { children: "Punkte" })] }) }), _jsx("tbody", { children: participantScoresLocal.map((score, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: index + 1 }) }), _jsx("td", { children: score.displayName }), _jsx("td", { children: score.points })] }, score.participantId))) })] })] }), participantScoresOfficial && (_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Teilnehmer-Rangliste (gegen offizielle TV-Liste)" }), _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Rang" }), _jsx("th", { children: "Teilnehmer" }), _jsx("th", { children: "Punkte" })] }) }), _jsx("tbody", { children: participantScoresOfficial.map((score, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: index + 1 }) }), _jsx("td", { children: score.displayName }), _jsx("td", { children: score.points })] }, score.participantId))) })] })] })), message && _jsx("div", { className: `toast ${toastFading ? 'toast--fade-out' : ''}`, style: { background: "var(--core-color-red-600, #d12800)" }, children: message })] })] }));
}
