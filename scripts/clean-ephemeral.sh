#!/usr/bin/env bash
set -euo pipefail

# Clean ephemeral/dev/build artifacts for this repo.
# Safe by default: does NOT delete node_modules, .env*, or source files.
#
# Usage:
#   ./scripts/clean-ephemeral.sh
#   ./scripts/clean-ephemeral.sh --deep   # also removes node_modules + lockfile-derived caches
#

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="${1:-.}"

DEEP=0
if [[ "$TARGET_DIR" == "--deep" ]]; then
  DEEP=1
  TARGET_DIR="."
elif [[ "${2:-}" == "--deep" ]]; then
  DEEP=1
fi

declare -a CLEAN_DIRS=("$ROOT_DIR/$TARGET_DIR")

if [[ "$TARGET_DIR" == "." ]]; then
  while IFS= read -r package_dir; do
    CLEAN_DIRS+=("$package_dir")
  done < <(find "$ROOT_DIR/apps" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | sort)
fi

targets=(
  ".next"
  ".turbo"
  "out"
  "dist"
  "coverage"
  ".vercel"
  ".eslintcache"
  "tsconfig.tsbuildinfo"
)

for dir in "${CLEAN_DIRS[@]}"; do
  cd "$dir"

  for t in "${targets[@]}"; do
    if [[ -e "$t" ]]; then
      rm -rf "$t"
    fi
  done
done

# Common transient macOS cruft
find "$ROOT_DIR" -name ".DS_Store" -type f -delete 2>/dev/null || true

if [[ "$DEEP" -eq 1 ]]; then
  for dir in "${CLEAN_DIRS[@]}"; do
    rm -rf "$dir/node_modules"
  done
  # Keep package-lock.json, but remove any npm cache dirs inside repo if present
  rm -rf "$ROOT_DIR/.npm"
fi

echo "Cleaned ephemeral artifacts."
if [[ "$DEEP" -eq 1 ]]; then
  echo "Deep clean: node_modules removed."
fi
