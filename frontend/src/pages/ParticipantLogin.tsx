import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setTokens } from "../api";

type User = { id: number; role: "admin" | "participant"; username: string; displayName: string };

export function ParticipantLogin({ onLogin }: { onLogin: (user: User) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
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
        {error && <p className="form-message form-message--error">{error}</p>}
      </div>
    </div>
  );
}
