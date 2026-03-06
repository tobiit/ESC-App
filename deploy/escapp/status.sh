#!/usr/bin/env bash
# ============================================================================
# ESC-App – Status & Diagnose
# ============================================================================
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'
CYAN='\033[0;36m'; NC='\033[0m'

ok()   { echo -e "  ${GREEN}✓${NC} $*"; }
fail() { echo -e "  ${RED}✗${NC} $*"; }
info() { echo -e "  ${BLUE}ℹ${NC} $*"; }

APP_DIR="${APP_DIR:-/opt/escapp}"
ENV_FILE="${APP_DIR}/.env"

if [[ -f "$ENV_FILE" ]]; then
    set -a; source "$ENV_FILE"; set +a
fi

WEB_DOMAIN="${WEB_DOMAIN:-esc.basisadresse.de}"
API_DOMAIN="${API_DOMAIN:-api.basisadresse.de}"
WEB_ROOT="${WEB_ROOT:-/var/www/${WEB_DOMAIN}}"
COMPOSE_FILE="${APP_DIR}/deploy/escapp/docker-compose.prod.yml"

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║              ESC-App – Systemstatus                          ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# ---------------------------------------------------------------------------
# Docker-Container
# ---------------------------------------------------------------------------
echo -e "${BLUE}── Docker-Container ──────────────────────────────────────────${NC}"
if docker ps --format '{{.Names}}\t{{.Status}}\t{{.Ports}}' | grep -q escapp; then
    docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' | grep -E 'NAMES|escapp'
else
    fail "Keine ESC-App Container laufen."
fi
echo ""

# ---------------------------------------------------------------------------
# Backend Health
# ---------------------------------------------------------------------------
echo -e "${BLUE}── Backend Health ────────────────────────────────────────────${NC}"
HEALTH=$(curl -sf http://127.0.0.1:4000/health 2>/dev/null || echo "")
if [[ -n "$HEALTH" ]]; then
    ok "Backend: ${HEALTH}"
else
    fail "Backend antwortet nicht auf Health-Check."
fi
echo ""

# ---------------------------------------------------------------------------
# MariaDB
# ---------------------------------------------------------------------------
echo -e "${BLUE}── MariaDB ───────────────────────────────────────────────────${NC}"
if docker exec escapp-mariadb mariadb -u"${DB_USER:-escapp}" -p"${DB_PASSWORD:-escapp}" -e "SELECT 1" "${DB_NAME:-escapp}" >/dev/null 2>&1; then
    ok "MariaDB erreichbar und Datenbank vorhanden."
    TABLE_COUNT=$(docker exec escapp-mariadb mariadb -u"${DB_USER:-escapp}" -p"${DB_PASSWORD:-escapp}" -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='${DB_NAME:-escapp}'" 2>/dev/null || echo "?")
    info "Tabellen: ${TABLE_COUNT}"
else
    fail "MariaDB nicht erreichbar."
fi
echo ""

# ---------------------------------------------------------------------------
# Nginx
# ---------------------------------------------------------------------------
echo -e "${BLUE}── Nginx ─────────────────────────────────────────────────────${NC}"
if systemctl is-active --quiet nginx; then
    ok "Nginx läuft."
else
    fail "Nginx läuft nicht."
fi

if nginx -t 2>/dev/null; then
    ok "Nginx-Konfiguration gültig."
else
    fail "Nginx-Konfiguration fehlerhaft!"
fi
echo ""

# ---------------------------------------------------------------------------
# SSL-Zertifikate
# ---------------------------------------------------------------------------
echo -e "${BLUE}── SSL-Zertifikate ───────────────────────────────────────────${NC}"
for DOMAIN in "$WEB_DOMAIN" "$API_DOMAIN"; do
    if [[ -d "/etc/letsencrypt/live/${DOMAIN}" ]]; then
        EXPIRY=$(openssl x509 -enddate -noout -in "/etc/letsencrypt/live/${DOMAIN}/cert.pem" 2>/dev/null | cut -d= -f2)
        ok "${DOMAIN}: gültig bis ${EXPIRY}"
    else
        fail "${DOMAIN}: Kein Zertifikat vorhanden."
    fi
done
echo ""

# ---------------------------------------------------------------------------
# Frontend
# ---------------------------------------------------------------------------
echo -e "${BLUE}── Frontend ──────────────────────────────────────────────────${NC}"
if [[ -f "${WEB_ROOT}/index.html" ]]; then
    FILE_COUNT=$(find "$WEB_ROOT" -type f | wc -l)
    TOTAL_SIZE=$(du -sh "$WEB_ROOT" | cut -f1)
    ok "Frontend vorhanden: ${FILE_COUNT} Dateien, ${TOTAL_SIZE}"
else
    fail "Frontend nicht gefunden in ${WEB_ROOT}."
fi
echo ""

# ---------------------------------------------------------------------------
# Git
# ---------------------------------------------------------------------------
echo -e "${BLUE}── Git Repository ────────────────────────────────────────────${NC}"
if [[ -d "${APP_DIR}/.git" ]]; then
    cd "$APP_DIR"
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    COMMIT=$(git rev-parse --short HEAD)
    COMMIT_MSG=$(git log --oneline -1)
    info "Branch: ${BRANCH}"
    info "Commit: ${COMMIT_MSG}"
    info "Status: $(git status --short | wc -l) geänderte Dateien"
else
    fail "Git-Repository nicht gefunden in ${APP_DIR}."
fi
echo ""

# ---------------------------------------------------------------------------
# Disk & Memory
# ---------------------------------------------------------------------------
echo -e "${BLUE}── System-Ressourcen ─────────────────────────────────────────${NC}"
info "Festplatte: $(df -h / | awk 'NR==2{print $3"/"$2" ("$5" belegt)"}')"
info "RAM:        $(free -h | awk '/^Mem:/{print $3"/"$2" belegt"}')"
info "Swap:       $(free -h | awk '/^Swap:/{print $3"/"$2" belegt"}')"
info "Load:       $(uptime | awk -F'load average:' '{print $2}')"
echo ""

# ---------------------------------------------------------------------------
# Backups
# ---------------------------------------------------------------------------
echo -e "${BLUE}── Backups ───────────────────────────────────────────────────${NC}"
BACKUP_DIR="${BACKUP_DIR:-${APP_DIR}/backups}"
if [[ -d "$BACKUP_DIR" ]]; then
    BACKUP_COUNT=$(ls -1 "${BACKUP_DIR}/"escapp-backup-*.tar.gz 2>/dev/null | wc -l)
    LATEST=$(ls -1t "${BACKUP_DIR}/"escapp-backup-*.tar.gz 2>/dev/null | head -1)
    info "Anzahl Backups: ${BACKUP_COUNT}"
    if [[ -n "$LATEST" ]]; then
        info "Letztes Backup: $(basename "$LATEST") ($(du -sh "$LATEST" | cut -f1))"
    fi
else
    info "Kein Backup-Verzeichnis vorhanden."
fi
echo ""
