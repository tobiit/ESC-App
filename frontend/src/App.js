import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ParticipantLogin } from "./pages/ParticipantLogin";
import { ParticipantRegister } from "./pages/ParticipantRegister";
import { AdminLogin } from "./pages/AdminLogin";
import { ParticipantPage } from "./pages/ParticipantPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminResultsPage } from "./pages/AdminResultsPage";
import { PublicLivePage } from "./pages/PublicLivePage";
const storedUser = (() => {
    const storedUserRaw = localStorage.getItem("esc_user");
    if (!storedUserRaw)
        return null;
    try {
        return JSON.parse(storedUserRaw);
    }
    catch {
        localStorage.removeItem("esc_user");
        return null;
    }
})();
export function App() {
    const [user, setUser] = useState(storedUser);
    const handleLogout = () => {
        localStorage.removeItem("esc_user");
        setUser(null);
    };
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: user && user.role === "participant"
                        ? _jsx(ParticipantPage, { user: user, onLogout: handleLogout })
                        : _jsx(ParticipantLogin, { onLogin: setUser }) }), _jsx(Route, { path: "/login", element: _jsx(ParticipantLogin, { onLogin: setUser }) }), _jsx(Route, { path: "/registrieren", element: _jsx(ParticipantRegister, {}) }), _jsx(Route, { path: "/live", element: _jsx(PublicLivePage, {}) }), _jsx(Route, { path: "/verwaltung/login", element: user && user.role === "admin"
                        ? _jsx(Navigate, { to: "/verwaltung/", replace: true })
                        : _jsx(AdminLogin, { onLogin: setUser }) }), _jsx(Route, { path: "/verwaltung/", element: user && user.role === "admin"
                        ? _jsx(AdminPage, { user: user, onLogout: handleLogout })
                        : _jsx(Navigate, { to: "/verwaltung/login", replace: true }) }), _jsx(Route, { path: "/verwaltung/ergebnis/:eventId", element: user && user.role === "admin"
                        ? _jsx(AdminResultsPage, { user: user, onLogout: handleLogout })
                        : _jsx(Navigate, { to: "/verwaltung/login", replace: true }) }), _jsx(Route, { path: "/verwaltung/*", element: user && user.role === "admin"
                        ? _jsx(AdminPage, { user: user, onLogout: handleLogout })
                        : _jsx(Navigate, { to: "/verwaltung/login", replace: true }) })] }) }));
}
