# P8 — ledger and synthesis

**Stage 10. End of book, forty-five minutes.**

**Length: 1073 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

## Paste with it

`00-CONTEXT-PACK` ● · every chapter recap ● · the book's `book.json` ● · `standards` ● ·
`book-spec` ○ · the book page's `## Author context` and `## Context then vs. context today` ○ —
`GUIDE.md` Appendix A, which has no column for the book page yet. **A new chat**, not the last
chapter's.

The brief matters here because Part B checks the book against **the questions you wrote before you
opened it**, and those live in `questions[]` where they have sat untouched since Stage 2.

---

````text
[BOOK] is finished. Here are all my chapter recaps and every action.

Work through the four parts in order and STOP AFTER EACH ONE. Part B
depends on what I say about Part A.

PART A — THE ACTIONS, CONSOLIDATED

  Which of these are the same action wearing different words? Merge
  them, say which you merged, and say which wording you kept and why.
  Two actions that would be satisfied by the same behaviour on the
  same evening are one action.

  Which contradict each other? Name the pair and make me choose. Two
  actions that compete for the same slot in the day are in conflict
  even when they sound compatible — say so.

  Which have I already quietly stopped doing? ASK rather than assume,
  one at a time, and take "I don't know" as a no. An action I cannot
  remember whether I did is an action I did not do.

  Which never had a real trigger? Look back at each one: if the
  trigger is a feeling, a time of day I do not reliably observe, or a
  situation that has not occurred since I wrote it, that action was
  never running and the ledger should say so rather than showing it
  as live.

  Then: what is the ONE that carried the most weight? Argue for it
  properly, with the reason, and name your second choice so I can see
  what you were weighing. I decide.

PART B — THE SYNTHESIS

  · What did this book actually argue, in one paragraph, now that I
    have read all of it? Not the blurb, and not what it said it was
    about in chapter one.
  · Which of my opening questions did it answer, which did it not, and
    which turned out to be the WRONG QUESTION? The third category is
    the most useful and the one you will be tempted to skip.
  · Where was it weakest, and did that weakness matter for MY use? A
    book can be badly evidenced in a section I will never act on.
  · What did it CHANGE, as opposed to CONFIRM? Be strict about this.
    Confirmation feels like insight and is not the same thing: if I
    could have written the sentence before reading, it confirmed.
    Ask me for one specific thing I now do or believe differently, and
    do not accept an abstraction.
  · What would I have lost by not reading it? If the honest answer is
    "the confidence to keep doing what I was doing", say that.
  · Where did the author's own circumstances shape the argument in a
    way that matters for me? Start from ## Author context on the book
    page, then pull together what the chapters said about where the
    author was standing. Circumstances explain why a claim looks the
    way it does; they never show that it is wrong.

PART C — WHAT THIS OPENS

  What should I read next because of this — with the reason, not just
  the title. And, more usefully, WHAT SHOULD I NOT READ because this
  covered it. Name the specific books in my universe this makes
  redundant, and say what would have to be true for one of them to
  still be worth opening.

  If this book made a case I should now hear the other side of, name
  the strongest opposing book rather than a complementary one.

PART D — THE BOOK-LEVEL CONCEPT MAP

  One mermaid diagram of the whole argument, with a caption of one or
  two sentences BEFORE it saying what it shows and how to read it.
  Relationships, not nouns, with labelled edges. Chapter-level nodes,
  not idea-level: this is the map of how the book hangs together, and
  the per-chapter maps already exist.

  It follows the chapter concept map's rules, because it is read in
  the same text column:
  · grow down — flowchart TD or mindmap — with no more than about four
    nodes side by side at any level
  · about twelve nodes is a signal to split: a long book gets one map
    per part, each with its own caption
  · labels of about five words; every edge labelled in two to four
    words, saying how the two chapters relate
  · at least one cross-link that is not hierarchy — the late chapter
    that undercuts an early one
  · never hard-code a colour

HOW TO WRITE ALL OF IT

  Complete sentences, not notes. Define any term the first time it
  appears. Where a synthesis point is abstract, give the example from
  the chapter that shows it. Never shorten by compressing, and never
  pad: no recap of the book's chapters in order.

SOURCES

  Anything you state that is not already sourced on a chapter page or
  on the book page — a fact about another book in Part C, a date, a
  number — needs a source. After Part D, list those as rows:
    | Claim | Source | Read on | Tier |
  I append them to the book page's ## Sources. If you cannot source
  one, leave the claim out or mark it [UNVERIFIED: …] with all four
  parts.

CONSTRAINTS

  Do NOT write my verdict. That line is mine.
  Do NOT tell me the book was worth reading.
  Do NOT congratulate me on finishing it.
  If the honest reading of the ledger is that nothing changed, say
  that plainly — it is the most valuable output this stage can produce
  and the least likely to be volunteered.

  MISSING INPUTS. If I have not given you every action, say how many
  chapters you can see and which are absent, then stop. Part A is a
  consolidation and a consolidation of a subset is worse than none —
  it will merge two actions that are not duplicates and miss the pair
  that is. If my opening questions are not above, ask for them rather
  than reconstructing what I probably wanted to know. If the book
  page's Author context is not above, say so before the last bullet of
  Part B rather than rebuilding a biography from memory.
````

## What lands on the page

The **book's** `index.mdx`, not a chapter's:

| From | Lands |
|---|---|
| Part B | The material **you** write `## What it changed` from. `P8` stops before the verdict, and the line is yours |
| Part D | The book-level map, with its caption, **under your verdict in `## What it changed`** — `book-spec.md` §6. Never under a new `##` |
| The source rows after Part D | **Appended** to the book page's `## Sources`, below the rows `P2b` wrote |
| Part A | Merges and corrections go back into the chapters' `actions:` frontmatter, where the ledger reads them |

Nothing here writes a chapter section. If Part B produced something that belongs on a chapter page,
it belongs in that chapter's `## Open questions`, and you write it.

## Landed / Did not

| | |
|---|---|
| **Landed** | It named a pair of actions that compete for the same slot in the day and made you choose |
| **Did not** | It consolidated by theme. Two actions on "focus" are not duplicates; two satisfied by the same behaviour on the same evening are |
| **Landed** | It asked, one at a time, which you had quietly stopped — and took "I don't know" as a no |
| **Did not** | It assumed. An action you cannot remember whether you did is an action you did not do |
| **Landed** | It found a question that turned out to be the **wrong question** |
| **Did not** | Every opening question neatly answered. That category is the most useful one and the first to be skipped |
| **Landed** | It was strict about changed-versus-confirmed and made you name one specific thing |
| **Did not** | It accepted an abstraction. If you could have written the sentence before reading, it confirmed |
| **Landed** | It named which books this makes redundant |
| **Did not** | A reading list. "What should I not read" is the more useful half and the one that does not get volunteered |
| **Landed** | Part B tied a circumstance from `## Author context` to a specific feature of the argument |
| **Did not** | *"His background explains why he got this wrong."* Circumstances used as a refutation |
| **Landed** | Part D reads inside the column, with a caption before it, or is split by part |
| **Did not** | One wide map of every chapter, legible only after Expand |

## If it comes back wrong

````text
You told me the book was worth reading. That line is mine and it is
one of three — changed something, confirmed something, entertainment.
Give me the ledger evidence for each and stop.
````

````text
You merged those by topic, not by behaviour. Two actions are one only
if the same act on the same evening satisfies both. Redo Part A on
that test and say which merges you are withdrawing.
````

## The verdict is yours, and it is one of three

**changed something · confirmed something · entertainment**

All three are legitimate. **Only the first is growth**, and a shelf where every book "changed
something" is a shelf that has stopped being measured.

The test for "changed something" is not a feeling: it is a row in the ledger with `day30: running`
and a date on it. If nothing is running, the honest verdict is one of the other two, however good
the book was.

## Then, in Claude Code

```bash
/progress      # writes the book profile and reader-profile.md
/ledger        # reports the drift between actions and their day-30 outcomes
```

`/progress` **asks before it writes**. It never fills a cell by inference — an empty cell is a known
gap and a guessed one is indistinguishable from a real answer.
