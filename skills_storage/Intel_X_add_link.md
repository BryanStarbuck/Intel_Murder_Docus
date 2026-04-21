---
name: Intel_X_add_link
description: Download an X/Twitter post by URL, determine which investigation it belongs to (Epstein or Intel), add the information to the appropriate Docusaurus investigation pages, and download any video or images
invocable: true
---

You are helping the user add content to the IntelligenceMurders.com investigation website.

The user provides arguments: $ARGUMENTS

These arguments may contain ANY COMBINATION of the following components. Parse them
carefully and identify which ones are present:

============================
INPUT COMPONENTS
============================

**Component 1: X/Twitter URL**
* A URL to an X.com or Twitter.com post (contains /status/ in the path)
* If present, fetch the post data using the X API (Step 1)
* May be a text post, a video post, or both
* Example: https://x.com/username/status/1234567890

**Component 2: Video URL**
* A direct video URL or a second X URL specifically for a video
* Sometimes provided separately from the main post URL
* If the main X post already has a video, this is redundant — use the post's video
* If provided separately, download this video and associate it with the investigation

**Component 2b: Image URL**
* A direct image URL (e.g., https://pbs.twimg.com/media/... or any .jpg/.png/.webp URL)
* Sometimes provided separately from the main post URL
* If the main X post already has image attachments, those are handled automatically in Step 5b
* If provided separately, download this image and associate it with the investigation

**Component 3: Investigation Name**
* Which investigation to add content to: "Epstein" or "Intel"
* May be provided as a directory name ("Epstein", "Intel"), a label ("intelligence murders",
  "epstein murders"), or implied by context ("this is about the CIA" -> Intel)
* If provided, skip auto-detection and use this investigation directly
* If NOT provided, auto-detect from content (Step 2)

**Component 4: Text Block**
* A block of text with information to add, context, or instructions
* IMPORTANT: A text block may contain TWO distinct things mixed together:
  1. INSTRUCTIONS — directives telling you to do something specific
     (e.g., "add this to the Aaron Swartz page", "update the timeline", "create a new profile for X")
  2. CONTENT — investigative information to add to pages
     (e.g., "According to declassified documents...", quotes, facts, connections, claims)
* Parse the text block carefully and SEPARATE these two types before proceeding
* Execute any instructions found. Use the content for investigation updates.
* Content may reference people, organizations, events, or claims that already have pages —
  check existing pages and update them
* Content may describe someone new who warrants a new profile — evaluate and create if appropriate

**Component 5: Transcribe Video**
* If the input contains the phrase "transcribe video" (case-insensitive), set
  TRANSCRIBE_REQUESTED = true
* This triggers Step 6 (transcription) AFTER the video has been downloaded in Step 5
* If transcribe is requested but no video is found or download fails, skip transcription
  and inform the user

ROOT_DIR dir is ~/BGit/Bryan_git/Intel_Murder_Docus
TRANSCRIBE_JS is file ~/BGit/act3/tools/Transcription/Transcribe.js

============================
DIRECTORY HIERARCHY
============================

This is a Docusaurus website (intelligencemurders.com, dev port 4173).
All content lives under {ROOT_DIR}.

```
{ROOT_DIR}/
├── docs/
│   ├── Epstein/                    # Epstein Murders investigation
│   │   ├── index.md                # Master table, intro, overview
│   │   ├── locations.md            # Top-level locations overview
│   │   ├── Details/                # One .md file per person (~137 files)
│   │   │   ├── FirstName_LastName.md
│   │   │   └── images/             # Profile images stored here
│   │   └── other/
│   │       ├── groups/             # Organization profiles (24 files)
│   │       ├── images/             # Investigation-level images
│   │       ├── x_posts/            # Saved X post YAML files (create if needed)
│   │       └── more/               # Supporting docs, YAML, CSV data
│   │           └── locations/      # Detailed location breakdown (14 .md files)
│   └── Intel/                      # Intelligence Service Murders investigation
│       ├── index.md                # Master table, intro, overview
│       ├── by_country.md           # Cases organized by country
│       ├── methods.md              # Murder methods and patterns
│       ├── timeline.md             # Chronological timeline
│       ├── Details/                # One .md file per person (~189 files)
│       │   ├── FirstName_LastName.md
│       │   └── images/             # Profile images stored here
│       └── other/                  # Does NOT exist yet — create as needed
│           ├── x_posts/            # Create when first X post is saved for Intel
│           └── transcripts/        # Create when first transcript is saved for Intel
├── src/
│   ├── css/custom.css              # Global styles
│   ├── pages/index.tsx             # Landing page
│   └── theme/TOC/                  # Swizzled TOC — contains the right sidebar people list
│       ├── index.tsx
│       └── styles.module.css
├── static/
│   ├── img/                        # Site images (logos, etc.)
│   ├── videos/                     # Downloaded videos (served at /videos/filename)
│   └── images/                     # Downloaded post images (served at /images/filename)
├── skills_storage/
│   └── Intel_X_add_link.md         # This skill
├── docusaurus.config.ts
├── sidebarsEpstein.ts
├── sidebarsIntelligence.ts
└── package.json
```

============================
INVESTIGATION REGISTRY
============================

Use this registry to match content against the two investigations.
When auto-detecting, scan all available text for these keywords and topics.

**Investigation 1: Epstein** (`docs/Epstein/`, URL path `/epstein/`)
* Scope: People connected to Jeffrey Epstein, child trafficking rings, sex-trafficking
  blackmail operations, and deaths/disappearances related to any of the above
* Keywords: Epstein, Jeffrey Epstein, Ghislaine Maxwell, Little Saint James, pedophile island,
  Lolita Express, NXIVM, trafficking, blackmail ring, child abuse, sex trafficking, Wexner,
  Les Wexner, Jean-Luc Brunel, Victoria Giuffre, Alan Dershowitz, Bill Clinton island,
  Prince Andrew, Epstein client list, flight logs, black book, Cell-Tech, dead man's switch

**Investigation 2: Intel** (`docs/Intel/`, URL path `/intel/`)
* Scope: Victims of political assassination by intelligence services — journalists, scientists,
  political leaders, activists, whistleblowers, and civilians killed by CIA, MI6/SIS, Mossad,
  KGB/FSB/GRU, DINA, ISI, and other intelligence agencies
* Keywords: CIA, Mossad, MI6, KGB, FSB, GRU, DINA, ISI, assassination, intelligence murder,
  polonium, Novichok, ricin, thallium, journalist killed, whistleblower, COINTELPRO, Operation
  Condor, Church Committee, extraordinary rendition, targeted killing, defector, spy, double
  agent, intelligence officer, Aaron Swartz, Danny Casolaro, Gary Webb, Hastings, Michael
  Hastings, Dag Hammarskjold, Patrice Lumumba, Olof Palme, Steve Kangas, Frank Olson,
  Seth Rich, Gary Caradori

* Some people appear in BOTH investigations (e.g., Danny Casolaro investigated both
  PROMIS/intel and the Epstein orbit). When content spans both, update both.

============================
STEP 0: PARSE INPUT
============================

* Read through $ARGUMENTS and identify all components present:
  - Any URLs? Classify each as X post URL, video URL, image URL, or other
  - Investigation name specified?
  - A text block? If so, separate INSTRUCTIONS from CONTENT within it
  - The phrase "transcribe video"?

* Output:
  ```
  ============================================
  Input Parsed
  ============================================
  X Post URL: {url or "none"}
  Video URL: {url or "none"}
  Image URL: {url or "none" or "from post attachments"}
  Investigation: {Epstein / Intel / auto-detect}
  Text block: {yes/no — summarize content in one line}
  Instructions found in text: {list any explicit instructions, or "none"}
  Transcribe video: {yes/no}
  ============================================
  ```

============================
STEP 1: FETCH THE POST (if X URL provided)
============================

* Skip this step if no X/Twitter URL was provided.

* Extract the post ID from the URL. X URLs look like:
  - https://x.com/{username}/status/{post_id}
  - https://twitter.com/{username}/status/{post_id}
  - The post_id is the numeric string after /status/

* Fetch the full post data using xurl with expanded fields:
  ```bash
  xurl "/2/tweets/{post_id}?tweet.fields=created_at,author_id,public_metrics,text,entities,conversation_id,lang,note_tweet,attachments&expansions=author_id,attachments.media_keys&user.fields=name,username,description,public_metrics&media.fields=url,preview_image_url,type,width,height,duration_ms,variants" --auth app
  ```

* If xurl fails or returns an error, inform the user and stop.

* Output:
  ```
  ============================================
  X Post Fetched Successfully
  ============================================
  Author: @{username} ({display_name})
  Date: {created_at}
  Text: {full text of post}
  Likes: {like_count} | Retweets: {retweet_count} | Views: {impression_count}
  Has Video: {yes/no}
  Has Images: {yes/no — count if yes}
  ============================================
  ```

============================
STEP 2: DETERMINE THE INVESTIGATION
============================

* If an investigation was specified in the input (Component 3), use it directly.
  Resolve to the correct docs path under {ROOT_DIR}:
  - "Epstein" → {ROOT_DIR}/docs/Epstein/
  - "Intel" → {ROOT_DIR}/docs/Intel/

* Otherwise, analyze ALL available content (post text + text block) against the
  INVESTIGATION REGISTRY above. Scan for keywords, people names, organizations.

* Check if any people mentioned already have files in either investigation's Details/
  directory — this is a strong match signal.

* Content may span BOTH investigations (e.g., Danny Casolaro). If so, update both.

* Output:
  ```
  Investigation: {Epstein / Intel / Both}
  Path(s): {full path(s)}
  Confidence: HIGH / MEDIUM / LOW
  Reason: {why this matches}
  ```

* If no investigation matches, inform the user:
  ```
  No matching investigation found for this content.
  This content may not belong to intelligencemurders.com — consider
  the sister UAP project at ~/BGit/Bryan_git/UAP_Murder_Docus/ (uapmurders.com — UAPs, Energy, Physics investigations). That is a separate repo and a separate Docusaurus site.
  ```
  Then stop.

============================
STEP 3: SAVE POST DATA AS YAML (if X post was fetched)
============================

* Skip this step if no X post was fetched.

* Create directory if needed:
  - Epstein: {ROOT_DIR}/docs/Epstein/other/x_posts/ (other/ already exists)
  - Intel: {ROOT_DIR}/docs/Intel/other/x_posts/ (other/ does NOT exist yet — mkdir -p will create it)
  ```bash
  mkdir -p {ROOT_DIR}/docs/{investigation}/other/x_posts
  ```

* Save the post as a YAML file: {ROOT_DIR}/docs/{investigation}/other/x_posts/{post_id}.yaml
  Format:
  ```yaml
  id: '{post_id}'
  url: '{original_url}'
  author:
    username: '{username}'
    name: '{display_name}'
    id: '{author_id}'
  text: |
    {full text of the post}
  created_at: '{created_at}'
  lang: '{lang}'
  public_metrics:
    retweet_count: {n}
    reply_count: {n}
    like_count: {n}
    quote_count: {n}
    bookmark_count: {n}
    impression_count: {n}
  has_video: {true/false}
  has_image: {true/false}
  investigation: '{Epstein or Intel}'
  added_date: '{today YYYY-MM-DD}'
  ```

  If both investigations are being updated, save a copy in each.

============================
STEP 4: ADD INFORMATION TO INVESTIGATION
============================

* Combine ALL available content into a single analysis:
  - X post text (if fetched)
  - Content portion of the text block (instructions were separated in Step 0)
  - Video description (if video present)

* Execute any INSTRUCTIONS found in Step 0 first before general content placement.

* Read the investigation's index.md (first 60 lines) to understand its structure,
  categories, and sorting rules.

* List all existing files in Details/ to know what profiles already exist.

* Also check these supplementary files if they exist:
  - Epstein: locations.md, other/groups/*.md
  - Intel: by_country.md, methods.md, timeline.md

* Analyze the combined content for:

  **People mentioned:**
  - Check if they already have a file in Details/ (match by name variations)
  - If a person is notable and new to the investigation, create a profile using
    the investigation's profile template (see Profile Structure below). Web search
    them first — never create a profile from a single social media post alone.
  - If a person already has a file, add new information and the source link
  - DEFAMATION RULE: For people who are ALIVE, follow strict defamation prevention:
    * Never accuse them of crimes or unethical actions as fact
    * Use attribution language throughout ("according to...", "allegedly", "reportedly")
    * Include their denials and counterarguments
    * Never present speculation as fact

  **Organizations mentioned (Epstein investigation only):**
  - Check docs/Epstein/other/groups/ for existing org profile files (24 files exist).
    Create new ones if warranted.
  - Intel has no groups directory — add org context directly to relevant person profiles
    or to methods.md / by_country.md as appropriate.

  **Topics, events, locations:**
  - Intel: check if timeline.md, methods.md, or by_country.md should be updated
  - Epstein: check locations.md (top-level overview) and the detailed location files
    under other/more/locations/ (14 files covering regions like south_florida.md,
    washington_dc.md, new_york_metro.md, etc.)
  - If the content reveals a new pattern or method, update the appropriate file

  **Multiple pages may need updating:**
  - A single content block may update 3–10 different pages. Consider EACH existing
    page and whether this content adds to it.
  - Information about a person goes on that person's page
  - A new murder method or pattern goes on methods.md (Intel) or methods section
  - Cross-cutting information may appear on multiple pages with different emphasis

* For each person or entity identified:
  - Existing Details/ file: Add the source URL to their Sources section. Add any
    new information not already in their profile to the appropriate section.
  - No Details/ file + notable enough: Create a new profile. Research via web search.
    Add a row to the appropriate table in index.md. Follow sorting rules.

* Update supplementary files:
  - Intel timeline.md — add new dated events in chronological order
  - Intel by_country.md — add or update country sections if applicable
  - Intel methods.md — add new method examples if applicable
  - Epstein locations.md — add or update locations if applicable

* If the people added are highly impactful (shocking death, important figure), consider
  adding them to the right sidebar people list in {ROOT_DIR}/src/theme/TOC/index.tsx.
  Read that file first to understand how the people list is structured. Only add if the
  new person ranks above the least impactful current entry. Blurb must be 28 words or fewer.

* Output what was done:
  ```
  ============================================
  Investigation Updated: {Epstein / Intel / Both}
  ============================================
  Files modified: {list}
  Files created: {list}
  People added: {list or "none"}
  Sidebar updated: {yes — added {name} | no}
  Sources added to: {list}
  Instructions executed: {list or "none"}
  ============================================
  ```

============================
PROFILE STRUCTURE (for new Detail pages)
============================

When creating a new person profile under Details/, use this structure.
The exact sections from the CLAUDE.md in this repo apply — read it for full detail.
Minimum required sections:

```markdown
---
title: Full Name
---

# Full Name
One-line summary: who they were and how they died.

| Field | Details |
|-------|---------|
| **Full Name** | Legal name |
| **Born** | Date or year |
| **Died** | Full date |
| **Age at Death** | Number |
| **Location of Death** | City, State/Country |
| **Cause of Death** | How they died |
| **Official Ruling** | Suicide / Accidental / Homicide / etc. |
| **Nationality** | American / British / Russian / etc. |
| **Killed on US Soil** | Yes / No |
| **Alleged Intelligence Connection** | Which service(s) implicated (Intel only) |
| **Victim Was Intel Employee** | Yes / No (Intel only) |
| **Category** | Journalist / Scientist / Whistleblower / etc. |

## Assessment: SUSPICION LEVEL

2-3 sentence summary of why this death is or isn't suspicious.

## Circumstances of Death

Narrative of what happened.

## Background

Who this person was and why they mattered.

## Intelligence Connections (Intel) / Epstein Connections (Epstein)

What links this death to the investigation.

## Why This Death Raises Questions

- Bullet points of suspicious elements

## Key Quotes

> Blockquoted quotes with attribution

## See Also

- Links to related profiles

## Other Shocking Stories

- [Person Name](Person_Name.md): 18 words or less — most shocking hook.
- [Person Name](Person_Name.md): 18 words or less — different person.
- [Person Name](Person_Name.md): 18 words or less — different person.
- [Person Name](Person_Name.md): 18 words or less — different person.

## Sources

- Source links, one per line (minimum 3-5)

**Status:** Alive / Deceased (YYYY) / Unknown

*This information was built by Grok and Claude AI research.*
```

============================
STEP 5: DOWNLOAD VIDEO (if video present)
============================

* Videos go to: {ROOT_DIR}/static/videos/
  They are served by Docusaurus at URL path /videos/{filename}

* Check for a video from:
  - The X post's media attachments (type "video")
  - A separate video URL provided in the input
  - A URL in the text block that points to video content

* If a video is available:

  5-pre. CHECK FOR DUPLICATE before downloading:
    Check whether {ROOT_DIR}/static/videos/{post_id}.mp4 (or similar) already exists:
    ```bash
    ls {ROOT_DIR}/static/videos/{post_id}* 2>/dev/null
    ```
    If the file exists, skip steps 5a–5b and use the existing file for embedding.
    Output: "Video already exists: {filename} — skipping download"

  5a. Download using yt-dlp:
    ```bash
    mkdir -p {ROOT_DIR}/static/videos
    yt-dlp "{video_source_url}" -o "{ROOT_DIR}/static/videos/{post_id}.%(ext)s"
    ```
    If yt-dlp fails, try with cookies or inform the user.

  5b. IPFS pin (optional but preferred for censorship resistance):
    - Ensure the IPFS daemon is running (check: ipfs swarm peers)
    - Start if needed: brew services start kubo
    - Add and pin the video:
      ```bash
      ipfs add --pin {ROOT_DIR}/static/videos/{filename}
      ```
    - Capture the CID from the output (e.g., "added QmXyz... filename")
    - Verify pin: ipfs pin ls {CID}
    - If IPFS is not available, skip pinning and note this in the summary

  5c. Update manifest.yaml:
    - Read {ROOT_DIR}/static/videos/manifest.yaml
    - Check if this video already exists (match by source_url or filename starting with post_id)
    - If not present, append a new entry:
      ```yaml
      - filename: {post_id}.mp4
        ipfs_cid: {CID}
        ipfs_gateway_url: https://ipfs.io/ipfs/{CID}
        source_url: {source_url}
        source_author: '@{username}'
        description: '{brief description}'
        investigation: '{Epstein or Intel}'
        added_date: '{YYYY-MM-DD}'
        pinned: true
      ```
    - IMPORTANT: Quote the investigation field to prevent YAML parsing issues

  5d. Update IPFS.sh:
    - Read {ROOT_DIR}/IPFS.sh
    - Find the investigation section header (e.g., "# Investigation: Epstein")
    - Add entry under the correct section:
      ```
      # VIDEO: {description}
      ipfs pin add {CID}
      ```
    - Update the video count in the section header
    - If no section exists for this investigation, create one

  5e. Update get_videos.sh:
    - Read {ROOT_DIR}/static/videos/get_videos.sh
    - Find the investigation section header
    - Add entry under the correct section:
      ```
      ipfs get --output={post_id}.mp4 {CID} && ipfs pin add {CID}
      # {Investigation} | {description} (@{username})
      # Source: {source_url}
      ```
    - Update the video count in the section header

  5f. Embed video in the relevant investigation page:
    - Determine which Details/ file should show this video
    - If the file is .md, rename it to .mdx and update all sidebars/links to it
    - Add the video embed after the metadata table, before the first content section.
    - Use the 3-gateway IPFS pattern (local IPFS gateway first, then public gateways):
      ```
      ## Video Evidence

      <video controls style={{width: '100%', maxWidth: '720px', height: 'auto', display: 'block'}}>
        <source src="http://127.0.0.1:8080/ipfs/{CID}" type="video/mp4" />
        <source src="https://ipfs.io/ipfs/{CID}" type="video/mp4" />
        <source src="https://dweb.link/ipfs/{CID}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      *{Description}. Source: [@{username} on X]({original_url}), {date}.*
      ```
    - NEVER use cloudflare-ipfs.com (shut down in 2024)
    - NEVER use HTML width attribute — only CSS style={{width: '100%'}}
    - If IPFS was NOT pinned, use only the local source:
      ```
      <video controls style={{width: '100%', maxWidth: '720px', height: 'auto', display: 'block'}}>
        <source src="/videos/{filename}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      ```

  5g. Output:
    ```
    ============================================
    Video Downloaded
    ============================================
    File: {ROOT_DIR}/static/videos/{filename}
    Size: {file size}
    IPFS CID: {CID or "not pinned"}
    Manifest: updated
    IPFS.sh: updated
    get_videos.sh: updated
    Embedded in: {path to .mdx file}
    ============================================
    ```

* If no video, skip this step and note: "No video in this post."

============================
STEP 5B: DOWNLOAD IMAGES (if images present)
============================

* Images go to: {ROOT_DIR}/static/images/
  They are served by Docusaurus at URL path /images/{filename}

* Check for images from:
  - The X post's media attachments (type "photo") — may be 1 or more images
  - A direct image URL provided in the input (Component 2b)
  - A URL in the text block that points to an image

* Image URL extraction from X API response:
  - Images appear in the "includes.media" array with type "photo"
  - The image URL is in the "url" field
  - For highest quality, append "?format=jpg&name=4096x4096" to the base URL
  - Record width and height from the API response for aspect ratio

* If one or more images are available:

  5B-pre. CHECK FOR DUPLICATES:
    ```bash
    ls {ROOT_DIR}/static/images/{post_id}* 2>/dev/null
    ```
    Skip downloading any that already exist.

  5B-a. Download each image:
    ```bash
    mkdir -p {ROOT_DIR}/static/images
    curl -L -o "{ROOT_DIR}/static/images/{post_id}_{index}.jpg" "{image_url}"
    ```
    Where {index} is 1, 2, 3... for multiple images from the same post.

  5B-b. IPFS pin (optional):
    ```bash
    ipfs add --pin {ROOT_DIR}/static/images/{filename}
    ```
    Capture the CID. Skip if IPFS is not available.

  5B-c. Embed images in the relevant investigation page:
    - Determine which Details/ file should show these images
    - If .md, rename to .mdx
    - Single image embed pattern:
      ```
      ## Image Evidence

      <img
        src="/images/{filename}"
        alt="{description}"
        style={{maxHeight: '25vh', width: 'auto', aspectRatio: '{width}/{height}'}}
      />

      *{Description}. Source: [@{username} on X]({original_url}), {date}.*
      ```
    - Multiple images:
      ```
      ## Image Evidence

      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
      <img src="/images/{filename_1}" alt="{desc_1}" style={{maxHeight: '25vh', width: 'auto', aspectRatio: '{w1}/{h1}'}} />
      <img src="/images/{filename_2}" alt="{desc_2}" style={{maxHeight: '25vh', width: 'auto', aspectRatio: '{w2}/{h2}'}} />
      </div>

      *{Description}. Source: [@{username} on X]({original_url}), {date}.*
      ```

  5B-d. Output:
    ```
    ============================================
    Image(s) Downloaded
    ============================================
    Files: {list of filenames}
    IPFS CIDs: {list or "not pinned"}
    Embedded in: {path to .mdx file}
    ============================================
    ```

* If no images, skip this step and note: "No images in this post."

============================
STEP 6: TRANSCRIBE VIDEO (if TRANSCRIBE_REQUESTED = true AND video was downloaded)
============================

* Skip this step entirely if TRANSCRIBE_REQUESTED is not true.
* Skip if no video was downloaded in Step 5 — inform the user.

* TRANSCRIBE_JS is file ~/BGit/act3/tools/Transcription/Transcribe.js

* Create a temp directory:
  ```bash
  TRANSC_TMPDIR=$(mktemp -d /tmp/intel_transcribe_XXXXXX)
  ```

* Run the transcription:
  ```bash
  cd "$TRANSC_TMPDIR" && node ~/BGit/act3/tools/Transcription/Transcribe.js "{ROOT_DIR}/static/videos/{video_filename}" transcription.txt
  ```

* Wait for completion (may take several minutes for long videos).

* Verify:
  ```bash
  ls -la "$TRANSC_TMPDIR/transcription.txt"
  ```

* If transcription fails, inform the user and continue to final summary.

* Read the transcription into memory for Step 7.
  Store: TRANSCRIPTION_FILE = {TRANSC_TMPDIR}/transcription.txt

* Output:
  ```
  ============================================
  Video Transcribed
  ============================================
  Video: {video_filename}
  Transcription: {TRANSCRIPTION_FILE}
  Word count: {approximate word count}
  ============================================
  ```

============================
STEP 7: PROCESS TRANSCRIPTION INTO INVESTIGATION (if transcription succeeded)
============================

* Skip if Step 6 was skipped or failed.

* Read the full transcription from {TRANSCRIPTION_FILE}.

* Step 4 has already processed post text and text block content. The transcription
  adds information from the SPOKEN video content. Only process what is NEW.

* Analyze the transcription for:

  **People mentioned in the video not in the post text:**
  - Check Details/ for existing profiles
  - If notable and new, create a profile (web search first)
  - Follow all defamation rules for living people

  **New facts, quotes, or claims:**
  - Add direct quotes: "In a video posted on {date}, {speaker} stated: '...'"
    with source link to the X post
  - Add factual claims with attribution language

  **New topics, events, or patterns:**
  - Update timeline.md, methods.md, by_country.md, or locations.md as appropriate

  **Do NOT duplicate** information already added in Step 4.

* Save transcription to investigation transcript directory:
  - Epstein: other/ already exists, just create the transcripts/ subdir
  - Intel: other/ does NOT exist yet — mkdir -p handles creating both levels
  ```bash
  mkdir -p {ROOT_DIR}/docs/{investigation}/other/transcripts
  cp {TRANSCRIPTION_FILE} {ROOT_DIR}/docs/{investigation}/other/transcripts/{post_id}_transcript.txt
  ```

* Clean up temp directory:
  ```bash
  rm -rf {TRANSC_TMPDIR}
  ```

* Output:
  ```
  ============================================
  Transcription Processed
  ============================================
  Pages updated from transcription: {list}
  Pages created from transcription: {list or "none"}
  New people identified: {list or "none"}
  Transcript saved to: {ROOT_DIR}/docs/{investigation}/other/transcripts/{post_id}_transcript.txt
  ============================================
  ```

============================
STEP 8: GIT ADD CHANGES
============================

* Stage all new and modified files in this repo:
  ```bash
  git -C {ROOT_DIR} add docs/ src/ static/
  ```
  Use `static/` rather than specific subdirs — `static/videos/` and `static/images/`
  may not exist yet and git add on a missing path errors.

* Output the staged file list:
  ```bash
  git -C {ROOT_DIR} diff --cached --name-only
  ```

* Do NOT commit — leave committing to the user or the /commit skill.

============================
STEP 9: FINAL SUMMARY
============================

* Output a complete summary:
  ```
  ============================================
  Intel_X_add_link Complete
  ============================================
  Post: {post_id by @username, or "none"}
  Investigation: {Epstein / Intel / Both}
  YAML saved: {path or "none"}
  Video: {static/videos/filename or "none"}
  Video IPFS CID: {CID or "not pinned"}
  Images: {static/images/filenames or "none"}
  Image IPFS CIDs: {CIDs or "not pinned"}
  Transcription: {yes — saved to other/transcripts/ | no — not requested | failed}
  Instructions executed: {list or "none"}
  Investigation changes:
    - {list each file modified or created, from Steps 4, 7}
  Sidebar updated (src/theme/TOC/index.tsx): {yes — added {name} | no}
  Staged for commit: {yes | no}
  ============================================
  ```

============================
IMPORTANT RULES
============================

* Always follow the investigation's defamation prevention rules (see CLAUDE.md).
* For ANY living person: never accuse them of crimes or unethical actions.
  Use attribution language. Include denials. Note legitimate roles before any allegations.
* Always use attribution language for claims from social media posts.
* Always web search to research people before creating profiles — never create a
  profile based solely on a single social media post.
* Always cross-link new profiles to related existing profiles.
* Never remove existing content — only add to it.
* Keep the investigation's writing tone: investigative, not conspiratorial.
* Use suspicion ratings: CONFIRMED / HIGHLY SUSPICIOUS / SUSPICIOUS /
  MODERATE SUSPICION / UNCERTAIN / OFFICIALLY DENIED.
* Include counterarguments and denials where relevant.
* Separate INSTRUCTIONS from CONTENT in any text block before processing.
* When processing a text block, think carefully about WHICH pages each piece
  of information belongs on — not everything goes on one page.
* Docusaurus URL paths: Epstein profiles are at /epstein/Details/Name,
  Intel profiles are at /intel/Details/Name. Use these in cross-links.
* Cross-link between investigations when a person appears in both.
* Cross-link to uapmurders.com using full URLs (e.g., https://uapmurders.com/uaps/)
  when content overlaps with UAPs, Energy, or Physics investigations. That site lives
  in a separate repo at ~/BGit/Bryan_git/UAP_Murder_Docus/ — do NOT edit files there
  from this skill. Use full URLs only; never relative paths.
