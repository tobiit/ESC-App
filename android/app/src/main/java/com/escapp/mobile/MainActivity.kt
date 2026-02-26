package com.escapp.mobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.escapp.mobile.model.*
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.Interceptor
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import java.util.concurrent.TimeUnit

private val ComponentActivity.dataStore by preferencesDataStore("escapp_store")

interface EscApi {
    @POST("/auth/login")
    suspend fun login(@Body body: LoginRequest): LoginResponse

    @POST("/auth/refresh")
    suspend fun refresh(@Body body: RefreshRequest): RefreshResponse

    @GET("/events/active")
    suspend fun activeEvent(): EventDto?

    @GET("/events/{id}/entries")
    suspend fun entries(@Path("id") eventId: Long): List<EntryDto>

    @GET("/events/{id}/ratings/me")
    suspend fun myRating(@Path("id") eventId: Long): RatingDto

    @PUT("/events/{id}/ratings/me")
    suspend fun saveRating(@Path("id") eventId: Long, @Body body: RatingUpsertRequest)

    @POST("/events/{id}/ratings/me/submit")
    suspend fun submitRating(@Path("id") eventId: Long)

    @GET("/events/{id}/predictions/me")
    suspend fun myPrediction(@Path("id") eventId: Long): PredictionDto

    @PUT("/events/{id}/predictions/me")
    suspend fun savePrediction(@Path("id") eventId: Long, @Body body: PredictionUpsertRequest)

    @POST("/events/{id}/predictions/me/submit")
    suspend fun submitPrediction(@Path("id") eventId: Long)

    @GET("/events/{id}/results")
    suspend fun results(@Path("id") eventId: Long): ResultsDto
}

class AppViewModel(private val api: EscApi, private val tokenStore: TokenStore, private val draftStore: DraftStore) : ViewModel() {
    var state by mutableStateOf(AppState())
        private set

    init {
        viewModelScope.launch { tryRestoreSession() }
    }

    private suspend fun tryRestoreSession() {
        val user = tokenStore.readUser()
        if (user != null) {
            state = state.copy(user = user)
            loadEventData()
        }
    }

    fun login(username: String, password: String) {
        viewModelScope.launch {
            runCatching {
                api.login(LoginRequest(username, password))
            }.onSuccess {
                tokenStore.save(it.accessToken, it.refreshToken, it.user)
                state = state.copy(user = it.user, error = null)
                loadEventData()
            }.onFailure {
                state = state.copy(error = it.message)
            }
        }
    }

    fun logout() {
        viewModelScope.launch {
            tokenStore.clear()
            draftStore.clear()
            state = AppState()
        }
    }

    fun loadEventData() {
        viewModelScope.launch {
            runCatching {
                val event = api.activeEvent()
                if (event == null) return@runCatching Triple<EventDto?, List<EntryDto>, Unit>(null, emptyList(), Unit)
                val entries = api.entries(event.id)
                val rating = api.myRating(event.id)
                val prediction = api.myPrediction(event.id)

                val cachedRating = draftStore.readRatingDraft(event.id)
                val cachedPrediction = draftStore.readPredictionDraft(event.id)

                val ratingMap = if (rating.items.isNotEmpty()) {
                    rating.items.associate { it.entryId to it.points }
                } else {
                    cachedRating
                }
                val predictionOrder = if (prediction.items.isNotEmpty()) {
                    prediction.items.sortedBy { it.rank }.map { it.entryId }
                } else {
                    cachedPrediction.ifEmpty { entries.map { it.id } }
                }
                state = state.copy(
                    event = event,
                    entries = entries,
                    ratingMap = ratingMap.toMutableMap(),
                    predictionOrder = predictionOrder.toMutableList(),
                    ratingSubmitted = rating.status == "submitted",
                    predictionSubmitted = prediction.status == "submitted",
                    error = null
                )
                if (event.status == "finished") {
                    state = state.copy(results = api.results(event.id))
                }
                syncOfflineDrafts(event.id)
                Triple(event, entries, Unit)
            }.onFailure {
                state = state.copy(error = it.message)
            }
        }
    }

    private suspend fun syncOfflineDrafts(eventId: Long) {
        val draftRating = draftStore.readRatingDraft(eventId)
        if (draftRating.isNotEmpty() && !state.ratingSubmitted) {
            api.saveRating(eventId, RatingUpsertRequest(draftRating.map { RatingItemBody(it.key, it.value) }))
            draftStore.clearRatingDraft(eventId)
        }
        val draftPrediction = draftStore.readPredictionDraft(eventId)
        if (draftPrediction.isNotEmpty() && !state.predictionSubmitted) {
            api.savePrediction(
                eventId,
                PredictionUpsertRequest(draftPrediction.mapIndexed { index, id -> PredictionItemBody(id, index + 1) })
            )
            draftStore.clearPredictionDraft(eventId)
        }
    }

    fun setRating(entryId: Long, points: Int?) {
        if (state.ratingSubmitted) return
        val map = state.ratingMap.toMutableMap()
        if (points == null) {
            map.remove(entryId)
        } else {
            map.entries.removeAll { it.value == points }
            map[entryId] = points
        }
        state = state.copy(ratingMap = map)
        state.event?.let { event -> viewModelScope.launch { draftStore.writeRatingDraft(event.id, map) } }
    }

    fun saveRating() {
        val event = state.event ?: return
        val items = state.ratingMap.map { RatingItemBody(it.key, it.value) }
        viewModelScope.launch {
            runCatching { api.saveRating(event.id, RatingUpsertRequest(items)) }
                .onSuccess { state = state.copy(message = "Rating gespeichert") }
                .onFailure {
                    draftStore.writeRatingDraft(event.id, state.ratingMap)
                    state = state.copy(message = "Offline gespeichert")
                }
        }
    }

    fun submitRating() {
        val event = state.event ?: return
        viewModelScope.launch {
            runCatching { api.submitRating(event.id) }
                .onSuccess { state = state.copy(ratingSubmitted = true, message = "Rating eingereicht") }
                .onFailure { state = state.copy(error = it.message) }
        }
    }

    fun movePrediction(index: Int, delta: Int) {
        if (state.predictionSubmitted) return
        val target = index + delta
        if (target < 0 || target >= state.predictionOrder.size) return
        val list = state.predictionOrder.toMutableList()
        val temp = list[index]
        list[index] = list[target]
        list[target] = temp
        state = state.copy(predictionOrder = list)
        state.event?.let { event -> viewModelScope.launch { draftStore.writePredictionDraft(event.id, list) } }
    }

    fun savePrediction() {
        val event = state.event ?: return
        val items = state.predictionOrder.mapIndexed { index, entryId -> PredictionItemBody(entryId, index + 1) }
        viewModelScope.launch {
            runCatching { api.savePrediction(event.id, PredictionUpsertRequest(items)) }
                .onSuccess { state = state.copy(message = "Prediction gespeichert") }
                .onFailure {
                    draftStore.writePredictionDraft(event.id, state.predictionOrder)
                    state = state.copy(message = "Offline gespeichert")
                }
        }
    }

    fun submitPrediction() {
        val event = state.event ?: return
        viewModelScope.launch {
            runCatching { api.submitPrediction(event.id) }
                .onSuccess { state = state.copy(predictionSubmitted = true, message = "Prediction eingereicht") }
                .onFailure { state = state.copy(error = it.message) }
        }
    }
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val tokenStore = TokenStore(this)
        val authInterceptor = Interceptor { chain ->
            val token = tokenStore.readAccessTokenBlocking()
            val request = chain.request().newBuilder().apply {
                if (!token.isNullOrBlank()) addHeader("Authorization", "Bearer $token")
            }.build()
            chain.proceed(request)
        }

        val client = OkHttpClient.Builder()
            .addInterceptor(authInterceptor)
            .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BASIC))
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(15, TimeUnit.SECONDS)
            .build()

        val retrofit = Retrofit.Builder()
            .baseUrl(BuildConfig.API_BASE_URL)
            .addConverterFactory(
                kotlinx.serialization.json.Json { ignoreUnknownKeys = true }
                    .let { json ->
                        com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory(
                            "application/json".toMediaType(),
                            json
                        )
                    }
            )
            .client(client)
            .build()

        val api = retrofit.create(EscApi::class.java)
        val draftStore = DraftStore(this)
        val vmFactory = object : ViewModelProvider.Factory {
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                @Suppress("UNCHECKED_CAST")
                return AppViewModel(api, tokenStore, draftStore) as T
            }
        }

        setContent {
            val viewModel = androidx.lifecycle.viewmodel.compose.viewModel<AppViewModel>(factory = vmFactory)
            AppScreen(viewModel)
        }
    }
}

@Composable
private fun AppScreen(viewModel: AppViewModel) {
    val state = viewModel.state
    var tab by remember { mutableStateOf(0) }

    MaterialTheme {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("ESCAPP") },
                    actions = {
                        state.user?.let {
                            Text(it.displayName, modifier = Modifier.padding(end = 12.dp))
                            TextButton(onClick = viewModel::logout) { Text("Logout") }
                        }
                    }
                )
            }
        ) { padding ->
            Column(modifier = Modifier.padding(padding).padding(16.dp).fillMaxSize(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                if (state.user == null) {
                    LoginCard(onLogin = viewModel::login, error = state.error)
                } else if (state.event == null) {
                    Text("Kein aktives Event verfügbar")
                } else {
                    Text("${state.event.name} · ${state.event.status}")
                    TabRow(selectedTabIndex = tab) {
                        Tab(selected = tab == 0, onClick = { tab = 0 }, text = { Text("Rating") })
                        Tab(selected = tab == 1, onClick = { tab = 1 }, text = { Text("Prediction") })
                        Tab(selected = tab == 2, onClick = { tab = 2 }, text = { Text("Ergebnis") })
                        Tab(selected = tab == 3, onClick = { tab = 3 }, text = { Text("Einstellungen") })
                    }
                    when (tab) {
                        0 -> RatingScreen(state, onSetRating = viewModel::setRating, onSave = viewModel::saveRating, onSubmit = viewModel::submitRating)
                        1 -> PredictionScreen(state, onMove = viewModel::movePrediction, onSave = viewModel::savePrediction, onSubmit = viewModel::submitPrediction)
                        2 -> ResultsScreen(state)
                        3 -> SettingsScreen(onReload = viewModel::loadEventData)
                    }
                    state.message?.let { Text(it, color = MaterialTheme.colorScheme.primary) }
                    state.error?.let { Text(it, color = MaterialTheme.colorScheme.error) }
                }
            }
        }
    }
}

@Composable
private fun LoginCard(onLogin: (String, String) -> Unit, error: String?) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    Card {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            OutlinedTextField(value = username, onValueChange = { username = it }, label = { Text("Benutzername") })
            OutlinedTextField(value = password, onValueChange = { password = it }, label = { Text("Passwort") })
            Button(onClick = { onLogin(username, password) }) { Text("Login") }
            error?.let { Text(it, color = MaterialTheme.colorScheme.error) }
        }
    }
}

@Composable
private fun RatingScreen(state: AppState, onSetRating: (Long, Int?) -> Unit, onSave: () -> Unit, onSubmit: () -> Unit) {
    val points = listOf(12, 10, 8, 7, 6, 5, 4, 3, 2, 1)
    LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxSize()) {
        itemsIndexed(state.entries) { _, entry ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Text(entry.countryName)
                var expanded by remember { mutableStateOf(false) }
                Box {
                    OutlinedButton(onClick = { expanded = true }, enabled = !state.ratingSubmitted && state.event?.status == "open") {
                        Text(state.ratingMap[entry.id]?.toString() ?: "0")
                    }
                    DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                        DropdownMenuItem(text = { Text("0") }, onClick = { onSetRating(entry.id, null); expanded = false })
                        points.forEach {
                            DropdownMenuItem(text = { Text(it.toString()) }, onClick = { onSetRating(entry.id, it); expanded = false })
                        }
                    }
                }
            }
        }
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = onSave, enabled = !state.ratingSubmitted) { Text("Entwurf speichern") }
                Button(onClick = onSubmit, enabled = !state.ratingSubmitted) { Text("Einreichen") }
            }
        }
    }
}

@Composable
private fun PredictionScreen(state: AppState, onMove: (Int, Int) -> Unit, onSave: () -> Unit, onSubmit: () -> Unit) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxSize()) {
        itemsIndexed(state.predictionOrder) { index, id ->
            val entry = state.entries.firstOrNull { it.id == id }
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Text("${index + 1}. ${entry?.countryName ?: id}")
                Row {
                    IconButton(onClick = { onMove(index, -1) }, enabled = !state.predictionSubmitted) { Text("↑") }
                    IconButton(onClick = { onMove(index, 1) }, enabled = !state.predictionSubmitted) { Text("↓") }
                }
            }
        }
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = onSave, enabled = !state.predictionSubmitted) { Text("Entwurf speichern") }
                Button(onClick = onSubmit, enabled = !state.predictionSubmitted) { Text("Einreichen") }
            }
        }
    }
}

@Composable
private fun ResultsScreen(state: AppState) {
    val results = state.results
    if (state.event?.status != "finished") {
        Text("Ergebnisse werden nach Abschluss angezeigt")
        return
    }
    if (results == null) {
        Text("Ergebnisse laden...")
        return
    }
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("A: ${results.me?.scoreAgainstRatingsRanking?.points ?: 0} Punkte, Platz ${results.me?.scoreAgainstRatingsRanking?.rank ?: "-"}")
        Text("B: ${results.me?.scoreAgainstOfficialRanking?.points ?: 0} Punkte, Platz ${results.me?.scoreAgainstOfficialRanking?.rank ?: "-"}")
        Text("Tie-Break: Exakte Treffer > +/-1 > geringste Gesamtabweichung > Name")
    }
}

@Composable
private fun SettingsScreen(onReload: () -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Synchronisation: server-wins bei Konflikten")
        Button(onClick = onReload) { Text("Neu laden") }
    }
}

class TokenStore(private val activity: ComponentActivity) {
    private val accessKey = stringPreferencesKey("access_token")
    private val refreshKey = stringPreferencesKey("refresh_token")
    private val userKey = stringPreferencesKey("user_json")

    suspend fun save(accessToken: String, refreshToken: String, user: UserDto) {
        activity.dataStore.edit {
            it[accessKey] = accessToken
            it[refreshKey] = refreshToken
            it[userKey] = Json.encodeToString(UserDto.serializer(), user)
        }
    }

    fun readAccessTokenBlocking(): String? {
        return runCatching { kotlinx.coroutines.runBlocking { activity.dataStore.data.first()[accessKey] } }.getOrNull()
    }

    suspend fun readUser(): UserDto? {
        val raw = activity.dataStore.data.first()[userKey] ?: return null
        return runCatching { Json.decodeFromString(UserDto.serializer(), raw) }.getOrNull()
    }

    suspend fun clear() {
        activity.dataStore.edit { it.clear() }
    }
}

class DraftStore(private val activity: ComponentActivity) {
    private fun ratingKey(eventId: Long): Preferences.Key<String> = stringPreferencesKey("rating_$eventId")
    private fun predictionKey(eventId: Long): Preferences.Key<String> = stringPreferencesKey("prediction_$eventId")

    suspend fun writeRatingDraft(eventId: Long, map: Map<Long, Int>) {
        val json = Json.encodeToString(map)
        activity.dataStore.edit { it[ratingKey(eventId)] = json }
    }

    suspend fun readRatingDraft(eventId: Long): Map<Long, Int> {
        val raw = activity.dataStore.data.first()[ratingKey(eventId)] ?: return emptyMap()
        return runCatching { Json.decodeFromString<Map<Long, Int>>(raw) }.getOrDefault(emptyMap())
    }

    suspend fun clearRatingDraft(eventId: Long) {
        activity.dataStore.edit { it.remove(ratingKey(eventId)) }
    }

    suspend fun writePredictionDraft(eventId: Long, list: List<Long>) {
        activity.dataStore.edit { it[predictionKey(eventId)] = Json.encodeToString(list) }
    }

    suspend fun readPredictionDraft(eventId: Long): List<Long> {
        val raw = activity.dataStore.data.first()[predictionKey(eventId)] ?: return emptyList()
        return runCatching { Json.decodeFromString<List<Long>>(raw) }.getOrDefault(emptyList())
    }

    suspend fun clearPredictionDraft(eventId: Long) {
        activity.dataStore.edit { it.remove(predictionKey(eventId)) }
    }

    suspend fun clear() {
        activity.dataStore.edit { it.clear() }
    }
}
