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
>
> **A second set of instructions arrived on 2026-09-14**, written after he had read a complete sample
> book end to end. §10 quotes it and says what it changed. **Four of its instructions reverse earlier
> rules** — brevity is no longer a virtue, the author's biography is now wanted, every chapter now
> carries two to ten actions, and the site is now meant to be shared. Read §10 before generating
> anything.

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

**Confirmed again on 2026-09-14, from the other direction:** *"length should not be a concern; user
understanding is the priority"*, and *"Key points & explanation layer: No limit on length or level of
detail"*. §10a.

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
design — a standing question re-asked per book, unlike the ones in §1, §6 and §8, which are gaps
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

**c · The author's own circumstances are part of understanding the argument.** *"everyone's thought
is inspired, derived from their own circumstances, so that can help understand what writer/author
actually meant and why."*

This was his own addition and nothing in the pipeline produced it. The nine sub-sections of the
explanation layer covered what the author says, how readers misread it, what critics say, what has
been tested, and how practitioners use it — **none covered where the author was standing when they
thought it.**

> **DECIDED AND IMPLEMENTED 2026-08-31 by Claude Code, on three grounds, and open to veto.**
> It became a **tenth `###` sub-section, `### Where the author was standing`, placed FIRST inside
> `## The explanation layer`.** Not absorbed into `## Pre-context`.
>
> 1. **`P4` is unconditional; `P3` is not.** `## Pre-context` is produced by `P3`, and `P3` runs
>    *only* when `clarified: true` — so on the majority case it had no producer at all (a live
>    defect in its own right, recorded separately). Putting required material into an orphaned
>    section hides it. `P4` runs on every chapter.
> 2. **It sits immediately before `### What the author is actually saying`,** which is exactly the
>    claim it contextualises. Adjacency is the argument.
> 3. **Reading order protects the recall.** The explanation layer is read *after* the closed-book
>    recall. Author context placed *before* the chapter would frame his own reading and bias the
>    retrieval this whole system is built to preserve. After is not a compromise here — it is
>    correct.
>
> **What it owed then:** who they were, when they wrote, what problem they were living inside, what
> they were reacting against — and what that predicts about where the argument bends. It was told
> *not* to become biography.

> **EXTENDED 2026-09-14, on his instruction — §10b.** He asked for *"a more detailed section on the
> author's context"*, which is biography on purpose. It now lives **once per book**, on the book page,
> as `## Author context` (`book-spec.md` §6). The chapter sub-section stays first in the explanation
> layer and now says only what about the author bears on **that chapter's** claim.

---

## 5 · Accountability, and what is honestly true about it

> *"No, this is for myself, I will learn, understand, brainstrome, talk to AI. AI is my companion, I
> write some blogs on my understandings, chapters, etc if I like, in my personal website. Sometimes I
> may share something to others."*
> — 2026-08-31, his words

**As of 2026-08-31: nobody was watching, by choice.** Harkin's meta-analysis (N ≈ 20,000, *d* = 0.40)
finds monitoring works and works **better when progress is reported to a person**. It was not, here.
`/ledger` states that as a limitation in words and **never simulates it** — no streak, no badge, no
encouraging copy. `reconciliation.md` row 12 called this outcome "neither side wins".

> **Qualified 2026-09-14 — §10f.** He now plans to *"read each chapter and share the progress
> publicly"*. That is closer to reported progress than the occasional blog post above, and it is still
> not the thing the evidence measured: a public post is a broadcast, not a person who asks. **Whether
> it produces the effect for him is untested, and nothing here counts it as if it did.** `/ledger`
> still simulates nothing.

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

**Still true on 2026-09-14.** The sample book he read was a test fixture written to exercise the
pipeline, not his reading — its *Deep Work* chapters have been reset to empty stubs, and nothing from
it is recorded here or in `reader-profile.md`.

---

## 8 · What he has NOT told us

Kept explicitly, because an unlisted gap gets filled by guessing.

| Unknown | Why it matters | Ask before |
|---|---|---|
| What he has already tried and abandoned | The sharpest input to a `gap: execution` diagnosis | The first book chosen for an execution gap |
| Whether his time tracker is a physical record | Harkin: larger effect when physically recorded. §6 | The first committed action, if it matters |
| **Whether 30 opinions is still the right floor for `### What real readers say`** | He said *"a minimum number"* without one. Claude Code set 30, from 3 kinds of venue; he kept it on 2026-09-14 and asked to revisit it. `chapter-spine.md` §3b, §10h | After the **second** chapter's `P4` |
| The social-share, share-image, title and newsletter decisions | He asked them as open questions. `GROWTH.md` has recommendations; **nothing is decided** | Before a real domain is attached |
| Whether `### Where the author was standing` should be a tenth sub-section at all, and whether first is right | **Decided and implemented 2026-08-31, not asked**, and extended 2026-09-14. §4c | It is live — say so if it is wrong |
| Which country/context details he wants surfaced | §4a says describe differing conditions, not conclude non-applicability. Where the line sits per domain is untested | The first chapter in a domain where it bites |

---

## 9 · The standing instructions

Assembled from the evidence and from him, and they govern every chat session.
`web-chat/03-OPERATING-RULES.md` is the full version.

- **Let AI do everything about the book. Do everything about yourself.**
- **Never state your conclusion before asking.** Sycophancy is triggered by conveying a belief.
- **Attempt from memory first, every time.** This one rule prevents most of the crutch effect.
- **Choose one action to commit to.** One implemented beats five considered — two to ten are
  *recorded* per chapter; one is *committed* per book.
- **Name the obstacle. Never picture the outcome.**
- **Add, never subtract, on the transfer question.** §4b, and it is his instruction, not the
  evidence's.
- **Clear before short.** Every sentence understandable on its own, every difficult idea with an
  example beside it, and no length limit on explanation. §10a, and it is his instruction.
- **The tell:** if the transcript is mostly AI-generated prose, you are in the harmful condition.
  The AI should be asking questions more often than you are.

---

## 10 · The second set of instructions — after reading the sample book (2026-09-14)

He read a complete sample book built to exercise the pipeline — the four fixture books of 2026-09-04,
since removed — and wrote down everything he felt needed resolving *"so that both the UI/UX and the
content generation are at their best"* before starting the real reading. **His note refers to him in
the third person, as "the user", and is quoted exactly as written.**

### a · Clarity, for everything he reads

> *"Write all output/reading content in a clear, understandable, non-ambiguous way. Avoid being
> short, imprecise, confusing, unclear, or misleading. Expand and add more detail where needed —
> length should not be a concern; user understanding is the priority."*
>
> *"Don't write overly complex sentences. Aim for optimal simplicity: not so complex that normal
> people can't understand the wording or meaning, but also not oversimplified to the point where
> meaning is lost. Keep the original meaning intact, expressed in a simpler, clearer, easier way
> wherever possible. The user must be able to interpret and understand every sentence produced."*
>
> *"Give examples, analogies, real-life practices/incidents, and cite research wherever relevant — or
> wherever concepts are difficult or confusing."*

**Derived:** `standards.md` §2b, which every page is now held to. **What it reverses:** the drafted
`P0` told the model *"I read fast. Do not pad, do not recap"*, and `P3` called three sentences a
normal pre-context. Neither was his sentence, and both pushed toward compression. **Padding is still
banned; brevity is no longer a virtue.**

**One boundary it does not move:** *"real-life practices/incidents"* must be real — sourced like any
claim — or labelled hypothetical, and no example may ask him to picture his own success
(`standards.md` §2 rule 9, §3).

### b · The book page — dates, the author, and the book then and now

> *"Every book must display its original release date, along with any major updates or version dates
> (major changes only), shown somewhere in the presentation."*
>
> *"New top-level section — Author Context: A more detailed section on the author's context: the time
> and surroundings they were born and raised in, where they worked, and the experiences that led the
> author to think the way they do — anything that could have influenced what the author says in the
> book/chapters."*
>
> *"New top-level section — "Context Then vs. Context Today": The book's content was written in a
> particular time and may not be fully relevant today. This section should surface: any changes the
> author themselves made later, counter-research from other scholars, new/different circumstances,
> science-based counter-arguments, shifts in general perception, or anything — research backing,
> similar findings from other scholars, or other rational points — that supports or argues against
> the book's content/author, including things that weren't relevant when the book was written but are
> relevant now."*

**Derived:** `book.json` gains `published` and `editions`, displayed on every page of the book;
the book page gains `## Author context` and `## Context then vs. context today`, produced by a new
prompt, `P2b` (`book-spec.md` §6, `standards.md` §8). **What it reverses:** §4c's *"not biography"* —
at book level, biography is now exactly what is owed.

### c · The chapter — actions, depth, the concept map, diagrams

> *"Action items: A list of action items for each chapter — minimum 2, maximum 10. Only put things
> that earns"*

**The sentence stops there** — his note itself marks it incomplete. It was read as *earns its place*,
put to him with the four tests in `chapter-spine.md` §6c, and **confirmed the same day** — §10h. **What it reverses:** *"extraction is uncapped"* and *"a conceptual chapter may
support none"*. **What it does not touch:** one committed action per book.

> *"Key points & explanation layer: No limit on length or level of detail — since these are major,
> they should be as long and as detailed as each chapter demands or requires."*
>
> *"Concept map: A clean concept map designed to fit within the current flow of paragraphs and side
> widths, with the ability to expand/collapse to fill the whole screen."*
>
> *"Diagrams: Mermaid is mostly being used for flow diagrams currently; the user wants Mermaid used to
> its full capacity wherever relevant/required — including tables, graphics, bar graphs, charts, pie
> charts, line graphs, histograms, mindmaps, etc."*

**Derived:** `chapter-spine.md` §6b and §8; `md-spec.md` §6; `source-rules.md` §3b (a chart is a
claim). Diagrams now stay inside the text column and every one carries an Expand control.

### d · Reading on the site — comments and the dialogue

> *"Comments (local, first-read stage): The user selects a heading, paragraph, or specific lines,
> which opens a comment pop-up with proper UI/UX, allowing long, formatted, multi-paragraph comments —
> including bullet points and numbered lists. In production, that comment stays tied to its specific
> scroll section, and a general, whole-page TOC-like comment icon appears in the sidebar; clicking it
> opens/expands the comments for view-only access."*
>
> *"Dialogue flow: The back-and-forth dialogue feature should support the full flow of a conversation
> — not just a single "what I said / what it said" pair, but the complete exchange: what was argued
> next, and where the conversation ended up — since the middle portion of a dialogue can be longer and
> more involved."*

**Derived, and overrulable:** comments are written while reading on `npm run dev` and saved to a file
beside the chapter; the built site shows them read-only, anchored to the passage, with a list of all
of them behind one button. **Because he said they appear "in production", they publish by default,
and each comment can be marked local so it never leaves the repository — except in the three
sensitive domains, where a new comment starts local** (§10h, his decision). A comment on a
`private: true` page is never published, because the page is not.
`## Dialogue` gains `### How the exchange went` (`chapter-spine.md` §6).

### e · What real readers say

> *"This section needs to be improved. It should extensively search for clusters of opinions from a
> wide range of real people — from a minimum number up to hundreds of real users — not just 3-4
> specific users, since that sample size won't reflect reality."*
>
> *"Consider using a Reddit-style AI feature that summarizes all user answers on a given topic —
> retrieve that summary where possible. If it can't be retrieved, provide the relevant Reddit
> posts/subreddit topics instead, so the user can bring them and read them personally."*

**Derived:** `chapter-spine.md` §3b, `source-rules.md` §1b. The floor of 30 opinions was Claude
Code's default; he kept it on 2026-09-14, to be revisited after the second chapter (§8, §10h).

### f · Why the site is public — the goals, and the plan

> *"Broader framing: treat this reading project as an SEO / AEO / GEO and personal-branding exercise.
> Primary goal: self-learning and growth. Secondary goal: Google ranking, ads, monetization, visitors,
> and personal branding."*
>
> *"Plan: read each chapter and share the progress publicly, telling others "I've started reading this
> way — if you like, you can also save time by reading this, gaining the most.""*

**Derived, and overrulable:**

1. **The order is his and it decides conflicts.** Where a growth idea would change what a chapter
   owes, who it is written for, or what sits in the prohibition zone, the primary goal wins. A page is
   written for him (`standards.md` §1).
2. **It qualifies §5.** Sharing progress publicly is now the plan. Its effect is untested and is not
   simulated.
3. **The risk his own drafts named applies to this work first.** *"building the site instead of
   reading"* is *"the most sophisticated procrastination available to me."* Share images, titles,
   newsletters and ranking work are machine time, and `WORKFLOW.md`'s machine-to-reading ratio counts
   them.
4. **The site is deliberately not indexed today** — it lives on a temporary `workers.dev` host, and
   `DEPLOY.md` §4 explains why indexing waits for a real domain. Ranking starts the day he attaches
   one. That decision is his.
5. **What is published is now also what is shared.** The `private:` decision in the sensitive domains
   (`DEPLOY.md` §5) matters more, not less, and applies to his comments on those pages too.

### g · Open, and his to decide

> *"Social share, OG image, and title — how should these be handled for each book, chapter, and URL?"*
>
> *"Should a newsletter be introduced as well?"*

`GROWTH.md` set out a recommendation for each, with its cost. **He accepted the recommended order on
2026-09-14 — §10h:** a real domain first; then book and author in every chapter's title, one share
image per book, and an RSS feed; no share buttons, no newsletter yet, no ads on reading pages. **None
of it is built until a domain is attached**, because until then the site is deliberately not indexed.

### h · Settled the same day

After reading the recommendations on the open points above, he answered in one line:

> *"Do what's recommended."*
> — 2026-09-14, his words

What that settled, and what was done:

| Point | Settled as | Done |
|---|---|---|
| *"Only put things that earns"* | **Earns its place** — anchored, observable, distinct, worth a ledger row | `chapter-spine.md` §6c and `P6` no longer call it an assumption |
| Comments in the sensitive domains | Publish by default elsewhere; **in `relationships-…`, `love-…` and `money-and-wealth` a new comment starts local** | `src/overrides/MarkdownContent.astro` and the editor; probed in the browser |
| The floor of 30 reader opinions | **Kept**, and revisited after the second chapter's `P4` | §8 |
| `reader.md` in a web-chat Project | **Not uploaded.** A memory profile raises agreement sycophancy, and every rule the model needs is already in `standards`, `chapter-spine` and `P0` | `web-chat/01-SETUP.md` §3, `02-PROJECT-INSTRUCTIONS.md` |
| The sample books still on disk | **Removed** with `scripts/fixture.mjs --clean`; the new *Deep Work* stubs kept | The real tree builds clean |
| The growth questions | The recommended order in `GROWTH.md`, **starting with a domain** | Nothing built yet, by that order |
