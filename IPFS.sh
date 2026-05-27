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
# Investigation: Epstein  (8 videos)
# ============================================================

# VIDEO: Epstein survivor testimony — alleged infant soul-hunting, mountain hunting rituals, Texas ranch human hunting
ipfs pin add QmTgkv47kg94emAw1yiKmGTdsj5NFQpFuuXwTicuzFSxay

# VIDEO: Don Henry and Kevin Ives — CIA Mena cocaine operation, Barry Seal, Clinton-Bush connection
ipfs pin add QmWr3GCYCuoQQQBtxvse2ooZN8vEMqL39ihfaqjfbrx1Cv

# VIDEO: Edgar Maddison Welch killed by police during traffic stop weeks before Epstein file releases
ipfs pin add QmY93HMjeo3xr4jLm8y7DXM4yV1EfJt5u2bKfzzgtAPVqi

# AUDIO: Edgar Maddison Welch case discussion (audio extract)
ipfs pin add QmNn9K6CnRpQD1x9G9HrsxyAKWnspFWSE31QkfhsjUT9nY

# VIDEO: Nadia Marcinkova — Epstein Lolita Express pilot deposed, pled Fifth 42 times, went missing 2024, DOJ files deleted
ipfs pin add QmPhTsRUJBZqBZwoDaBaVU33eP7vAtjLur3q96JXyMNYKf

# VIDEO: Senator Nancy Schaefer — Georgia state senator who exposed CPS corruption and child trafficking; found shot dead with husband in disputed murder-suicide ruling
ipfs pin add QmPxPyffC2DiTNLnr2YKQW75VHjCfYWxjHhkPNiiJXmGEp

# VIDEO: Statement attributed to Madison (Clares) Cupps about her father Bryan Cupps and CyberSlice (1996 online pizza ordering company); Madison reportedly died April 10, 2026
ipfs pin add QmVaCP5zb5moZ4iQsLzA13wyvFys4ULKKtYCvg7zLmELDk

# VIDEO: Isaac Kappy video compilation — actor who accused Hollywood elites of pedophilia and claimed Epstein-network blackmail files; fell from Arizona bridge May 13, 2019
ipfs pin add QmXr8WbzhobLU6Q19zm9eU7Ep2cHDm9JNwDrRwmshVPPEv

# ============================================================
# Investigation: Intel  (6 videos)
# ============================================================

# VIDEO: General George S. Patton speaking about the postwar situation before his assassination
ipfs pin add Qmcsf7pCYjaits6N4NE2tuyKVYGUEcE6nAR5o4CASR5FaJ

# VIDEO: Andrija Puharich house arson — ELF research targeted by intelligence
ipfs pin add QmPH2mqWHQ9UQ79cWXYo61E8qRe7jRN4MGa1j25sw38NKA

# VIDEO: Phil Schneider 1995 lecture — claims government earthquake device, cites Kobe and San Francisco quakes
ipfs pin add QmcpJNervZ1cxrWAXu12U5k2NB2Yz32A1dtfxLYUgSuonC

# VIDEO: Panama Papers exposé — offshore tax evasion by global elites, assassination of Daphne Caruana Galizia
ipfs pin add QmQTYvMVvFYYaHSYKxGpMKRgW98tyx1yCn6zDZrj2veeeN

# VIDEO: Former MI5 agent on Princess Diana — landmine campaign success and plan to campaign for Palestinians as motive
ipfs pin add QmXNAhyAVsJGGgkbDuPbYBrZeS8J8bkayS37zo1XbLFeR1

# VIDEO: Loretta Fuddy — Hawaii Health Director who verified Obama birth certificate, sole fatality in survivable 2013 Molokai plane crash
ipfs pin add QmZ7acpS7exGgJ9CnrVK4ChpxLinyiyjkrEFiqgHLbHGke

echo "All Intelligence Murders investigation videos pinned."

# ============================================================
# Reconciled additions (2026-05-13)
# ============================================================

# 2048522569716990042.mp3  (investigation: Intel)
ipfs pin add QmZgRXuyh6JXKFYfGqzjCJJZ9PRezVEvUtTSyyaaGLfdgw

# 2050199029980512338.mp3  (investigation: Intel)
ipfs pin add QmYEdQyR2gJJGJWMMPE436kJ4wRiDyn9wRmJBYeat7UWm2

# 2050269015931818033.mp3  (investigation: Intel)
ipfs pin add QmeAqzjEa7uWsXEUo6esKAFQMKWL4Z1mKpWb3zAT9PBau1

# 2050380101821354119.mp3  (investigation: Intel)
ipfs pin add QmTTWtAdci1V9RQSaTVA5J181BAWsPnXjj4XmULNzLbnew

# 2050968626413363217.mp3  (investigation: Intel)
ipfs pin add QmdAsJbSTdhHG8MzGU9DCd2SUgJN9P3w86S4NyGohyLY5A

# 2051013988985811342.mp3  (investigation: Intel)
ipfs pin add QmVC7YF54EJHDZ1dZEmHwJdXd37QB56apv9b3rbvSmWtv2

# 2054372519465881910.mp3  (investigation: Intel)
ipfs pin add Qmc46V5BygAMifvMuWV7Vaqd2GGWoQGuWnzHSmUnyUAJEh

# 2054664863381635215.mp3  (investigation: Intel)
ipfs pin add Qmdiov3dSkW9rt1nHXFjAmsoyLu5sskL3AZexdPhHttoZN

# 2059495213261840428.mp4  (investigation: Intel) — Fatou Bensouda on alleged Mossad/Cohen threats
ipfs pin add QmYewzMTzg3kDFXyX6iQCU49mUCvU2p4ih21V7DJ5yuRvi
