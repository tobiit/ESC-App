package com.escapp.mobile.ui.screen

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.escapp.mobile.model.EntryDto
import com.escapp.mobile.ui.getCountryNameDe
import com.escapp.mobile.ui.theme.*

private val ESC_POINTS = listOf(12, 10, 8, 7, 6, 5, 4, 3, 2, 1)

/**
 * Rating screen: each ESC entry gets a unique point value (12, 10, 8 … 1).
 * Design tokens:
 *   - Card surface  → semantic-color-surface-default-resting (White)
 *   - Active badge  → semantic-color-action-primary-resting (Blue900)
 *   - Used badge    → semantic-color-on-surface-secondary-disabled (Gray500)
 *   - Submit button → semantic-color-action-primary-resting (Blue900)
 *   - Locked hint   → semantic-color-on-surface-primary-resting (Blue900)
 */
@Composable
fun RatingScreen(
    entries: List<EntryDto>,
    ratingMap: Map<Long, Int>,
    isSubmitted: Boolean,
    eventOpen: Boolean,
    onSetRating: (Long, Int?) -> Unit,
    onSave: () -> Unit,
    onSubmit: () -> Unit,
    highlightActions: Boolean = false
) {
    val usedPoints = remember(ratingMap) { ratingMap.values.toSet() }
    val enabled = !isSubmitted && eventOpen
    var showSubmitConfirmation by remember { mutableStateOf(false) }

    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(2.dp),
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(bottom = 80.dp)
    ) {
        itemsIndexed(entries, key = { _, e -> e.id }) { _, entry ->
            RatingRow(
                entry = entry,
                currentPoints = ratingMap[entry.id],
                usedPoints = usedPoints,
                enabled = enabled,
                onSelect = { pts -> onSetRating(entry.id, pts) }
            )
        }

        item {
            Spacer(Modifier.height(12.dp))

            if (isSubmitted) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Blue200)  // primaryContainer
                ) {
                    Text(
                        "Bewertung ist eingereicht und gesperrt.",
                        modifier = Modifier.padding(16.dp),
                        style = MaterialTheme.typography.bodyMedium,
                        color = Blue900  // semantic-color-on-surface-primary-resting
                    )
                }
            } else if (eventOpen) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .then(
                            if (highlightActions) {
                                Modifier.border(3.dp, Color(0xFFFFC107), MaterialTheme.shapes.medium)
                            } else {
                                Modifier
                            }
                        )
                        .padding(4.dp)
                ) {
                    OutlinedButton(
                        onClick = onSave,
                        modifier = Modifier.weight(1f),
                        colors = ButtonDefaults.outlinedButtonColors(
                            contentColor = Blue700  // semantic-color-action-secondary-resting
                        ),
                        shape = MaterialTheme.shapes.medium
                    ) {
                        Text("Entwurf speichern")
                    }
                    Button(
                        onClick = { showSubmitConfirmation = true },
                        modifier = Modifier.weight(1f),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Blue900,  // semantic-color-action-primary-resting
                            contentColor = MaterialTheme.colorScheme.onPrimary
                        ),
                        shape = MaterialTheme.shapes.medium
                    ) {
                        Text("Einreichen")
                    }
                }
            } else {
                Text(
                    "Event ist nicht offen.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = Gray600
                )
            }
        }
    }

    if (showSubmitConfirmation) {
        AlertDialog(
            onDismissRequest = { showSubmitConfirmation = false },
            text = {
                Text(
                    "Sie reichen Ihre Bewertung endgültig ein. Danach können Sie daran nichts mehr ändern. Wollen Sie jetzt einreichen?"
                )
            },
            confirmButton = {
                Button(
                    onClick = {
                        showSubmitConfirmation = false
                        onSubmit()
                    }
                ) {
                    Text("Ja")
                }
            },
            dismissButton = {
                OutlinedButton(onClick = { showSubmitConfirmation = false }) {
                    Text("Nein")
                }
            }
        )
    }
}

@Composable
private fun RatingRow(
    entry: EntryDto,
    currentPoints: Int?,
    usedPoints: Set<Int>,
    enabled: Boolean,
    onSelect: (Int?) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface  // White
        ),
        shape = MaterialTheme.shapes.small
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    getCountryNameDe(entry.countryCode),
                    style = MaterialTheme.typography.bodyLarge,
                    color = DarkBlue1000  // semantic-color-on-surface-primary
                )
                if (!entry.songTitle.isNullOrBlank()) {
                    Text(
                        "${entry.artistName.orEmpty()} – ${entry.songTitle}",
                        style = MaterialTheme.typography.bodySmall,
                        color = Blue700  // semantic-color-on-surface-secondary
                    )
                }
            }

            Box {
                OutlinedButton(
                    onClick = { expanded = true },
                    enabled = enabled,
                    contentPadding = PaddingValues(horizontal = 16.dp, vertical = 6.dp),
                    colors = if (currentPoints != null) {
                        ButtonDefaults.outlinedButtonColors(
                            containerColor = Blue900,  // semantic-color-action-primary
                            contentColor = MaterialTheme.colorScheme.onPrimary
                        )
                    } else {
                        ButtonDefaults.outlinedButtonColors(
                            contentColor = Blue700,
                            disabledContentColor = Gray500  // semantic disabled
                        )
                    },
                    shape = MaterialTheme.shapes.small
                ) {
                    Text(
                        text = currentPoints?.toString() ?: "–",
                        style = MaterialTheme.typography.titleMedium
                    )
                }

                DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                    DropdownMenuItem(
                        text = { Text("– (entfernen)") },
                        onClick = { onSelect(null); expanded = false }
                    )
                    ESC_POINTS.forEach { pts ->
                        val alreadyUsed = pts in usedPoints && currentPoints != pts
                        DropdownMenuItem(
                            text = {
                                Text(
                                    pts.toString(),
                                    color = if (alreadyUsed) Gray400 else DarkBlue1000
                                )
                            },
                            onClick = {
                                if (!alreadyUsed) {
                                    onSelect(pts)
                                    expanded = false
                                }
                            },
                            enabled = !alreadyUsed
                        )
                    }
                }
            }
        }
    }
}
