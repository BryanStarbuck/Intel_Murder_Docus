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

# ============================================================
# Investigation: Epstein  (8 videos)
# ============================================================

ipfs get --output=2041564514613600337.mp4 QmTgkv47kg94emAw1yiKmGTdsj5NFQpFuuXwTicuzFSxay && ipfs pin add QmTgkv47kg94emAw1yiKmGTdsj5NFQpFuuXwTicuzFSxay
# Epstein | Survivor testimony: alleged infant soul-hunting, mountain hunting rituals, Texas ranch human hunting (@JOKAQARMY1)
# Source: https://x.com/JOKAQARMY1/status/2041564514613600337

ipfs get --output=2044172444752126124.mp4 QmWr3GCYCuoQQQBtxvse2ooZN8vEMqL39ihfaqjfbrx1Cv && ipfs pin add QmWr3GCYCuoQQQBtxvse2ooZN8vEMqL39ihfaqjfbrx1Cv
# Epstein | Don Henry and Kevin Ives: CIA Mena cocaine operation, Barry Seal, Clinton-Bush connection (@TheShadowIntelX)
# Source: https://x.com/TheShadowIntelX/status/2044172444752126124

ipfs get --output=2044981725244113315.mp4 QmY93HMjeo3xr4jLm8y7DXM4yV1EfJt5u2bKfzzgtAPVqi && ipfs pin add QmY93HMjeo3xr4jLm8y7DXM4yV1EfJt5u2bKfzzgtAPVqi
# Epstein | Edgar Maddison Welch killed by police during traffic stop weeks before Epstein file releases (@thematrixb0t)
# Source: https://x.com/thematrixb0t/status/2044981725244113315

ipfs get --output=2048522569716990042.mp4 QmPhTsRUJBZqBZwoDaBaVU33eP7vAtjLur3q96JXyMNYKf && ipfs pin add QmPhTsRUJBZqBZwoDaBaVU33eP7vAtjLur3q96JXyMNYKf
# Epstein | Nadia Marcinkova — Epstein Lolita Express pilot deposed, pled Fifth 42 times, went missing 2024, DOJ files deleted (@thematrixb0t)
# Source: https://x.com/thematrixb0t/status/2048522569716990042

ipfs get --output=2051013988985811342.mp4 QmPxPyffC2DiTNLnr2YKQW75VHjCfYWxjHhkPNiiJXmGEp && ipfs pin add QmPxPyffC2DiTNLnr2YKQW75VHjCfYWxjHhkPNiiJXmGEp
# Epstein | Senator Nancy Schaefer — Georgia senator who exposed CPS corruption and child trafficking; found shot dead with husband in disputed murder-suicide ruling (@redpillb0t)
# Source: https://x.com/redpillb0t/status/2051013988985811342

ipfs get --output=2054372519465881910.mp4 QmVaCP5zb5moZ4iQsLzA13wyvFys4ULKKtYCvg7zLmELDk && ipfs pin add QmVaCP5zb5moZ4iQsLzA13wyvFys4ULKKtYCvg7zLmELDk
# Epstein | Statement attributed to Madison (Clares) Cupps about her father Bryan Cupps and CyberSlice (1996 online pizza ordering company); Madison reportedly died April 10, 2026 (@TheEmmapreneur)
# Source: https://x.com/TheEmmapreneur/status/2054372519465881910

ipfs get --output=2054664863381635215.mp4 QmXr8WbzhobLU6Q19zm9eU7Ep2cHDm9JNwDrRwmshVPPEv && ipfs pin add QmXr8WbzhobLU6Q19zm9eU7Ep2cHDm9JNwDrRwmshVPPEv
# Epstein | Isaac Kappy video compilation — actor who accused Hollywood elites of pedophilia and claimed Epstein-network blackmail files; fell from Arizona bridge May 13, 2019 (@JOKAQARMY1)
# Source: https://x.com/JOKAQARMY1/status/2054664863381635215

# ============================================================
# Investigation: Intel  (6 videos)
# ============================================================

ipfs get --output=2044938947495940117.mp4 Qmcsf7pCYjaits6N4NE2tuyKVYGUEcE6nAR5o4CASR5FaJ && ipfs pin add Qmcsf7pCYjaits6N4NE2tuyKVYGUEcE6nAR5o4CASR5FaJ
# Intel | General George S. Patton speaking about the postwar situation before his assassination (@DigitalGermania)
# Source: https://x.com/DigitalGermania/status/2044938947495940117

ipfs get --output=2050269015931818033.mp4 QmPH2mqWHQ9UQ79cWXYo61E8qRe7jRN4MGa1j25sw38NKA && ipfs pin add QmPH2mqWHQ9UQ79cWXYo61E8qRe7jRN4MGa1j25sw38NKA
# Intel | Andrija Puharich house arson: son Andy and filmmaker Greg Mallozzi explain ELF research targeting (@JonesDanny)
# Source: https://x.com/JonesDanny/status/2050269015931818033

ipfs get --output=2050380101821354119.mp4 QmcpJNervZ1cxrWAXu12U5k2NB2Yz32A1dtfxLYUgSuonC && ipfs pin add QmcpJNervZ1cxrWAXu12U5k2NB2Yz32A1dtfxLYUgSuonC
# Intel | Phil Schneider 1995 lecture — claims government earthquake device, cites Kobe and San Francisco quakes (@DanielGilr44222)
# Source: https://x.com/DanielGilr44222/status/2050380101821354119?s=20

ipfs get --output=2050199029980512338.mp4 QmQTYvMVvFYYaHSYKxGpMKRgW98tyx1yCn6zDZrj2veeeN && ipfs pin add QmQTYvMVvFYYaHSYKxGpMKRgW98tyx1yCn6zDZrj2veeeN
# Intel | Panama Papers exposé — offshore tax evasion by global elites, assassination of Daphne Caruana Galizia (@theleftbible)
# Source: https://x.com/theleftbible/status/2050199029980512338

ipfs get --output=2050968626413363217.mp4 QmXNAhyAVsJGGgkbDuPbYBrZeS8J8bkayS37zo1XbLFeR1 && ipfs pin add QmXNAhyAVsJGGgkbDuPbYBrZeS8J8bkayS37zo1XbLFeR1
# Intel | Former MI5 agent on Princess Diana — landmine campaign success and plan to campaign for Palestinians as motive (@NoahsArk1000)
# Source: https://x.com/NoahsArk1000/status/2050968626413363217

ipfs get --output=2053290253494981052.mp4 QmZ7acpS7exGgJ9CnrVK4ChpxLinyiyjkrEFiqgHLbHGke && ipfs pin add QmZ7acpS7exGgJ9CnrVK4ChpxLinyiyjkrEFiqgHLbHGke
# Intel | Loretta Fuddy — Hawaii Health Director who verified Obama birth certificate, sole fatality in survivable 2013 Molokai plane crash (@LightOnLiberty)
# Source: https://x.com/LightOnLiberty/status/2053290253494981052


echo ""
echo "========================================================"
echo "  Done. Videos downloaded and pinned to local IPFS node."
echo "  Verify with: ipfs pin ls --type=recursive"
echo "========================================================"
echo ""
