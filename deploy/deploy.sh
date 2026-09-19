#!/usr/bin/env bash
# Pull the latest code, build the API, and restart. Run on the server:
#   bash /var/www/chikbo/deploy/deploy.sh
set -euo pipefail

APP_DIR=/var/www/chikbo
cd "$APP_DIR"

if [ ! -f apps/api/.env ]; then
  echo "apps/api/.env is missing — copy deploy/env.production.example and fill it in first." >&2
  exit 1
fi

echo "==> Code"
git pull --ff-only

echo "==> Dependencies"
npm ci

echo "==> Build (backend only — the frontend is deployed on web hosting)"
npm run build --workspace packages/shared
npm run prisma:generate --workspace apps/api
npm run build --workspace apps/api

echo "==> Restart"
if pm2 describe chikbo >/dev/null 2>&1; then
  pm2 reload deploy/ecosystem.config.cjs --update-env
else
  pm2 start deploy/ecosystem.config.cjs
fi

echo "==> Health"
for i in $(seq 1 20); do
  if curl -fsS http://127.0.0.1:4000/health >/dev/null; then echo "API is up."; exit 0; fi
  sleep 1
done
echo "API did not come up — check: pm2 logs chikbo" >&2
exit 1
