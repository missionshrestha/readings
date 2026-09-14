# Readings

A personal reading system. **One MDX file per chapter**, rendered as a reading site.

Sixteen domains, eighty-five clusters, two hundred and ninety-three books — and a pipeline for
working through one of them properly rather than quickly.

> **New here? Read [`START-HERE.md`](START-HERE.md).**

---

## What it is

A static Astro + Starlight site whose entire navigation derives from one Markdown file
(`context/universe.md`), plus a contract layer in `context/` that governs chapters authored in
Claude web chat and pasted in, plus five Claude Code skills that drive the loop.

No CMS, no database, no runtime. Everything is build-time derivation from files on disk.

## What makes it different from a notes site

- **A closed-book recall section comes before the explanation**, because retrieval beats rereading
  and the pipeline it is derived from did not have one.
- **Actions are structured data**, so the ledger is computed and cannot drift from the chapters.
- **One committed action per book**, because adding intentions divides attention rather than raising
  the conversion rate.
- **Nothing ever asks you to visualise success** — positive fantasy predicts worse attainment.
- **No book counter anywhere.** The ledger is the metric; the count is vanity.

Every one of those is a documented reversal of the original design, with the citation, in
[`context/reconciliation.md`](context/reconciliation.md).

And, since 2026-09-14, on the reader's own instructions after reading a sample book
([`context/reader.md`](context/reader.md) §10):

- **Every page is held to one clarity standard** — complete sentences, terms defined, an example
  beside every difficult idea, and no length limit on explanation.
- **Every book shows its release date and major editions**, and its page carries the author's context
  and what has changed since it was written — for and against.
- **Comments while reading** — select any passage on the dev site and write; the public site shows them
  read-only, marked on their passages.
- **The whole argument is recorded**, not one question and one answer; **reader opinion is reported as
  clusters with counts**; **diagrams fit the column and expand to full screen.**

## The reading room

Four themes — Day, Sepia, Dusk, Night — a system serif at a measured 62/68/75 characters per line,
paper grain from an inline SVG filter, a page turn between chapters, focus and quiet modes, and a
bookshelf where a spine's colour is its priority and its thickness is what it costs.

Every colour pair is measured rather than claimed: `node scripts/contrast.mjs`.

## Commands

```bash
npm run dev      # localhost. Drafts ARE visible — that is what a stub is for
npm run ci       # astro check && astro build — exactly what CI runs
npm run preview  # the built site

node scripts/universe.mjs    # parse and verify the universe
node scripts/audit.mjs       # the weekly report and the four build controls
node scripts/contrast.mjs    # 104 colour pairs across four themes
```

## Licence

MIT for the code. The reading notes are personal and are not licensed for reuse.
