#!/usr/bin/env bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 24
cd /home/tobiit/ESC-App/backend
exec npm run dev
