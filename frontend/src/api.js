const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
let accessToken = localStorage.getItem("esc_access_token");
let refreshToken = localStorage.getItem("esc_refresh_token");
export const setTokens = (payload) => {
    accessToken = payload.accessToken;
    localStorage.setItem("esc_access_token", payload.accessToken);
    if (payload.refreshToken) {
        refreshToken = payload.refreshToken;
        localStorage.setItem("esc_refresh_token", payload.refreshToken);
    }
};
export const clearTokens = () => {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem("esc_access_token");
    localStorage.removeItem("esc_refresh_token");
    localStorage.removeItem("esc_user");
};
async function request(path, options = {}, allowRetry = true) {
    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", "application/json");
    if (accessToken)
        headers.set("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${API_URL}${path}`, { ...options, headers });
    if (response.status === 401 && allowRetry && refreshToken) {
        const refreshed = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken })
        });
        if (refreshed.ok) {
            const data = await refreshed.json();
            setTokens({ accessToken: data.accessToken });
            return request(path, options, false);
        }
        clearTokens();
    }
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: "Fehler" }));
        throw new Error(errorBody.message || "Fehler");
    }
    return response.json();
}
export const api = {
    login: (username, password, admin) => request(admin ? "/auth/admin/login" : "/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
    }),
    logout: () => request("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken })
    }),
    getActiveEvent: () => request("/events/active"),
    getEntries: (eventId) => request(`/events/${eventId}/entries`),
    getMyRating: (eventId) => request(`/events/${eventId}/ratings/me`),
    saveMyRating: (eventId, items) => request(`/events/${eventId}/ratings/me`, { method: "PUT", body: JSON.stringify({ items }) }),
    submitMyRating: (eventId) => request(`/events/${eventId}/ratings/me/submit`, { method: "POST" }),
    getMyPrediction: (eventId) => request(`/events/${eventId}/predictions/me`),
    saveMyPrediction: (eventId, items) => request(`/events/${eventId}/predictions/me`, { method: "PUT", body: JSON.stringify({ items }) }),
    submitMyPrediction: (eventId) => request(`/events/${eventId}/predictions/me/submit`, { method: "POST" }),
    getResults: (eventId) => request(`/events/${eventId}/results`),
    adminParticipants: () => request("/admin/participants"),
    adminCreateParticipant: (payload) => request("/admin/participants", { method: "POST", body: JSON.stringify(payload) }),
    adminUpdateParticipant: (id, payload) => request(`/admin/participants/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
    adminResetPassword: (id, password) => request(`/admin/participants/${id}/reset-password`, { method: "POST", body: JSON.stringify({ password }) }),
    adminDeleteParticipant: (id) => request(`/admin/participants/${id}`, { method: "DELETE" }),
    adminEvents: () => request("/admin/events"),
    adminCreateEvent: (payload) => request("/admin/events", { method: "POST", body: JSON.stringify(payload) }),
    adminUpdateEvent: (id, payload) => request(`/admin/events/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
    adminEntries: (eventId) => request(`/admin/events/${eventId}/entries`),
    adminAddEntry: (eventId, payload) => request(`/admin/events/${eventId}/entries`, { method: "POST", body: JSON.stringify(payload) }),
    adminUpdateEntry: (entryId, payload) => request(`/admin/entries/${entryId}`, { method: "PUT", body: JSON.stringify(payload) }),
    adminDeleteEntry: (entryId) => request(`/admin/entries/${entryId}`, { method: "DELETE" }),
    adminOfficialResult: (eventId) => request(`/admin/events/${eventId}/officialresult`),
    adminSaveOfficialResult: (eventId, items) => request(`/admin/events/${eventId}/officialresult`, { method: "PUT", body: JSON.stringify({ items }) }),
    adminRatings: (eventId) => request(`/admin/events/${eventId}/ratings`),
    adminPredictions: (eventId) => request(`/admin/events/${eventId}/predictions`),
    adminResetRating: (eventId, participantId) => request(`/admin/events/${eventId}/ratings/${participantId}/reset`, { method: "POST" }),
    adminResetPrediction: (eventId, participantId) => request(`/admin/events/${eventId}/predictions/${participantId}/reset`, { method: "POST" }),
    // Bulk Upload APIs
    adminBulkUploadEntries: (eventId, entries) => request(`/admin/events/${eventId}/entries/bulk`, { method: "POST", body: JSON.stringify({ entries }) }),
    adminBulkUploadParticipants: (participants) => request("/admin/participants/bulk", { method: "POST", body: JSON.stringify({ participants }) }),
    adminBulkUploadRankings: (eventId, rankings) => request(`/admin/events/${eventId}/predictions/bulk`, { method: "POST", body: JSON.stringify({ rankings }) }),
    adminBulkUploadRatings: (eventId, ratings) => request(`/admin/events/${eventId}/ratings/bulk`, { method: "POST", body: JSON.stringify({ ratings }) }),
    adminBulkUploadOfficialResults: (eventId, results) => request(`/admin/events/${eventId}/officialresult/bulk`, { method: "POST", body: JSON.stringify({ results }) }),
    // Soft-delete events
    adminSoftDeleteEvent: (eventId) => request(`/admin/events/${eventId}/soft-delete`, { method: "POST" }),
    adminRestoreEvent: (eventId) => request(`/admin/events/${eventId}/restore`, { method: "POST" }),
    // ESC API Import
    adminEscImportPreview: (year) => request(`/admin/esc-import/preview/${year}`),
    adminEscImport: (year, setActive) => request("/admin/esc-import", { method: "POST", body: JSON.stringify({ year, setActive }) })
};
