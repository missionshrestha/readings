---
name: validate
description: Run the checks on a pasted chapter and fix what breaks. Use immediately after any chapter, book page or log entry is pasted in, when he says "validate", "check this", "I pasted it", or when a build failure needs diagnosing. This is the whole verification layer.
---

# /validate [scope]

The build is the validator. Run it, read it, fix it.

## Step 0 — the one that has to come first

**Is `draft: true` still in the frontmatter of the page you just pasted?**

If it is, **remove it before you validate anything**, or the entire run is worthless. A draft page
has no route, so Astro never compiles its body to JSX, and **nothing checks its MDX at all** — not
`astro check`, not `astro build`, not the link validator. Probed 2026-08-31: a deliberate
`if (a < b)` outside backticks in a draft page produced **0 errors, and the page count did not
change.**

The failure this causes is the worst shape available: `/validate` reports green, the paste is
recorded as validated, and the errors surface days later when the flag is flipped — where they read
as a regression in something else.

**A stub is `draft: true` and that is correct** — it has no prose to break. **A paste is not.**

## Steps

1. `npm run check` — types, and the `.astro` attribute rules.
2. `npm run build` — component resolution, the frontmatter schema, **internal link validation**,
   Mermaid transformation, **and all four controls** in `scripts/guards.mjs`.
   Controls 1–3 read source and refuse at `astro:build:start`, before anything is rendered.
   **Control 4 reads `dist/` and refuses at `astro:build:done`** — the privacy sweep, which moved
   into the build on 2026-08-31 because `audit.mjs` was printing *"The build refuses these too"*
   about a check the build was not running.
3. Fix what breaks. Re-run until both are clean.
4. **Check the paste against the spine and the brief.** See *Coverage*. The build cannot see this.
5. Report every defect with its **file and line**, and what it would have caused.
6. **Update the records** — the paste changed what exists.

## The failure modes, in the order they actually happen

The first four are loud. The last three are the dangerous ones.

1. **HTML comments.** `<!-- -->` is a parse error; MDX comments are `{/* … */}` — **and a literal
   `*/` inside one closes it early.** Symptom: `Unexpected end of file in expression`.
2. **Bare `<` and `{` in prose are syntax.** `if (a < b)` outside backticks breaks the build;
   `{value}` is read as JavaScript. Symptom for the second: `ReferenceError: <name> is not defined`.
3. **Relative internal links are a BUILD ERROR.** `errorOnRelativeLinks` is on, so `../foo` is
   rejected outright rather than resolved. Every internal link is root-absolute —
   `/<domain>/<cluster>/<book>/<chapter>/`. The paths are in `src/generated/book-slugs.md`.
4. **A link to a `draft: true` page fails validation**, because a draft does not exist in `build`.

4a. **A link to `/shelf/`, `/ledger/` or `/review/` fails as *"invalid link to custom page"*** —
   and **the path is correct.** Those three are `.astro` routes, so the validator cannot see them in
   the content collection and refuses to vouch for them. They are already in the plugin's `exclude`
   list in `astro.config.mjs`. **If a fourth computed view is ever added and not listed there, every
   chapter linking to it fails a build with an error that reads like a typo.** Never widen the
   exclusion to a wildcard: a real `/shelves/` must still fail.
5. **Maths is NOT enabled.** `$$…$$` hard-fails: the braces parse as MDX. State it in prose.
6. **camelCase SVG attributes in `.mdx`** — `strokeWidth`, not `stroke-width`. **The rule INVERTS in
   `.astro`.** Asymmetric: `.astro` fails loudly, `.mdx` is **silently dropped** and leaves hairline
   strokes on a green build.
7. **Blank lines around a component's inner content**, or the Markdown inside is not parsed as
   Markdown. Silent: it renders, just wrongly.
8. **An image the chapter references is not beside it** — `UNRESOLVED_IMPORT`, loud. The paste comes
   from a session that **cannot create binary files**, so this is expected when one has not been
   supplied yet. **Do not "fix" it by pointing at `public/`**: that builds and silently costs the
   optimisation, the hashed filename, the dimensions and the year-long cache. Ask for the image.

## Coverage — the checks the build cannot run

The brief decided this chapter before it was written. **Nothing in the build knows that**, so a
chapter missing half its sections is indistinguishable from a complete one at exit 0.

1. **The twelve `##` headings**, exact strings, in the order in `context/chapter-spine.md` §1. An
   extra `##`, a missing one or a reordering is a finding. **Any `####` at all** means the chapter
   should have been split — that is a brief problem, not a heading problem.
2. **`## The clarified chapter` is present if and only if `clarified: true`.** Both directions are
   defects: present when false wastes the sitting on a summary; absent when true drops READ I.
2a. **`## Pre-context` is present EVEN WHEN `clarified: false`**, and so are `## Core message` and
   `## Key points`. On an unclarified chapter those last two come from `P4`, after the recall, not
   from `P3`. Until 2026-08-31 all three had no producer at all on the majority case — if a paste
   is missing them, the session is working from the old shape and the fix is upstream.
2b. **The explanation layer has TEN `###` sub-sections**, and the first is
   `### Where the author was standing`. Nine means the session is on a stale context pack.
3. **`## Recall` is not empty**, and the `## Dialogue` section shows the question before the
   position. If the page states a conclusion first, the answer that follows it is suspect.
4. **`## Open questions` contains nothing but the placeholder.** The AI never writes there.
5. **Actions.** At most one carries `committed: true` with `tier: now` across the whole book; every
   committed action names an `obstacle`, and one under six words is probably vague.
6. **Nothing anywhere asks him to visualise an outcome.**
7. **`## Sources` against `context/source-rules.md`.** Not *does a citation exist* — the spine
   already asks that — but **is anything tier C written as though it were tier A.** *"Knowledge
   workers spend 28% of the week on email"* and *"Newport cites a 2012 McKinsey figure that…"* are
   the same sentence with the provenance removed, and only the second one is honest. Also: any claim
   on the replication list (priming, ego depletion, power posing, learning styles, 10,000 hours)
   with no qualifier beside it.

**These are candidates, not verdicts.** Report them and let him decide. A genuine omission goes back
to web chat, not into your edit.

## Records — a clean build is not the end of the paste

1. **`node scripts/new-chapters.mjs <d> <c> <b> --refresh`**, if the paste removed `draft: true`.
   Without it the chapter grid silently drifts.
2. **The book profile** — set that chapter's row to `drafted`, and lift anything in its
   `## Open questions` into the profile's table with today's date.
3. **`reader-profile.md`** — the chapter row's date, and the *Currently reading* block.

**`drafted` is all a paste earns.** It means written, not read. Leave `Effort` blank: it is measured
minutes, and copying the estimate into it destroys the one comparison the column exists to make.

## Rules

- **Never "fix" a paste by deleting content.** If a section will not compile, fix the syntax; if it
  cannot be fixed, report it and stop.
- **Never invent a frontmatter value** to satisfy the schema. Every custom field is
  `.optional().catch(undefined)` precisely so a missing one degrades instead of breaking.
- **`status` is unvalidated, and there are EIGHT known values**: `stub`, `reading`, `generated`,
  `recalled`, `explained`, `complete`, `skipped`, `dropped`. `complete`, `Complete` and `done` all
  differ. `audit.mjs` reports an unknown one as *"not a known value. It counts as not-complete
  everywhere, silently"*; the schema will not.
- **`private: true` now really does exclude a page from `build`** — no route, no sitemap entry, no
  Pagefind record. It did not until 2026-08-31, and `CLAUDE.md` claimed it did the whole time.
  **It also inherits the draft hole**: a private page has no route, so its MDX is compiled by
  nothing either. Step 0 applies to both flags.
- **"Didn't run" is never "passed."**
