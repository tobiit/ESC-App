#!/usr/bin/env bash

set -euo pipefail

# Konfiguration
REPO_DIR="/opt/escapp"
REMOTE_NAME="origin"
BRANCH_NAME="main"
REMOTE_URL="https://github.com/tobiit/ESC-App.git"
UPDATE_SCRIPT="/home/customer/ESC-App/deploy/escapp/update.sh"

cd "$REPO_DIR"

# Sicherstellen, daß wir uns in einem Git-Repository befinden
if ! git rev-parse --git-dir >/dev/null 2>&1; then
    echo "Fehler: $REPO_DIR ist kein Git-Repository." >&2
    exit 1
fi

# Sicherstellen, daß der gewünschte Remote existiert
if ! git remote get-url "$REMOTE_NAME" >/dev/null 2>&1; then
    echo "Remote '$REMOTE_NAME' nicht vorhanden. Wird auf $REMOTE_URL gesetzt."
    git remote add "$REMOTE_NAME" "$REMOTE_URL"
fi

# Lokalen Commit des Branches ermitteln
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
    LOCAL_COMMIT="$(git rev-parse "refs/heads/$BRANCH_NAME")"
else
    echo "Fehler: Lokaler Branch '$BRANCH_NAME' existiert nicht." >&2
    exit 1
fi

# Remote-Commit sehr leichtgewichtig ermitteln, ohne Pull oder Fetch
REMOTE_COMMIT="$(
    git ls-remote "$REMOTE_NAME" "refs/heads/$BRANCH_NAME" | awk '{print $1}'
)"

if [[ -z "$REMOTE_COMMIT" ]]; then
    echo "Fehler: Remote-Branch '$BRANCH_NAME' konnte nicht ermittelt werden." >&2
    exit 1
fi

# Vergleich
if [[ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]]; then
    echo "Änderung erkannt."
    echo "Lokal : $LOCAL_COMMIT"
    echo "Remote: $REMOTE_COMMIT"

    if [[ ! -x "$UPDATE_SCRIPT" ]]; then
        echo "Fehler: Update-Skript '$UPDATE_SCRIPT' ist nicht ausführbar oder nicht vorhanden." >&2
        exit 1
    fi

    echo "Starte $UPDATE_SCRIPT ..."
    "$UPDATE_SCRIPT"
else
    echo "Keine Änderung erkannt."
fi