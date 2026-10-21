ROOT_DIR dir is ~/BGit/Bryan_git/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

EPSTEIN_IMAGES_DIR dir is {EPSTEIN_DOCS_DIR}/Details/images
INTEL_IMAGES_DIR dir is {INTEL_DOCS_DIR}/Details/images

====================================================================
GOAL
====================================================================

For every person profile in both investigations that has a matching image, make the image render on the Docusaurus page: top of page, floated right, aspect ratio kept, max 18% page width. (p_images_people.md puts images into the images dirs; this prompt displays them.)

Image for profile Details/Aaron_Owen.md is Details/images/Aaron_Owen.jpg. Keep the .md files as .md (no .mdx conversion).

====================================================================
IMAGE TAG AND PLACEMENT
====================================================================

Insert after the # heading and the one-line summary paragraph, before the info table:

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

* For each .md profile in {EPSTEIN_DOCS_DIR}/Details/ and {INTEL_DOCS_DIR}/Details/:
  * Image exists and profile has no image tag yet: insert the div as above.
  * Already has an image tag, or no image: skip.
* Change nothing else in the profile: no reformatting, reordering or edits.

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
