ROOT_DIR dir is ~/BGit/Bryan_git/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

EPSTEIN_SLIDES_DIR dir is {EPSTEIN_DOCS_DIR}/slides
INTEL_SLIDES_DIR dir is {INTEL_DOCS_DIR}/slides

EPSTEIN_IMAGES_DIR dir is {EPSTEIN_DOCS_DIR}/Details/images
INTEL_IMAGES_DIR dir is {INTEL_DOCS_DIR}/Details/images

TEMPLATE_PPTX is file ~/BGit/Bryan_git/prompts/Template_PowerPoint.pptx

PYTHON_PPTX_VENV dir is /tmp/pptx_venv

====================================================================
GOAL
====================================================================

One PowerPoint per investigation, one slide per person with both an image and slide text, cloned from the template slide with image, name, age and bullets replaced.

Output files:
  {EPSTEIN_DOCS_DIR}/Epstein_Murders.pptx
  {INTEL_DOCS_DIR}/Intelligence_Service_Murders.pptx

Scope: build only the investigation (or website) the user names; otherwise both.

Prerequisite: run all Python with {PYTHON_PPTX_VENV}/bin/python3. If the venv or python-pptx is missing:
    python3 -m venv {PYTHON_PPTX_VENV}
    {PYTHON_PPTX_VENV}/bin/pip install python-pptx Pillow

====================================================================
TEMPLATE STRUCTURE
====================================================================

{TEMPLATE_PPTX} has two example slides with the same layout. Identify shapes by content and position, not name (names repeat):

* TOP BANNER: full-width bar at y near 0. Investigation title text.
* PERSON IMAGE: Picture shape, right side (~58% from left), ~40% slide width.
* "Why / How they [Name]:": bold ~32pt TextBox below the banner, left. Replace the name.
* BULLET POINTS: TextBox below that, left, 3-5 paragraphs, one per bullet.
* PERSON NAME: auto shape below the image, ~48pt.
* AGE LINE: auto shape below the name, "Dead at Age 58", ~36pt.
* "Read List Here:": bottom-left auto shape. Keep as-is.
* URL LINE: TextBox at the very bottom.

Per investigation:

Epstein investigation:
  * Banner text: " 110+ Murdered: in Epstein Cover-up"
  * URL text: "https://intelligencemurders.com/epstein-murders"
  * Template: Slide 2 (index 1)
  * Slides dir: {EPSTEIN_SLIDES_DIR} · Images dir: {EPSTEIN_IMAGES_DIR} · Profiles dir: {EPSTEIN_DOCS_DIR}/Details/

Intel investigation:
  * Banner text: " 150+ Murdered: by Intelligence Services"
  * URL text: "https://intelligencemurders.com/intelligence-service-murders"
  * Template: Slide 1 (index 0)
  * Slides dir: {INTEL_SLIDES_DIR} · Images dir: {INTEL_IMAGES_DIR} · Profiles dir: {INTEL_DOCS_DIR}/Details/

====================================================================
INSTRUCTIONS (per investigation)
====================================================================

Step 1 — People
* Include each {SLIDES_DIR}/{FirstName_LastName}/slide_text.txt that also has {IMAGES_DIR}/{FirstName_LastName}.jpg.
* Output to stdout "{investigation}: {count} people with image + slide text"

Step 2 — Age
* From Details/{FirstName_LastName}.md read the "Age at Death" row. If missing or "Unknown", compute from Born and Died. Otherwise no_age.

Step 3 — Build (python-pptx script)
* Open {TEMPLATE_PPTX}; for each person clone the investigation's template slide via its XML.
* Image: replace the Picture with the person's .jpg, keeping the shape's position and size. Fit without distortion: portrait image in a wider shape fits by height and centers horizontally, wider image fits by width and centers vertically; use picture crop properties for a clean fill.
* "Why / How they {Person Display Name}:"
* Bullets: each "* " line of slide_text.txt becomes one paragraph, "* " stripped, real PowerPoint bullet formatting, font copied from the template's first paragraph's first run. Keep ALL CAPS words (intentional emphasis).
* Name shape: display name. Age: "Dead at Age {age}", or delete the age shape when no_age.
* Set banner and URL text.

Step 4 — Save
* Delete both template slides so only person slides remain, save to the output path.
* Output to stdout "SAVED: {output_path} ({count} slides)"

Example slide_text.txt:

* FELL to his DEATH from a 2 STORY balcony.
* He exposed Jeffrey Epstein had COVID as his "kill switch".
* Viral sketches exposed Hollywood pedo rings, Illuminati elites
* Exposed blackmail of politicians to control politicians.

====================================================================
ERROR HANDLING (continue with remaining people after any error)
====================================================================

* Empty or missing slide_text.txt: "SKIPPED: {name} — no slide text"
* Corrupt image: "SKIPPED: {name} — image unreadable"
* No recognizable age: no_age handling.

====================================================================
FINAL SUMMARY (one block per investigation)
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
