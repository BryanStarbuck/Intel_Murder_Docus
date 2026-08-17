#!/usr/bin/env python3
"""
Repo-wide media publication audit for Intel_Murder_Docus (intelligencemurders.com).

Answers the one question that matters: for every X post this skill has ever processed,
can a real visitor actually SEE its media on a page?

Exits 0 when clean, 1 when any issue is found.

    python3 skills_storage/audit_media_publication.py > /tmp/audit.txt; echo "exit=$?"
    tail -40 /tmp/audit.txt

DO NOT PIPE THIS STRAIGHT INTO head/tail. The shell reports the LAST command's exit
status, so `audit.py | tail -20` exits 0 even on a failing audit. Redirect to a file as
shown above, or read the RESULT line instead of trusting the exit code.

Checks
------
  NO_VIDEO_FILE   yaml says has_video but no .mp4 on disk
  NO_MANIFEST     .mp4 on disk with no manifest row
  NOT_PINNED      manifest CID not pinned locally  (needs a running ipfs daemon)
  NO_PROVIDER     manifest CID neither on disk nor pinned -> dead player for everyone
  ORPHAN_VIDEO    .mp4 whose CID appears on no page
  LOCAL_SRC       a page embeds /videos/<file> -- that path is gitignored, always 404s
  IMAGE_UNTRACKED image on disk but not tracked in git -> 404s on the live site
  IMAGE_IGNORED   image matched by a .gitignore rule (Large File Bridge pollution)
  ORPHAN_IMAGE    image tracked but embedded on no page
  BAD_ROUTE       a link uses /epstein/ or /intel/ instead of the real routeBasePath

Flags
-----
  --gateway   also probe every video CID against the public IPFS gateway (slow, network)
  --recheck-x also re-probe every post with yt-dlp to catch video the X API missed on a
              QUOTED post (this is how post 2047769275708895549 was found in Aug 2026)
"""
import os, re, sys, glob, json, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

try:
    import yaml
except ImportError:
    sys.exit("pyyaml required: pip3 install pyyaml")

GATEWAY = "--gateway" in sys.argv
RECHECK = "--recheck-x" in sys.argv
issues = []


def add(kind, ident, detail):
    issues.append((kind, ident, detail))
    print(f"  {kind:<16} {ident:<24} {detail}")


def sh(cmd, timeout=180):
    try:
        return subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    except Exception as e:
        class R: returncode, stdout, stderr = 1, "", str(e)
        return R()


def pages_containing(needle):
    r = sh(["rg", "-l", "--", needle, "docs", "src"])
    return [p for p in r.stdout.split()
            if "/x_posts/" not in p and "/transcripts/" not in p]


print("=" * 70)
print("  Intelligence Murders — media publication audit")
print("=" * 70)

# ---------------------------------------------------------------- load state
posts = {}
for d in ("docs/Epstein/other/x_posts", "docs/Intel/other/x_posts"):
    for f in glob.glob(d + "/*.yaml"):
        pid = os.path.basename(f)[:-5]
        try:
            y = yaml.safe_load(open(f, encoding="utf8"))
        except Exception:
            y = {}
        posts[pid] = y if isinstance(y, dict) else {}

man = {}
if os.path.exists("static/videos/manifest.yaml"):
    for v in (yaml.safe_load(open("static/videos/manifest.yaml", encoding="utf8")) or {}).get("videos") or []:
        man[v["filename"]] = v

pinned = set()
r = sh(["ipfs", "pin", "ls", "--type=recursive"])
if r.returncode == 0:
    pinned = {l.split()[0] for l in r.stdout.splitlines() if l.strip()}
else:
    print("\n  NOTE: ipfs daemon unreachable — pin checks skipped\n")

print(f"\nposts: {len(posts)}   manifest rows: {len(man)}   local pins: {len(pinned)}\n")

# ------------------------------------------------------------------- videos
print("-- videos " + "-" * 58)
for pid, y in sorted(posts.items()):
    mp4 = f"static/videos/{pid}.mp4"
    on_disk = os.path.exists(mp4) and os.path.getsize(mp4) > 0
    if y.get("has_video") and not on_disk:
        if y.get("video_unrecoverable"):
            print(f"  {'LOST_UPSTREAM':<16} {pid:<24} source post deleted from X; transcript retained")
        else:
            add("NO_VIDEO_FILE", pid, f"{y.get('url','')} — yaml says has_video, no file on disk")
    if on_disk and f"{pid}.mp4" not in man:
        add("NO_MANIFEST", pid, "on disk but no manifest row")

for fn, v in sorted(man.items()):
    cid, pid = v.get("ipfs_cid", ""), fn.rsplit(".", 1)[0]
    on_disk = os.path.exists(f"static/videos/{fn}")
    if pinned and cid not in pinned:
        add("NOT_PINNED", pid, cid)
    if not on_disk and pinned and cid not in pinned:
        add("NO_PROVIDER", pid, f"{cid} — dead player for every visitor")
    if fn.endswith(".mp4") and not v.get("derived_from"):
        if not pages_containing(cid):
            add("ORPHAN_VIDEO", pid, f"{cid} on no page")

r = sh(["rg", "-n", r'src="/videos/', "docs"])
for line in r.stdout.splitlines():
    add("LOCAL_SRC", line.split(":")[0], "gitignored path — will 404 in production")

if GATEWAY:
    print("\n-- public gateway probe " + "-" * 44)
    for fn, v in sorted(man.items()):
        if not fn.endswith(".mp4") or v.get("derived_from"):
            continue
        cid = v["ipfs_cid"]
        p = sh(["curl", "-s", "-o", "/dev/null", "-w", "%{http_code} %{content_type}",
                "-r", "0-1000", "--max-time", "120", f"https://ipfs.io/ipfs/{cid}"])
        code, _, ctype = p.stdout.strip().partition(" ")
        if code not in ("200", "206") or "video" not in ctype:
            add("NO_PROVIDER", fn.rsplit(".", 1)[0], f"{cid} gateway {code} {ctype}")

if RECHECK:
    print("\n-- re-probing X for video the API missed on quoted posts " + "-" * 11)
    for pid, y in sorted(posts.items()):
        if os.path.exists(f"static/videos/{pid}.mp4"):
            continue
        url = y.get("url") or f"https://x.com/i/status/{pid}"
        p = sh(["yt-dlp", "--skip-download", "--no-warnings", "--print", "%(id)s", url])
        if p.returncode == 0 and p.stdout.strip():
            add("RECOVERABLE", pid, f"{url} — yt-dlp finds video, not on disk. Download it.")

# ------------------------------------------------------------------- images
# A deliberate decision not to publish is recorded in static/images/withheld.csv and
# reports as WITHHELD, not ORPHAN. That is the difference between "we chose not to run
# this" and "we lost track of this".
withheld = {}
if os.path.exists("static/images/withheld.csv"):
    import csv
    with open("static/images/withheld.csv", encoding="utf-8-sig") as fh:
        for row in csv.DictReader(fh):
            if row.get("filename"):
                withheld[row["filename"].strip()] = row.get("reason", "")[:70]

print("\n-- images " + "-" * 58)
for img in sorted(glob.glob("static/images/*")):
    if not re.search(r"\.(jpg|jpeg|png|webp)$", img, re.I):
        continue
    base = os.path.basename(img)
    if sh(["git", "ls-files", "--error-unmatch", img]).returncode != 0:
        add("IMAGE_UNTRACKED", base, "not in git — will 404 on the live site")
    ci = sh(["git", "check-ignore", "-v", img])
    if ci.returncode == 0:
        add("IMAGE_IGNORED", base, ci.stdout.strip())
    elif base in withheld:
        print(f"  {'WITHHELD':<16} {base:<24} {withheld[base]}...")
    elif not pages_containing("/images/" + base):
        add("ORPHAN_IMAGE", base, "tracked but on no page")

# ------------------------------------------------------------------- routes
print("\n-- route paths " + "-" * 53)
r = sh(["rg", "-n", r"\]\(/epstein/|\]\(/intel/", "docs"])
for line in r.stdout.splitlines():
    add("BAD_ROUTE", line.split(":")[0], "use /epstein-murders/ or /intelligence-service-murders/")

# ------------------------------------------------------------------- result
print("\n" + "=" * 70)
if issues:
    counts = {}
    for k, _, _ in issues:
        counts[k] = counts.get(k, 0) + 1
    print(f"  RESULT: FAIL — {len(issues)} issue(s): " +
          ", ".join(f"{k}={v}" for k, v in sorted(counts.items())))
    print("=" * 70)
    sys.exit(1)
print("  RESULT: PASS — every post's media is downloaded, pinned, and on a page")
print("=" * 70)
sys.exit(0)
