import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function DatenschutzPage() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/datenschutz.html")
      .then((res) => res.text())
      .then(setHtml)
      .catch(() => setHtml("<p>Datenschutzerklärung konnte nicht geladen werden.</p>"));
  }, []);

  return (
    <div className="shell">
      <div className="layout">
        <div style={{ textAlign: "center", padding: "1.5rem 0 0.5rem" }}>
          <Link to="/login" className="btn btn-secondary">
            ← Zurück zum Login
          </Link>
        </div>
        <div className="card" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
