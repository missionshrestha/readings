---
name: scaffold
description: Create a book's directory and one stub page per chapter from its agreed book.json, using scripts/new-book.mjs and scripts/new-chapters.mjs. Use after a Stage 2 brief has been agreed, or when he says "scaffold deep work", "start this book", "create the chapter pages".
---

# /scaffold \<book\>

Turns an agreed brief into the empty shape of a book, so the sidebar, prev/next and the chapter
grid all populate before a word of content exists.

**You do not create files by hand. Two scripts do it**, and they are the only supported path — they
validate against `context/universe.md`, refuse to overwrite, and keep the chapter grid derived
rather than hand-written.

## Preconditions — refuse, with the reason, if any fails

1. The book exists in `context/universe.md`. The script checks and prints the valid slugs; do not
   pre-empt it with a guess.
2. The brief is **agreed**, not draft. Say which it is and stop.
3. `book.json` is present and matches `context/book-spec.md` §2 — **including `published` and
   `editions`**, required on all three kinds since 2026-09-14. **Every refusal message the script can
   produce is reproduced in `book-spec.md` §3b**, split into BINDING (refuses, writes nothing) and
   ADVISORY (prints, proceeds) — check the brief against that table before running anything.

## Steps

1. `node scripts/new-book.mjs <domain> <cluster> <book>`
   Writes **two** files, checked separately: `index.mdx` and the **private book profile** at
   `context/books/<domain>/<cluster>/<book>.md`. The profile mirrors the content tree rather than
   being flat, because two clusters can want the same short name. Only "both already exist" is fatal.
   `--kind` defaults from the universe's own flags: a ♾️ book becomes `lifelong`, a 🔵 book becomes
   `reference`, everything else `read`. **The book page it writes carries the empty `## Author
   context` and `## Context then vs. context today` headings** for `P2b` to fill.
2. Save the Stage 2 `book.json` beside `index.mdx`.
3. `node scripts/new-chapters.mjs <domain> <cluster> <book>`
   Validates the **whole brief** before writing **any** file — the release date and editions first,
   on every kind — then stamps one stub per chapter and regenerates the chapter grid, grouped by the
   book's own parts.
4. `npm run ci`.
5. **Update the records.** `reader-profile.md` (the *Currently reading* block, one row per chapter)
   and the book profile (chapter state, the gap, a dated decisions line).
   **Write only what the brief and the universe already say.** The gap diagnosis, an effort figure
   and an obstacle are facts only he can supply — leave them empty and say which, or hand off to
   `/progress`, which asks.
6. Report: how many stubs, the totals the script prints, **every warning it emitted** (an edition
   with no source is one), any brief field you could not map — and **that `P2b` is next**, before the
   first chapter.

## What the stub carries

| Brief level | Lands in the stub as |
|---|---|
| part | frontmatter `part:`, and a `###` group on the chapter grid |
| chapter | the file, its frontmatter, its `sidebar.order` |
| `argues`, `weightInArgument`, `verdict`, `estMinutes` | the `OUTLINE` comment — the author's contract |
| `clarified: false` | **the clarified-chapter section is REMOVED**, not left empty |
| `published`, `editions` | **nothing in the stub.** The page chrome reads them from `book.json` at build time and shows them on the book page and beside the book's name on every chapter |

Two generated regions, both marked, both regenerable, both comment-only except the **ten** `###`
headings of the explanation layer, which `context/chapter-spine.md` §3 fixes:

- `{/* OUTLINE:START … */}` above the first heading — the whole node.
- `{/* SPINE:START … */}` inside `## The explanation layer` — its ten sub-sections, the first of
  which is `### Where the author was standing`.

The template body — not a generated region — carries the **five** `###` of `## Dialogue` and a
captioned `## Concept map` fence.

## After a paste

`node scripts/new-chapters.mjs <d> <c> <b> --refresh`

Removing `draft: true` does not update the chapter grid on its own. `--refresh` re-reads every
chapter's frontmatter and turns that chapter's plain card into a real link. **Run it after every
paste** — without it the grid silently drifts.

## When the brief is amended

`node scripts/new-chapters.mjs <d> <c> <b> --outline`

The only way an amendment reaches a stub that already exists. It replaces the bytes **between the
markers and no others**. If a paste destroyed a file's markers it **skips that file and names it** —
report those. An amendment that did not reach the page is an amendment that did not happen.

**A changed release date or a new edition needs no flag** — edit `book.json` and rebuild.

## When the SPINE itself changes

`node scripts/new-chapters.mjs <d> <c> <b> --spine`

Added 2026-08-31, when the explanation layer went from nine sub-sections to ten. Before it the only
ways to propagate a spine change were to hand-edit inside a generated region — which the file says
twice not to do — or to delete the stub and rebuild it, losing its frontmatter.

**It refuses any chapter that has been written in, and names it.** Safe means every sub-section body
inside the region is still the literal `TODO` the scaffolder wrote; one authored word and the file is
left alone. Regenerating a written region would silently delete a chapter's entire explanation layer,
so the refusal is the feature.

```
--spine: rewrote the explanation-layer region in 6 stub(s)
```

Report the count and every skipped file. A chapter that has been written in keeps what it has — bring
a spine change to those by hand, or regenerate the chapter from the brief.

**A change OUTSIDE the SPINE region — the five dialogue `###` of 2026-09-14 are one — reaches only
new stubs.** An unwritten stub can be deleted and re-scaffolded (it holds nothing but the brief); a
written chapter gets the change from the next paste.

## Rules

- **Never write body content.** Every prose slot stays `TODO`. Stamping a heading the brief already
  agreed is transcription, it is marked generated, and it is regenerable — that is not authoring.
- **Never invent a frontmatter value, a chapter or a date.** If the brief does not state `argues`,
  `clarified`, a part or a release date, it does not appear.
- **A refusal from the script is a BRIEF defect, not a scripting problem.** It prints every problem
  at once. Take the whole list back to Stage 2; do not hand-patch the JSON past a check, because
  every check maps to a line in `context/book-spec.md` that says rewrite.
- **Stubs are `draft: true` and that is deliberate.** Visible in `dev`, excluded from `build`, so an
  unwritten chapter cannot reach the public site. Never strip `draft` to "make it show up".
- **The grid never links a draft.** A draft does not exist in `build`, and linking one fails
  validation — which is exactly how this was found.
- Both scripts **refuse rather than overwrite**, and `new-chapters` refuses the *whole run* if any
  target exists, so it can never half-apply. `--outline` is the single exception.
