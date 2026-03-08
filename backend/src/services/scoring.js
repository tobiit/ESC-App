const ESC_POINTS = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

export const getThird = (rank, total) => {
  const base = Math.floor(total / 3);
  const remainder = total % 3;
  const topSize = base + (remainder >= 1 ? 1 : 0);
  const middleSize = base + (remainder >= 2 ? 1 : 0);
  if (rank <= topSize) return "top";
  if (rank <= topSize + middleSize) return "middle";
  return "bottom";
};

export const scorePrediction = (predictedRank, actualRank, total) => {
  if (predictedRank === actualRank) return { points: 3, exact: 1, near: 0, diffAbs: 0, sameThird: 0 };
  if (Math.abs(predictedRank - actualRank) === 1) {
    return { points: 2, exact: 0, near: 1, diffAbs: 1, sameThird: 0 };
  }
  if (getThird(predictedRank, total) === getThird(actualRank, total)) {
    return {
      points: 1,
      exact: 0,
      near: 0,
      diffAbs: Math.abs(predictedRank - actualRank),
      sameThird: 1
    };
  }
  return {
    points: 0,
    exact: 0,
    near: 0,
    diffAbs: Math.abs(predictedRank - actualRank),
    sameThird: 0
  };
};

export const buildRatingsReferenceRanking = (entries, allRatingItems) => {
  const stats = new Map(
    entries.map((entry) => [
      Number(entry.id),
      {
        entryId: Number(entry.id),
        countryCode: entry.country_code,
        total: 0,
        counts: Object.fromEntries([12, 10, 8, 7, 6, 5, 4, 3, 2, 1].map((point) => [point, 0]))
      }
    ])
  );

  for (const item of allRatingItems) {
    const record = stats.get(Number(item.entry_id));
    if (!record) continue;
    record.total += Number(item.points);
    if (record.counts[item.points] !== undefined) {
      record.counts[item.points] += 1;
    }
  }

  return [...stats.values()]
    .sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      for (const p of ESC_POINTS) {
        if (b.counts[p] !== a.counts[p]) return b.counts[p] - a.counts[p];
      }
      return a.countryCode.localeCompare(b.countryCode, "de");
    })
    .map((item, index) => ({
      ...item,
      rank: index + 1
    }));
};

export const buildParticipantRanking = (participantsWithPredictions, referenceRanking, entries) => {
  const total = entries.length;
  const actualRanksByEntry = new Map(referenceRanking.map((row) => [Number(row.entryId), row.rank]));

  const scored = participantsWithPredictions.map((participant) => {
    const predictedByEntry = new Map(participant.items.map((item) => [Number(item.entry_id), Number(item.rank_position)]));
    let points = 0;
    let exactHits = 0;
    let nearHits = 0;
    let diffSum = 0;
    const perEntry = [];

    for (const entry of entries) {
      const entryId = Number(entry.id);
      const predictedRank = predictedByEntry.get(entryId);
      const actualRank = actualRanksByEntry.get(entryId);
      if (!predictedRank || !actualRank) {
        continue;
      }
      const part = scorePrediction(predictedRank, actualRank, total);
      points += part.points;
      exactHits += part.exact;
      nearHits += part.near;
      diffSum += part.diffAbs;
      perEntry.push({
        entryId,
        countryCode: entry.country_code,
        predictedRank,
        actualRank,
        points: part.points
      });
    }

    return {
      participantId: Number(participant.participant_id),
      displayName: participant.display_name,
      points,
      exactHits,
      nearHits,
      diffSum,
      perEntry
    };
  });

  scored.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.exactHits !== a.exactHits) return b.exactHits - a.exactHits;
    if (b.nearHits !== a.nearHits) return b.nearHits - a.nearHits;
    if (a.diffSum !== b.diffSum) return a.diffSum - b.diffSum;
    return a.displayName.localeCompare(b.displayName, "de");
  });

  return scored.map((row, index) => ({ ...row, rank: index + 1 }));
};
