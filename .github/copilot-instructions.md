# ESC-App Copilot Instructions

## Project Overview
Eurovision Finale Tippspiel – Full-Stack application with:
- **Backend**: Node.js/Express, MariaDB, JWT Auth
- **Frontend**: React + TypeScript (Vite)
- **Android**: Kotlin + Jetpack Compose, Retrofit, Material3

## Android App Architecture
- `android/app/src/main/java/com/escapp/mobile/`
  - `model/` – API DTOs (Login, Event, Entry, Rating, Prediction, Results)
  - `data/` – EscApi (Retrofit), TokenStore, DraftStore (DataStore)
  - `viewmodel/` – AppViewModel with immutable UiState
  - `ui/theme/` – EscAppTheme (Material3 ColorScheme from design tokens)
  - `ui/screen/` – LoginScreen, RatingScreen, PredictionScreen, ResultsScreen
  - `MainActivity.kt` – OkHttp setup, auth interceptor, Retrofit, ViewModel wiring

## Design Tokens
- Source: `frontend/public/escapp-design-tokens.css`
- Android mapping in `EscAppTheme.kt`: Blue900=primary, Blue700=secondary, DarkBlue900=tertiary, Red700=error, Blue100=background, White=surface

## API
- Production: `https://api.basisadresse.de/escappapi/`
- Local dev: `http://localhost:4000`
- Android uses relative paths in Retrofit (e.g. `auth/login`, `events/active`)

## Conventions
- Kotlin: kotlinx-serialization for JSON, Compose for UI
- All strings in German
- Participant-only functions in Android (no admin)
- Offline drafts cached in DataStore
- Work through each checklist item systematically
- Keep communication concise and focused
- Follow development best practices
