import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, clearTokens } from "../api";
import { AdminEventManager } from "../components/AdminEventManager";
import { DataTable } from "../components/DataTable";
import { EscImport } from "../components/EscImport";
export function AdminPage({ user, onLogout }) {
    const [eventRows, setEventRows] = useState([]);
    const [participantRows, setParticipantRows] = useState([]);
    const [pendingParticipants, setPendingParticipants] = useState([]);
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
    const load = async () => {
        const [eventRowsResponse, participantRowsResponse, pendingResponse] = await Promise.all([
            api.adminEvents(),
            api.adminParticipants(),
            api.adminPendingParticipants()
        ]);
        setEventRows(eventRowsResponse.map((event) => ({ ...event, isNew: false })));
        setParticipantRows(participantRowsResponse.map((participant) => ({ ...participant, password: "", isNew: false })));
        setPendingParticipants(pendingResponse);
    };
    const handleLogout = async () => {
        try {
            await api.logout();
        }
        finally {
            clearTokens();
            onLogout();
            navigate("/verwaltung/login");
        }
    };
    const updateParticipantRow = (rowIndex, key, value) => {
        setParticipantRows((prev) => {
            const next = [...prev];
            const row = { ...next[rowIndex] };
            if (key === "username" && !row.isNew)
                return prev;
            row[key] = value;
            next[rowIndex] = row;
            return next;
        });
    };
    const updateEventRow = (rowIndex, key, value) => {
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
            }
            else {
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
            }
            else {
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
    const deleteParticipant = async (participantId) => {
        await api.adminDeleteParticipant(participantId);
        await load();
    };
    const approveParticipant = async (participantId) => {
        const participant = pendingParticipants.find(p => p.id === participantId);
        const name = participant?.displayName || participant?.username || "Teilnehmer";
        try {
            await api.adminApproveParticipant(participantId);
            setPendingParticipants(prev => prev.filter(p => p.id !== participantId));
            setMessage(`Teilnehmer ${name} freigeschaltet`);
        }
        catch (err) {
            setMessage(`Fehler beim Freischalten: ${err.message}`);
        }
    };
    const rejectParticipant = async (participantId) => {
        const participant = pendingParticipants.find(p => p.id === participantId);
        const name = participant?.displayName || participant?.username || "Teilnehmer";
        if (confirm("Möchten Sie diese Registrierung wirklich ablehnen und löschen?")) {
            try {
                await api.adminDeleteParticipant(participantId);
                setPendingParticipants(prev => prev.filter(p => p.id !== participantId));
                setMessage(`Teilnehmer ${name} abgelehnt`);
            }
            catch (err) {
                setMessage(`Fehler beim Ablehnen: ${err.message}`);
            }
        }
    };
    const softDeleteEvent = async (eventId) => {
        await api.adminSoftDeleteEvent(eventId);
        setMessage("Event als gelöscht markiert");
        await load();
    };
    const restoreEvent = async (eventId) => {
        await api.adminRestoreEvent(eventId);
        setMessage("Event wiederhergestellt");
        await load();
    };
    return (_jsxs("div", { className: "shell shell--admin", children: [_jsxs("div", { className: "topbar topbar--admin", children: [_jsx("strong", { children: "ESCAPP Verwaltung" }), _jsx("span", { children: user.displayName }), _jsx("button", { className: "btn btn-plain btn-plain--on-dark", onClick: () => void handleLogout(), children: "Logout" })] }), _jsxs("div", { className: "layout", children: [pendingParticipants.length > 0 && (_jsxs("div", { className: "card", style: { borderLeft: "4px solid #ff6b35" }, children: [_jsxs("h3", { children: ["Ausstehende Freischaltungen (", pendingParticipants.length, ")"] }), _jsx("p", { style: { marginBottom: "1rem", color: "#666" }, children: "Neue Teilnehmer m\u00FCssen freigeschaltet werden, bevor sie sich anmelden k\u00F6nnen." }), _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Benutzername" }), _jsx("th", { children: "Anzeigename" }), _jsx("th", { children: "Vollst\u00E4ndiger Name" }), _jsx("th", { children: "Registriert am" }), _jsx("th", { children: "Aktionen" })] }) }), _jsx("tbody", { children: pendingParticipants.map((participant) => (_jsxs("tr", { children: [_jsx("td", { children: participant.username }), _jsx("td", { children: participant.displayName }), _jsx("td", { children: participant.fullName || "—" }), _jsx("td", { children: new Date(participant.createdAt).toLocaleString("de-DE") }), _jsx("td", { children: _jsxs("div", { style: { display: "flex", gap: "8px" }, children: [_jsx("button", { className: "btn btn-success btn-sm", onClick: () => void approveParticipant(participant.id), children: "Freischalten" }), _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => void rejectParticipant(participant.id), children: "Ablehnen" })] }) })] }, participant.id))) })] })] })), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "Teilnehmer Verwaltung" }), _jsx(DataTable, { columns: [
                                    { key: "username", label: "Benutzername", editable: true },
                                    { key: "displayName", label: "Anzeigename", editable: true },
                                    { key: "isActive", label: "Aktiv", editable: true, type: "checkbox" },
                                    { key: "password", label: "Passwort (neu/Reset)", editable: true, type: "password" },
                                    {
                                        key: "actions",
                                        label: "Aktionen",
                                        render: (row) => row.id ? (_jsx("button", { className: "btn btn-danger btn-sm", onClick: () => void deleteParticipant(row.id), children: "L\u00F6schen" })) : ""
                                    }
                                ], data: participantRows, onChange: updateParticipantRow }), _jsxs("div", { className: "admin-actions", children: [_jsx("button", { className: "btn", onClick: addParticipantRow, children: "Zeile hinzuf\u00FCgen" }), _jsx("button", { className: "btn btn-primary", onClick: () => void saveParticipants(), children: "Teilnehmer speichern" })] })] }), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "Event Verwaltung" }), _jsx(DataTable, { columns: [
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
                                        render: (row) => row.id ? (_jsxs("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: [row.status === "finished" && (_jsx("button", { className: "btn btn-sm", onClick: () => navigate(`/verwaltung/ergebnis/${row.id}`), children: "Ergebnis" })), row.deletedAt ? (_jsx("button", { className: "btn btn-sm", onClick: () => void restoreEvent(row.id), children: "Wiederherstellen" })) : (_jsx("button", { className: "btn btn-danger btn-sm", onClick: () => void softDeleteEvent(row.id), children: "L\u00F6schen" }))] })) : ""
                                    }
                                ], data: eventRows, onChange: updateEventRow, rowClassName: (row) => row.deletedAt ? "row--deleted" : "" }), _jsxs("div", { className: "admin-actions", children: [_jsx("button", { className: "btn", onClick: addEventRow, children: "Zeile hinzuf\u00FCgen" }), _jsx("button", { className: "btn btn-primary", onClick: () => void saveEvents(), children: "Events speichern" })] })] }), _jsx(EscImport, { onImported: load }), eventRows.length > 0 && _jsx(AdminEventManager, { events: eventRows, onSave: load }), message && _jsx("div", { className: `toast ${toastFading ? 'toast--fade-out' : ''}`, children: message })] })] }));
}
