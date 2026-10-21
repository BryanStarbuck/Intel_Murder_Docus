ROOT_DIR dir is ~/BGit/Bryan_git/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

DROP_OFF_DIR dir is {ROOT_DIR}/prompts/images
MISSING_CSV_FILE is file {DROP_OFF_DIR}/missing_images.csv

TEMP_DOWNLOAD_DIR dir is {DROP_OFF_DIR}/download_candidates

====================================================================
GOAL
====================================================================

For each person in {MISSING_CSV_FILE}: search the internet, download candidate images, use local face matching to pick the best, convert and compress it, move it to the investigation's images dir, and remove the person from the CSV. Run from Claude desktop (needs internet).

Destination (create images/ if missing):
* Epstein: {EPSTEIN_DOCS_DIR}/Details/images/{FirstName_LastName}.jpg
* Intel:   {INTEL_DOCS_DIR}/Details/images/{FirstName_LastName}.jpg

====================================================================
TOOLS SETUP
====================================================================

* ImageMagick: brew install imagemagick
* face_recognition: pip install face_recognition (needs dlib; if it fails: brew install cmake && pip install dlib)
* If face_recognition cannot be installed, use MANUAL MODE (Step 3).

====================================================================
MAIN LOOP — each row of {MISSING_CSV_FILE}, in CSV order
====================================================================

CSV columns: investigation,person_name,profile_file,website_url,category

Skip a person who already has an image at the destination (re-runs are safe).

Step 1 — Context
* Read {ROOT_DIR}/{profile_file}. Extract full name, birth/death years, nationality, what they were known for, organization, location. Use these to narrow searches (common names!) and to verify the right person.

Step 2 — Search and download candidates
* A: Google Images "{Full Name}" plus year of death, occupation or organization; up to 10 top results.
* B: News articles and obituaries ("{Full Name}" + death/killed/obituary/organization/country); visit the top 3-5 pages, download photos of people (skip ads, logos, stock, site chrome).
* C: Wikipedia, Find a Grave, memorial pages, court archives; portraits or headshots.
* Save into {TEMP_DOWNLOAD_DIR}/{FirstName_LastName}/candidate_01.jpg, candidate_02..., original format kept. Target 10-30 candidates.
* Zero found: Output to stdout "NO CANDIDATES FOUND: {person_name} — skipping, leaving in CSV" and go to the next person.

Step 3 — Face matching
* Detect faces in every candidate; discard images with no face; record face counts.
* Encode single-face images only (skip multi-face images).
* Cluster encodings at tolerance 0.6; the largest cluster is the person.
* From that cluster pick highest resolution, front-facing, headshot or upper body, good lighting. A one-image cluster is fine.
* Tie between equal clusters: Output to stdout "AMBIGUOUS: {person_name} — multiple face clusters of equal size. Using largest cluster with best resolution."
* MANUAL MODE (no face_recognition): prefer news/Wikipedia sources and images repeated across sources, by resolution. Output to stdout "MANUAL MODE: {person_name} — face_recognition not available. Picked best candidate by source quality and resolution."

Step 4 — Convert and compress
* magick {input} -quality 75 {output}.jpg (converts non-JPEG and recompresses JPEG). Never downscale.
* Over 200KB: retry at quality 60. Never below 50.
* Name {FirstName_LastName}.jpg, underscores, casing matching the profile filename.

Step 5 — Place and update CSV
* Move to the destination for the row's investigation column.
* Output to stdout "PLACED: {person_name} → {destination_path}"
* Rewrite {MISSING_CSV_FILE} without this row, header intact.
* Delete {TEMP_DOWNLOAD_DIR}/{FirstName_LastName}/.

Obscure people with no findable images stay in the CSV for manual follow-up.

====================================================================
AFTER ALL ROWS
====================================================================

* Delete {TEMP_DOWNLOAD_DIR} if empty.
* Output to stdout:

  ================================================
  IMAGE SEARCH COMPLETE
  ================================================
  * People processed from CSV: {count}
  * Images successfully found and placed: {count}
  * People with no candidates found (still in CSV): {count}
  * People with ambiguous results (still placed best guess): {count}
  * Remaining entries in {MISSING_CSV_FILE}: {count}
  ================================================
