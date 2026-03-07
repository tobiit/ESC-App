# ESC-App – Deployment Kit

Vollständiges Deployment-Kit für die Installation der ESC-App auf einem **Ubuntu 24.04 LTS Root Server**.

---

## Architektur

```
┌─────────────────────────────────────────────────────┐
│                    Ubuntu 24.04 Server               │
│                                                       │
│  ┌──────────────────────────────────────────────────┐ │
│  │                    Nginx                          │ │
│  │  ┌────────────────┐  ┌─────────────────────────┐ │ │
│  │  │esc.basisadresse│  │api.basisadresse.de      │ │ │
│  │  │   .de          │  │  /escappapi/ ──────┐    │ │ │
│  │  │   (Static)     │  │                    │    │ │ │
│  │  └───────┬────────┘  └────────────────────│────┘ │ │
│  │          │                                │      │ │
│  │          ▼                                ▼      │ │
│  │  /var/www/esc.*       ┌──────Docker───────────┐  │ │
│  │  (Vite Build)         │  Backend :4000        │  │ │
│  │                       │  (Node.js/Express)    │  │ │
│  │                       │        │              │  │ │
│  │                       │        ▼              │  │ │
│  │                       │  MariaDB :33306       │  │ │
│  │                       │  (nicht exponiert)    │  │ │
│  │                       └───────────────────────┘  │ │
│  │                                                   │ │
│  │  SSL: Let's Encrypt (Certbot)                     │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

| Komponente | Technologie | URL |
|---|---|---|
| Web-Frontend | Vite Static Build + Nginx | `https://esc.basisadresse.de` |
| REST-API | Node.js in Docker + Nginx Reverse Proxy | `https://api.basisadresse.de/escappapi/` |
| Datenbank | MariaDB 11.4 in Docker | Nur intern (nicht exponiert) |
| SSL | Let's Encrypt via Certbot | Auto-Renewal |

---

## Schnellstart (Erstinstallation)

### Auf dem Server als root:

```bash
# 1. Repository klonen
git clone https://github.com/tobiit/ESC-App.git /opt/escapp
cd /opt/escapp

# 2. Haupt-Installationsskript ausführen
sudo bash deploy/escapp/install.sh
```

Das Skript führt automatisch aus:
1. **Preflight** – Prüft und installiert Docker, Node.js 22, Nginx, Certbot, Git, etc.
2. **Konfiguration** – Generiert `.env` mit sicheren Zufallspasswörtern
3. **Build & Deploy** – Baut Frontend, startet Backend + MariaDB in Docker
4. **Nginx** – Konfiguriert Reverse Proxy für beide Domains
5. **SSL** – Erstellt Let's Encrypt Zertifikate

### Optionale Flags

```bash
# Ohne SSL (z.B. für lokale Tests)
sudo bash deploy/escapp/install.sh --skip-ssl

# Preflight überspringen (Tools sind bereits installiert)
sudo bash deploy/escapp/install.sh --skip-preflight

# Bestehende api.basisadresse.de Nginx-Config überschreiben
sudo bash deploy/escapp/install.sh --force-api-conf
```

---

## Dateistruktur

```
deploy/escapp/
├── install.sh                         # Haupt-Installationsskript (Orchestrator)
├── 00-preflight.sh                    # Tools prüfen & installieren
├── 01-deploy.sh                       # App bauen & starten
├── 02-nginx.sh                        # Nginx konfigurieren
├── 03-ssl.sh                          # SSL-Zertifikate einrichten
├── update.sh                          # App aktualisieren
├── backup.sh                          # Backup & Restore
├── status.sh                          # Status & Diagnose
├── docker-compose.prod.yml            # Produktion Docker Compose
├── .env.production.example            # Umgebungsvariablen-Vorlage
├── nginx-escapp-web.conf              # Nginx: Web-Frontend
├── nginx-escapp-api.conf              # Nginx: API (Standalone)
├── escappapi-location.snippet.conf    # Nginx: API Location Snippet
└── README.md                          # Diese Dokumentation
```

---

## Verzeichnisse auf dem Server

| Pfad | Inhalt |
|---|---|
| `/opt/escapp/` | Git-Repository (Quellcode) |
| `/opt/escapp/.env` | Produktionskonfiguration (chmod 600) |
| `/opt/escapp/backups/` | Automatische Backups |
| `/var/www/esc.basisadresse.de/` | Frontend-Build (statische Dateien) |
| `/etc/nginx/sites-available/` | Nginx Server-Block Konfigurationen |
| `/etc/nginx/snippets/escappapi-location.conf` | API Location Snippet |

---

## Umgebungsvariablen (.env)

Die `.env`-Datei wird beim ersten `install.sh`-Lauf automatisch mit sicheren Zufallswerten generiert. Vorlage: `.env.production.example`.

Wichtige Variablen:

| Variable | Beschreibung | Beispiel |
|---|---|---|
| `DB_PASSWORD` | MariaDB Passwort | (zufällig generiert) |
| `JWT_ACCESS_SECRET` | JWT Signatur-Secret | (zufällig generiert) |
| `JWT_REFRESH_SECRET` | Refresh-Token Secret | (zufällig generiert) |
| `CORS_ORIGIN` | Erlaubte Frontend-URL | `https://esc.basisadresse.de` |
| `ADMIN_BOOTSTRAP_PASSWORD` | Initiales Admin-Passwort | (zufällig generiert) |
| `CERTBOT_EMAIL` | E-Mail für Let's Encrypt | `admin@basisadresse.de` |

---

## Tägliche Operationen

### Status prüfen

```bash
sudo bash /opt/escapp/deploy/escapp/status.sh
```

Zeigt: Container-Status, Health-Check, SSL-Ablauf, Disk/RAM, Backups.

### App aktualisieren

```bash
# Standard (mit automatischem Backup)
sudo bash /opt/escapp/deploy/escapp/update.sh

# Ohne Backup
sudo bash /opt/escapp/deploy/escapp/update.sh --no-backup

# Bestimmten Branch deployen
sudo bash /opt/escapp/deploy/escapp/update.sh --branch develop
```

### Backup erstellen

```bash
# Backup erstellen
sudo bash /opt/escapp/deploy/escapp/backup.sh

# Backups auflisten
sudo bash /opt/escapp/deploy/escapp/backup.sh --list

# Backup wiederherstellen
sudo bash /opt/escapp/deploy/escapp/backup.sh --restore /opt/escapp/backups/escapp-backup-20260304_120000.tar.gz
```

### Logs

```bash
# Backend-Logs
docker logs -f escapp-backend

# MariaDB-Logs
docker logs -f escapp-mariadb

# Nginx Access-Log
tail -f /var/log/nginx/esc.basisadresse.de.access.log
tail -f /var/log/nginx/api.basisadresse.de.access.log

# Nginx Error-Log
tail -f /var/log/nginx/esc.basisadresse.de.error.log
```

### Container manuell steuern

```bash
cd /opt/escapp

# Status
docker compose -f deploy/escapp/docker-compose.prod.yml ps

# Stoppen
docker compose -f deploy/escapp/docker-compose.prod.yml down

# Starten
docker compose -f deploy/escapp/docker-compose.prod.yml --env-file .env up -d

# Neustarten
docker compose -f deploy/escapp/docker-compose.prod.yml --env-file .env restart backend
```

---

## Nginx-Konfiguration

### Szenario A: api.basisadresse.de ist neu (Standard)

Das Installationsskript erstellt automatisch einen neuen Server-Block.

### Szenario B: api.basisadresse.de existiert bereits

Falls der Server-Block `api.basisadresse.de` bereits für andere Dienste existiert, muss die ESC-App API-Location manuell eingefügt werden:

```bash
# 1. Snippet ist bereits kopiert nach:
#    /etc/nginx/snippets/escappapi-location.conf

# 2. In den bestehenden server{}-Block einfügen:
#    include /etc/nginx/snippets/escappapi-location.conf;

# 3. Nginx testen & neu laden:
sudo nginx -t && sudo systemctl reload nginx
```

---

## SSL-Zertifikate

Zertifikate werden automatisch von Let's Encrypt erstellt und erneuert (Certbot Timer oder Cronjob).

```bash
# Manuell erneuern
sudo certbot renew

# Zertifikatsstatus
sudo certbot certificates

# Manuell für eine Domain
sudo certbot --nginx -d esc.basisadresse.de
```

---

## Sicherheitshinweise

- `.env`-Datei hat `chmod 600` (nur root lesbar)
- MariaDB ist **nicht** nach außen exponiert (nur Docker-intern)
- Backend bindet nur auf `127.0.0.1:4000` (nicht öffentlich)
- UFW-Firewall: nur SSH (22), HTTP (80), HTTPS (443) offen
- Fail2Ban aktiv gegen Brute-Force
- Nginx Security Headers gesetzt
- SSL/TLS mit Let's Encrypt

---

## Troubleshooting

### Backend startet nicht

```bash
docker logs escapp-backend
# Häufig: DB nicht bereit → Container neu starten
docker compose -f /opt/escapp/deploy/escapp/docker-compose.prod.yml --env-file /opt/escapp/.env restart backend
```

### MariaDB Connection Refused

```bash
docker logs escapp-mariadb
# Prüfe ob Container healthy ist:
docker inspect escapp-mariadb --format='{{.State.Health.Status}}'
```

### Frontend zeigt weiße Seite

```bash
# Prüfe ob Dateien vorhanden:
ls -la /var/www/esc.basisadresse.de/
# Prüfe Nginx-Konfiguration:
nginx -t
# Prüfe Browser-Konsole auf CORS-Fehler
# VITE_API_URL muss korrekt sein bei Build
```

### SSL-Zertifikat abgelaufen

```bash
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

### API nicht erreichbar unter /escappapi/

```bash
# Prüfe Snippet:
cat /etc/nginx/snippets/escappapi-location.conf
# Prüfe ob Backend läuft:
curl http://127.0.0.1:4000/health
# Prüfe Nginx:
nginx -t
```

---

## Voraussetzungen

### Server

- Ubuntu 24.04 LTS
- Root-Zugang (SSH)
- Mindestens 1 GB RAM (2 GB empfohlen)
- Mindestens 10 GB freier Speicherplatz
- Öffentliche IP-Adresse

### DNS

Folgende DNS-Einträge müssen auf die Server-IP zeigen:

| Typ | Name | Wert |
|---|---|---|
| A | `esc.basisadresse.de` | `<Server-IP>` |
| A | `api.basisadresse.de` | `<Server-IP>` |

---

## Installierte Tools (durch Preflight)

| Tool | Version | Zweck |
|---|---|---|
| Docker CE | Latest | Container-Runtime |
| Docker Compose | Plugin | Container-Orchestrierung |
| Node.js | 22.x | Frontend-Build |
| npm | (mit Node.js) | Paketmanager |
| Nginx | Latest | Reverse Proxy & Static Files |
| Certbot | Latest | SSL-Zertifikate |
| Git | Latest | Versionskontrolle |
| UFW | Latest | Firewall |
| Fail2Ban | Latest | Brute-Force-Schutz |
| MariaDB Client | Latest | DB-Diagnose |
