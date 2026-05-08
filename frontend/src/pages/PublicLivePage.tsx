import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { api, type PublicLiveDashboardPayload } from "../api";
import { getCountryNameDe } from "../lib/countries";

function getFlagEmoji(countryCode: string) {
  const normalized = String(countryCode || "").toUpperCase().trim();
  if (!/^[A-Z]{2}$/.test(normalized)) return "🏳️";
  return String.fromCodePoint(...[...normalized].map((char) => 127397 + char.charCodeAt(0)));
}

function renderStatusBadge(value: boolean) {
  return (
    <span className={`public-live-status public-live-status--${value ? "done" : "open"}`}>
      <span className="public-live-status__dot" aria-hidden="true" />
      {value ? "Ja" : "Nein"}
    </span>
  );
}

export function PublicLivePage() {
  const [dashboard, setDashboard] = useState<PublicLiveDashboardPayload | null>(null);
  const [displayedRankingEntries, setDisplayedRankingEntries] = useState<PublicLiveDashboardPayload["localRanking"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [winnerOverlayDismissed, setWinnerOverlayDismissed] = useState(false);
  const [showRevealAnnouncement, setShowRevealAnnouncement] = useState(false);
  const [rankingContainerWidth, setRankingContainerWidth] = useState(0);
  const rankingRowRefs = useRef(new Map<number, HTMLTableRowElement>());
  const previousRowTopByEntry = useRef(new Map<number, number>());
  const rankingContainerRef = useRef<HTMLDivElement | null>(null);
  const announcementKeyRef = useRef<string | null>(null);
  const rankingUpdateTimeoutRef = useRef<number | null>(null);
  const latestRankingRef = useRef<PublicLiveDashboardPayload["localRanking"]>([]);

  const phase = dashboard?.phase ?? "collecting";
  const shouldAutoRefresh = phase !== "finished";
  const refreshMs = phase === "revealing" || phase === "tip_end_countdown" ? 1000 : 5000;

  useEffect(() => {
    let disposed = false;
    let timeoutId: number | null = null;

    const load = async () => {
      try {
        const data = await api.getPublicLiveDashboard();
        if (disposed) return;
        setDashboard(data);
        setError("");
      } catch (err) {
        if (disposed) return;
        setError((err as Error).message);
      } finally {
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
    if (!container) return;

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
    const nextPositions = new Map<number, number>();

    for (const [entryId, rowElement] of rankingRowRefs.current.entries()) {
      if (!rowElement) continue;
      const nextTop = rowElement.getBoundingClientRect().top;
      nextPositions.set(entryId, nextTop);

      const previousTop = previousRowTopByEntry.current.get(entryId);
      if (previousTop == null) continue;
      const delta = previousTop - nextTop;
      if (Math.abs(delta) < 1) continue;

      rowElement.style.transition = "none";
      rowElement.style.transform = `translateY(${delta}px)`;

      requestAnimationFrame(() => {
        rowElement.style.transition = "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)";
        rowElement.style.transform = "translateY(0)";
      });
    }

    previousRowTopByEntry.current = nextPositions;
  }, [displayedRankingEntries, dashboard?.reveal?.currentStepIndex]);

  const showRankingTable =
    phase === "post_tip_end_pre_reveal" || phase === "revealing" || phase === "finished";

  const rankingEntries = displayedRankingEntries;
  const showTwoColumnRanking = showRankingTable && rankingContainerWidth >= 1080 && rankingEntries.length >= 8;
  const rankingSplitIndex = Math.ceil(rankingEntries.length / 2);
  const rankingColumns =
    rankingEntries.length > 0
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
      setDisplayedRankingEntries(latestRankingRef.current);
    }
    // During revealing: table updates are driven by the announcement effect below.
  }, [dashboard?.localRanking, dashboard?.phase]);

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

  const statusLabel =
    phase === "tip_end_countdown"
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

  return (
    <div className="shell public-live-page">
      <div className="topbar">
        <strong>ESCAPP Live-Status</strong>
        <span>Automatische Aktualisierung alle {Math.round(refreshMs / 1000)} Sekunden</span>
      </div>

      <div className="layout">
        <div className="card public-live-hero">
          <h1>Live-Übersicht</h1>
          {dashboard?.event ? (
            <>
              <p className="public-live-hero__subtitle">
                {dashboard.event.name}
                {dashboard.event.year ? ` ${dashboard.event.year}` : ""}
              </p>
              <p className="public-live-hero__meta">
                Status: <span className="badge">{dashboard.event.status}</span>
                {` · Live-Phase: ${statusLabel}`}
                {dashboard.updatedAt ? ` · Aktualisiert: ${new Date(dashboard.updatedAt).toLocaleTimeString("de-DE")}` : ""}
              </p>
            </>
          ) : (
            <p className="public-live-hero__meta">{loading ? "Lade Live-Daten..." : "Kein aktives Event gefunden."}</p>
          )}
          {error && <p className="form-message form-message--error">{error}</p>}
        </div>

        <div className="public-live-grid">
          <div className="public-live-grid__main-column">
            <div className="card">
              <h3>Teilnehmerstatus</h3>
              <table className="data-table public-live-table">
                <thead>
                  <tr>
                    <th>Anzeigename</th>
                    <th>Bewertung abgegeben</th>
                    <th>Tipp abgegeben</th>
                  </tr>
                </thead>
                <tbody>
                  {(dashboard?.participants || []).map((participant) => (
                    <tr
                      key={participant.participantId}
                      className={
                        dashboard?.reveal?.activeParticipantId === participant.participantId
                          ? "public-live-table__row--active-participant"
                          : ""
                      }
                    >
                      <td>{participant.displayName}</td>
                      <td>{renderStatusBadge(participant.ratingSubmitted)}</td>
                      <td>{renderStatusBadge(participant.predictionSubmitted)}</td>
                    </tr>
                  ))}
                  {!loading && (dashboard?.participants || []).length === 0 && (
                    <tr>
                      <td colSpan={3}>Keine Teilnehmerdaten vorhanden.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card public-live-grid__side-column">
            <h3>Reveal-Status</h3>
            <p className="public-live-hero__meta">Phase: {statusLabel}</p>
            {dashboard?.phase === "tip_end_countdown" && (
              <p className="public-live-hero__meta">
                Countdown: <strong>{dashboard.countdownRemainingSeconds}s</strong>
              </p>
            )}
            {dashboard?.reveal && (
              <>
                <p className="public-live-hero__meta">
                  Fortschritt: <strong>{dashboard.reveal.currentStepIndex}</strong> / <strong>{dashboard.reveal.totalSteps}</strong>
                </p>
                {dashboard.reveal.activeParticipantName && (
                  <p className="public-live-hero__meta">
                    Aktiver Teilnehmer: <strong>{dashboard.reveal.activeParticipantName}</strong>
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="card" ref={rankingContainerRef}>
          <h3>Lokale Songbewertung</h3>
          {!showRankingTable && (
            <p className="public-live-hero__meta">
              Tabelle wird erst nach Tippende angezeigt.
            </p>
          )}

          {showRankingTable && showTwoColumnRanking && (
            <div className="public-live-ranking-columns">
              {rankingColumns.map((columnEntries, columnIndex) => (
                <table key={`ranking-col-${columnIndex}`} className="data-table public-live-table">
                  <thead>
                    <tr>
                      <th>Rang</th>
                      <th>Flagge</th>
                      <th>Sänger</th>
                      <th>Lied</th>
                      <th>Land</th>
                      <th>Stimmen</th>
                      <th>Punkte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {columnEntries.map((entry) => (
                      <tr
                        key={entry.entryId}
                        ref={(row) => {
                          if (row) rankingRowRefs.current.set(entry.entryId, row);
                        }}
                      >
                        <td><strong>{entry.rank}</strong></td>
                        <td className="public-live-table__flag" title={getCountryNameDe(entry.countryCode)}>
                          <span aria-hidden="true">{getFlagEmoji(entry.countryCode)}</span>
                        </td>
                        <td>{entry.artistName || "—"}</td>
                        <td>{entry.songTitle || "—"}</td>
                        <td>{getCountryNameDe(entry.countryCode)}</td>
                        <td>{entry.votes}</td>
                        <td>{entry.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
          )}

          {showRankingTable && !showTwoColumnRanking && (
            <table className="data-table public-live-table">
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Flagge</th>
                  <th>Sänger</th>
                  <th>Lied</th>
                  <th>Land</th>
                  <th>Stimmen</th>
                  <th>Punkte</th>
                </tr>
              </thead>
              <tbody>
                {rankingEntries.map((entry) => (
                  <tr
                    key={entry.entryId}
                    ref={(row) => {
                      if (row) rankingRowRefs.current.set(entry.entryId, row);
                    }}
                  >
                    <td><strong>{entry.rank}</strong></td>
                    <td className="public-live-table__flag" title={getCountryNameDe(entry.countryCode)}>
                      <span aria-hidden="true">{getFlagEmoji(entry.countryCode)}</span>
                    </td>
                    <td>{entry.artistName || "—"}</td>
                    <td>{entry.songTitle || "—"}</td>
                    <td>{getCountryNameDe(entry.countryCode)}</td>
                    <td>{entry.votes}</td>
                    <td>{entry.points}</td>
                  </tr>
                ))}
                {!loading && rankingEntries.length === 0 && (
                  <tr>
                    <td colSpan={7}>Noch keine Bewertungen vorhanden.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {dashboard?.phase === "revealing" && dashboard.reveal.currentAnnouncement && showRevealAnnouncement && (
          <div className="public-live-overlay" role="status" aria-live="polite">
            <div className="public-live-overlay__bubble">{dashboard.reveal.currentAnnouncement}</div>
          </div>
        )}

        {dashboard?.phase === "finished" && dashboard.reveal.winner && !winnerOverlayDismissed && (
          <div className="public-live-overlay" role="status" aria-live="polite">
            <div className="public-live-overlay__bubble public-live-overlay__bubble--winner">
              <button
                type="button"
                className="public-live-overlay__close"
                onClick={() => setWinnerOverlayDismissed(true)}
                aria-label="Gewinneranzeige schließen"
              >
                ✕
              </button>
              Gewinner der ESC-Party – {dashboard.reveal.winner.artistName || "—"}, {dashboard.reveal.winner.songTitle || "—"}, {getCountryNameDe(dashboard.reveal.winner.countryCode)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}