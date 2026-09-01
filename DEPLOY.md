# DEPLOY

**Cloudflare Workers static assets, serving from the ROOT of a `workers.dev` subdomain.**
No GitHub Actions workflow, no `base`, no Settings → Pages step.

---

## 1 · What is being deployed

`npm run build` writes `dist/`. That directory is the whole site: HTML, hashed assets, the Pagefind
index, `robots.txt`, `llms-full.txt`, a `.md` sibling for every page, and `_headers`/`_redirects`.

**There is no server.** `wrangler.jsonc` has **no `main`**, deliberately.

---

## 2 · Why Workers and not Pages

Two concrete gains, and they are the whole argument:

- **Trailing-slash policy and the custom 404 become keys in git** rather than implicit dashboard
  behaviour that nobody can diff.
- **`html_handling: "auto-trailing-slash"`** matches what Astro emits, which is what
  `<link rel="canonical">` already claims. `drop-trailing-slash` would put every URL one 307 away
  from its own canonical.

---

## 3 · The three things that fail in ways that do not look like their cause

### a · Node version

`.nvmrc` holds **`24.18.0`** — one of the two versions the Workers Builds image preinstalls. Naming
any other patch makes Cloudflare fetch it mid-build, which is reported failing.

**Symptom:** a syntax error or unsupported API in a file you did not touch.
**Do not "try a lower version to see if it works."**
Fallback: `NODE_VERSION` in the Worker's build variables.

### b · The Worker name decides the URL

`name` in `wrangler.jsonc` must equal the dashboard Worker name or the deploy is refused. Name plus
account subdomain **is** the served URL, and `SITE` in `astro.config.mjs` must match it.

**Set the name first, then `SITE`.**

> **`SITE` is DERIVED, not confirmed.** The sibling project is live at
> `mylearnstack.missionshrestha.workers.dev`, and a workers.dev subdomain is per **account**, so
> `readings.missionshrestha.workers.dev` follows. **Read the real one off the dashboard before the
> first deploy.**
>
> **A wrong `SITE` used to fail no check.** It type-checked, it built, every internal link validated,
> and `wrangler dev` served it happily — while every page told Google the real page lives on a host
> that does not exist. Undoing that means waiting for a re-crawl.

### What the `SITE` guard checks now, and what it still cannot

Until 2026-08-31 the guard was `if (SITE.includes('REPLACE-ME')) throw`. The placeholder had already
been replaced, so the condition could never be true again — **a no-op wearing a comment that called
itself a control**, and the mistake its own comment described was the one case it could not catch.

| Checked | Can it fire? |
|---|---|
| Absolute `https://` origin | yes — a bare hostname or `http://` refuses |
| No path, port, query or hash | yes — Astro joins `site` with each page path, so a stray segment doubles into every canonical |
| Not localhost or an IP | yes |
| **First host label === `name` in `wrangler.jsonc`** | **yes, and this is the one with teeth** |

The last row is the cross-check. A workers.dev origin is
`https://<worker name>.<account subdomain>.workers.dev`, and the worker name is written down twice —
here and in `astro.config.mjs`. Rename one and forget the other and the build refuses, naming both
files. **Probed 2026-08-31**: pointing `SITE` at `reading.` (one letter short) produced

```
BUILD REFUSED — `site` in astro.config.mjs.
SITE says the worker is "reading" and wrangler.jsonc says it is "readings".
```

**What it still cannot check: the account subdomain.** Nothing in this repository knows it, and
inventing an expected value would be a guess enforced as a rule. §4b of your own checklist —
confirm it against the dashboard — is still the only thing that covers it.

### c · The `assets` keys are not optional

`not_found_handling: "404-page"` is what serves `dist/404.html`. **Never
`"single-page-application"`** — it answers every typo with HTTP 200 and the home page.

---

## 4 · Indexing — decided, and it decides itself

The site is `noindex` while it lives on `workers.dev`, and it **flips itself** the day `SITE` becomes
a real domain. `src/lib/indexing.ts` derives both the meta tag and the `Sitemap:` line from `SITE`;
there is no flag to remember.

**Why `noindex` and not `Disallow`, because getting it backwards fails silently:**

> `Disallow: /` does NOT mean "do not index". It means "do not crawl" — and a page that is never
> crawled is a page whose `noindex` is never READ. To keep a page OUT of the index you must let the
> crawler IN and tell it `noindex`.

So `robots.txt` says `Allow: /` in both modes. Only the `Sitemap:` line changes.

**Why it matters here:** Cloudflare cannot redirect one hostname to another without a Worker script,
and adding one makes every page view billable. Anything indexed on `workers.dev` would be
**stranded, not migrated.**

---

## 5 · Privacy — decide this before the first chapter in a sensitive domain

Chapters in **relationships, love and money** will carry real material about other people.

**The build refuses** any authored page in those domains that carries no explicit `private: true` or
`private: false`. Checked against the **directory**, so a typo in the field being protected cannot
evade it. `scripts/guards.mjs`.

**`private: true` did not do what this file said it did, and it was found by probe on 2026-08-31.**

`CLAUDE.md` claimed it "excludes a page from `build` entirely". Starlight's route generator filters
`data.draft === false` and nothing else — `private` appears nowhere in its routing or schema. It was
honoured only by this project's own four consumers of `getCollection('docs')`. The probe: one page,
`private: true`, in `money-and-wealth`, with a unique marker in the body.

| | Before the fix |
|---|---|
| build | **exit 0, GREEN**, 113 → **114 pages** |
| route | `dist/money-and-wealth/.../index.html`, **39,609 bytes, served** |
| body | marker **present in `dist/`** |
| sitemap | **listed in `sitemap-0.xml`** |
| Pagefind | emitted `data-pagefind-body` — **offered to the search index** |
| `llms-full.txt` | correctly absent — that consumer does gate |
| the three controls | **all passed** |

**Two independent mechanisms now, because the material is about other people:**

1. `src/content.config.ts` wraps Starlight's loader and **drops private entries from the collection
   during `build`**. An entry that is not in the store is a page Starlight never knew about, so
   there is no route, no sitemap entry and no Pagefind record.
2. **Control 4 in `scripts/guards.mjs` re-reads `dist/` at `astro:build:done`** and refuses if a
   route or an inbound link to one exists anyway.

**Control 4 runs inside `npm run build` now, and that is the second half of the fix.** It used to
live in `audit.mjs`, which printed *"The build refuses these too"* underneath it — **and that was
false.** `npm run ci` is `astro check && astro build`; `audit.mjs` is in neither, has no hook, and
there is no git hook in the repository. The only protection for personal material was a line a human
had to remember to type, and the tool asserting otherwise was the tool that found the leak.

```bash
npm run build              # controls 1-3 refuse before rendering; control 4 refuses after
node scripts/audit.mjs     # the same four, plus the corpus report
```

It asks the two questions that matter — **does a route exist for a hidden page**, and **does anything
in `dist/` link to one** — and `audit.mjs` skips it LOUDLY when there is no `dist/`, because "didn't
run" is never "passed". The build's own copy never has that problem: `dist/` always exists by the
time it runs.

This is the one check that would have caught the sibling project's defect, where `draft: true` hid
the page and **published its raw source at HTTP 200** — invisible because it needed a draft and a
deploy simultaneously.

> **It was a `grep -r "<slug>" dist/ | wc -l` until 2026-08-31, and that version is wrong.** The day
> `/method/protocol/` was published the count went from 0 to 2, because the protocol document
> *illustrates a directory layout* using `02-deep-work-is-rare.mdx` as an example filename. A slug
> inside a published `<pre>` is not a leak. A check that cries wolf gets ignored, which is worse
> than not having it.
>
> **The replacement was probed three ways before being trusted** — a fabricated route, an injected
> inbound link, and a missing `dist/` — and **the first version of it passed all three when it
> should have failed all three**: `get()` returns the *string* `'true'`, and comparing it to the
> boolean silently matched nothing. A control nobody has watched fail is not yet a control.

---

## 6 · Every deploy

```bash
npm run ci                     # astro check && astro build — exactly what Cloudflare runs
node scripts/audit.mjs         # the four controls, plus anything stuck
node scripts/contrast.mjs      # 104 colour pairs across four themes
npx wrangler dev               # then probe it — see below
```

**`npx wrangler dev` is the ONLY local server that applies `html_handling`, `not_found_handling`,
`_headers` and `_redirects`.** `astro preview` does not, and will pass things production fails.

Probe it, and **check each line against the expected column** rather than against a feeling that it
looked right:

| Command | Expect | A failure here means |
|---|---|---|
| `curl -sI localhost:8787/self-command/` | `HTTP/1.1 200` | the asset directory is wrong (§8.6) |
| `curl -sI localhost:8787/self-command` | `307` with `location: /self-command/` | `html_handling` is not `auto-trailing-slash`; every URL is one hop from its own canonical |
| `curl -sI localhost:8787/does-not-exist/` | `404` **and** the body is the 404 page | `not_found_handling` — a `200` here means someone set `single-page-application` (§8.8) |
| `curl -s localhost:8787/robots.txt \| head -3` | `Allow: /`, and **no `Sitemap:` line while on workers.dev** | §4. A `Sitemap:` line on a temporary host invites the wrong hostname into the index |
| `curl -sI localhost:8787/_astro/<hashed>.css \| grep -i cache-control` | `immutable` | `public/_headers` did not ship |
| `curl -s localhost:8787/ \| grep -c 'name="robots"'` | `1` while on workers.dev, `0` on a real domain | `isIndexable()` is derived from `SITE`; if this is wrong, `SITE` is wrong |

Then, and the tags matter because they say **who acts**:

- **[REPO]** report what changed, and paste the output rather than summarising it.
- **[YOU]** commit and push. **Claude Code never commits and never pushes** — it offers a draft
  message and stops.
- **[REPO]** watch the build.
- **[YOU + REPO]** **fetch the live URL and confirm it responds.**

**That last step is not optional.** "The build went green" and "the site is live and correct" are
different claims.

Then: report what changed · **ask before committing and pushing** · watch the build · **fetch the
live URL and confirm it responds.**

**That last step is not optional.** "The build went green" and "the site is live and correct" are
different claims.

---

## 6b · Claims in circulation about this deploy that are WRONG

Each of these was believed at some point in this repository or its sibling, and each is recorded here
so it is not re-introduced by someone acting reasonably on it.

| The claim | Status | What is actually true |
|---|---|---|
| *"`private: true` excludes a page from `build` entirely"* | **WAS FALSE until 2026-08-31** | Starlight filters `draft` only. It is true now because `src/content.config.ts` makes it true — §5 |
| *"The build refuses these too"* (audit.mjs, under Control 4) | **WAS FALSE** | `audit.mjs` was in nothing. Control 4 now runs at `astro:build:done`, so the sentence is true — but it became true by a code change, not by being asserted |
| *"The `REPLACE-ME` check stops a wrong `SITE` shipping"* | **WAS FALSE** | The placeholder was already gone; the condition could never fire. §3b |
| *"KaTeX in `dist/` means maths is enabled"* | **FALSE** | `md-spec.md` is right that `$$…$$` throws. Two KaTeX builds totalling 516 KB ship because **mermaid** depends on them, along with `cytoscape` at 428 KB and chunks for `architectureDiagram`, `swimlanes` and `sequenceDiagram`. None is referenced from any HTML — they are lazy chunks. They cost `dist` size and Cloudflare asset count, **not page weight** |
| *"Pagefind output is not byte-deterministic, so a deploy always re-uploads index fragments"* | **FALSE HERE** | Inherited from the sibling and **checked rather than assumed**: two consecutive `npm run build` runs on unchanged content produced a byte-identical `dist/`, `diff -rq` reporting **zero differences** across all of it including the 111 `.pf_fragment` files. Verified 2026-08-31 on `@astrojs/starlight@0.41.10`. If a future deploy re-uploads everything, that is a finding, not the expected state |
| *"`astro preview` is close enough to production"* | **FALSE** | It applies neither `html_handling`, `not_found_handling`, `_headers` nor `_redirects`. `npx wrangler dev` is the only local server that does |

**Measured composition, 2026-08-31:** `dist` **16 MB** · `dist/_astro` **8.6 MB across 197 files** ·
`dist/pagefind` **1.4 MB, 111 fragments** · **113 pages**.

---

## 6c · The four controls, and the probe that made each one real

**A check nobody has watched fail is not a check.** Every row was probed in both directions on
2026-08-31 — the probe added, the refusal read, the probe removed, the tree verified clean.

| # | Control | Where | The probe that made it fail | The probe that made it pass |
|---|---|---|---|---|
| 1 | Every `getCollection('docs')` consumer applies `isPublished()` inside a `.filter()` | `astro:build:start` | Four of them: a consumer with `// TODO: isPublished` in a **comment**; one with `void isPublished;`; one file with **two** calls where only the first filters; and no filter at all | A correct consumer, alone: **no findings** |
| 2 | Sensitive domain carries an explicit `private:` | `astro:build:start` | A page in `money-and-wealth` with the field deleted | The same page with `private: false` |
| 3 | Path validates the frontmatter | `astro:build:start` | (inherited; the control has always had a failing case in the suite) | The 113-page build |
| 4 | No draft or private page has a route or an inbound link in `dist/` | **`astro:build:done`** | The loader guard in `content.config.ts` disabled while a `private: true` page existed — build **refused after rendering, exit 1** | The same page with the guard restored: **held back, 113 pages, nothing in `dist/`** |

Controls 1 and 4 are the two that had never been watched fail before that date, and **both were
broken**: control 1 passed on a substring, and control 4 was not wired into anything.

---

## 7 · After any navigation change, check the deployed site by hand

A drawer link · a breadcrumb at every depth · prev/next across a part boundary · a `↔` pointer
followed to its canonical entry · a Pagefind search · browser back/forward through three chapter
turns · all four reading themes.

**Navigation defects in the sibling repo were twice invisible to the build** — breadcrumbs 404ing
from every module page, and prev/next leaking between entities.

---

## 8 · Failure modes, in the order they happen

1. **Fails before installing anything** → Node version. §3a.
2. **Fails at `astro check`** → a real type error. It failed on purpose.
3. **Fails at `astro build` with a link error** → `errorOnRelativeLinks`. A pasted `../foo` is an
   error outright, never resolved.
4. **BUILD REFUSED, control violation** → `scripts/guards.mjs` said no. Read which one; each exists
   because the failure it prevents is silent.
5. **"Worker name does not match"** → §3b.
6. **Live, but every page 404s** → `assets.directory` must be `./dist`.
7. **Live, but unstyled or search does nothing** → check **Rocket Loader** on the zone. It defers and
   rewrites script tags and is a known cause of broken JS on static sites. Turn it off.
8. **A typo'd URL returns the home page at HTTP 200** → someone set
   `not_found_handling: "single-page-application"`.
9. **Google indexes the wrong hostname** → `SITE` was wrong at first deploy. **This is the expensive
   one**, which is why §3b comes before any of this.

---

## 9 · Custom domain — later

When a real domain is attached: set it in the dashboard, change **`SITE`** in `astro.config.mjs`, and
that is all. `isIndexable()` starts returning true, the `noindex` meta disappears, `robots.txt` grows
its `Sitemap:` line, and every canonical follows. **One line.**
