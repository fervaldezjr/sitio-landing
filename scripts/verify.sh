#!/usr/bin/env bash
# One command: lint, brand, tests, build, wipe, links, contrast.
set -euo pipefail
cd "$(dirname "$0")/.."
export ASTRO_TELEMETRY_DISABLED=1

echo "== lint =="
npm run lint

echo "== brand =="
node scripts/check-brand.mjs

echo "== test =="
npm test

echo "== build =="
npm run build

echo "== wipe =="
node scripts/check-wipe.mjs

echo "== links =="
node scripts/check-links.mjs

echo "== contrast =="
node scripts/check-contrast.mjs

echo "verify ok"
