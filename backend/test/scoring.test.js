import { describe, expect, it } from "vitest";
import { buildParticipantRanking, buildRatingsReferenceRanking, getThird, scorePrediction } from "../src/services/scoring.js";

describe("scoring service", () => {
  it("berechnet Drittel deterministisch", () => {
    expect(getThird(1, 26)).toBe("top");
    expect(getThird(9, 26)).toBe("top");
    expect(getThird(10, 26)).toBe("middle");
    expect(getThird(18, 26)).toBe("middle");
    expect(getThird(19, 26)).toBe("bottom");
  });

  it("bewertet Prediction korrekt", () => {
    expect(scorePrediction(1, 1, 10).points).toBe(3);
    expect(scorePrediction(2, 1, 10).points).toBe(2);
    expect(scorePrediction(3, 1, 10).points).toBe(1);
    expect(scorePrediction(10, 1, 10).points).toBe(0);
  });

  it("löst Tie-Break bei Entry Ranking auf", () => {
    const entries = [
      { id: 1, country_name: "Alpha" },
      { id: 2, country_name: "Bravo" },
      { id: 3, country_name: "Charlie" }
    ];
    const items = [
      { entry_id: 1, points: 12 },
      { entry_id: 2, points: 12 },
      { entry_id: 2, points: 10 },
      { entry_id: 1, points: 10 }
    ];
    const ranking = buildRatingsReferenceRanking(entries, items);
    expect(ranking[0].countryName).toBe("Alpha");
  });

  it("löst Participant Tie-Break Reihenfolge auf", () => {
    const entries = [
      { id: 1, country_name: "A" },
      { id: 2, country_name: "B" },
      { id: 3, country_name: "C" }
    ];
    const reference = [
      { entryId: 1, rank: 1 },
      { entryId: 2, rank: 2 },
      { entryId: 3, rank: 3 }
    ];
    const participants = [
      {
        participant_id: 10,
        display_name: "Anna",
        items: [
          { entry_id: 1, rank_position: 1 },
          { entry_id: 2, rank_position: 2 },
          { entry_id: 3, rank_position: 3 }
        ]
      },
      {
        participant_id: 11,
        display_name: "Berta",
        items: [
          { entry_id: 1, rank_position: 2 },
          { entry_id: 2, rank_position: 1 },
          { entry_id: 3, rank_position: 3 }
        ]
      }
    ];
    const leaderboard = buildParticipantRanking(participants, reference, entries);
    expect(leaderboard[0].displayName).toBe("Anna");
    expect(leaderboard[1].displayName).toBe("Berta");
  });
});
