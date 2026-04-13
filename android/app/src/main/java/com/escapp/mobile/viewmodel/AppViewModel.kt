package com.escapp.mobile.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.escapp.mobile.data.DraftStore
import com.escapp.mobile.data.EscApi
import com.escapp.mobile.data.TokenStore
import com.escapp.mobile.model.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import retrofit2.HttpException

/** Immutable UI state – Compose recomposes when any property changes. */
data class UiState(
    val user: UserDto? = null,
    val event: EventDto? = null,
    val entries: List<EntryDto> = emptyList(),
    val ratingMap: Map<Long, Int> = emptyMap(),
    val predictionOrder: List<Long> = emptyList(),
    val ratingSubmitted: Boolean = false,
    val predictionSubmitted: Boolean = false,
    val results: ResultsDto? = null,
    val loading: Boolean = false,
    val message: String? = null,
    val error: String? = null
)

class AppViewModel(
    private val api: EscApi,
    private val tokenStore: TokenStore,
    private val draftStore: DraftStore
) : ViewModel() {

    private val requiredEscPoints = setOf(1, 2, 3, 4, 5, 6, 7, 8, 10, 12)

    var ui by mutableStateOf(UiState())
        private set

    val isLoggedIn: Boolean get() = ui.user != null

    init {
        viewModelScope.launch { tryRestoreSession() }
    }

    /* ── Auth ── */

    private suspend fun tryRestoreSession() {
        val user = tokenStore.readUser() ?: return
        ui = ui.copy(user = user)
        loadEventData()
    }

    fun login(username: String, password: String) {
        viewModelScope.launch {
            ui = ui.copy(loading = true, error = null)
            runCatching {
                api.login(LoginRequest(username, password))
            }.onSuccess { resp ->
                tokenStore.save(resp.accessToken, resp.refreshToken, resp.user)
                ui = ui.copy(user = resp.user, loading = false, error = null)
                loadEventData()
            }.onFailure { err ->
                ui = ui.copy(loading = false, error = parseError(err))
            }
        }
    }

    fun register(
        displayName: String,
        fullName: String,
        username: String,
        password: String,
        acceptedTerms: Boolean,
        onSuccess: () -> Unit
    ) {
        viewModelScope.launch {
            ui = ui.copy(loading = true, error = null)
            runCatching {
                api.register(RegisterRequest(displayName, fullName, username, password, acceptedTerms))
            }.onSuccess { _ ->
                ui = ui.copy(loading = false, error = null)
                onSuccess()
            }.onFailure { err ->
                ui = ui.copy(loading = false, error = parseError(err))
            }
        }
    }

    fun logout() {
        viewModelScope.launch {
            val refreshToken = tokenStore.readRefreshToken()
            if (refreshToken != null) {
                runCatching { api.logout(LogoutRequest(refreshToken)) }
            }
            tokenStore.clear()
            draftStore.clear()
            ui = UiState()
        }
    }

    /* ── Event data loading ── */

    fun loadEventData() {
        viewModelScope.launch {
            ui = ui.copy(loading = true, error = null)
            runCatching {
                val event = try {
                    api.activeEvent()
                } catch (e: HttpException) {
                    if (e.code() == 404) null else throw e
                } ?: run { ui = ui.copy(event = null, loading = false); return@launch }

                val entries = api.entries(event.id)
                val rating = api.myRating(event.id)
                val prediction = api.myPrediction(event.id)

                val cachedRating = draftStore.readRatingDraft(event.id)
                val cachedPrediction = draftStore.readPredictionDraft(event.id)

                val ratingMap = if (rating.items.isNotEmpty()) {
                    rating.items.associate { it.entryId to it.points }
                } else cachedRating

                val predictionOrder = if (prediction.items.isNotEmpty()) {
                    prediction.items.sortedBy { it.rank }.map { it.entryId }
                } else {
                    cachedPrediction.ifEmpty { entries.map { it.id } }
                }

                ui = ui.copy(
                    event = event,
                    entries = entries,
                    ratingMap = ratingMap,
                    predictionOrder = predictionOrder,
                    ratingSubmitted = rating.status == "submitted",
                    predictionSubmitted = prediction.status == "submitted",
                    loading = false,
                    error = null
                )

                if (event.status == "finished") {
                    val results = api.results(event.id)
                    ui = ui.copy(results = results)
                }

                syncOfflineDrafts(event.id)

            }.onFailure { err ->
                ui = ui.copy(loading = false, error = parseError(err))
            }
        }
    }

    private suspend fun syncOfflineDrafts(eventId: Long) {
        val draftRating = draftStore.readRatingDraft(eventId)
        if (draftRating.isNotEmpty() && !ui.ratingSubmitted) {
            runCatching {
                api.saveRating(eventId, RatingUpsertRequest(draftRating.map { RatingItemBody(it.key, it.value) }))
                draftStore.clearRatingDraft(eventId)
            }
        }
        val draftPrediction = draftStore.readPredictionDraft(eventId)
        if (draftPrediction.isNotEmpty() && !ui.predictionSubmitted) {
            runCatching {
                api.savePrediction(eventId, PredictionUpsertRequest(
                    draftPrediction.mapIndexed { i, id -> PredictionItemBody(id, i + 1) }
                ))
                draftStore.clearPredictionDraft(eventId)
            }
        }
    }

    /* ── Rating ── */

    fun setRating(entryId: Long, points: Int?) {
        if (ui.ratingSubmitted) return
        val map = ui.ratingMap.toMutableMap()
        if (points == null) {
            map.remove(entryId)
        } else {
            map.entries.removeAll { it.value == points }
            map[entryId] = points
        }
        ui = ui.copy(ratingMap = map.toMap())
        ui.event?.let { event ->
            viewModelScope.launch { draftStore.writeRatingDraft(event.id, map) }
        }
    }

    fun saveRating() {
        val event = ui.event ?: return
        val items = ui.ratingMap.map { RatingItemBody(it.key, it.value) }
        viewModelScope.launch {
            runCatching {
                api.saveRating(event.id, RatingUpsertRequest(items))
            }.onSuccess {
                showMessage("Bewertung gespeichert")
            }.onFailure {
                draftStore.writeRatingDraft(event.id, ui.ratingMap)
                showMessage("Offline gespeichert")
            }
        }
    }

    fun submitRating() {
        val event = ui.event ?: return
        if (!isRatingComplete()) {
            showMessage("Für das Einreichen müssen 1–8, 10 und 12 Punkte vollständig vergeben sein.")
            return
        }
        viewModelScope.launch {
            runCatching {
                // save first, then submit
                val items = ui.ratingMap.map { RatingItemBody(it.key, it.value) }
                api.saveRating(event.id, RatingUpsertRequest(items))
                api.submitRating(event.id)
            }.onSuccess {
                ui = ui.copy(ratingSubmitted = true)
                showMessage("Bewertung eingereicht")
            }.onFailure { err ->
                ui = ui.copy(error = parseError(err))
            }
        }
    }

    /* ── Prediction ── */

    fun movePrediction(index: Int, delta: Int) {
        if (ui.predictionSubmitted) return
        val target = index + delta
        val list = ui.predictionOrder.toMutableList()
        if (target < 0 || target >= list.size) return
        val tmp = list[index]
        list[index] = list[target]
        list[target] = tmp
        ui = ui.copy(predictionOrder = list.toList())
        ui.event?.let { event ->
            viewModelScope.launch { draftStore.writePredictionDraft(event.id, list) }
        }
    }

    fun movePredictionToPosition(fromIndex: Int, toIndex: Int) {
        if (ui.predictionSubmitted) return
        if (fromIndex < 0 || toIndex < 0) return
        val list = ui.predictionOrder.toMutableList()
        if (fromIndex >= list.size || toIndex >= list.size) return
        if (fromIndex == toIndex) return
        
        val item = list.removeAt(fromIndex)
        list.add(toIndex, item)
        
        ui = ui.copy(predictionOrder = list.toList())
        ui.event?.let { event ->
            viewModelScope.launch { draftStore.writePredictionDraft(event.id, list) }
        }
    }

    fun movePredictionToRank(entryId: Long, rank: Int) {
        if (ui.predictionSubmitted) return
        val list = ui.predictionOrder.toMutableList()
        if (rank !in 1..list.size) return

        val fromIndex = list.indexOf(entryId)
        if (fromIndex == -1) return

        val toIndex = rank - 1
        if (fromIndex == toIndex) return

        val item = list.removeAt(fromIndex)
        list.add(toIndex, item)

        ui = ui.copy(predictionOrder = list.toList())
        ui.event?.let { event ->
            viewModelScope.launch { draftStore.writePredictionDraft(event.id, list) }
        }
    }

    fun applySortedPrediction(sortedOrder: List<Long>) {
        if (ui.predictionSubmitted) return
        ui = ui.copy(predictionOrder = sortedOrder)
        ui.event?.let { event ->
            viewModelScope.launch { draftStore.writePredictionDraft(event.id, sortedOrder) }
        }
    }

    fun savePrediction() {
        val event = ui.event ?: return
        val items = ui.predictionOrder.mapIndexed { i, id -> PredictionItemBody(id, i + 1) }
        viewModelScope.launch {
            runCatching {
                api.savePrediction(event.id, PredictionUpsertRequest(items))
            }.onSuccess {
                showMessage("Tipp gespeichert")
            }.onFailure {
                draftStore.writePredictionDraft(event.id, ui.predictionOrder)
                showMessage("Offline gespeichert")
            }
        }
    }

    fun submitPrediction() {
        val event = ui.event ?: return
        if (!isPredictionComplete()) {
            showMessage("Für das Einreichen müssen alle Songs/Länder vollständig auf Ränge verteilt sein.")
            return
        }
        viewModelScope.launch {
            runCatching {
                val items = ui.predictionOrder.mapIndexed { i, id -> PredictionItemBody(id, i + 1) }
                api.savePrediction(event.id, PredictionUpsertRequest(items))
                api.submitPrediction(event.id)
            }.onSuccess {
                ui = ui.copy(predictionSubmitted = true)
                showMessage("Tipp eingereicht")
            }.onFailure { err: Throwable ->
                ui = ui.copy(error = parseError(err))
            }
        }
    }

    /* ── Helpers ── */

    fun clearMessage() {
        ui = ui.copy(message = null)
    }

    fun clearError() {
        ui = ui.copy(error = null)
    }

    private fun showMessage(msg: String) {
        ui = ui.copy(message = msg)
        viewModelScope.launch {
            delay(3000)
            if (ui.message == msg) ui = ui.copy(message = null)
        }
    }

    private fun isRatingComplete(): Boolean {
        val points = ui.ratingMap.values
        return points.size == requiredEscPoints.size && points.toSet() == requiredEscPoints
    }

    private fun isPredictionComplete(): Boolean {
        val entryIds = ui.entries.map { it.id }
        val order = ui.predictionOrder
        return order.size == entryIds.size && order.toSet() == entryIds.toSet()
    }

    private fun parseError(err: Throwable): String {
        val msg = err.message ?: "Unbekannter Fehler"
        return when {
            "401" in msg -> "Anmeldung fehlgeschlagen"
            "403" in msg -> "Keine Berechtigung"
            "409" in msg -> "Bereits eingereicht / Event nicht offen"
            "423" in msg -> "Konto vorübergehend gesperrt"
            else -> msg
        }
    }
}
