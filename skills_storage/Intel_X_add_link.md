---
name: Intel_X_add_link
description: Download an X/Twitter post by URL, determine which investigation it belongs to (Epstein or Intel), add the information to the appropriate Docusaurus investigation pages, and download any video or images
invocable: true
---

You are helping the user add content to the IntelligenceMurders.com investigation website.

TEXT_INPUT_TO_SKILL is any text the user typed after /Intel_X_add_link.
It is the run text for this skill.

TEXT_INPUT_TO_SKILL may contain ANY COMBINATION of the following components. Parse them
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
TRANSCRIBE_JS is file ~/BGit/all/tools/Transcription/Transcribe.js

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
HOW MEDIA IS SERVED — READ THIS BEFORE TOUCHING ANY EMBED
============================

Videos and images are served two DIFFERENT ways. Swapping them is the single most
common way a run silently produces a page with dead media.

  * VIDEO  → served from IPFS, embedded as public gateway URLs, greppable by CID.
               <source src="https://ipfs.io/ipfs/{CID}" type="video/mp4" />
             Video files ARE gitignored — {ROOT_DIR}/static/videos/.gitignore contains
             `*.mp4`, deliberately, because they are too large to commit. IPFS is their
             ONLY distribution path. This is why video needs more verification, not less.

  * IMAGE  → served OUT OF THE REPO from the Docusaurus static dir, at
               /images/{filename}
             The binary IS committed to git and deployed with the site. An image may
             ALSO be pinned to IPFS as a mirror, but the CID is never the src.

WHY IMAGES DO NOT USE AN IPFS GATEWAY AS THEIR src:

  `ipfs add --pin` only makes bytes available FROM THIS MACHINE. Unless a remote
  pinning service is configured (`ipfs pin remote service ls` — check it), every CID
  has exactly ONE provider: Bryan's machine. A page can therefore ship a correct-looking
  <img src="https://ipfs.io/..."> that renders fine here, passes every local check, and
  is a broken icon for every real visitor the moment this machine sleeps. A green
  gateway check proves "it works right now" — it proves NOTHING about durability.

  Images are small and belong in the repo, where the deploy serves them with no
  dependency on any machine being awake. Videos are too large to commit, so they stay
  on IPFS and carry that single-provider caveat, which every run must state.

VIDEO HAS NO FALLBACK. This is the asymmetry that matters. If an image's CID dies the
repo copy still serves it; if a VIDEO's CID dies the player is dead for every visitor,
silently, forever. A manifest video whose bytes are neither on disk nor pinned by this
node has NO PROVIDER anywhere on the network. So every video this skill adds MUST be:
  1. downloaded and verified non-empty on disk,
  2. `ipfs add --pin`ed,
  3. announced with `ipfs routing provide {CID}` (pinning alone does not announce),
  4. probed against the PUBLIC gateway (not localhost),
  5. actually embedded on a page, and
  6. recorded in manifest.yaml, IPFS.sh, and get_videos.sh.
A run that does 1–3 and skips 5 produces an orphan: a pinned video on no page, which
is invisible and therefore never noticed.

Consequence for verification: grep the identifier that matches the media TYPE. Grepping
a page for a CID reports a false negative on images, because the string the browser
fetches is /images/{filename}, not the CID. See Step 9H.

============================
RUN LOG (MANDATORY, EVERY RUN)
============================

HISTORY_DIR dir is ~/T/_intel_skill/history/
RUN_LOG is file {HISTORY_DIR}{YYYY-MM-DD}_{HH-MM-SS}.md

Every invocation writes exactly one run-log file, IN ADDITION to all the other work.
Purpose: months later Bryan must be able to read one file and know what was passed in,
what the skill decided, what commands it ran, what came back, and what it wrote. Without
this there is no way to audit which posts were ever processed — reconstructing it from
Claude Code session transcripts is slow and lossy.

* FIRST ACTION OF EVERY RUN, before parsing input, before any fetch:
  ```bash
  mkdir -p ~/T/_intel_skill/history
  date "+%Y-%m-%d_%H-%M-%S"
  ```
  Use the REAL clock — never invent a timestamp. Immediately write the header block
  (verbatim input, cwd) so a run that dies mid-way still leaves a log naming its input.

* APPEND AS YOU GO — do not buffer the log to the end. After each step completes or
  fails, append its entry. A crashed or context-exhausted run must still leave a partial
  log showing the last step reached. A failed step records the exact stderr, not a
  summary of it.

* Log format:

  ```markdown
  # Intel_X_add_link run {stamp}

  ## Input
  Raw arguments (verbatim, including line breaks and URL wrapping):
  {exact raw input}
  Parsed URLs (after un-wrapping): {list}
  Flags: investigation={Epstein/Intel/auto} transcribe={y/n}

  ## Media inventory (Step 5-pre)
  {the inventory table, verbatim}

  ## Steps
  | # | Step | Result | Detail |
  |---|------|--------|--------|
  | 1 | Fetch post | OK/FAILED | {post_id} @{user}, video={n} images={n}, quoted={id or none} |
  | 5 | Video download | OK/FAILED/SKIPPED | {filename}, {bytes}, yt-dlp exit {code} |
  | 5b | IPFS pin + provide | OK/FAILED | {CID} |
  | 5b2 | Public gateway verify | OK/FAILED | http {code}, type {type} |
  | 5B | Image download | OK/FAILED/SKIPPED | {n} files, git-tracked {n} |
  | 6 | Transcription | OK/FAILED/SKIPPED | {words} words |
  | 9H | Media on page | PASS/FAIL | {per media item} |

  ## Commands run
  Each media/IPFS/git/transcription command verbatim, with exit code and the first and
  last 10 lines of output. yt-dlp failures get their FULL stderr.

  ## Media outcome
  {one line per inventory row: type, identifier, PLACED → page | BLOCKED → why}

  ## Files written
  {one line per file created or modified}

  ## Warnings and unfinished business
  {every gap, skipped step, unverified CID, uncommitted binary, or manual follow-up.
   If there are none, write "none".}
  ```

============================
NEVER TRUST A PIPED EXIT CODE
============================

The shell reports the LAST command's status, so `somecmd | tail -20` exits 0 even when
somecmd failed. A run that trusts that exit code will call a failed step clean. This has
actually bitten the sibling Holon skill (2026-08-15: an audit printed
"RESULT: FAIL — 17 issue(s)" and was reported as exit 0).

When a command's success matters, redirect and check separately:
```bash
somecmd > /tmp/out.txt 2>&1; echo "exit=$?"
tail -30 /tmp/out.txt
```
This applies especially to yt-dlp, ipfs, node Transcribe.js, and npm run build.

ALSO: yt-dlp CAN EXIT 0 WITHOUT WRITING A FILE. Never infer a download from an exit
code — stat the file and check its size is greater than zero. See Step 5.

============================
INVESTIGATION REGISTRY
============================

Use this registry to match content against the two investigations.
When auto-detecting, scan all available text for these keywords and topics.

**Investigation 1: Epstein** (`docs/Epstein/`, URL path `/epstein-murders/`)
* Scope: People connected to Jeffrey Epstein, child trafficking rings, sex-trafficking
  blackmail operations, and deaths/disappearances related to any of the above
* Keywords: Epstein, Jeffrey Epstein, Ghislaine Maxwell, Little Saint James, pedophile island,
  Lolita Express, NXIVM, trafficking, blackmail ring, child abuse, sex trafficking, Wexner,
  Les Wexner, Jean-Luc Brunel, Victoria Giuffre, Alan Dershowitz, Bill Clinton island,
  Prince Andrew, Epstein client list, flight logs, black book, Cell-Tech, dead man's switch

**Investigation 2: Intel** (`docs/Intel/`, URL path `/intelligence-service-murders/`)
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

* Read through TEXT_INPUT_TO_SKILL and identify all components present:
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

* Fetch the full post data using xurl with expanded fields. The expansions below also
  pull in any QUOTED tweet and its media — this is essential because media (video or
  images) is frequently attached to a quoted tweet, not to the post you were given:
  ```bash
  xurl "/2/tweets/{post_id}?tweet.fields=created_at,author_id,public_metrics,text,entities,conversation_id,lang,note_tweet,attachments,referenced_tweets&expansions=author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.attachments.media_keys,referenced_tweets.id.author_id&user.fields=name,username,description,public_metrics&media.fields=url,preview_image_url,type,width,height,duration_ms,variants" --auth app
  ```
  With these expansions, a quoted tweet's media appears in `includes.media`, the quoted
  tweet object in `includes.tweets`, and its author in `includes.users`.

* If xurl fails or returns an error, inform the user and stop.

* **RESOLVE THE MEDIA SOURCE (quoted / linked status) — do this BEFORE printing the
  Has Video / Has Images line, so media is never silently dropped.** Media often does
  NOT live on the post you were given — it lives in a QUOTED tweet, or in a status URL
  pasted into the post's text:

  - Set MEDIA_SOURCE_URL = the original post URL and QUOTED_ORIGIN = none by default.
  - PARENT_HAS_MEDIA = true if `includes.media` contains an entry whose media_key is in
    THIS post's own `attachments.media_keys`. If true, keep MEDIA_SOURCE_URL = original
    post URL and skip the rest of this resolution.
  - If PARENT_HAS_MEDIA is false, find a quoted or linked status, in order:
      1. QUOTED TWEET: `referenced_tweets` entry with type == "quoted" → QUOTED_ID = its
         `id`; its media is already in `includes.media` (via the expansions).
      2. LINKED STATUS: else scan `entities.urls` for the FIRST `expanded_url` matching
         https://(x|twitter).com/{anyuser}/status/{digits} (ignore ?query) → QUOTED_ID =
         the digits after /status/.
      3. If QUOTED_ID came from the linked-status path and its media is not already in
         `includes.media`, fetch that status with the SAME xurl command (post_id =
         QUOTED_ID) and read its media, author, and text.
  - If media was found on the quoted/linked status:
      * MEDIA_SOURCE_URL = https://x.com/{quoted_username}/status/{QUOTED_ID} — the URL
        yt-dlp (Step 5) and curl (Step 5B) MUST download from, NOT the parent post.
      * QUOTED_ORIGIN = @{quoted_username}. Treat the quoted status's video/image
        attachments as this post's media for Steps 5 and 5B.
  - If no media is found anywhere, the post genuinely has no media.

* Output:
  ```
  ============================================
  X Post Fetched Successfully
  ============================================
  Author: @{username} ({display_name})
  Date: {created_at}
  Text: {full text of post}
  Likes: {like_count} | Retweets: {retweet_count} | Views: {impression_count}
  Has Video: {yes/no — if from a quote/link, write "yes (from quoted {QUOTED_ORIGIN})"}
  Has Images: {yes/no — count if yes; note "(from quoted {QUOTED_ORIGIN})" if applicable}
  Media source: {MEDIA_SOURCE_URL — only show if different from the original post URL}
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
  - A QUOTED or linked status resolved in Step 1 — the video lives on the quoted tweet,
    not the post you were given. Use MEDIA_SOURCE_URL (the quoted status URL) as the
    yt-dlp download target.
  - A separate video URL provided in the input
  - A URL in the text block that points to video content

* **DO NOT skip this step because Step 1 reported "Has Video: no".** The X API's
  `includes.media` block is NOT a reliable signal for quote/repost videos — a true quote
  tweet leaves the media_key on the quoted tweet, so the API returns no media even though a
  video exists. yt-dlp walks quoted AND reposted media itself via GraphQL, straight from the
  post URL. Whenever a video download is not explicitly skipped, ALWAYS attempt the yt-dlp
  download below against the original post URL — regardless of what Step 1 detected. Only
  conclude the post has no video if yt-dlp itself finds nothing.

* VIDEO_SOURCE_URL for the yt-dlp command below is chosen in this priority order:
    1. The ORIGINAL post URL — try this FIRST. yt-dlp resolves quoted and reposted media
       on its own, so the post URL alone downloads the video in the vast majority of cases.
    2. If a separate direct video URL was provided in the input, use it.
    3. FALLBACK only if step 1 yielded nothing: MEDIA_SOURCE_URL (the quoted status URL
       resolved in Step 1). Re-run yt-dlp against it before giving up.

* Attempt the video download (do NOT pre-gate on Step 1 detection):

  5-pre. BUILD THE MEDIA INVENTORY — this is the run's completion contract.

    Before downloading anything, write down EVERY piece of media this post carries
    (videos and images, including those on a quoted/linked status). This list is the
    thing the run is measured against. At the end of the run, every row must read
    either PLACED (with the page it is on) or BLOCKED (with a concrete reason).
    "Downloaded" is NOT a terminal state — a downloaded, pinned video on no page is an
    orphan, which is the exact failure mode this inventory exists to catch.

    ```
    ------------- Media inventory (post {post_id}) -------------
    | # | Type  | Source                    | Status |
    |---|-------|---------------------------|--------|
    | 1 | video | {post_id} (this post)     | PENDING |
    | 2 | photo | quoted @{user} media 1/2  | PENDING |
    ------------------------------------------------------------
    ```

    Carry this table into the run log and re-print it, resolved, in the Step 9 summary.
    A run that ends with any row still PENDING is INCOMPLETE — say so plainly rather
    than reporting success.

    CHECK FOR DUPLICATES before downloading:
    ```bash
    ls {ROOT_DIR}/static/videos/{post_id}* {ROOT_DIR}/static/images/{post_id}* 2>/dev/null
    ```
    If a file exists, skip its download and use the existing file for embedding.
    Output: "Video already exists: {filename} — skipping download"

    ALSO check whether this post was already processed in a previous run:
    ```bash
    ls {ROOT_DIR}/docs/*/other/x_posts/{post_id}.yaml 2>/dev/null
    grep -rl "{post_id}" {ROOT_DIR}/static/videos/manifest.yaml 2>/dev/null
    ```
    A post with a YAML record but no video on disk is a PREVIOUSLY FAILED RUN. Treat it
    as work to redo, not as work already done — re-download and re-place it, and say so
    in the summary.

  5a. Download using yt-dlp. Try the ORIGINAL post URL first; if it downloads nothing and
    a quoted status was resolved in Step 1, retry against MEDIA_SOURCE_URL. Use
    `-S "res,tbr"` to take the highest-quality rendition, and `--yes-playlist` so a post
    carrying MULTIPLE videos yields all of them rather than only the first:
    ```bash
    mkdir -p {ROOT_DIR}/static/videos
    yt-dlp --yes-playlist -S "res,tbr" "{original_post_url}" \
      -o "{ROOT_DIR}/static/videos/{post_id}.%(ext)s" > /tmp/ytdlp.txt 2>&1
    echo "exit=$?"; tail -20 /tmp/ytdlp.txt
    ```
    If nothing landed, retry against MEDIA_SOURCE_URL, then try cookies
    (`--cookies-from-browser chrome`), then inform the user. Record the FULL stderr of a
    failure in the run log — not a summary.

  5a-2. VERIFY THE DOWNLOAD — MANDATORY. **yt-dlp can exit 0 without writing a file**
    (private post, deleted media, geo-block, format-selection miss). An exit code is not
    evidence. Stat the file and require a non-zero size:
    ```bash
    ls -la {ROOT_DIR}/static/videos/{post_id}.* 2>/dev/null
    test -s {ROOT_DIR}/static/videos/{post_id}.mp4 \
      && echo "VIDEO OK: $(stat -f%z {ROOT_DIR}/static/videos/{post_id}.mp4) bytes" \
      || echo "FAIL: no video file on disk — do NOT proceed to pin/embed"
    ```
    If this fails, mark the video BLOCKED in the Step 5-pre inventory with the reason,
    and do NOT write a manifest entry, an IPFS.sh line, or a page embed for it. A
    manifest row pointing at a file that was never downloaded is worse than no row: it
    reads as done and hides the gap from every later audit.

  5b. IPFS pin — REQUIRED for video, not optional. Video is gitignored, so IPFS is its
    only distribution path; an unpinned video is unreachable for everyone.
    - Ensure the IPFS daemon is running: `ipfs swarm peers > /dev/null 2>&1 && echo UP || echo DOWN`
    - Start if needed: `brew services start kubo` (then wait for it to come up)
    - Add and pin, capturing just the CID with -Q:
      ```bash
      CID=$(ipfs add --pin -Q {ROOT_DIR}/static/videos/{filename}); echo "CID=$CID"
      ```
      NEVER use `ipfs add -n` — that computes a CID WITHOUT storing the bytes, producing
      a hash that looks valid, records cleanly in the manifest, and has no provider at all.
    - Verify the pin actually exists:
      ```bash
      ipfs pin ls --type=recursive $CID && echo "PINNED" || echo "FAIL: not pinned"
      ```
    - ANNOUNCE IT TO THE DHT — pinning alone does NOT publish. Without this the CID may
      be unreachable from public gateways even though it is pinned locally:
      ```bash
      ipfs routing provide $CID; echo "provide exit=$?"
      ```
    - PROBE THE PUBLIC GATEWAY (never localhost — a visitor's browser has no node):
      ```bash
      curl -s -o /dev/null -w "http=%{http_code} type=%{content_type}\n" \
        -r 0-1000 --max-time 120 "https://ipfs.io/ipfs/$CID"
      ```
      PASS is http 200/206 with content_type video/mp4. A 504 with type text/plain means
      NO PROVIDER — the video is dead for every visitor. Do not report the run as
      complete on a 504; say so explicitly in the summary and the run log.
      (A dweb.link 301 is normal — it redirects to its subdomain form.)
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
        <source src="https://ipfs.io/ipfs/{CID}" type="video/mp4" />
        <source src="https://dweb.link/ipfs/{CID}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      *{Description}. Source: [@{username} on X]({original_url}), {date}.*
      ```
    - If the video came from a quoted/linked status (QUOTED_ORIGIN is set), credit the
      original media poster: *{Description}. Video by {QUOTED_ORIGIN}, quoted by
      [@{username} on X]({original_url}), {date}.*
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
  - A QUOTED or linked status resolved in Step 1 — its photo media is in `includes.media`;
    download from the pbs.twimg.com URLs as usual and credit QUOTED_ORIGIN in the caption
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

* TRANSCRIBE_JS is file ~/BGit/all/tools/Transcription/Transcribe.js

* Create a temp directory:
  ```bash
  TRANSC_TMPDIR=$(mktemp -d /tmp/intel_transcribe_XXXXXX)
  ```

* Run the transcription:
  ```bash
  cd "$TRANSC_TMPDIR" && node ~/BGit/all/tools/Transcription/Transcribe.js "{ROOT_DIR}/static/videos/{video_filename}" transcription.txt
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
STEP 7H: PUBLICATION VERIFICATION — THE RUN IS NOT DONE UNTIL THIS PASSES
============================

Everything before this step is work the skill BELIEVES it did. This step proves it.
Historically this is where runs went wrong silently: the download step "succeeded," the
manifest got a row, and no page ever showed the media. Do not skip it and do not
summarize it — report each check as its own PASS / FAIL / SKIPPED line.

* 7H-0. RE-PRINT THE MEDIA INVENTORY from Step 5-pre, resolved. Every row must read
  PLACED (naming the page) or BLOCKED (naming the reason). Any row still PENDING means
  the run is INCOMPLETE — say that word in the summary.

* 7H-1. MEDIA IS IN THE SOURCE FILE. Grep the identifier that matches the media TYPE:
  ```bash
  # video → grep the CID
  grep -c "{CID}" {ROOT_DIR}/docs/{investigation}/Details/{Page}.mdx
  # image → grep the served path, NOT the CID
  grep -c "/images/{filename}" {ROOT_DIR}/docs/{investigation}/Details/{Page}.mdx
  ```
  Zero means the edit never landed. Grepping a page for an image's CID is a FALSE
  NEGATIVE — the browser fetches the /images/ path, so that is the string to look for.

* 7H-2. THE PAGE IS .mdx IF IT CONTAINS JSX. A `<video>` or `<img>` with a
  `style={{...}}` attribute inside a plain `.md` file will not render as a component.
  If you added an embed to a `.md` file, rename it:
  ```bash
  git -C {ROOT_DIR} mv docs/{inv}/Details/{Page}.md docs/{inv}/Details/{Page}.mdx
  rg -n "{Page}\.md\b" {ROOT_DIR}/docs {ROOT_DIR}/src   # fix every link that names the extension
  ```

* 7H-3. THE SITE ACTUALLY BUILDS, and the media survived into the built HTML. This is
  the check that catches broken links, bad JSX, and unresolved relative paths:
  ```bash
  cd {ROOT_DIR} && npm run build > /tmp/intel_build.txt 2>&1; echo "exit=$?"
  grep -c "Broken link on source page path" /tmp/intel_build.txt
  grep -A6 "{Page}/:" /tmp/intel_build.txt     # broken links on YOUR page specifically
  grep -c "{CID}" build/{routeBasePath}/Details/{Page}/index.html
  ls -la build/images/{filename}                # image binary made it into the build
  ```
  A build that exits 0 can still report broken links — check BOTH. Only the broken links
  attributable to pages this run touched are this run's responsibility; note any
  pre-existing ones separately rather than claiming them as new breakage.

* 7H-4. THE VIDEO IS REACHABLE FROM THE PUBLIC INTERNET (the Step 5b probe). Re-state
  the result here. A 504 text/plain means NO PROVIDER — the player is dead for every
  visitor and the run must say so.

* 7H-5. IMAGE BINARIES ARE TRACKED IN GIT. Images are served from the repo, so an
  untracked image is a 404 on the live site even though it renders locally:
  ```bash
  cd {ROOT_DIR}
  git ls-files --error-unmatch static/images/{filename} >/dev/null 2>&1 \
    && echo "TRACKED" || echo "FAIL: image not tracked — will 404 on the live site"
  git check-ignore -v static/images/{filename}   # must print NOTHING
  ```
  Large File Bridge has been observed appending thousands of per-file image lines to
  .gitignore in sibling repos, silently un-committing new images. If check-ignore prints
  a rule, fix the ignore file — do not `git add -f` and move on.

  Videos are EXEMPT from this check: static/videos/*.mp4 is gitignored deliberately.

* 7H-6. Output:
  ```
  -------- Publication verification (Step 7H) --------
  Media inventory resolved:  {n} PLACED, {n} BLOCKED, {n} PENDING
  Media in source file:      {PASS | FAIL — edit did not land}
  Page extension correct:    {PASS | FIXED — renamed to .mdx | N/A}
  Site build:                {PASS exit 0 | FAIL}
  Broken links on my pages:  {none | list}
  Media in built HTML:       {PASS | FAIL}
  Public IPFS gateway:       {PASS — http {code} {type} | FAIL — NO PROVIDER}
  Image binaries tracked:    {PASS {n}/{n} | FAIL — {list}}
  READER CAN SEE IT:         {YES | NO — {why}}
  ----------------------------------------------------
  ```
  The last line is the one that matters. If it is NO, the run failed regardless of how
  many earlier steps passed.

============================
STEP 7I: WHOLE-REPO AUDIT (run at the end of EVERY run)
============================

AUDIT_SCRIPT is file {ROOT_DIR}/skills_storage/audit_media_publication.py

Step 7H proves THIS run's media landed. This step proves no PREVIOUS run's media has
gone missing. Run it every time — it is fast and it is the only thing that catches slow
rot (a post deleted upstream, an unpinned CID, an image that fell out of git).

```bash
cd {ROOT_DIR}
python3 skills_storage/audit_media_publication.py > /tmp/intel_audit.txt; echo "exit=$?"
tail -40 /tmp/intel_audit.txt
```

DO NOT PIPE IT STRAIGHT INTO head/tail — see NEVER TRUST A PIPED EXIT CODE above. Read
the RESULT line, not the exit status of a pipeline.

It reports, per post: missing video files, missing manifest rows, unpinned CIDs, videos
with NO PROVIDER, orphaned videos and images (downloaded but on no page), `/videos/`
local-src embeds that will 404, untracked or gitignored images, and bad route paths.

* Add `--gateway` to probe every video CID against the public gateway. Run this form
  whenever a run adds or repins a video, and periodically otherwise.
* Add `--recheck-x` to re-probe every post with yt-dlp. **This is the sweep that finds
  video the X API missed on a quoted post.** It is how post 2047769275708895549 was
  recovered on 2026-08-17, four months after the run that should have caught it. Run it
  monthly — and understand that it only works while the source post still exists.

DELIBERATE NON-PUBLICATION IS RECORDED, NOT LEFT AS AN ORPHAN. If media should NOT go on
a page — a fabricated or AI-generated image, a meme card carrying an unadjudicated
criminal accusation against a living person — add a row to
{ROOT_DIR}/static/images/withheld.csv with the filename and the REASON. The audit then
reports it as WITHHELD instead of ORPHAN. An orphan means "we lost track of this"; a
withheld row means "we looked at this and decided not to run it." Never leave a
deliberate editorial decision looking like an accident.

============================
RECOVERY SWEEP — RE-RUNNING PAST POSTS
============================

When asked to go back over history and recover missed media, this is the procedure.
Do NOT try to reconstruct runs from Claude Code session transcripts — most are pruned.

1. Build the master list of every post ever processed, from BOTH sources:
   ```bash
   # every post that produced a record
   ls {ROOT_DIR}/docs/*/other/x_posts/*.yaml | xargs -n1 basename | sed 's/.yaml//'
   # every invocation the user ever typed (durable; survives transcript pruning)
   python3 - <<'PY'
   import json,re
   u=re.compile(r'(?:x|twitter)\.com/[^/\s"]+/status/(\d+)')
   ids=set()
   for line in open('/Users/bryan/.claude/history.jsonl',encoding='utf8',errors='replace'):
       if 'Intel_X_add_link' not in line: continue
       try: d=json.loads(line).get('display','')
       except Exception: continue
       if '/Intel_X_add_link' in d: ids|=set(u.findall(d))
   print(len(ids),'post ids from history'); print('\n'.join(sorted(ids)))
   PY
   ```
   The union is the true work-list. As of 2026-08-17 that was 37 posts.

2. Run the audit with `--recheck-x`. Every RECOVERABLE row is a post whose video still
   exists on X and is not on disk. Download, pin, provide, transcribe, and place each.

3. For each recovered item, do the FULL skill: not just the download. A video on disk
   that never reaches a page is the same failure in a different place.

4. Anything unrecoverable (source post deleted) gets `video_unrecoverable: true` plus a
   `video_lost_note` in its x_posts YAML, so the audit reports LOST_UPSTREAM instead of
   failing forever. If a transcript survives, quote it on the page in place of the dead
   player rather than leaving a broken embed.

============================
KNOWN FAILURE MODES — LEARNED FROM AUDITING PAST RUNS
============================

A full audit of this skill's history was run on 2026-08-17 (38 x_posts records, 18
video-bearing). These are the failures it found. Check for each before finishing.

1. **The embed written for a video that was never downloaded.** Post 2046400129301877116
   (@redpillb0t, Richard Marcinko, April 2026): the YAML recorded has_video: true, the
   profile carried a full `<video>` block, and the file was NEVER downloaded, pinned, or
   added to the manifest. The embed pointed at `/videos/{id}.mp4` — a local static path
   for a file that is gitignored, so it had no chance of working even if it had existed.
   **By the time this was found in August, the source post had been DELETED from X and
   the video was permanently unrecoverable.** Only a transcript survived.
   → This is why Step 5a-2 (verify the file) and Step 7H (verify the page) exist. A video
     not archived on the day it is found may be gone forever.
   → NEVER write a video embed pointing at `/videos/{file}` — that path is gitignored and
     will 404 in production. Video embeds are IPFS gateway URLs, always.

2. **QUOTED-POST VIDEO RECORDED AS has_video: false — the most expensive bug in this
   skill.** Post 2047769275708895549 (@TheEmmapreneur, April 2026) carried a 2m45s video
   on a QUOTED post. The X API's `includes.media` showed nothing, the run wrote
   `has_video: false`, and no video was ever downloaded. yt-dlp found it instantly four
   months later. **The only reason it was recoverable is that the post still existed** —
   the comparable case in item 1 did not.
   → NEVER let `has_video: false` end the video step. Run yt-dlp against the post URL
     regardless of what the API said (Step 5's rule), and record the yt-dlp result — not
     the API result — as the truth in the YAML.
   → The `--recheck-x` audit flag exists specifically to sweep for this class.

3. **Orphans: media downloaded but never placed on any page.** A run can pass every
   download check and still publish nothing. Four posts had a downloaded, pinned video
   while the page cited the post only in prose; three images from post 2053443730674180325
   were downloaded when the user explicitly asked for "several images" and only ONE was
   placed. → Step 5-pre's inventory and Step 7H-0 exist to catch exactly this.
   "Downloaded" is not "published."
   (Note: the 11 .mp3 files in static/videos/ are NOT orphans — they are audio extracted
   from the matching .mp4 for transcription. They are marked `derived_from` in the
   manifest and the audit skips them. Do not "fix" them onto pages.)

4. **Wrong route paths in cross-links.** See the URL-path note in IMPORTANT RULES. 21
   links were written as /epstein/ and /intel/ and all 404'd.

5. **Copy-pasted duplicate `<source>` lines.** 15 pages carried the ipfs.io `<source>`
   twice and dweb.link once, instead of one of each. Harmless but wrong; the fallback
   only works if the second source is a DIFFERENT gateway.

6. **Manifest rows written by "reconciliation" with empty source_url/author and a wrong
   investigation.** 8 .mp3 rows were tagged Intel when their parent posts were Epstein
   and carried `source_url: ''`. Never write a manifest row you cannot fully populate —
   an unattributed row cannot be re-downloaded or verified later.

7. **static/images/manifest.yaml has never been populated** (`images: []` after ~15
   image-bearing runs). Zero image provenance is recorded. If you add images, add their
   rows.

8. **src/pages/ipfs.tsx lists only 4 of 26 CIDs** — the public "verify our archive" page
   went stale in April. If this run adds a video, add its CID there too.

9. **No run log existed at all**, which is why reconstructing this history required
   mining ~/.claude/history.jsonl and finding that most session transcripts had been
   pruned. The RUN LOG section above is the fix — write it every run.

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
  -------- Media inventory (Step 5-pre, resolved) --------
  {one line per item: type, identifier, PLACED → page | BLOCKED → why}
  -------- Publication verification (Step 7H) --------
  Media in source file:      {PASS | FAIL}
  Site build:                {PASS exit 0 | FAIL}
  Media in built HTML:       {PASS | FAIL}
  Public IPFS gateway:       {PASS http {code} {type} | FAIL — NO PROVIDER}
  Image binaries tracked:    {PASS {n}/{n} | FAIL — {list}}
  -------- Whole-repo audit (Step 7I) --------
  audit_media_publication.py: {PASS | FAIL — {n} issue(s): {kinds}}
  Run log written:           {~/T/_intel_skill/history/{stamp}.md}
  READER CAN SEE IT:         {YES | NO — {why}}
  ============================================
  ```

  READER CAN SEE IT is the only line that decides whether the run succeeded. If it is
  NO, say so first and plainly — do not lead with the steps that passed.

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
* Docusaurus URL paths — GET THESE RIGHT, they are NOT the directory names:
    docs/Epstein/  is served at  /epstein-murders/
    docs/Intel/    is served at  /intelligence-service-murders/
  So an absolute cross-link is /epstein-murders/Details/Name or
  /intelligence-service-murders/Details/Name. The routeBasePath values in
  docusaurus.config.ts are the authority — check them if unsure.

  Earlier versions of this skill documented `/epstein/` and `/intel/`. Those are
  WRONG: they are the on-disk directory names, not routes, and every link written
  that way 404s. Twenty-one such links were found and repaired on 2026-08-17 across
  Covid.md, Hydroxychloroquine.md, Barry_Sherman.md, Natacha_Jaitt.md,
  Linda_Collins_Smith.md, and other/groups/north_fox_island.md. Before finishing a
  run, check that you introduced none:
  ```bash
  rg -n '\]\(/epstein/|\]\(/intel/' {ROOT_DIR}/docs/ && echo "FAIL: bad route paths" \
    || echo "OK: no bad route paths"
  ```
  Prefer RELATIVE links where the target is in the same directory tree
  (`[Name](Name.md)` inside Details/, `[Name](Details/Name.md)` from index.md) —
  Docusaurus resolves and validates those at build time, so a typo becomes a build
  error instead of a silent 404. Reserve absolute route paths for cross-investigation
  links.
* Cross-link between investigations when a person appears in both.
* Cross-link to uapmurders.com using full URLs (e.g., https://uapmurders.com/uaps/)
  when content overlaps with UAPs, Energy, or Physics investigations. That site lives
  in a separate repo at ~/BGit/Bryan_git/UAP_Murder_Docus/ — do NOT edit files there
  from this skill. Use full URLs only; never relative paths.
