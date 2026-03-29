# Intel Murder Docus

Docusaurus site for publishing murder/intelligence documentation.

## Dev Server

Port: **4173** — run `npm start` to serve at http://localhost:4173/

## Top Bar Navigation → Directory Mapping

| Top Bar Label                  | Local Docs Dir | Content Source                                              |
|-------------------------------|----------------|-------------------------------------------------------------|
| Epstein Murders               | `docs/Epstein` | `~/BGit/Bryan/Epstein_Kull_List/`                           |
| Intelligence Service Murders  | `docs/Intel`   | `~/BGit/Bryan/Epstein_Kull_List/other/Intel_Murders/`       |

## Content Sync

The authoritative content lives in the external source repo (`~/BGit/Bryan/Epstein_Kull_List/`).
This site's `docs/` directories are the formatted copy for Docusaurus rendering.

### Source → Local File Mapping

**Epstein Murders** (`docs/Epstein/`):
- `~/BGit/Bryan/Epstein_Kull_List/README.md` → `docs/Epstein/index.md` (with frontmatter added, nav links replaced)
- `~/BGit/Bryan/Epstein_Kull_List/locations.md` → `docs/Epstein/locations.md`
- `~/BGit/Bryan/Epstein_Kull_List/Details/*.md` → `docs/Epstein/Details/*.md` (back-nav links removed)

**Intelligence Service Murders** (`docs/Intel/`):
- `~/BGit/Bryan/Epstein_Kull_List/other/Intel_Murders/README.md` → `docs/Intel/index.md` (with frontmatter added, nav links replaced)
- `~/BGit/Bryan/Epstein_Kull_List/other/Intel_Murders/by_country.md` → `docs/Intel/by_country.md`
- `~/BGit/Bryan/Epstein_Kull_List/other/Intel_Murders/methods.md` → `docs/Intel/methods.md`
- `~/BGit/Bryan/Epstein_Kull_List/other/Intel_Murders/timeline.md` → `docs/Intel/timeline.md`
- `~/BGit/Bryan/Epstein_Kull_List/other/Intel_Murders/Details/*.md` → `docs/Intel/Details/*.md` (back-nav links removed)

### Sync Procedure

Content flows one direction: **external source → local docs dirs**.

1. Record the current commit hash of the source repo (`~/BGit/Bryan/Epstein_Kull_List/`).
2. Compare against the `last_synced_commit` below to find what changed: `git -C ~/BGit/Bryan/Epstein_Kull_List log --name-only <last_synced_commit>..HEAD`
3. For **new files**: copy them in and apply local formatting (remove nav links, add frontmatter if needed).
4. For **modified files**: check if we have local formatting changes. If yes, merge only the content changes from the source — do NOT overwrite local formatting or frontmatter.
5. For **deleted files**: remove the corresponding local file.
6. Update `last_synced_commit` below.

### Formatting Applied During Sync

- `README.md` files become `index.md` with Docusaurus frontmatter (title, sidebar_label, sidebar_position, slug)
- First-line navigation links (e.g., `[< Back to Main List](../README.md) | ...`) are removed from Detail files
- `CLAUDE.md` / `claude.md` files from the source are NOT copied
- Internal links are adjusted to work within the Docusaurus URL structure

### Last Sync

- **Source repo**: `~/BGit/Bryan/Epstein_Kull_List/`
- **Last synced commit**: `9cd1feefc1547020c87d332109983c2ce3988882`
- **Last synced date**: 2026-03-26

## Directory Structure

```
docs/
├── Epstein/          # Epstein Murders — maps to navbar "Epstein Murders"
│   ├── index.md      # Main overview (from source README.md)
│   ├── locations.md
│   └── Details/      # Individual profiles (110 files)
└── Intel/            # Intelligence Service Murders — maps to navbar "Intelligence Service Murders"
    ├── index.md      # Main overview (from source README.md)
    ├── by_country.md
    ├── methods.md
    ├── timeline.md
    └── Details/      # Individual profiles (149 files)
```

## Right Sidebar — "The Dead" People List

The right sidebar on every doc page displays a curated list of 80 assassinated individuals with 28-word-or-less impact descriptions linking to their profile pages.

### How It Works

- `src/data/sidebarPeople.ts` — Data file with 80 entries: `{ name, blurb, url }`. Sorted by audience impact (most shocking first). Mix of Epstein and Intel sections.
- `src/components/PeopleSidebar.tsx` — React component rendering the scrollable people list.
- `src/theme/DocItem/Layout/index.tsx` — Swizzled Docusaurus DocItem Layout that replaces the default right-column TOC with the PeopleSidebar on all doc pages (always visible, not dependent on page headings).
- `src/css/custom.css` — Styles for `.people-sidebar*` classes (sticky positioning, scrollable, compact typography).

### Selection Criteria

People are selected and ordered by:
1. **Child trafficking linked** — Anyone connected to child trafficking investigations or exposure gets top priority
2. **Scientists / Weapons Researchers / UAP Researchers** — Killed over sensitive knowledge (weapons, classified tech, UAP/UFO)
3. **Civilians / Whistleblowers / Insiders** — The most innocent victims and those who risked everything to expose truth
4. **Journalists / Investigators** — Killed for reporting on intelligence operations
5. **Political Activists / Organizers** — Targeted by intelligence services (lower than civilians/whistleblowers/journalists)
6. How shocking/dramatic the death was
7. How important the person was or what they knew
8. Higher priority for "Highly Suspicious" and "Confirmed" over "Suspicious" and "Moderate"
9. Endearing details (age, children, what they stood for) increase impact

### Adding/Editing Entries

Edit `src/data/sidebarPeople.ts`. Each entry has:
- `name` — Person's name (displayed as link text)
- `blurb` — 28 words or less, maximum audience impact
- `url` — Path like `/epstein-murders/Details/Name` or `/intelligence-service-murders/Details/Name`

## Config Files

- `docusaurus.config.ts` — main site config, multi-instance docs plugin
- `sidebarsEpstein.ts` — sidebar config for Epstein section (autogenerated)
- `sidebarsIntelligence.ts` — sidebar config for Intel section (autogenerated)
- `src/css/custom.css` — global styles (left sidebar hidden, people sidebar styles)
- `src/pages/index.mdx` — landing page at `/`
- `src/data/sidebarPeople.ts` — curated people list for right sidebar
- `src/components/PeopleSidebar.tsx` — people sidebar React component
- `src/theme/DocItem/Layout/index.tsx` — DocItem Layout override for people sidebar

---

## DEFAMATION PREVENTION — MANDATORY RULES FOR ALL CONTENT

**These rules override all other instructions. Every profile, index.md entry, and group file MUST comply.**

### The Core Rule

**Never state as fact that any living person committed, ordered, facilitated, or covered up any crime, act of violence, act of immorality, or other harmful act — unless that specific claim has been proven in a court of law or officially acknowledged by the person or their organization.**

Everything else about a living person must be attributed to its source using language like:
- "According to [source]..."
- "Kubler states that..."
- "[Source] alleges that..."
- "reportedly"
- "allegedly"

### Who Counts as a Living Person

- Anyone who is not confirmed dead as of the current date
- Anyone whose death status is uncertain (missing, disappeared)
- Organizations that currently exist (intelligence agencies, military branches, corporations, law firms)
- Estates and families of deceased persons (they can sue on behalf of the deceased in some jurisdictions)

### Specific Prohibited Patterns

**DO NOT** write any of the following about a living person unless proven in court:

| Prohibited Pattern | Safe Alternative |
|---|---|
| "[Person] destroyed evidence" | "According to [source], [Person] allegedly [action]" |
| "[Person] covered up the murder" | "According to [source], [Person] is alleged to have been involved in what [source] describes as a cover-up" |
| "[Person] ordered the killing" | "According to [source], [Person] allegedly ordered..." |
| "[Person] is a suspect" | "According to [investigator], [Person] is among those whose actions [investigator] has questioned" |
| "[Person] lied about..." | "According to [source], [Person]'s account is contradicted by..." |
| "[Person] broke his promise" | "According to [source], [Person] did not follow through on what [source] describes as a commitment" |
| "[Person] is corrupt" | "[Source] has described [Person]'s actions as [specific description]" |
| "[Person] was kicked out of [unit]" | "According to [source], [Person] was reassigned from [unit]" |

### Attribution Requirements by Evidence Tier

| Evidence Tier | How to Frame |
|---|---|
| **Court conviction of this person** | May state as fact: "[Person] was convicted of [crime] in [year]" |
| **Civil settlement** | "[Person] settled a civil lawsuit alleging [claim] for [amount]" — do NOT state the underlying allegation as fact |
| **Official government inquiry finding** | "The [inquiry name] found that..." |
| **Sworn testimony by others** | "[Witness] testified under oath that [Person]..." |
| **Investigator's conclusions** | "According to [investigator], [Person]..." or "[Investigator] concluded that..." |
| **Journalist's reporting** | "As reported by [outlet/journalist]..." |
| **Book or documentary claims** | "According to [title] by [author]..." |
| **Another person's statement** | "[Speaker] stated that [Person]..." |
| **Unverified claims** | "Unverified claims suggest..." or "It has been alleged without confirmation that..." |

### Special Rules for Specific Categories of Living People

**Government officials and politicians:**
- They are public figures with higher defamation thresholds, but "actual malice" still applies
- Never state they committed crimes as fact
- Political inaction (not returning calls, not following up) can be described factually IF attributed to the source who experienced it
- Add "has not publicly commented on these allegations" when the person hasn't responded

**Military and law enforcement personnel:**
- Never call them suspects, perpetrators, or accomplices as fact
- Describe their documented ACTIONS (had the key, was present, made a request) — attribute the interpretation of those actions to the investigator
- Add "has not publicly responded to these allegations" for anyone accused of wrongdoing

**Intelligence agencies (CIA, Mossad, MI6, etc.):**
- Currently operating agencies can sue. Frame involvement as "alleged" unless confirmed by declassified documents or official inquiries
- "The CIA has not commented on these allegations" when applicable

**Convicted persons who are alive (e.g., Ghislaine Maxwell):**
- Convictions can be stated as fact
- Anything beyond the conviction (additional unproven allegations) still needs attribution

### Quality Check Before Publishing Any Profile

Before finalizing any profile that mentions living people, verify:

1. Every accusation against a living person is attributed to a named source
2. No living person is called a "suspect," "perpetrator," "killer," or "accomplice" as fact
3. No living person is said to have "destroyed evidence," "covered up," "lied," or "obstructed" as fact (unless court-proven)
4. Every living person accused of wrongdoing has a note that they have not publicly responded (if true) or their denial is included (if available)
5. The Counterargument section includes alternative explanations
6. Quotes attributed to living people are clearly marked as "according to [source who reported the quote]" unless the quote is from a verified public record

### When in Doubt

If you are unsure whether a claim about a living person is safe to state as fact, **always default to attribution language**. The cost of over-attributing is zero. The cost of a defamation lawsuit is enormous.

---

## The /Intel/ Investigation — Charter

**Domain:** https://IntelligenceMurders.com/
**URL path:** `/intelligence-service-murders/` (the `/Intel/` docs instance)

The core question: **When intelligence agencies murder people who aren't spies — journalists, scientists, elected leaders, activists, whistleblowers, and ordinary citizens — what does that reveal about the real purpose of these agencies?**

The primary focus is on **victims who were NOT intelligence service employees**. These are the people intelligence agencies are supposed to protect, not kill. Journalists exposing corruption. Scientists doing research. Elected leaders serving their countries. Activists fighting for rights. Whistleblowers telling the truth. Civilians caught in crossfire.

Intelligence service employees (officers, agents, defectors) who were murdered by rival or their own services are included for completeness, but they are **secondary** — sorted below non-intelligence victims in every list and table.

### Why This Focus Matters

When a spy kills another spy, that's the game they signed up for. When a spy agency murders a journalist, a scientist, an elected president, or a teenager — that's a crime against the public. This project documents those crimes.

### Scope

* **Time period:** 1969 forward (Church Commission era and beyond). Earlier cases (e.g., Frank Olson, 1953) included when they were exposed or re-investigated during this period.
* **Intelligence services covered:** CIA, MI6/SIS, Mossad, KGB/FSB/GRU, DINA, ISI, Saudi GIP/MBS, BND, DGSE, Bulgarian DS, South African BOSS/NIS, and others.
* **Primary victims (non-intelligence people):**
  * Political leaders and elected officials assassinated
  * Journalists investigating intelligence operations
  * Scientists and weapons researchers killed over sensitive knowledge
  * Whistleblowers who exposed intelligence crimes (from outside the intelligence community)
  * Activists, organizers, and civilian dissidents targeted by intelligence/law enforcement
  * Civilian casualties of intelligence operations
  * Bankers and financiers murdered over intelligence-connected money flows
  * "Friendly fire" cover-ups with intelligence dimensions
* **Secondary victims (intelligence service employees):**
  * Defectors killed by their former service
  * Intelligence officers killed by rival services
  * Intelligence officers killed by their own service
  * These are included but sorted below non-intelligence victims
* **Geographic focus:** Worldwide, but **Americans murdered on American soil are the highest priority**. American victims abroad are second priority. International cases are included but sorted and positioned below American cases in all tables and on the main investigation page.
* **What stays in the Epstein section:** Deaths connected primarily to sex-trafficking blackmail operations remain in `/epstein-murders/`. Some overlap exists (e.g., Danny Casolaro investigated both PROMIS/intelligence and the Epstein orbit) — cross-link where appropriate.

## Focus Areas (in priority order)

1. **Journalists murdered for investigating intelligence operations** — the most direct assault on public accountability
2. **Scientists and researchers killed over sensitive knowledge** — silencing discovery
3. **Political leaders assassinated to control governments** — subverting democracy
4. **Activists and civilians targeted by intelligence/law enforcement** — COINTELPRO, apartheid killings, Operation Condor victims
5. **Whistleblowers killed for exposing intelligence crimes** — punishing truth-telling
6. **Civilian casualties of intelligence operations** — collateral damage and cover-ups
7. **CIA covert operations and proxy assassinations** — using cartels, death squads, and terrorist groups
8. **Mossad targeted killings of non-combatants** — scientists, political figures
9. **Russian intelligence murders of journalists and dissidents** — poisonings, shootings
10. **Intelligence service employees killed** — defectors, double agents, officers (included but lower priority)

## Sorting Criteria

**Every table and list across ALL investigation pages (index.md, by_country.md, timeline.md, methods.md, etc.) must follow this sort order:**

1. **Americans killed on American soil first** — This is the **highest priority sorting rule**. An American murdered on US soil always appears above all other entries, regardless of any other criteria. This reflects the core audience impact: intelligence agencies killing Americans in their own country is the most alarming and actionable category.
2. **Americans killed abroad second** — American citizens murdered outside the US come next, above all non-American entries.
3. **Non-intelligence people above intelligence service employees** — Within each geographic group (American/US soil, American/abroad, international), non-intel victims always sort above intel employees. A murdered journalist, scientist, activist, or elected leader appears above a murdered spy or defector.
4. **Victim category priority (highest-impact categories first)** — Within each geographic/intel group, sort by victim category in this priority order:
   1. **Child trafficking linked** — Any victim whose death is connected to child trafficking investigations or exposure gets the highest category boost, regardless of their other category. This crosses all categories.
   2. **Scientists / Weapons Researchers / UAP Researchers** — Researchers killed over sensitive knowledge, including weapons programs, classified technology, and UAP/UFO research.
   3. **Civilians** — Ordinary people with no intelligence, political, or activist role who were murdered by intelligence services. The most innocent victims.
   4. **Whistleblowers / Insiders** — People who exposed intelligence crimes, whether from inside or outside the intelligence community.
   5. **Journalists / Investigators** — Researched or reported on intelligence operations.
   6. **Foreign Leaders / Political Figures** — Elected leaders and politicians assassinated.
   7. **Political Activists / Organizers** — Targeted by intelligence/law enforcement. Important but lower priority than civilians, whistleblowers, and journalists.
   8. **Military / Law Enforcement / Bankers** — Non-intelligence but institutional roles.
   9. **Intelligence service employees** — Defectors, officers, intel whistleblowers (always last).
5. **Decade (most recent first)** — Within each group, sort by decade: 2020s > 2010s > 2000s > 1990s > 1980s > 1970s > 1960s and earlier. Readers connect more with recent cases, and recent deaths are more actionable.
6. **Suspicion level (highest first)** — Within the same decade, sort by suspicion rating: CONFIRMED > HIGHLY SUSPICIOUS > SUSPICIOUS > MODERATE SUSPICION > UNCERTAIN.
7. **Year (most recent first)** — When two entries share the same decade and suspicion level, put the more recent year first.

### Table Placement on Investigation Pages

Tables and sections that are **heavily international** (e.g., tables dominated by non-American victims in foreign countries) should be positioned **lower on the page**. Tables featuring Americans murdered on American soil should appear at the top. This applies to index.md and all sub-pages.

### Example sort order within a table:
1. American journalist killed in Washington DC, 2023, SUSPICIOUS (American, US soil, non-intel, 2020s — top of list)
2. American activist killed in New York, 1985, CONFIRMED (American, US soil, non-intel, 1980s — US soil trumps recency)
3. American scientist killed in London, 2018, CONFIRMED (American, abroad, non-intel, 2010s)
4. British journalist killed in London, 2023, SUSPICIOUS (international, non-intel, 2020s)
5. Russian activist killed in Moscow, 2020, CONFIRMED (international, non-intel, 2020s)
6. Chilean leader killed in Santiago, 1973, CONFIRMED (international, non-intel, 1970s)
7. American defector killed in US, 2022, CONFIRMED (American, US soil, but intel employee — below ALL non-intel in same geo group)
8. Russian defector killed in London, 2019, HIGHLY SUSPICIOUS (international, intel employee — bottom)

## Suspicion Ratings

* Each entry should show a level of suspicion — it doesn't have to be provable in court
* Levels used (from highest to lowest):
  * **CONFIRMED** — Officially acknowledged, judicially proven, or confirmed by declassified documents
  * **HIGHLY SUSPICIOUS** — Strong evidence of intelligence involvement (missing evidence, impossible logistics, key witness silenced, expert analysis)
  * **SUSPICIOUS** — Multiple red flags, timing coincidences, intelligence connections, or contested official rulings
  * **MODERATE SUSPICION** — Some concerning details but partial explanations exist
  * **UNCERTAIN** — Possible intelligence connection but largely speculative or weak link
  * **OFFICIALLY DENIED** — Strong circumstantial evidence but intelligence service denies involvement; no judicial finding
* For living persons: **AT RISK**, **Missing**, **Survived attempt**, **In exile**, etc.

## Person Categories

### Primary Categories (Non-Intelligence People) — Always sorted above intelligence employees

* **Foreign Leader** — Head of state or government assassinated
* **Political Figure** — Politicians, legislators, diplomats targeted to control governments
* **Journalist / Investigator** — Researched or reported on intelligence operations
* **Scientist / Weapons Expert** — Researcher killed over sensitive knowledge
* **Whistleblower (non-intel)** — Exposed intelligence crimes from outside the intelligence community
* **Activist / Organizer** — Political activist targeted by intelligence/law enforcement
* **Military / Law Enforcement** — Non-intelligence military or police killed with intelligence dimensions
* **Banker / Financier** — Handled intelligence money flows
* **Civilian Casualty** — Bystander killed in intelligence operation
* **Dissident** — Political opponent of an authoritarian regime (not a former intelligence employee)

### Secondary Categories (Intelligence Service Employees) — Always sorted below non-intelligence people

* **Defector** — Former intelligence officer who left their service and was killed by it
* **Intelligence Officer** — Current or former spy killed by their own or rival service
* **Intelligence Whistleblower** — Exposed intelligence crimes from inside the intelligence community

---

## Adding a New Person

### Step 1: Create the Detail Profile

* Filename: `Details/FirstName_LastName.md` (underscores, no spaces)
* Use web search to gather thorough information before writing

### Step 2: Profile Structure (Deceased Persons)

Every profile **MUST** include the following sections. Profiles **MAY** include additional sections beyond these — more information is always welcome.

**Required sections** (minimum for every profile):

```
# Full Name
One-line summary: who they were and how they died.

| Field | Details |
|-------|---------|
| **Full Name** | Legal name |
| **Born** | Date or year |
| **Died** | Full date |
| **Age at Death** | Number |
| **Location of Death** | City, State/Country |
| **Cause of Death** | How they died |
| **Official Ruling** | Suicide / Accidental / Homicide / etc. |
| **Nationality** | American / British / Russian / etc. |
| **Killed on US Soil** | Yes / No — was the death on American soil? |
| **Alleged Intelligence Connection** | Which service(s) are implicated |
| **Victim Was Intel Employee** | Yes / No — was the victim an employee of an intelligence service? |
| **Category** | See categories above |

## Assessment: SUSPICION LEVEL

2-3 sentence summary of why this death is or isn't suspicious. State the strongest evidence of intelligence involvement.

## Circumstances of Death

Narrative of what happened. Where found, when, by whom. What was unusual.

## Background

Who this person was. Their role, career, relationships. Why they mattered to intelligence services.

## Intelligence Connections

* What intelligence service(s) are implicated
* What evidence links this death to intelligence operations
* Declassified documents, judicial findings, or expert analysis
* Known surveillance, threats, or prior attempts

## Why This Death Raises Questions

- Bullet points of each suspicious element
- Timing coincidences
- Missing evidence
- Contradictions in official story
- Expert analysis contradicting official ruling

## Key Quotes

> Blockquoted quotes with attribution and source links

## See Also

- Links to related profiles (use relative paths like [Name](Name.md))
- Links to Epstein section profiles if overlap exists (use `/epstein-murders/Details/Name`)

## Other Shocking Stories

- [Person Name](Person_Name.md): 18 words or less — the most shocking hook about this person. Maximum impact.
- [Person Name](Person_Name.md): 18 words or less — different person, different hook.
- [Person Name](Person_Name.md): 18 words or less — different person, different hook.
- [Person Name](Person_Name.md): 18 words or less — different person, different hook.

Pick 4 other people from the Details/ directory (not the current person). Choose a diverse mix — different categories, different intelligence services, different eras. Write the hook to maximize reader engagement. Keep each hook to 18 words or fewer. Link each name to their profile using relative paths.

## Sources

- Sourced links, one per line
- Prefer: BBC, NPR, CNN, NBC, court documents, Wikipedia, declassified documents, specialty outlets
- Include at least 3-5 sources per profile

*This information was built by Grok and Claude AI research.*
```

**Additional sections profiles MAY include** (beyond the required ones above):

* **Counterarguments / Alternative Explanations** — What the official story claims and why some accept it
* **Family Response** — Statements from family members disputing the official ruling
* **Legal Proceedings** — Lawsuits, inquests, or legal actions related to the death
* **Cover-Up Indicators** — Evidence of evidence tampering, witness intimidation, sealed records
* **Timeline of Events** — Detailed chronological timeline leading up to and after the death
* **Political Context** — What was happening politically that made this person a target
* **Related Operations** — Named intelligence operations (e.g., Operation Condor, COINTELPRO)
* **Forensic Evidence** — Autopsy details, toxicology, expert analysis
* **Witnesses** — Who saw what, who has spoken, who has been silenced
* **Media Coverage** — How the story was reported vs. what evidence shows
* **Aftermath** — What happened after the death (investigations, more deaths, policy changes)
* Any other section that adds value to the profile

### Step 3: Profile Structure (Survived / Living / At-Risk Persons)

* Same structure but replace death fields with:
  * `**Status**` — ALIVE, Survived attempt, In exile, Missing, etc.
  * `**Current Location**` — Where they are now
* Replace "Circumstances of Death" with "The Attempt" or "Current Situation"

### Step 4: Add a Row to index.md

* Add to the appropriate category table
* Row format: `| [Name](Details/Filename.md) | Year | Cause of Death | **SUSPICION LEVEL** | One-line summary. |`
* **Sort position:** Americans killed on American soil first, then Americans killed abroad, then international cases. Within each geographic group, non-intelligence people go above intelligence employees. Then sort by decade (most recent first), suspicion level (highest first), then year (most recent first). See "Sorting Criteria" section above.

### Step 5: Update Patterns if Applicable

* Check if the person fits any existing pattern in the "Patterns Worth Noting" section
* Add them to relevant pattern lists
* If they reveal a new pattern, add a new section

## Writing Style and Defamation Prevention

* Lead with facts, not speculation
* State what is verified vs. what is alleged or unverified
* **Use "allegedly," "reportedly," "according to" for all unconfirmed claims**
* **Attribute claims to their source** — "According to [book/article/testimony]..."
* **Tiers of evidence (use appropriate framing for each):**
  * Court findings, convictions, and public inquiries — can state as fact
  * Declassified government documents — can state as fact with document citation
  * Sworn testimony — "testified under oath that..."
  * Major outlet journalism — "reported by [outlet]..."
  * Books and documentaries — "claimed in [title] by [author]..."
  * Defector testimony — "according to defector [name]..."
  * Unverified online accounts — "unverified claims circulated that..."
* **Include denials** — if a government or intelligence service has denied involvement, include the denial
* **For currently operating intelligence services:** Frame as "alleged" unless confirmed by declassified documents, judicial findings, or official inquiries
* Include the person's own words when available
* Include family members' statements when they dispute official rulings
* Note when evidence was destroyed, sealed, classified, or went missing
* Cross-link to related profiles
* Cross-link to Epstein section profiles where overlap exists (use `/epstein-murders/Details/Name`)
* End every profile with `*This information was built by Grok and Claude AI research.*`

## Key Patterns to Watch For

* Poisonings (polonium, Novichok, ricin, thallium, arsenic)
* Car crashes / car bombs at suspicious timing
* "Suicides" before testimony or publication
* Defectors killed after leaving intelligence services
* Journalists killed while investigating intelligence operations
* Plane crashes involving investigators or political figures
* Scientists killed before disclosing sensitive knowledge
* Deaths that cluster around specific operations or investigations
* Intelligence services using criminal proxies (mafia, cartels, terrorist groups)
* Cover-ups: sealed records, destroyed evidence, blocked inquests
* Pattern of official ruling contradicted by forensic evidence
* Operations on foreign soil (extraterritorial assassinations)

## Cross-Linking Between Investigations

### Investigation Cross-Links in index.md

Each investigation's index.md **must** include a one-line cross-link to the other investigation, placed in the introductory paragraphs (near the end of the intro, before the first table):

* **Epstein index.md** includes: `**For intelligence service assassinations of journalists, scientists, and political leaders, see [Intelligence Service Murders](/intelligence-service-murders/).**`
* **Intel index.md** includes: `**For deaths connected to Jeffrey Epstein's sex-trafficking and blackmail operation, see the [Epstein Kill List](/epstein-murders/).**`

### Individual Profile Cross-Links

Some individuals appear in both investigations:
* **Danny Casolaro** — investigated PROMIS (intelligence) AND Maxwell/Epstein connections
* **Ted Gunderson** — investigated both elite blackmail rings AND intelligence operations
* **William Colby** — former CIA director with connections to multiple investigations

When a person has a profile in both sections, link between them. Use `/epstein-murders/Details/Name` for Epstein section profiles and `/intelligence-service-murders/Details/Name` for Intel section profiles.

## Research Approach

* Use web search extensively before writing any profile
* Prioritize declassified documents, judicial findings, and public inquiry reports
* Include the Church Committee, Pike Committee, and subsequent congressional investigations
* Reference key books: *Legacy of Ashes* (Weiner), *The Devil's Chessboard* (Talbot), *Poisoner in Chief* (Kinzer), *Kill Chain* (Cockburn), *Dirty Wars* (Scahill)
* Track the evolution from Church Commission-era exposure through modern drone warfare
