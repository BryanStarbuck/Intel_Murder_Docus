ROOT_DIR dir is ~/BGit/Bryan/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

EPSTEIN_IMAGES_DIR dir is {EPSTEIN_DOCS_DIR}/Details/images
INTEL_IMAGES_DIR dir is {INTEL_DOCS_DIR}/Details/images

====================================================================
GOAL
====================================================================

Iterate through every person profile in both investigations. For each
person, check if a matching image exists in the images directory. If an
image exists, update the person's profile page to display that image.
The image should appear at the top of the page, right-aligned, without
changing the aspect ratio, at no more than 18% of the page width.

This prompt pairs with p_images_people.md, which handles getting images
into the images directories. This prompt handles getting those images
to actually render on each person's page in the Docusaurus site.

====================================================================
IMAGE LOCATIONS
====================================================================

Images are stored in a per-investigation images directory alongside the
profile files:

* Epstein: {EPSTEIN_IMAGES_DIR}/{FirstName_LastName}.jpg
* Intel:   {INTEL_IMAGES_DIR}/{FirstName_LastName}.jpg

The image filename matches the profile filename. For example, the
profile Aaron_Owen.md would have an image at images/Aaron_Owen.jpg.

====================================================================
FILE FORMAT
====================================================================

Docusaurus renders standard markdown image syntax in .md files. No need
to convert files to .mdx. Use a standard markdown image tag wrapped in
a div for styling control.

The image tag to insert looks like this:

<div style={{float: 'right', marginLeft: '1em', marginBottom: '0.5em', maxWidth: '18%'}}>

![{Person Name}](images/{FirstName_LastName}.jpg)

</div>

This floats the image to the right of the opening text, keeps the
aspect ratio intact, and limits the width to 18% of the page.

====================================================================
PLACEMENT IN THE PROFILE
====================================================================

Insert the image tag immediately after the first line (the # heading)
and the one-line summary paragraph. Place it before the info table so
the image floats beside the table and opening content.

Example before:

  # Aaron Owen

  Seventeen-year-old brother of Franklin scandal witness...

  | Field | Details |
  |-------|---------|

Example after:

  # Aaron Owen

  Seventeen-year-old brother of Franklin scandal witness...

  <div style={{float: 'right', marginLeft: '1em', marginBottom: '0.5em', maxWidth: '18%'}}>

  ![Aaron Owen](images/Aaron_Owen.jpg)

  </div>

  | Field | Details |
  |-------|---------|

====================================================================
INSTRUCTIONS
====================================================================

* Iterate through both investigations: {EPSTEIN_DOCS_DIR}/Details/ and
  {INTEL_DOCS_DIR}/Details/

* For each .md profile file in Details/:
  * Extract the person's filename stem (e.g. Aaron_Owen from Aaron_Owen.md)
  * Check if a matching image exists in the images/ subdirectory
  * If an image exists AND the profile does not already have an image tag:
    * Read the profile
    * Insert the image div after the one-line summary paragraph, before
      the info table
    * Write the updated profile back
  * If an image exists AND the profile already has an image tag:
    * Skip it — do not duplicate the image
  * If no image exists:
    * Skip it — do not modify the profile

* Do NOT modify any content in the profiles other than inserting the
  image tag. Do not reformat, reorder, or edit any existing text.

====================================================================
FINAL SUMMARY
====================================================================

Output to stdout:

  * Total profiles checked in Epstein
  * Total profiles checked in Intel
  * Images inserted into Epstein profiles
  * Images inserted into Intel profiles
  * Profiles skipped (already had image tag)
  * Profiles skipped (no image found)
