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

npm run build --workspace packages/shared
VITE_API_URL="$API_ORIGIN/api/v1" VITE_SITE_URL="$SITE_URL" npm run build --workspace apps/web
VITE_API_URL="$API_ORIGIN" VITE_WEB_URL="$SITE_URL" npm run build --workspace apps/admin

OUT=hosting-upload
rm -rf "$OUT"
mkdir -p "$OUT/admin"
cp -R apps/web/dist/. "$OUT/"
cp -R apps/admin/dist/admin/. "$OUT/admin/"

# Single-page apps: send every unknown path to index.html (Apache / LiteSpeed).
cat > "$OUT/.htaccess" <<'HT'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{HTTPS} off
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
  RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]
  RewriteRule ^admin(/.*)?$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
<IfModule mod_headers.c>
  <FilesMatch "\.(js|css|woff2?|png|jpe?g|webp|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "index\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
HT
cat > "$OUT/admin/.htaccess" <<'HT'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /admin/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /admin/index.html [L]
</IfModule>
HT

echo "Ready: $OUT/ (storefront at /, admin at /admin)"
