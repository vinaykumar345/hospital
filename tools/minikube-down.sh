#!/usr/bin/env bash
set -euo pipefail

if [[ -f /tmp/kpf-api.pid ]]; then
  kill "$(cat /tmp/kpf-api.pid)" 2>/dev/null || true
  rm -f /tmp/kpf-api.pid
fi

if [[ -f /tmp/kpf-web.pid ]]; then
  kill "$(cat /tmp/kpf-web.pid)" 2>/dev/null || true
  rm -f /tmp/kpf-web.pid
fi

if command -v kubectl >/dev/null 2>&1; then
  kubectl delete namespace ai-hospital-assistant --ignore-not-found=true
fi

echo "Local deployment stopped."
