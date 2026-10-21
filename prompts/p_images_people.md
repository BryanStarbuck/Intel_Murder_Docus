ROOT_DIR dir is ~/BGit/Bryan_git/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

DROP_OFF_DIR dir is {ROOT_DIR}/prompts/images
MISSING_CSV_FILE is file {DROP_OFF_DIR}/missing_images.csv

====================================================================
GOAL
====================================================================

Loop 1: process images dropped into {DROP_OFF_DIR} (unpack, convert, compress, move to the person's images dir). Loop 2: every person in both investigations must either have an image or be listed in {MISSING_CSV_FILE}.

Destination (create images/ if missing):
* Epstein: {EPSTEIN_DOCS_DIR}/Details/images/{FirstName_LastName}.jpg
* Intel:   {INTEL_DOCS_DIR}/Details/images/{FirstName_LastName}.jpg

====================================================================
LOOP 1 — PROCESS THE DROP-OFF DIRECTORY
====================================================================

Step 1.1 — Unpack and inventory
* Unpack every .zip in {DROP_OFF_DIR}, flattening nested folders into {DROP_OFF_DIR}.
* List image files (.jpg, .jpeg, .png, .webp, .bmp, .tiff, .gif). Derive the person from the filename (underscores, spaces, dashes or camelCase) and match it to profile filenames in both Details/ dirs.

Step 1.2 — Convert and compress (sips, ImageMagick or jpegoptim, whatever is installed)
* Non-JPEG: convert to JPEG, then delete the original after success.
* Compress every file at quality 70-80. Never reduce pixel dimensions.
* Rename {FirstName_LastName}.jpg, underscores, casing matching the profile filename.

Step 1.3 — Move
* Profile in Epstein Details/ → Epstein images/; in Intel → Intel images/; in both → copy to both.
* In neither: Output to stdout "UNMATCHED IMAGE: {filename} — no matching profile found in either investigation. Leaving in drop-off."
* Each move: Output to stdout "MOVED: {filename} → {destination_path}"

Step 1.4 — Cleanup
* Delete unpacked contents that were moved. Keep the original zip files. Leave unmatched images for manual review.

====================================================================
LOOP 2 — EVERY PERSON
====================================================================

Step 2.1 — For each .md in each investigation's Details/ (one file = one person) record:
* investigation: "Epstein" or "Intel"
* person_name: filename with underscores → spaces
* profile_file: path relative to {ROOT_DIR}
* website_url: /epstein/Details/{FirstName_LastName} or /intel/Details/{FirstName_LastName}
* category: from the profile's | **Category** | row (empty if none), commas replaced with semicolons

Step 2.2 — HAS IMAGE if a .jpg exists in that investigation's Details/images/ (including ones Loop 1 just moved); otherwise MISSING IMAGE.

Step 2.3 — Write {MISSING_CSV_FILE} with header:

  investigation,person_name,profile_file,website_url,category

One row per MISSING IMAGE person, sorted by person_name within each investigation. This is the canonical list; no one falls through the cracks.

====================================================================
FINAL SUMMARY
====================================================================

Output to stdout:

  * Total images found in drop-off (after unpacking)
  * Images converted from other formats to JPEG
  * Images successfully moved to Epstein
  * Images successfully moved to Intel
  * Unmatched images (no profile found)
  * Total people across both investigations
  * Total people with images
  * Total people missing images
  * Path to {MISSING_CSV_FILE}
