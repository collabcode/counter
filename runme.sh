#!/usr/bin/env bash

set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$APP_DIR"

usage() {
  cat <<EOF
Usage: ./runme.sh [command]

Commands:
  install   Install dependencies
  dev       Start the dev server (default)
  build     Build for production
  preview   Preview the production build

Examples:
  ./runme.sh            # start dev server
  ./runme.sh install    # install deps
  ./runme.sh build      # build
  ./runme.sh preview    # preview build
EOF
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: Required command '$1' not found in PATH" >&2
    exit 1
  fi
}

check_node() {
  require_cmd node
  local major
  major="$(node -p "process.versions.node.split('.') [0]")"
  if [ "$major" -lt 18 ]; then
    echo "Error: Node.js >= 18 is required (found $(node -v))" >&2
    exit 1
  fi
}

detect_pm() {
  if [ -f pnpm-lock.yaml ]; then echo pnpm; return; fi
  if [ -f yarn.lock ]; then echo yarn; return; fi
  if [ -f bun.lockb ]; then echo bun; return; fi
  echo npm
}

ensure_env() {
  # Optional: create a local env file if README mentions GEMINI_API_KEY
  if [ ! -f .env.local ]; then
    cat > .env.local <<'EOV'
# Optional environment file for local dev
# If you plan to use a Gemini API key in the app, set it here and read via import.meta.env.VITE_GEMINI_API_KEY
VITE_GEMINI_API_KEY=
EOV
  fi
}

install_deps() {
  local pm
  pm="$(detect_pm)"
  case "$pm" in
    pnpm) require_cmd pnpm; pnpm install;;
    yarn) require_cmd yarn; yarn install;;
    bun)  require_cmd bun;  bun install;;
    npm)  require_cmd npm;  npm install;;
  esac
}

run_dev() {
  local pm
  pm="$(detect_pm)"
  case "$pm" in
    pnpm) pnpm run dev -- --open;;
    yarn) yarn dev --open;;
    bun)  bun run dev -- --open;;
    npm)  npm run dev -- -- --open;;
  esac
}

run_build() {
  local pm
  pm="$(detect_pm)"
  case "$pm" in
    pnpm) pnpm run build;;
    yarn) yarn build;;
    bun)  bun run build;;
    npm)  npm run build;;
  esac
}

run_preview() {
  local pm
  pm="$(detect_pm)"
  case "$pm" in
    pnpm) pnpm run preview -- --open;;
    yarn) yarn preview --open;;
    bun)  bun run preview -- --open;;
    npm)  npm run preview -- -- --open;;
  esac
}

main() {
  local cmd
  cmd="${1:-dev}"
  case "$cmd" in
    -h|--help|help) usage; exit 0;;
  esac

  check_node
  ensure_env

  case "$cmd" in
    install) install_deps ;;
    dev)     install_deps; run_dev ;;
    build)   install_deps; run_build ;;
    preview) install_deps; run_preview ;;
    *) echo "Unknown command: $cmd" >&2; echo; usage; exit 1;;
  esac
}

main "$@"



