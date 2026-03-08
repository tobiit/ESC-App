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
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (success) {
    return (
      <div className="login-page">
        <div className="card login-card">
          <div className="login-header">
            <h1>Registrierung erfolgreich</h1>
          </div>
          <p className="form-message form-message--success">
            Ihr Konto wurde erstellt. Ein Administrator muss Ihr Konto freigeben, bevor Sie sich anmelden können.
          </p>
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            Sie werden nicht benachrichtigt, sobald Ihr Konto freigeschaltet wurde. Info erfolgt durch den Administrator.
          </p>
          <Link to="/login" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
            Zur Anmeldung
          </Link>
        </div>
      </div>
    );
  }

  if (showTerms) {
    return (
      <div className="login-page">
        <div className="card" style={{ maxWidth: "800px", width: "90%" }}>
          <div className="login-header">
            <h1>Nutzungsbedingungen</h1>
          </div>
          <div style={{ maxHeight: "60vh", overflow: "auto", padding: "1rem", background: "#f9f9f9", borderRadius: "8px" }}>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0 }}>{termsContent}</pre>
          </div>
          <button className="btn btn-secondary" onClick={() => setShowTerms(false)} style={{ marginTop: "1rem" }}>
            Zurück
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="card login-card">
        <div className="login-header">
          <h1>ESC Finale Tippspiel</h1>
          <p className="login-subtitle">Registrierung</p>
        </div>

        <div className="form-field">
          <label className="form-label">Anzeigename *</label>
          <input
            className="form-input"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Wird anderen Teilnehmern angezeigt"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Voller Name *</label>
          <input
            className="form-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ihr vollständiger Name"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Benutzername *</label>
          <input
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Für die Anmeldung"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Passwort *</label>
          <input
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mindestens 6 Zeichen"
            type="password"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Passwort bestätigen *</label>
          <input
            className="form-input"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Passwort wiederholen"
            type="password"
            onKeyDown={(e) => e.key === "Enter" && void handleSubmit()}
          />
        </div>

        <div className="form-field" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label htmlFor="terms" style={{ cursor: "pointer", margin: 0 }}>
            Ich akzeptiere die{" "}
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              style={{
                background: "none",
                border: "none",
                color: "#1976d2",
                textDecoration: "underline",
                cursor: "pointer",
                padding: 0,
                font: "inherit"
              }}
            >
              Nutzungsbedingungen
            </button>
          </label>
        </div>

        {error && <p className="form-message form-message--error">{error}</p>}

        <button className="btn btn-primary" onClick={() => void handleSubmit()}>
          Registrieren
        </button>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Bereits registriert?{" "}
          <Link to="/login" style={{ color: "#1976d2", textDecoration: "underline" }}>
            Zur Anmeldung
          </Link>
        </p>
      </div>
    </div>
  );
}
