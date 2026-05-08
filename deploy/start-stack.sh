#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
STAMP_FILE="${SCRIPT_DIR}/.last-build-context.sha256"

cd "${PROJECT_ROOT}"

usage() {
  cat <<'EOF'
Verwendung:
  ./deploy/start-stack.sh [--clean-db]

Optionen:
  --clean-db   Leert die DB (Volume), startet neu und legt folgende User an:
               - admin / admin123
               - test1 / abcdefg
EOF
}

log() {
  printf '[deploy] %s\n' "$*"
}

die() {
  printf '[deploy][fehler] %s\n' "$*" >&2
  exit 1
}

choose_compose() {
  local -a cmd=()

  compose_candidate_works() {
    local -a candidate=("$@")
    "${candidate[@]}" version >/dev/null 2>&1 || return 1
    if "${candidate[@]}" config >/dev/null 2>&1; then
      return 0
    fi
    if "${candidate[@]}" config -q >/dev/null 2>&1; then
      return 0
    fi
    return 1
  }

  if command -v podman-compose >/dev/null 2>&1; then
    cmd=(podman-compose)
    if compose_candidate_works "${cmd[@]}"; then
      COMPOSE_CMD=("${cmd[@]}")
      return
    fi
    log "Hinweis: podman-compose vorhanden, aber für dieses Projekt nicht funktionsfähig."
  fi

  if command -v podman >/dev/null 2>&1; then
    cmd=(podman compose)
    if compose_candidate_works "${cmd[@]}"; then
      COMPOSE_CMD=("${cmd[@]}")
      return
    fi
    log "Hinweis: podman compose ist vorhanden, aber für dieses Projekt nicht funktionsfähig."
  fi

  if command -v docker >/dev/null 2>&1; then
    cmd=(docker compose)
    if compose_candidate_works "${cmd[@]}"; then
      COMPOSE_CMD=("${cmd[@]}")
      return
    fi
    log "Hinweis: docker compose ist vorhanden, aber für dieses Projekt nicht funktionsfähig."
  fi

  if command -v docker-compose >/dev/null 2>&1; then
    cmd=(docker-compose)
    if compose_candidate_works "${cmd[@]}"; then
      COMPOSE_CMD=("${cmd[@]}")
      return
    fi
    log "Hinweis: docker-compose ist vorhanden, aber für dieses Projekt nicht funktionsfähig."
  fi

  die "Kein funktionsfähiges Compose-Kommando gefunden (geprüft: podman-compose, podman compose, docker compose, docker-compose)."
}

compose() {
  "${COMPOSE_CMD[@]}" "$@"
}

compute_build_hash() {
  (
    printf '%s\n' "docker-compose.yml"
    find backend frontend \
      -type f \
      ! -path '*/node_modules/*' \
      ! -path '*/build/*' \
      ! -path '*/dist/*' \
      ! -path '*/.git/*' \
      -print
  ) | sort | while IFS= read -r file; do
    [[ -f "$file" ]] && sha256sum "$file"
  done | sha256sum | awk '{print $1}'
}

need_rebuild_by_images() {
  local service image_id
  for service in backend frontend; do
    image_id="$(compose images -q "$service" 2>/dev/null | head -n 1 || true)"
    if [[ -z "${image_id}" ]]; then
      return 0
    fi
  done
  return 1
}

wait_for_backend() {
  local tries=60
  local i
  for ((i = 1; i <= tries; i++)); do
    if curl -fsS "http://localhost:4000/health" >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done
  return 1
}

seed_test_participant() {
  compose exec -T backend node --input-type=module <<'NODE'
import bcrypt from "bcryptjs";
import { pool } from "./src/db/pool.js";

const username = "test1";
const plainPassword = "abcdefg";
const displayName = "Test 1";
const fullName = "Test Teilnehmer 1";

const run = async () => {
  const conn = await pool.getConnection();
  try {
    const passwordHash = await bcrypt.hash(plainPassword, 12);
    const existing = await conn.query("SELECT id FROM users WHERE username = ? LIMIT 1", [username]);

    if (existing.length > 0) {
      await conn.query(
        `UPDATE users
            SET role = 'participant',
                password_hash = ?,
                display_name = ?,
                full_name = ?,
                is_active = TRUE,
                is_approved = TRUE,
                failed_login_count = 0,
                locked_until = NULL
          WHERE username = ?`,
        [passwordHash, displayName, fullName, username]
      );
      process.stdout.write("Participant test1 aktualisiert\n");
    } else {
      await conn.query(
        `INSERT INTO users (role, username, password_hash, display_name, full_name, is_active, is_approved)
         VALUES ('participant', ?, ?, ?, ?, TRUE, TRUE)`,
        [username, passwordHash, displayName, fullName]
      );
      process.stdout.write("Participant test1 angelegt\n");
    }
  } finally {
    conn.release();
    await pool.end();
  }
};

run().catch((error) => {
  process.stderr.write(`${error.stack}\n`);
  process.exit(1);
});
NODE
}

CLEAN_DB=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --clean-db)
      CLEAN_DB=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      die "Unbekannter Parameter: $1"
      ;;
  esac
done

choose_compose
log "Nutze Compose-Kommando: ${COMPOSE_CMD[*]}"

NEW_HASH="$(compute_build_hash)"
OLD_HASH=""
if [[ -f "${STAMP_FILE}" ]]; then
  OLD_HASH="$(cat "${STAMP_FILE}")"
fi

SHOULD_BUILD=false
if [[ "${NEW_HASH}" != "${OLD_HASH}" ]]; then
  SHOULD_BUILD=true
  log "Build-Kontext geändert. Container werden neu gebaut."
elif need_rebuild_by_images; then
  SHOULD_BUILD=true
  log "Mindestens ein Image fehlt. Container werden neu gebaut."
else
  log "Kein Build nötig. Vorhandene Images werden verwendet."
fi

if [[ "${SHOULD_BUILD}" == "true" ]]; then
  compose build backend frontend
  printf '%s\n' "${NEW_HASH}" > "${STAMP_FILE}"
fi

if [[ "${CLEAN_DB}" == "true" ]]; then
  log "--clean-db aktiv: Stack wird gestoppt und DB-Volume geleert."
  compose down -v --remove-orphans
fi

log "Starte Container..."
compose up -d

if [[ "${CLEAN_DB}" == "true" ]]; then
  log "Warte auf Backend-Start (Migrations + Admin-Seed)..."
  if ! wait_for_backend; then
    die "Backend wurde nicht rechtzeitig erreichbar."
  fi

  log "Lege Teilnehmer test1 an bzw. aktualisiere ihn..."
  seed_test_participant
  log "DB-Neuinitialisierung abgeschlossen (admin/admin123, test1/abcdefg)."
fi

log "Fertig."