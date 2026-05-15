import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { api } from "../api";
import { getCountryNameDe } from "../lib/countries";
const POLL_REQUEST_TIMEOUT_MS = 8000;
const REVEAL_START_SCROLL_DELAY_MS = 120;
const REVEAL_SCROLL_RETRY_COUNT = 6;
const REVEAL_SCROLL_RETRY_INTERVAL_MS = 220;
function getScrollableAncestor(element) {
    let current = element?.parentElement || null;
    while (current) {
        const style = window.getComputedStyle(current);
        const overflowY = style.overflowY;
        const canScroll = (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
            current.scrollHeight > current.clientHeight + 1;
        if (canScroll) {
            return current;
        }
        current = current.parentElement;
    }
    return window;
}
function scrollToRankingEnd(container) {
    if (!container)
        return;
    container.scrollIntoView({
        behavior: "smooth",
        block: "end"
    });
    const scrollableAncestor = getScrollableAncestor(container);
    const rect = container.getBoundingClientRect();
    if (scrollableAncestor === window) {
        const targetTop = Math.max(0, window.scrollY + rect.top + container.offsetHeight - window.innerHeight + 24);
        window.scrollTo({
            top: targetTop,
            behavior: "smooth"
        });
        return;
    }
    const parent = scrollableAncestor;
    const parentRect = parent.getBoundingClientRect();
    const deltaBottom = rect.bottom - parentRect.bottom + 24;
    parent.scrollTo({
        top: Math.max(0, parent.scrollTop + deltaBottom),
        behavior: "smooth"
    });
}
function withTimeout(promise, timeoutMs, timeoutMessage) {
    return new Promise((resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
            reject(new Error(timeoutMessage));
        }, timeoutMs);
        promise
            .then((value) => {
            window.clearTimeout(timeoutId);
            resolve(value);
        })
            .catch((error) => {
            window.clearTimeout(timeoutId);
            reject(error);
        });
    });
}
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
    const [displayedRankingEntries, setDisplayedRankingEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [winnerOverlayDismissed, setWinnerOverlayDismissed] = useState(false);
    const [showRevealAnnouncement, setShowRevealAnnouncement] = useState(false);
    const [rankingContainerWidth, setRankingContainerWidth] = useState(0);
    const rankingRowRefs = useRef(new Map());
    const previousRowTopByEntry = useRef(new Map());
    const rankingContainerRef = useRef(null);
    const announcementKeyRef = useRef(null);
    const rankingUpdateTimeoutRef = useRef(null);
    const latestRankingRef = useRef([]);
    const requestVersionRef = useRef(0);
    const lastRevealScrollKeyRef = useRef(null);
    const phase = dashboard?.phase ?? "collecting";
    const shouldAutoRefresh = phase !== "finished";
    const refreshMs = phase === "revealing" || phase === "tip_end_countdown" ? 1000 : 5000;
    useEffect(() => {
        let disposed = false;
        let intervalId = null;
        const load = async () => {
            const requestVersion = ++requestVersionRef.current;
            try {
                const data = await withTimeout(api.getPublicLiveDashboard(), POLL_REQUEST_TIMEOUT_MS, "Live-Daten konnten nicht rechtzeitig geladen werden");
                if (disposed || requestVersion !== requestVersionRef.current)
                    return;
                setDashboard(data);
                setError("");
            }
            catch (err) {
                if (disposed || requestVersion !== requestVersionRef.current)
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
        if (shouldAutoRefresh) {
            intervalId = window.setInterval(() => {
                void load();
            }, refreshMs);
        }
        return () => {
            disposed = true;
            requestVersionRef.current += 1;
            if (intervalId != null) {
                window.clearInterval(intervalId);
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
                rowElement.style.transition = "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)";
                rowElement.style.transform = "translateY(0)";
            });
        }
        previousRowTopByEntry.current = nextPositions;
    }, [displayedRankingEntries, dashboard?.reveal?.currentStepIndex]);
    const showRankingTable = phase === "post_tip_end_pre_reveal" || phase === "revealing" || phase === "finished";
    const rankingEntries = displayedRankingEntries;
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
    // Keep latestRankingRef always current; for non-reveal phases update table immediately.
    useEffect(() => {
        latestRankingRef.current = dashboard?.localRanking || [];
        if (dashboard?.phase !== "revealing") {
            if (rankingUpdateTimeoutRef.current != null) {
                window.clearTimeout(rankingUpdateTimeoutRef.current);
                rankingUpdateTimeoutRef.current = null;
            }
        }
        if (dashboard?.phase !== "revealing" || displayedRankingEntries.length === 0) {
            setDisplayedRankingEntries(latestRankingRef.current);
        }
        // During revealing: table updates are driven by the announcement effect below.
    }, [dashboard?.localRanking, dashboard?.phase, displayedRankingEntries.length]);
    useEffect(() => {
        if (phase !== "revealing" || !showRankingTable) {
            return;
        }
        const revealStartKey = dashboard?.liveState?.revealStartedAt || null;
        if (!revealStartKey || lastRevealScrollKeyRef.current === revealStartKey) {
            return;
        }
        lastRevealScrollKeyRef.current = revealStartKey;
        const scrollTimers = [];
        for (let attempt = 0; attempt < REVEAL_SCROLL_RETRY_COUNT; attempt += 1) {
            const timeoutMs = REVEAL_START_SCROLL_DELAY_MS + attempt * REVEAL_SCROLL_RETRY_INTERVAL_MS;
            const timerId = window.setTimeout(() => {
                scrollToRankingEnd(rankingContainerRef.current);
            }, timeoutMs);
            scrollTimers.push(timerId);
        }
        return () => {
            for (const timerId of scrollTimers) {
                window.clearTimeout(timerId);
            }
        };
    }, [phase, showRankingTable, dashboard?.liveState?.revealStartedAt]);
    // Single cascaded effect: show popover (50%) → hide → wait 1s → update table.
    useEffect(() => {
        const announcement = dashboard?.reveal?.currentAnnouncement;
        if (dashboard?.phase !== "revealing" || !announcement) {
            setShowRevealAnnouncement(false);
            announcementKeyRef.current = null;
            return;
        }
        const nextKey = `${dashboard.reveal.currentStepIndex}:${announcement}`;
        if (announcementKeyRef.current === nextKey) {
            return;
        }
        announcementKeyRef.current = nextKey;
        // Cancel any ranking update still pending from a previous step.
        if (rankingUpdateTimeoutRef.current != null) {
            window.clearTimeout(rankingUpdateTimeoutRef.current);
            rankingUpdateTimeoutRef.current = null;
        }
        const remainingMs = Math.max(0, Number(dashboard.reveal.currentAnnouncementRemainingMs || 0));
        if (remainingMs <= 0) {
            setShowRevealAnnouncement(false);
            return;
        }
        const visibleMs = Math.max(250, Math.floor(remainingMs * 0.5));
        setShowRevealAnnouncement(true);
        const popoverTimer = window.setTimeout(() => {
            // Step 3: hide popover
            setShowRevealAnnouncement(false);
            // Step 4+5: wait 1s, then update table
            rankingUpdateTimeoutRef.current = window.setTimeout(() => {
                setDisplayedRankingEntries(latestRankingRef.current);
                rankingUpdateTimeoutRef.current = null;
            }, 1000);
        }, visibleMs);
        return () => {
            window.clearTimeout(popoverTimer);
            // Note: rankingUpdateTimeoutRef is NOT cleared here — it must survive
            // cleanup so the delayed table update fires even if deps re-run.
        };
    }, [
        dashboard?.phase,
        dashboard?.reveal?.currentAnnouncement,
        dashboard?.reveal?.currentStepIndex
    ]);
    useEffect(() => {
        return () => {
            if (rankingUpdateTimeoutRef.current != null) {
                window.clearTimeout(rankingUpdateTimeoutRef.current);
            }
        };
    }, []);
    const statusLabel = phase === "tip_end_countdown"
        ? `Tippende in ${dashboard?.countdownRemainingSeconds ?? 0}s`
        : phase === "post_tip_end_pre_reveal"
            ? "Tippende erreicht"
            : phase === "revealing"
                ? dashboard?.liveState?.revealPausedAt
                    ? "Reveal pausiert"
                    : "Reveal läuft"
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
                                                }, children: [_jsx("td", { children: _jsx("strong", { children: entry.rank }) }), _jsx("td", { className: "public-live-table__flag", title: getCountryNameDe(entry.countryCode), children: _jsx("span", { "aria-hidden": "true", children: getFlagEmoji(entry.countryCode) }) }), _jsx("td", { children: entry.artistName || "—" }), _jsx("td", { children: entry.songTitle || "—" }), _jsx("td", { children: getCountryNameDe(entry.countryCode) }), _jsx("td", { children: entry.votes }), _jsx("td", { children: entry.points })] }, entry.entryId))), !loading && rankingEntries.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 7, children: "Noch keine Bewertungen vorhanden." }) }))] })] }))] }), dashboard?.phase === "revealing" && dashboard.reveal.currentAnnouncement && showRevealAnnouncement && (_jsx("div", { className: "public-live-overlay", role: "status", "aria-live": "polite", children: _jsx("div", { className: "public-live-overlay__bubble", children: dashboard.reveal.currentAnnouncement }) })), dashboard?.phase === "finished" && dashboard.reveal.winner && !winnerOverlayDismissed && (_jsx("div", { className: "public-live-overlay", role: "status", "aria-live": "polite", children: _jsxs("div", { className: "public-live-overlay__bubble public-live-overlay__bubble--winner", children: [_jsx("button", { type: "button", className: "public-live-overlay__close", onClick: () => setWinnerOverlayDismissed(true), "aria-label": "Gewinneranzeige schlie\u00DFen", children: "\u2715" }), "Gewinner der ESC-Party \u2013 ", dashboard.reveal.winner.artistName || "—", ", ", dashboard.reveal.winner.songTitle || "—", ", ", getCountryNameDe(dashboard.reveal.winner.countryCode)] }) }))] })] }));
}
