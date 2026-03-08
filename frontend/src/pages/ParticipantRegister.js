import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";
export function ParticipantRegister() {
    const [displayName, setDisplayName] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [termsContent, setTermsContent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // Load terms of service
        fetch("/bedingungen.md")
            .then((res) => res.text())
            .then((text) => setTermsContent(text))
            .catch(() => setTermsContent("Nutzungsbedingungen konnten nicht geladen werden."));
    }, []);
    const handleSubmit = async () => {
        setError("");
        // Validation
        if (!displayName || !fullName || !username || !password || !passwordConfirm) {
            setError("Bitte füllen Sie alle Felder aus");
            return;
        }
        if (password !== passwordConfirm) {
            setError("Passwörter stimmen nicht überein");
            return;
        }
        if (password.length < 6) {
            setError("Passwort muss mindestens 6 Zeichen lang sein");
            return;
        }
        if (!acceptedTerms) {
            setError("Bitte akzeptieren Sie die Nutzungsbedingungen");
            return;
        }
        try {
            const result = await api.register({ displayName, fullName, username, password, acceptedTerms });
            setSuccess(true);
            setError("");
        }
        catch (err) {
            setError(err.message);
        }
    };
    if (success) {
        return (_jsx("div", { className: "login-page", children: _jsxs("div", { className: "card login-card", children: [_jsx("div", { className: "login-header", children: _jsx("h1", { children: "Registrierung erfolgreich" }) }), _jsx("p", { className: "form-message form-message--success", children: "Ihr Konto wurde erstellt. Ein Administrator muss Ihr Konto freigeben, bevor Sie sich anmelden k\u00F6nnen." }), _jsx("p", { style: { marginTop: "1rem", textAlign: "center" }, children: "Sie werden nicht benachrichtigt, sobald Ihr Konto freigeschaltet wurde. Info erfolgt durch den Administrator." }), _jsx(Link, { to: "/login", className: "btn btn-primary", style: { marginTop: "1.5rem" }, children: "Zur Anmeldung" })] }) }));
    }
    if (showTerms) {
        return (_jsx("div", { className: "login-page", children: _jsxs("div", { className: "card", style: { maxWidth: "800px", width: "90%" }, children: [_jsx("div", { className: "login-header", children: _jsx("h1", { children: "Nutzungsbedingungen" }) }), _jsx("div", { style: { maxHeight: "60vh", overflow: "auto", padding: "1rem", background: "#f9f9f9", borderRadius: "8px" }, children: _jsx("pre", { style: { whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0 }, children: termsContent }) }), _jsx("button", { className: "btn btn-secondary", onClick: () => setShowTerms(false), style: { marginTop: "1rem" }, children: "Zur\u00FCck" })] }) }));
    }
    return (_jsx("div", { className: "login-page", children: _jsxs("div", { className: "card login-card", children: [_jsxs("div", { className: "login-header", children: [_jsx("h1", { children: "ESC Finale Tippspiel" }), _jsx("p", { className: "login-subtitle", children: "Registrierung" })] }), _jsxs("div", { className: "form-field", children: [_jsx("label", { className: "form-label", children: "Anzeigename *" }), _jsx("input", { className: "form-input", value: displayName, onChange: (e) => setDisplayName(e.target.value), placeholder: "Wird anderen Teilnehmern angezeigt" })] }), _jsxs("div", { className: "form-field", children: [_jsx("label", { className: "form-label", children: "Voller Name *" }), _jsx("input", { className: "form-input", value: fullName, onChange: (e) => setFullName(e.target.value), placeholder: "Ihr vollst\u00E4ndiger Name" })] }), _jsxs("div", { className: "form-field", children: [_jsx("label", { className: "form-label", children: "Benutzername *" }), _jsx("input", { className: "form-input", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "F\u00FCr die Anmeldung" })] }), _jsxs("div", { className: "form-field", children: [_jsx("label", { className: "form-label", children: "Passwort *" }), _jsx("input", { className: "form-input", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Mindestens 6 Zeichen", type: "password" })] }), _jsxs("div", { className: "form-field", children: [_jsx("label", { className: "form-label", children: "Passwort best\u00E4tigen *" }), _jsx("input", { className: "form-input", value: passwordConfirm, onChange: (e) => setPasswordConfirm(e.target.value), placeholder: "Passwort wiederholen", type: "password", onKeyDown: (e) => e.key === "Enter" && void handleSubmit() })] }), _jsxs("div", { className: "form-field", style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [_jsx("input", { type: "checkbox", id: "terms", checked: acceptedTerms, onChange: (e) => setAcceptedTerms(e.target.checked) }), _jsxs("label", { htmlFor: "terms", style: { cursor: "pointer", margin: 0 }, children: ["Ich akzeptiere die", " ", _jsx("button", { type: "button", onClick: () => setShowTerms(true), style: {
                                        background: "none",
                                        border: "none",
                                        color: "#1976d2",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                        padding: 0,
                                        font: "inherit"
                                    }, children: "Nutzungsbedingungen" })] })] }), error && _jsx("p", { className: "form-message form-message--error", children: error }), _jsx("button", { className: "btn btn-primary", onClick: () => void handleSubmit(), children: "Registrieren" }), _jsxs("p", { style: { marginTop: "1rem", textAlign: "center" }, children: ["Bereits registriert?", " ", _jsx(Link, { to: "/login", style: { color: "#1976d2", textDecoration: "underline" }, children: "Zur Anmeldung" })] })] }) }));
}
