# P2 — the whole-book brief

**Stage 2. Once per book, thirty minutes.** Output is `book.json`.

**Length: 2406 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

**Do the inspectional pass FIRST, with the AI off.** Twenty minutes: contents, index, first and last
chapter, skim the rest. Write your 3–5 questions **before** you paste anything. Questions written
afterwards are a summary of what you found, not a shape for what you were after.

> **This is the stage that decides everything downstream.** Order, weight, what each chapter argues,
> whether it is clarified at all — all of it is fixed here. `chapter-spine.md` opens by saying
> generation decides nothing, and a chapter that had to invent its own structure is evidence that
> this brief was incomplete.

> **The dates are decided here too, since 2026-09-14.** `published` and `editions` are required on
> all three kinds, the scaffolder refuses a brief without them, and every page of the book displays
> them. He asked for it: *"Every book must display its original release date, along with any major
> updates or version dates (major changes only)."* They are verified with search, like the outside
> view — a date copied from memory is displayed on every page of the book. `book-spec.md` §2,
> `source-rules.md` §2b.

**Two blocks below. Use the one that matches `kind`.** Block A is for `kind: read` — a book worked
front to back, one page per chapter. Block B is for `reference` and `lifelong`, which carry **no
chapters, no parts, no inventory and no antiChapters** — and which are **103 of the 293 books** on
the shelf. Running block A on a reference book produces a chapter map for something that has no
chapter pipeline.

## Paste with it

`00-CONTEXT-PACK` ● · the ToC and chapter 1 ● · `source-rules` ● · `book-spec` ● · `standards` ○ —
`GUIDE.md` Appendix A. **Search on**, for section 4 — the outside view — and section 7, the dates.

---

## Block A — `kind: read`

````text
Here is the table of contents and the first chapter of [BOOK].

Produce the brief as a single JSON object in the shape at the foot of
this message. Nothing outside the fence.

WHAT I NEED FROM YOU

1 · THE CHAPTER MAP
    Every chapter: what it ARGUES in one line — a claim, not a topic.
    "Chapter 4 covers scheduling" is a topic. "Depth has to be
    scheduled because it never happens by default" is a claim. The
    test: could someone disagree with the sentence you wrote? If not,
    it is a topic.

    Plus, for each chapter:
      weightInArgument   load-bearing / supporting / illustrative
      estMinutes         an honest reading estimate, an integer
      verdict            deep-dive / skim
      clarified          true / false, deliberately (see 3)

    weightInArgument is not a rating. A brilliant chapter can be
    illustrative and a dull one load-bearing. Ask: if this chapter
    were removed, would the book's argument still stand?

    estMinutes is DESCRIPTIVE — what it will cost me, not a cap. There
    is no length budget in this system, so do not shrink an estimate
    to make a book look manageable. An estimate that turns out to be
    wrong is data about the estimate.

    SECTIONS THE BOOK PRINTS WITHOUT A NUMBER are part of the chapter
    map too: an Introduction, a Prologue, a Conclusion, an Epilogue,
    an Afterword, and a foreword by another writer. Each gets an entry
    with every field above, plus:
      label   exactly the word the book prints — "Introduction",
              "Conclusion", "Prologue", "Epilogue", "Afterword",
              "Foreword"
    Its title is NOT that word. It says what the section argues, like
    any other title, and the site shows "Introduction · <title>".
    Numbered chapters carry NO label. The site numbers them 1, 2, 3…
    counting only the unlabelled chapters, in "order", so its "Ch 1"
    is the book's printed Chapter 1. If the book's own numbering would
    not come out that way — a Chapter 0, or two numbering sequences —
    stop and tell me rather than guessing.
    Acknowledgements, notes, bibliography, index and "about the author"
    are not chapters. Leave them out and do not count them.

2 · WHAT TO SKIP, AND WHY
    Every chapter goes in "chapters" or in "antiChapters" with a
    REASON FOR ME SPECIFICALLY. There is no third bucket, and silence
    is not a decision. An Introduction or a Conclusion counts exactly
    like a chapter: in "chapters" with its label, or in "antiChapters"
    under its printed name with a reason.

    A reason for me is "I already do not use social media, so this
    would be confirmation rather than change". A reason in general is
    "this chapter is weak". Give me the first kind.

    An empty antiChapters on a long book means you gave me a table of
    contents rather than a decision.

3 · WHICH CHAPTERS NEED CLARIFYING
    Set clarified: false wherever the material is familiar enough that
    I should read the original instead. Default to false and justify
    each true. A summary preserves the idea and deletes the examples,
    repetition and specificity that made it actionable — and those are
    the machinery, not the packaging.

    clarified: false does NOT mean less work. Pre-context is still
    written, the explanation layer still runs in full, and the core
    message and key points move to after my closed-book recall rather
    than before it.

4 · THE OUTSIDE VIEW
    replication  — what in this book has failed to replicate or been
                   walked back, named study by named study
    critics      — who disagrees, and their STRONGEST point
    agedBadly    — what was true at publication and is not now

    Verify every citation. WHERE IT IS THIN, SAY SO — do not
    manufacture consensus. Stopping rule: at least three independent
    sources, none of them the book, its publisher, or the author's own
    site; at least one an actual critic. If twenty minutes of looking
    produces no substantive critic, write that down as the finding.

    If the book leans on priming, ego depletion, power posing,
    learning styles, the 10,000-hour rule or handwriting-beats-typing,
    that belongs in "replication" whether the book admits it or not.

    This is a three-line digest. The long form is written later, on
    the book page, and where the two disagree the page wins.

5 · THE EXIT CONDITION
    What must be observably TRUE for this book to be finished. Not
    "understand deep work better". Something I could fail, with a
    count or a date in it.

6 · THE PARTS
    Group the chapters. Each part gets an "outcome": one sentence,
    starting with a verb, saying what I can DO after it. If two parts
    have the same outcome they are one part.

7 · THE DATES — search on, and every date sourced
    published   the ORIGINAL release, not the printing I happen to
                hold: a year ("2016"), a month ("2016-01") or a day
                ("2016-01-05"). For a work older than print, the
                approximate composition date, written "c. 170–180 CE",
                with the first printed edition in "editions".
    editions    MAJOR revisions only, oldest first. A major revision is
                a revised edition with chapters added or removed, a
                substantially updated evidence base, or an afterword
                that changes the argument. A paperback, a new cover or
                a corrected typo is NOT a version. Each entry:
                  date     same formats as "published"
                  label    what that edition is called
                  change   what materially changed — never just
                           "revised"
                  source   the publisher's page, the new edition's
                           preface, or the author's announcement
                [] is a real answer when a search found no major
                revision. Say that outside the fence.
    For a translated work, the translation I am reading IS an edition:
    its translator and year go in "editions".
    Acceptable sources for "published": the publisher's page, a
    national library or WorldCat record, the copyright page. Never
    from memory — this date is displayed on every page of the book.

MY QUESTIONS, written before I opened it:
  1. [...]
  2. [...]
  3. [...]

Carry them into the brief verbatim. Do not improve them, do not merge
them, and do not answer them here.

THE SHAPE — every key below is required and the scaffolder REFUSES
the whole brief if one is missing. Enums are exhaustive; anything else
is a refusal, not a near miss.

  {
    "slug":          "kebab-case, and it must equal the directory name",
    "title":         "the book's title",
    "author":        "the author",
    "published":     "2016 | 2016-01 | 2016-01-05 | c. 170–180 CE",
    "editions": [
      { "date":   "same formats as published",
        "label":  "what the edition is called",
        "change": "what materially changed",
        "source": "https://… where you read it" }
    ],
    "domain":        "must equal the domain directory",
    "cluster":       "must equal the cluster directory",
    "clusterNumber": "1.3",
    "tier":          "core | deepen | reference",
    "weight":        "S | M | L",
    "kind":          "read",
    "gap":           "knowledge | execution",
    "familiarity":   "new | familiar | expert",
    "whyNow":        "one line, and it is mine, not yours",
    "questions":     ["3 to 5, verbatim, written before reading"],
    "outsideView":   { "replication": "", "critics": "", "agedBadly": "" },
    "parts": [
      { "slug": "kebab-case",
        "title": "2-5 words, sentence case",
        "order": 1,
        "outcome": "One sentence, starting with a verb." }
    ],
    "chapters": [
      { "slug": "kebab-case, derived from the title, unique",
        "title": "the book's own chapter title, 9 words or fewer — for a labelled section, what it argues, never the label itself",
        "order": 1,
        "label": "ONLY on a section printed without a number: Introduction | Conclusion | Prologue | Epilogue | Afterword | Foreword. Omit the key on a numbered chapter",
        "part": "a slug that appears in parts[]",
        "argues": "one line, a CLAIM someone could disagree with",
        "weightInArgument": "load-bearing | supporting | illustrative",
        "estMinutes": 30,
        "verdict": "deep-dive | skim",
        "clarified": false }
    ],
    "antiChapters": [
      { "title": "as printed", "reason": "a reason FOR ME" }
    ],
    "inventory": { "chapters": 7, "read": 6, "skipped": 1 },
    "exitCondition": "observable, with a count or a date in it"
  }

DO THIS ARITHMETIC BEFORE YOU EMIT, AND SHOW IT TO ME:
  inventory.read    === chapters.length
  inventory.skipped === antiChapters.length
  read + skipped    === inventory.chapters, the book's real total,
                        counting every labelled section (Introduction,
                        Conclusion…) as a chapter

WHAT WILL BE REFUSED, so check it here rather than there:
  · a chapter with verdict "skip" inside "chapters" — a skipped
    chapter belongs in "antiChapters", and this is the single most
    common refusal
  · "order" not an integer, not unique, or not starting at 1. It is
    global across the book, never per part, and it counts labelled
    sections too: an Introduction is order 1, the book's Chapter 1 is
    order 2
  · a chapter "part" that is not a slug in "parts"
  · a "label" that is empty, carries a number ("Chapter 1", "Part 2"),
    or is the same word as the title. The label only replaces the
    number; the title still says what the section argues
  · a part slug that is not kebab-case, or a part with no "outcome"
  · "clarified" absent — it must be a deliberate true or false, not a
    default nobody looked at
  · fewer than three "questions"
  · an antiChapter with no "reason"
  · slug, domain or cluster disagreeing with the directory. The path
    is the truth and the JSON is what gets corrected
  · "published" absent, or not a year, a month, a day or an
    approximate date like "c. 170–180 CE"
  · "editions" absent or not an array — write [] when there are none
  · an edition with no "date", with an unreadable one, or with no
    "change"
  REPORTED, NOT REFUSED: an edition with no "source". A date nobody
  can check is a date that drifts, so give one anyway.

FORMAT

One JSON object, in a four-backtick fence, and NOTHING else inside it.
Then, OUTSIDE that fence and clearly labelled "not part of book.json":

  THE DATE SOURCES — where you found "published", as a link, and a
  sentence saying whether a search found any major revision. These
  become rows on the book page later.

  THE REPETITION MAP — which ideas appear in several chapters and
  could have been one? Name the chapters and the idea. This is a
  reading aid, it has no field in the schema, and it must not be
  emitted as a key. Knowing it in advance stops me thinking I have
  missed something new when I have met it three times, and it is the
  single most common shape in this genre.

MISSING INPUTS — NAME THEM AND STOP

If you do not have the full table of contents, say so and stop: an
invented chapter list is the one defect that survives every check
downstream, because every later prompt trusts this file. If you do not
have search, say so — section 4 is not written from memory, and
neither are the dates in section 7. If I have not given you my
questions, ask for them; do not write three plausible ones.
````

---

## Block B — `kind: reference` or `kind: lifelong`

**No chapter pipeline exists for these.** A reference book gets one page and a dated problem-to-answer
log; a lifelong book gets one page and a dated log, with no actions and no rating. **Both still get
the dates, and a book page with `## Author context` and `## Context then vs. context today`.**

````text
Here is the table of contents and the opening of [BOOK]. This book is
kind: [reference | lifelong]. It gets ONE page and a dated log, not a
chapter pipeline.

Produce a single JSON object in this shape. There are NO "chapters",
NO "parts", NO "inventory" and NO "antiChapters" — a scaffolder given
any of them for this kind will refuse the brief.

  {
    "slug":          "kebab-case, equal to the directory name",
    "title":         "",
    "author":        "",
    "published":     "2016 | 2016-01 | 2016-01-05 | c. 170–180 CE",
    "editions": [
      { "date": "", "label": "", "change": "", "source": "https://…" }
    ],
    "domain":        "must equal the domain directory",
    "cluster":       "must equal the cluster directory",
    "clusterNumber": "1.3",
    "tier":          "core | deepen | reference",
    "weight":        "S | M | L",
    "kind":          "reference | lifelong",
    "gap":           "knowledge | execution",
    "familiarity":   "new | familiar | expert",
    "whyNow":        "one line, mine",
    "questions":     ["3 to 5, written before reading"],
    "outsideView":   { "replication": "", "critics": "", "agedBadly": "" },
    "exitCondition": ""
  }

published, editions, gap, questions and exitCondition are required on
ALL THREE kinds.

THE DATES work exactly as they do for a read book, and search is on
for them. "published" is the ORIGINAL release, sourced from the
publisher, a library record or the copyright page — never from memory.
"editions" holds MAJOR revisions only, oldest first, each with date,
label, change and source; [] when a search found none, and say so. For
a translated work the translation I am reading is an edition, with
its translator and year. For a work older than print, "published" is
the approximate composition date, like "c. 170–180 CE", and the first
printed edition goes in "editions".

gap and questions work exactly as they do for a read book.
exitCondition does not:

  FOR kind: reference
    exitCondition measures USE, not coverage. "I have read it" is not
    an exit condition for a book nobody reads front to back. Give me
    something with a count of TIMES CONSULTED, or a class of problem I
    can say I now reach for this book to answer.

  FOR kind: lifelong
    The honest exitCondition is that there is none, and I want that
    said in a sentence rather than dressed up. Something of the shape
    "None. This book is never finished, and a page that implied
    otherwise would be lying." Do not invent a finish line to fill the
    field.

THEN, OUTSIDE the fence, tell me three things:

  · THE DATE SOURCES — where you found "published", and whether a
    search found any major revision.
  · WHAT KIND OF QUESTION this book actually answers well, so I know
    when to reach for it. Name the class, not the topic.
  · WHICH BOOKS ON MY SHELF this makes redundant, if any, and what
    would have to be true for one of them still to be worth opening.

Do NOT produce a chapter map, a reading order, or a schedule. Do NOT
tell me it is a classic. If you do not have the contents or do not
have search, say which and stop.
````

---

## What lands on the page

`book.json`, at `<domain>/<cluster>/<book>/book.json`. It produces no `.mdx` section directly — but
every page in the book is scaffolded or rendered from it, and five of its fields reach every chapter:

| Field | Reaches |
|---|---|
| `published` · `editions` | **The dates line** under the book page's title and beside the book's name on every chapter page — rendered by the page chrome, **never typed into the MDX** |
| `argues` | the chapter's `description`, and the `OUTLINE` region on the page |
| `clarified` | whether `## The clarified chapter` exists at all, and who produces sections 2 and 3 |
| `weightInArgument` × `verdict` | how deep the explanation layer goes — `chapter-spine.md` §8 |
| `gap` | whether the explanation layer or the action stages carry the weight |

The repetition map, the date sources and block B's questions land nowhere in the schema. Keep them
with your notes: `P2b` needs the date sources.

## Landed / Did not

| | |
|---|---|
| **Landed** | Every `argues` is a sentence someone could disagree with |
| **Did not** | *"Explores the relationship between focus and value."* No one can disagree with that — it is a topic wearing a claim's grammar |
| **Landed** | `antiChapters` is non-empty and each reason names something about **you** |
| **Did not** | An empty `antiChapters` on a fourteen-chapter book. That is a table of contents, not a decision |
| **Landed** | `clarified` is mostly `false`, with each `true` argued for |
| **Did not** | Every chapter `clarified: true`. The default is false; a brief that clarifies everything has not read the reason for the flag |
| **Landed** | `outsideView.critics` names a person and their strongest point |
| **Did not** | It says the critics are "mixed", or fills the field with the book's own hedges — tier C laundered as tier B |
| **Landed** | The arithmetic was shown and it balanced |
| **Did not** | `inventory` invented to match, rather than counted from the contents |
| **Landed** | `published` is the original release, with its source given outside the fence |
| **Did not** | The year of the printing in your hand, or a date with no source — and it is shown on every page of the book |
| **Landed** | `editions` holds only major revisions, each saying what changed — or `[]`, with a sentence saying a search found none |
| **Did not** | Every reprint and paperback listed, or `"change": "revised"` |

## If it comes back wrong

````text
The arithmetic does not balance: chapters has N entries, antiChapters
has M, and inventory says X. Recount from the table of contents and
re-emit the whole object. Do not adjust inventory to fit — the
contents is the truth.
````

````text
These "argues" lines are topics, not claims: [list them]. Rewrite each
one so that someone could disagree with the sentence. If you cannot,
say the chapter has no argument and tell me what it has instead.
````

````text
"editions" lists printings, not revisions: [list them]. Keep only
editions with chapters added or removed, a substantially updated
evidence base, or an afterword that changes the argument — each with
what changed and a source. If none qualify, "editions" is [] and you
say so outside the fence.
````

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

**Then run [`P2b`](P2b-book-page.md)** for the book page's `## Author context` and
`## Context then vs. context today`, before chapter one.

## Amending it later

A brief is not a single event. When a chapter turns out to argue something different, edit
`book.json` and push it to the pages that already exist:

```bash
node scripts/new-chapters.mjs <d> <c> <b> --outline
```

**`--outline` also re-derives each page's title, number and label**, and prints every change. So an
Introduction added to the brief after the chapters were scaffolded — with its `label` — renames the
page titles after it back to the book's own numbers.

**Never edit between the `OUTLINE` markers by hand** — the next `--outline` discards it silently.
`book-spec.md` §3c has the three doors and what each refuses. **A change to `published` or `editions`
needs no flag**: the dates are read at build time.
