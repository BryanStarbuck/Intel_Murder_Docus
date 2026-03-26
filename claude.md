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
1. How shocking/dramatic the death was
2. How important the person was or what they knew
3. Higher priority for "Highly Suspicious" and "Confirmed" over "Suspicious" and "Moderate"
4. Endearing details (age, children, what they stood for) increase impact

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
