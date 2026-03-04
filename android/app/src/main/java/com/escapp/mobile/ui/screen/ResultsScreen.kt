package com.escapp.mobile.ui.screen

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.escapp.mobile.model.ResultsDto
import com.escapp.mobile.model.ScoreDto
import com.escapp.mobile.ui.theme.*

/**
 * Results screen: shows the participant's own ranking performance.
 * Design tokens:
 *   - Score card      → Blue200 background (primaryContainer)
 *   - Points text     → Blue900 (semantic-color-action-primary-resting)
 *   - Rank badge      → Blue900 on White
 *   - Top-3 podium    → Gold(Green700), Silver(Gray500), Bronze(Red400)
 *   - Info text        → Blue700 (semantic-color-on-surface-secondary-resting)
 */
@Composable
fun ResultsScreen(
    eventStatus: String?,
    results: ResultsDto?
) {
    if (eventStatus != "finished") {
        Box(
            modifier = Modifier.fillMaxSize().padding(32.dp),
            contentAlignment = Alignment.Center
        ) {
            Card(
                colors = CardDefaults.cardColors(containerColor = Blue200)
            ) {
                Text(
                    "Ergebnisse werden nach Event-Abschluss angezeigt.",
                    modifier = Modifier.padding(24.dp),
                    style = MaterialTheme.typography.bodyLarge,
                    color = Blue900
                )
            }
        }
        return
    }

    if (results == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            CircularProgressIndicator(color = Blue900)
        }
        return
    }

    val me = results.me

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(bottom = 24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        /* ── My scores ── */
        Text(
            "Dein Ergebnis",
            style = MaterialTheme.typography.titleLarge,
            color = DarkBlue1000
        )

        ScoreCard(
            label = "Liste A – gegen Teilnehmer-Ranking",
            score = me?.scoreAgainstRatingsRanking
        )

        ScoreCard(
            label = "Liste B – gegen offizielles Ranking",
            score = me?.scoreAgainstOfficialRanking
        )

        /* ── Top 3 Liste A ── */
        if (results.top3A.isNotEmpty()) {
            Spacer(Modifier.height(8.dp))
            Text("Top 3 · Teilnehmer-Ranking", style = MaterialTheme.typography.titleMedium, color = DarkBlue1000)
            results.top3A.forEachIndexed { i, dto ->
                PodiumRow(rank = i + 1, score = dto)
            }
        }

        /* ── Top 3 Liste B ── */
        if (results.top3B.isNotEmpty()) {
            Spacer(Modifier.height(8.dp))
            Text("Top 3 · Offizielles Ranking", style = MaterialTheme.typography.titleMedium, color = DarkBlue1000)
            results.top3B.forEachIndexed { i, dto ->
                PodiumRow(rank = i + 1, score = dto)
            }
        }

        /* ── Tiebreak info ── */
        Spacer(Modifier.height(8.dp))
        Card(
            colors = CardDefaults.cardColors(containerColor = DarkBlue100)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    "Tie-Break Regeln",
                    style = MaterialTheme.typography.labelLarge,
                    color = DarkBlue900
                )
                Spacer(Modifier.height(4.dp))
                Text(
                    "1. Exakte Treffer  2. ±1-Treffer  3. Geringste Gesamtabweichung  4. Alphabetisch",
                    style = MaterialTheme.typography.bodySmall,
                    color = DarkBlue700
                )
            }
        }
    }
}

@Composable
private fun ScoreCard(label: String, score: ScoreDto?) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Blue200),  // primaryContainer
        shape = MaterialTheme.shapes.medium
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                label,
                style = MaterialTheme.typography.labelLarge,
                color = Blue900  // semantic-color-on-surface-primary
            )
            Spacer(Modifier.height(8.dp))
            Row(
                horizontalArrangement = Arrangement.spacedBy(24.dp),
                verticalAlignment = Alignment.Bottom
            ) {
                Column {
                    Text("Punkte", style = MaterialTheme.typography.bodySmall, color = Blue700)
                    Text(
                        "${score?.points ?: "–"}",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold,
                        color = Blue900
                    )
                }
                Column {
                    Text("Platz", style = MaterialTheme.typography.bodySmall, color = Blue700)
                    Text(
                        "${score?.rank ?: "–"}",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold,
                        color = Blue900
                    )
                }
            }
            if (score?.exactMatches != null) {
                Spacer(Modifier.height(4.dp))
                Text(
                    "Exakt: ${score.exactMatches} · ±1: ${score.closeMatches ?: 0} · Abw.: ${score.totalDeviation ?: 0}",
                    style = MaterialTheme.typography.bodySmall,
                    color = Blue700
                )
            }
        }
    }
}

@Composable
private fun PodiumRow(rank: Int, score: ScoreDto) {
    val rankColor = when (rank) {
        1 -> Green700   // Gold stand-in (core-color-green-700)
        2 -> Gray500    // Silver (core-color-gray-500)
        3 -> Red400     // Bronze stand-in (core-color-red-400)
        else -> Blue700
    }
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        shape = MaterialTheme.shapes.small
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Surface(
                shape = MaterialTheme.shapes.small,
                color = rankColor.copy(alpha = 0.15f),
                modifier = Modifier.size(36.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text(
                        "$rank.",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = rankColor
                    )
                }
            }
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    score.displayName ?: "Teilnehmer ${score.participantId}",
                    style = MaterialTheme.typography.bodyLarge,
                    color = DarkBlue1000
                )
            }
            Text(
                "${score.points} Pkt.",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Blue900
            )
        }
    }
}
