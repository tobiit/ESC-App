import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { api } from "../api";
export function EscImport({ onImported }) {
    const [year, setYear] = useState(new Date().getFullYear());
    const [preview, setPreview] = useState(null);
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
            setPreview(data);
        }
        catch (e) {
            setError(e.message || "Vorschau konnte nicht geladen werden");
        }
        finally {
            setLoading(false);
        }
    };
    const doImport = async () => {
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const result = await api.adminEscImport(year, setActive);
            setSuccess(`Event "${result.eventName}" mit ${result.entryCount} Einträgen importiert` +
                (result.hasResults ? " (inkl. offiziellem Ergebnis)" : "") + ".");
            setPreview(null);
            onImported();
        }
        catch (e) {
            setError(e.message || "Import fehlgeschlagen");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "card", children: [_jsx("h3", { children: "ESC Daten importieren" }), _jsxs("div", { className: "admin-actions", style: { alignItems: "flex-end" }, children: [_jsxs("div", { className: "form-field", style: { margin: 0 }, children: [_jsx("label", { className: "form-label", children: "Jahr" }), _jsx("input", { className: "form-input", type: "number", min: 1956, max: 2100, value: year, onChange: (e) => setYear(Number(e.target.value)), style: { width: "6rem" } })] }), _jsx("button", { className: "btn", onClick: () => void loadPreview(), disabled: loading, children: loading ? "Laden…" : "Vorschau laden" })] }), error && _jsx("p", { className: "form-message form-message--error", children: error }), success && _jsx("p", { className: "form-message", style: { color: "var(--esc-color-green-700, green)" }, children: success }), preview && (_jsxs(_Fragment, { children: [_jsxs("div", { style: { margin: "1rem 0 0.5rem" }, children: [_jsx("strong", { children: "Slogan / Event-Name:" }), " ", preview.slogan, _jsx("br", {}), preview.finaleDate && _jsxs(_Fragment, { children: [_jsx("strong", { children: "Finale:" }), " ", preview.finaleDate, _jsx("br", {})] }), _jsx("strong", { children: "Finalisten:" }), " ", preview.entryCount] }), _jsxs("table", { className: "data-table", style: { width: "100%", fontSize: "0.85rem" }, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Land" }), _jsx("th", { children: "K\u00FCnstler" }), _jsx("th", { children: "Song" }), preview.entries.some(e => e.place != null) && _jsx("th", { children: "Platz" })] }) }), _jsx("tbody", { children: preview.entries.map((entry, i) => (_jsxs("tr", { children: [_jsx("td", { children: entry.sortOrder }), _jsx("td", { children: entry.country || entry.countryName || entry.countryCode }), _jsx("td", { children: entry.artist }), _jsx("td", { children: entry.song }), preview.entries.some(e => e.place != null) && _jsx("td", { children: entry.place ?? "–" })] }, i))) })] }), _jsxs("div", { className: "admin-actions", style: { marginTop: "1rem" }, children: [_jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [_jsx("input", { type: "checkbox", checked: setActive, onChange: (e) => setSetActive(e.target.checked) }), "Als aktives Event setzen"] }), _jsx("button", { className: "btn btn-primary", onClick: () => void doImport(), disabled: loading, children: loading ? "Importiere…" : "Importieren" })] })] }))] }));
}
