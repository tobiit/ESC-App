import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, clearTokens } from "../api";
import type { AdminLiveControlPayload } from "../api";
import { AdminEventManager } from "../components/AdminEventManager";
import { DataTable } from "../components/DataTable";
import { EscImport } from "../components/EscImport";

type User = { id: number; role: "admin" | "participant"; username: string; displayName: string };
type SubmissionStatus = { ratingSubmitted: boolean; predictionSubmitted: boolean };
type AnthropicModelOption = { id: string; displayName: string; createdAt?: string | null };

export function AdminPage({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [eventRows, setEventRows] = useState<any[]>([]);
  const [participantRows, setParticipantRows] = useState<any[]>([]);
  const [pendingParticipants, setPendingParticipants] = useState<any[]>([]);
  const [submissionStatusByParticipant, setSubmissionStatusByParticipant] = useState<Record<number, SubmissionStatus>>({});
  const [activeEventForStatus, setActiveEventForStatus] = useState<{ id: number; name: string } | null>(null);
  const [showOnlyOpenParticipants, setShowOnlyOpenParticipants] = useState(false);
  const [liveControl, setLiveControl] = useState<AdminLiveControlPayload | null>(null);
  const [liveControlLoading, setLiveControlLoading] = useState(false);
  const [liveSettingsSaving, setLiveSettingsSaving] = useState(false);
  const [participantPauseSecondsInput, setParticipantPauseSecondsInput] = useState("30");
  const [pointPauseSecondsInput, setPointPauseSecondsInput] = useState("5");
  const [tipEndCountdownSecondsInput, setTipEndCountdownSecondsInput] = useState("20");
  const [anthropicApiKey, setAnthropicApiKey] = useState("");
  const [anthropicModel, setAnthropicModel] = useState("");
  const [anthropicModels, setAnthropicModels] = useState<AnthropicModelOption[]>([]);
  const [anthropicLoading, setAnthropicLoading] = useState(false);
  const [anthropicSaving, setAnthropicSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [toastFading, setToastFading] = useState(false);
  const navigate = useNavigate();

  // Auto-fade toast after 8 seconds
  useEffect(() => {
    if (message) {
      setToastFading(false);
      const fadeTimer = setTimeout(() => {
        setToastFading(true);
      }, 8000);
      const clearTimer = setTimeout(() => {
        setMessage("");
        setToastFading(false);
      }, 8300);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [message]);

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
      return;
    }
    void load();
  }, [user, navigate]);

  const loadAnthropicConfig = async () => {
    setAnthropicLoading(true);
    try {
      const config = await api.adminAnthropicConfig();
      const nextApiKey = config.apiKey || "";
      const nextModel = config.model || "";
      setAnthropicApiKey(nextApiKey);
      setAnthropicModel(nextModel);

      if (!nextApiKey) {
        setAnthropicModels([]);
        return;
      }

      const modelResponse = await api.adminAnthropicModels();
      const availableModels = modelResponse.models || [];
      setAnthropicModels(availableModels);

      if (!nextModel && availableModels.length > 0) {
        setAnthropicModel(availableModels[0].id);
      }
    } catch (err) {
      setAnthropicModels([]);
      setMessage(`Fehler beim Laden der Anthropic-Konfiguration: ${(err as Error).message}`);
    } finally {
      setAnthropicLoading(false);
    }
  };

  const load = async () => {
    try {
      const [eventRowsResponse, participantRowsResponse, pendingResponse] = await Promise.all([
        api.adminEvents(),
        api.adminParticipants(),
        api.adminPendingParticipants()
      ]);

      const normalizedEvents = eventRowsResponse.map((event: any) => ({ ...event, isNew: false }));
      const normalizedParticipants = participantRowsResponse.map((participant: any) => ({
        ...participant,
        password: "",
        isNew: false
      }));

      setEventRows(normalizedEvents);
      setParticipantRows(normalizedParticipants);
      setPendingParticipants(pendingResponse);

      await loadAnthropicConfig();

      const activeEvent = normalizedEvents.find((event: any) => Boolean(event.isActive) && !event.deletedAt);
      if (!activeEvent?.id) {
        setSubmissionStatusByParticipant({});
        setActiveEventForStatus(null);
        setLiveControl(null);
        return;
      }

      setLiveControlLoading(true);
      const [ratingsData, predictionsData, liveControlData] = await Promise.all([
        api.adminRatings(activeEvent.id),
        api.adminPredictions(activeEvent.id),
        api.adminLiveControl(activeEvent.id)
      ]);

      setLiveControl(liveControlData);
      setParticipantPauseSecondsInput(String(liveControlData.liveState.revealParticipantPauseSeconds ?? 30));
      setPointPauseSecondsInput(String(liveControlData.liveState.revealPointPauseSeconds ?? 5));
      setTipEndCountdownSecondsInput(String(liveControlData.liveState.tipEndCountdownSeconds ?? 20));

      const nextStatusMap: Record<number, SubmissionStatus> = {};
      for (const participant of normalizedParticipants) {
        if (participant?.id) {
          nextStatusMap[participant.id] = { ratingSubmitted: false, predictionSubmitted: false };
        }
      }

      for (const rating of (ratingsData || [])) {
        const participantId = Number(rating.participantId);
        if (!Number.isFinite(participantId)) continue;
        const current = nextStatusMap[participantId] || { ratingSubmitted: false, predictionSubmitted: false };
        nextStatusMap[participantId] = {
          ...current,
          ratingSubmitted: rating.status === "submitted"
        };
      }

      for (const prediction of (predictionsData || [])) {
        const participantId = Number(prediction.participantId);
        if (!Number.isFinite(participantId)) continue;
        const current = nextStatusMap[participantId] || { ratingSubmitted: false, predictionSubmitted: false };
        nextStatusMap[participantId] = {
          ...current,
          predictionSubmitted: prediction.status === "submitted"
        };
      }

      setSubmissionStatusByParticipant(nextStatusMap);
      setActiveEventForStatus({ id: activeEvent.id, name: activeEvent.name || `Event ${activeEvent.id}` });
      setLiveControlLoading(false);
    } catch (err) {
      setLiveControlLoading(false);
      setMessage(`Fehler beim Laden: ${(err as Error).message}`);
    }
  };

  const handleLogout = async () => {
    try { await api.logout(); } finally { clearTokens(); onLogout(); navigate("/verwaltung/login"); }
  };

  const saveAnthropicConfig = async () => {
    const trimmedApiKey = anthropicApiKey.trim();
    if (!trimmedApiKey) {
      setMessage("Anthropic API-Key darf nicht leer sein.");
      return;
    }

    setAnthropicSaving(true);
    try {
      await api.adminSaveAnthropicConfig({ apiKey: trimmedApiKey, model: anthropicModel || null });

      const modelResponse = await api.adminAnthropicModels();
      const availableModels = modelResponse.models || [];
      setAnthropicModels(availableModels);

      let nextModel = anthropicModel;
      if (!nextModel || !availableModels.some((model) => model.id === nextModel)) {
        nextModel = availableModels[0]?.id || "";
        setAnthropicModel(nextModel);
      }

      if (nextModel) {
        await api.adminSaveAnthropicConfig({ apiKey: trimmedApiKey, model: nextModel });
      }

      setAnthropicApiKey(trimmedApiKey);
      setMessage("Anthropic-Konfiguration gespeichert");
    } catch (err) {
      setMessage(`Fehler beim Speichern der Anthropic-Konfiguration: ${(err as Error).message}`);
    } finally {
      setAnthropicSaving(false);
    }
  };

  const refreshAnthropicModels = async () => {
    if (!anthropicApiKey.trim()) {
      setMessage("Zuerst einen Anthropic API-Key speichern.");
      return;
    }

    setAnthropicLoading(true);
    try {
      const modelResponse = await api.adminAnthropicModels();
      const availableModels = modelResponse.models || [];
      setAnthropicModels(availableModels);
      if (availableModels.length > 0 && !availableModels.some((model) => model.id === anthropicModel)) {
        setAnthropicModel(availableModels[0].id);
      }
      setMessage(`${availableModels.length} Anthropic-Modelle geladen`);
    } catch (err) {
      setMessage(`Fehler beim Laden der Anthropic-Modelle: ${(err as Error).message}`);
    } finally {
      setAnthropicLoading(false);
    }
  };

  const deleteAnthropicConfig = async () => {
    if (!confirm("Anthropic-Konfiguration wirklich löschen?")) {
      return;
    }

    setAnthropicSaving(true);
    try {
      await api.adminDeleteAnthropicConfig();
      setAnthropicApiKey("");
      setAnthropicModel("");
      setAnthropicModels([]);
      setMessage("Anthropic-Konfiguration gelöscht");
    } catch (err) {
      setMessage(`Fehler beim Löschen der Anthropic-Konfiguration: ${(err as Error).message}`);
    } finally {
      setAnthropicSaving(false);
    }
  };

  const updateParticipantRow = (rowIndex: number, key: string, value: any) => {
    setParticipantRows((prev) => {
      const next = [...prev];
      const row = { ...next[rowIndex] };
      if (key === "username" && !row.isNew) return prev;
      row[key] = value;
      next[rowIndex] = row;
      return next;
    });
  };

  const updateEventRow = (rowIndex: number, key: string, value: any) => {
    setEventRows((prev) => {
      const next = prev.map((row) => ({ ...row }));
      if (key === "isActive" && value === true) {
        next.forEach((row) => { row.isActive = false; });
      }
      next[rowIndex][key] = value;
      return next;
    });
  };

  const addParticipantRow = () => {
    setParticipantRows((prev) => [
      ...prev,
      { id: null, username: "", displayName: "", isActive: true, password: "", isNew: true }
    ]);
  };

  const addEventRow = () => {
    setEventRows((prev) => [
      ...prev,
      { id: null, name: "", year: new Date().getFullYear(), status: "draft", isActive: prev.length === 0, isNew: true }
    ]);
  };

  const saveParticipants = async () => {
    for (const participant of participantRows) {
      if (participant.isNew) {
        if (!participant.username || !participant.displayName || !participant.password) {
          setMessage("Neue Teilnehmer benötigen Benutzername, Anzeigename und Passwort.");
          return;
        }
        await api.adminCreateParticipant({
          username: participant.username,
          password: participant.password,
          displayName: participant.displayName
        });
      } else {
        await api.adminUpdateParticipant(participant.id, {
          displayName: participant.displayName,
          isActive: Boolean(participant.isActive)
        });
        if (participant.password) {
          await api.adminResetPassword(participant.id, participant.password);
        }
      }
    }
    setMessage("Teilnehmer gespeichert");
    await load();
  };

  const saveEvents = async () => {
    for (const event of eventRows) {
      if (event.isNew) {
        await api.adminCreateEvent({
          name: event.name || "ESC Finale",
          year: Number(event.year) || new Date().getFullYear(),
          status: event.status || "draft",
          isActive: Boolean(event.isActive)
        });
      } else {
        await api.adminUpdateEvent(event.id, {
          name: event.name,
          year: Number(event.year) || new Date().getFullYear(),
          status: event.status,
          isActive: Boolean(event.isActive)
        });
      }
    }
    setMessage("Events gespeichert");
    await load();
  };

  const deleteParticipant = async (participantId: number) => {
    await api.adminDeleteParticipant(participantId);
    await load();
  };

  const approveParticipant = async (participantId: number) => {
    const participant = pendingParticipants.find(p => p.id === participantId);
    const name = participant?.displayName || participant?.username || "Teilnehmer";
    try {
      await api.adminApproveParticipant(participantId);
      setPendingParticipants(prev => prev.filter(p => p.id !== participantId));
      setMessage(`Teilnehmer ${name} freigeschaltet`);
      await load(); // Teilnehmerliste neu laden, damit freigeschalteter Benutzer erscheint
    } catch (err) {
      setMessage(`Fehler beim Freischalten: ${(err as Error).message}`);
    }
  };

  const rejectParticipant = async (participantId: number) => {
    const participant = pendingParticipants.find(p => p.id === participantId);
    const name = participant?.displayName || participant?.username || "Teilnehmer";
    if (confirm("Möchten Sie diese Registrierung wirklich ablehnen und löschen?")) {
      try {
        await api.adminDeleteParticipant(participantId);
        setPendingParticipants(prev => prev.filter(p => p.id !== participantId));
        setMessage(`Teilnehmer ${name} abgelehnt`);
      } catch (err) {
        setMessage(`Fehler beim Ablehnen: ${(err as Error).message}`);
      }
    }
  };

  const softDeleteEvent = async (eventId: number) => {
    await api.adminSoftDeleteEvent(eventId);
    setMessage("Event als gelöscht markiert");
    await load();
  };

  const restoreEvent = async (eventId: number) => {
    await api.adminRestoreEvent(eventId);
    setMessage("Event wiederhergestellt");
    await load();
  };

  const saveLiveSettings = async () => {
    if (!activeEventForStatus?.id) return;

    const revealParticipantPauseSeconds = Number(participantPauseSecondsInput);
    const revealPointPauseSeconds = Number(pointPauseSecondsInput);
    const tipEndCountdownSeconds = Number(tipEndCountdownSecondsInput);

    if (
      !Number.isFinite(revealParticipantPauseSeconds) ||
      !Number.isFinite(revealPointPauseSeconds) ||
      !Number.isFinite(tipEndCountdownSeconds)
    ) {
      setMessage("Bitte gültige Sekundenwerte eintragen.");
      return;
    }

    setLiveSettingsSaving(true);
    try {
      await api.adminUpdateLiveSettings(activeEventForStatus.id, {
        revealParticipantPauseSeconds: Math.max(0, Math.floor(revealParticipantPauseSeconds)),
        revealPointPauseSeconds: Math.max(0, Math.floor(revealPointPauseSeconds)),
        tipEndCountdownSeconds: Math.max(0, Math.floor(tipEndCountdownSeconds))
      });
      setMessage("Live-Einstellungen gespeichert");
      await load();
    } catch (err) {
      setMessage(`Fehler beim Speichern der Live-Einstellungen: ${(err as Error).message}`);
    } finally {
      setLiveSettingsSaving(false);
    }
  };

  const triggerTipEnd = async () => {
    if (!activeEventForStatus?.id) return;
    try {
      await api.adminStartTipEnd(activeEventForStatus.id);
      setMessage("Tippende-Countdown gestartet");
      await load();
    } catch (err) {
      setMessage(`Tippende konnte nicht gestartet werden: ${(err as Error).message}`);
    }
  };

  const cancelManualTipEnd = async () => {
    if (!activeEventForStatus?.id) return;
    try {
      await api.adminCancelTipEnd(activeEventForStatus.id);
      setMessage("Manueller Tippende-Countdown zurückgenommen");
      await load();
    } catch (err) {
      setMessage(`Tippende-Rücknahme fehlgeschlagen: ${(err as Error).message}`);
    }
  };

  const triggerReveal = async () => {
    if (!activeEventForStatus?.id) return;
    try {
      await api.adminStartReveal(activeEventForStatus.id);
      setMessage("Reveal gestartet");
      await load();
    } catch (err) {
      setMessage(`Reveal konnte nicht gestartet werden: ${(err as Error).message}`);
    }
  };

  const isParticipantOpenForActiveEvent = (participantId: number) => {
    const status = submissionStatusByParticipant[participantId] || { ratingSubmitted: false, predictionSubmitted: false };
    return !status.ratingSubmitted || !status.predictionSubmitted;
  };

  const visibleParticipantRows = showOnlyOpenParticipants
    ? participantRows.filter((participant: any) => {
        if (!activeEventForStatus) return true;
        if (!participant?.id) return true;
        return isParticipantOpenForActiveEvent(Number(participant.id));
      })
    : participantRows;

  const openParticipantsCount = participantRows.filter((participant: any) => {
    if (!participant?.id || !activeEventForStatus) return false;
    return isParticipantOpenForActiveEvent(Number(participant.id));
  }).length;

  const liveCountdownHint =
    liveControl?.liveState.tipEndState === "countdown"
      ? `${liveControl.countdownRemainingSeconds}s`
      : "—";

  return (
    <div className="shell shell--admin">
      <div className="topbar topbar--admin">
        <strong>ESCAPP Verwaltung</strong>
        <span>{user.displayName}</span>
        <button className="btn btn-plain btn-plain--on-dark" onClick={() => void handleLogout()}>Logout</button>
      </div>

      <div className="layout">
        {/* Ausstehende Freischaltungen */}
        {pendingParticipants.length > 0 && (
          <div className="card" style={{ borderLeft: "4px solid #ff6b35" }}>
            <h3>Ausstehende Freischaltungen ({pendingParticipants.length})</h3>
            <p style={{ marginBottom: "1rem", color: "#666" }}>
              Neue Teilnehmer müssen freigeschaltet werden, bevor sie sich anmelden können.
            </p>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Benutzername</th>
                  <th>Anzeigename</th>
                  <th>Vollständiger Name</th>
                  <th>Registriert am</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {pendingParticipants.map((participant: any) => (
                  <tr key={participant.id}>
                    <td>{participant.username}</td>
                    <td>{participant.displayName}</td>
                    <td>{participant.fullName || "—"}</td>
                    <td>{new Date(participant.createdAt).toLocaleString("de-DE")}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => void approveParticipant(participant.id)}
                        >
                          Freischalten
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => void rejectParticipant(participant.id)}
                        >
                          Ablehnen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Teilnehmer Verwaltung */}
        <div className="card">
          <h3>Teilnehmer Verwaltung</h3>
          <p style={{ marginTop: "-0.4rem", marginBottom: "0.8rem", color: "#666", fontSize: "0.9rem" }}>
            Status bezieht sich auf aktives Event: {activeEventForStatus ? `${activeEventForStatus.name} (#${activeEventForStatus.id})` : "kein aktives Event"}
          </p>
          {activeEventForStatus && (
            <div style={{ display: "grid", gap: "0.75rem", marginBottom: "0.9rem", border: "1px solid #dce3ea", borderRadius: "10px", padding: "0.8rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
                <button
                  className="btn"
                  onClick={() => void triggerTipEnd()}
                  disabled={!liveControl?.canStartTipEnd || liveControlLoading}
                >
                  Tippende
                </button>
                <button
                  className="btn"
                  onClick={() => void cancelManualTipEnd()}
                  disabled={!liveControl?.canCancelTipEnd || liveControlLoading}
                >
                  Tippende zurücknehmen
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => void triggerReveal()}
                  disabled={!liveControl?.canStartReveal || liveControlLoading}
                >
                  Reveal starten
                </button>
                <span style={{ color: "#666", fontSize: "0.88rem" }}>
                  Tippende: <strong>{liveControl?.liveState.tipEndState || "—"}</strong>
                  {liveControl?.liveState.tipEndState === "countdown" && ` · Rest: ${liveCountdownHint}`}
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-end" }}>
                <label className="form-field" style={{ margin: 0 }}>
                  <span className="form-label">Pause zwischen Teilnehmern (Sek.)</span>
                  <input
                    className="form-input"
                    type="number"
                    min={0}
                    value={participantPauseSecondsInput}
                    onChange={(e) => setParticipantPauseSecondsInput(e.target.value)}
                    style={{ width: "11rem" }}
                  />
                </label>
                <label className="form-field" style={{ margin: 0 }}>
                  <span className="form-label">Pause zwischen Punktwerten (Sek.)</span>
                  <input
                    className="form-input"
                    type="number"
                    min={0}
                    value={pointPauseSecondsInput}
                    onChange={(e) => setPointPauseSecondsInput(e.target.value)}
                    style={{ width: "11rem" }}
                  />
                </label>
                <label className="form-field" style={{ margin: 0 }}>
                  <span className="form-label">Tippende-Countdown (Sek.)</span>
                  <input
                    className="form-input"
                    type="number"
                    min={0}
                    value={tipEndCountdownSecondsInput}
                    onChange={(e) => setTipEndCountdownSecondsInput(e.target.value)}
                    style={{ width: "11rem" }}
                  />
                </label>
                <button className="btn" onClick={() => void saveLiveSettings()} disabled={liveSettingsSaving || liveControlLoading}>
                  {liveSettingsSaving ? "Speichert…" : "Live-Einstellungen speichern"}
                </button>
              </div>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "0.8rem", flexWrap: "wrap" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "#333", fontSize: "0.92rem" }}>
              <input
                type="checkbox"
                checked={showOnlyOpenParticipants}
                onChange={(e) => setShowOnlyOpenParticipants(e.target.checked)}
              />
              Nur offene Teilnehmer anzeigen
            </label>
            {activeEventForStatus && (
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                Offen: <strong>{openParticipantsCount}</strong> von <strong>{participantRows.filter((p: any) => p?.id).length}</strong>
              </span>
            )}
          </div>
          <DataTable
            columns={[
              { key: "username", label: "Benutzername", editable: true },
              { key: "displayName", label: "Anzeigename", editable: true },
              {
                key: "ratingSubmitted",
                label: "Bewertung abgegeben",
                render: (row: any) => {
                  if (!row?.id || !activeEventForStatus) return "—";
                  return submissionStatusByParticipant[row.id]?.ratingSubmitted ? "✅ Ja" : "❌ Nein";
                }
              },
              {
                key: "predictionSubmitted",
                label: "Tipp abgegeben",
                render: (row: any) => {
                  if (!row?.id || !activeEventForStatus) return "—";
                  return submissionStatusByParticipant[row.id]?.predictionSubmitted ? "✅ Ja" : "❌ Nein";
                }
              },
              { key: "isActive", label: "Aktiv", editable: true, type: "checkbox" },
              { key: "password", label: "Passwort (neu/Reset)", editable: true, type: "password" },
              {
                key: "actions",
                label: "Aktionen",
                render: (row: any) =>
                  row.id ? (
                    <button className="btn btn-danger btn-sm" onClick={() => void deleteParticipant(row.id)}>
                      Löschen
                    </button>
                  ) : ""
              }
            ]}
            data={visibleParticipantRows}
            onChange={updateParticipantRow}
          />
          <div className="admin-actions">
            <button className="btn" onClick={addParticipantRow}>Zeile hinzufügen</button>
            <button className="btn btn-primary" onClick={() => void saveParticipants()}>Teilnehmer speichern</button>
          </div>
        </div>

        {/* Event Verwaltung */}
        <div className="card">
          <h3>Event Verwaltung</h3>
          <DataTable
            columns={[
              { key: "name", label: "Event Name", editable: true },
              { key: "year", label: "Jahr", editable: true },
              {
                key: "status",
                label: "Status",
                editable: true,
                type: "select",
                options: [
                  { value: "draft", label: "Entwurf" },
                  { value: "open", label: "Offen" },
                  { value: "locked", label: "Gesperrt" },
                  { value: "finished", label: "Beendet" }
                ]
              },
              { key: "isActive", label: "Aktiv", editable: true, type: "checkbox" },
              {
                key: "actions",
                label: "Aktionen",
                render: (row: any) =>
                  row.id ? (
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {row.status === "finished" && (
                        <button className="btn btn-sm" onClick={() => navigate(`/verwaltung/ergebnis/${row.id}`)}>
                          Ergebnis
                        </button>
                      )}
                      {row.deletedAt ? (
                        <button className="btn btn-sm" onClick={() => void restoreEvent(row.id)}>
                          Wiederherstellen
                        </button>
                      ) : (
                        <button className="btn btn-danger btn-sm" onClick={() => void softDeleteEvent(row.id)}>
                          Löschen
                        </button>
                      )}
                    </div>
                  ) : ""
              }
            ]}
            data={eventRows}
            onChange={updateEventRow}
            rowClassName={(row: any) => row.deletedAt ? "row--deleted" : ""}
          />
          <div className="admin-actions">
            <button className="btn" onClick={addEventRow}>Zeile hinzufügen</button>
            <button className="btn btn-primary" onClick={() => void saveEvents()}>Events speichern</button>
          </div>

        </div>

        <div className="card">
          <h3>Anthropic KI-Konfiguration</h3>
          <p style={{ marginTop: "-0.4rem", marginBottom: "0.8rem", color: "#666", fontSize: "0.92rem" }}>
            API-Key und Modell werden global für die Fotoerkennung der offiziellen Finalrangliste verwendet.
          </p>
          <div style={{ display: "grid", gap: "12px", maxWidth: "760px" }}>
            <label style={{ display: "grid", gap: "6px" }}>
              <span>Anthropic API-Key</span>
              <input
                type="text"
                value={anthropicApiKey}
                onChange={(e) => setAnthropicApiKey(e.target.value)}
                placeholder="sk-ant-..."
                disabled={anthropicSaving}
              />
            </label>

            <label style={{ display: "grid", gap: "6px" }}>
              <span>Claude-Modell</span>
              <select
                value={anthropicModel}
                onChange={(e) => setAnthropicModel(e.target.value)}
                disabled={anthropicSaving || anthropicLoading || anthropicModels.length === 0}
              >
                {anthropicModels.length === 0 && <option value="">Keine Modelle geladen</option>}
                {anthropicModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.displayName} ({model.id})
                  </option>
                ))}
              </select>
            </label>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <button className="btn btn-primary" onClick={() => void saveAnthropicConfig()} disabled={anthropicSaving}>
                {anthropicSaving ? "Speichert…" : "Konfiguration speichern"}
              </button>
              <button className="btn" onClick={() => void refreshAnthropicModels()} disabled={anthropicLoading || anthropicSaving}>
                {anthropicLoading ? "Lädt Modelle…" : "Modelle neu laden"}
              </button>
              <button className="btn btn-danger" onClick={() => void deleteAnthropicConfig()} disabled={anthropicSaving}>
                Konfiguration löschen
              </button>
            </div>

            <span style={{ color: "#666", fontSize: "0.88rem" }}>
              Verfügbare Modelle: <strong>{anthropicModels.length}</strong>
            </span>
          </div>
        </div>

        {/* ESC API Import */}
        <EscImport onImported={load} />

        {/* Event-Daten verwalten */}
        {eventRows.length > 0 && <AdminEventManager events={eventRows} onSave={load} />}

        {message && <div className={`toast ${toastFading ? 'toast--fade-out' : ''}`}>{message}</div>}
      </div>
      <footer style={{ textAlign: "center", padding: "1.5rem 0 1rem", color: "var(--esc-color-blue-400, #888)", fontSize: "0.72rem", opacity: 0.7 }}>
        ESC-App &middot; Commit{" "}
        <a
          href={`https://github.com/tobiit/ESC-App/commit/${__GIT_COMMIT__}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit", fontFamily: "monospace" }}
        >
          {__GIT_COMMIT__}
        </a>
      </footer>
    </div>
  );
}
