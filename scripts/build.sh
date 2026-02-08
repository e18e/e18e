#!/usr/bin/env bash
set -euo pipefail

SHA=$(cat scripts/module-replacements.sha)
CLONE_DIR="/tmp/module-replacements"

echo "Cloning es-tooling/module-replacements at $SHA..."
git clone --depth 1 https://github.com/es-tooling/module-replacements.git "$CLONE_DIR"
git -C "$CLONE_DIR" fetch --depth 1 origin "$SHA"
git -C "$CLONE_DIR" checkout "$SHA"

echo "Generating replacement docs..."
node scripts/generate-replacement-docs.js --path "$CLONE_DIR"

echo "Building site..."
pnpm run build
