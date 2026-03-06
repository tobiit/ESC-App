#!/usr/bin/env bash
# ============================================================================
# ESC-App Deployment – SSL/TLS mit Let's Encrypt (Certbot)
# ============================================================================
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()  { echo -e "${BLUE}[ SSL  ]${NC} $*"; }
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

WEB_DOMAIN="${WEB_DOMAIN:-esc.basisadresse.de}"
API_DOMAIN="${API_DOMAIN:-api.basisadresse.de}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-admin@basisadresse.de}"

# ---------------------------------------------------------------------------
# Certbot prüfen
# ---------------------------------------------------------------------------
command -v certbot &>/dev/null || fail "Certbot nicht installiert. Zuerst 00-preflight.sh ausführen."

# ---------------------------------------------------------------------------
# SSL für Web-Frontend (esc.basisadresse.de)
# ---------------------------------------------------------------------------
log "Erstelle SSL-Zertifikat für ${WEB_DOMAIN} …"

if [[ -d "/etc/letsencrypt/live/${WEB_DOMAIN}" ]]; then
    ok "Zertifikat für ${WEB_DOMAIN} existiert bereits."
    log "Erneuere Zertifikat …"
    certbot renew --cert-name "${WEB_DOMAIN}" --dry-run && ok "Renewal-Test erfolgreich."
else
    certbot --nginx \
        -d "${WEB_DOMAIN}" \
        --non-interactive \
        --agree-tos \
        --email "${CERTBOT_EMAIL}" \
        --redirect
    ok "SSL-Zertifikat für ${WEB_DOMAIN} erstellt."
fi

# ---------------------------------------------------------------------------
# SSL für API (api.basisadresse.de)
# ---------------------------------------------------------------------------
log "Erstelle SSL-Zertifikat für ${API_DOMAIN} …"

if [[ -d "/etc/letsencrypt/live/${API_DOMAIN}" ]]; then
    ok "Zertifikat für ${API_DOMAIN} existiert bereits."
    log "Erneuere Zertifikat …"
    certbot renew --cert-name "${API_DOMAIN}" --dry-run && ok "Renewal-Test erfolgreich."
else
    certbot --nginx \
        -d "${API_DOMAIN}" \
        --non-interactive \
        --agree-tos \
        --email "${CERTBOT_EMAIL}" \
        --redirect
    ok "SSL-Zertifikat für ${API_DOMAIN} erstellt."
fi

# ---------------------------------------------------------------------------
# Auto-Renewal Cron/Timer prüfen
# ---------------------------------------------------------------------------
log "Prüfe automatische Zertifikatserneuerung …"
if systemctl is-active --quiet certbot.timer 2>/dev/null; then
    ok "Certbot Timer aktiv."
elif crontab -l 2>/dev/null | grep -q certbot; then
    ok "Certbot Cronjob vorhanden."
else
    log "Richte automatische Erneuerung ein …"
    # Certbot Timer aktivieren (bei neueren Ubuntu-Versionen)
    if systemctl list-unit-files | grep -q certbot.timer; then
        systemctl enable --now certbot.timer
        ok "Certbot Timer aktiviert."
    else
        # Fallback: Cronjob
        (crontab -l 2>/dev/null; echo "0 3 * * * /usr/bin/certbot renew --quiet --post-hook 'systemctl reload nginx'") | crontab -
        ok "Certbot Cronjob eingerichtet (täglich 3:00 Uhr)."
    fi
fi

# ---------------------------------------------------------------------------
# Nginx neu laden
# ---------------------------------------------------------------------------
log "Lade Nginx mit SSL-Konfiguration neu …"
nginx -t 2>&1 && systemctl reload nginx
ok "Nginx mit SSL aktiv."

# ---------------------------------------------------------------------------
# Zusammenfassung
# ---------------------------------------------------------------------------
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  SSL-Zertifikate eingerichtet.${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo "  Web-Frontend:  https://${WEB_DOMAIN}"
echo "  API:           https://${API_DOMAIN}/escappapi/"
echo ""
echo "  Zertifikate werden automatisch erneuert."
echo ""
