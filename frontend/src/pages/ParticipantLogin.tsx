import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, setTokens } from "../api";

type User = { id: number; role: "admin" | "participant"; username: string; displayName: string };

export function ParticipantLogin({ onLogin }: { onLogin: (user: User) => void }) {
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
    } catch (err) {
      setError((err as Error).message);
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
    } catch (err) {
      setError((err as Error).message);
    } finally {
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
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDeletePending(false);
    }
  };

  return (
    <div className="login-page">
      <div className="card login-card">
        <div className="login-header">
          <h1>ESC Finale Tippspiel</h1>
          <p className="login-subtitle">Teilnehmer-Anmeldung</p>
        </div>
        <div className="form-field">
          <label className="form-label">Benutzername</label>
          <input
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Benutzername"
            onKeyDown={(e) => e.key === "Enter" && void handleSubmit()}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Passwort</label>
          <input
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            type="password"
            onKeyDown={(e) => e.key === "Enter" && void handleSubmit()}
          />
        </div>
        <button className="btn btn-primary" onClick={() => void handleSubmit()}>
          Anmelden
        </button>
        <button className="btn btn-secondary action" onClick={() => void handleRequestDelete()} disabled={deletePending}>
          {deletePending ? "Prüfe…" : "Account löschen"}
        </button>

        {showDeleteConfirm && (
          <div className="submit-confirmation" role="dialog" aria-modal="true" aria-labelledby="delete-account-confirmation-title">
            <div className="submit-confirmation__backdrop" onClick={() => !deletePending && setShowDeleteConfirm(false)} />
            <div className="submit-confirmation__card card">
              <h3 id="delete-account-confirmation-title">Konto endgültig löschen?</h3>
              <p>Benutzer und Login endgültig löschen? (Dies kann nicht rückgängig gemacht werden)</p>
              <div className="submit-confirmation__actions">
                <button className="btn btn-danger" onClick={() => void handleConfirmDelete()} disabled={deletePending}>Ja</button>
                <button className="btn" onClick={() => setShowDeleteConfirm(false)} disabled={deletePending}>Nein</button>
              </div>
            </div>
          </div>
        )}

        {error && <p className="form-message form-message--error">{error}</p>}
        {message && <p className="form-message" style={{ color: "var(--esc-color-green-700, green)" }}>{message}</p>}

        <div className="login-register-cta">
          <p className="login-register-cta__label">Noch kein Konto?</p>
          <button
            className="btn"
            style={{ width: "100%" }}
            onClick={() => navigate("/registrieren")}
          >
            Als neuer Teilnehmer registrieren
          </button>
        </div>
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.75rem", opacity: 0.6 }}>
          <Link to="/datenschutz">Datenschutzerklärung</Link>
        </p>
      </div>
    </div>
  );
}
