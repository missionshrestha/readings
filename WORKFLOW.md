# WORKFLOW — the division of labour

Read every session. If a stage takes longer than the budget below, **that is the finding and it gets
reported**, not absorbed.

> **THE BUDGETS BELOW COVER THE MACHINE, NEVER THE READING.**
>
> Every number in this file is the cost of running a prompt, pasting a result, validating a build or
> publishing a page. **Reading and recall are deliberately uncapped**, on his own instruction:
>
> > *"No you generate what you generate, there shouldn't be any hard limit on that, if a chapter is
> > 10 hour or unlimited long, you do it, I read usually 30 mins a day on weekdays and 60 mins on
> > weekends. Nothing happens if i don't finish a chapter or section or cover multiple chapters."*
> > — `context/reader.md` §2, his words, 2026-08-31
>
> A chapter is not sized to a sitting. **A sitting is where reading stops, not where a chapter
> ends**, and a chapter that takes three sittings has cost nothing. The reading figures below are
> **observations of his own pace**, recorded so an estimate has something to be measured against —
> they are not targets and nothing anywhere may treat an overrun as a failure.

---

## The principle

**Put each piece of work where its feedback loop is.**

Screening a book needs search and no filesystem → web chat. Explaining a chapter needs the chapter
and nothing else → web chat, where prose is cheapest. Validation needs the filesystem and the build
→ Claude Code, always. Structure and deployment need the filesystem → Claude Code.

---

## The split

| Work | Tool | Frequency |
|---|---|---|
| Select the next book | **Web chat** · `P1` | Between books |
| Brief the book | **Web chat** · `P2` | Per book |
| Scaffold the chapters | **Claude Code** · `/scaffold` | Per book |
| **Orient, clarify, explain, argue, decide, recap** | **Web chat** · `P3`–`P7` | Every chapter |
| **Read it. Recall it closed-book.** | **You** | Every chapter |
| Paste it in | **You** | One paste |
| **Validate** | **Claude Code** · `/validate` | Every chapter |
| Records | **Claude Code** · `/progress` | Every chapter |
| Ledger drift | **Claude Code** · `/ledger` | Weekly |
| Ship | **Claude Code** · `/deploy` | Every chapter |

**Claude Code never authors a chapter.** Asked to, it declines and offers to validate instead.

---

## The chapter loop

| # | Step | Where | Cost | Kind |
|---|---|---|---|---|
| 1 | `P3` **part A** — `## Pre-context`. Every chapter | Web chat | 2 min to run | machine |
| 2 | `P3` **part B** — the rebuild. **Only when `clarified: true`** | Web chat | 3 min to run | machine |
| 3 | **Read it** — the original wherever you can | You | **uncapped** | reading |
| 4 | **`## Recall`, closed book** | **You** | **uncapped**, ~10 min typical | reading |
| 5 | `P4` explain, and it marks your recall | Web chat | 3 min to run | machine |
| 6 | **Read the explanation** | You | **uncapped** | reading |
| 7 | `P5` argue — **question first, position second** | Web chat | as long as it takes | reading |
| 8 | `P6` decide — menu, then you write one sentence | Web chat | 10–15 min | mixed |
| 9 | `P7` recap, paste, `/validate` | Both | **10 min, and this one IS a ceiling** | machine |
| 10 | Fill `## Open questions`, set `status: complete` | **You** | 5 min | reading |
| | **Machine total** | | **~25 min** | |

**Only the machine rows have ceilings, and step 9 is the one that matters.** If pasting and
validating a chapter regularly costs more than ten minutes, something in the toolchain is wrong and
it gets reported — that is a defect in this repository, which is the half that can actually be
fixed.

**Step 4 is not optional and not compressible.** A generated chapter is not a read chapter.
Generation is minutes; reading and recall are the hours. **If that ratio ever inverts, the pipeline
has become the hobby.**

### The ratio, which is the only number here worth watching

| | |
|---|---|
| Machine time per chapter | ~25 min |
| Reading time per chapter | whatever it takes |
| **The finding** | **If machine time approaches reading time, stop and say so.** The drafts name building the site as *"the most sophisticated procrastination available to me"*, and this ratio is how that shows up in the data rather than in a feeling |

---

## The rules

1. **Both the reading and the recall, every chapter.** They are not interchangeable.
2. **One book at a time.** Two in progress means zero finished.
3. **Four-week ceiling.** Beyond that it is the wrong book — a signal, not a character failure.
4. **Extraction is uncapped. Commitment is ONE.** Reconciliation row 2.
5. **You write every commitment yourself, and you name the obstacle.** Rows 10 and `P0`.
6. **Publish before moving on.** No chapter is done until its page is live.
7. **Answer the previous recap from memory before opening it.** Row 7 — retrieval, not rereading.
8. **Open the original for the passages that matter.** A clarified chapter is a lens, and a lens can
   distort.
9. **A missed day is not a broken streak.** Resume tomorrow, same chapter.
10. **Dropping a book is a decision, not a failure.** One line on the book page: where, and why.
11. **Thirty days before the next book.** Not because the reading needs it — because the doing does.

---

## The loops

**REVIEW — day 3 · week 2 · week 6 · month 3**, absolute, from the date an action started. Never
"after N more chapters". `/review` computes it and **serves the question, not the answer**: answer
from memory, then open the page. A missed review goes to the back of the queue.

**LEDGER — weekly, ten minutes.** `/ledger` reports the drift: committed but never started, past day
30 with no outcome, more than one `now` per book, committed with no obstacle. **Record the failures.**

**AUDIT — `node scripts/audit.mjs`.** The **four** build controls plus anything stuck at `generated`
for more than a week, duplicate action ids, books with more than one committed `now`, committed
actions with no obstacle, and unknown `status` values.

**PROMPT LENGTH — `node scripts/prompt-words.mjs`.** Not on a schedule; run it after touching a
prompt. Every body must clear 500 words, and on 2026-08-31 none of the ten did.

---

## Definitions of done

| Thing | Done when |
|---|---|
| **A chapter is generated** | It builds, every link resolves, and it is live |
| **A chapter is READ** | You wrote the recall closed-book **before** the explanation layer, and filled `## Open questions` yourself. Not "read it". Not "the page looks good" |
| **A book is done** | Every chapter in the brief is read or explicitly skipped, the ledger has its actions, and the verdict is written |
| **An action is real** | It has a trigger, an obstacle, a start date, and a day-30 outcome — **including if that outcome is "dropped"** |

---

## What was cut, and why

Recorded so it is not rebuilt by someone who cannot see the harm.

| Cut | Reason |
|---|---|
| Reading the AI's version of every chapter | On familiar material a summary deletes the machinery. `clarified` is now per chapter |
| "No cap" on committed actions | Adding intentions divides the same attention rather than raising the conversion rate |
| Whole-book uploads | Lost-in-the-middle: >30% degradation for material in the middle |
| A streak, a badge, a completion percentage | The evidence wants a person and a physical record. Simulating accountability is worse than admitting there is none |
| Book and chapter counters | *"The ledger is the metric. The count is vanity."* |
| Rereading the previous recap | Retrieval beats rereading, and the drafts cited the retrieval study in support of rereading |
| A per-section word budget, and a rate table converting words to minutes | **He rejected the premise.** There is no length budget; `estMinutes` is descriptive. Building one would have imported a constraint he explicitly declined — `context/reader.md` §2 |
| Deciding on his behalf what does and does not apply to him | *"you don't remove, alter the things that author wanted to say for original intent, you can give extra instead."* The transfer question is additive. §4 |

---

## When a step goes wrong — the ladder

Work down it. Each rung costs more than the one above, and stopping at the right rung is most of the
skill.

| # | Symptom | Do this | Not this |
|---|---|---|---|
| 1 | The paste does not build | Read the error. `md-spec.md` §8 reproduces every one the build can produce, verbatim, with what causes it | Rewriting the chapter |
| 2 | The build is green and the page looks wrong | **Flip `draft: false` and validate again.** A draft page's MDX is compiled by nothing — a clean build over a draft proves nothing at all. `CLAUDE.md` fact 11 | Believing the green build |
| 3 | A link fails on a path you know is correct | It is `/shelf/`, `/ledger/` or `/review/`. They are `.astro` pages the validator cannot see, and they are enumerated in `astro.config.mjs`. A fourth computed view must be added there | Deleting the link |
| 4 | A control refuses | Read what it says. All four name the file, the reason and the fix. `scripts/guards.mjs` | Working around it |
| 5 | The chapter had to invent its own structure | **The brief was incomplete.** Go back to `P2`, amend `book.json`, and push it with `--outline`. That defect is upstream and fixing it on the page hides it | Patching the page |
| 6 | The web-chat session produces the wrong shape | It is working from a stale copy of `00-CONTEXT-PACK.md`. Ask it the five verification questions; re-upload the Project knowledge files | Correcting it turn by turn |
| 7 | Three chapters in a row produced no pushback | A finding about the transcript, not the book. Reach for the **Contrarian** toggle and say so in `## Dialogue` | Continuing |
| 8 | You have spent more time on the machine than on the book | **Stop and say so.** This is rung 8 because it is the one nobody escalates | Adding a feature |
