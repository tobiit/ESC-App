import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, clearTokens } from "../api";
import { AdminEventManager } from "../components/AdminEventManager.jsx";
import { DataTable } from "../components/DataTable.jsx";

type User = { id: number; role: "admin" | "participant"; username: string; displayName: string };

export function AdminPage({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [eventRows, setEventRows] = useState<any[]>([]);
  const [participantRows, setParticipantRows] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
      return;
    }
    void load();
  }, [user, navigate]);

  const load = async () => {
    const [eventRowsResponse, participantRowsResponse] = await Promise.all([api.adminEvents(), api.adminParticipants()]);
    setEventRows(
      eventRowsResponse.map((event: any) => ({ ...event, isNew: false }))
    );
    setParticipantRows(
      participantRowsResponse.map((participant: any) => ({ ...participant, password: "", isNew: false }))
    );
    const active = eventRowsResponse.find((event: any) => event.isActive) || eventRowsResponse[0];
    if (active) setSelectedEventId(active.id);
  };

  const handleLogout = async () => {
    try { await api.logout(); } finally { clearTokens(); onLogout(); navigate("/verwaltung/login"); }
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

  return (
    <div className="shell shell--admin">
      <div className="topbar topbar--admin">
        <strong>ESCAPP Verwaltung</strong>
        <span>{user.displayName}</span>
        <button className="btn btn-plain btn-plain--on-dark" onClick={() => void handleLogout()}>Logout</button>
      </div>

      <div className="layout">
        {/* Teilnehmer Verwaltung */}
        <div className="card">
          <h3>Teilnehmer Verwaltung</h3>
          <DataTable
            columns={[
              { key: "username", label: "Benutzername", editable: true },
              { key: "displayName", label: "Anzeigename", editable: true },
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
            data={participantRows}
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
                    row.deletedAt ? (
                      <button className="btn btn-sm" onClick={() => void restoreEvent(row.id)}>
                        Wiederherstellen
                      </button>
                    ) : (
                      <button className="btn btn-danger btn-sm" onClick={() => void softDeleteEvent(row.id)}>
                        Löschen
                      </button>
                    )
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
          <div className="form-field">
            <label className="form-label">Aktives Event auswählen</label>
            <select
              className="form-input"
              value={selectedEventId || ""}
              onChange={(event) => setSelectedEventId(Number(event.target.value))}
            >
              {eventRows.filter((e) => !e.deletedAt).map((event) => (
                <option key={event.id || event.name} value={event.id || ""}>
                  {event.name} ({event.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CSV Upload Bereich */}
        {selectedEventId && <AdminEventManager eventId={selectedEventId} onSave={load} />}

        {message && <div className="toast">{message}</div>}
      </div>
    </div>
  );
}
