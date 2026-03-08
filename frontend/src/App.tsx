import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ParticipantLogin } from "./pages/ParticipantLogin";
import { ParticipantRegister } from "./pages/ParticipantRegister";
import { AdminLogin } from "./pages/AdminLogin";
import { ParticipantPage } from "./pages/ParticipantPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminResultsPage } from "./pages/AdminResultsPage";

type User = { id: number; role: "admin" | "participant"; username: string; displayName: string };

const storedUserRaw = localStorage.getItem("esc_user");
const storedUser: User | null = storedUserRaw ? JSON.parse(storedUserRaw) : null;

export function App() {
  const [user, setUser] = useState<User | null>(storedUser);

  const handleLogout = () => {
    localStorage.removeItem("esc_user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Teilnehmer-Bereich */}
        <Route
          path="/"
          element={
            user && user.role === "participant"
              ? <ParticipantPage user={user} onLogout={handleLogout} />
              : <ParticipantLogin onLogin={setUser} />
          }
        />
        <Route path="/login" element={<ParticipantLogin onLogin={setUser} />} />
        <Route path="/registrieren" element={<ParticipantRegister />} />

        {/* Admin-Bereich */}
        <Route
          path="/verwaltung/login"
          element={
            user && user.role === "admin"
              ? <Navigate to="/verwaltung/" replace />
              : <AdminLogin onLogin={setUser} />
          }
        />
        <Route
          path="/verwaltung/"
          element={
            user && user.role === "admin"
              ? <AdminPage user={user} onLogout={handleLogout} />
              : <Navigate to="/verwaltung/login" replace />
          }
        />
        <Route
          path="/verwaltung/ergebnis/:eventId"
          element={
            user && user.role === "admin"
              ? <AdminResultsPage user={user} onLogout={handleLogout} />
              : <Navigate to="/verwaltung/login" replace />
          }
        />
        <Route
          path="/verwaltung/*"
          element={
            user && user.role === "admin"
              ? <AdminPage user={user} onLogout={handleLogout} />
              : <Navigate to="/verwaltung/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
