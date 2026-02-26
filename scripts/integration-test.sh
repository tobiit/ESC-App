#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:4000}"
TS="$(date +%s)"
P_USERNAME="p_${TS}"
EVENT_NAME="ESC Finale ${TS}"

echo "1) Admin login"
ADMIN_LOGIN=$(curl -sS -X POST "$API_URL/auth/admin/login" -H 'content-type: application/json' -d '{"username":"admin","password":"admin123"}')
ADMIN_TOKEN=$(echo "$ADMIN_LOGIN" | node -e 'const d=JSON.parse(require("fs").readFileSync(0,"utf8"));process.stdout.write(d.accessToken||"")')

if [[ -z "$ADMIN_TOKEN" ]]; then
  echo "Admin login failed"
  exit 1
fi

echo "2) Participant + Event + Entries"
curl -sS -X POST "$API_URL/admin/participants" -H "authorization: Bearer $ADMIN_TOKEN" -H 'content-type: application/json' -d "{\"username\":\"$P_USERNAME\",\"password\":\"secret123\",\"displayName\":\"Teilnehmer $TS\"}" >/dev/null
curl -sS -X POST "$API_URL/admin/events" -H "authorization: Bearer $ADMIN_TOKEN" -H 'content-type: application/json' -d "{\"name\":\"$EVENT_NAME\",\"year\":2026,\"status\":\"open\",\"isActive\":true}" >/dev/null

EVENT_ID=$(curl -sS -X GET "$API_URL/admin/events" -H "authorization: Bearer $ADMIN_TOKEN" | node -e "const d=JSON.parse(require('fs').readFileSync(0,'utf8')); const e=d.find(x=>x.name==='${EVENT_NAME}'); if(!e){process.exit(1)} process.stdout.write(String(e.id));")

if [[ -z "$EVENT_ID" ]]; then
  echo "Event lookup failed"
  exit 1
fi

for COUNTRY in "Deutschland" "Schweden" "Frankreich" "Spanien" "Italien" "Norwegen" "Ukraine" "Polen" "Belgien" "Niederlande"; do
  curl -sS -X POST "$API_URL/admin/events/$EVENT_ID/entries" -H "authorization: Bearer $ADMIN_TOKEN" -H 'content-type: application/json' -d "{\"countryName\":\"$COUNTRY\",\"sortOrder\":1}" >/dev/null
done

echo "3) Participant login"
P_LOGIN=$(curl -sS -X POST "$API_URL/auth/login" -H 'content-type: application/json' -d "{\"username\":\"$P_USERNAME\",\"password\":\"secret123\"}")
P_TOKEN=$(echo "$P_LOGIN" | node -e 'const d=JSON.parse(require("fs").readFileSync(0,"utf8"));process.stdout.write(d.accessToken||"")')

if [[ -z "$P_TOKEN" ]]; then
  echo "Participant login failed"
  exit 1
fi

echo "4) Save + submit prediction"
ENTRY_IDS=$(curl -sS -X GET "$API_URL/events/$EVENT_ID/entries" -H "authorization: Bearer $P_TOKEN" | node -e 'const d=JSON.parse(require("fs").readFileSync(0,"utf8"));process.stdout.write(JSON.stringify(d.map(x=>x.id)))')

PRED_BODY=$(node -e 'const ids=JSON.parse(process.argv[1]); const items=ids.map((id,i)=>({entryId:id,rank:i+1})); process.stdout.write(JSON.stringify({items}));' "$ENTRY_IDS")
curl -sS -X PUT "$API_URL/events/$EVENT_ID/predictions/me" -H "authorization: Bearer $P_TOKEN" -H 'content-type: application/json' -d "$PRED_BODY" >/dev/null
curl -sS -X POST "$API_URL/events/$EVENT_ID/predictions/me/submit" -H "authorization: Bearer $P_TOKEN" >/dev/null

echo "Integration smoke test erfolgreich"
