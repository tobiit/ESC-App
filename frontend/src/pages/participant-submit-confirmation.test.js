import { jsx as _jsx } from "react/jsx-runtime";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ParticipantPage } from "./ParticipantPage";
const { apiMock, clearTokensMock } = vi.hoisted(() => ({
    apiMock: {
        getActiveEvent: vi.fn(),
        getEntries: vi.fn(),
        getMyRating: vi.fn(),
        getMyPrediction: vi.fn(),
        saveMyRating: vi.fn(),
        submitMyRating: vi.fn(),
        saveMyPrediction: vi.fn(),
        submitMyPrediction: vi.fn(),
        getResults: vi.fn(),
        logout: vi.fn()
    },
    clearTokensMock: vi.fn()
}));
vi.mock("../api", () => ({
    api: apiMock,
    clearTokens: clearTokensMock
}));
describe("participant submit confirmation", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        apiMock.getActiveEvent.mockResolvedValue({ id: 1, name: "ESC 2026", status: "open" });
        apiMock.getEntries.mockResolvedValue([
            { id: 1, countryCode: "DE", songTitle: "Song A", artistName: "Artist A", sortOrder: 1 },
            { id: 2, countryCode: "SE", songTitle: "Song B", artistName: "Artist B", sortOrder: 2 }
        ]);
        apiMock.getMyRating.mockResolvedValue({ status: "draft", items: [] });
        apiMock.getMyPrediction.mockResolvedValue({ status: "draft", items: [] });
        apiMock.saveMyRating.mockResolvedValue({ ok: true });
        apiMock.submitMyRating.mockRejectedValue(new Error("Rating muß genau 10 Einträge haben"));
        apiMock.saveMyPrediction.mockResolvedValue({ ok: true });
        apiMock.submitMyPrediction.mockResolvedValue({ ok: true });
        apiMock.getResults.mockResolvedValue(null);
        apiMock.logout.mockResolvedValue({ ok: true });
    });
    it("schließt das Bestätigungs-Popover bei Klick auf Ja auch bei Submit-Fehler", async () => {
        render(_jsx(MemoryRouter, { children: _jsx(ParticipantPage, { user: { id: 11, role: "participant", username: "test1", displayName: "Test 1" }, onLogout: () => { } }) }));
        const openConfirmationButton = await screen.findByRole("button", { name: "Einreichen" });
        fireEvent.click(openConfirmationButton);
        expect(screen.getByRole("heading", { name: "Endgültig einreichen?" })).toBeTruthy();
        fireEvent.click(screen.getByRole("button", { name: "Ja" }));
        await waitFor(() => {
            expect(screen.queryByRole("heading", { name: "Endgültig einreichen?" })).toBeNull();
        });
        expect(await screen.findByText("Rating muß genau 10 Einträge haben")).toBeTruthy();
    });
});
