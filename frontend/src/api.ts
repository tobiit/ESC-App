export type AuthPayload = {
  accessToken: string;
  refreshToken: string;
  user: { id: number; role: "admin" | "participant"; username: string; displayName: string };
};

export type AnthropicIntegrationPayload = {
  apiKey: string;
  model: string;
  configured: boolean;
  updatedAt?: string | null;
  updatedByUserId?: number | null;
};

export type AnthropicModelPayload = {
  id: string;
  displayName: string;
  createdAt?: string | null;
};

export type PublicLiveParticipantPayload = {
  participantId: number;
  displayName: string;
  ratingSubmitted: boolean;
  predictionSubmitted: boolean;
};

export type PublicLiveRankingPayload = {
  entryId: number;
  rank: number;
  countryCode: string;
  artistName: string;
  songTitle: string;
  votes: number;
  points: number;
};

export type PublicLiveDashboardPayload = {
  event: { id: number; name: string; year?: number; status: string; isActive: boolean };
  phase: "collecting" | "tip_end_countdown" | "post_tip_end_pre_reveal" | "revealing" | "finished";
  submission: { totalParticipants: number; fullySubmitted: number; allSubmitted: boolean };
  liveState: {
    eventId: number;
    tipEndState: "open" | "countdown" | "reached";
    tipEndSource: "admin" | "auto_all_submitted" | null;
    tipEndCountdownStartedAt: string | null;
    tipEndCountdownSeconds: number;
    tipEndReachedAt: string | null;
    revealState: "idle" | "running" | "finished";
    revealStartedAt: string | null;
    revealFinishedAt: string | null;
    revealPointPauseSeconds: number;
    revealParticipantPauseSeconds: number;
    winnerEntryId: number | null;
    winnerReason: "points" | "most_12s" | "random_tiebreak" | null;
    winnerTiebreakSeed: string | null;
    winnerResolvedAt: string | null;
    updatedAt: string | null;
  };
  countdownRemainingSeconds: number;
  participants: PublicLiveParticipantPayload[];
  localRanking: PublicLiveRankingPayload[];
  reveal: {
    state: "idle" | "running" | "finished";
    activeParticipantId: number | null;
    activeParticipantName: string | null;
    currentStepIndex: number;
    totalSteps: number;
    currentAnnouncement: string | null;
    winner: {
      entryId: number;
      artistName: string;
      songTitle: string;
      countryCode: string;
      reason: "points" | "most_12s" | "random_tiebreak" | null;
    } | null;
  };
  updatedAt: string;
};

export type AdminLiveControlPayload = {
  event: { id: number; name: string; status: string; isActive: boolean; deletedAt?: string | null };
  liveState: PublicLiveDashboardPayload["liveState"];
  submission: PublicLiveDashboardPayload["submission"];
  countdownRemainingSeconds: number;
  canStartTipEnd: boolean;
  canCancelTipEnd: boolean;
  canStartReveal: boolean;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

let accessToken: string | null = localStorage.getItem("esc_access_token");
let refreshToken: string | null = localStorage.getItem("esc_refresh_token");

export const setTokens = (payload: { accessToken: string; refreshToken?: string }) => {
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

async function request(path: string, options: RequestInit = {}, allowRetry = true) {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

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
  login: (username: string, password: string, admin: boolean) =>
    request(admin ? "/auth/admin/login" : "/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    }) as Promise<AuthPayload>,
  register: (payload: { displayName: string; fullName: string; username: string; password: string; acceptedTerms: boolean }) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }) as Promise<{ message: string }>,
  logout: () =>
    request("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken })
    }),
  getPublicLiveDashboard: () => request("/events/public/live") as Promise<PublicLiveDashboardPayload>,
  getActiveEvent: async () => {
    try { return await request("/events/active"); }
    catch { return null; }
  },
  getEntries: (eventId: number) => request(`/events/${eventId}/entries`),
  getMyRating: (eventId: number) => request(`/events/${eventId}/ratings/me`),
  saveMyRating: (eventId: number, items: Array<{ entryId: number; points: number }>) =>
    request(`/events/${eventId}/ratings/me`, { method: "PUT", body: JSON.stringify({ items }) }),
  submitMyRating: (eventId: number) => request(`/events/${eventId}/ratings/me/submit`, { method: "POST" }),
  getMyPrediction: (eventId: number) => request(`/events/${eventId}/predictions/me`),
  saveMyPrediction: (eventId: number, items: Array<{ entryId: number; rank: number }>) =>
    request(`/events/${eventId}/predictions/me`, { method: "PUT", body: JSON.stringify({ items }) }),
  submitMyPrediction: (eventId: number) =>
    request(`/events/${eventId}/predictions/me/submit`, { method: "POST" }),
  getResults: (eventId: number) => request(`/events/${eventId}/results`),
  adminParticipants: () => request("/admin/participants"),
  adminPendingParticipants: () => request("/admin/participants/pending"),
  adminApproveParticipant: (id: number) => request(`/admin/participants/${id}/approve`, { method: "POST" }),
  adminCreateParticipant: (payload: { username: string; password: string; displayName: string }) =>
    request("/admin/participants", { method: "POST", body: JSON.stringify(payload) }),
  adminUpdateParticipant: (id: number, payload: { displayName: string; isActive: boolean }) =>
    request(`/admin/participants/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  adminResetPassword: (id: number, password: string) =>
    request(`/admin/participants/${id}/reset-password`, { method: "POST", body: JSON.stringify({ password }) }),
  adminDeleteParticipant: (id: number) => request(`/admin/participants/${id}`, { method: "DELETE" }),
  adminAnthropicConfig: () => request("/admin/integrations/anthropic") as Promise<AnthropicIntegrationPayload>,
  adminSaveAnthropicConfig: (payload: { apiKey: string; model?: string | null }) =>
    request("/admin/integrations/anthropic", { method: "PUT", body: JSON.stringify(payload) }) as Promise<{ ok: boolean; configured: boolean; model: string | null }>,
  adminDeleteAnthropicConfig: () => request("/admin/integrations/anthropic", { method: "DELETE" }) as Promise<{ ok: boolean }>,
  adminAnthropicModels: () =>
    request("/admin/integrations/anthropic/models") as Promise<{ models: AnthropicModelPayload[]; count: number }>,
  adminEvents: () => request("/admin/events"),
  adminCreateEvent: (payload: { name: string; year?: number; status: string; isActive: boolean }) =>
    request("/admin/events", { method: "POST", body: JSON.stringify(payload) }),
  adminUpdateEvent: (id: number, payload: { name: string; year?: number; status: string; isActive: boolean }) =>
    request(`/admin/events/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  adminEntries: (eventId: number) => request(`/admin/events/${eventId}/entries`),
  adminAddEntry: (eventId: number, payload: { countryCode: string; songTitle?: string; artistName?: string; sortOrder: number }) =>
    request(`/admin/events/${eventId}/entries`, { method: "POST", body: JSON.stringify(payload) }),
  adminUpdateEntry: (entryId: number, payload: { countryCode: string; songTitle?: string; artistName?: string; sortOrder: number }) =>
    request(`/admin/entries/${entryId}`, { method: "PUT", body: JSON.stringify(payload) }),
  adminDeleteEntry: (entryId: number) => request(`/admin/entries/${entryId}`, { method: "DELETE" }),
  adminOfficialResult: (eventId: number) => request(`/admin/events/${eventId}/officialresult`),
  adminSaveOfficialResult: (eventId: number, items: Array<{ entryId: number; rank: number }>) =>
    request(`/admin/events/${eventId}/officialresult`, { method: "PUT", body: JSON.stringify({ items }) }),
  adminRatings: (eventId: number) => request(`/admin/events/${eventId}/ratings`),
  adminPredictions: (eventId: number) => request(`/admin/events/${eventId}/predictions`),
  adminResetRating: (eventId: number, participantId: number) =>
    request(`/admin/events/${eventId}/ratings/${participantId}/reset`, { method: "POST" }),
  adminResetPrediction: (eventId: number, participantId: number) =>
    request(`/admin/events/${eventId}/predictions/${participantId}/reset`, { method: "POST" }),
  // Bulk Upload APIs
  adminBulkUploadEntries: (eventId: number, entries: Array<{ country: string; song: string; artist: string }>) =>
    request(`/admin/events/${eventId}/entries/bulk`, { method: "POST", body: JSON.stringify({ entries }) }),
  adminBulkUploadParticipants: (participants: Array<{ username: string; display_name: string; email?: string }>) =>
    request("/admin/participants/bulk", { method: "POST", body: JSON.stringify({ participants }) }),
  adminBulkUploadRankings: (eventId: number, rankings: Array<{ username: string; country: string; rank: string }>) =>
    request(`/admin/events/${eventId}/predictions/bulk`, { method: "POST", body: JSON.stringify({ rankings }) }),
  adminBulkUploadRatings: (eventId: number, ratings: Array<{ username: string; country: string; points: string }>) =>
    request(`/admin/events/${eventId}/ratings/bulk`, { method: "POST", body: JSON.stringify({ ratings }) }),
  adminBulkUploadOfficialResults: (eventId: number, results: Array<{ country: string; rank: string }>) =>
    request(`/admin/events/${eventId}/officialresult/bulk`, { method: "POST", body: JSON.stringify({ results }) }),
  adminPhotoExtractOfficialResults: (eventId: number, imageFile: File): Promise<{ results: Array<{ rank: string; country: string }>; count: number; model: string }> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const imageBase64 = e.target?.result as string;
          const mimeType = imageFile.type || "image/jpeg";
          const data = await request(`/admin/events/${eventId}/officialresult/photo-extract`, {
            method: "POST",
            body: JSON.stringify({ imageBase64, mimeType })
          });
          resolve(data as { results: Array<{ rank: string; country: string }>; count: number; model: string });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("Bilddatei konnte nicht gelesen werden"));
      reader.readAsDataURL(imageFile);
    }),
  // Soft-delete events
  adminSoftDeleteEvent: (eventId: number) =>
    request(`/admin/events/${eventId}/soft-delete`, { method: "POST" }),
  adminRestoreEvent: (eventId: number) =>
    request(`/admin/events/${eventId}/restore`, { method: "POST" }),
  // ESC API Import
  adminEscImportPreview: (year: number) =>
    request(`/admin/esc-import/preview/${year}`),
  adminEscImport: (year: number, setActive?: boolean) =>
    request("/admin/esc-import", { method: "POST", body: JSON.stringify({ year, setActive }) })
  ,
  adminLiveControl: (eventId: number) =>
    request(`/admin/events/${eventId}/live-control`) as Promise<AdminLiveControlPayload>,
  adminUpdateLiveSettings: (
    eventId: number,
    payload: { revealParticipantPauseSeconds: number; revealPointPauseSeconds: number; tipEndCountdownSeconds: number }
  ) => request(`/admin/events/${eventId}/live-control/settings`, { method: "PUT", body: JSON.stringify(payload) }),
  adminStartTipEnd: (eventId: number) =>
    request(`/admin/events/${eventId}/live-control/tip-end/start`, { method: "POST" }),
  adminCancelTipEnd: (eventId: number) =>
    request(`/admin/events/${eventId}/live-control/tip-end/cancel`, { method: "POST" }),
  adminStartReveal: (eventId: number) =>
    request(`/admin/events/${eventId}/live-control/reveal/start`, { method: "POST" })
};
