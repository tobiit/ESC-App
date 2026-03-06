#!/usr/bin/env bash
# ============================================================================
# ESC-App – Haupt-Installationsskript (Orchestrator)
# ============================================================================
# Führt alle Deployment-Schritte aus:
#   1. Preflight (Tools prüfen/installieren)
#   2. Umgebung konfigurieren (.env generieren)
#   3. App deployen (Clone, Build, Docker)
#   4. Nginx konfigurieren
#   5. SSL-Zertifikate einrichten
#
# Nutzung:
#   curl -sL <repo-url>/deploy/escapp/install.sh | sudo bash
#   oder:
#   sudo bash install.sh [--skip-ssl] [--skip-preflight]
# ============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# Farben & Logging
# ---------------------------------------------------------------------------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'
CYAN='\033[0;36m'; NC='\033[0m'

log()     { echo -e "${BLUE}[INSTALL]${NC} $*"; }
ok()      { echo -e "${GREEN}[  OK   ]${NC} $*"; }
warn()    { echo -e "${YELLOW}[ WARN  ]${NC} $*"; }
fail()    { echo -e "${RED}[FEHLER ]${NC} $*"; exit 1; }
banner()  { echo -e "${CYAN}$*${NC}"; }

# ---------------------------------------------------------------------------
# Argumente parsen
# ---------------------------------------------------------------------------
SKIP_SSL=false
SKIP_PREFLIGHT=false
FORCE_API_CONF=""

for arg in "$@"; do
    case "$arg" in
        --skip-ssl)       SKIP_SSL=true ;;
        --skip-preflight) SKIP_PREFLIGHT=true ;;
        --force-api-conf) FORCE_API_CONF="--force-api-conf" ;;
        --help|-h)
            echo "Nutzung: sudo bash install.sh [--skip-ssl] [--skip-preflight] [--force-api-conf]"
            echo ""
            echo "  --skip-ssl        SSL-Zertifikate nicht einrichten (z.B. für Tests)"
            echo "  --skip-preflight  Tool-Installation überspringen"
            echo "  --force-api-conf  Bestehende api.basisadresse.de Nginx-Konfiguration überschreiben"
            exit 0
            ;;
    esac
done

# ---------------------------------------------------------------------------
# Root-Prüfung
# ---------------------------------------------------------------------------
[[ $EUID -eq 0 ]] || fail "Dieses Skript muss als root ausgeführt werden: sudo bash install.sh"

# ---------------------------------------------------------------------------
# Konfiguration
# ---------------------------------------------------------------------------
APP_DIR="/opt/escapp"
ENV_FILE="${APP_DIR}/.env"
GIT_REPO="${GIT_REPO:-https://github.com/tobiit/ESC-App.git}"
GIT_BRANCH="${GIT_BRANCH:-main}"

banner "
╔═══════════════════════════════════════════════════════════════╗
║       ESC-App – Eurovision Finale Tippspiel Deployment       ║
╠═══════════════════════════════════════════════════════════════╣
║  Ziel:  Ubuntu 24.04 LTS Root Server                        ║
║  Web:   https://esc.basisadresse.de                          ║
║  API:   https://api.basisadresse.de/escappapi/               ║
╚═══════════════════════════════════════════════════════════════╝
"

# ===================================================================
# SCHRITT 0: Repository sicherstellen
# ===================================================================
log "═══ Schritt 0/5: Repository vorbereiten ═══"

if [[ -d "${APP_DIR}/.git" ]]; then
    log "Repository existiert bereits in ${APP_DIR}."
    cd "$APP_DIR"
    git fetch origin
    git checkout "$GIT_BRANCH"
    git pull origin "$GIT_BRANCH"
    ok "Repository aktualisiert."
else
    log "Klone Repository …"
    mkdir -p "$APP_DIR"
    git clone -b "$GIT_BRANCH" "$GIT_REPO" "$APP_DIR"
    ok "Repository geklont nach ${APP_DIR}."
fi

cd "$APP_DIR"
SCRIPT_DIR="${APP_DIR}/deploy/escapp"

# Skripte ausführbar machen
chmod +x "${SCRIPT_DIR}"/*.sh

# ===================================================================
# SCHRITT 1: Preflight
# ===================================================================
if [[ "$SKIP_PREFLIGHT" == "false" ]]; then
    log "═══ Schritt 1/5: Preflight – Tools prüfen & installieren ═══"
    bash "${SCRIPT_DIR}/00-preflight.sh"
else
    warn "Preflight übersprungen (--skip-preflight)."
fi

# ===================================================================
# SCHRITT 2: Umgebungskonfiguration
# ===================================================================
log "═══ Schritt 2/5: Umgebungskonfiguration ═══"

if [[ -f "$ENV_FILE" ]]; then
    ok ".env-Datei existiert bereits."
    warn "Bestehende Konfiguration wird verwendet. Zum Ändern: ${ENV_FILE}"
else
    log "Generiere .env-Datei mit sicheren Zufallswerten …"

    # Sichere Zufallswerte generieren
    generate_secret() { openssl rand -base64 48 | tr -dc 'a-zA-Z0-9' | head -c "$1"; }

    DB_PASSWORD=$(generate_secret 32)
    DB_ROOT_PASSWORD=$(generate_secret 32)
    JWT_ACCESS_SECRET=$(generate_secret 48)
    JWT_REFRESH_SECRET=$(generate_secret 48)
    ADMIN_BOOTSTRAP_PASSWORD=$(generate_secret 16)

    cat > "$ENV_FILE" <<EOF
# ==========================================================================
# ESC-App – Produktionsumgebung
# Generiert am: $(date -Iseconds)
# ==========================================================================

NODE_ENV=production

# Datenbank
DB_HOST=mariadb
DB_PORT=3306
DB_NAME=escapp
DB_USER=escapp
DB_PASSWORD=${DB_PASSWORD}
DB_ROOT_PASSWORD=${DB_ROOT_PASSWORD}

# JWT
JWT_ACCESS_SECRET=${JWT_ACCESS_SECRET}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL_DAYS=30

# CORS
CORS_ORIGIN=https://esc.basisadresse.de

# Admin Bootstrap
ADMIN_BOOTSTRAP_USERNAME=admin
ADMIN_BOOTSTRAP_PASSWORD=${ADMIN_BOOTSTRAP_PASSWORD}
ADMIN_BOOTSTRAP_DISPLAY_NAME=Administrator

# Domains
WEB_DOMAIN=esc.basisadresse.de
API_DOMAIN=api.basisadresse.de
API_PATH=/escappapi

# Git
GIT_REPO=${GIT_REPO}
GIT_BRANCH=${GIT_BRANCH}

# Pfade
APP_DIR=${APP_DIR}
WEB_ROOT=/var/www/esc.basisadresse.de
BACKUP_DIR=${APP_DIR}/backups

# Let's Encrypt
CERTBOT_EMAIL=admin@basisadresse.de
EOF

    chmod 600 "$ENV_FILE"
    ok ".env-Datei generiert: ${ENV_FILE}"
    echo ""
    echo -e "${YELLOW}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  WICHTIG: Generierte Zugangsdaten merken!                    ║${NC}"
    echo -e "${YELLOW}╠═══════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${YELLOW}║  Admin-Benutzer:  admin                                      ║${NC}"
    echo -e "${YELLOW}║  Admin-Passwort:  ${ADMIN_BOOTSTRAP_PASSWORD}$(printf '%*s' $((38 - ${#ADMIN_BOOTSTRAP_PASSWORD})) '')║${NC}"
    echo -e "${YELLOW}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}  Die komplette Konfiguration liegt in: ${ENV_FILE}${NC}"
    echo ""
fi

# ===================================================================
# SCHRITT 3: App deployen
# ===================================================================
log "═══ Schritt 3/5: App deployen (Build & Start) ═══"
bash "${SCRIPT_DIR}/01-deploy.sh"

# ===================================================================
# SCHRITT 4: Nginx konfigurieren
# ===================================================================
log "═══ Schritt 4/5: Nginx konfigurieren ═══"
bash "${SCRIPT_DIR}/02-nginx.sh" $FORCE_API_CONF

# ===================================================================
# SCHRITT 5: SSL-Zertifikate
# ===================================================================
if [[ "$SKIP_SSL" == "false" ]]; then
    log "═══ Schritt 5/5: SSL-Zertifikate einrichten ═══"
    bash "${SCRIPT_DIR}/03-ssl.sh"
else
    warn "SSL-Einrichtung übersprungen (--skip-ssl)."
    warn "Manuell nachholen: bash ${SCRIPT_DIR}/03-ssl.sh"
fi

# ===================================================================
# ABSCHLUSS: Validierung
# ===================================================================
log "═══ Abschlussvalidierung ═══"
echo ""

ERRORS=0

# Docker-Container prüfen
log "Prüfe Docker-Container …"
if docker ps --format '{{.Names}}' | grep -q escapp-backend; then
    ok "Backend-Container läuft."
else
    warn "Backend-Container läuft NICHT!"
    ERRORS=$((ERRORS + 1))
fi

if docker ps --format '{{.Names}}' | grep -q escapp-mariadb; then
    ok "MariaDB-Container läuft."
else
    warn "MariaDB-Container läuft NICHT!"
    ERRORS=$((ERRORS + 1))
fi

# Backend Health
log "Prüfe Backend Health …"
if curl -sf http://127.0.0.1:4000/health >/dev/null 2>&1; then
    ok "Backend antwortet auf Health-Check."
else
    warn "Backend Health-Check fehlgeschlagen!"
    ERRORS=$((ERRORS + 1))
fi

# Nginx
log "Prüfe Nginx …"
if systemctl is-active --quiet nginx; then
    ok "Nginx läuft."
else
    warn "Nginx läuft NICHT!"
    ERRORS=$((ERRORS + 1))
fi

# Frontend-Dateien
log "Prüfe Frontend-Dateien …"
WEB_ROOT="${WEB_ROOT:-/var/www/esc.basisadresse.de}"
if [[ -f "${WEB_ROOT}/index.html" ]]; then
    ok "Frontend-Dateien vorhanden."
else
    warn "Frontend index.html nicht gefunden in ${WEB_ROOT}!"
    ERRORS=$((ERRORS + 1))
fi

echo ""
if (( ERRORS == 0 )); then
    banner "
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║       ✓ ESC-App erfolgreich installiert!                      ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Web-App:    https://esc.basisadresse.de                      ║
║  API:        https://api.basisadresse.de/escappapi/           ║
║  API Health: https://api.basisadresse.de/escappapi/health     ║
║                                                               ║
║  Nützliche Befehle:                                           ║
║    Status:   bash ${APP_DIR}/deploy/escapp/status.sh          ║
║    Update:   bash ${APP_DIR}/deploy/escapp/update.sh          ║
║    Backup:   bash ${APP_DIR}/deploy/escapp/backup.sh          ║
║    Logs:     docker logs -f escapp-backend                    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
"
else
    banner "
╔═══════════════════════════════════════════════════════════════╗
║  Installation abgeschlossen mit ${ERRORS} Warnung(en).            ║
║  Bitte die obigen Warnungen prüfen.                          ║
╚═══════════════════════════════════════════════════════════════╝
"
fi
