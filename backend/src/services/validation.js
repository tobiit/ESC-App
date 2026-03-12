const allowedRatingPoints = new Set([1, 2, 3, 4, 5, 6, 7, 8, 10, 12]);

export const validateRatingItems = (items, allowedEntryIds) => {
  if (!Array.isArray(items) || items.length !== 10) {
    throw new Error("Rating muss genau 10 Einträge enthalten.");
  }
  const seenEntries = new Set();
  const seenPoints = new Set();
  for (const item of items) {
    const entryId = Number(item.entryId);
    const points = Number(item.points);
    if (!allowedEntryIds.has(entryId)) {
      throw new Error("Rating enthält ungültige Entries.");
    }
    if (!allowedRatingPoints.has(points)) {
      throw new Error("Rating enthält ungültige Punktewerte.");
    }
    if (seenEntries.has(entryId)) {
      throw new Error("Rating enthält doppelte Entry-Zuordnung.");
    }
    if (seenPoints.has(points)) {
      throw new Error("Rating enthält doppelte Punktewerte.");
    }
    seenEntries.add(entryId);
    seenPoints.add(points);
  }
};

export const validatePredictionItems = (items, allowedEntryIds) => {
  const expectedSize = allowedEntryIds.size;
  if (!Array.isArray(items) || items.length !== expectedSize) {
    throw new Error("Prediction muss vollständige Rangliste enthalten.");
  }
  const seenEntries = new Set();
  const seenRanks = new Set();
  for (const item of items) {
    const entryId = Number(item.entryId);
    const rank = Number(item.rank);
    if (!allowedEntryIds.has(entryId)) {
      throw new Error("Prediction enthält ungültige Entries.");
    }
    if (rank < 1 || rank > expectedSize) {
      throw new Error("Prediction enthält ungültige Ränge.");
    }
    if (seenEntries.has(entryId)) {
      throw new Error("Prediction enthält doppelte Entries.");
    }
    if (seenRanks.has(rank)) {
      throw new Error("Prediction enthält doppelte Ränge.");
    }
    seenEntries.add(entryId);
    seenRanks.add(rank);
  }
};

export const validateOfficialResultItems = (items, allowedEntryIds) => {
  const expectedSize = allowedEntryIds.size;
  if (!Array.isArray(items) || items.length !== expectedSize) {
    throw new Error("Offizielles Ergebnis muss vollständige Rangliste enthalten.");
  }
  const seenEntries = new Set();
  const seenRanks = new Map();
  for (const item of items) {
    const entryId = Number(item.entryId);
    const rank = Number(item.rank);
    if (!allowedEntryIds.has(entryId)) {
      throw new Error("Offizielles Ergebnis enthält ungültige Entries.");
    }
    if (!Number.isInteger(rank) || rank < 1 || rank > expectedSize) {
      throw new Error("Offizielles Ergebnis enthält ungültige Ränge.");
    }
    if (seenEntries.has(entryId)) {
      throw new Error("Offizielles Ergebnis enthält doppelte Entries.");
    }
    seenEntries.add(entryId);
    if (!seenRanks.has(rank)) {
      seenRanks.set(rank, []);
    }
    seenRanks.get(rank).push(entryId);
  }
  for (const [rank, entryIds] of seenRanks.entries()) {
    if (entryIds.length > 1) {
      const nextRank = rank + entryIds.length;
      if (nextRank <= expectedSize && seenRanks.has(nextRank)) {
        throw new Error(`Offizielles Ergebnis: Mehrere Einträge haben Rang ${rank}, aber Rang ${nextRank} ist bereits besetzt.`);
      }
    }
  }
};
