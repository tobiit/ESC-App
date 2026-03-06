#!/usr/bin/env bash
# ============================================================================
# ESC-App Deployment – Preflight: Prüfe und installiere Basistools
# Zielplattform: Ubuntu 24.04 LTS
# ============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# Farben & Logging
# ---------------------------------------------------------------------------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'

log()  { echo -e "${BLUE}[PREFLIGHT]${NC} $*"; }
ok()   { echo -e "${GREEN}[  OK  ]${NC} $*"; }
warn() { echo -e "${YELLOW}[ WARN ]${NC} $*"; }
fail() { echo -e "${RED}[FEHLER]${NC} $*"; exit 1; }

# ---------------------------------------------------------------------------
# Root-Prüfung
# ---------------------------------------------------------------------------
[[ $EUID -eq 0 ]] || fail "Dieses Skript muss als root ausgeführt werden."

# ---------------------------------------------------------------------------
# Betriebssystem prüfen
# ---------------------------------------------------------------------------
log "Prüfe Betriebssystem …"
if [[ -f /etc/os-release ]]; then
    . /etc/os-release
    if [[ "${ID:-}" != "ubuntu" ]]; then
        warn "Erwartet: Ubuntu, gefunden: ${ID}. Skript läuft weiter, aber Abweichungen sind möglich."
    fi
    if [[ "${VERSION_ID:-}" != "24.04" && "${VERSION_ID:-}" != "24.10" ]]; then
        warn "Erwartet: Ubuntu 24.x, gefunden: ${VERSION_ID}."
    fi
    ok "OS: ${PRETTY_NAME}"
else
    warn "/etc/os-release nicht gefunden – Betriebssystem unbekannt."
fi

# ---------------------------------------------------------------------------
# Hilfsfunktionen
# ---------------------------------------------------------------------------
cmd_exists() { command -v "$1" &>/dev/null; }

ensure_pkg() {
    local cmd="$1" pkg="${2:-$1}"
    if cmd_exists "$cmd"; then
        ok "$cmd ist bereits installiert: $($cmd --version 2>/dev/null | head -1)"
    else
        log "Installiere $pkg …"
        apt-get install -y "$pkg" >/dev/null 2>&1
        ok "$pkg installiert."
    fi
}

# ---------------------------------------------------------------------------
# APT aktualisieren
# ---------------------------------------------------------------------------
log "Aktualisiere Paketlisten …"
apt-get update -qq >/dev/null 2>&1
ok "Paketlisten aktualisiert."

log "Upgrade installierter Pakete …"
apt-get upgrade -y -qq >/dev/null 2>&1
ok "Pakete aktualisiert."

# ---------------------------------------------------------------------------
# Basispakete
# ---------------------------------------------------------------------------
log "Prüfe Basispakete …"
BASEPKGS=(curl wget gnupg2 ca-certificates lsb-release apt-transport-https
          software-properties-common unzip jq ufw fail2ban logrotate)
for pkg in "${BASEPKGS[@]}"; do
    dpkg -s "$pkg" &>/dev/null || {
        log "Installiere $pkg …"
        apt-get install -y -qq "$pkg" >/dev/null 2>&1
    }
done
ok "Basispakete vorhanden."

# ---------------------------------------------------------------------------
# Git
# ---------------------------------------------------------------------------
log "Prüfe Git …"
ensure_pkg git

# ---------------------------------------------------------------------------
# Docker (oder Podman)
# ---------------------------------------------------------------------------
log "Prüfe Container-Runtime …"
if cmd_exists docker; then
    ok "Docker bereits installiert: $(docker --version)"
elif cmd_exists podman; then
    ok "Podman bereits installiert: $(podman --version)"
    # Alias docker → podman falls kein Docker
    if ! cmd_exists docker; then
        ln -sf "$(command -v podman)" /usr/local/bin/docker
        ok "Symlink docker → podman erstellt."
    fi
else
    log "Installiere Docker CE …"
    # Docker GPG key
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
        | gpg --dearmor -o /etc/apt/keyrings/docker.gpg 2>/dev/null
    chmod a+r /etc/apt/keyrings/docker.gpg

    # Docker APT repo
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
        > /etc/apt/sources.list.d/docker.list

    apt-get update -qq >/dev/null 2>&1
    apt-get install -y -qq docker-ce docker-ce-cli containerd.io \
        docker-buildx-plugin docker-compose-plugin >/dev/null 2>&1

    systemctl enable --now docker
    ok "Docker CE installiert: $(docker --version)"
fi

# ---------------------------------------------------------------------------
# Docker Compose (Plugin oder Standalone)
# ---------------------------------------------------------------------------
log "Prüfe Docker Compose …"
if docker compose version &>/dev/null; then
    ok "Docker Compose Plugin: $(docker compose version)"
elif cmd_exists docker-compose; then
    ok "docker-compose standalone: $(docker-compose --version)"
else
    log "Installiere Docker Compose Plugin …"
    apt-get install -y -qq docker-compose-plugin >/dev/null 2>&1
    ok "Docker Compose Plugin installiert."
fi

# ---------------------------------------------------------------------------
# Node.js 22.x (für Frontend-Build)
# ---------------------------------------------------------------------------
log "Prüfe Node.js …"
REQUIRED_NODE_MAJOR=22
if cmd_exists node; then
    CURRENT_NODE_MAJOR=$(node -v | sed 's/v\([0-9]*\).*/\1/')
    if (( CURRENT_NODE_MAJOR >= REQUIRED_NODE_MAJOR )); then
        ok "Node.js $(node -v) vorhanden."
    else
        warn "Node.js $(node -v) ist zu alt. Installiere v${REQUIRED_NODE_MAJOR}.x …"
        curl -fsSL https://deb.nodesource.com/setup_${REQUIRED_NODE_MAJOR}.x | bash - >/dev/null 2>&1
        apt-get install -y -qq nodejs >/dev/null 2>&1
        ok "Node.js $(node -v) installiert."
    fi
else
    log "Installiere Node.js ${REQUIRED_NODE_MAJOR}.x …"
    curl -fsSL https://deb.nodesource.com/setup_${REQUIRED_NODE_MAJOR}.x | bash - >/dev/null 2>&1
    apt-get install -y -qq nodejs >/dev/null 2>&1
    ok "Node.js $(node -v) installiert."
fi

# ---------------------------------------------------------------------------
# npm (kommt mit Node.js)
# ---------------------------------------------------------------------------
log "Prüfe npm …"
if cmd_exists npm; then
    ok "npm $(npm -v)"
else
    fail "npm nicht gefunden – Node.js-Installation scheint fehlerhaft."
fi

# ---------------------------------------------------------------------------
# Nginx
# ---------------------------------------------------------------------------
log "Prüfe Nginx …"
if cmd_exists nginx; then
    ok "Nginx bereits installiert: $(nginx -v 2>&1)"
else
    log "Installiere Nginx …"
    apt-get install -y -qq nginx >/dev/null 2>&1
    systemctl enable nginx
    ok "Nginx installiert."
fi

# ---------------------------------------------------------------------------
# Certbot (für Let's Encrypt SSL)
# ---------------------------------------------------------------------------
log "Prüfe Certbot …"
if cmd_exists certbot; then
    ok "Certbot vorhanden: $(certbot --version 2>&1)"
else
    log "Installiere Certbot + Nginx-Plugin …"
    apt-get install -y -qq certbot python3-certbot-nginx >/dev/null 2>&1
    ok "Certbot installiert."
fi

# ---------------------------------------------------------------------------
# MariaDB Client (optional – für manuelle DB-Checks)
# ---------------------------------------------------------------------------
log "Prüfe MariaDB Client …"
if cmd_exists mariadb || cmd_exists mysql; then
    ok "MariaDB/MySQL Client vorhanden."
else
    log "Installiere MariaDB Client …"
    apt-get install -y -qq mariadb-client >/dev/null 2>&1
    ok "MariaDB Client installiert."
fi

# ---------------------------------------------------------------------------
# Firewall (UFW)
# ---------------------------------------------------------------------------
log "Konfiguriere Firewall (UFW) …"
ufw --force reset >/dev/null 2>&1
ufw default deny incoming >/dev/null 2>&1
ufw default allow outgoing >/dev/null 2>&1
ufw allow ssh >/dev/null 2>&1
ufw allow 80/tcp >/dev/null 2>&1
ufw allow 443/tcp >/dev/null 2>&1
ufw --force enable >/dev/null 2>&1
ok "Firewall: SSH, HTTP, HTTPS erlaubt."

# ---------------------------------------------------------------------------
# Fail2Ban
# ---------------------------------------------------------------------------
log "Konfiguriere Fail2Ban …"
systemctl enable --now fail2ban >/dev/null 2>&1
ok "Fail2Ban aktiv."

# ---------------------------------------------------------------------------
# Swap (falls nicht vorhanden und wenig RAM)
# ---------------------------------------------------------------------------
log "Prüfe Swap …"
TOTAL_MEM=$(free -m | awk '/^Mem:/{print $2}')
SWAP_SIZE=$(free -m | awk '/^Swap:/{print $2}')
if (( SWAP_SIZE < 512 && TOTAL_MEM < 4096 )); then
    if [[ ! -f /swapfile ]]; then
        log "Erstelle 2 GB Swap …"
        fallocate -l 2G /swapfile
        chmod 600 /swapfile
        mkswap /swapfile >/dev/null 2>&1
        swapon /swapfile
        echo '/swapfile none swap sw 0 0' >> /etc/fstab
        ok "2 GB Swap erstellt."
    else
        ok "Swapfile existiert bereits."
    fi
else
    ok "Swap/RAM ausreichend (${TOTAL_MEM} MB RAM, ${SWAP_SIZE} MB Swap)."
fi

# ---------------------------------------------------------------------------
# Zusammenfassung
# ---------------------------------------------------------------------------
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Preflight abgeschlossen – alle Tools bereit.${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo "  Docker:         $(docker --version 2>/dev/null || echo 'n/a')"
echo "  Compose:        $(docker compose version 2>/dev/null || echo 'n/a')"
echo "  Node.js:        $(node -v 2>/dev/null || echo 'n/a')"
echo "  npm:            $(npm -v 2>/dev/null || echo 'n/a')"
echo "  Git:            $(git --version 2>/dev/null || echo 'n/a')"
echo "  Nginx:          $(nginx -v 2>&1 || echo 'n/a')"
echo "  Certbot:        $(certbot --version 2>&1 || echo 'n/a')"
echo ""
