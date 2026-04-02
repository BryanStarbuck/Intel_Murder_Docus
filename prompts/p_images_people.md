ROOT_DIR dir is ~/BGit/Bryan_git/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

DROP_OFF_DIR dir is {ROOT_DIR}/prompts/images
MISSING_CSV_FILE is file {DROP_OFF_DIR}/missing_images.csv

====================================================================
GOAL
====================================================================

Two loops. First, process any incoming images from the drop-off directory
— unpack, convert, compress, and move each image to the correct person's
destination. Second, walk through every person in both investigations and
make sure each person either has an image or is tracked in the missing
images CSV for later follow-up.

====================================================================
DESTINATION DIRECTORIES
====================================================================

Images go into a per-investigation images directory next to the profiles:

* Epstein: {EPSTEIN_DOCS_DIR}/Details/images/{FirstName_LastName}.jpg
* Intel:   {INTEL_DOCS_DIR}/Details/images/{FirstName_LastName}.jpg

Create the images/ directory if it does not exist.

====================================================================
LOOP 1 — PROCESS THE DROP-OFF DIRECTORY
====================================================================

This loop handles any new images that have been dropped into
{DROP_OFF_DIR}. It unpacks, converts, compresses, and moves them.

--------------------------------------------------------------------
Step 1.1 — Unpack and inventory
--------------------------------------------------------------------

* Look in {DROP_OFF_DIR} for any files or zip archives
* Unpack every .zip file into {DROP_OFF_DIR} (flatten nested folders so
  image files end up directly in {DROP_OFF_DIR})
* After unpacking, list every image file found (.jpg, .jpeg, .png, .webp,
  .bmp, .tiff, .gif)
* For each image file, determine the person's name from the filename
  * Filenames may use underscores, spaces, dashes, or camelCase
  * Match the name against existing profile filenames in both
    {EPSTEIN_DOCS_DIR}/Details/ and {INTEL_DOCS_DIR}/Details/

--------------------------------------------------------------------
Step 1.2 — Convert and compress
--------------------------------------------------------------------

For each image found in Step 1.1:

* If the file is NOT already JPEG (.jpg / .jpeg):
  * Convert it to JPEG using an available CLI tool (sips, ImageMagick, or
    brew-installed tools)
  * Keep the original pixel resolution — do NOT downscale
  * Delete the original non-JPEG file after successful conversion

* Whether converted or already JPEG, compress the file:
  * Target high compression (quality 70-80) to reduce file size
  * Do NOT reduce pixel dimensions
  * Use sips, ImageMagick (convert/magick), or jpegoptim — whatever is
    available on the system

* Rename the file to match the standard format:
  {FirstName_LastName}.jpg
  * Use underscores, no spaces
  * Match the casing used by the person's profile filename

--------------------------------------------------------------------
Step 1.3 — Move to destination
--------------------------------------------------------------------

For each processed image:

* Determine which investigation the person belongs to by checking which
  Details/ directory contains their profile:
  * If found in {EPSTEIN_DOCS_DIR}/Details/ → move to
    {EPSTEIN_DOCS_DIR}/Details/images/
  * If found in {INTEL_DOCS_DIR}/Details/ → move to
    {INTEL_DOCS_DIR}/Details/images/
  * If found in both, copy to both locations
  * If found in neither, output to stdout:
    "UNMATCHED IMAGE: {filename} — no matching profile found in either
    investigation. Leaving in drop-off."

* Output to stdout each image moved:
  "MOVED: {filename} → {destination_path}"

--------------------------------------------------------------------
Step 1.4 — Cleanup drop-off
--------------------------------------------------------------------

* Delete any unpacked zip contents that were successfully moved
* Delete empty zip files after unpacking
* Leave unmatched images in {DROP_OFF_DIR} for manual review
* Leave the original zip files intact (do not delete them)

====================================================================
LOOP 2 — WALK THROUGH EVERY PERSON
====================================================================

This loop iterates over every person profile in both investigations.
For each person, it makes sure they either have an image in their
Details/images/ directory or are tracked in {MISSING_CSV_FILE} so we
can search for images later.

--------------------------------------------------------------------
Step 2.1 — Build the full person list
--------------------------------------------------------------------

For each investigation ({EPSTEIN_DOCS_DIR}, {INTEL_DOCS_DIR}):

  * List every .md file in Details/ (each file is one person)
  * Build a list of all people with these fields:
    * investigation: "Epstein" or "Intel"
    * person_name: display name (from the filename, replacing underscores
      with spaces)
    * profile_file: relative path to their profile from {ROOT_DIR}
    * website_url: the URL path to the person's page on the website
      * Epstein profiles: /epstein/Details/{FirstName_LastName}
      * Intel profiles: /intel/Details/{FirstName_LastName}
    * category: extracted from the | **Category** | row in their profile's
      info table (e.g. "Journalist / Investigator", "Scientist / Weapons
      Expert"). Empty if the profile has no category row. Replace commas
      with semicolons so the CSV stays valid.

--------------------------------------------------------------------
Step 2.2 — Per-person check
--------------------------------------------------------------------

For each person in the list:

  * Check if a matching .jpg exists in their investigation's
    Details/images/ directory
  * If an image from Loop 1 was just moved there, that counts — the person
    now has an image
  * If no image exists, add the person to the missing list

Every person ends up in one of two buckets:
  * HAS IMAGE — person has a .jpg in Details/images/
  * MISSING IMAGE — person has no .jpg, gets added to the CSV

--------------------------------------------------------------------
Step 2.3 — Write the missing images CSV
--------------------------------------------------------------------

Write {MISSING_CSV_FILE} with these columns:

  investigation,person_name,profile_file,website_url,category

Include every person from Step 2.2 who is in the MISSING IMAGE bucket.
Sort alphabetically by person_name within each investigation.

This CSV is the canonical list of people who still need images. Every
person in both investigations must either have an image file or appear
in this CSV. No one falls through the cracks.

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