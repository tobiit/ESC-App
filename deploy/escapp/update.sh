#!/usr/bin/env bash
# ============================================================================
# ESC-App – Update (Zero-Downtime)
# ============================================================================
# Aktualisiert die Anwendung:
#   1. Backup erstellen
#   2. Git pull
#   3. Frontend neu bauen
#   4. Backend-Container neu bauen & starten
#   5. Health-Check
#
# Nutzung:
#   sudo bash update.sh [--no-backup] [--branch <branch>]
# ============================================================================
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()  { echo -e "${BLUE}[UPDATE]${NC} $*"; }
ok()   { echo -e "${GREEN}[  OK  ]${NC} $*"; }
warn() { echo -e "${YELLOW}[ WARN ]${NC} $*"; }
fail() { echo -e "${RED}[FEHLER]${NC} $*"; exit 1; }

[[ $EUID -eq 0 ]] || fail "Dieses Skript muss als root ausgeführt werden."

# ---------------------------------------------------------------------------
# Konfiguration
# ---------------------------------------------------------------------------
APP_DIR="${APP_DIR:-/opt/escapp}"
ENV_FILE="${APP_DIR}/.env"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ -f "$ENV_FILE" ]]; then
    set -a; source "$ENV_FILE"; set +a
fi

GIT_BRANCH="${GIT_BRANCH:-main}"
WEB_DOMAIN="${WEB_DOMAIN:-esc.basisadresse.de}"
API_DOMAIN="${API_DOMAIN:-api.basisadresse.de}"
WEB_ROOT="${WEB_ROOT:-/var/www/${WEB_DOMAIN}}"
COMPOSE_FILE="${APP_DIR}/deploy/escapp/docker-compose.prod.yml"
SKIP_BACKUP=false

# Argumente parsen
while [[ $# -gt 0 ]]; do
    case "$1" in
        --no-backup) SKIP_BACKUP=true; shift ;;
        --branch)    GIT_BRANCH="$2"; shift 2 ;;
        *) shift ;;
    esac
done

log "═══ ESC-App Update (Branch: ${GIT_BRANCH}) ═══"
echo ""

# ---------------------------------------------------------------------------
# 1. Backup
# ---------------------------------------------------------------------------
if [[ "$SKIP_BACKUP" == "false" ]]; then
    log "Schritt 1/5: Backup erstellen …"
    bash "${SCRIPT_DIR}/backup.sh"
    ok "Backup erstellt."
else
    warn "Backup übersprungen (--no-backup)."
fi

# ---------------------------------------------------------------------------
# 2. Git Pull
# ---------------------------------------------------------------------------
log "Schritt 2/5: Code aktualisieren …"
cd "$APP_DIR"

# Generierte TypeScript-Buildartefakte koennen lokal geaendert sein und Pull blockieren.
if git ls-files --error-unmatch frontend/tsconfig.tsbuildinfo >/dev/null 2>&1; then
    git restore --staged --worktree frontend/tsconfig.tsbuildinfo >/dev/null 2>&1 || true
fi

# Entferne lokal generierte JS-Schatten-Dateien, wenn ein TS/TSX-Pendant existiert.
# Diese Dateien entstehen durch lokale Tooling-Schritte und blockieren sonst git pull.
if [[ -d frontend/src ]]; then
    while IFS= read -r -d '' js_file; do
        base="${js_file%.js}"
        if [[ -f "${base}.ts" || -f "${base}.tsx" ]]; then
            rm -f "$js_file"
        fi
    done < <(find frontend/src -type f -name "*.js" -print0)
fi

OLD_COMMIT=$(git rev-parse --short HEAD)
git fetch origin
git checkout "$GIT_BRANCH"
git pull origin "$GIT_BRANCH"
NEW_COMMIT=$(git rev-parse --short HEAD)

if [[ "$OLD_COMMIT" == "$NEW_COMMIT" ]]; then
    warn "Kein neuer Code (${OLD_COMMIT}). Update wird trotzdem durchgeführt."
else
    ok "Code aktualisiert: ${OLD_COMMIT} → ${NEW_COMMIT}"
    git log --oneline "${OLD_COMMIT}..${NEW_COMMIT}" | head -10
fi

# Skripte ausführbar machen (falls neue hinzugekommen)
chmod +x "${SCRIPT_DIR}"/*.sh

# ---------------------------------------------------------------------------
# 3. Frontend neu bauen
# ---------------------------------------------------------------------------
log "Schritt 3/5: Frontend bauen …"
cd "${APP_DIR}/frontend"
npm ci --production=false 2>&1 | tail -1
VITE_API_URL="https://${API_DOMAIN}${API_PATH:-/escappapi}" npm run build 2>&1 | tail -3
ok "Frontend gebaut."

# Temporäres Verzeichnis für atomares Deployment
TEMP_WEB=$(mktemp -d)
cp -r "${APP_DIR}/frontend/dist/"* "$TEMP_WEB/"
if [[ -d "${APP_DIR}/frontend/public/font" ]]; then
    cp -r "${APP_DIR}/frontend/public/font" "$TEMP_WEB/"
fi

# Atomares Swap
rm -rf "${WEB_ROOT:?}.old"
if [[ -d "$WEB_ROOT" ]]; then
    mv "$WEB_ROOT" "${WEB_ROOT}.old"
fi
mv "$TEMP_WEB" "$WEB_ROOT"
chown -R www-data:www-data "$WEB_ROOT"
rm -rf "${WEB_ROOT}.old"
ok "Frontend deployt (atomares Swap)."

# ---------------------------------------------------------------------------
# 4. Backend neu bauen & starten
# ---------------------------------------------------------------------------
log "Schritt 4/5: Backend aktualisieren …"
cd "$APP_DIR"

# Container neu bauen und starten (rolling restart)
docker compose -f "$COMPOSE_FILE" --env-file "${APP_DIR}/.env" up -d --build --remove-orphans 2>&1 | tail -5
ok "Backend-Container aktualisiert."

# ---------------------------------------------------------------------------
# 5. Health-Check
# ---------------------------------------------------------------------------
log "Schritt 5/5: Validierung …"

# Warte auf Backend
MAX_WAIT=60
WAITED=0
while (( WAITED < MAX_WAIT )); do
    if curl -sf http://127.0.0.1:4000/health >/dev/null 2>&1; then
        ok "Backend healthy nach ${WAITED}s."
        break
    fi
    sleep 2
    WAITED=$((WAITED + 2))
done

if (( WAITED >= MAX_WAIT )); then
    fail "Backend Health-Check fehlgeschlagen! Rollback empfohlen: bash backup.sh --restore <backup>"
fi

# Nginx reload
nginx -t 2>/dev/null && systemctl reload nginx 2>/dev/null
ok "Nginx neu geladen."

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Update erfolgreich! (${OLD_COMMIT} → ${NEW_COMMIT})${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
docker compose -f "$COMPOSE_FILE" ps --format "table {{.Name}}\t{{.Status}}" 2>/dev/null || true
echo ""
