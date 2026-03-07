import { useState } from "react";
import { api } from "../api";

type PreviewEntry = {
  country: string;
  countryCode: string;
  artist: string;
  song: string;
  sortOrder: number;
  place: number | null;
};

type PreviewData = {
  year: number;
  slogan: string;
  finaleDate: string | null;
  entries: PreviewEntry[];
  entryCount: number;
};

export function EscImport({ onImported }: { onImported: () => void }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [setActive, setSetActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadPreview = async () => {
    setError("");
    setSuccess("");
    setPreview(null);
    setLoading(true);
    try {
      const data = await api.adminEscImportPreview(year);
      setPreview(data as PreviewData);
    } catch (e: any) {
      setError(e.message || "Vorschau konnte nicht geladen werden");
    } finally {
      setLoading(false);
    }
  };

  const doImport = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const result = await api.adminEscImport(year, setActive) as {
        ok: boolean;
        eventId: number;
        eventName: string;
        entryCount: number;
        hasResults: boolean;
      };
      setSuccess(
        `Event "${result.eventName}" mit ${result.entryCount} Einträgen importiert` +
        (result.hasResults ? " (inkl. offiziellem Ergebnis)" : "") + "."
      );
      setPreview(null);
      onImported();
    } catch (e: any) {
      setError(e.message || "Import fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>ESC Daten importieren</h3>

      <div className="admin-actions" style={{ alignItems: "flex-end" }}>
        <div className="form-field" style={{ margin: 0 }}>
          <label className="form-label">Jahr</label>
          <input
            className="form-input"
            type="number"
            min={1956}
            max={2100}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{ width: "6rem" }}
          />
        </div>
        <button className="btn" onClick={() => void loadPreview()} disabled={loading}>
          {loading ? "Laden…" : "Vorschau laden"}
        </button>
      </div>

      {error && <p className="form-message form-message--error">{error}</p>}
      {success && <p className="form-message" style={{ color: "var(--esc-color-green-700, green)" }}>{success}</p>}

      {preview && (
        <>
          <div style={{ margin: "1rem 0 0.5rem" }}>
            <strong>Slogan / Event-Name:</strong> {preview.slogan}<br />
            {preview.finaleDate && <><strong>Finale:</strong> {preview.finaleDate}<br /></>}
            <strong>Finalisten:</strong> {preview.entryCount}
          </div>

          <table className="data-table" style={{ width: "100%", fontSize: "0.85rem" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Land</th>
                <th>Künstler</th>
                <th>Song</th>
                {preview.entries.some(e => e.place != null) && <th>Platz</th>}
              </tr>
            </thead>
            <tbody>
              {preview.entries.map((entry, i) => (
                <tr key={i}>
                  <td>{entry.sortOrder}</td>
                  <td>{entry.country}</td>
                  <td>{entry.artist}</td>
                  <td>{entry.song}</td>
                  {preview.entries.some(e => e.place != null) && <td>{entry.place ?? "–"}</td>}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="admin-actions" style={{ marginTop: "1rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" checked={setActive} onChange={(e) => setSetActive(e.target.checked)} />
              Als aktives Event setzen
            </label>
            <button className="btn btn-primary" onClick={() => void doImport()} disabled={loading}>
              {loading ? "Importiere…" : "Importieren"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
