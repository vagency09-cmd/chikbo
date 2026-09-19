#!/usr/bin/env bash
# Builds the storefront and admin for ordinary web hosting (Hostinger, cPanel…)
# into hosting-upload/ — the exact contents of public_html. The API stays on
# the VPS at api.chikbo.com.
#
#   bash deploy/build-frontend-for-hosting.sh      (or: npm run build:hosting)
#
# Hosting that can build from GitHub: build command `npm run build:hosting`,
# output directory `hosting-upload`. Hosting that only copies files: use
# deploy/publish-frontend-branch.sh and import the `frontend-build` branch.
set -euo pipefail
cd "$(dirname "$0")/.."

API_ORIGIN="${API_ORIGIN:-https://api.chikbo.com}"
SITE_URL="${SITE_URL:-https://chikbo.com}"

# The storefront build compiles the shared package first and bundles the admin
# console at dist/admin (see deploy/hosting-prebuild.mjs / hosting-postbuild.mjs).
# Production addresses come from apps/*/.env.production.
npm run build --workspace apps/web

OUT=hosting-upload
rm -rf "$OUT"
cp -R apps/web/dist "$OUT"

echo "Ready: $OUT/ (storefront at /, admin at /admin)"
