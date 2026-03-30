ROOT_DIR dir is ~/BGit/Bryan/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

DROP_OFF_DIR dir is {ROOT_DIR}/prompts/images
MISSING_CSV_FILE is file {DROP_OFF_DIR}/missing_images.csv

TEMP_DOWNLOAD_DIR dir is {DROP_OFF_DIR}/download_candidates

====================================================================
GOAL
====================================================================

Search the internet for images of people listed in {MISSING_CSV_FILE},
download candidate images, use local face-matching tools to pick the
best one, convert and compress it, move it to the correct investigation
directory, and remove the person from {MISSING_CSV_FILE}.

This prompt is designed to be run by Claude's desktop application which
has internet access for searching and downloading.

====================================================================
DESTINATION DIRECTORIES
====================================================================

DIR_TO_WEBSITE dir is ~/BGit/Bryan/Intel_Murder_Docus/

Images go into a per-investigation images directory under the website's
docs directory, inside the investigation's Details folder:

  {DIR_TO_WEBSITE}/docs/{Investigation_Name}/Details/images/{FirstName_LastName}.jpg

Where {Investigation_Name} matches the investigation column from the CSV
(e.g. "Epstein" or "Intel").

Concrete paths:

* Epstein: {EPSTEIN_DOCS_DIR}/Details/images/{FirstName_LastName}.jpg
* Intel:   {INTEL_DOCS_DIR}/Details/images/{FirstName_LastName}.jpg

Create the images/ directory if it does not exist.

====================================================================
TOOLS SETUP
====================================================================

Before starting, verify the following tools are available. If any are
missing, install them via brew.

* ImageMagick (convert/magick) — for image conversion and compression
  * brew install imagemagick
* face_recognition (Python face_recognition CLI) — for face detection
  and comparison across downloaded candidate images
  * pip install face_recognition
  * Requires dlib. If dlib fails: brew install cmake && pip install dlib

If face_recognition is not available or cannot be installed, fall back
to a manual visual comparison approach: download candidates, display
them to the user, and ask the user to pick the best one.

====================================================================
MAIN LOOP — WALK THROUGH {MISSING_CSV_FILE}
====================================================================

Read {MISSING_CSV_FILE}. It has columns:
  investigation,person_name,profile_file,website_url,category

For each row in the CSV, do Steps 1 through 5 below.

--------------------------------------------------------------------
Step 1 — Read the person's profile for context
--------------------------------------------------------------------

* Open the person's profile at {ROOT_DIR}/{profile_file}
* Extract key facts that will help identify the right person in search
  results:
  * Full name
  * Year of birth and death (if available)
  * Nationality
  * What they were known for (journalist, scientist, politician, etc.)
  * Any other distinguishing details (organization, location, etc.)
* These facts are used in Step 2 to build better search queries and in
  Step 3 to verify we found the right person.

--------------------------------------------------------------------
Step 2 — Search the internet for candidate images
--------------------------------------------------------------------

Use multiple search strategies to find images of this person:

* Strategy A — Google Image Search
  * Search: "{Full Name}" with context like year of death, occupation,
    or organization to narrow results
  * Download up to 10 of the top image results

* Strategy B — News articles and obituaries
  * Search: "{Full Name}" + keywords from their profile (e.g. "death",
    "killed", "obituary", their organization name, their country)
  * Visit the top 3-5 news articles or obituary pages
  * Download any images found on those pages that appear to be photos
    of a person (skip ads, logos, stock photos, site chrome)

* Strategy C — Wikipedia, memorial pages, court documents
  * Check if the person has a Wikipedia page, a Find a Grave page, a
    memorial page, or appears in court document archives
  * Download any portrait or headshot images found

Save all downloaded candidates into:
  {TEMP_DOWNLOAD_DIR}/{FirstName_LastName}/
Create the directory if it does not exist.

Name files sequentially: candidate_01.jpg, candidate_02.jpg, etc.
(preserve original format for now — conversion happens in Step 4)

Target: download 10-30 candidate images per person. More candidates
means better face-matching accuracy.

If zero candidate images are found after all strategies, output to
stdout:
  "NO CANDIDATES FOUND: {person_name} — skipping, leaving in CSV"
Skip to the next person.

--------------------------------------------------------------------
Step 3 — Face detection and matching to find the best image
--------------------------------------------------------------------

The goal is to figure out which downloaded images actually show the
same person, and which are ads, logos, wrong people, or unrelated.

* Step 3a — Run face detection on every candidate image
  * Use face_recognition or equivalent to detect faces in each image
  * Discard any image where no face is detected (likely a logo, ad,
    landscape, or text-only image)
  * Record how many faces appear in each image

* Step 3b — Generate face encodings for single-face images
  * For images with exactly one face, generate the face encoding
  * For images with multiple faces, skip them for now (we cannot
    reliably identify which face is the target person)

* Step 3c — Cluster the face encodings
  * Compare all single-face encodings against each other
  * Group images whose face encodings match within a tolerance of 0.6
    (the default for face_recognition)
  * The largest cluster of matching faces is most likely the correct
    person — these are images from different sources that all show
    the same individual

* Step 3d — Pick the best image from the winning cluster
  * From the largest cluster, pick the image that:
    * Has the highest resolution (most pixels)
    * Shows a clear, front-facing or near-front-facing view
    * Is a headshot or upper-body shot (not a distant group photo)
    * Has good lighting and contrast
  * If the largest cluster has only 1 image, that is still our best
    candidate — use it
  * If there are multiple clusters of the same size, output to stdout:
    "AMBIGUOUS: {person_name} — multiple face clusters of equal size.
    Using largest cluster with best resolution."

* If face_recognition is not available:
  * Look at the filenames and source URLs for clues
  * Prefer images from news articles or Wikipedia over random results
  * Prefer images that appear multiple times across different sources
  * Output to stdout:
    "MANUAL MODE: {person_name} — face_recognition not available.
    Picked best candidate by source quality and resolution."

--------------------------------------------------------------------
Step 4 — Convert and compress the selected image
--------------------------------------------------------------------

Take the winning image from Step 3 and process it:

* If the file is NOT already JPEG (.jpg / .jpeg):
  * Convert to JPEG using ImageMagick:
    magick {input} -quality 75 {output}.jpg
  * Keep original pixel resolution — do NOT downscale

* If already JPEG, recompress:
  * magick {input} -quality 75 {output}.jpg

* Rename to the standard format: {FirstName_LastName}.jpg
  * Use underscores, no spaces
  * Match the casing used in the person's profile filename

* Target file size: under 200KB if possible while keeping full
  resolution. If the image is still over 200KB at quality 75, try
  quality 60. Do not go below quality 50.

--------------------------------------------------------------------
Step 5 — Move to destination and update CSV
--------------------------------------------------------------------

* Determine the investigation from the CSV row's "investigation" column
  * "Epstein" → move to {EPSTEIN_DOCS_DIR}/Details/images/
  * "Intel" → move to {INTEL_DOCS_DIR}/Details/images/

* Move the processed image to the destination directory

* Output to stdout:
  "PLACED: {person_name} → {destination_path}"

* Remove this person's row from {MISSING_CSV_FILE}
  * Rewrite the CSV without this row
  * Keep the header row intact

* Clean up: delete {TEMP_DOWNLOAD_DIR}/{FirstName_LastName}/ and all
  candidate images inside it

====================================================================
AFTER ALL ROWS PROCESSED
====================================================================

* Delete {TEMP_DOWNLOAD_DIR} if it is empty

* Output to stdout a final summary:

  ================================================
  IMAGE SEARCH COMPLETE
  ================================================
  * People processed from CSV: {count}
  * Images successfully found and placed: {count}
  * People with no candidates found (still in CSV): {count}
  * People with ambiguous results (still placed best guess): {count}
  * Remaining entries in {MISSING_CSV_FILE}: {count}
  ================================================

====================================================================
NOTES
====================================================================

* Process people in the order they appear in the CSV
* If the script is interrupted, it can be re-run safely — it reads
  {MISSING_CSV_FILE} each time and skips people who already have an
  image in their destination directory
* Some people may be obscure and have no findable images. That is
  expected. They stay in the CSV for future manual follow-up.
* When searching, be mindful that some names are common. Use the
  context from Step 1 (year of death, nationality, occupation) to
  narrow searches and avoid downloading images of the wrong person.
* Prefer portrait/headshot images over group photos, action shots,
  or low-resolution thumbnails.
