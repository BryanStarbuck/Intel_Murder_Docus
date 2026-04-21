import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const CURL_CMD = 'curl -fsSL https://intelligencemurders.com/videos/get_videos.sh | sh';
const SCRIPT_URL = 'https://intelligencemurders.com/videos/get_videos.sh';

const SCRIPT_CONTENT = `#!/bin/sh
# get_videos.sh — Download and pin all Intelligence Murders investigation videos via IPFS
#
# Usage: curl -fsSL https://intelligencemurders.com/videos/get_videos.sh | sh
# Works on Mac (Homebrew) and Linux. Windows users: run in WSL or Git Bash.

set -e

# Install IPFS (kubo) if not present
if ! command -v ipfs >/dev/null 2>&1; then
  echo "Installing IPFS (kubo)..."
  if command -v brew >/dev/null 2>&1; then
    brew install kubo
  else
    echo "Homebrew not found. Install IPFS manually: https://docs.ipfs.tech/install/"
    exit 1
  fi
fi

# Initialize IPFS repo if needed
if [ ! -d "$HOME/.ipfs" ]; then
  ipfs init
fi

# Start daemon in background if not running
if ! ipfs swarm peers >/dev/null 2>&1; then
  echo "Starting IPFS daemon..."
  ipfs daemon &
  sleep 6
fi

echo "========================================================"
echo "  Intelligence Murders — Video Archive"
echo "  Fetching and pinning all investigation videos..."
echo "========================================================"

# ============================================================
# Investigation: Epstein  (4 videos)
# ============================================================

ipfs get --output=2041564514613600337.mp4 QmTgkv47kg94emAw1yiKmGTdsj5NFQpFuuXwTicuzFSxay && ipfs pin add QmTgkv47kg94emAw1yiKmGTdsj5NFQpFuuXwTicuzFSxay
# Epstein | Survivor testimony: infant soul-hunting, mountain hunting rituals (@JOKAQARMY1)

ipfs get --output=2044172444752126124.mp4 QmWr3GCYCuoQQQBtxvse2ooZN8vEMqL39ihfaqjfbrx1Cv && ipfs pin add QmWr3GCYCuoQQQBtxvse2ooZN8vEMqL39ihfaqjfbrx1Cv
# Epstein | Don Henry & Kevin Ives: CIA Mena cocaine, Barry Seal (@TheShadowIntelX)

ipfs get --output=2044981725244113315.mp4 QmY93HMjeo3xr4jLm8y7DXM4yV1EfJt5u2bKfzzgtAPVqi && ipfs pin add QmY93HMjeo3xr4jLm8y7DXM4yV1EfJt5u2bKfzzgtAPVqi
# Epstein | Edgar Maddison Welch killed before Epstein file releases (@thematrixb0t)

# ============================================================
# Investigation: Intel  (1 video)
# ============================================================

ipfs get --output=2044938947495940117.mp4 Qmcsf7pCYjaits6N4NE2tuyKVYGUEcE6nAR5o4CASR5FaJ && ipfs pin add Qmcsf7pCYjaits6N4NE2tuyKVYGUEcE6nAR5o4CASR5FaJ
# Intel | General Patton speaking before his assassination (@DigitalGermania)

echo "========================================================"
echo "  Done. Videos downloaded and pinned to local IPFS node."
echo "  Verify with: ipfs pin ls --type=recursive"
echo "========================================================"`;

function CopyBox() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(CURL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      onClick={handleCopy}
      title="Click to copy"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--ifm-code-background)',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '8px',
        padding: '0.9rem 1.2rem',
        cursor: 'pointer',
        userSelect: 'none',
        maxWidth: '680px',
        gap: '1rem',
      }}
    >
      <code style={{ fontSize: '0.95rem', fontFamily: 'var(--ifm-font-family-monospace)', flexGrow: 1 }}>
        {CURL_CMD}
      </code>
      <span style={{
        fontSize: '0.78rem',
        fontWeight: 600,
        color: copied ? 'var(--ifm-color-success)' : 'var(--ifm-color-primary)',
        whiteSpace: 'nowrap',
        minWidth: '60px',
        textAlign: 'right',
      }}>
        {copied ? '\u2713 Copied' : '\u2398 Copy'}
      </span>
    </div>
  );
}

export default function IpfsPage(): React.ReactElement {
  return (
    <Layout
      title="IPFS Video Network"
      description="Help keep Intelligence Murders investigation videos alive by running one command to download and pin them via IPFS."
    >
      <main>
        <div className="container margin-vert--lg" style={{ maxWidth: '860px' }}>

          <h1>IPFS Video Network</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            Every investigation on this site includes video evidence. Those videos are stored
            on <strong>IPFS</strong> — the InterPlanetary File System — a decentralized network
            where files are identified by their content, not by a server address. That means no
            single company can take them down.
          </p>
          <p>
            When you run the script below, you pin the videos to your local IPFS node.
            Pinning fetches the content from the network and makes your machine a host for
            it — anyone else who wants the videos can get them from you, just like BitTorrent.
            The more people who run this, the harder the videos become to censor or lose.
          </p>

          <div style={{
            background: 'var(--ifm-color-info-contrast-background)',
            border: '1px solid var(--ifm-color-info-contrast-foreground)',
            borderRadius: '8px',
            padding: '1rem 1.25rem',
            marginBottom: '2rem',
          }}>
            <strong>Why this matters:</strong> YouTube, Twitter, and other platforms regularly
            remove videos that challenge official narratives. Once a video is pinned on IPFS by
            enough people, no platform can delete it. Running this script makes you part of
            the preservation network.
          </div>

          <h2>Run it</h2>
          <p>
            Paste this command in your terminal. It installs IPFS if needed, starts the daemon,
            and pins all videos to your node. Works on Mac (requires{' '}
            <a href="https://brew.sh" target="_blank" rel="noopener noreferrer">Homebrew</a>)
            and Linux. Windows users: run in WSL or Git Bash.
          </p>

          <CopyBox />

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={SCRIPT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.1rem',
                background: 'var(--ifm-color-primary)',
                color: '#fff',
                borderRadius: '4px',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              View get_videos.sh
            </a>
            <Link
              to="/"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.1rem',
                border: '1px solid var(--ifm-color-primary)',
                color: 'var(--ifm-color-primary)',
                borderRadius: '4px',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              Back to Investigations
            </Link>
          </div>

          <h2 style={{ marginTop: '2.5rem' }}>What the script does</h2>
          <ol style={{ lineHeight: 2 }}>
            <li>Checks if IPFS (kubo) is installed — installs it via Homebrew if not</li>
            <li>Initializes your local IPFS repository if this is your first run</li>
            <li>Starts the IPFS daemon in the background if it isn't already running</li>
            <li>Fetches and pins each video to your node by content hash (CID)</li>
            <li>Your node becomes a host — others can retrieve the videos from you</li>
          </ol>
          <p>
            After running it, keep the daemon running (or set it to auto-start with{' '}
            <code>brew services start kubo</code>) so your node stays connected and serves
            videos to others. Videos are accessible locally at{' '}
            <code>http://127.0.0.1:8080/ipfs/{'<CID>'}</code>.
          </p>

          <h2 style={{ marginTop: '2.5rem' }}>Video inventory</h2>
          <table>
            <thead>
              <tr>
                <th>Investigation</th>
                <th>Description</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Epstein</td>
                <td>Survivor testimony: infant soul-hunting, mountain hunting rituals</td>
                <td><a href="https://x.com/JOKAQARMY1/status/2041564514613600337" target="_blank" rel="noopener noreferrer">@JOKAQARMY1</a></td>
              </tr>
              <tr>
                <td>Epstein</td>
                <td>Don Henry & Kevin Ives: CIA Mena cocaine operation, Barry Seal</td>
                <td><a href="https://x.com/TheShadowIntelX/status/2044172444752126124" target="_blank" rel="noopener noreferrer">@TheShadowIntelX</a></td>
              </tr>
              <tr>
                <td>Epstein</td>
                <td>Edgar Maddison Welch killed before Epstein file releases</td>
                <td><a href="https://x.com/thematrixb0t/status/2044981725244113315" target="_blank" rel="noopener noreferrer">@thematrixb0t</a></td>
              </tr>
              <tr>
                <td>Intel</td>
                <td>General Patton speaking before his assassination</td>
                <td><a href="https://x.com/DigitalGermania/status/2044938947495940117" target="_blank" rel="noopener noreferrer">@DigitalGermania</a></td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)' }}>
            Full metadata available at{' '}
            <a href="/videos/manifest.yaml">manifest.yaml</a>.
          </p>

          <h2 style={{ marginTop: '2.5rem' }}>Script contents</h2>
          <p>
            Review what will run before you run it:
          </p>
          <pre style={{
            background: 'var(--ifm-code-background)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            padding: '1.25rem',
            overflowX: 'auto',
            fontSize: '0.78rem',
            lineHeight: 1.55,
          }}>
            <code>{SCRIPT_CONTENT}</code>
          </pre>

        </div>
      </main>
    </Layout>
  );
}
