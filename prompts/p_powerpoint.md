ROOT_DIR dir is ~/BGit/Bryan/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

EPSTEIN_SLIDES_DIR dir is {EPSTEIN_DOCS_DIR}/slides
INTEL_SLIDES_DIR dir is {INTEL_DOCS_DIR}/slides

EPSTEIN_IMAGES_DIR dir is {EPSTEIN_DOCS_DIR}/Details/images
INTEL_IMAGES_DIR dir is {INTEL_DOCS_DIR}/Details/images

TEMPLATE_PPTX is file ~/BGit/Bryan/prompts/Template_PowerPoint.pptx

PYTHON_PPTX_VENV dir is /tmp/pptx_venv

====================================================================
GOAL
====================================================================

Create one PowerPoint presentation per investigation. Each presentation
contains one slide per person who has an image. Copy the template slide
layout, replace the person's image, name, age, and bullet-point text.
Output one .pptx file per investigation into that investigation's
directory.

Output files:
  {EPSTEIN_DOCS_DIR}/Epstein_Murders.pptx
  {INTEL_DOCS_DIR}/Intelligence_Service_Murders.pptx

====================================================================
SCOPE
====================================================================

If the user specifies which investigation to run for, only build that
one. If the user specifies which website to run on, only run on that
website's investigations. If nothing is specified, build PowerPoints
for all investigations on this website (Epstein and Intel).

====================================================================
PREREQUISITES
====================================================================

* python-pptx must be installed. A venv already exists at
  {PYTHON_PPTX_VENV}. Use {PYTHON_PPTX_VENV}/bin/python3 to run all
  Python scripts. If the venv does not exist or python-pptx is missing:
    python3 -m venv {PYTHON_PPTX_VENV}
    {PYTHON_PPTX_VENV}/bin/pip install python-pptx Pillow

====================================================================
TEMPLATE POWERPOINT STRUCTURE
====================================================================

{TEMPLATE_PPTX} has two example slides. Each slide has the same layout
with these shapes (identified by content, not name, since names can
repeat):

* TOP BANNER — full-width bar at top (y near 0, width = slide width)
  * Investigation title text, e.g. " 150+ Murdered: by Intelligence
    Services" or " 110+ Murdered: in Epstein Cover-up"
  * Set per investigation (see below)

* PERSON IMAGE — Picture shape, right side of slide (~58% from left),
  roughly 40% of slide width, preserving aspect ratio

* "Why / How they [Name]:" — TextBox below the banner, left side,
  bold text, ~32pt. Replace the name portion with the person's name.

* BULLET POINTS — TextBox on the left side below the "Why / How" line.
  Contains 3-5 bullet paragraphs. This is where slide_text.txt content
  goes. Each paragraph is one bullet. Keep the existing font formatting.

* PERSON NAME — Auto shape, right side below the image.
  Large text (~48pt) with the person's name.

* AGE LINE — Auto shape, right side below the name.
  Text like "Dead at Age 58" (~36pt). If age is unknown, delete this
  shape from the slide entirely.

* "Read List Here:" — Auto shape, bottom-left. Keep as-is.

* URL LINE — TextBox at very bottom. Set the URL per investigation.

====================================================================
INVESTIGATION-SPECIFIC VALUES
====================================================================

Epstein investigation:
  * Banner text: " 110+ Murdered: in Epstein Cover-up"
  * URL text: "https://intelligencemurders.com/epstein-murders"
  * Slides dir: {EPSTEIN_SLIDES_DIR}
  * Images dir: {EPSTEIN_IMAGES_DIR}
  * Profiles dir: {EPSTEIN_DOCS_DIR}/Details/

Intel investigation:
  * Banner text: " 150+ Murdered: by Intelligence Services"
  * URL text: "https://intelligencemurders.com/intelligence-service-murders"
  * Slides dir: {INTEL_SLIDES_DIR}
  * Images dir: {INTEL_IMAGES_DIR}
  * Profiles dir: {INTEL_DOCS_DIR}/Details/

====================================================================
INSTRUCTIONS
====================================================================

Repeat the following for each investigation being built:

--------------------------------------------------------------------
Step 1 — Identify people who have both an image and slide text
--------------------------------------------------------------------

* List every person directory under {SLIDES_DIR} that contains a
  slide_text.txt file
* For each person, check if a matching image exists in {IMAGES_DIR}:
  {IMAGES_DIR}/{FirstName_LastName}.jpg
* Only include people who have BOTH a slide_text.txt and an image file
* Build a list of people to process. Output to stdout the count:
  "{investigation}: {count} people with image + slide text"

--------------------------------------------------------------------
Step 2 — Get each person's age
--------------------------------------------------------------------

For each person in the list:

* Read their profile markdown file from the investigation's
  Details/{FirstName_LastName}.md
* Look for the "Age at Death" row in the info table
* Extract the age number
* If the profile has no age or the field says "Unknown":
  * Try to compute age from Born and Died fields if both are present
  * If still no age, mark as "no_age" — the age shape will be removed
    from that person's slide

--------------------------------------------------------------------
Step 3 — Build the PowerPoint
--------------------------------------------------------------------

Write a Python script using python-pptx that does:

* Open {TEMPLATE_PPTX} as the base presentation
* Use Slide 1 (index 0) as the template for Intel investigation people
* Use Slide 2 (index 1) as the template for Epstein investigation people
* Delete both template slides from the output after cloning

For each person:

* Duplicate the appropriate template slide (use the slide's XML to
  clone it)
* Replace the person image:
  * Load the image from {IMAGES_DIR}/{FirstName_LastName}.jpg
  * Replace the Picture shape's image with this file
  * Preserve the picture shape's position and size on the slide
  * Scale the image to fit within the shape boundaries WITHOUT changing
    aspect ratio — center the image within the shape bounds if needed
* Replace "Why / How they [template name]:" with
  "Why / How they {Person Display Name}:"
* Replace the bullet points text box:
  * Read {SLIDES_DIR}/{FirstName_LastName}/slide_text.txt
  * Each line starting with "* " is one bullet paragraph
  * Set each paragraph in the text box, preserving the template's font
    formatting (size, color, style) from the first paragraph's first run
  * Use real PowerPoint bullet formatting on each paragraph
* Replace the person name shape text with the person's display name
* Replace the age line:
  * If age is known: "Dead at Age {age}"
  * If age is unknown: delete the age shape from the slide
* Set the banner text to the investigation's banner value
* Set the URL text to the investigation's URL value

--------------------------------------------------------------------
Step 4 — Save the output
--------------------------------------------------------------------

* Remove the original template slides (Slide 1 and Slide 2) from the
  presentation so only the generated person slides remain
* Save the presentation to the output path for this investigation
* Output to stdout: "SAVED: {output_path} ({count} slides)"

====================================================================
SLIDE TEXT FORMAT
====================================================================

The slide_text.txt files contain bullet points like:

* FELL to his DEATH from a 2 STORY balcony.
* He exposed Jeffrey Epstein had COVID as his "kill switch".
* Viral sketches exposed Hollywood pedo rings, Illuminati elites
* Exposed blackmail of politicians to control politicians.

Each line starting with "* " becomes one bullet paragraph on the slide.
Strip the "* " prefix when inserting into the text box. Keep the ALL
CAPS words as-is — they are intentional emphasis.

====================================================================
IMAGE FITTING
====================================================================

When replacing the picture on the slide:

* The template picture shape has a fixed position and size on the slide
* Load the new person image and determine its native aspect ratio
* Scale the image to fill the shape as much as possible without
  distorting the aspect ratio
* If the image is taller than the shape allows (landscape shape,
  portrait image), fit by height and center horizontally
* If the image is wider than the shape allows, fit by width and center
  vertically
* Use the crop properties on the picture shape if needed to achieve
  a clean fill

====================================================================
ERROR HANDLING
====================================================================

* If a slide_text.txt is empty or missing, skip that person and output:
  "SKIPPED: {name} — no slide text"
* If an image file is corrupt or unreadable, skip that person and
  output: "SKIPPED: {name} — image unreadable"
* If a profile has no recognizable age field, proceed with no_age
  handling (remove age shape)
* Continue processing all remaining people after any error

====================================================================
FINAL SUMMARY
====================================================================

Output to stdout:

  ================================================
  POWERPOINT GENERATION COMPLETE
  ================================================
  * Investigation: {name}
  * People with image + slide text: {count}
  * Slides successfully created: {count}
  * People skipped (no slide text): {count}
  * People skipped (no image): {count}
  * People skipped (errors): {count}
  * Output file: {path}
  * File size: {size}
  ================================================

Repeat the summary block for each investigation built.
