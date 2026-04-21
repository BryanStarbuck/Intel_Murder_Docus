#!/bin/sh
# IPFS evidence pin script for the Intelligence Murders investigation.
# Run on any machine with IPFS installed and the daemon running.
#
# 'ipfs pin add <CID>' fetches the content from the IPFS network into your
# local node and pins it so it is never garbage-collected. Pinned nodes
# rebroadcast the content to other peers — keeping the evidence live.
#
# To also write a video file to disk:
#   ipfs get -o <filename> <CID>
#
# This file is the master IPFS pin manifest for the Intelligence Murders site.
# It is served publicly via the Docusaurus site as /IPFS.sh
# Source of truth: ~/BGit/Bryan_git/Intel_Murder_Docus/IPFS.sh
# The static/IPFS.sh is a symlink pointing here.
# Entries are derived from: static/videos/manifest.yaml

# ============================================================
# Investigation: Epstein  (4 videos)
# ============================================================

# VIDEO: Epstein survivor testimony — alleged infant soul-hunting, mountain hunting rituals, Texas ranch human hunting
ipfs pin add QmTgkv47kg94emAw1yiKmGTdsj5NFQpFuuXwTicuzFSxay

# VIDEO: Don Henry and Kevin Ives — CIA Mena cocaine operation, Barry Seal, Clinton-Bush connection
ipfs pin add QmWr3GCYCuoQQQBtxvse2ooZN8vEMqL39ihfaqjfbrx1Cv

# VIDEO: Edgar Maddison Welch killed by police during traffic stop weeks before Epstein file releases
ipfs pin add QmY93HMjeo3xr4jLm8y7DXM4yV1EfJt5u2bKfzzgtAPVqi

# AUDIO: Edgar Maddison Welch case discussion (audio extract)
ipfs pin add QmNn9K6CnRpQD1x9G9HrsxyAKWnspFWSE31QkfhsjUT9nY

# ============================================================
# Investigation: Intel  (1 video)
# ============================================================

# VIDEO: General George S. Patton speaking about the postwar situation before his assassination
ipfs pin add Qmcsf7pCYjaits6N4NE2tuyKVYGUEcE6nAR5o4CASR5FaJ

echo "All Intelligence Murders investigation videos pinned."
