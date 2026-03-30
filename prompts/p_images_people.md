ROOT_DIR dir is ~/BGit/Bryan/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

DROP_OFF_DIR dir is {ROOT_DIR}/prompts/images
MISSING_CSV_FILE is file {DROP_OFF_DIR}/missing_images.csv

====================================================================
GOAL
====================================================================

Process person images from the drop-off location. Unpack any zip files,
identify which person each image belongs to, convert to JPEG if needed,
compress without reducing resolution, and move each image to the correct
destination directory. Then generate a CSV of all people who are still
missing an image.

====================================================================
DESTINATION DIRECTORIES
====================================================================

Images go into a per-investigation images directory next to the profiles:

* Epstein: {EPSTEIN_DOCS_DIR}/Details/images/{FirstName_LastName}.jpg
* Intel:   {INTEL_DOCS_DIR}/Details/images/{FirstName_LastName}.jpg

Create the images/ directory if it does not exist.

====================================================================
PASS 1 — UNPACK AND INVENTORY DROP-OFF
====================================================================

* Look in {DROP_OFF_DIR} for any files or zip archives
* Unpack every .zip file into {DROP_OFF_DIR} (flatten nested folders so
  image files end up directly in {DROP_OFF_DIR})
* After unpacking, list every image file found (.jpg, .jpeg, .png, .webp,
  .bmp, .tiff, .gif)
* For each image file, determine the person's name from the filename
  * Filenames may use underscores, spaces, dashes, or camelCase
  * Match the name against existing profile filenames in both
    {EPSTEIN_DOCS_DIR}/Details/ and {INTEL_DOCS_DIR}/Details/

====================================================================
PASS 2 — CONVERT AND COMPRESS
====================================================================

For each image found in Pass 1:

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

====================================================================
PASS 3 — MOVE TO DESTINATION
====================================================================

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

====================================================================
PASS 4 — FIND MISSING IMAGES
====================================================================

After all images are placed, check every person profile across both
investigations for a corresponding image.

For each investigation ({EPSTEIN_DOCS_DIR}, {INTEL_DOCS_DIR}):

  * List every .md file in Details/ (each file is one person)
  * For each person, check if a matching .jpg exists in Details/images/
  * If no image exists, add that person to the missing list

Write {MISSING_CSV_FILE} with these columns:

  investigation,person_name,profile_file,website_url,category

  * investigation: "Epstein" or "Intel"
  * person_name: the person's display name (from the filename, replacing
    underscores with spaces)
  * profile_file: relative path to their profile from {ROOT_DIR}
  * website_url: the URL path to the person's page on the website
    * Epstein profiles: /epstein/Details/{FirstName_LastName}
    * Intel profiles: /intel/Details/{FirstName_LastName}
  * category: the person's category extracted from the | **Category** | row
    in their profile's info table (e.g. "Journalist / Investigator",
    "Scientist / Weapons Expert"). Empty if the profile has no category row.
    Replace commas with semicolons so the CSV stays valid.

Sort the CSV alphabetically by person_name within each investigation.

====================================================================
CLEANUP
====================================================================

* Delete any unpacked zip contents that were successfully moved
* Delete empty zip files after unpacking
* Leave unmatched images in {DROP_OFF_DIR} for manual review
* Leave the original zip files intact (do not delete them)

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




====================================================================
Update
====================================================================

There is the list of people, and there's the CSV. In the detail structures, we have an images directory under the detail structures of each investigation. We have missing_images.csv.

When we do an iteration pass to walk through each person in the investigation, we're going to do a number of things. We're going to go check if we need to go move an image over to the right location because it comes from that incoming drop location. Fine, we can do that work, but then also, when we're done, we're doing this work on a per-person basis. We want to make sure that they either have an image in detail/images, or we have them as an entry in the CSV file. We prefer them having an image, but otherwise we need to get them in the CSV so we can go make sure we search and find images for them later.

This update is just to make sure that, when this prompt is running and it's going to go do that loop to go walk through each person, we do these additional steps. Just make sure that CSV is including everybody that is in these missing images that we couldn't find so far. 