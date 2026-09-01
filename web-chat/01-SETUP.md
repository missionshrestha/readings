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

## 3 · Load the knowledge — six files

| # | File | From | Refresh when |
|---|---|---|---|
| 1 | `md-spec` | `context/` | A component changes. Highest-consequence sync |
| 2 | `chapter-spine` | `context/` | Rarely — it is the grammar |
| 3 | **`reconciliation`** | `context/` | Rarely. **It is operative wherever the protocol disagrees** |
| 4 | `source-rules` | `context/` | Rarely. **What `## Sources` owes** — the four tiers, and why repeating the book's account of its own evidence verifies nothing |
| 5 | `reader` | `context/` | When his budget or context changes |
| 6 | `book-slugs` | `src/generated/` | After `gen-pages.mjs` runs |

And after Stage 2: **`book.json`**, the agreed brief.

## 4 · Read the operating rules

[`03-OPERATING-RULES.md`](03-OPERATING-RULES.md). **Not into the Project — into your head.** It
governs what *you* do, and it is the part that decides whether any of this works.

## 5 · Sanity-check the Project before you trust it

Three questions, one turn. Any wrong answer means a knowledge file did not land, and you will not
find out otherwise until a paste breaks.

> 1. **What are the three things you must never write for me?**
> 2. **What is the internal link format**, and what happens if you get it wrong?
> 3. **When do you NOT produce a clarified chapter?**

Correct: the recall, the obstacle, and the IF–THEN commitment · **root-absolute**, and a relative
link is a hard build error · when the material is familiar, or `clarified: false` — because a
summary deletes the machinery that made the idea actionable.

**If it fluffs question 1, stop and re-paste.** That is the one that costs you the whole point.

## 6 · Which chat, for what

| Work | Chat |
|---|---|
| Stages 0–2 (select, acquire, brief) | **One session.** Never split |
| Each chapter | **A new chat per chapter.** The Project is the memory; a long transcript just costs tokens re-reading itself |
| The ledger, the 30-day review | A new chat each |

**A new chat costs nothing. A long one costs a lot** — and a long one is also where sycophancy
compounds, because the model has more of your stated positions to agree with.

## The sync contract

**One direction, always: the repository is the source. A Project knowledge file is a COPY.**

| Changed in the repo | Do this |
|---|---|
| `md-spec` or `chapter-spine` | Re-upload **and** re-copy the block in `00-CONTEXT-PACK.md` |
| `source-rules` | Re-upload. `P4` writes `## Sources` against it |
| `reconciliation` | Re-upload. It changes what the prompts owe |
| `book.json` | Re-upload, **and run `new-chapters.mjs … --outline`**, or the stubs still carry the old brief |

**Never edit a Project knowledge file in place and expect the repo to know.**
