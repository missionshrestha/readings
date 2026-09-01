# The prompts — index and decision tree

Ten prompts. **You will use four constantly and the rest a handful of times per book.**

```
Between books?
  └─ P1 select ──▶ P2 brief          ⛔ P1 CAN END IN "NO", and should
                   └─ then /scaffold in Claude Code

In the chapter loop?
  ├─ ALWAYS ........................ P3 part A     ## Pre-context
  ├─ Chapter is unfamiliar ......... P3 part B     the rebuild
  ├─ READ it .......................  ⏹ AI OFF
  ├─ RECALL it, closed book ........  ⏹ AI OFF   ← the learning
  ├─ Now explain it ................ P4 explain
  ├─ Argue with it ................. P5 argue     question FIRST
  ├─ What changes? ................. P6 decide    menu only, you choose ONE
  └─ Publish ....................... P7 recap

Book finished?
  └─ P8 ledger    then 30 days before the next one

Always running:
  └─ P9 review    day 3 · week 2 · week 6 · month 3
```

---

## The full table

| | Prompt | Turns | Frequency | Output |
|---|---|---|---|---|
| P0 | [Setup](P0-setup.md) | — | Once per book | The standing contract |
| P1 | [Select](P1-select.md) | 2–3 | Between books | A go / no-go |
| P2 | [Brief](P2-brief.md) | 1–2 | Once per book | `book.json` |
| P3 | [Clarify](P3-clarify.md) | 1–2 | **Part A always; part B only when unfamiliar** | Pre-context, then the rebuild |
| P4 | [Explain](P4-explain.md) | 1 | Per chapter | **Ten** sub-sections |
| P5 | [Argue](P5-argue.md) | **2+** | Per chapter | The dialogue |
| P6 | [Decide](P6-decide.md) | 4 | Per chapter | Candidates, then the attack |
| P7 | [Recap](P7-recap.md) | 1 | Per chapter | The finished page |
| P8 | [Ledger](P8-ledger.md) | 1 | End of book | Synthesis |
| P9 | [Review](P9-review.md) | 1 | Day 3, wk 2, wk 6, mo 3 | What survived |

---

## The four that catch people

| | The trap |
|---|---|
| **P1** | It said **no**. That is a successful outcome, not a failure to argue with. And if the gap came out *execution*, another book will not fix it |
| **P3** | Two traps now. Running **part B** on a chapter you already understand — a summary preserves the idea and **deletes the machinery**. And skipping **part A** along with it, which is what the old version of this file told you to do: `## Pre-context` is required on every chapter, and it had no producer at all on `clarified: false` until 2026-08-31 |
| **P4** | Running it **before** the recall. That turns the chapter into something you have read rather than something you know, and the marking afterwards is worthless |
| **P5** | Stating your position in the first message. Sycophantic agreement is triggered by conveying a belief — the whole prompt is two messages for that reason |

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
the length the evidence calls harmful. They now run 532–822.

**Padding is not length.** What earns the words is refusals, worked examples, and named failure
modes. Adjectives do not count and do not help.

**One file per turn, four-backtick fence, nothing outside it.**

**Root-absolute internal links, never `../`.** Paths are in `src/generated/book-slugs.md`.

**A new chat per chapter.** The Project holds the memory; a long transcript costs tokens and
accumulates your own positions, which is what sycophancy feeds on.

**Every prompt tells the model to name what is missing and stop.** A model holding three of five
inputs generates happily against the two it invented, and the output looks correct.

---

## The two you will be tempted to skip

**The recall (between P3 and P4) and P9.** Neither produces a file. Both are where the retention
actually lives.

Skipping the recall means the whole system becomes an expensive way to read a summary. Skipping P9
means you will not find out which actions died, and a ledger nobody reviews is a list of intentions.
