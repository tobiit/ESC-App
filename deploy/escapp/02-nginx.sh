#!/usr/bin/env bash
# ============================================================================
# ESC-App Deployment – Nginx einrichten
# ============================================================================
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()  { echo -e "${BLUE}[NGINX]${NC} $*"; }
ok()   { echo -e "${GREEN}[  OK  ]${NC} $*"; }
warn() { echo -e "${YELLOW}[ WARN ]${NC} $*"; }
fail() { echo -e "${RED}[FEHLER]${NC} $*"; exit 1; }

[[ $EUID -eq 0 ]] || fail "Dieses Skript muss als root ausgeführt werden."

# ---------------------------------------------------------------------------
# Konfiguration laden
# ---------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${APP_DIR:-/opt/escapp}"
ENV_FILE="${APP_DIR}/.env"

if [[ -f "$ENV_FILE" ]]; then
    set -a; source "$ENV_FILE"; set +a
fi

WEB_DOMAIN="${WEB_DOMAIN:-esc.basisadresse.de}"
API_DOMAIN="${API_DOMAIN:-api.basisadresse.de}"
WEB_ROOT="${WEB_ROOT:-/var/www/${WEB_DOMAIN}}"

# ---------------------------------------------------------------------------
# Verzeichnisse erstellen
# ---------------------------------------------------------------------------
log "Erstelle Web-Root ${WEB_ROOT} …"
mkdir -p "$WEB_ROOT"
chown -R www-data:www-data "$WEB_ROOT"
ok "Web-Root erstellt."

mkdir -p /etc/nginx/snippets
ok "Nginx Snippets-Verzeichnis vorhanden."

# ---------------------------------------------------------------------------
# Location Snippet kopieren
# ---------------------------------------------------------------------------
log "Kopiere ESC-App API Location Snippet …"
cp "${SCRIPT_DIR}/escappapi-location.snippet.conf" /etc/nginx/snippets/escappapi-location.conf
ok "Snippet: /etc/nginx/snippets/escappapi-location.conf"

# ---------------------------------------------------------------------------
# Web-Frontend Konfiguration (esc.basisadresse.de)
# ---------------------------------------------------------------------------
log "Konfiguriere ${WEB_DOMAIN} …"
cp "${SCRIPT_DIR}/nginx-escapp-web.conf" "/etc/nginx/sites-available/${WEB_DOMAIN}"

# Symlink erstellen
if [[ ! -L "/etc/nginx/sites-enabled/${WEB_DOMAIN}" ]]; then
    ln -sf "/etc/nginx/sites-available/${WEB_DOMAIN}" "/etc/nginx/sites-enabled/${WEB_DOMAIN}"
fi
ok "Web-Frontend Konfiguration aktiv."

# ---------------------------------------------------------------------------
# API Konfiguration (api.basisadresse.de/escappapi)
# ---------------------------------------------------------------------------
log "Konfiguriere ${API_DOMAIN} …"

# Prüfe ob bereits eine Konfiguration für api.basisadresse.de existiert
API_CONF="/etc/nginx/sites-available/${API_DOMAIN}"
if [[ -f "$API_CONF" ]]; then
    # Prüfe ob die ESC-App Location bereits enthalten ist
    if grep -q "escappapi-location" "$API_CONF"; then
        ok "ESC-App API Location bereits in bestehender ${API_DOMAIN}-Konfiguration."
    else
        warn "Bestehende ${API_DOMAIN}-Konfiguration gefunden!"
        warn "Bitte manuell die folgende Zeile im server{}-Block einfügen:"
        warn "  include /etc/nginx/snippets/escappapi-location.conf;"
        warn ""
        warn "Oder Backup erstellen und überschreiben mit --force-api-conf"
        
        if [[ "${1:-}" == "--force-api-conf" ]]; then
            log "Backup der bestehenden Konfiguration …"
            cp "$API_CONF" "${API_CONF}.bak.$(date +%Y%m%d%H%M%S)"
            
            # Snippet vor der letzten schließenden Klammer einfügen
            if grep -q "include.*snippets" "$API_CONF"; then
                warn "Konfiguration hat bereits Snippets. Manuelle Integration empfohlen."
            else
                # Versuche, das Include vor dem letzten } einzufügen
                sed -i '/^}/i\    # ESC-App API\n    include /etc/nginx/snippets/escappapi-location.conf;' "$API_CONF"
                ok "ESC-App API Location in bestehende Konfiguration eingefügt."
            fi
        fi
    fi
else
    # Neue Konfiguration erstellen
    cp "${SCRIPT_DIR}/nginx-escapp-api.conf" "$API_CONF"
    if [[ ! -L "/etc/nginx/sites-enabled/${API_DOMAIN}" ]]; then
        ln -sf "$API_CONF" "/etc/nginx/sites-enabled/${API_DOMAIN}"
    fi
    ok "Neue API-Konfiguration erstellt."
fi

# ---------------------------------------------------------------------------
# Default-Site deaktivieren (optional)
# ---------------------------------------------------------------------------
if [[ -L /etc/nginx/sites-enabled/default ]]; then
    log "Deaktiviere Nginx Default-Site …"
    rm -f /etc/nginx/sites-enabled/default
    ok "Default-Site deaktiviert."
fi

# ---------------------------------------------------------------------------
# Nginx testen und neu laden
# ---------------------------------------------------------------------------
log "Teste Nginx-Konfiguration …"
if nginx -t 2>&1; then
    ok "Nginx-Konfiguration gültig."
    log "Lade Nginx neu …"
    systemctl reload nginx
    ok "Nginx neu geladen."
else
    fail "Nginx-Konfiguration fehlerhaft! Bitte manuell prüfen."
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Nginx-Konfiguration abgeschlossen.${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo "  Web-Frontend:  http://${WEB_DOMAIN}"
echo "  API:           http://${API_DOMAIN}/escappapi/"
echo ""
echo "  Nächster Schritt: SSL-Zertifikate mit 03-ssl.sh einrichten."
echo ""
