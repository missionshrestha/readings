# SETUP — Phase 1, and it is finished

**This file is history. It is not reopened.** What to do next is [`GUIDE.md`](GUIDE.md).

Recorded here so a later session can tell what was decided from what was assumed.

---

## What was built

| | |
|---|---|
| Stack | `astro@7.2.9` · `@astrojs/starlight@0.41.10` · `astro-mermaid@2.1.0` · `mermaid@11.17.2` |
| Node | `24.18.0` in `.nvmrc` — one of Cloudflare's two preinstalls |
| Package manager | **npm**, not pnpm or yarn |
| Deploy | Cloudflare Workers static assets, assets-only, **no `main`** |
| Routes | **Nested** — `/<domain>/<cluster>/<book>/<chapter>/` |

---

## The decisions, and which were measured

| Decision | Basis |
|---|---|
| Nested routes rather than flat | **Reversed during planning.** The first justification — cross-listed books — does not survive the data: all 293 have exactly one canonical home. Nesting buys two controls flat cannot have |
| `<ClientRouter />` for the page turn | **Measured.** 10/10 gate checks pass with the `astro:after-swap` fix; without it the reading theme and focus mode are wiped on every turn |
| Four themes | Measured — **104/104** contrast pairs, `scripts/contrast.mjs`. It was 56 until 2026-08-31, when twelve aside pairs per theme were added after one shipped at 1.06:1 |
| Charter, 62/68/75 cpl | **Measured** — advance is 0.4609em, `scripts/measure-type.mjs`. A first measurement was wrong by 4% and the cross-size check caught it |
| Card-edge contrast is advisory | **Judgment, stated as one.** WCAG 1.4.11 governs boundaries required to IDENTIFY a component; a card here is identified by title, fill and shadow. The card's FILL is enforced instead |
| Slugs frozen into `universe.md` | A derivation rule that changes breaks every URL beneath it, silently |

---

## What was verified, not assumed

- **The universe parses to its own declared totals** — 7/16/85/293, tiers 73/124/96, weights
  78/150/65, flags 8/7/13/21, and all 16 `↔` pointers resolve to real books. The parser **dies** on
  a one-character edit.
- **`astro-mermaid` registers `astro:after-swap` unconditionally** (`:607`), so diagrams survive a
  client-side navigation.
- **Starlight's Search and ThemeSelect are custom elements**, so they re-mount on every swap.
- **`swapRootAttributes` strips every `<html>` attribute** (`swap-functions.js:46`), and
  `deselectScripts` will not re-run an identical inline script.
- **Draft chapters appear zero times in `dist/`** across the HTML, `llms-full.txt` and the `.md`
  route.
- **All FOUR build controls refuse a real violation**, each proven with a deliberate probe. It was
  three at the end of Phase 1; the privacy sweep became Control 4 on 2026-08-31 when it turned out
  `audit.mjs` was in no command anything ran.

---

## One defect found in the source data, and fixed

`context/universe.md:383` — *Essays in Love* used `. *` where all 292 other book lines use ` — *`,
and its author slot held a note rather than an author. The parser refused it.

Normalised to `— Alain de Botton — *de Botton's earlier, funnier version. One relationship…*`, which
preserves every word. The originals in `learn-anything-in-tech-system/book-context/` are untouched.

---

## Out of scope for v1, and why

| Not built | Reason |
|---|---|
| Within-chapter pagination | Breaks search, anchors, diagrams and code. The page turn between chapters gives the same feeling at the moment that means something |
| Reading analytics | The session timer is local and that is the ceiling |
| EPUB or PDF ingestion | The book is uploaded to chat, not to this repo |
| Notion / Obsidian sync | The tier hex codes exist for it; nothing consumes them yet |
| **"Chat with my library"** | **Refused on principle, not cost.** Letting AI do the retrieval is what produces the crutch effect, and the entire reconciliation exists to prevent it |

---

## The consolidated gate — re-run this, not the per-task checks

**A check that passed three days ago and was broken since is exactly what a per-task gate cannot
catch.** Every acceptance criterion from Phase 1, re-listed once, with the command that settles it
and the answer it must give. Run the block; compare every line.

```bash
npm run ci
node scripts/universe.mjs
node scripts/audit.mjs
node scripts/contrast.mjs
node scripts/prompt-words.mjs
git status --porcelain
```

| # | Criterion | Settled by | Must say |
|---|---|---|---|
| 1 | The build is what Cloudflare runs, and it is green | `npm run ci` | `0 errors`, `113 page(s) built`, `All internal links are valid.` |
| 2 | The universe parses to its own declared totals | `node scripts/universe.mjs` | `7 / 16 / 85 / 293`, tiers `73/124/96`, weights `78/150/65` |
| 3 | Every control refuses a real violation | `node scripts/audit.mjs` | four ` ok ` lines, `all controls pass.` — never `SKIPPED` |
| 4 | Every colour pair clears its floor in four themes | `node scripts/contrast.mjs` | `104/104 pairs pass across 4 themes` |
| 5 | Every web-chat prompt clears the 500-word floor | `node scripts/prompt-words.mjs` | `11/11 at or over 500 words` — eleven since `P2b` was added on 2026-09-14 |
| 6 | No synthetic corpus is in the tree | `git status --porcelain` | nothing under `src/content/docs/**` that you did not write, and no `.synth-corpus.json` |
| 7 | Drafts appear zero times in `dist/` | Control 4, inside `npm run build` | no `BUILD REFUSED … AFTER RENDERING` |
| 8 | `private: true` actually excludes a page | `npm run build` on a private page | `[WARN] [readings-docs-loader] private: N page(s) held back`, page count unchanged |
| 9 | The reading theme survives a chapter turn | by hand, `npm run preview` | theme, focus, quiet, size and measure all survive; ambient audio keeps playing |
| 10 | The site reads with JavaScript off | by hand, `npm run preview` | every page 200, text present, links navigate |

**If line 6 is not clean, stop.** Synthetic files are load-test scaffolding, they are loudly marked,
and they are not content.

---

## The stop condition

**Setup is finished.** Any further improvement is proposed in one sentence and not implemented
unless asked — and the design system in particular is **frozen** (`CLAUDE.md`), because the drafts
name building the site as *"the most sophisticated procrastination available to me"* and that risk
starts now, not later.
