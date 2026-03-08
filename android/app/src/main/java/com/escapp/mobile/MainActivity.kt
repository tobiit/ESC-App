package com.escapp.mobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ExitToApp
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
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
                        containerColor = Blue900,               // semantic-color-action-primary-resting
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
        containerColor = MaterialTheme.colorScheme.background  // Blue100
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
                contentColor = Blue900,                              // active tab color
                indicator = { tabPositions ->
                    if (tab < tabPositions.size) {
                        TabRowDefaults.SecondaryIndicator(
                            modifier = Modifier.tabIndicatorOffset(tabPositions[tab]),
                            color = Blue900  // semantic-color-action-primary-resting
                        )
                    }
                }
            ) {
                Tab(
                    selected = tab == 0,
                    onClick = { tab = 0 },
                    text = { Text("Bewertung") },
                    selectedContentColor = Blue900,
                    unselectedContentColor = Blue700
                )
                Tab(
                    selected = tab == 1,
                    onClick = { tab = 1 },
                    text = { Text("Tipp") },
                    selectedContentColor = Blue900,
                    unselectedContentColor = Blue700
                )
                Tab(
                    selected = tab == 2,
                    onClick = { tab = 2 },
                    text = { Text("Ergebnis") },
                    selectedContentColor = Blue900,
                    unselectedContentColor = Blue700
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
                        onSubmit = vm::submitRating
                    )
                    1 -> PredictionScreen(
                        entries = ui.entries,
                        predictionOrder = ui.predictionOrder,
                        isSubmitted = ui.predictionSubmitted,
                        eventOpen = ui.event.status == "open",
                        onMove = vm::movePrediction,
                        onMoveTo = vm::movePredictionToPosition,
                        onSave = vm::savePrediction,
                        onSubmit = vm::submitPrediction
                    )
                    2 -> ResultsScreen(
                        eventStatus = ui.event.status,
                        results = ui.results
                    )
                }
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
