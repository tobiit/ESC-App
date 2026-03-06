#!/usr/bin/env bash
# ============================================================================
# ESC-App – Backup & Restore
# ============================================================================
# Erstellt Backups von:
#   - MariaDB-Datenbank (mysqldump)
#   - .env-Konfiguration
#   - Frontend-Build
#   - Docker Volumes
#
# Nutzung:
#   sudo bash backup.sh                    # Backup erstellen
#   sudo bash backup.sh --restore <datei>  # Backup wiederherstellen
#   sudo bash backup.sh --list             # Vorhandene Backups anzeigen
# ============================================================================
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()  { echo -e "${BLUE}[BACKUP]${NC} $*"; }
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
fi

BACKUP_DIR="${BACKUP_DIR:-${APP_DIR}/backups}"
WEB_ROOT="${WEB_ROOT:-/var/www/esc.basisadresse.de}"
COMPOSE_FILE="${APP_DIR}/deploy/escapp/docker-compose.prod.yml"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="escapp-backup-${TIMESTAMP}"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"

# ---------------------------------------------------------------------------
# Subcommands
# ---------------------------------------------------------------------------
ACTION="${1:-backup}"

case "$ACTION" in
    --list)
        echo ""
        log "Vorhandene Backups in ${BACKUP_DIR}:"
        echo ""
        if [[ -d "$BACKUP_DIR" ]]; then
            ls -lhtr "${BACKUP_DIR}/"*.tar.gz 2>/dev/null || echo "  Keine Backups gefunden."
        else
            echo "  Backup-Verzeichnis existiert nicht."
        fi
        echo ""
        exit 0
        ;;

    --restore)
        RESTORE_FILE="${2:-}"
        [[ -n "$RESTORE_FILE" ]] || fail "Nutzung: backup.sh --restore <backup-datei.tar.gz>"
        [[ -f "$RESTORE_FILE" ]] || fail "Datei nicht gefunden: ${RESTORE_FILE}"

        log "Stelle Backup wieder her: ${RESTORE_FILE}"
        warn "ACHTUNG: Die aktuelle Datenbank und Konfiguration werden überschrieben!"
        echo -n "Fortfahren? (j/N): "
        read -r CONFIRM
        [[ "$CONFIRM" == "j" || "$CONFIRM" == "J" ]] || { log "Abgebrochen."; exit 0; }

        RESTORE_DIR=$(mktemp -d)
        tar xzf "$RESTORE_FILE" -C "$RESTORE_DIR"
        RESTORE_CONTENT=$(ls "$RESTORE_DIR")
        RESTORE_BASE="${RESTORE_DIR}/${RESTORE_CONTENT}"

        # .env wiederherstellen
        if [[ -f "${RESTORE_BASE}/env-backup" ]]; then
            cp "${RESTORE_BASE}/env-backup" "${APP_DIR}/.env"
            chmod 600 "${APP_DIR}/.env"
            ok ".env wiederhergestellt."
            set -a; source "${APP_DIR}/.env"; set +a
        fi

        # Container stoppen
        log "Stoppe Container …"
        docker compose -f "$COMPOSE_FILE" --env-file "${APP_DIR}/.env" down 2>/dev/null || true

        # DB-Dump wiederherstellen
        if [[ -f "${RESTORE_BASE}/database.sql" ]]; then
            log "Stelle Datenbank wieder her …"
            # Container starten, DB wiederherstellen
            docker compose -f "$COMPOSE_FILE" --env-file "${APP_DIR}/.env" up -d mariadb
            sleep 10  # Warte auf MariaDB

            docker exec -i escapp-mariadb mariadb \
                -u"${DB_USER:-escapp}" -p"${DB_PASSWORD}" "${DB_NAME:-escapp}" \
                < "${RESTORE_BASE}/database.sql"
            ok "Datenbank wiederhergestellt."
        fi

        # Frontend wiederherstellen
        if [[ -d "${RESTORE_BASE}/frontend" ]]; then
            rm -rf "${WEB_ROOT:?}"/*
            cp -r "${RESTORE_BASE}/frontend/"* "$WEB_ROOT/"
            chown -R www-data:www-data "$WEB_ROOT"
            ok "Frontend wiederhergestellt."
        fi

        # Container neu starten
        docker compose -f "$COMPOSE_FILE" --env-file "${APP_DIR}/.env" up -d --build
        ok "Container gestartet."

        rm -rf "$RESTORE_DIR"
        ok "Restore abgeschlossen."
        exit 0
        ;;

    backup|*)
        # Weiter mit Backup-Erstellung
        ;;
esac

# ---------------------------------------------------------------------------
# Backup erstellen
# ---------------------------------------------------------------------------
log "Erstelle Backup: ${BACKUP_NAME}"
mkdir -p "$BACKUP_PATH"

# .env sichern
if [[ -f "$ENV_FILE" ]]; then
    cp "$ENV_FILE" "${BACKUP_PATH}/env-backup"
    ok ".env gesichert."
fi

# Datenbank-Dump
log "Erstelle Datenbank-Dump …"
if docker ps --format '{{.Names}}' | grep -q escapp-mariadb; then
    docker exec escapp-mariadb mariadb-dump \
        -u"${DB_USER:-escapp}" -p"${DB_PASSWORD:-escapp}" \
        --single-transaction --routines --triggers \
        "${DB_NAME:-escapp}" > "${BACKUP_PATH}/database.sql" 2>/dev/null
    DB_SIZE=$(du -sh "${BACKUP_PATH}/database.sql" | cut -f1)
    ok "Datenbank-Dump erstellt (${DB_SIZE})."
else
    warn "MariaDB-Container läuft nicht – DB-Dump übersprungen."
fi

# Frontend sichern
if [[ -d "$WEB_ROOT" && -f "${WEB_ROOT}/index.html" ]]; then
    cp -r "$WEB_ROOT" "${BACKUP_PATH}/frontend"
    ok "Frontend gesichert."
fi

# Nginx-Konfiguration sichern
mkdir -p "${BACKUP_PATH}/nginx"
cp /etc/nginx/sites-available/*basisadresse* "${BACKUP_PATH}/nginx/" 2>/dev/null || true
cp /etc/nginx/snippets/escappapi* "${BACKUP_PATH}/nginx/" 2>/dev/null || true
ok "Nginx-Konfiguration gesichert."

# Git-Hash für Traceability
if [[ -d "${APP_DIR}/.git" ]]; then
    cd "$APP_DIR"
    git rev-parse HEAD > "${BACKUP_PATH}/git-commit.txt"
    git log --oneline -1 >> "${BACKUP_PATH}/git-commit.txt"
    ok "Git-Commit gesichert."
fi

# Archiv erstellen
log "Komprimiere Backup …"
cd "$BACKUP_DIR"
tar czf "${BACKUP_NAME}.tar.gz" "$BACKUP_NAME"
rm -rf "$BACKUP_PATH"
ARCHIVE_SIZE=$(du -sh "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" | cut -f1)
ok "Backup-Archiv: ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz (${ARCHIVE_SIZE})"

# Alte Backups aufräumen (behalte letzte 10)
log "Räume alte Backups auf (behalte letzte 10) …"
ls -1t "${BACKUP_DIR}/"escapp-backup-*.tar.gz 2>/dev/null | tail -n +11 | xargs -r rm -f
ok "Aufräumen abgeschlossen."

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Backup erfolgreich erstellt.${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo "  Archiv:    ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"
echo "  Größe:     ${ARCHIVE_SIZE}"
echo ""
echo "  Restore:   sudo bash backup.sh --restore ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"
echo "  Alle:      sudo bash backup.sh --list"
echo ""
