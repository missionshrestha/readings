# The web-chat half — where all the judgment happens

Claude Code built the container and now only scaffolds, validates, aggregates and ships.
**Everything that requires judgment happens here**: choosing the book, the brief, every chapter, the
explanation layer, the argument, the actions.

**One book = one Claude Project.** That Project is the persistent memory, and it is the only reason
nothing has to be re-pasted between sessions.

---

## Read these first, in order

| # | File | What it settles |
|---|---|---|
| 0 | **[`00-CONTEXT-PACK.md`](00-CONTEXT-PACK.md)** | Running anywhere — the one paste that replaces the Project |
| 1 | **[`01-SETUP.md`](01-SETUP.md)** | How to create the Project and what to load into it |
| 2 | **[`02-PROJECT-INSTRUCTIONS.md`](02-PROJECT-INSTRUCTIONS.md)** | The standing contract, pasted verbatim |
| 3 | **[`03-OPERATING-RULES.md`](03-OPERATING-RULES.md)** | **How *you* use AI while reading.** Read this even if you skip everything else |

**File 3 is the one that decides whether this works.** The same interaction that most accelerates
your output most reliably prevents you from learning, and the difference is a behaviour you choose,
not a tool you pick.

---

## Two modes, and the prompts do not care which

| | **Project mode** | **Standalone mode** |
|---|---|---|
| Where | One Claude Project per book | Incognito · a second account · another provider |
| Context from | Uploaded knowledge files | One paste per chat |
| Use when | Normal | You hit a usage limit, or want a second model's read |

**Standalone is not a downgrade** — the output is identical if the context is. Nothing here depends
on chat history: the contract, the reconciliation and the brief are files, and files travel.

**Every prompt opens by telling the model to name anything missing and stop.** A model holding three
of five inputs will generate happily against the two it invented, and the output looks correct.

---

## The flow

```
  0  SELECT      which book, and why THIS one rather than an easier one    15 min, hard limit
  1  ACQUIRE     find it, and the OUTSIDE VIEW before you commit           ⚙ search on
  2  BRIEF       the whole book: chapter map, questions, exit condition    -> book.json
                 ↓  /scaffold in Claude Code
     ╔═══════════════════ THE CHAPTER LOOP ═══════════════════╗
  3  ║ CLARIFY   only when the material is unfamiliar          ║
  4  ║ READ      the chapter — the ORIGINAL where you can      ║  ⏹ AI OFF
  5  ║ RECALL    closed book, from memory, BEFORE any AI       ║  ⏹ AI OFF  ← the learning
  6  ║ EXPLAIN   the teaching layer + the world's reading      ║  ⚙
  7  ║ ARGUE     question first, position second               ║  ⚙
  8  ║ DECIDE    candidates with honest impact. YOU choose one ║  ⚙ menu only
  9  ║ RECAP     concept map, the 30-second version, publish   ║  ⚙
     ╚══════════════════════ next chapter ════════════════════╝
                 ↓
 10  LEDGER      consolidate, synthesise, publish              end of book
 11  REVIEW      day 3 · week 2 · week 6 · month 3             diarised
```

**Stages 4, 5 and 8 have the AI OFF, and that is where the learning is.** Everything else is
logistics. Stage 5 has its own page — [`prompts/recall.md`](prompts/recall.md) — because it is the
one step in the pipeline with no prompt, and it was the one step with no artifact at all.

**This numbering is not `context/protocol.md`'s.** That file was written before the closed-book
recall existed, so it has EXPLAIN at 5 and READ II at 6; inserting the recall pushed everything after
it down by one. [`prompts/README.md`](prompts/README.md) carries the map across all three schemes
that name this work — this one, protocol's, and `WORKFLOW.md`'s chapter-loop steps.

---

## The prompts

| | Prompt | When | Output |
|---|---|---|---|
| P0 | [Setup](prompts/P0-setup.md) | Once per book, before anything | The standing contract |
| P1 | [Select](prompts/P1-select.md) | Between books. **15 min, hard limit** | A go / no-go |
| P2 | [Brief](prompts/P2-brief.md) | Once per book | `book.json` |
| P3 | [Clarify](prompts/P3-clarify.md) | **Part A every chapter; part B only when unfamiliar** | Pre-context, then the rebuild |
| P4 | [Explain](prompts/P4-explain.md) | Per chapter, after the recall | Ten sub-sections |
| P5 | [Argue](prompts/P5-argue.md) | Per chapter | The dialogue |
| P6 | [Decide](prompts/P6-decide.md) | Per chapter | Candidate actions |
| P7 | [Recap](prompts/P7-recap.md) | Per chapter | The finished page |
| P8 | [Ledger](prompts/P8-ledger.md) | End of book | Synthesis |
| P9 | [Review](prompts/P9-review.md) | Day 3, week 2, week 6, month 3 | What survived |

And three files in the same directory that are not prompts:

| | For |
|---|---|
| [`prompts/spine-map.md`](prompts/spine-map.md) | **Which prompt owns which heading.** The twelve `##`, the ten `###`, and the `clarified` flip that decides who produces sections 2 and 3 |
| [`prompts/recall.md`](prompts/recall.md) | **Stage 5, which has no prompt.** What to write closed-book, and the one measurement worth taking |
| [`prompts/toggles.md`](prompts/toggles.md) | Twelve fragments to append when a book calls for one — with what each looks like when it did **not** land |

## The reference files

| File | For |
|---|---|
| [`reference/phrasebook.md`](reference/phrasebook.md) | What to actually type. The difference between the patterns is almost entirely which of these you use |
| [`reference/troubleshooting.md`](reference/troubleshooting.md) | What to say when the output is wrong |
| [`reference/diagnostics.md`](reference/diagnostics.md) | Whether it is actually landing. **The one file that measures you rather than the output** |

---

## The loop, from your side

```
1  ASK        paste the prompt into the book's Project
2  RECEIVE    ONE four-backtick fenced file, complete, no commentary
3  PASTE      over the stub /scaffold created
4  VALIDATE   /validate in Claude Code — syntax and coverage, never content
5  READ       and RECALL closed-book                              ← the point
6  RECORD     fill ## Open questions BY HAND · status: complete
7  SHIP       /deploy
```

**Steps 5 and 6 are the deliverable. Everything else is logistics.**

---

## The three rules that save the most pastes

**1 — Four backticks.** Every generated file arrives in a single fence of **four**. The file
contains three-backtick blocks; a three-backtick wrapper closes on the first one and you paste half
a file.

**2 — Root-absolute links.** `/domain/cluster/book/chapter/`. A relative `../` chain is a **hard
build error**, not a preference. Every path is in `src/generated/book-slugs.md`.

**3 — No maths.** `$$…$$` is not enabled and throws at build.
