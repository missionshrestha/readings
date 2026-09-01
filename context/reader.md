# The reader

**Read every session.** Everything here came from him directly; nothing is inferred. Where a fact is
missing it **says so** rather than filling the gap, because a wrong value here propagates into every
chapter ever generated.

**Maintained by Claude Code (`/progress`)**, under one rule: *never write a cell you did not read in
a file or hear from him this session.*

> **Interviewed 2026-08-31.** His answers are quoted **verbatim below, typos preserved**, because a
> tidied quote is already an interpretation. Anything this file draws *from* those answers is
> labelled **derived** and may be overruled.
>
> **Two of his answers reverse assumptions the drafts had built on**, and both reversals are load-
> bearing: there is **no length budget** (§2), and the transfer question is **additive, never
> subtractive** (§4). Read those two before writing anything.

---

## 1 · Who he is

> *"I am someone who want to continously learn and grow, in various aspects of life like health,
> wealth, career, relationships, social, spiritual and other aspects of life."*
> — 2026-08-31, his words

**Derived, and overrulable:** the breadth is the point, not a hedge. It maps onto the sixteen domains
of `universe.md` rather than onto one of them, so **no chapter may assume a professional frame** — not
"as an engineer", not "in your career" — unless the book itself is in a domain where that is the
subject. He did not give a job title and was not asked for one twice.

**Still not known, and not guessed:** what he has already tried and abandoned. That question was put
to him and he answered the growth half of it, not the abandonment half. `[ASK]` again when a book is
selected for an execution gap, because a thing already tried and dropped is the single most useful
input to that diagnosis.

---

## 2 · There is no length budget — and this reverses what the drafts assumed

> *"No you generate what you generate, there shouldn't be any hard limit on that, if a chapter is 10
> hour or unlimited long, you do it, I read usually 30 mins a day on weekdays and 60 mins on
> weekends. Nothing happens if i don't finish a chapter or section or cover multiple chapters."*
> — 2026-08-31, his words

**What this repeals.** The drafts assumed 30 minutes a day and computed a schedule from it, and the
earlier version of this file called the sitting floor *"the load-bearing figure"* on the argument that
*"a 45-minute chapter does not fit a 30-minute sitting."* **He rejected the premise.** A chapter is
not sized to a sitting. A sitting is where reading stops, not where a chapter ends.

| | Was assumed | What he actually said |
|---|---|---|
| Chapter length | Capped by the sitting | **Uncapped.** *"if a chapter is 10 hour or unlimited long, you do it"* |
| A sitting | The unit a chapter must fit | The unit **reading** happens in, nothing more |
| Not finishing | A calibration failure | *"Nothing happens"* |
| `estMinutes` | A constraint | **Descriptive.** What it will cost, not what it may cost |

**His observed reading rate — recorded as an observation, never as a cap:**

| | |
|---|---|
| Weekdays | **30 min/day** |
| Weekends | **60 min/day** |
| Implied week | **~270 min** — *derived arithmetic, not his figure* |

**What `estMinutes` is still for.** Two things, and neither is a limit. It tells him what a chapter
will cost before he opens it, and it is the left-hand side of the `Effort`-against-estimate
comparison in `reader-profile.md` — the only honest signal of whether an estimate was any good.
**120-against-85 is data, not a failure**, and it is now *only* data: there is no schedule for it to
have broken.

**What this forbids in a spec.** No per-section word budget. No rate table converting words to
minutes and capping a section by it. No "this section has overrun." Depth is governed by what the
brief says the chapter is worth — `weightInArgument` × `verdict` × `gap` — and by nothing else.
**A section that is long because the material is long is correct.**

---

## 3 · The gap that comes before everything

> **"Is my problem a knowledge gap, or an execution gap?"**
>
> This single distinction predicts most of the disappointment people report with the genre. The
> books that "didn't work" were usually aimed at execution gaps and read as though they were
> solving knowledge gaps. — `evidence/reading.md:122`

`[ASK]` **per book, at Stage 0**, and record it in `book.json` as `gap`. It is not a property of him;
it is a property of the problem he brought to that book. This one stays a standing question by
design — a standing question re-asked per book, unlike the three in §1, §6 and §8, which are gaps
waiting on an answer.

---

## 4 · The transfer question is ADDITIVE, never subtractive — and this reverses the other assumption

> *"No, you don't think this as personal, what transfer or not in my context, you don't remove, alter
> the things that author wanted to say for original intent, you can give extra instead where this
> might be different for my context, environment, situations, country, personality, etc. Moreover in
> context you might tell the context of author, his/her settings, background, as everyone's thought
> is inspired, derived from their own circumstances, so that can help understand what writer/author
> actually meant and why"*
> — 2026-08-31, his words

Three separate instructions, and each changes something:

**a · Do not decide for him what applies.** The earlier version of this file framed
`### Where it doesn't transfer` as a judgment about *his* life — Kathmandu, the economics, the family
expectations. He declined that framing. The section may say **where a claim's conditions differ**;
it may not conclude **that it therefore does not apply to him.** That conclusion is his, and it
belongs with the recall and the commitment in the prohibition zone.

**b · Never subtract from the author.** *"you don't remove, alter the things that author wanted to
say for original intent."* Additions are welcome; deletions are not. This **independently confirms
`reconciliation.md` row 6** — *"summaries preserve the idea and delete the machinery"* — and it
sharpens `P3`: a clarified chapter may reorganise and expand, and its cut-list must stay genuinely
confined to padding and repetition. **When in doubt, keep it and add beside it.**

**c · NEW — the author's own circumstances are part of understanding the argument.** *"everyone's
thought is inspired, derived from their own circumstances, so that can help understand what
writer/author actually meant and why."*

This is his own addition and nothing in the pipeline produced it. The nine sub-sections of the
explanation layer covered what the author says, how readers misread it, what critics say, what has
been tested, and how practitioners use it — **none covered where the author was standing when they
thought it.**

> **DECIDED AND IMPLEMENTED 2026-08-31 by Claude Code, on three grounds, and open to veto.**
> It becomes a **tenth `###` sub-section, `### Where the author was standing`, placed FIRST inside
> `## The explanation layer`.** Not absorbed into `## Pre-context`.
>
> 1. **`P4` is unconditional; `P3` is not.** `## Pre-context` is produced by `P3`, and `P3` runs
>    *only* when `clarified: true` — so on the majority case it has no producer at all (this is
>    a live defect in its own right, recorded separately). Putting required material into an
>    orphaned section hides it. `P4` runs on every chapter.
> 2. **It sits immediately before `### What the author is actually saying`,** which is exactly the
>    claim it contextualises. Adjacency is the argument.
> 3. **Reading order protects the recall.** The explanation layer is read *after* the closed-book
>    recall. Author context placed *before* the chapter would frame his own reading and bias the
>    retrieval this whole system is built to preserve. After is not a compromise here — it is
>    correct.
>
> **What it owes:** who they were, when they wrote, what problem they were living inside, what they
> were reacting against — and what that predicts about where the argument bends. **What it must not
> do:** become biography, or explain the argument away. Its failure mode is *"it describes the
> author instead of what shaped the claim."*
>
> **Where it landed, so a veto knows what to undo:** `chapter-spine.md` §3 (the ten-row table),
> `scripts/new-chapters.mjs` (`EXPLANATION`), `context/templates/_TEMPLATE-CHAPTER.mdx`,
> `web-chat/prompts/P4-explain.md`, `web-chat/00-CONTEXT-PACK.md`, and the six *Deep Work* stubs via
> `node scripts/new-chapters.mjs … --spine`. Six files and one command.

---

## 5 · Accountability, and what is honestly true about it

> *"No, this is for myself, I will learn, understand, brainstrome, talk to AI. AI is my companion, I
> write some blogs on my understandings, chapters, etc if I like, in my personal website. Sometimes I
> may share something to others."*
> — 2026-08-31, his words

**Nobody is watching, by choice.** Harkin's meta-analysis (N ≈ 20,000, *d* = 0.40) finds monitoring
works and works **better when progress is reported to a person**. It is not, here. `/ledger` states
that as a limitation in words and **never simulates it** — no streak, no badge, no encouraging copy.
`reconciliation.md` row 12 called this outcome "neither side wins"; it is now **confirmed**, not
assumed, and the page is right to say so.

**One honest qualification, and it is not accountability.** He publishes some of his understanding
publicly on his own site, sometimes. That is a real audience and it is more than a private tick-box —
but it is occasional, self-selected, and after the fact, so **it must not be counted as the reported
progress the evidence describes.** Recorded because it is true, not because it closes the gap.

---

## 6 · Tracking

> *"Yes I track how much I read in time tracker"*
> — 2026-08-31, his words

**He already measures reading time.** Two consequences:

1. **`Effort` in `reader-profile.md` is obtainable** — it is a number he can read off, not a number
   he has to estimate. `/progress` **asks for it** and never pre-fills it from the estimate: copying
   the estimate writes 30 = 30 and destroys the only comparison the column exists to make.
2. **Do not claim this satisfies Harkin's physical-record moderator.** He said *time tracker*, which
   is most likely an application. Whether the record is physical was not asked and is **not
   inferred.** `[ASK]` before the first committed action if it ever matters.

---

## 7 · Prior reading

> *"No, read none before. I will start things fresh."*
> — 2026-08-31, his words

**None of the 293 books in `universe.md` has been read.** So no book needs the different brief a
re-read would need, `reader-profile.md`'s *Books finished* table is correctly empty rather than
merely unfilled, and the first book selected is genuinely a first book.

---

## 8 · What he has NOT told us

Kept explicitly, because an unlisted gap gets filled by guessing.

| Unknown | Why it matters | Ask before |
|---|---|---|
| What he has already tried and abandoned | The sharpest input to a `gap: execution` diagnosis | The first book chosen for an execution gap |
| Whether his time tracker is a physical record | Harkin: larger effect when physically recorded. §6 | The first committed action, if it matters |
| Whether `### Where the author was standing` should be a tenth sub-section at all, and whether first is right | **Decided and implemented 2026-08-31, not asked.** §4c has the three grounds and the six files a veto would touch | It is live now — say so if it is wrong |
| Which country/context details he wants surfaced | §4a says describe differing conditions, not conclude non-applicability. Where the line sits per domain is untested | The first chapter in a domain where it bites |

---

## 9 · The standing instructions

Assembled from the evidence, and they govern every chat session.
`web-chat/03-OPERATING-RULES.md` is the full version.

- **Let AI do everything about the book. Do everything about yourself.**
- **Never state your conclusion before asking.** Sycophancy is triggered by conveying a belief.
- **Attempt from memory first, every time.** This one rule prevents most of the crutch effect.
- **Choose one action.** One implemented beats five considered.
- **Name the obstacle. Never picture the outcome.**
- **Add, never subtract, on the transfer question.** §4b, and it is his instruction, not the
  evidence's.
- **The tell:** if the transcript is mostly AI-generated prose, you are in the harmful condition.
  The AI should be asking questions more often than you are.
