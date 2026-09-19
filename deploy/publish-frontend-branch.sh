#!/usr/bin/env bash
# Builds the frontend and publishes the ready-to-serve files to the
# `frontend-build` branch on GitHub. Web hosting that deploys from Git without
# building (Hostinger "Git" deployment) imports that branch into public_html.
#
#   bash deploy/publish-frontend-branch.sh
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE=$(git remote get-url origin)
SHA=$(git rev-parse --short HEAD)
bash deploy/build-frontend-for-hosting.sh
cd hosting-upload
rm -rf .git
git init -q -b frontend-build
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" commit -q -m "Frontend build from main@$SHA"
git push -q -f "$REMOTE" frontend-build
rm -rf .git
echo "Published branch frontend-build (from main@$SHA)"
