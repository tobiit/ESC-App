import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let disposed = false;

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

  return (
    <div className="shell public-live-page">
      <div className="topbar">
        <strong>ESCAPP Live-Status</strong>
        <span>Automatische Aktualisierung alle 10 Sekunden</span>
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
                {dashboard.updatedAt ? ` · Aktualisiert: ${new Date(dashboard.updatedAt).toLocaleTimeString("de-DE")}` : ""}
              </p>
            </>
          ) : (
            <p className="public-live-hero__meta">{loading ? "Lade Live-Daten..." : "Kein aktives Event gefunden."}</p>
          )}
          {error && <p className="form-message form-message--error">{error}</p>}
        </div>

        <div className="public-live-grid">
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
                  <tr key={participant.participantId}>
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

          <div className="card">
            <h3>Lokale Songbewertung</h3>
            <table className="data-table public-live-table">
              <thead>
                <tr>
                  <th>Flagge</th>
                  <th>Sänger</th>
                  <th>Lied</th>
                  <th>Land</th>
                  <th>Stimmen</th>
                  <th>Punkte</th>
                </tr>
              </thead>
              <tbody>
                {(dashboard?.localRanking || []).map((entry) => (
                  <tr key={entry.entryId}>
                    <td className="public-live-table__flag" title={getCountryNameDe(entry.countryCode)}>
                      <span aria-hidden="true">{getFlagEmoji(entry.countryCode)}</span>
                    </td>
                    <td>{entry.artistName || "—"}</td>
                    <td>{entry.songTitle || "—"}</td>
                    <td>{entry.countryCode}</td>
                    <td>{entry.votes}</td>
                    <td>{entry.points}</td>
                  </tr>
                ))}
                {!loading && (dashboard?.localRanking || []).length === 0 && (
                  <tr>
                    <td colSpan={6}>Noch keine Bewertungen vorhanden.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}