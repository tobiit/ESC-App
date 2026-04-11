import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { api } from "../api";
import { getCountryNameDe } from "../lib/countries";
function getFlagEmoji(countryCode) {
    const normalized = String(countryCode || "").toUpperCase().trim();
    if (!/^[A-Z]{2}$/.test(normalized))
        return "🏳️";
    return String.fromCodePoint(...[...normalized].map((char) => 127397 + char.charCodeAt(0)));
}
function renderStatusBadge(value) {
    return (_jsxs("span", { className: `public-live-status public-live-status--${value ? "done" : "open"}`, children: [_jsx("span", { className: "public-live-status__dot", "aria-hidden": "true" }), value ? "Ja" : "Nein"] }));
}
export function PublicLivePage() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        let disposed = false;
        const load = async () => {
            try {
                const data = await api.getPublicLiveDashboard();
                if (disposed)
                    return;
                setDashboard(data);
                setError("");
            }
            catch (err) {
                if (disposed)
                    return;
                setError(err.message);
            }
            finally {
                if (!disposed) {
                    setLoading(false);
                }
            }
        };
        void load();
        const intervalId = window.setInterval(() => {
            void load();
        }, 10000);
        return () => {
            disposed = true;
            window.clearInterval(intervalId);
        };
    }, []);
    return (_jsxs("div", { className: "shell public-live-page", children: [_jsxs("div", { className: "topbar", children: [_jsx("strong", { children: "ESCAPP Live-Status" }), _jsx("span", { children: "Automatische Aktualisierung alle 10 Sekunden" })] }), _jsxs("div", { className: "layout", children: [_jsxs("div", { className: "card public-live-hero", children: [_jsx("h1", { children: "Live-\u00DCbersicht" }), dashboard?.event ? (_jsxs(_Fragment, { children: [_jsxs("p", { className: "public-live-hero__subtitle", children: [dashboard.event.name, dashboard.event.year ? ` ${dashboard.event.year}` : ""] }), _jsxs("p", { className: "public-live-hero__meta", children: ["Status: ", _jsx("span", { className: "badge", children: dashboard.event.status }), dashboard.updatedAt ? ` · Aktualisiert: ${new Date(dashboard.updatedAt).toLocaleTimeString("de-DE")}` : ""] })] })) : (_jsx("p", { className: "public-live-hero__meta", children: loading ? "Lade Live-Daten..." : "Kein aktives Event gefunden." })), error && _jsx("p", { className: "form-message form-message--error", children: error })] }), _jsxs("div", { className: "public-live-grid", children: [_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Teilnehmerstatus" }), _jsxs("table", { className: "data-table public-live-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Anzeigename" }), _jsx("th", { children: "Bewertung abgegeben" }), _jsx("th", { children: "Tipp abgegeben" })] }) }), _jsxs("tbody", { children: [(dashboard?.participants || []).map((participant) => (_jsxs("tr", { children: [_jsx("td", { children: participant.displayName }), _jsx("td", { children: renderStatusBadge(participant.ratingSubmitted) }), _jsx("td", { children: renderStatusBadge(participant.predictionSubmitted) })] }, participant.participantId))), !loading && (dashboard?.participants || []).length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 3, children: "Keine Teilnehmerdaten vorhanden." }) }))] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "Lokale Songbewertung" }), _jsxs("table", { className: "data-table public-live-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Flagge" }), _jsx("th", { children: "S\u00E4nger" }), _jsx("th", { children: "Lied" }), _jsx("th", { children: "Land" }), _jsx("th", { children: "Stimmen" }), _jsx("th", { children: "Punkte" })] }) }), _jsxs("tbody", { children: [(dashboard?.localRanking || []).map((entry) => (_jsxs("tr", { children: [_jsx("td", { className: "public-live-table__flag", title: getCountryNameDe(entry.countryCode), children: _jsx("span", { "aria-hidden": "true", children: getFlagEmoji(entry.countryCode) }) }), _jsx("td", { children: entry.artistName || "—" }), _jsx("td", { children: entry.songTitle || "—" }), _jsx("td", { children: entry.countryCode }), _jsx("td", { children: entry.votes }), _jsx("td", { children: entry.points })] }, entry.entryId))), !loading && (dashboard?.localRanking || []).length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 6, children: "Noch keine Bewertungen vorhanden." }) }))] })] })] })] })] })] }));
}
