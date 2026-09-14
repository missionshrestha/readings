# The prompts — index and decision tree

Eleven prompts, two reference sheets. **You will use four constantly and the rest a handful of times
per book.**

```
Between books?
  └─ P1 select ──▶ P2 brief          ⛔ P1 CAN END IN "NO", and should
                   └─ then /scaffold in Claude Code
                      └─ P2b book page     the author, and the book then and now

In the chapter loop?
  ├─ ALWAYS ........................ P3 part A     ## Pre-context
  ├─ Chapter is unfamiliar ......... P3 part B     the rebuild
  ├─ READ it .......................  ⏹ AI OFF    comment as you go — comments are yours
  ├─ RECALL it, closed book ........  ⏹ AI OFF   ← the learning · recall.md
  ├─ Now explain it ................ P4 explain
  ├─ Argue with it ................. P5 argue     question FIRST, then record it all
  ├─ What changes? ................. P6 decide    2–10 recorded, ONE committed per book
  └─ Publish ....................... P7 recap

Book finished?
  └─ P8 ledger    then 30 days before the next one

Always running:
  └─ P9 review    day 3 · week 2 · week 6 · month 3
```

`P0` is not in that tree because it is not a step. It is the standing contract, pasted once per book
in the custom instructions, or as the first message of every chat when you are not in Project mode.

---

## The full table

| | Prompt | Turns | Frequency | Output |
|---|---|---|---|---|
| P0 | [Setup](P0-setup.md) | — | Once per book | The standing contract |
| P1 | [Select](P1-select.md) | 2–3 | Between books | A go / no-go |
| P2 | [Brief](P2-brief.md) | 1–2 | Once per book | `book.json`, with `published` and `editions` |
| P2b | [Book page](P2b-book-page.md) | 1–2 | **Once per book, after `/scaffold`, before chapter one** | `## Author context` · `## Context then vs. context today` · `## Sources`, and a date check |
| P3 | [Clarify](P3-clarify.md) | 1–2 | **Part A always; part B only when `clarified: true`** | Pre-context, then the rebuild |
| P4 | [Explain](P4-explain.md) | 1 | Per chapter | **Ten** sub-sections, and `## Sources` |
| P5 | [Argue](P5-argue.md) | **3+** | Per chapter | The whole dialogue — **five** sub-sections, recorded by message four |
| P6 | [Decide](P6-decide.md) | 4 | Per chapter | **Two to ten** candidates, the YAML, then the attack |
| P7 | [Recap](P7-recap.md) | 1 | Per chapter | The finished page |
| P8 | [Ledger](P8-ledger.md) | 1 | End of book | Synthesis |
| P9 | [Review](P9-review.md) | 1 | Day 3, wk 2, wk 6, mo 3 | What survived |

And three files that are not prompts:

| | | |
|---|---|---|
| [`spine-map.md`](spine-map.md) | **Which prompt owns which heading.** The twelve `##`, the ten `###`, the five `###` of the dialogue, and the book page | Read it before you decide a chapter is finished |
| [`recall.md`](recall.md) | **The step with no prompt.** What to write closed-book, and the one measurement worth taking | Between reading and `P4` |
| [`toggles.md`](toggles.md) | Twelve appendable fragments, with what each looks like when it did **not** land | Two or three per book, never per chapter |

---

## The stage numbers, which collide

**Three numbering schemes name this same work, and nothing else maps them.** They are all in use, so
here is the map rather than a renumbering.

| Prompt | Its own "Stage N" | `WORKFLOW.md` chapter-loop step |
|---|---|---|
| P1 | Stage 0 · SELECT | — |
| — | Stage 1 · ACQUIRE — no prompt | — |
| P2 | Stage 2 · BRIEF | — |
| P2b | Stage 2b · BOOK PAGE | — |
| P3 | Stage 3 · CLARIFY | 1 (part A) · 2 (part B) |
| — | Stage 4 · READ — ⏹ AI off | 3 |
| — | Stage 5 · **RECALL** — ⏹ AI off, [recall.md](recall.md) | 4 |
| P4 | Stage 6 · EXPLAIN | 5 |
| P5 | Stage 7 · DIALOGUE | 7 |
| P6 | Stage 8 · ACTION | 8 |
| P7 | Stage 9 · RECAP | 9 |
| P8 | Stage 10 · LEDGER | — |
| P9 | Stage 11 · REVIEW | — |

**`context/protocol.md` numbers these differently and is superseded here.** It was written before the
closed-book recall existed, so it has EXPLAIN at Stage 5 and READ II at Stage 6; inserting the recall
pushed everything after it down by one, and `reconciliation.md` row 1 makes that insertion without
renumbering anything. The column above is what the prompt files carry.

**No label may be renamed.** `Stage 0` and `Stage 2` are read by `scripts/new-book.mjs`,
`scripts/new-chapters.mjs`, `.claude/skills/scaffold/` and `CLAUDE.md`. **`Stage 2b · BOOK PAGE` was
added on 2026-09-14 beside them**, for the same reason the recall was inserted without renumbering:
nothing after it moves.

---

## The six that catch people

| | The trap |
|---|---|
| **P1** | It said **no**. That is a successful outcome, not a failure to argue with. And if the gap came out *execution*, another book will not fix it |
| **P2b** | Two traps. Typing the release dates into the page — they render from `book.json`, and a second copy is a second place to disagree. And a `## Context then vs. context today` that only criticises: the section is symmetric, and one that only finds problems is as manufactured as one that only finds praise |
| **P3** | Two traps. Running **part B** on a chapter you already understand — a summary preserves the idea and **deletes the machinery**. And skipping **part A** along with it, which is what the old version of this file told you to do: `## Pre-context` is required on every chapter, and it had no producer at all on `clarified: false` until 2026-08-31. [`spine-map.md`](spine-map.md) is the table that would have caught it |
| **P4** | Running it **before** the recall. That turns the chapter into something you have read rather than something you know, and the marking afterwards is worthless |
| **P5** | Stating your position in the first message. Sycophantic agreement is triggered by conveying a belief — the question and the position are separate messages for that reason. And running message four in a new chat: it records a transcript, and a new chat has none |
| **P6** | Accepting filler to reach the floor of two. A conceptual chapter meets it with `tier: reference` rules anchored to its claims; an invented habit makes the ledger meaningless |

---

## Rules for every prompt

**Every prompt body is at least 500 words, and that is measured rather than assumed.**

```bash
node scripts/prompt-words.mjs           # the table
node scripts/prompt-words.mjs --stamp   # writes the count back into each file
```

*"A short prompt gets you the harmful configuration by default. The measured difference was 500+
words against ~50 — the length was the safeguard, not decoration"* (`03-OPERATING-RULES.md` rule 4,
from `evidence/reading-with-ai.md:136`). **On 2026-08-31 all ten were under the bar**, `P5-argue`
worst at 117 words — the one prompt whose entire job is resisting sycophancy, written at close to
the length the evidence calls harmful.

**Padding is not length.** What earns the words is refusals, worked examples, and named failure
modes. Adjectives do not count and do not help. The repair fences under *"If it comes back wrong"*
are counted too, and they are 9–56 words each: nothing in this library clears the floor on them.

**Every prompt names what is missing and stops.** Each fence carries a MISSING INPUTS clause, because
a model holding three of five inputs generates happily against the two it invented and the output
looks correct. `GUIDE.md` Appendix A is the matrix; each prompt now repeats its own row under
**Paste with it**. `P2b`'s row was added to Appendix A on 2026-09-14.

**Every prompt that produces reading is held to the clarity standard.** *"The user must be able to
interpret and understand every sentence produced"* — his instruction of 2026-09-14, `standards.md`
§2b. Complete sentences, every term defined where it first appears, an example beside every
difficult idea, and simpler words that never change the claim. **Brevity is not a virtue in this
library; padding is still a defect.**

**The fence rule depends on what the prompt produces.**

| Produces | Rule |
|---|---|
| A file or a page section — `P2`, `P2b`, `P3`, `P4`, `P7` | One file per turn, **four-backtick fence, nothing outside it.** `P2` and `P2b` allow a labelled note after the fence — the repetition map, the date sources, the date check |
| A conversation — `P0`, `P1`, `P5`, `P6`, `P8`, `P9` | No fence required. **Two exceptions inside their own turns:** `P6`'s YAML block is pasteable and must come back clean, and `P5`'s message four — the record of the exchange — is a page section in a four-backtick fence |

**Root-absolute internal links, never `../`.** A `../` is a hard build error, not a resolved
convenience. Paths are in `src/generated/book-slugs.md`, which web chat cannot open — paste it with
`P7` or accept plain-text cross-links.

**A new chat per chapter.** The Project holds the memory; a long transcript costs tokens and
accumulates your own positions, which is what sycophancy feeds on. **Two rewrites is the limit**; on
the third, start a new chat.

---

## Fill in every bracket before you send

An unsubstituted placeholder does not fail — it produces a fluent, confident page about the wrong
chapter. `P0` instructs the model to quote the bracket back and stop, but check it yourself.

| | Brackets it expects |
|---|---|
| **P0** | `[BOOK]` · `[AUTHOR]` · `[ONE SPECIFIC BEHAVIOUR]` |
| **P1** | none — it is fully generic |
| **P2** | `[BOOK]` · `[reference \| lifelong]` in block B · your three questions |
| **P2b** | `[BOOK]` · `[read \| reference \| lifelong]` |
| **P3** | `[N]` · `[BOOK]` |
| **P4** | `[N]` · `[BOOK]` · the `book.json` node · **`[PASTE YOUR RECALL]`** · the venue list, or "first chapter" |
| **P5** | `[N]` · `[YOUR QUESTION, WITH NO POSITION ATTACHED]` · `[YOUR POSITION]`. Message four has none |
| **P6** | `[N]` · your `If … then …` · the id stem |
| **P7** | `[N]` |
| **P8** | `[BOOK]` |
| **P9** | `[N]` days · the commitment · the obstacle · `[PASTE]` from memory · `[PASTE]` from the page |

---

## The two you will be tempted to skip

**The recall (between P3 and P4) and P9.** Neither produces a file. Both are where the retention
actually lives.

Skipping the recall means the whole system becomes an expensive way to read a summary — it now has
its own page, [`recall.md`](recall.md), because it was the only step in the pipeline with no artifact
at all. **Commenting while you read does not replace it**: a comment is written with the page open.
Skipping P9 means you will not find out which actions died, and a ledger nobody reviews is a list of
intentions.
