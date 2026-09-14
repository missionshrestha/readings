# GUIDE — the end-to-end runbook

**Keep this open while you work.** The other files explain *why*; this tells you *what next*, in
order, with a verification after every step.

**Every `> Verify:` block below has a pass and a fail.** A step with no way to tell whether it
worked is a step that will silently not have worked — which is the failure mode this whole
repository is built around.

---

## The shape of it, in one screen

```
ONCE EVER      answer context/reader.md · decide the privacy posture · deploy

PER BOOK       P1 select  ->  P2 brief  ->  /scaffold  ->  P2b book page     ~75 min
                                                                ⛔ P1 can say no

PER CHAPTER    P3 part A — pre-context, ALWAYS                   2 min
               P3 part B — the rebuild, only if clarified        3 min
               READ on npm run dev, commenting as you go  ⏹      uncapped
               RECALL, closed book                        ⏹      uncapped  ← the point
               P4 explain  ·  P5 argue  ·  P6 decide              uncapped
               P7 recap  ->  paste  ->  /validate                 10 min ceiling
               ## Open questions by hand · status: complete        5 min
               /deploy

WEEKLY         /ledger · node scripts/audit.mjs                   10 min
ON A SCHEDULE  /review — day 3 · week 2 · week 6 · month 3
END OF BOOK    P8 ledger  ->  verdict  ->  30 days before the next
```

**The only ceilings are on the machine.** Reading and recall are uncapped, on his own instruction —
*"if a chapter is 10 hour or unlimited long, you do it… Nothing happens if i don't finish a
chapter."* `context/reader.md` §2. A chapter is not sized to a sitting.

**And every page is held to one standard**, his instruction of 2026-09-14: *"The user must be able to
interpret and understand every sentence produced."* A page you cannot follow is a defect in the page.
`context/standards.md` §2b.

---

# PART 0 · Once ever

## 0.1 Answer `context/reader.md`

**Done twice.** The interview of 2026-08-31 is quoted verbatim, typos preserved, and two of its
answers reversed assumptions the repository had hard-coded:

| | |
|---|---|
| **There is no length budget** | *"if a chapter is 10 hour or unlimited long, you do it."* §2 |
| **The transfer question is additive** | *"you don't remove, alter the things that author wanted to say for original intent, you can give extra instead."* §4 |

**The instructions of 2026-09-14** (§10), written after he read a complete sample book, reversed four
more: **clarity over brevity**, **the author's biography on the book page**, **two to ten actions per
chapter**, and **a site meant to be shared** — plus comments, the full dialogue, the reader-opinion
method, dated books and diagrams that fit the column.

**§8 lists what has not been told**, and none of it is guessed. Three of the 2026-09-14 open points
were settled the same day on his instruction: *"Only put things that earns"* means *earns its place*;
comments start local in the sensitive domains; `reader.md` is not uploaded to a web-chat Project.

> **Verify:**
> **PASS** — `grep -c '\[ASK\]' context/reader.md` returns **3**: the standing per-book gap question
> (§3, re-fires every book at Stage 0), a re-ask condition on the abandonment question (§1), and a
> conditional ask on the physical-record question (§6). Every filled cell traces to a quoted sentence.
> **FAIL** — a cell contains a plausible value with no quotation behind it. An empty cell is a known
> gap; a guessed one is indistinguishable from a real answer.

## 0.2 Decide the privacy posture

The site is public and currently `noindex` on a temporary host. Chapters in **relationships, love and
money** will carry real material about other people — **and so will your comments on those pages.**
Comments publish by default everywhere else; **on those three domains a new comment starts local**, and
publishing one takes a deliberate untick.

Three independent mechanisms protect it, probed in both directions on 2026-08-31:

1. **Control 2 refuses the build** on an authored page in those domains with no explicit `private:`
   decision. A default is not a decision.
2. **`private: true` actually excludes the page** — no route, no sitemap entry, no Pagefind record,
   and none of its comments. `src/content.config.ts` drops it from the collection during `build`.
   **It did not do this until 2026-08-31**: Starlight filters `draft` and nothing else, so a private
   page built, served and was listed in the sitemap while every control passed.
3. **Control 4 re-reads `dist/`** at `astro:build:done` and refuses if a route or an inbound link to
   one of those pages exists anyway.

> **Verify:**
> **PASS** — put `private: true` on a page in `money-and-wealth`, run `npm run build`, and see
> `[WARN] [readings-docs-loader] private: 1 page(s) held back from this build`, with the page count
> unchanged and no directory for it in `dist/`.
> **FAIL** — the page count goes up by one, or `grep -r "<a unique string from the body>" dist/`
> finds anything. Do not deploy that `dist/`.

## 0.3 Set up your chat context

Project mode → [`web-chat/01-SETUP.md`](web-chat/01-SETUP.md).
Standalone → [`web-chat/00-CONTEXT-PACK.md`](web-chat/00-CONTEXT-PACK.md).

> **Verify:** the verification questions at the foot of `00-CONTEXT-PACK.md`.
> **PASS** — it names the recall, the obstacle and the IF–THEN commitment as the three things it may
> never write; says root-absolute links and that a relative one is a hard build error; says
> `## Pre-context` is still written on a `clarified: false` chapter; says **ten** explanation-layer
> sub-sections with `### Where the author was standing` first; says add-never-subtract on the transfer
> question; says **five** `### ` in `## Dialogue`; and says **two to ten** actions per chapter with
> one committed per book.
> **FAIL on the first question** — stop and re-paste. That is the one that costs you the whole point.
> **FAIL on any later one** — the Project is holding a stale copy of the pack. Re-upload the
> knowledge files; those questions exist to detect exactly that.

## 0.4 Verify the machine

```bash
npm run ci                     # astro check && astro build — what Cloudflare runs
node scripts/universe.mjs      # 7 / 16 / 85 / 293
node scripts/audit.mjs         # four controls, and the corpus findings
node scripts/contrast.mjs      # 104 colour pairs across four themes
node scripts/prompt-words.mjs  # eleven prompts, each at or over 500 words
```

> **Verify — the exact expected output, so "looks fine" is not the test:**
>
> | Command | PASS | FAIL |
> |---|---|---|
> | `npm run ci` | `0 errors` from `astro check`, then the page count and `All internal links are valid.` | anything else, including a green build with a warning you have not read |
> | `node scripts/universe.mjs` | `7 / 16 / 85 / 293`, tiers `73/124/96`, weights `78/150/65` | any count off by one — the parser dies on a one-character edit to `universe.md`, which is the point of it |
> | `node scripts/audit.mjs` | four ` ok ` lines and `all controls pass.` | a `FAIL` line, or `SKIPPED — no dist/`. **"Didn't run" is never "passed"** |
> | `node scripts/contrast.mjs` | `104/104 pairs pass across 4 themes` | any `FAIL` row. `note` rows are advisory and do not fail |
> | `node scripts/prompt-words.mjs` | `11/11 at or over 500 words` | any `UNDER` row |

---

# PART 1 · Once per book

## 1.1 Select — `P1`, fifteen minutes, hard limit

**This stage can say no**, and a selection stage that always says yes is theatre.

The first question is not "which book" — it is **"is this a knowledge gap or an execution gap?"** If
it is execution, another book will largely not fix it, and `P1` is instructed to say so plainly
before offering you anything.

> **Verify:**
> **PASS** — you can state the gap in one word and say why this book rather than an easier one.
> **FAIL** — it said no and you argued it into a yes; or the gap came out `execution` and you took
> the book anyway without naming what else you are changing; or fifteen minutes became an hour.
> **Choosing is not reading.**

## 1.2 Acquire, and do the inspectional pass with the AI OFF

Twenty minutes: contents, index, first and last chapter, skim the rest. **Write your 3–5 questions
now**, before you paste anything.

> **Verify:**
> **PASS** — the questions exist in writing, and at least one of them is something the book might not
> answer.
> **FAIL** — the questions describe what you found. Questions written afterwards are a summary
> wearing a question mark, and they will make every chapter agree with you.

## 1.3 Brief — `P2`

Produces `book.json` — **including `published`, the original release date, and `editions`, the major
revisions only, each with a source.** Save it beside where the book will live.

> **Verify:**
> **PASS** — `read + skipped === chapters`; every `argues` is a sentence someone could disagree with;
> `clarified` is a deliberate boolean on every chapter; `exitCondition` is something you could fail;
> the release date was read from a source in that session.
> **FAIL** — an `argues` that names a topic ("covers scheduling"); an empty `antiChapters` on a long
> book, which is a table of contents rather than a decision; a paperback reissue listed as an edition.

## 1.4 Scaffold

```bash
node scripts/new-book.mjs <domain> <cluster> <book>
# save book.json into the directory it just created, then
node scripts/new-chapters.mjs <domain> <cluster> <book>
npm run ci
```

Or just `/scaffold <book>` and let Claude Code drive them.

**The script validates the whole brief before writing anything and prints every problem at once. A
refusal is a BRIEF defect, not a scripting problem** — take the whole list back to `P2` rather than
patching the JSON past a check. Every refusal message it can produce is reproduced in
`context/book-spec.md` §3b, so you can check a brief against them before running anything.

> **Verify:**
> **PASS** — one stub per chapter, all `draft: true`, the chapter grid on the book page lists every
> chapter and names the ones you deliberately skipped, **the release date shows under the book's
> title**, and `npm run ci` is green.
> **FAIL** — the run wrote *some* files. It is all-or-nothing by design, so a partial write means
> something is wrong with the script, not with the brief.

## 1.5 The book page — `P2b`

**Added 2026-09-14, on his instruction.** With search on, `P2b` writes the two sections every book
page now carries, and their sources:

- **`## Author context`** — where and when the author grew up, what they studied and where they
  worked, what led to this book, and what that means for reading it. Biography, in detail, sourced.
- **`## Context then vs. context today`** — the world the book was written in, what the author has
  changed since, what research has found for **and** against it, what critics and other scholars
  argue, what is different today, and what still holds.

Paste it over the `TODO`s in the book's `index.mdx`, never between the `CHAPTERS` markers, and
`/validate`.

**Read `## Author context` before chapter one. Read `## Context then vs. context today` after the
first chapter's recall** — it carries criticism of the book's claims, and read first it frames what
you look for in the chapter (`context/book-spec.md` §6).

> **Verify:**
> **PASS** — every date and biographical fact has a row in the page's `## Sources`; the *then vs.
> today* section reports what has supported the book as carefully as what has undermined it, and each
> point says whether the author, the evidence, the world or the audience changed.
> **FAIL** — a section that only criticises; *"his difficult childhood shaped his need for control"*
> with no source saying so; the release date typed into the page, where it can disagree with
> `book.json`.

---

# PART 2 · The chapter loop

## 2.1 Orient and clarify — `P3`, in two parts

**Part A runs on every chapter.** It produces `## Pre-context` — what you need in mind *before* you
open the chapter, not a summary of it, **as long as that takes**, with every term the chapter assumes
defined and illustrated.

**Part B runs only when `book.json` says `clarified: true`.** It produces `## Core message`,
`## Key points` and `## The clarified chapter`. On familiar material, skip it and read the original:
a clarified version deletes the examples and repetition that made the idea usable.

> **This split was made on 2026-08-31 and it fixed a live defect.** The whole prompt used to be
> conditional, which left three required headings with **no producer at all** on a `clarified: false`
> chapter — the common case, not the edge. On an unclarified chapter, `## Core message` and
> `## Key points` now come from `P4`, after your recall. `context/chapter-spine.md` §1.

> **Verify:**
> **PASS** — `## Pre-context` exists and contains conditions for reading, not claims from the
> reading, and you understood every sentence of it.
> **FAIL** — you can delete a sentence from `## Pre-context` and the chapter loses nothing (that
> sentence belongs in the chapter); or it used a term you had to look up.

## 2.2 Read it — **AI off**, on `npm run dev`, commenting as you go

The original wherever you can get it. A clarified chapter is a lens, and a lens can distort.

**Comment on anything.** Select a heading, a paragraph or a few words on the chapter's page and press
**Comment**: the editor takes paragraphs, bullets and numbered lists, and saves to a file beside the
chapter. Comments publish with the page — tick **Keep this comment local** for one meant only for you.
The editor exists only on `npm run dev`; the public site shows the comments read-only, marked on
their passages, behind the speech-bubble button.

> **Verify:** **PASS** — you read the book. **FAIL** — you read the page about the book.

## 2.3 Recall it — **closed book, AI off**

**This is the step. Everything else is logistics.**

Book shut, page collapsed, assistant closed. Write what the chapter argued in your own words. Then
write the questions you could not answer.

**Your comments are not the recall.** They were written with the page open; the recall is written
with it shut. One is a note, the other is the learning.

**Do not skip to `P4`.** Running the explanation first turns the chapter into something you have read
rather than something you know, and the marking afterwards is worthless. Retrieval scored **61%
against 40%** for rereading.

> **Verify:**
> **PASS** — something was written before you read anything of the model's.
> **FAIL** — the recall contains vocabulary from the explanation layer that is not in the chapter.
> That is not proof, but it is where to look.

## 2.4 Explain, argue, decide — `P4` `P5` `P6`

`P4` marks your recall first, then produces the **ten** sub-sections — `### Where the author was
standing` is first, and says what about the author bears on **this** chapter. `### What real readers
say` reports **clusters of opinion with counts and venues** — or the Reddit Answers query and the
threads to read yourself when it cannot reach them.

`P5` runs question first, position second — and then **the whole exchange is recorded**, turn by
turn, under `### How the exchange went`.

`P6` gives you a **menu of two to ten**, each tied to a claim in the chapter. You choose one to
commit to, you write the IF–THEN sentence, and you name the obstacle. It then attacks your draft.

> **Verify:**
> **PASS** — ten `###` in the explanation layer; five `###` in `## Dialogue`, with the question
> before the position; `### What real readers say` states how many opinions it read; two to ten
> actions in the frontmatter, at most one `committed: true` with `tier: now` across the book, naming
> an obstacle with a mechanism in it.
> **FAIL** — nine explanation sub-sections or four dialogue sub-sections (the session is on an old
> shape — re-upload the context pack); *"readers generally find"* with no number; an obstacle that
> reads "being busy"; a `### Where it doesn't transfer` that concludes something does not apply to
> you.

## 2.5 Recap, paste, validate — `P7`

```bash
/validate
node scripts/new-chapters.mjs <d> <c> <b> --refresh
```

**`--refresh` after every paste**, or the chapter grid silently drifts.

**Flip `draft: false` BEFORE you validate.** A draft page has no route, so Astro never compiles its
body — its MDX is syntax-checked by nothing at all, and `npm run ci` will report a clean build over a
file full of errors. Probed: a deliberate `if (a < b)` outside backticks on a draft page gave
**0 errors, 107 pages**.

**Look at the diagrams on `npm run dev`.** The build does not parse Mermaid, so a broken diagram is
green at build and an error box on the page. Each should read inside the column; **Expand** is for
detail.

> **Verify:**
> **PASS** — `npm run ci` green *with `draft: false` already set*, the chapter's card on the book
> index is a link rather than plain text, and every diagram renders.
> **FAIL** — a green build on a page still marked draft. That build validated nothing.

## 2.6 Record — by hand

Fill `## Open questions` yourself. Set `status: complete` **only** when both hold: the recall was
written closed-book before the explanation layer, **and** the open questions are filled in.

Then `/progress` — it reports first, asks second, writes third.

> **Verify:**
> **PASS** — `## Open questions` has content you wrote.
> **FAIL** — `status: complete` with an empty `## Open questions` and a full `## Dialogue`. That is
> the one inconsistency always worth flagging.

## 2.7 Ship

```bash
/deploy
```

> **Verify:** the probe block in `DEPLOY.md` §6, with its expected-results column. **PASS** — every
> row matches. **FAIL** — any row differs, including a 200 where you expected a 404.

---

# PART 3 · When something goes wrong

**Mechanical** — will not paste, build or render → `/validate`, seconds. `context/md-spec.md` §8
reproduces every error the build can produce, verbatim, with what causes it.

**Substantive** — builds fine and is wrong → `web-chat/reference/troubleshooting.md`.

**The full escalation ladder is in `WORKFLOW.md`** — nine rungs, cheapest first. The three worth
memorising:

- **A green build on a draft page proves nothing.** Flip the flag, then validate.
- **A chapter that had to invent its own structure is a brief defect.** Fix it at `P2` and push it
  with `--outline`; fixing it on the page hides it.
- **A page you could not follow is a defect, not your failure.** Send the section back to the prompt
  that wrote it, and ask for it again in plain words with an example — without changing the claim.

**Two rewrites is the limit.** On the third, start a new chat: the transcript is anchoring everything,
and it has accumulated your own stated positions, which is what sycophancy feeds on.

---

# PART 4 · Forever

**Weekly, ten minutes.** `/ledger` and `node scripts/audit.mjs`. Committed but never started. Past
day 30 with no outcome. Chapters stuck at `generated`. Chapters outside two to ten actions.

**On the schedule.** `/review` — day 3, week 2, week 6, month 3. **Answer from memory first**, then
open the page. A missed one goes to the back of the queue, never treated as a failure.

**End of book.** `P8`, then write the verdict yourself: *changed something · confirmed something ·
entertainment*. All three legitimate; only the first is growth — and the test for it is a ledger row
with `day30: running`, not a feeling.

**Then thirty days before the next book.** Not because the reading needs the gap — because the doing
does.

**Sharing it.** The site is public and meant to be shared (`context/reader.md` §10f) — after the
reading, never instead of it. `GROWTH.md` holds the decisions that are still yours: a domain, titles,
share images, a feed or a newsletter.

---

# Appendix A · Which context file each prompt needs

**Check a chat session against this before you trust its output.** A session holding three of five
inputs generates happily against the two it invented, and the result looks correct.

| | `00-CONTEXT-PACK` | the chapter | its `book.json` node | `chapter-spine` | `md-spec` | `standards` | `source-rules` | `book-spec` |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **P0** setup | ● | | | | | ● | | |
| **P1** select | ● | | | | | | ○ | |
| **P2** brief | ● | ToC + ch. 1 | — | | | ○ | ● | ● |
| **P2b** book page | ● | ToC + preface | the whole `book.json` | | ○ | ● | ● | ● |
| **P3** part A | ● | opening only | ● | ● | | ● | | |
| **P3** part B | ● | ● | ● | ● | ● | ● | ○ | |
| **P4** explain | ● | ● | ● | ● | ● | ● | ● | |
| **P5** argue | ● | ● | ○ | ○ | ○ | ● | | |
| **P6** decide | ● | ● | ● | ○ | | ● | | |
| **P7** recap | ● | ○ | ● | ● | ● | ● | ○ | |
| **P8** ledger | ● | recaps | ● | | | ● | | ○ |
| **P9** review | ● | ○ | | | | ● | | |

● required · ○ helps · blank means do not paste it — it costs context and buys nothing.

**Each prompt repeats its own row**, under a `## Paste with it` heading directly above its fence.
This table stays the authority; the copies exist so the row is visible at the moment you paste.

Two files in `web-chat/prompts/` are not prompts and take no row here. Read
[`spine-map.md`](web-chat/prompts/spine-map.md) — which prompt owns which heading, on a chapter and on
the book page — before you call a chapter finished, and [`recall.md`](web-chat/prompts/recall.md)
between reading and `P4`. Neither is ever pasted into a chat: they are for you.

**In Project mode the whole left half is uploaded once** and the row tells you what still has to be
pasted per turn. **The one that is forgotten most often is column 3**, the chapter's own node from
`book.json`: without `argues`, `clarified`, `verdict` and the book's `gap`, the model invents a shape,
and inventing the shape is the single failure the brief exists to prevent.

**For `P4` on any chapter after the first, also paste the venue list** from the first chapter's
`### What real readers say` — the sweep is done once per book and reused (`context/chapter-spine.md`
§3b).

**`reader.md`, `protocol.md` and the evidence files are never pasted.** The pack carries the operative
parts, and `reader.md` in particular is exactly the memory-profile material that raises agreement
sycophancy — up to **+45%** across five frontier models.

---

# Appendix B · The honesty valve

**If three books in a row say "reading it plainly would have been faster", the system is wrong and
needs changing — not more effort.**

Nothing else in this repository overrides that sentence, and no amount of work already done makes it
untrue.
