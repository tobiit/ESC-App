# ESCAPP – Eurovision Finale Tippspiel

Produktionsnahe Full-Stack-Lösung für ein Eurovision Finale Tippspiel mit:

- Web-App für Teilnehmer
- Web-Admin-Backend
- REST-Backend mit MariaDB
- Native Android-App (Kotlin/Compose)

---

## 1) Architektur

### Module

- `backend/`
  - Node.js (Express), JWT Auth, Rollenmodell (`admin`, `participant`)
  - MariaDB via SQL-Migrationen
  - Audit-Logging, Rate-Limiting, Result-Berechnung
- `frontend/`
  - React + TypeScript
  - Teilnehmer- und Admin-Bereich
  - Nutzung der vorhandenen Design-Tokens
- `android/`
  - Kotlin + Jetpack Compose
  - Retrofit/OkHttp, lokales Draft-Caching

### Orchestrierung

- `docker-compose.yml` für lokale Entwicklungsumgebung (DB, Backend, Frontend)
- `scripts/integration-test.sh` für End-to-End API Smoke-Test

---

## 2) Features

### Teilnehmer

- Login / Logout
- Rating (ESC-Punkte 1–8, 10, 12 auf genau 10 verschiedene Entries)
- Prediction (vollständige Rangliste aller Entries)
- Getrennte Entwürfe und getrennte Einreichung (Rating/Prediction)
- Nach Einreichung: Sperre bis Admin-Reset
- Ergebnisansicht bei `event.status = finished`

### Admin

- Teilnehmerverwaltung (anlegen, ändern, löschen, Passwort reset)
- Eventverwaltung (draft/open/locked/finished)
- Entry-Verwaltung pro Event
- Official Result Pflege
- Reset/Korrektur von Teilnehmer-Rating und Prediction

### Berechnung

- Referenzrangliste A aus allen eingereichten Ratings
- Gewinnerliste A gegen Referenzrangliste A
- Gewinnerliste B gegen offizielles Ergebnis
- Tie-Breaks gemäß Spezifikation

---

## 3) Projektstruktur

```text
/backend
  /src
  /test
/frontend
  /src
  /public
/android
/scripts
docker-compose.yml
README.md
```

---

## 4) Datenbank und Migrationen

### Migrationen

- `backend/src/db/migrations/001_init.sql`

### Kern-Tabellen

- `users`
- `events`
- `entries`
- `ratings`, `rating_items`
- `predictions`, `prediction_items`
- `official_results`, `official_result_items`
- `refresh_tokens`
- `audit_logs`

### Technische Hinweise

- Zeitstempel werden in UTC gespeichert
- Constraints und Foreign Keys sind gesetzt
- Migrationsrunner führt SQL-Statements einzeln aus (MariaDB-kompatibel)

---

## 5) Lokaler Start (Container)

### Voraussetzungen

- Docker Compose **oder** Podman Compose

### Start

```bash
cd /home/tobiit/code
podman-compose up --build -d
```

Alternativ mit Docker:

```bash
cd /home/tobiit/code
docker compose up --build -d
```

### URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Health: http://localhost:4000/health
- MariaDB: localhost:3306

### Bootstrap-Admin

- Username: `admin`
- Passwort: `admin123`

### Stoppen

```bash
podman-compose down
```

---

## 6) Lokaler Start ohne Container

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Android

```bash
cd android
./gradlew assembleDebug
```

---

## 7) Tests und Verifikation

### Backend Unit Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Frontend Build

```bash
cd frontend
npm run build
```

### API Integration Smoke

```bash
cd /home/tobiit/code
./scripts/integration-test.sh
```

---

## 8) API Übersicht (Kern)

### Auth

- `POST /auth/login`
- `POST /auth/admin/login`
- `POST /auth/refresh`
- `POST /auth/logout`

### Events / Entries

- `GET /events/active`
- `GET /events/:id/entries`

### Teilnehmer

- `GET /events/:id/ratings/me`
- `PUT /events/:id/ratings/me`
- `POST /events/:id/ratings/me/submit`
- `GET /events/:id/predictions/me`
- `PUT /events/:id/predictions/me`
- `POST /events/:id/predictions/me/submit`
- `GET /events/:id/results`

### Admin

- `GET/POST/PUT/DELETE /admin/participants...`
- `GET/POST/PUT /admin/events...`
- `GET/POST/PUT/DELETE /admin/events/:id/entries...`
- `GET/PUT /admin/events/:id/officialresult`
- `GET/PUT/POST reset /admin/events/:id/ratings...`
- `GET/PUT/POST reset /admin/events/:id/predictions...`

---

## 9) Sicherheit

- BCrypt Password Hashing
- JWT Access + Refresh Tokens
- Refresh Token Speicherung als Hash
- Rate Limiting auf Login-Endpunkten
- Rollenbasierte Zugriffskontrolle
- Audit-Logging für kritische Änderungen

---

## 10) Design Tokens & Fonts

### Tokens

- Basis: `frontend/public/allianz-design-tokens.css`
- Einbindung: `@import` in `frontend/src/styles.css`

### Schriftart Umstellung auf Frutiger

- Fonts aus `design-tokens/font/`
  - `Frutiger.ttf`
  - `Frutiger_bold.ttf`
- Laufzeitkopie nach:
  - `frontend/public/font/Frutiger.ttf`
  - `frontend/public/font/Frutiger_bold.ttf`
- Globaler Override in `frontend/src/styles.css` über:
  - `@font-face`
  - `--core-font-family-primary`
  - `--semantic-font-family-body/headline/utility`

---

## 11) Betriebsablauf (Empfohlen)

1. Admin einloggen
2. Event anlegen und auf `open` setzen
3. Entries pflegen
4. Teilnehmer anlegen
5. Teilnehmer geben Rating + Prediction ab
6. Event auf `locked` oder `finished` setzen
7. Official Result eintragen
8. Ergebnisse in Teilnehmer- und Adminansicht prüfen

---

## 12) Troubleshooting

### Backend startet nicht

- Logs prüfen: `podman logs escapp-backend`
- DB erreichbar? `curl http://localhost:4000/health`

### Frontend zeigt alte Styles

- Hard-Reload im Browser (`Ctrl+Shift+R`)
- Container neu bauen: `podman-compose up --build -d frontend`

### Fonts werden nicht geladen

- Prüfen:
  - `http://localhost:5173/font/Frutiger.ttf`
  - `http://localhost:5173/font/Frutiger_bold.ttf`

### API Smoke schlägt fehl

- Backend Health prüfen
- Admin Login prüfen (`/auth/admin/login`)


