---
name: progress
description: Read the reader profile and the book profiles, report what is due, then ASK the questions needed to bring them up to date and write the answers in. Use when he says "where am I", "what's due", "update my profile", after a chapter is read, or at the start of a session to orient.
---

# /progress — read the records, then update them by asking

**You maintain `reader-profile.md`, `context/reader.md` and
`context/books/<domain>/<cluster>/<book>.md.`** Most updates happen because he asked for one, or
because something was read and the record is now behind.

> **Never write a cell you did not read in a file or hear from him this session. Ask, then write.
> An unasked cell stays empty.**

An empty cell is a known gap. A guessed one is indistinguishable from a real answer, and every
decision downstream is made against it.

## The three files

| File | Holds | Written when |
|---|---|---|
| `reader-profile.md` | The cross-book ledger: currently reading, one row per chapter, books finished with their verdict, books dropped | A chapter is drafted or read · a book finishes or is dropped |
| `context/books/<d>/<c>/<b>.md` | One book: why now, the gap, chapter state, actions committed, open questions | Same triggers, plus any brief amendment |
| `context/reader.md` | Who he is, in his own words: what he is here for, what a usable answer looks like, the standing instructions. **There is no sitting budget and there never was one** — he rejected the premise on 2026-08-31. **§10 holds his instructions of 2026-09-14** | Rarely — only when he says one of those changed |

## What you report, before asking anything

1. **Due or overdue**, oldest first — day 3, week 2, week 6, month 3 from the date an action
   started. `/review` computes this; read it rather than recomputing.
2. **Chapters stuck** — `status: generated` or `recalled` for more than a week. The drafts' own
   failure mode: *"chapters accumulate, three weeks later the site is a graveyard."*
3. **Actions committed with no obstacle named.** Reconciliation row 10.
4. **Books with more than one committed `now`.** Row 2.
5. **Chapters outside two to ten actions.** `node scripts/audit.mjs` lists them. Amendment A.
6. **A started book whose book page is still `TODO`** — `## Author context` or
   `## Context then vs. context today` unwritten. `P2b` is due before chapter one
   (`context/book-spec.md` §6).
7. **Open questions older than a week** — each either gets asked in the book's Project or deleted as
   not actually important.
8. **The next unread chapter** in `sidebar.order`.

Then say what to paste.

## Then ask — facts only, never self-assessment

At most four or five questions, in one turn, and **only about cells that are actually empty and
actually used.**

| Ask this | Never this |
|---|---|
| *"Did you write the recall before opening the explanation layer?"* | *"Do you feel you got it?"* |
| *"How many minutes did chapter 4 actually take?"* — he tracks reading time, so this is a number he can read off | *"Did that feel about right?"* |
| *"What did you actually do differently in the last week?"* | *"Is it working?"* |
| *"Is this a knowledge gap or an execution gap?"* | *"How motivated are you?"* |

**Fluency is not comprehension and the gap is invisible from the inside.** A question about a
judgment is worthless; a question about a thing he did is the only way the record gets filled.

## What you write, and what you never write

**Write:** anything derivable from a file — chapter slugs, parts, estimates and verdicts from
`book.json`, domain and cluster from `context/universe.md`, statuses from frontmatter, review dates
computed from a start date. **Anything he just told you**, attributed to the date he told you.

**Never write:**

- **An action, or an obstacle.** `P0`'s one rule: *"You may NOT decide what I do about my life."*
  The AI proposes candidates and attacks a draft. It never writes the commitment.
- **`Effort`.** Measured minutes. Pre-filling it from the estimate writes 30 = 30 and destroys the
  one comparison the column exists to make.
- **`read`.** It ticks only when both hold: the recall was written closed-book, **and**
  `## Open questions` was filled in. Ask both.
- **A verdict on a book.** *changed something / confirmed something / entertainment* is his call.
- **Anything into a chapter's body, or into a comment.** His comments are his, written only by the
  dev server (`context/md-spec.md` §5d). **A comment is not a record either** — never lift one into
  `reader-profile.md` or a book profile unless he asks for that one.

Mark what you could not resolve `[ASSUMPTION: …]`, saying what changes if it is wrong.

**These questions are still open and must not be filled by inference** (`context/reader.md` §8):

| Unknown | Ask before |
|---|---|
| What he has already tried and abandoned | the first book chosen for a `gap: execution` |
| Whether his time tracker is a physical record | the first committed action, if it matters. Harkin's effect is larger when the record is physical, and *"time tracker"* most likely means an application — that was not asked and is not inferred |
| **Whether 30 opinions is still the right floor** for `### What real readers say` | after the **second** chapter's `P4` — he kept the default on 2026-09-14 and asked to revisit it then |

**Decided on 2026-09-14, and not to be re-asked:** *"Only put things that earns"* means *earns its
place*; comments publish by default, **except in `relationships-…`, `love-…` and `money-and-wealth`,
where a new comment starts local.**

**The growth decisions are not yours to ask about here.** `GROWTH.md` holds them with
recommendations; raise them only when he brings up sharing, a domain or a newsletter.

**Never treat an overrun as a finding.** *"if a chapter is 10 hour or unlimited long, you do it…
Nothing happens if i don't finish a chapter."* 120 minutes against an 85-minute estimate is data
about the estimate, and nothing else. `context/reader.md` §2.

## Rules

- **Absolute intervals only.** Never "after N more chapters".
- **A missed review is not a failure.** Say so. Push it to the back of the queue.
- **Report before you write.** He sees the current state, then the questions, then what changed.
  Never a silent edit.
- **Never ask him to picture the outcome.** Positive fantasy predicts worse attainment; it is the
  strongest negative finding in the evidence base and nothing here may contradict it.
