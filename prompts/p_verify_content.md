ROOT_DIR dir is ~/BGit/Bryan/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

====================================================================
GOAL
====================================================================

Verify that every person is in the correct investigation directory and on the
correct website. Find anybody who was accidentally deleted or moved to the
wrong place. Recover anything lost.

Two websites exist. Each has its own investigations:

#1: UAP Murders
  * URL: https://uapmurders.com/
  * Dir: ~/BGit/Bryan/UAP_Murder_Docus/
  * Investigations: UAPs, Energy, Physics

#2: Intelligence Murders
  * URL: https://intelligencemurders.com/
  * Dir: ~/BGit/Bryan/Intel_Murder_Docus/
  * Investigations: Epstein, Intel

====================================================================
INVESTIGATION SCOPE DEFINITIONS
====================================================================

Epstein ({EPSTEIN_DOCS_DIR}):
  * People connected to Jeffrey Epstein
  * People connected to any child trafficking ring
  * People connected to any blackmail ring tied to trafficking
  * Deaths, disappearances, or threats related to any of the above

Intel ({INTEL_DOCS_DIR}):
  * Victims of political assassination
  * Killings suspected to have been caused by intelligence services
  * Murders that were politically targeted
  * Journalists, scientists, activists, whistleblowers, and leaders killed
    by or at the direction of intelligence agencies

UAP Murders site (~/BGit/Bryan/UAP_Murder_Docus/):
  * People killed in connection with UAP/UFO research or disclosure
  * People killed over suppressed energy or physics breakthroughs
  * Scientists and researchers murdered for what they discovered

====================================================================
PLACEMENT EXAMPLES
====================================================================

These examples define where specific people belong:

* Virginia Giuffre
  * Dir: ~/BGit/Bryan/Intel_Murder_Docus/
  * Investigation: Epstein

* William Cooper
  * Dir: ~/BGit/Bryan/Intel_Murder_Docus/
  * Investigation: Intel

* Robert Bass
  * Dir: ~/BGit/Bryan/UAP_Murder_Docus/
  * Investigation: Energy

====================================================================
PREVIOUS SOURCE DIRECTORIES
====================================================================

People may have originally lived in these directories before being copied
into the websites. Search these for missing people or to cross-check:

* ~/BGit/Bryan/Deep_State
* ~/BGit/Bryan/Epstein_Kull_List

====================================================================
PASS 1 — ITERATE THROUGH EXISTING PEOPLE
====================================================================

Go through each investigation one at a time. For each investigation, iterate
through every person who currently has a profile in that investigation's
Details/ directory.

For each investigation ({EPSTEIN_DOCS_DIR}, {INTEL_DOCS_DIR}):

  * List every person file in Details/
  * For each person:
    * Read their profile markdown file
    * Determine which investigation they actually belong in based on the
      scope definitions above
    * Determine which website they belong on (Intel_Murder_Docus or
      UAP_Murder_Docus)
    * If they are in the wrong investigation but correct website, move
      their file to the correct Details/ directory
    * If they are on the wrong website entirely, move their file to the
      correct website's Details/ directory
    * If they belong in multiple investigations, keep them in the primary
      one and note the overlap
    * Check that their row exists in the parent index.md table
    * Output to stdout any person who was moved, where they came from,
      and where they went

If any person is found in the wrong place, output a warning:

  Output to stdout "WARNING: Found misplaced people. Re-examining all
  remaining profiles with extra scrutiny."

Then continue through the rest with heightened attention.

====================================================================
PASS 2 — SEARCH GIT HISTORY FOR DELETED PEOPLE
====================================================================

After Pass 1 is complete, search git history to find people who may have
been accidentally deleted.

For each investigation ({EPSTEIN_DOCS_DIR}, {INTEL_DOCS_DIR}):

  * Run git log on the Details/ directory to find all files that ever
    existed there
  * Compare the historical file list against what currently exists
  * For each file that existed in git history but is missing now:
    * Check if it was intentionally moved (look at the commit message)
    * Check if it exists in another investigation directory or on the
      other website
    * Check if it exists in the previous source directories listed above
    * If it was truly deleted and not moved anywhere:
      * Output to stdout "LOST PERSON: {name} was deleted in commit
        {hash} on {date}. Recovering."
      * Recover the file from git history
      * Place it in the correct investigation directory based on the
        scope definitions
      * Add their row back to the parent index.md table

Also search the previous source directories for people who never made it
into either website:

  * ~/BGit/Bryan/Deep_State
  * ~/BGit/Bryan/Epstein_Kull_List

  * For each person found in those directories:
    * Check if they have a corresponding profile on either website
    * If they are missing from both websites, output to stdout:
      "MISSING PERSON: {name} exists in {source_dir} but was never added
      to either website."

====================================================================
FINAL SUMMARY
====================================================================

After both passes, output to stdout a summary:

  * Total people checked in Pass 1
  * Number moved between investigations
  * Number moved between websites
  * Total deleted people found in Pass 2
  * Number recovered from git history
  * Number missing from source directories that were never added
  * Any other anomalies found
