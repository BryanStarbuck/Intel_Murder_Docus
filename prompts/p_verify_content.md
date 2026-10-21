ROOT_DIR dir is ~/BGit/Bryan_git/Intel_Murder_Docus

EPSTEIN_DOCS_DIR dir is {ROOT_DIR}/docs/Epstein
INTEL_DOCS_DIR dir is {ROOT_DIR}/docs/Intel

UAP_SITE_DIR dir is ~/BGit/Bryan_git/UAP_Murder_Docus

====================================================================
GOAL
====================================================================

Verify every person is in the correct investigation and on the correct website. Find anyone accidentally deleted or misplaced and recover them.

Websites:
* Intelligence Murders (https://intelligencemurders.com/), {ROOT_DIR}: Epstein, Intel
* UAP Murders (https://uapmurders.com/), {UAP_SITE_DIR}: UAPs, Energy, Physics

Scope:
* Epstein ({EPSTEIN_DOCS_DIR}): people connected to Jeffrey Epstein, any child trafficking ring, or any blackmail ring tied to trafficking; deaths, disappearances or threats related to these.
* Intel ({INTEL_DOCS_DIR}): victims of political assassination, killings suspected to be by intelligence services, politically targeted murders; journalists, scientists, activists, whistleblowers and leaders killed by or at the direction of intelligence agencies.
* UAP Murders site: people killed over UAP/UFO research or disclosure, or suppressed energy or physics breakthroughs; scientists murdered for what they discovered.

Placement examples: Virginia Giuffre → Intel_Murder_Docus, Epstein. William Cooper → Intel_Murder_Docus, Intel. Robert Bass → UAP_Murder_Docus, Energy.

Previous source dirs (may have been deleted; if so use ~/BGit/Bryan_git/Deep_State_BACKUP_20260318_095340 and git history):
* ~/BGit/Bryan_git/Deep_State
* ~/BGit/Bryan_git/Epstein_Kull_List

====================================================================
PASS 1 — EXISTING PEOPLE
====================================================================

For each investigation ({EPSTEIN_DOCS_DIR}, {INTEL_DOCS_DIR}), for every file in Details/:
* Read the profile; decide the correct investigation and website from the scope above.
* Wrong investigation or wrong website: move the file to the correct Details/ dir.
* Fits several: keep it in the primary one and note the overlap.
* Confirm its row exists in the parent index.md table.
* Output to stdout every move (from, to).

On the first misplaced person: Output to stdout "WARNING: Found misplaced people. Re-examining all remaining profiles with extra scrutiny." and continue with heightened attention.

====================================================================
PASS 2 — DELETED PEOPLE
====================================================================

For each investigation:
* git log the Details/ dir for every file that ever existed; compare with what exists now.
* For each missing file, check the commit message (intentional move?), the other investigation, the other website, and the source dirs.
* Truly deleted: Output to stdout "LOST PERSON: {name} was deleted in commit {hash} on {date}. Recovering." Recover it from git, place it in the correct investigation, add its row back to the parent index.md.

For each person in the source dirs with no profile on either website: Output to stdout "MISSING PERSON: {name} exists in {source_dir} but was never added to either website."

====================================================================
FINAL SUMMARY
====================================================================

Output to stdout:

  * Total people checked in Pass 1
  * Number moved between investigations
  * Number moved between websites
  * Total deleted people found in Pass 2
  * Number recovered from git history
  * Number missing from source directories that were never added
  * Any other anomalies found
