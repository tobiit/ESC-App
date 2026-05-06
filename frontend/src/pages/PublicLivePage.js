import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
    const [winnerOverlayDismissed, setWinnerOverlayDismissed] = useState(false);
    const [rankingContainerWidth, setRankingContainerWidth] = useState(0);
    const rankingRowRefs = useRef(new Map());
    const previousRowTopByEntry = useRef(new Map());
    const rankingContainerRef = useRef(null);
    const phase = dashboard?.phase ?? "collecting";
    const shouldAutoRefresh = phase !== "finished";
    const refreshMs = phase === "revealing" || phase === "tip_end_countdown" ? 1000 : 5000;
    useEffect(() => {
        let disposed = false;
        let timeoutId = null;
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
                    if (shouldAutoRefresh) {
                        timeoutId = window.setTimeout(() => {
                            void load();
                        }, refreshMs);
                    }
                }
            }
        };
        void load();
        return () => {
            disposed = true;
            if (timeoutId != null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [refreshMs, shouldAutoRefresh]);
    useEffect(() => {
        const container = rankingContainerRef.current;
        if (!container)
            return;
        const updateWidth = () => {
            setRankingContainerWidth(container.clientWidth || 0);
        };
        updateWidth();
        const observer = new ResizeObserver(() => {
            updateWidth();
        });
        observer.observe(container);
        return () => observer.disconnect();
    }, []);
    useLayoutEffect(() => {
        const nextPositions = new Map();
        for (const [entryId, rowElement] of rankingRowRefs.current.entries()) {
            if (!rowElement)
                continue;
            const nextTop = rowElement.getBoundingClientRect().top;
            nextPositions.set(entryId, nextTop);
            const previousTop = previousRowTopByEntry.current.get(entryId);
            if (previousTop == null)
                continue;
            const delta = previousTop - nextTop;
            if (Math.abs(delta) < 1)
                continue;
            rowElement.style.transition = "none";
            rowElement.style.transform = `translateY(${delta}px)`;
            requestAnimationFrame(() => {
                rowElement.style.transition = "transform 550ms ease";
                rowElement.style.transform = "translateY(0)";
            });
        }
        previousRowTopByEntry.current = nextPositions;
    }, [dashboard?.localRanking, dashboard?.reveal?.currentStepIndex]);
    const showRankingTable = phase === "post_tip_end_pre_reveal" || phase === "revealing" || phase === "finished";
    const rankingEntries = dashboard?.localRanking || [];
    const showTwoColumnRanking = showRankingTable && rankingContainerWidth >= 1080 && rankingEntries.length >= 8;
    const rankingSplitIndex = Math.ceil(rankingEntries.length / 2);
    const rankingColumns = rankingEntries.length > 0
        ? [rankingEntries.slice(0, rankingSplitIndex), rankingEntries.slice(rankingSplitIndex)].filter((part) => part.length > 0)
        : [];
    const winnerOverlayKey = dashboard?.reveal?.winner
        ? `${dashboard.reveal.winner.entryId}-${dashboard.reveal.winner.reason || "winner"}`
        : null;
    useEffect(() => {
        setWinnerOverlayDismissed(false);
    }, [winnerOverlayKey]);
    const statusLabel = phase === "tip_end_countdown"
        ? `Tippende in ${dashboard?.countdownRemainingSeconds ?? 0}s`
        : phase === "post_tip_end_pre_reveal"
            ? "Tippende erreicht"
            : phase === "revealing"
                ? "Reveal läuft"
                : phase === "finished"
                    ? "Reveal beendet"
                    : "Tippen/Bewerten offen";
    return (_jsxs("div", { className: "shell public-live-page", children: [_jsxs("div", { className: "topbar", children: [_jsx("strong", { children: "ESCAPP Live-Status" }), _jsxs("span", { children: ["Automatische Aktualisierung alle ", Math.round(refreshMs / 1000), " Sekunden"] })] }), _jsxs("div", { className: "layout", children: [_jsxs("div", { className: "card public-live-hero", children: [_jsx("h1", { children: "Live-\u00DCbersicht" }), dashboard?.event ? (_jsxs(_Fragment, { children: [_jsxs("p", { className: "public-live-hero__subtitle", children: [dashboard.event.name, dashboard.event.year ? ` ${dashboard.event.year}` : ""] }), _jsxs("p", { className: "public-live-hero__meta", children: ["Status: ", _jsx("span", { className: "badge", children: dashboard.event.status }), ` · Live-Phase: ${statusLabel}`, dashboard.updatedAt ? ` · Aktualisiert: ${new Date(dashboard.updatedAt).toLocaleTimeString("de-DE")}` : ""] })] })) : (_jsx("p", { className: "public-live-hero__meta", children: loading ? "Lade Live-Daten..." : "Kein aktives Event gefunden." })), error && _jsx("p", { className: "form-message form-message--error", children: error })] }), _jsxs("div", { className: "public-live-grid", children: [_jsx("div", { className: "public-live-grid__main-column", children: _jsxs("div", { className: "card", children: [_jsx("h3", { children: "Teilnehmerstatus" }), _jsxs("table", { className: "data-table public-live-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Anzeigename" }), _jsx("th", { children: "Bewertung abgegeben" }), _jsx("th", { children: "Tipp abgegeben" })] }) }), _jsxs("tbody", { children: [(dashboard?.participants || []).map((participant) => (_jsxs("tr", { className: dashboard?.reveal?.activeParticipantId === participant.participantId
                                                                ? "public-live-table__row--active-participant"
                                                                : "", children: [_jsx("td", { children: participant.displayName }), _jsx("td", { children: renderStatusBadge(participant.ratingSubmitted) }), _jsx("td", { children: renderStatusBadge(participant.predictionSubmitted) })] }, participant.participantId))), !loading && (dashboard?.participants || []).length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 3, children: "Keine Teilnehmerdaten vorhanden." }) }))] })] })] }) }), _jsxs("div", { className: "card public-live-grid__side-column", children: [_jsx("h3", { children: "Reveal-Status" }), _jsxs("p", { className: "public-live-hero__meta", children: ["Phase: ", statusLabel] }), dashboard?.phase === "tip_end_countdown" && (_jsxs("p", { className: "public-live-hero__meta", children: ["Countdown: ", _jsxs("strong", { children: [dashboard.countdownRemainingSeconds, "s"] })] })), dashboard?.reveal && (_jsxs(_Fragment, { children: [_jsxs("p", { className: "public-live-hero__meta", children: ["Fortschritt: ", _jsx("strong", { children: dashboard.reveal.currentStepIndex }), " / ", _jsx("strong", { children: dashboard.reveal.totalSteps })] }), dashboard.reveal.activeParticipantName && (_jsxs("p", { className: "public-live-hero__meta", children: ["Aktiver Teilnehmer: ", _jsx("strong", { children: dashboard.reveal.activeParticipantName })] }))] }))] })] }), _jsxs("div", { className: "card", ref: rankingContainerRef, children: [_jsx("h3", { children: "Lokale Songbewertung" }), !showRankingTable && (_jsx("p", { className: "public-live-hero__meta", children: "Tabelle wird erst nach Tippende angezeigt." })), showRankingTable && showTwoColumnRanking && (_jsx("div", { className: "public-live-ranking-columns", children: rankingColumns.map((columnEntries, columnIndex) => (_jsxs("table", { className: "data-table public-live-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Rang" }), _jsx("th", { children: "Flagge" }), _jsx("th", { children: "S\u00E4nger" }), _jsx("th", { children: "Lied" }), _jsx("th", { children: "Land" }), _jsx("th", { children: "Stimmen" }), _jsx("th", { children: "Punkte" })] }) }), _jsx("tbody", { children: columnEntries.map((entry) => (_jsxs("tr", { ref: (row) => {
                                                    if (row)
                                                        rankingRowRefs.current.set(entry.entryId, row);
                                                }, children: [_jsx("td", { children: _jsx("strong", { children: entry.rank }) }), _jsx("td", { className: "public-live-table__flag", title: getCountryNameDe(entry.countryCode), children: _jsx("span", { "aria-hidden": "true", children: getFlagEmoji(entry.countryCode) }) }), _jsx("td", { children: entry.artistName || "—" }), _jsx("td", { children: entry.songTitle || "—" }), _jsx("td", { children: getCountryNameDe(entry.countryCode) }), _jsx("td", { children: entry.votes }), _jsx("td", { children: entry.points })] }, entry.entryId))) })] }, `ranking-col-${columnIndex}`))) })), showRankingTable && !showTwoColumnRanking && (_jsxs("table", { className: "data-table public-live-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Rang" }), _jsx("th", { children: "Flagge" }), _jsx("th", { children: "S\u00E4nger" }), _jsx("th", { children: "Lied" }), _jsx("th", { children: "Land" }), _jsx("th", { children: "Stimmen" }), _jsx("th", { children: "Punkte" })] }) }), _jsxs("tbody", { children: [rankingEntries.map((entry) => (_jsxs("tr", { ref: (row) => {
                                                    if (row)
                                                        rankingRowRefs.current.set(entry.entryId, row);
                                                }, children: [_jsx("td", { children: _jsx("strong", { children: entry.rank }) }), _jsx("td", { className: "public-live-table__flag", title: getCountryNameDe(entry.countryCode), children: _jsx("span", { "aria-hidden": "true", children: getFlagEmoji(entry.countryCode) }) }), _jsx("td", { children: entry.artistName || "—" }), _jsx("td", { children: entry.songTitle || "—" }), _jsx("td", { children: getCountryNameDe(entry.countryCode) }), _jsx("td", { children: entry.votes }), _jsx("td", { children: entry.points })] }, entry.entryId))), !loading && rankingEntries.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 7, children: "Noch keine Bewertungen vorhanden." }) }))] })] }))] }), dashboard?.phase === "revealing" && dashboard.reveal.currentAnnouncement && (_jsx("div", { className: "public-live-overlay", role: "status", "aria-live": "polite", children: _jsx("div", { className: "public-live-overlay__bubble", children: dashboard.reveal.currentAnnouncement }) })), dashboard?.phase === "finished" && dashboard.reveal.winner && !winnerOverlayDismissed && (_jsx("div", { className: "public-live-overlay", role: "status", "aria-live": "polite", children: _jsxs("div", { className: "public-live-overlay__bubble public-live-overlay__bubble--winner", children: [_jsx("button", { type: "button", className: "public-live-overlay__close", onClick: () => setWinnerOverlayDismissed(true), "aria-label": "Gewinneranzeige schlie\u00DFen", children: "\u2715" }), "Gewinner der ESC-Party \u2013 ", dashboard.reveal.winner.artistName || "—", ", ", dashboard.reveal.winner.songTitle || "—", ", ", getCountryNameDe(dashboard.reveal.winner.countryCode)] }) }))] })] }));
}
