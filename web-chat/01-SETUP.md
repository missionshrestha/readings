# Setup — one Project per book

> **Not using a Claude Project?** Skip to [`00-CONTEXT-PACK.md`](00-CONTEXT-PACK.md). Every prompt
> works there; you paste the contract once per chat instead of once per book.

Ten minutes, once per book.

## 1 · Create the Project

Name it **`<Book> — reading`**. One book, one Project, always. Two books in one Project means every
chapter is calibrated against the wrong context, and because the wrongness is *plausible* rather
than obvious you will not notice.

## 2 · Paste the custom instructions

[`02-PROJECT-INSTRUCTIONS.md`](02-PROJECT-INSTRUCTIONS.md), replace `<BOOK>`, paste the whole block.

**Never cut THE ONE RULE or the output contract.** If the box rejects it for length, cut in this
order: the push-back list → the grounding notes → the behaviour list.

## 3 · Load the knowledge — seven files

| # | File | From | Refresh when |
|---|---|---|---|
| 1 | `md-spec` | `context/` | A component changes. Highest-consequence sync |
| 2 | `chapter-spine` | `context/` | Rarely — it is the grammar |
| 3 | **`standards`** | `context/` | When the clarity, register or depth rules change. **Every page he reads is held to it** |
| 4 | **`book-spec`** | `context/` | When `book.json` or the book page changes. **`P2` and `P2b` write against it** |
| 5 | **`reconciliation`** | `context/` | Rarely. **It is operative wherever the protocol disagrees** |
| 6 | `source-rules` | `context/` | Rarely. **What `## Sources` owes** — the four tiers, and why repeating the book's account of its own evidence verifies nothing |
| 7 | `book-slugs` | `src/generated/` | After `gen-pages.mjs` runs |

And after Stage 2: **`book.json`**, the agreed brief.

**`reader` is NOT uploaded — removed 2026-09-14, on his decision.** This file used to load it, while
`GUIDE.md` Appendix A, `P0` and `03-OPERATING-RULES.md` §4 all said it is never given to the model.
The reason they gave wins: supplying a model with a memory profile of the user raised agreement
sycophancy **up to +45%** across five frontier models, and agreement is the failure this whole design
exists to prevent. **Nothing the model needs is lost** — the clarity standard is in `standards`, the
transfer rule and the no-length-budget rule are in `standards` and `chapter-spine`, and the place and
language constraints are in `P0`. What `reader.md` adds on top of those is a character sketch, and a
character sketch only changes how flattering an answer is. If a Project still holds it, delete it
there.

**Why `standards` and `book-spec` are in the Project, since 2026-09-14.**

- **`standards`** holds the clarity standard he set after reading the sample book (§2b): complete
  sentences, every term defined where it first appears, an example beside every difficult idea, and
  simpler words that never change the claim. Every prompt from `P3` to `P9` marks it required in
  `GUIDE.md` Appendix A, and so does `P2b`. **A Project without it produces the compressed prose he
  read and rejected** — correct, dense, and hard to follow — and nothing in the build can detect it.
- **`book-spec`** holds the shape of `book.json`, including the `published` and `editions` fields the
  scaffolder now refuses a brief without, and the book page's fixed headings (§6):
  `## Author context` with four `###` and `## Context then vs. context today` with six. **Neither is in
  `chapter-spine`**, so a session without `book-spec` invents the book page's headings, and headings
  are anchors.

## 4 · Read the operating rules

[`03-OPERATING-RULES.md`](03-OPERATING-RULES.md). **Not into the Project — into your head.** It
governs what *you* do, and it is the part that decides whether any of this works.

## 5 · Sanity-check the Project before you trust it

Six questions, one turn. Any wrong answer means a knowledge file did not land, and you will not find
out otherwise until a paste breaks — or, for questions 4 to 6, until a page builds green in the wrong
shape.

> 1. **What are the three things you must never write for me?**
> 2. **What is the internal link format**, and what happens if you get it wrong?
> 3. **When do you NOT produce a clarified chapter?**
> 4. **How many `###` does `## Dialogue` have, and how does a turn in the middle of it begin?**
> 5. **How many actions does a chapter carry, and how many are committed per book?**
> 6. **When you simplify a sentence for me, what may change and what may not?**

Correct: the recall, the obstacle, and the IF–THEN commitment · **root-absolute**, and a relative
link is a hard build error · when the material is familiar, or `clarified: false` — because a
summary deletes the machinery that made the idea actionable · **five**, and a turn begins with exactly
`**Me:**`, `**AI:**` or `**AI (as sceptic):**` · **two to ten** per chapter, **one** committed per
book · the **words** may change; the claim's **strength, scope and conditions** may not.

**If it fluffs question 1, stop and re-paste.** That is the one that costs you the whole point. **If it
fluffs 4 or 5**, `chapter-spine` in the Project is older than 2026-09-14. **If it fluffs 6**,
`standards` is missing or old. Re-upload either the same day.

## 6 · Which chat, for what

| Work | Chat |
|---|---|
| Stages 0–2 (select, acquire, brief) | **One session.** Never split |
| Stage 2b (the book page) | **After `/scaffold`, before chapter one.** Search on. It needs the whole `book.json`, not the Stage 0–2 transcript |
| Each chapter | **A new chat per chapter.** The Project is the memory; a long transcript just costs tokens re-reading itself |
| The ledger, the 30-day review | A new chat each |

**A new chat costs nothing. A long one costs a lot** — and a long one is also where sycophancy
compounds, because the model has more of your stated positions to agree with. **One exception inside a
chapter:** `P5`'s message four records the dialogue from the transcript, so it runs in the same chat
as the argument it records.

## The sync contract

**One direction, always: the repository is the source. A Project knowledge file is a COPY.**

| Changed in the repo | Do this |
|---|---|
| `md-spec` or `chapter-spine` | Re-upload **and** re-copy the block in `00-CONTEXT-PACK.md` |
| `standards` | Re-upload **and** re-copy the `HOW TO WRITE` block in `00-CONTEXT-PACK.md`. Every chapter and book page is written to it |
| `book-spec` | Re-upload **and** re-copy the book-page lines in `00-CONTEXT-PACK.md`. `P2` and `P2b` write against it |
| `source-rules` | Re-upload. `P4` and `P2b` write `## Sources` against it |
| `reconciliation` | Re-upload. It changes what the prompts owe |
| `book.json` | Re-upload, **and run `new-chapters.mjs … --outline`**, or the stubs still carry the old brief. A change to `published` or `editions` alone needs no flag |
| `reader.md` | **Nothing.** It is never uploaded |

**Never edit a Project knowledge file in place and expect the repo to know.**
