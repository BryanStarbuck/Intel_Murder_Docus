#!/bin/sh
#
# =========================================================
#  Intelligence Murders — Video Archive
#  https://intelligencemurders.com
# =========================================================
#
#  This page is both human-readable and executable as a shell script.
#
#  TO DOWNLOAD ALL INVESTIGATION VIDEOS — copy and run this command:
#
#    curl -fsSL https://intelligencemurders.com/videos/get_videos.sh | sh
#
#  The curl line above is in a comment. Running this file as sh
#  will NOT re-download itself. It will only execute the commands below.
#
#  Requires IPFS (kubo). Auto-installs on Mac via Homebrew.
#  Linux users: https://docs.ipfs.tech/install/
#  Windows users: run in WSL or Git Bash.
#
#  Each video is fetched from the IPFS network and pinned to your
#  local node so the content stays available even if upstream links die.
#
#  Full metadata (IPFS CIDs, sources, descriptions):
#    https://intelligencemurders.com/videos/manifest.yaml
#
# =========================================================

set -e


# ---- IPFS Setup ----

if ! command -v ipfs >/dev/null 2>&1; then
  echo "IPFS (kubo) not found. Attempting install..."
  if command -v brew >/dev/null 2>&1; then
    brew install kubo
  else
    echo ""
    echo "ERROR: Homebrew not found. Install IPFS manually:"
    echo "  https://docs.ipfs.tech/install/"
    exit 1
  fi
fi

if [ ! -d "$HOME/.ipfs" ]; then
  echo "Initializing IPFS repository..."
  ipfs init
fi

if ! ipfs swarm peers >/dev/null 2>&1; then
  echo "Starting IPFS daemon in background..."
  ipfs daemon &
  sleep 6
fi


# ---- Download and Pin Videos ----

echo ""
echo "========================================================"
echo "  Intelligence Murders — Video Archive"
echo "  Fetching and pinning all investigation videos..."
echo "========================================================"
echo ""

ipfs get --output=2041564514613600337.mp4 QmTgkv47kg94emAw1yiKmGTdsj5NFQpFuuXwTicuzFSxay && ipfs pin add QmTgkv47kg94emAw1yiKmGTdsj5NFQpFuuXwTicuzFSxay
# Epstein | Survivor testimony: alleged infant soul-hunting, mountain hunting rituals, Texas ranch human hunting (@JOKAQARMY1)
# Source: https://x.com/JOKAQARMY1/status/2041564514613600337


echo ""
echo "========================================================"
echo "  Done. Videos downloaded and pinned to local IPFS node."
echo "  Verify with: ipfs pin ls --type=recursive"
echo "========================================================"
echo ""
