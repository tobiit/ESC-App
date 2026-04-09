#!/usr/bin/env bash
set -e
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 24

cd /home/tobiit/ESC-App/backend

# Migration 003 als angewendet markieren (country_code-Spalte bereits in 001_init.sql)
echo "INSERT IGNORE INTO schema_migrations (id) VALUES ('003_country_code_migration.sql');" \
  | mariadb -h 127.0.0.1 -P 33306 -u escapp -pescapp escapp
echo "✓ Migration 003 markiert"

# Restliche Migrationen + Seed ausführen
npm run migrate
echo "✓ Migrationen abgeschlossen"

npm run seed
echo "✓ Seed abgeschlossen"
