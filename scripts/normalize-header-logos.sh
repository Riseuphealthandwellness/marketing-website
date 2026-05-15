#!/usr/bin/env bash
set -euo pipefail

#
# Normalize Rise Up header logos so the artwork has a safe padding area
# inside a fixed-size canvas (prevents subpixel/viewport-edge "clipping").
#
# Requirements:
#   - ImageMagick (the `magick` CLI) available on PATH
#
# Defaults write to:
#   apps/web/public/images/brand/riseup-logo-light.png
#   apps/web/public/images/brand/riseup-logo-dark.png
#
# Usage examples:
#   ./scripts/normalize-header-logos.sh
#   ./scripts/normalize-header-logos.sh --scale 95
#   ./scripts/normalize-header-logos.sh \
#     --light /path/to/light_153x132.png \
#     --dark  /path/to/dark_153x132.png
#

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

LIGHT_IN="$ROOT_DIR/apps/web/public/images/brand/riseup-logo-light.png"
DARK_IN="$ROOT_DIR/apps/web/public/images/brand/riseup-logo-dark.png"
OUT_DIR="$ROOT_DIR/apps/web/public/images/brand"

CANVAS_W=153
CANVAS_H=132
SCALE_PCT=96

die() {
  echo "error: $*" 1>&2
  exit 1
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "missing required command: $1"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --light)
      LIGHT_IN="${2:-}"; shift 2;;
    --dark)
      DARK_IN="${2:-}"; shift 2;;
    --out-dir)
      OUT_DIR="${2:-}"; shift 2;;
    --width)
      CANVAS_W="${2:-}"; shift 2;;
    --height)
      CANVAS_H="${2:-}"; shift 2;;
    --scale)
      SCALE_PCT="${2:-}"; shift 2;;
    -h|--help)
      sed -n '1,120p' "$0"
      exit 0;;
    *)
      die "unknown argument: $1";;
  esac
done

need_cmd magick

[[ -f "$LIGHT_IN" ]] || die "light input not found: $LIGHT_IN"
[[ -f "$DARK_IN" ]] || die "dark input not found: $DARK_IN"
[[ "$CANVAS_W" =~ ^[0-9]+$ ]] || die "--width must be an integer"
[[ "$CANVAS_H" =~ ^[0-9]+$ ]] || die "--height must be an integer"
[[ "$SCALE_PCT" =~ ^[0-9]+$ ]] || die "--scale must be an integer percent"

mkdir -p "$OUT_DIR"

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

out_light="$OUT_DIR/riseup-logo-light.png"
out_dark="$OUT_DIR/riseup-logo-dark.png"

tmp_light="$tmp_dir/light.png"
tmp_dark="$tmp_dir/dark.png"

magick "$LIGHT_IN" \
  -resize "${SCALE_PCT}%" \
  -background none \
  -gravity center \
  -extent "${CANVAS_W}x${CANVAS_H}" \
  "$tmp_light"

magick "$DARK_IN" \
  -resize "${SCALE_PCT}%" \
  -background none \
  -gravity center \
  -extent "${CANVAS_W}x${CANVAS_H}" \
  "$tmp_dark"

mv -f "$tmp_light" "$out_light"
mv -f "$tmp_dark" "$out_dark"

echo "wrote:"
echo "  $out_light"
echo "  $out_dark"
