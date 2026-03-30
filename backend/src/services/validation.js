const allowedRatingPoints = new Set([1, 2, 3, 4, 5, 6, 7, 8, 10, 12]);

export const validateRatingDraftItems = (items, allowedEntryIds) => {
  if (!Array.isArray(items) || items.length > 10) {
    throw new Error("Rating-Entwurf darf maximal 10 Einträge enthalten.");
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

export const validatePredictionDraftItems = (items, allowedEntryIds) => {
  const expectedSize = allowedEntryIds.size;
  if (!Array.isArray(items) || items.length > expectedSize) {
    throw new Error("Prediction-Entwurf enthält zu viele Einträge.");
  }
  const seenEntries = new Set();
  const seenRanks = new Set();
  for (const item of items) {
    const entryId = Number(item.entryId);
    const rank = Number(item.rank);
    if (!allowedEntryIds.has(entryId)) {
      throw new Error("Prediction enthält ungültige Entries.");
    }
    if (!Number.isInteger(rank) || rank < 1 || rank > expectedSize) {
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
  }
};
