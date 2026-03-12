package com.escapp.mobile.ui.screen

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.escapp.mobile.model.EntryDto
import com.escapp.mobile.ui.getCountryNameDe
import com.escapp.mobile.ui.theme.*
import sh.calvin.reorderable.ReorderableItem
import sh.calvin.reorderable.rememberReorderableLazyListState

/**
 * Prediction screen: reorder entries into your predicted final ranking.
 * Design tokens:
 *   - Rank badge       → Blue200 background, Blue900 text
 *   - Reorder icons    → semantic-color-action-secondary-resting (Blue700)
 *   - Disabled icons   → semantic-color-action-secondary-disabled (Gray500)
 *   - Submit button    → Blue900  (semantic-color-action-primary-resting)
 * 
 * Unterstützt sowohl Drag & Drop als auch Pfeil-Buttons zum Verschieben.
 */
@Composable
fun PredictionScreen(
    entries: List<EntryDto>,
    predictionOrder: List<Long>,
    isSubmitted: Boolean,
    eventOpen: Boolean,
    onMove: (Int, Int) -> Unit,
    onMoveTo: (Int, Int) -> Unit,
    onSave: () -> Unit,
    onSubmit: () -> Unit,
    highlightList: Boolean = false,
    highlightActions: Boolean = false
) {
    val enabled = !isSubmitted && eventOpen
    
    val lazyListState = rememberLazyListState()
    val reorderableState = rememberReorderableLazyListState(
        lazyListState = lazyListState,
        onMove = { from, to -> 
            if (enabled) {
                onMoveTo(from.index, to.index)
            }
        }
    )

    LazyColumn(
        state = lazyListState,
        verticalArrangement = Arrangement.spacedBy(2.dp),
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(bottom = 80.dp)
    ) {
        itemsIndexed(predictionOrder, key = { _, id -> id }) { index, entryId ->
            ReorderableItem(state = reorderableState, key = entryId) { isDragging ->
                val entry = entries.firstOrNull { it.id == entryId }

                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .then(
                            if (highlightList) {
                                Modifier.border(3.dp, Color(0xFFFFC107), MaterialTheme.shapes.small)
                            } else {
                                Modifier
                            }
                        ),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.surface
                    ),
                    shape = MaterialTheme.shapes.small,
                    elevation = CardDefaults.cardElevation(
                        defaultElevation = if (isDragging) 8.dp else 1.dp
                    )
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        /* ── Rank badge ── */
                        Surface(
                            shape = MaterialTheme.shapes.small,
                            color = Blue200,
                            modifier = Modifier.size(36.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Text(
                                    "${index + 1}",
                                    style = MaterialTheme.typography.titleSmall,
                                    color = Blue900
                                )
                            }
                        }

                        Spacer(Modifier.width(12.dp))

                        /* ── Country name + song (Drag-Handle) ── */
                        Column(
                            modifier = Modifier
                                .weight(1f)
                                .then(
                                    if (enabled) {
                                        Modifier.draggableHandle(
                                            onDragStarted = {
                                                // Optional: Haptic feedback hier
                                            },
                                            onDragStopped = {
                                                // Optional: Feedback nach Drag
                                            }
                                        )
                                    } else {
                                        Modifier
                                    }
                                )
                        ) {
                            Text(
                                getCountryNameDe(entry?.countryCode),
                                style = MaterialTheme.typography.bodyLarge,
                                color = DarkBlue1000
                            )
                            if (!entry?.songTitle.isNullOrBlank()) {
                                Text(
                                    "${entry?.artistName.orEmpty()} – ${entry?.songTitle}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Blue700
                                )
                            }
                        }

                        /* ── Up / Down buttons ── */
                        IconButton(
                            onClick = { onMove(index, -1) },
                            enabled = enabled && index > 0
                        ) {
                            Icon(
                                Icons.Default.KeyboardArrowUp,
                                contentDescription = "Nach oben",
                                tint = if (enabled && index > 0) Blue700 else Gray500
                            )
                        }
                        IconButton(
                            onClick = { onMove(index, 1) },
                            enabled = enabled && index < predictionOrder.size - 1
                        ) {
                            Icon(
                                Icons.Default.KeyboardArrowDown,
                                contentDescription = "Nach unten",
                                tint = if (enabled && index < predictionOrder.size - 1) Blue700 else Gray500
                            )
                        }
                    }
                }
            }
        }

        item {
            Spacer(Modifier.height(12.dp))

            if (isSubmitted) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Blue200)
                ) {
                    Text(
                        "Tipp ist eingereicht und gesperrt.",
                        modifier = Modifier.padding(16.dp),
                        style = MaterialTheme.typography.bodyMedium,
                        color = Blue900
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
                        colors = ButtonDefaults.outlinedButtonColors(contentColor = Blue700),
                        shape = MaterialTheme.shapes.medium
                    ) {
                        Text("Entwurf speichern")
                    }
                    Button(
                        onClick = onSubmit,
                        modifier = Modifier.weight(1f),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Blue900,
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
}
