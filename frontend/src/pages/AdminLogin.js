import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setTokens } from "../api";
export function AdminLogin({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        setError("");
        try {
            const payload = await api.login(username, password, true);
            setTokens(payload);
            localStorage.setItem("esc_user", JSON.stringify(payload.user));
            onLogin(payload.user);
            navigate("/verwaltung/");
        }
        catch (err) {
            setError(err.message);
        }
    };
    return (_jsx("div", { className: "login-page login-page--admin", children: _jsxs("div", { className: "card login-card", children: [_jsxs("div", { className: "login-header", children: [_jsx("h1", { children: "ESCAPP Verwaltung" }), _jsx("p", { className: "login-subtitle", children: "Administrator-Anmeldung" })] }), _jsxs("div", { className: "form-field", children: [_jsx("label", { className: "form-label", children: "Benutzername" }), _jsx("input", { className: "form-input", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Admin-Benutzername", onKeyDown: (e) => e.key === "Enter" && void handleSubmit() })] }), _jsxs("div", { className: "form-field", children: [_jsx("label", { className: "form-label", children: "Passwort" }), _jsx("input", { className: "form-input", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Passwort", type: "password", onKeyDown: (e) => e.key === "Enter" && void handleSubmit() })] }), _jsx("button", { className: "btn btn-primary", onClick: () => void handleSubmit(), children: "Anmelden" }), error && _jsx("p", { className: "form-message form-message--error", children: error })] }) }));
}
