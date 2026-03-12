package com.escapp.mobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ExitToApp
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowLeft
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import com.escapp.mobile.data.DraftStore
import com.escapp.mobile.data.EscApi
import com.escapp.mobile.data.TokenStore
import com.escapp.mobile.model.RefreshRequest
import com.escapp.mobile.ui.screen.*
import com.escapp.mobile.ui.theme.*
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import com.escapp.mobile.viewmodel.AppViewModel
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import okhttp3.Interceptor
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import java.util.concurrent.TimeUnit

private data class TutorialStep(
    val title: String,
    val text: String,
    val tabIndex: Int,
    val target: TutorialTarget
)

private enum class TutorialTarget {
    TAB_RATING,
    TAB_PREDICTION,
    TAB_RESULTS,
    RATING_ACTIONS,
    PREDICTION_LIST,
    PREDICTION_ACTIONS,
    RESULTS_OVERVIEW
}

private fun Modifier.tutorialHighlight(active: Boolean): Modifier {
    if (!active) return this
    return this.border(
        width = 3.dp,
        color = Color(0xFFFFC107)
    )
}

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val tokenStore = TokenStore(applicationContext)
        val draftStore = DraftStore(applicationContext)
        val json = Json { ignoreUnknownKeys = true }

        /* ── Auth interceptor: attaches Bearer token to every request ── */
        val authInterceptor = Interceptor { chain ->
            val token = tokenStore.readAccessTokenBlocking()
            val requestBuilder = chain.request().newBuilder()
            if (!token.isNullOrBlank()) {
                requestBuilder.addHeader("Authorization", "Bearer $token")
            }
            chain.proceed(requestBuilder.build())
        }

        /* ── Token-refresh interceptor: retries on 401 ── */
        val refreshInterceptor = Interceptor { chain ->
            val response = chain.proceed(chain.request())
            if (response.code == 401 && !chain.request().url.encodedPath.contains("auth/")) {
                response.close()
                val refreshToken = runBlocking { tokenStore.readRefreshToken() }
                if (!refreshToken.isNullOrBlank()) {
                    val body = json.encodeToString(RefreshRequest.serializer(), RefreshRequest(refreshToken))
                    val refreshRequest = okhttp3.Request.Builder()
                        .url("${BuildConfig.API_BASE_URL}auth/refresh")
                        .post(body.toByteArray().let {
                            okhttp3.RequestBody.create("application/json".toMediaType(), it)
                        })
                        .build()
                    val refreshResponse = chain.connection()?.let {
                        OkHttpClient().newCall(refreshRequest).execute()
                    }
                    if (refreshResponse?.isSuccessful == true) {
                        val respBody = refreshResponse.body?.string()
                        if (respBody != null) {
                            val parsed = json.decodeFromString<com.escapp.mobile.model.RefreshResponse>(respBody)
                            runBlocking { tokenStore.saveAccessToken(parsed.accessToken) }
                            val retry = chain.request().newBuilder()
                                .header("Authorization", "Bearer ${parsed.accessToken}")
                                .build()
                            return@Interceptor chain.proceed(retry)
                        }
                    }
                }
                // Refresh also failed – return the original 401
                // Need to re-issue original request since we closed it
                return@Interceptor chain.proceed(chain.request())
            }
            response
        }

        val client = OkHttpClient.Builder()
            .addInterceptor(authInterceptor)
            .addInterceptor(refreshInterceptor)
            .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BASIC))
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(15, TimeUnit.SECONDS)
            .build()

        val retrofit = Retrofit.Builder()
            .baseUrl(BuildConfig.API_BASE_URL)
            .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
            .client(client)
            .build()

        val api = retrofit.create(EscApi::class.java)

        val vmFactory = object : ViewModelProvider.Factory {
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                @Suppress("UNCHECKED_CAST")
                return AppViewModel(api, tokenStore, draftStore) as T
            }
        }

        setContent {
            EscAppTheme {
                val vm = viewModel<AppViewModel>(factory = vmFactory)
                EscApp(vm)
            }
        }
    }
}

/* ═══════════════════════════════════════════════════════════════════════
   Root composable
   ═══════════════════════════════════════════════════════════════════════ */

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun EscApp(vm: AppViewModel) {
    val ui = vm.ui
    var tab by remember { mutableIntStateOf(0) }
    var currentScreen by remember { mutableStateOf("login") }  // "login", "register", "terms"
    var registerSuccess by remember { mutableStateOf(false) }
    var tutorialOpen by remember { mutableStateOf(false) }
    var tutorialIndex by remember { mutableIntStateOf(0) }

    val tutorialSteps = remember {
        listOf(
            TutorialStep(
                title = "Tab: Bewertung",
                text = "Hier gibt es nichts zu gewinnen, aber Sie bewerten die Songs nach Ihrem eigenen Geschmack.",
                tabIndex = 0,
                target = TutorialTarget.TAB_RATING
            ),
            TutorialStep(
                title = "Bewertung speichern",
                text = "Entwürfe können unvollständig gespeichert werden. Beim Einreichen wird die Bewertung gesperrt.",
                tabIndex = 0,
                target = TutorialTarget.RATING_ACTIONS
            ),
            TutorialStep(
                title = "Tab: Tipp",
                text = "Das ist Ihre Gewinnchance, tippen Sie die tatsächliche Platzierung eines Songs, für alle Songs (jeder Rang darf nur einmal vorkommen).",
                tabIndex = 1,
                target = TutorialTarget.TAB_PREDICTION
            ),
            TutorialStep(
                title = "Tippliste sortieren",
                text = "Sortieren Sie per Drag-and-Drop oder über die Pfeile. So legen Sie Ihre prognostizierte Endreihenfolge fest.",
                tabIndex = 1,
                target = TutorialTarget.PREDICTION_LIST
            ),
            TutorialStep(
                title = "Tipp speichern",
                text = "Auch Tipps können als Entwurf gespeichert und später vervollständigt werden.",
                tabIndex = 1,
                target = TutorialTarget.PREDICTION_ACTIONS
            ),
            TutorialStep(
                title = "Tab: Ergebnis",
                text = "Nach dem Event sehen Sie hier Ihre Punkte und die Ranglisten gegen internes und offizielles Ranking.",
                tabIndex = 2,
                target = TutorialTarget.TAB_RESULTS
            ),
            TutorialStep(
                title = "Ergebnisansicht",
                text = "Hier werden Ihre Scores, Top-3 und Tie-Break-Infos erklärt und eingeordnet.",
                tabIndex = 2,
                target = TutorialTarget.RESULTS_OVERVIEW
            )
        )
    }

    val tutorialStep = tutorialSteps[tutorialIndex]

    val snackbarHostState = remember { SnackbarHostState() }

    // Show snackbar messages
    LaunchedEffect(ui.message) {
        ui.message?.let {
            snackbarHostState.showSnackbar(it, duration = SnackbarDuration.Short)
            vm.clearMessage()
        }
    }
    LaunchedEffect(ui.error) {
        if (ui.user != null) {
            ui.error?.let {
                snackbarHostState.showSnackbar("Fehler: $it", duration = SnackbarDuration.Long)
                vm.clearError()
            }
        }
    }

    LaunchedEffect(tutorialOpen, tutorialIndex) {
        if (tutorialOpen && tab != tutorialStep.tabIndex) {
            tab = tutorialStep.tabIndex
        }
    }

    Box(modifier = Modifier.fillMaxSize()) {
        Scaffold(
            snackbarHost = { SnackbarHost(snackbarHostState) },
            topBar = {
                if (ui.user != null) {
                    TopAppBar(
                        title = {
                            Text(
                                "ESC Tippspiel",
                                color = MaterialTheme.colorScheme.onPrimary
                            )
                        },
                        colors = TopAppBarDefaults.topAppBarColors(
                            containerColor = Blue900,
                            titleContentColor = MaterialTheme.colorScheme.onPrimary
                        ),
                        actions = {
                            Text(
                                ui.user.displayName,
                                color = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.8f),
                                style = MaterialTheme.typography.bodyMedium,
                                modifier = Modifier.padding(end = 4.dp)
                            )
                            IconButton(onClick = { vm.loadEventData() }) {
                                Icon(
                                    Icons.Default.Refresh,
                                    contentDescription = "Neu laden",
                                    tint = MaterialTheme.colorScheme.onPrimary
                                )
                            }
                            TextButton(
                                onClick = {
                                    tutorialIndex = 0
                                    tutorialOpen = true
                                    tab = tutorialSteps[0].tabIndex
                                },
                                enabled = ui.event != null,
                                modifier = Modifier.tutorialHighlight(
                                    tutorialOpen && tutorialStep.target == TutorialTarget.TAB_RATING
                                )
                            ) {
                                Text("So geht's", color = MaterialTheme.colorScheme.onPrimary)
                            }
                            IconButton(onClick = { vm.logout() }) {
                                Icon(
                                    Icons.AutoMirrored.Filled.ExitToApp,
                                    contentDescription = "Abmelden",
                                    tint = MaterialTheme.colorScheme.onPrimary
                                )
                            }
                        }
                    )
                }
            },
            containerColor = MaterialTheme.colorScheme.background
        ) { padding ->

        /* ── Login gate ── */
            if (ui.user == null) {
                when (currentScreen) {
                    "login" -> {
                        LoginScreen(
                            onLogin = vm::login,
                            onNavigateToRegister = {
                                currentScreen = "register"
                                registerSuccess = false
                            },
                            isLoading = ui.loading,
                            error = ui.error
                        )
                    }
                    "register" -> {
                        RegisterScreen(
                            onRegister = { displayName, fullName, username, password, acceptedTerms ->
                                vm.register(displayName, fullName, username, password, acceptedTerms) {
                                    registerSuccess = true
                                }
                            },
                            onNavigateToLogin = { currentScreen = "login" },
                            onShowTerms = { currentScreen = "terms" },
                            isLoading = ui.loading,
                            error = ui.error,
                            success = registerSuccess
                        )
                    }
                    "terms" -> {
                        TermsScreen(
                            onNavigateBack = { currentScreen = "register" }
                        )
                    }
                }
                return@Scaffold
            }

        /* ── No active event ── */
            if (ui.event == null) {
                Box(Modifier.fillMaxSize().padding(padding).padding(32.dp)) {
                    Card(colors = CardDefaults.cardColors(containerColor = Blue200)) {
                        Text(
                            if (ui.loading) "Lade Event-Daten…" else "Kein aktives Event vorhanden.",
                            modifier = Modifier.padding(24.dp),
                            style = MaterialTheme.typography.bodyLarge,
                            color = Blue900
                        )
                    }
                }
                return@Scaffold
            }

        /* ── Main content with tabs ── */
            Column(modifier = Modifier.padding(padding).fillMaxSize()) {

            /* Event header */
            Surface(
                color = Blue200,  // primaryContainer
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp)) {
                    Text(
                        ui.event.name,
                        style = MaterialTheme.typography.titleMedium,
                        color = DarkBlue1000
                    )
                    Text(
                        "Hallo ${ui.user.displayName} · Status: ${statusLabel(ui.event.status)}",
                        style = MaterialTheme.typography.bodySmall,
                        color = Blue700
                    )
                }
            }

            /* Tab row */
                TabRow(
                    selectedTabIndex = tab,
                    containerColor = MaterialTheme.colorScheme.surface,
                    contentColor = Blue900,
                    indicator = { tabPositions ->
                        if (tab < tabPositions.size) {
                            TabRowDefaults.SecondaryIndicator(
                                modifier = Modifier.tabIndicatorOffset(tabPositions[tab]),
                                color = Blue900
                            )
                        }
                    }
                ) {
                Tab(
                    selected = tab == 0,
                    onClick = { tab = 0 },
                    text = { Text("Bewertung") },
                    selectedContentColor = Blue900,
                    unselectedContentColor = Blue700,
                    modifier = Modifier.tutorialHighlight(tutorialOpen && tutorialStep.target == TutorialTarget.TAB_RATING)
                )
                Tab(
                    selected = tab == 1,
                    onClick = { tab = 1 },
                    text = { Text("Tipp") },
                    selectedContentColor = Blue900,
                    unselectedContentColor = Blue700,
                    modifier = Modifier.tutorialHighlight(tutorialOpen && tutorialStep.target == TutorialTarget.TAB_PREDICTION)
                )
                Tab(
                    selected = tab == 2,
                    onClick = { tab = 2 },
                    text = { Text("Ergebnis") },
                    selectedContentColor = Blue900,
                    unselectedContentColor = Blue700,
                    modifier = Modifier.tutorialHighlight(tutorialOpen && tutorialStep.target == TutorialTarget.TAB_RESULTS)
                )
                }

            /* Tab content */
                Box(modifier = Modifier.weight(1f).padding(horizontal = 12.dp, vertical = 8.dp)) {
                    when (tab) {
                        0 -> RatingScreen(
                            entries = ui.entries,
                            ratingMap = ui.ratingMap,
                            isSubmitted = ui.ratingSubmitted,
                            eventOpen = ui.event.status == "open",
                            onSetRating = vm::setRating,
                            onSave = vm::saveRating,
                            onSubmit = vm::submitRating,
                            highlightActions = tutorialOpen && tutorialStep.target == TutorialTarget.RATING_ACTIONS
                        )
                        1 -> PredictionScreen(
                            entries = ui.entries,
                            predictionOrder = ui.predictionOrder,
                            isSubmitted = ui.predictionSubmitted,
                            eventOpen = ui.event.status == "open",
                            onMove = vm::movePrediction,
                            onMoveTo = vm::movePredictionToPosition,
                            onSave = vm::savePrediction,
                            onSubmit = vm::submitPrediction,
                            highlightList = tutorialOpen && tutorialStep.target == TutorialTarget.PREDICTION_LIST,
                            highlightActions = tutorialOpen && tutorialStep.target == TutorialTarget.PREDICTION_ACTIONS
                        )
                        2 -> ResultsScreen(
                            eventStatus = ui.event.status,
                            results = ui.results,
                            highlightOverview = tutorialOpen && tutorialStep.target == TutorialTarget.RESULTS_OVERVIEW
                        )
                    }
                }
            }

        }

        if (tutorialOpen) {
            TutorialOverlay(
                step = tutorialStep,
                stepIndex = tutorialIndex,
                stepCount = tutorialSteps.size,
                onPrevious = { tutorialIndex = (tutorialIndex - 1).coerceAtLeast(0) },
                onNext = { tutorialIndex = (tutorialIndex + 1).coerceAtMost(tutorialSteps.lastIndex) },
                onClose = { tutorialOpen = false }
            )
        }
    }
}

@Composable
private fun TutorialOverlay(
    step: TutorialStep,
    stepIndex: Int,
    stepCount: Int,
    onPrevious: () -> Unit,
    onNext: () -> Unit,
    onClose: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.56f))
    ) {
        Surface(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 12.dp),
            color = MaterialTheme.colorScheme.surface,
            tonalElevation = 8.dp,
            shape = MaterialTheme.shapes.large
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                modifier = Modifier.padding(horizontal = 10.dp, vertical = 8.dp)
            ) {
                IconButton(onClick = onPrevious, enabled = stepIndex > 0) {
                    Icon(Icons.AutoMirrored.Filled.KeyboardArrowLeft, contentDescription = "Zurück")
                }
                Text(
                    "${stepIndex + 1} / $stepCount",
                    style = MaterialTheme.typography.labelLarge,
                    fontWeight = FontWeight.Bold,
                    color = Blue900
                )
                IconButton(onClick = onNext, enabled = stepIndex < stepCount - 1) {
                    Icon(Icons.AutoMirrored.Filled.KeyboardArrowRight, contentDescription = "Weiter")
                }
                IconButton(onClick = onClose) {
                    Icon(Icons.Default.Close, contentDescription = "Tutorial schließen", tint = Red700)
                }
            }
        }

        Card(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 80.dp, start = 12.dp, end = 12.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            shape = MaterialTheme.shapes.medium
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(
                    step.title,
                    style = MaterialTheme.typography.titleMedium,
                    color = Blue900,
                    fontWeight = FontWeight.Bold
                )
                Spacer(Modifier.height(6.dp))
                Text(
                    step.text,
                    style = MaterialTheme.typography.bodyMedium,
                    color = DarkBlue900
                )
            }
        }
    }
}

private fun statusLabel(status: String): String = when (status) {
    "draft" -> "Entwurf"
    "open" -> "Offen"
    "locked" -> "Gesperrt"
    "finished" -> "Beendet"
    else -> status
}
