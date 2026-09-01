# P2 — the whole-book brief

**Stage 2. Once per book, thirty minutes.** Output is `book.json`.

**Length: 690 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

**Do the inspectional pass FIRST, with the AI off.** Twenty minutes: contents, index, first and last
chapter, skim the rest. Write your 3–5 questions **before** you paste anything. Questions written
afterwards are a summary of what you found, not a shape for what you were after.

> **This is the stage that decides everything downstream.** Order, weight, what each chapter argues,
> whether it is clarified at all — all of it is fixed here. `chapter-spine.md` opens by saying
> generation decides nothing, and a chapter that had to invent its own structure is evidence that
> this brief was incomplete.

---

````text
Here is the table of contents and the first chapter of [BOOK].

Produce the brief as a single JSON object matching context/book-spec.md.
Nothing outside the fence.

WHAT I NEED FROM YOU

1 · THE CHAPTER MAP
    Every chapter: what it ARGUES in one line — a claim, not a topic.
    "Chapter 4 covers scheduling" is a topic. "Depth has to be
    scheduled because it never happens by default" is a claim. The
    test: could someone disagree with the sentence you wrote? If not,
    it is a topic.

    Plus, for each chapter:
      weightInArgument   load-bearing / supporting / illustrative
      estMinutes         an honest reading estimate
      verdict            deep-dive / skim
      clarified          true / false, deliberately (see 4)

    weightInArgument is not a rating. A brilliant chapter can be
    illustrative and a dull one load-bearing. Ask: if this chapter
    were removed, would the book's argument still stand?

    estMinutes is DESCRIPTIVE — what it will cost me, not a cap. There
    is no length budget in this system, so do not shrink an estimate
    to make a book look manageable. An estimate that turns out to be
    wrong is data about the estimate.

2 · THE REPETITION MAP
    Which ideas appear in several chapters and could have been one?
    Name the chapters and the idea. Knowing this in advance stops me
    thinking I have missed something new when I have met it three
    times — and it is the single most common shape in this genre.

3 · WHAT TO SKIP, AND WHY
    Every chapter goes in "chapters" or in "antiChapters" with a
    REASON FOR ME SPECIFICALLY. There is no third bucket, and silence
    is not a decision. read + skipped must equal the total, and the
    scaffolder asserts that arithmetic and refuses if it does not
    balance.

    A reason for me is "I already do not use social media, so this
    would be confirmation rather than change". A reason in general is
    "this chapter is weak". Give me the first kind.

    An empty antiChapters on a long book means you gave me a table of
    contents rather than a decision.

4 · WHICH CHAPTERS NEED CLARIFYING
    Set clarified: false wherever the material is familiar enough that
    I should read the original instead. Default to false and justify
    each true. A summary preserves the idea and deletes the examples,
    repetition and specificity that made it actionable — and those are
    the machinery, not the packaging.

    clarified: false does NOT mean less work. Pre-context is still
    written, the explanation layer still runs in full, and the core
    message and key points move to after my closed-book recall rather
    than before it.

5 · THE OUTSIDE VIEW
    replication  — what in this book has failed to replicate or been
                   walked back, named study by named study
    critics      — who disagrees, and their STRONGEST point
    agedBadly    — what was true at publication and is not now

    Verify every citation. WHERE IT IS THIN, SAY SO — do not
    manufacture consensus. Stopping rule: at least three independent
    sources, none of them the book, its publisher, or the author's own
    site; at least one an actual critic. If twenty minutes of looking
    produces no substantive critic, write that down as the finding.

6 · THE EXIT CONDITION
    What must be observably TRUE for this book to be finished. Not
    "understand deep work better". Something I could fail, with a
    count or a date in it. For a reference book this measures USE, not
    coverage. For a lifelong book the honest value is that there is no
    exit, said in a sentence.

7 · THE PARTS
    Group the chapters. Each part gets an "outcome": one sentence,
    starting with a verb, saying what I can DO after it. If two parts
    have the same outcome they are one part.

MY QUESTIONS, written before I opened it:
  1. [...]
  2. [...]
  3. [...]

Carry them into the brief verbatim. Do not improve them, do not merge
them, and do not answer them here.

FORMAT

One JSON object. No prose before or after it. Every chapter slug
kebab-case and derived from its title, "order" a unique integer
starting at 1, every chapter's "part" declared in "parts".
````

---

## Then

Save it to `<domain>/<cluster>/<book>/book.json` and run:

```bash
node scripts/new-book.mjs <domain> <cluster> <book>
node scripts/new-chapters.mjs <domain> <cluster> <book>
```

The script validates the whole brief before writing anything and prints every problem at once. **A
refusal is a brief defect, not a scripting problem** — take the list back here rather than patching
the JSON past a check. `book-spec.md` §3b reproduces every refusal message it can produce, so a
brief can be checked against them before the script is ever run.

## Amending it later

A brief is not a single event. When a chapter turns out to argue something different, edit
`book.json` and push it to the pages that already exist:

```bash
node scripts/new-chapters.mjs <d> <c> <b> --outline
```

**Never edit between the `OUTLINE` markers by hand** — the next `--outline` discards it silently.
`book-spec.md` §3c has the three doors and what each refuses.
