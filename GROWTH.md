# GROWTH — the public side of the reading, and the decisions that are still his

**Status on 2026-09-14: the recommendations below were accepted — *"Do what's recommended."* — and
nothing is built yet, because the first of them is his to do.** The order is:

1. **A real domain** (§4 A) — his action. Until it exists the site is deliberately `noindex`.
2. **Book and author in every chapter's title** (§4 B), **structured data** (§4 E).
3. **One share image per book** (§4 C); per chapter later.
4. **An RSS feed** (§4 F).

**And no share buttons, no newsletter yet, no ads on reading pages** (§4 D, F, G). When the domain is
attached, say so, and Claude Code builds 2–4 in that order. This file records his goals in his words,
what the site already does for search and sharing (read off the code, not assumed), and the reasoning
and cost behind each recommendation.

---

## 1 · What he said

> *"Broader framing: treat this reading project as an SEO / AEO / GEO and personal-branding exercise.
> Primary goal: self-learning and growth. Secondary goal: Google ranking, ads, monetization, visitors,
> and personal branding."*
>
> *"Plan: read each chapter and share the progress publicly, telling others "I've started reading this
> way — if you like, you can also save time by reading this, gaining the most.""*
>
> *"Open Questions to Decide — Social share, OG image, and title — how should these be handled for
> each book, chapter, and URL? Should a newsletter be introduced as well?"*
>
> — his instructions, 2026-09-14. `context/reader.md` §10f and §10g.

**SEO** is ranking in search results. **AEO** (answer-engine optimisation) and **GEO**
(generative-engine optimisation) are being quoted or cited by AI assistants and AI search. They reward
the same things: pages that answer a specific question clearly, say who wrote them and when, and can
be read by a machine without running JavaScript.

---

## 2 · The order is his, and it settles every conflict

**Primary: learning. Secondary: everything in this file.** In practice that means four rules, and
each one exists because a growth idea would otherwise quietly win:

| Rule | Because |
|---|---|
| **A page is written for him, never for an audience** | `context/standards.md` §1. A chapter shaped to rank — keywords in headings, a hook in the first line, a summary at the top — is a chapter that pre-digests itself, which is the thing `## Recall` exists to prevent |
| **The twelve headings, the prohibition zones and the ledger do not move for search** | Headings are anchors, and comments and reviews are keyed to them |
| **Growth work is machine time** | `WORKFLOW.md`: if machine time approaches reading time, stop and say so. His own drafts call building the site *"the most sophisticated procrastination available to me"* |
| **No counters, streaks, or "picture your results" copy — not even in a share card** | Reconciliation row 9, and the strongest negative finding in the evidence base (`context/standards.md` §3). A share image saying "Chapter 4 of 13 — 31% there!" is a completion percentage |

---

## 3 · What the site already does — read off the code on 2026-09-14

| Already there | Where | Note |
|---|---|---|
| Canonical URL, `og:url`, sitemap | Starlight, from `SITE` in `astro.config.mjs` | Every URL is derived from one constant |
| `<title>` as *page title* `\|` *Readings* | `@astrojs/starlight/utils/head.ts:36` | A chapter's is **"Ch 2 · Deep work is rare \| Readings"** — the book's name is not in it |
| `og:title`, `og:description`, `og:type: article`, `og:site_name` | `head.ts:57-66` | `og:title` is the bare page title, so a shared chapter link does not say which book it is from |
| `twitter:card: summary_large_image` | `head.ts:67-70` | **But there is no `og:image` anywhere**, so a shared link shows a card with no picture |
| `description` | Chapter frontmatter, from the brief's `argues` | A one-line claim — a good search snippet already |
| **`noindex` on every page** | `src/lib/indexing.ts` | Deliberate while the site lives on `workers.dev`, and it flips itself the day `SITE` becomes a real domain. **Nothing ranks until then** — `DEPLOY.md` §4 |
| `/llms-full.txt` and a `.md` twin of every page | `src/pages/` | Plain text AI crawlers can read. Already the core of AEO/GEO |
| The book's release date and editions on every page of it | `src/overrides/PageTitle.astro`, from `book.json` | Added 2026-09-14. A dated page is one an answer engine can cite with confidence |
| His comments, published read-only, server-rendered | `src/overrides/MarkdownContent.astro` | Crawlable text. Each can be marked local instead |

---

## 4 · The open decisions — each with a recommendation and its cost

### A · A real domain — the prerequisite for everything else

**Recommendation: attach one before building anything below.** Until `SITE` is a real domain the
whole site is `noindex` on purpose, and a share card built now would advertise a URL that is later
abandoned — `workers.dev` addresses cannot be redirected without making every page view a billable
Worker call (`DEPLOY.md` §4). **A subdomain of his personal site** (`readings.<his domain>`) is the
cheapest fit: this project serves from the root of its host and has no `base` path, deliberately.

**Cost:** the domain, a DNS record, and one line — `SITE` in `astro.config.mjs` (`DEPLOY.md` §9).

### B · Titles — for each book, chapter and URL

**Recommendation: put the book and the author in the `<title>` and `og:title` of every chapter, and
leave the visible heading and the URL alone.**

| Page | Today | Recommended |
|---|---|---|
| Chapter | `Ch 2 · Deep work is rare \| Readings` | `Deep work is rare — Deep Work by Cal Newport, chapter 2 \| Readings` |
| Book | `Deep Work \| Readings` | `Deep Work by Cal Newport — read chapter by chapter \| Readings` |
| URL | `/self-command/attention-dopamine-and-digital-discipline/deep-work/deep-work-is-rare/` | **Unchanged.** Descriptive already, and **permanent**: comments, review cards and inbound links are keyed to it (`context/book-spec.md` §4) |

**Cost:** about thirty lines in `src/starlightRouteData.ts`, which already rewrites route data per
page. No dependency, no change to any chapter.

### C · Share images (OG images)

**Recommendation: generated at build time, text only, one per book and one per chapter** — the
chapter title, the book, the author and the first-published year, set in the site's own type on the
reading ground. **No book covers**: a cover is the publisher's artwork. **No photograph, no count, no
progress bar** (§2).

| Option | Cost |
|---|---|
| **Per book only, first** | Few images, trivial build time. A shared chapter link shows its book's card |
| **Per chapter** | One image per published page. **Check Cloudflare's static-asset file limit against the corpus first** — at 293 books the number of chapters is in the thousands, and `DEPLOY.md` §6b already notes that asset count is a real constraint |
| How | A small SVG template rendered to PNG during the build. `sharp` is already a dependency; whether it can render the reading serif inside the Cloudflare build image is **not verified**, and an embedded font file with a text-to-SVG library is the safe route. Either adds build time |

**Suggested order:** per book when the domain is attached; per chapter once enough chapters are public
that people share individual ones.

### D · Share buttons

**Recommendation: none.** Third-party share widgets load scripts, track visitors, and add chrome to a
page designed for reading. With B and C done, **any link he pastes anywhere previews properly**, which
is what sharing actually needs. If a button is wanted later, one **"Copy link"** control — the phone's
own share sheet where it exists — and nothing that counts shares.

**Cost of the recommendation:** nothing.

### E · Structured data for answer engines

**Recommendation: yes, once there is a domain.** A small JSON-LD block per page stating what it is:
the book (title, author, first published), and the page as a review or article about that book, with
his name as its author and the `read:` date. It is invisible to readers and is how search engines and
AI assistants know *who* wrote *what* about *which book*, and *when*.

**Cost:** about forty lines in the page head, from data every page already has. No dependency.

### F · A newsletter

**Recommendation: not now — start with a feed.** Four reasons:

1. **There is no audience yet.** The site is `noindex` and has no domain (§3).
2. **A newsletter is a schedule**, and a schedule is exactly the obligation his reading instruction
   removed: *"Nothing happens if i don't finish a chapter."* A missed issue would become a reason to
   rush a chapter.
3. **Collecting email addresses creates obligations** — a third-party service, consent, the right to
   be deleted — that a static site with no database otherwise has none of.
4. **An RSS/Atom feed does the useful half for free.** Anyone can subscribe to "new chapter
   published", no personal data is collected, and most newsletter tools can send a feed as email later
   if he chooses one.

**Revisit when** a domain is attached, at least ten chapters are public, and he has shared progress
for a month — then the question is answerable with evidence instead of a guess.

**Cost of the feed:** one endpoint, about forty lines, listing published chapters only (it must route
through `isPublished()` — control 1 in `scripts/guards.mjs` refuses the build otherwise).

### G · Ads and monetisation

**Recommendation: no advertising on reading pages.** An ad network brings third-party scripts,
tracking, a consent banner and layout shift onto pages built for focus, and it would have to be
measured against four themes like everything else. **If monetisation matters later, the least
intrusive form is a disclosed link to buy the book, on the book page only** — and it is a decision to
take once there are readers, not before.

---

## 5 · Before the site is shared — a checklist, when the day comes

- [ ] A real domain attached, and `SITE` changed to it (`DEPLOY.md` §9). The `noindex` tag disappears
      by itself.
- [ ] **Every page in `relationships-…`, `love-…` and `money-and-wealth` re-read for its `private:`
      decision**, because published now also means shared (`DEPLOY.md` §5).
- [ ] **His comments on those pages reviewed**, and any meant only for himself marked local
      (`context/md-spec.md` §5d).
- [ ] B, C, D and F decided — including a decision not to build one.
- [ ] `WORKFLOW.md`'s ratio checked: is machine time still well below reading time?
