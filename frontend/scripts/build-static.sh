#!/usr/bin/env bash
# Uso: bash scripts/build-static.sh emulator|firebase
set -e
MODE=${1:-firebase}
cd "$(dirname "$0")/../frontend"

if [ "$MODE" = "emulator" ]; then
  export NEXT_PUBLIC_DATA_SOURCE=firestore
  export NEXT_PUBLIC_USE_EMULATOR=true
  export NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-semana5
  export NEXT_PUBLIC_FIREBASE_API_KEY=demo-key
  export NEXT_PUBLIC_FIREBASE_APP_ID=demo-app
else
  set -a; source .env.firebase; set +a   # arquivo local, fora do Git
fi

STATIC_EXPORT=true npm run build
