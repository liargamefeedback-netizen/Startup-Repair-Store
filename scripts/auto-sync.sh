#!/usr/bin/env bash
# ============================================================
# auto-sync.sh — Startup Repair Store
#
# Watches the project for file changes and automatically
# commits + pushes them to the GitHub remote (origin/<branch>).
#
# Usage:
#   ./scripts/auto-sync.sh              # run in foreground
#   nohup ./scripts/auto-sync.sh > /tmp/auto_sync.log 2>&1 &   # background
#
# Requirements:
#   - git + push access to the origin remote (see README)
#   - Optional env: AUTO_SYNC_INTERVAL (seconds, default 5)
# ============================================================
set -u

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR" || exit 1

BRANCH="${AUTO_SYNC_BRANCH:-main}"
INTERVAL="${AUTO_SYNC_INTERVAL:-5}"
DEBOUNCE=2   # seconds to wait before committing, to catch in-progress writes

log() { echo "[auto-sync $(date '+%F %H:%M:%S')] $*"; }

sync_once() {
  local porc
  porc="$(git status --porcelain 2>/dev/null)" || { log "git error; retrying"; return; }
  [ -z "$porc" ] && return

  sleep "$DEBOUNCE"   # let editors finish saving before snapshotting
  git add -A || return

  if ! git commit -m "Auto-sync: $(date '+%F %T')" -q; then
    log "nothing to commit after add"
    return
  fi

  local sha
  sha="$(git rev-parse --short HEAD)"
  if git push origin "$BRANCH" -q 2>/dev/null; then
    log "pushed commit $sha ($BRANCH)"
  else
    log "commit $sha local — PUSH FAILED (check credentials/network)"
  fi
}

log "watching $REPO_DIR (branch=$BRANCH, interval=${INTERVAL}s)"
while true; do
  sync_once
  sleep "$INTERVAL"
done