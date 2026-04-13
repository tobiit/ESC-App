package com.escapp.mobile.ui.screen

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.snapshots.SnapshotStateMap
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.escapp.mobile.model.EntryDto
import com.escapp.mobile.ui.getCountryNameDe
import com.escapp.mobile.ui.theme.*
import sh.calvin.reorderable.ReorderableItem
import sh.calvin.reorderable.rememberReorderableLazyListState

/**
 * Prediction screen: reorder entries into your predicted final ranking.
 *
 * Two interaction modes (analog zum Web-Frontend):
 *   - Standard (predictionOrderLocked = false):
 *       Drag & Drop und Pfeiltasten aktiv; Rang-Felder sind read-only.
 *   - Sortiermodus (predictionOrderLocked = true):
 *       Rang-Felder editierbar; Drag & Drop und Pfeile deaktiviert.
 *       „Tabelle nach Rangeingabe neu sortieren" validiert und sortiert die Liste.
 *
 * Design tokens:
 *   - Rank badge       → Blue200 background, Blue900 text
 *   - Reorder icons    → semantic-color-action-secondary-resting (Blue700)
 *   - Disabled icons   → semantic-color-action-secondary-disabled (Gray500)
 *   - Submit button    → Blue900  (semantic-color-action-primary-resting)
 *   - Error            → Red700
 */
@Composable
fun PredictionScreen(
    entries: List<EntryDto>,
    predictionOrder: List<Long>,
    isSubmitted: Boolean,
    eventOpen: Boolean,
    onMove: (Int, Int) -> Unit,
    onMoveTo: (Int, Int) -> Unit,
    onMoveToRank: (Long, Int) -> Unit,
    onApplySortOrder: (List<Long>) -> Unit,
    onSave: () -> Unit,
    onSubmit: () -> Unit,
    highlightList: Boolean = false,
    highlightActions: Boolean = false
) {
    val enabled = !isSubmitted && eventOpen
    val canEditPrediction = !isSubmitted
    val focusManager = LocalFocusManager.current
    var showSubmitConfirmation by remember { mutableStateOf(false) }

    // ── Sortiermodus-State ───────────────────────────────────────────────────
    var predictionOrderLocked by remember { mutableStateOf(false) }
    val rankInputs: SnapshotStateMap<Long, String> = remember { mutableStateMapOf() }
    val rankErrors: SnapshotStateMap<Long, String> = remember { mutableStateMapOf() }

    // Im Standard-Modus: rankInputs immer mit der aktuellen Reihenfolge sync halten.
    LaunchedEffect(predictionOrder) {
        if (!predictionOrderLocked) {
            rankInputs.clear()
            predictionOrder.forEachIndexed { i, id -> rankInputs[id] = (i + 1).toString() }
            rankErrors.clear()
        }
    }

    fun enterSortMode() {
        rankInputs.clear()
        predictionOrder.forEachIndexed { i, id -> rankInputs[id] = (i + 1).toString() }
        rankErrors.clear()
        predictionOrderLocked = true
        focusManager.clearFocus()
    }

    fun applySort() {
        val errors = mutableMapOf<Long, String>()
        val usedRanks = mutableMapOf<Int, Long>()
        for (id in predictionOrder) {
            val raw = (rankInputs[id] ?: "").trim()
            if (raw.isEmpty()) {
                errors[id] = "Rang erforderlich."
                continue
            }
            val rank = raw.toIntOrNull()
            if (rank == null || rank < 1 || rank > predictionOrder.size) {
                errors[id] = "Erlaubt: 1–${predictionOrder.size}."
                continue
            }
            val existing = usedRanks[rank]
            if (existing != null) {
                errors[id] = "Rang $rank doppelt vergeben."
                if (!errors.containsKey(existing)) errors[existing] = "Rang $rank doppelt vergeben."
                continue
            }
            usedRanks[rank] = id
        }
        rankErrors.clear()
        rankErrors.putAll(errors)
        if (errors.isNotEmpty()) return

        val sorted = predictionOrder.sortedBy { rankInputs[it]!!.trim().toInt() }
        onApplySortOrder(sorted)
        predictionOrderLocked = false
        rankErrors.clear()
        focusManager.clearFocus()
    }

    fun onToggleSortMode() {
        if (!predictionOrderLocked) enterSortMode() else applySort()
    }

    // ── Modi ─────────────────────────────────────────────────────────────────
    val dragEnabled = canEditPrediction && !predictionOrderLocked
    val rankInputEnabled = canEditPrediction && predictionOrderLocked

    // ── Drag & Drop ──────────────────────────────────────────────────────────
    val lazyListState = rememberLazyListState()
    val reorderableState = rememberReorderableLazyListState(
        lazyListState = lazyListState,
        onMove = { from, to ->
            if (dragEnabled) onMoveTo(from.index, to.index)
        }
    )

    Column(modifier = Modifier.fillMaxSize()) {
        // ── Toggle-Button: Startreihenfolge fixieren ─────────────────────────
        Button(
            onClick = { onToggleSortMode() },
            enabled = canEditPrediction,
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 4.dp, vertical = 6.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Blue900,
                contentColor = MaterialTheme.colorScheme.onPrimary,
                disabledContainerColor = Gray500,
                disabledContentColor = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.85f)
            ),
            shape = MaterialTheme.shapes.medium
        ) {
            Text(
                if (predictionOrderLocked) "Tabelle nach Rangeingabe neu sortieren"
                else "Startreihenfolge fixieren"
            )
        }

        LazyColumn(
            state = lazyListState,
            verticalArrangement = Arrangement.spacedBy(2.dp),
            modifier = Modifier.weight(1f),
            contentPadding = PaddingValues(bottom = 80.dp)
        ) {
            itemsIndexed(predictionOrder, key = { _, id -> id }) { index, entryId ->
                ReorderableItem(state = reorderableState, key = entryId) { isDragging ->
                    val entry = entries.firstOrNull { it.id == entryId }
                    val currentRankInput = rankInputs[entryId] ?: (index + 1).toString()
                    val hasError = rankErrors.containsKey(entryId)

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
                            /* ── Rang-Feld ── */
                            OutlinedTextField(
                                value = currentRankInput,
                                onValueChange = { value ->
                                    if (rankInputEnabled && (value.isEmpty() || value.all(Char::isDigit))) {
                                        rankInputs[entryId] = value
                                        if (rankErrors.containsKey(entryId)) rankErrors.remove(entryId)
                                    }
                                },
                                singleLine = true,
                                enabled = rankInputEnabled,
                                isError = hasError,
                                textStyle = MaterialTheme.typography.titleSmall,
                                keyboardOptions = KeyboardOptions(
                                    keyboardType = KeyboardType.Number,
                                    imeAction = ImeAction.Done
                                ),
                                keyboardActions = KeyboardActions(
                                    onDone = { focusManager.clearFocus() }
                                ),
                                colors = OutlinedTextFieldDefaults.colors(
                                    focusedBorderColor = if (hasError) Red700 else Blue900,
                                    unfocusedBorderColor = if (hasError) Red700 else Blue700,
                                    errorBorderColor = Red700,
                                    focusedTextColor = Blue900,
                                    unfocusedTextColor = Blue900,
                                    focusedContainerColor = Blue200,
                                    unfocusedContainerColor = Blue200,
                                    disabledContainerColor = Blue200,
                                    disabledTextColor = Blue900,
                                    errorContainerColor = Blue200,
                                    errorTextColor = Red700
                                ),
                                modifier = Modifier.width(56.dp)
                            )

                            Spacer(Modifier.width(12.dp))

                            /* ── Land + Song (Drag-Handle) ── */
                            Column(
                                modifier = Modifier.weight(1f)
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

                            Box(
                                modifier = Modifier
                                    .padding(horizontal = 2.dp)
                                    .size(24.dp)
                                    .then(
                                        if (dragEnabled) {
                                            Modifier.draggableHandle(
                                                onDragStarted = {},
                                                onDragStopped = {}
                                            )
                                        } else {
                                            Modifier
                                        }
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "↕",
                                    color = if (dragEnabled) Blue700 else Gray500,
                                    style = MaterialTheme.typography.titleMedium
                                )
                            }

                            /* ── Pfeiltasten ── */
                            IconButton(
                                onClick = { onMove(index, -1) },
                                enabled = dragEnabled && index > 0
                            ) {
                                Icon(
                                    Icons.Default.KeyboardArrowUp,
                                    contentDescription = "Nach oben",
                                    tint = if (dragEnabled && index > 0) Blue700 else Gray500
                                )
                            }
                            IconButton(
                                onClick = { onMove(index, 1) },
                                enabled = dragEnabled && index < predictionOrder.size - 1
                            ) {
                                Icon(
                                    Icons.Default.KeyboardArrowDown,
                                    contentDescription = "Nach unten",
                                    tint = if (dragEnabled && index < predictionOrder.size - 1) Blue700 else Gray500
                                )
                            }
                        }

                        // Fehlermeldung unterhalb der Zeile
                        if (hasError) {
                            Text(
                                text = rankErrors[entryId] ?: "",
                                style = MaterialTheme.typography.labelSmall,
                                color = Red700,
                                modifier = Modifier.padding(start = 12.dp, bottom = 6.dp)
                            )
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
                            onClick = { showSubmitConfirmation = true },
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

    if (showSubmitConfirmation) {
        AlertDialog(
            onDismissRequest = { showSubmitConfirmation = false },
            text = {
                Text(
                    "Sie reichen Ihren Gewinntipp endgültig ein. Danach können Sie daran nichts mehr ändern. Wollen Sie jetzt einreichen?"
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
