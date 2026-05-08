import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, setTokens } from "../api";
export function ParticipantLogin({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [deletePending, setDeletePending] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        setError("");
        setMessage("");
        try {
            const payload = await api.login(username, password, false);
            setTokens(payload);
            localStorage.setItem("esc_user", JSON.stringify(payload.user));
            onLogin(payload.user);
            navigate("/");
        }
        catch (err) {
            setError(err.message);
        }
    };
    const handleRequestDelete = async () => {
        setError("");
        setMessage("");
        if (!username.trim() || !password) {
            setError("Bitte Benutzername und Passwort eingeben.");
            return;
        }
        setDeletePending(true);
        try {
            await api.verifyDeleteAccount(username.trim(), password);
            setShowDeleteConfirm(true);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setDeletePending(false);
        }
    };
    const handleConfirmDelete = async () => {
        setError("");
        setMessage("");
        setDeletePending(true);
        try {
            await api.deleteAccount(username.trim(), password);
            setShowDeleteConfirm(false);
            setUsername("");
            setPassword("");
            setMessage("Konto wurde gelöscht und anonymisiert.");
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setDeletePending(false);
        }
    };
    return (_jsx("div", { className: "login-page", children: _jsxs("div", { className: "card login-card", children: [_jsxs("div", { className: "login-header", children: [_jsx("h1", { children: "ESC Finale Tippspiel" }), _jsx("p", { className: "login-subtitle", children: "Teilnehmer-Anmeldung" })] }), _jsxs("div", { className: "form-field", children: [_jsx("label", { className: "form-label", children: "Benutzername" }), _jsx("input", { className: "form-input", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Benutzername", onKeyDown: (e) => e.key === "Enter" && void handleSubmit() })] }), _jsxs("div", { className: "form-field", children: [_jsx("label", { className: "form-label", children: "Passwort" }), _jsx("input", { className: "form-input", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Passwort", type: "password", onKeyDown: (e) => e.key === "Enter" && void handleSubmit() })] }), _jsx("button", { className: "btn btn-primary", onClick: () => void handleSubmit(), children: "Anmelden" }), _jsx("button", { className: "btn btn-secondary action", onClick: () => void handleRequestDelete(), disabled: deletePending, children: deletePending ? "Prüfe…" : "Account löschen" }), showDeleteConfirm && (_jsxs("div", { className: "submit-confirmation", role: "dialog", "aria-modal": "true", "aria-labelledby": "delete-account-confirmation-title", children: [_jsx("div", { className: "submit-confirmation__backdrop", onClick: () => !deletePending && setShowDeleteConfirm(false) }), _jsxs("div", { className: "submit-confirmation__card card", children: [_jsx("h3", { id: "delete-account-confirmation-title", children: "Konto endg\u00FCltig l\u00F6schen?" }), _jsx("p", { children: "Benutzer und Login endg\u00FCltig l\u00F6schen? (Dies kann nicht r\u00FCckg\u00E4ngig gemacht werden)" }), _jsxs("div", { className: "submit-confirmation__actions", children: [_jsx("button", { className: "btn btn-danger", onClick: () => void handleConfirmDelete(), disabled: deletePending, children: "Ja" }), _jsx("button", { className: "btn", onClick: () => setShowDeleteConfirm(false), disabled: deletePending, children: "Nein" })] })] })] })), error && _jsx("p", { className: "form-message form-message--error", children: error }), message && _jsx("p", { className: "form-message", style: { color: "var(--esc-color-green-700, green)" }, children: message }), _jsxs("div", { className: "login-register-cta", children: [_jsx("p", { className: "login-register-cta__label", children: "Noch kein Konto?" }), _jsx("button", { className: "btn", style: { width: "100%" }, onClick: () => navigate("/registrieren"), children: "Als neuer Teilnehmer registrieren" })] }), _jsx("p", { style: { textAlign: "center", marginTop: "1rem", fontSize: "0.75rem", opacity: 0.6 }, children: _jsx(Link, { to: "/datenschutz", children: "Datenschutzerkl\u00E4rung" }) })] }) }));
}
