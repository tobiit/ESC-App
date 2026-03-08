import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, clearTokens } from "../api";
import { getCountryNameDe } from "../lib/countries";

const ESC_POINTS = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

type User = { id: number; role: "admin" | "participant"; username: string; displayName: string };
type Entry = { id: number; countryCode: string; songTitle?: string; artistName?: string };
type RatingItem = { entryId: number; points: number };
type ParticipantPrediction = { participant_id: number; username: string; displayName: string; items: Array<{ entryId: number; rank: number }> };

function getThird(rank: number, total: number): "top" | "middle" | "bottom" {
  const base = Math.floor(total / 3);
  const remainder = total % 3;
  const topSize = base + (remainder >= 1 ? 1 : 0);
  const middleSize = base + (remainder >= 2 ? 1 : 0);
  if (rank <= topSize) return "top";
  if (rank <= topSize + middleSize) return "middle";
  return "bottom";
}

function scorePrediction(predictedRank: number, actualRank: number, total: number) {
  if (predictedRank === actualRank) return 3;
  if (Math.abs(predictedRank - actualRank) === 1) return 2;
  if (getThird(predictedRank, total) === getThird(actualRank, total)) return 1;
  return 0;
}

function buildRatingsRanking(entries: Entry[], ratingItems: RatingItem[]) {
  if (!entries || entries.length === 0) {
    console.warn("buildRatingsRanking: no entries provided");
    return [];
  }

  const stats = new Map(
    entries.map((entry) => [
      Number(entry.id),
      {
        entryId: Number(entry.id),
        countryCode: entry.countryCode,
        countryName: getCountryNameDe(entry.countryCode),
        total: 0,
        counts: Object.fromEntries([12, 10, 8, 7, 6, 5, 4, 3, 2, 1].map((point) => [point, 0]))
      }
    ])
  );

  for (const item of ratingItems) {
    const record = stats.get(Number(item.entryId));
    if (!record) {
      console.warn("Rating item entry not found:", item.entryId);
      continue;
    }
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
      const aName = getCountryNameDe(a.countryCode) || "";
      const bName = getCountryNameDe(b.countryCode) || "";
      return aName.localeCompare(bName, "de");
    })
    .map((item, index) => ({
      ...item,
      rank: index + 1
    }));
}

function buildParticipantScores(
  participants: ParticipantPrediction[],
  referenceRanking: ReturnType<typeof buildRatingsRanking>
) {
  if (!referenceRanking || referenceRanking.length === 0) {
    console.warn("buildParticipantScores: empty reference ranking");
    return [];
  }

  const total = referenceRanking.length;
  const actualRanksByEntry = new Map(referenceRanking.map((row) => [Number(row.entryId), row.rank]));

  return participants.map((participant) => {
    const predictedByEntry = new Map(participant.items.map((item) => [Number(item.entryId), Number(item.rank)]));
    let points = 0;

    for (const entry of referenceRanking) {
      const predicted = predictedByEntry.get(Number(entry.entryId));
      if (predicted) {
        points += scorePrediction(predicted, entry.rank, total);
      }
    }

    return {
      participantId: participant.participant_id,
      username: participant.username,
      displayName: participant.displayName,
      points
    };
  }).sort((a, b) => b.points - a.points || a.displayName.localeCompare(b.displayName, "de"));
}

export function AdminResultsPage({ user, onLogout }: { user: User; onLogout: () => void }) {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ratingItems, setRatingItems] = useState<RatingItem[]>([]);
  const [predictions, setPredictions] = useState<ParticipantPrediction[]>([]);
  const [officialRanking, setOfficialRanking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [toastFading, setToastFading] = useState(false);

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
    console.log("AdminResultsPage mounted", { eventId, user: user?.role, loading });
    if (user.role !== "admin") {
      navigate("/verwaltung/login");
      return;
    }
    if (!eventId) return;
    void load();
  }, [user.role, eventId]);

  const load = async () => {
    try {
      setLoading(true);
      const [events, entriesData, ratingsData, predictionsData, officialData] = await Promise.all([
        api.adminEvents(),
        api.adminEntries(Number(eventId)),
        api.adminRatings(Number(eventId)),
        api.adminPredictions(Number(eventId)),
        api.adminOfficialResult(Number(eventId))
      ]);

      const evt = events.find((e: any) => e.id === Number(eventId));
      console.log("Event loaded:", { found: !!evt, eventId, eventsCount: events.length });
      setEvent(evt);
      setEntries(entriesData || []);
      console.log("Entries loaded:", { count: entriesData?.length || 0 });

      const ratings = ratingsData || [];
      const ratingItemsList = ratings.flatMap((r: any) => 
        (r.items || []).map((item: any) => ({
          entryId: item.entryId,
          points: item.points
        }))
      );
      setRatingItems(ratingItemsList);

      const preds = (predictionsData || []).map((p: any) => ({
        participant_id: p.participantId,
        username: p.username || p.displayName,
        displayName: p.displayName,
        items: (p.items || []).map((item: any) => ({
          entryId: item.entryId,
          rank: item.rank
        }))
      }));
      setPredictions(preds);

      if (officialData && officialData.items) {
        setOfficialRanking(officialData.items);
      }

      setLoading(false);
    } catch (err) {
      const errorMsg = (err as Error).message;
      console.error("AdminResultsPage load error:", errorMsg);
      setMessage(errorMsg);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try { await api.logout(); } finally { clearTokens(); onLogout(); navigate("/verwaltung/login"); }
  };

  // Fallback: Always show something
  if (!user || user.role !== "admin") {
    return (
      <div className="shell shell--admin">
        <div className="topbar topbar--admin">
          <strong>ESCAPP Verwaltung</strong>
          <button className="btn btn-plain btn-plain--on-dark" onClick={() => void handleLogout()}>Logout</button>
        </div>
        <div className="layout">
          <div className="card"><p>Zugriff verweigert.</p></div>
        </div>
      </div>
    );
  }

  if (!eventId) {
    return (
      <div className="shell shell--admin">
        <div className="topbar topbar--admin">
          <strong>ESCAPP Verwaltung</strong>
          <span>{user.displayName}</span>
          <button className="btn btn-plain btn-plain--on-dark" onClick={() => void handleLogout()}>Logout</button>
        </div>
        <div className="layout">
          <div className="card"><p>Event-ID fehlt.</p></div>
        </div>
      </div>
    );
  }

  const localRanking = buildRatingsRanking(entries, ratingItems);
  console.log("Local ranking built:", { count: localRanking.length });

  const participantScoresLocal = buildParticipantScores(predictions, localRanking);
  console.log("Participant scores (local) built:", { count: participantScoresLocal.length });

  let participantScoresOfficial = null;
  if (officialRanking && Array.isArray(officialRanking)) {
    console.log("Building official ranking scores...", { count: officialRanking.length });
    const officialMapped = officialRanking.map((item: any, index: number) => {
      const officialEntryId = Number(item.entryId ?? item.entry_id);
      const entry = entries.find((e) => Number(e.id) === officialEntryId);
      return {
        entryId: officialEntryId,
        countryCode: entry?.countryCode || "",
        countryName: getCountryNameDe(entry?.countryCode || "") || `Country ${officialEntryId}`,
        rank: index + 1,
        total: 0,
        counts: {}
      };
    });
    participantScoresOfficial = buildParticipantScores(predictions, officialMapped);
    console.log("Participant scores (official) built:", { count: participantScoresOfficial.length });
  }

  if (!event) {
    return (
      <div className="shell shell--admin">
        <div className="topbar topbar--admin">
          <strong>ESCAPP Verwaltung</strong>
          <span>{user.displayName}</span>
          <button className="btn btn-plain btn-plain--on-dark" onClick={() => void handleLogout()}>Logout</button>
        </div>
        <div className="layout">
          <div className="card">
            <p>{loading ? "Lädt Event..." : `Event ${eventId} nicht gefunden.`}</p>
            {message && <p style={{color: 'red', fontSize: '12px', marginTop: '8px'}}>{message}</p>}
            <button className="btn" onClick={() => navigate("/verwaltung/")} style={{marginTop: '12px'}}>← Zurück</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shell shell--admin">
      <div className="topbar topbar--admin">
        <strong>ESCAPP Verwaltung – Ergebnisse</strong>
        <span>{user.displayName}</span>
        <button className="btn btn-plain btn-plain--on-dark" onClick={() => void handleLogout()}>Logout</button>
      </div>

      <div className="layout">
        <div className="card">
          <h2>{event.name}</h2>
          <p>Status: <span className="badge">{event.status}</span></p>
          <button className="btn" onClick={() => navigate("/verwaltung/")}>← Zurück</button>
        </div>

        {/* Lokale Rangliste */}
        <div className="card">
          <h3>Lokale Rangliste (aus Bewertungen)</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Rang</th>
                <th>Land</th>
                <th>Punkte</th>
                <th>Stimmen</th>
              </tr>
            </thead>
            <tbody>
              {localRanking.map((item: any) => (
                <tr key={item.entryId}>
                  <td><strong>{item.rank}</strong></td>
                  <td>{item.countryName}</td>
                  <td>{item.total}</td>
                  <td>{Object.values(item.counts).reduce((a: any, b: any) => a + b, 0) as number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Teilnehmer-Rangliste gegen lokale Rangliste */}
        <div className="card">
          <h3>Teilnehmer-Rangliste (gegen lokale Liste)</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Rang</th>
                <th>Teilnehmer</th>
                <th>Punkte</th>
              </tr>
            </thead>
            <tbody>
              {participantScoresLocal.map((score, index) => (
                <tr key={score.participantId}>
                  <td><strong>{index + 1}</strong></td>
                  <td>{score.displayName}</td>
                  <td>{score.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Teilnehmer-Rangliste gegen offizielle Rangliste */}
        {participantScoresOfficial && (
          <div className="card">
            <h3>Teilnehmer-Rangliste (gegen offizielle TV-Liste)</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Teilnehmer</th>
                  <th>Punkte</th>
                </tr>
              </thead>
              <tbody>
                {participantScoresOfficial.map((score, index) => (
                  <tr key={score.participantId}>
                    <td><strong>{index + 1}</strong></td>
                    <td>{score.displayName}</td>
                    <td>{score.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {message && <div className={`toast ${toastFading ? 'toast--fade-out' : ''}`} style={{ background: "var(--core-color-red-600, #d12800)" }}>{message}</div>}
      </div>
    </div>
  );
}
