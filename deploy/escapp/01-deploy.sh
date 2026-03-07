#!/usr/bin/env bash
# ============================================================================
# ESC-App Deployment – App deployen (Clone/Pull, Build, Start)
# ============================================================================
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()  { echo -e "${BLUE}[DEPLOY]${NC} $*"; }
ok()   { echo -e "${GREEN}[  OK  ]${NC} $*"; }
warn() { echo -e "${YELLOW}[ WARN ]${NC} $*"; }
fail() { echo -e "${RED}[FEHLER]${NC} $*"; exit 1; }

[[ $EUID -eq 0 ]] || fail "Dieses Skript muss als root ausgeführt werden."

# ---------------------------------------------------------------------------
# Konfiguration laden
# ---------------------------------------------------------------------------
APP_DIR="${APP_DIR:-/opt/escapp}"
ENV_FILE="${APP_DIR}/.env"

if [[ -f "$ENV_FILE" ]]; then
    set -a; source "$ENV_FILE"; set +a
else
    fail ".env-Datei nicht gefunden unter ${ENV_FILE}. Bitte zuerst install.sh ausführen."
fi

GIT_REPO="${GIT_REPO:-https://github.com/tobiit/ESC-App.git}"
GIT_BRANCH="${GIT_BRANCH:-main}"
WEB_DOMAIN="${WEB_DOMAIN:-esc.basisadresse.de}"
API_DOMAIN="${API_DOMAIN:-api.basisadresse.de}"
WEB_ROOT="${WEB_ROOT:-/var/www/${WEB_DOMAIN}}"
COMPOSE_FILE="${APP_DIR}/deploy/escapp/docker-compose.prod.yml"

# ---------------------------------------------------------------------------
# Repository klonen oder aktualisieren
# ---------------------------------------------------------------------------
log "Repository aktualisieren …"
if [[ -d "${APP_DIR}/.git" ]]; then
    cd "$APP_DIR"
    git fetch origin
    git checkout "$GIT_BRANCH"
    git pull origin "$GIT_BRANCH"
    ok "Repository aktualisiert (Branch: ${GIT_BRANCH})."
else
    log "Klone Repository …"
    git clone -b "$GIT_BRANCH" "$GIT_REPO" "$APP_DIR"
    ok "Repository geklont nach ${APP_DIR}."
fi

cd "$APP_DIR"

# ---------------------------------------------------------------------------
# .env sicherstellen
# ---------------------------------------------------------------------------
if [[ ! -f "${APP_DIR}/.env" ]]; then
    fail ".env-Datei fehlt in ${APP_DIR}. Bitte aus der Vorlage erstellen."
fi

# ---------------------------------------------------------------------------
# Frontend bauen
# ---------------------------------------------------------------------------
log "Baue Frontend …"
cd "${APP_DIR}/frontend"

log "Installiere Frontend-Abhängigkeiten …"
npm ci --production=false 2>&1 | tail -1
ok "Frontend-Abhängigkeiten installiert."

log "Baue Vite-Produktionsbuild …"
VITE_API_URL="https://${API_DOMAIN}${API_PATH:-/escappapi}" npm run build 2>&1 | tail -5
ok "Frontend gebaut."

# ---------------------------------------------------------------------------
# Frontend-Build ins Web-Root kopieren
# ---------------------------------------------------------------------------
log "Kopiere Frontend-Build nach ${WEB_ROOT} …"
mkdir -p "$WEB_ROOT"
# Alte Dateien entfernen, neue kopieren
rm -rf "${WEB_ROOT:?}"/*
cp -r "${APP_DIR}/frontend/dist/"* "$WEB_ROOT/"

# Fonts kopieren (falls vorhanden)
if [[ -d "${APP_DIR}/frontend/public/font" ]]; then
    cp -r "${APP_DIR}/frontend/public/font" "$WEB_ROOT/"
    ok "Fonts kopiert."
fi

chown -R www-data:www-data "$WEB_ROOT"
ok "Frontend nach ${WEB_ROOT} deployt."

# ---------------------------------------------------------------------------
# Docker Compose: Backend + MariaDB starten
# ---------------------------------------------------------------------------
log "Starte Backend-Services (Docker Compose) …"
cd "$APP_DIR"

# Podman-Netzwerk mit DNS erstellen (falls noch nicht vorhanden)
if command -v podman &>/dev/null; then
    if ! podman network exists escapp-net 2>/dev/null; then
        log "Erstelle Podman-Netzwerk escapp-net mit DNS …"
        podman network create escapp-net
        ok "Netzwerk escapp-net erstellt."
    else
        ok "Netzwerk escapp-net existiert bereits."
    fi
fi

# Docker Compose starten/neu bauen
docker compose -f "$COMPOSE_FILE" --env-file "${APP_DIR}/.env" up -d --build --remove-orphans 2>&1 | tail -10
ok "Docker-Container gestartet."

# ---------------------------------------------------------------------------
# Warte auf Backend Health
# ---------------------------------------------------------------------------
log "Warte auf Backend Health-Check …"
MAX_WAIT=60
WAITED=0
while (( WAITED < MAX_WAIT )); do
    if curl -sf http://127.0.0.1:4000/health >/dev/null 2>&1; then
        ok "Backend ist healthy nach ${WAITED}s."
        break
    fi
    sleep 2
    WAITED=$((WAITED + 2))
done

if (( WAITED >= MAX_WAIT )); then
    warn "Backend Health-Check nach ${MAX_WAIT}s nicht erfolgreich."
    warn "Bitte manuell prüfen: docker logs escapp-backend"
else
    # Health-Response anzeigen
    HEALTH=$(curl -sf http://127.0.0.1:4000/health 2>/dev/null || echo '{"ok":false}')
    ok "Backend Health: ${HEALTH}"
fi

# ---------------------------------------------------------------------------
# Nginx neu laden (falls Konfiguration geändert)
# ---------------------------------------------------------------------------
if nginx -t 2>/dev/null; then
    systemctl reload nginx 2>/dev/null || true
    ok "Nginx neu geladen."
fi

# ---------------------------------------------------------------------------
# Zusammenfassung
# ---------------------------------------------------------------------------
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Deployment abgeschlossen!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo "  Web-Frontend:  https://${WEB_DOMAIN}"
echo "  API:           https://${API_DOMAIN}/escappapi/"
echo "  API Health:    https://${API_DOMAIN}/escappapi/health"
echo ""
echo "  Container:"
docker compose -f "$COMPOSE_FILE" ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || true
echo ""
