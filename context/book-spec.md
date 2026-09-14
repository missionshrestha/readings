# BOOK-SPEC — the shape of `book.json`, and of the book page

**Read this at Stage 2 (BRIEF), at Stage 2b (the book page) and by `/scaffold`. Not in the chapter
loop.**

`chapter-spine.md` governs one page. **This governs the tree that page hangs off** — the chapter
map, the coverage law, the fields that decide how the whole book is read — **and the book page
itself** (§6), which since 2026-09-14 carries the release dates, the author's context and the book
then and now.

> **Everything is decided here. Generation decides nothing.**

---

## 1 · The three book shapes

Set by `kind`. It decides which template is scaffolded and which pipeline runs.

| `kind` | For | Shape |
|---|---|---|
| `read` | A book worked front to back | `index.mdx` + one page per chapter |
| `reference` | The 96 🔵 books — *"never cover to cover, opened when I have the specific problem"* | One page. A dated problem → answer log, appended to when consulted |
| `lifelong` | The 7 ♾️ books, and fiction | One page. A dated log, no pipeline, no actions, no rating |

**Set it deliberately.** `kind` decides the template, the pipeline, whether actions are extracted at
all, and whether `exitCondition` can honestly be a target. Getting it wrong is not a formatting
mistake: a `lifelong` book filed as `read` acquires a finish line it should never have.

**All three kinds carry the dates, `## Author context` and `## Context then vs. context today`.** §6.

---

## 2 · The complete `book.json` — `kind: "read"`

Lives at `<domain>/<cluster>/<book>/book.json`, beside `index.mdx`.

**The values below are shapes, not facts.** Every date, name and claim in a real brief is verified at
Stage 2 with search on (`source-rules.md` §2b); a value copied from an example in a specification is
exactly the tier-C laundering that file exists to prevent.

```json
{
  "slug": "deep-work",
  "title": "Deep Work",
  "author": "Cal Newport",
  "published": "2016",
  "editions": [],
  "domain": "self-command",
  "cluster": "attention-dopamine-and-digital-discipline",
  "clusterNumber": "1.3",
  "tier": "core",
  "weight": "M",
  "kind": "read",

  "gap": "execution",
  "familiarity": "familiar",
  "whyNow": "The 2–4 hour blocks I keep saying I want have not appeared in four months.",

  "questions": [
    "What actually makes a block 'deep' rather than just uninterrupted?",
    "Is the scheduling advice usable when the interruptions are other people?",
    "What does he say about work that is genuinely collaborative?"
  ],

  "outsideView": {
    "replication": "Not an empirical programme. The attention-residue work it leans on (Leroy 2009) is real and narrow.",
    "critics": "Widely read as absolutist about email and open offices; several practitioners report the scheduling advice fails in on-call or support roles.",
    "agedBadly": "The 2016 social-media chapter predates the platforms most people now actually lose time to."
  },

  "parts": [
    { "slug": "the-idea", "title": "The idea", "order": 1,
      "outcome": "Say what deep work is and why it is becoming rare." }
  ],

  "chapters": [
    { "slug": "deep-work-is-valuable", "title": "Deep work is valuable", "order": 1,
      "part": "the-idea",
      "argues": "The two abilities that make a knowledge worker valuable both require depth.",
      "weightInArgument": "load-bearing",
      "estMinutes": 25, "verdict": "deep-dive", "clarified": false }
  ],

  "antiChapters": [
    { "title": "Rule #3 — Quit Social Media", "reason": "Already settled for me: I do not use it. Reading it would be confirmation, not change." }
  ],

  "inventory": { "chapters": 13, "read": 12, "skipped": 1 },

  "exitCondition": "Four consecutive weeks with at least three 90-minute blocks each, logged, with the trigger that produced them named."
}
```

A populated `editions` entry has this shape:

```json
{ "date": "YYYY or YYYY-MM or YYYY-MM-DD",
  "label": "what the edition is called — 'Revised and expanded edition'",
  "change": "what materially changed — chapters added or removed, the evidence updated, an afterword that moves the argument",
  "source": "https://… the publisher's page, the new preface, or the author's own announcement" }
```

### Field rules

| Node | Field | Rule |
|---|---|---|
| root | `published` | **Required on all three kinds, since 2026-09-14.** The original release: a year (`2016` or `"2016"`), a month (`"2016-01"`) or a day (`"2016-01-05"`). For a work older than print, the composition date, approximate, as `"c. 170–180 CE"` — and the first printed edition goes in `editions`. **Displayed on every page of the book** |
| root | `editions` | **Required, an array, on all three kinds.** **Major changes only** — a revised edition with chapters added or removed, a substantially updated evidence base, an afterword that changes the argument. Not a paperback, a new cover or a corrected typo. `[]` is a real answer when a search found no major revision, and the book page says so. Each entry needs `date` and `change`; `source` is reported when absent. Oldest first |
| root | `gap` | **`knowledge` or `execution`.** The Stage-0 diagnostic, and it comes before everything. *"This single distinction predicts most of the disappointment people report with the genre."* A book chosen for an execution gap weights the action stages and trims the explanation layer |
| root | `familiarity` | `new` · `familiar` · `expert`. Decides the DEFAULT for `clarified` |
| root | `questions` | **3–5, written BEFORE reading**, in the inspectional pass. Written after, they are a summary |
| root | `outsideView` | A three-line digest, filled at Stage 2 with search on. **Every citation verified yourself.** *"When it's thin, say so rather than inventing consensus."* **The long form is `## Context then vs. context today` on the book page (§6), and where the two disagree the page is the authority and the digest is rewritten to match** |
| root | `exitCondition` | What must be TRUE for this book to be finished. Observable, not felt |
| root | `inventory` | `read + skipped === chapters`. **Asserted.** See §3 |
| part | `outcome` | One sentence, starts with a verb. What you can do after this part |
| chapter | `argues` | One line. What the chapter claims, not what it covers |
| chapter | `weightInArgument` | `load-bearing` · `supporting` · `illustrative`. Decides how much of the budget it earns |
| chapter | `verdict` | `deep-dive` · `skim` · `skip`. A `skip` chapter belongs in `antiChapters`, not here |
| chapter | `clarified` | `false` means `## The clarified chapter` is **omitted** and READ I is the original |
| root | `kind` | `read` · `reference` · `lifelong`. `reference` and `lifelong` carry no `chapters` and no `inventory` |

**`order` is global within the book and starts at 1.** The sidebar is flat within its part group and
`sidebar.order` comes straight from it.

---

## 2b · The other two shapes, written out

`reference` and `lifelong` books carry **no `chapters`, no `parts`, no `inventory` and no
`antiChapters`.** `new-chapters.mjs` refuses a `chapters` array on either — *"kind "reference"
carries no chapters"* — and returns before the coverage law is even reached. Everything above the
`kind !== 'read'` line still applies, which is easy to miss: `published`, `editions`, `gap`,
`questions` and `exitCondition` are required on all three.

### `kind: "reference"` — one of the 96 🔵 books

```json
{
  "slug": "the-elements-of-typographic-style",
  "title": "The Elements of Typographic Style",
  "author": "Robert Bringhurst",
  "published": "1992",
  "editions": [
    { "date": "[VERIFY IN SESSION]", "label": "[VERIFY IN SESSION]",
      "change": "[VERIFY IN SESSION]", "source": "[VERIFY IN SESSION]" }
  ],
  "domain": "presence-style-and-expression",
  "cluster": "environment-order-and-aesthetics",
  "clusterNumber": "12.2",
  "tier": "reference",
  "weight": "L",
  "kind": "reference",

  "gap": "knowledge",
  "familiarity": "new",
  "whyNow": "I keep making the same three decisions badly and re-deciding them each time.",

  "questions": [
    "What is the actual rule behind measure, rather than the number people quote?",
    "When is a rule here a convention and when is it a perceptual fact?",
    "What does it say about screens, and how much of that has aged?"
  ],

  "outsideView": {
    "replication": "Not empirical. Craft consensus, and it says so.",
    "critics": "Read as prescriptive by people using it as a manual rather than an argument.",
    "agedBadly": "Written before responsive type. The proportions hold; the delivery advice does not."
  },

  "exitCondition": "Three consultations logged, each with the question that sent me there and what I did differently afterwards."
}
```

**`[VERIFY IN SESSION]` in `editions` is deliberate**: this book is widely said to have gone through
several revised editions, and this specification may not hardcode dates nobody checked while writing
it (`source-rules.md` §3, the same rule). The brief that is actually used fills them from a source.

**`new-chapters.mjs` says so and exits 0 on both kinds.** Run it against a `reference` or
`lifelong` book and it prints *"A reference book has no chapter map, so there is nothing to
scaffold"* and stops before it reads `chapters`. `--refresh` is **refused** on them outright —
running it would append an empty `## Chapters` heading to a page whose whole premise is that it has
none, which is the finish line §1 says these books must never acquire. Both were added on
2026-09-04, after the correctly-shaped case — the one that omits `chapters` rather than wrongly
including it — was found to reach `[...raw.chapters]` and die with a raw Node
`TypeError: raw.chapters is not iterable`. That was the documented happy path for **103 of the 293
books.**

**The page is a dated log, appended to when consulted**, and the completion instinct never touches
it. `exitCondition` therefore measures *use*, not coverage: "finish it" is the wrong goal for a book
you are not reading front to back, and writing one would quietly convert a reference into a `read`.

### `kind: "lifelong"` — one of the 7 ♾️ books, and all fiction

```json
{
  "slug": "meditations",
  "title": "Meditations",
  "author": "Marcus Aurelius",
  "published": "c. 170–180 CE",
  "editions": [
    { "date": "[VERIFY IN SESSION]", "label": "First printed edition",
      "change": "[VERIFY IN SESSION]", "source": "[VERIFY IN SESSION]" }
  ],
  "domain": "philosophy-meaning-and-spirituality",
  "cluster": "stoicism-and-practical-philosophy",
  "clusterNumber": "9.2",
  "tier": "core",
  "weight": "S",
  "kind": "lifelong",

  "gap": "execution",
  "familiarity": "familiar",
  "whyNow": "Returned to, not read. This page exists so the returns are recorded.",

  "questions": [
    "Which passages do I come back to, and has that set changed?",
    "What was going on when I came back to it?",
    "Where do I disagree with it now and did not before?"
  ],

  "outsideView": {
    "replication": "Not applicable.",
    "critics": "The quietist reading — that it counsels acceptance where action was available.",
    "agedBadly": "The household and the empire are not the reader's, and several passages assume both."
  },

  "exitCondition": "None. This book is never finished, and a page that implied otherwise would be lying."
}
```

**For a translated work, the translation you read is an edition.** Its translator and year belong in
`editions`, and `## Context then vs. context today` says what that translation changes — a book read
in a 2002 translation and one read in an 1862 translation are not the same text.

**No pipeline, no actions, no rating.** `exitCondition` is required by the validator and the honest
value is a sentence saying there is not one. That is a deliberate shape rather than a loophole: the
field exists to force the question, and "there is no exit" is a real answer to it, written down.

**`lifelong` is what resolves Rule 11.** The protocol says all fiction is exempt and gets "no page",
while `universe.md` marks three novels 🔴 CORE. A page and a log costs nothing, keeps the completion
instinct off them, and is the only place those notes could live. `reconciliation.md` row 13.

---

## 3 · The coverage law

> **Every chapter the book has appears exactly once: in `chapters`, or in `antiChapters` with a
> reason. There is no third bucket, and silence is not a decision.**

`read + skipped === chapters` is **asserted by `new-chapters.mjs`, never computed for you.** A
mismatch means a chapter was surfaced at Stage 2 and then quietly forgotten, which is exactly what
this law exists to catch.

**An empty `antiChapters` on a book over 15 chapters is a WARNING, not a refusal.** It means you
transcribed a table of contents rather than making a decision. The script says so and scaffolds
anyway — the brief decides how much of a book to read; the script does not get a veto.

---

## 3b · What `new-chapters.mjs` refuses, and in what words

**All-or-nothing, by design.** If any check below fails, **nothing is written** — the script does
not half-apply and leave the book in a state nobody can reason about. Every message is reproduced
here so a brief can be checked against it before the script is ever run.

### BINDING — these refuse, and the run writes no file

| Condition | The message |
|---|---|
| Not a JSON object | `book.json is not an object. See context/book-spec.md §2.` |
| Missing `slug`, `title` or `kind` | `missing "slug"` |
| `slug` ≠ directory | `"slug" is "X" but the directory is "Y" — the path is the truth` |
| `domain` ≠ directory | `"domain" is "X" but the directory says "Y"` |
| `cluster` ≠ directory | `"cluster" is "X" but the directory says "Y"` |
| `published` absent | `missing "published" — the original release date. Every page of the book displays it. Spec §2` |
| `published` unreadable | `"published" is "X" — write a year ("2016"), a month ("2016-01"), a day ("2016-01-05") or an approximate date ("c. 170–180 CE")` |
| `editions` absent or not an array | `missing "editions" — an array of MAJOR revisions only. [] is a real answer when a search found none. Spec §2` |
| an edition with no `date`, or an unreadable one | `editions[0]: "date" is missing or unreadable — same formats as "published"` |
| an edition with no `change` | `editions[0]: no "change" — what materially changed, not just "revised"` |
| `gap` absent | `missing "gap" — knowledge or execution. Spec §2, and it comes before everything` |
| `gap` not in the set | `"gap" is "X", must be knowledge or execution` |
| `familiarity` not in the set | `"familiarity" is "X", must be one of new, familiar, expert` |
| `exitCondition` absent | `missing "exitCondition" — what must be TRUE for this book to be finished` |
| fewer than 3 `questions` | `"questions" needs 3-5 entries, written BEFORE reading. Written after, they are a summary` |
| `chapters` on a non-`read` book | `kind "reference" carries no chapters` |
| no `chapters` on a `read` book | `no "chapters" array` |
| a part slug is not kebab-case | `part slug "The Idea" is not kebab-case` |
| a part has no `outcome` | `part "the-idea" has no "outcome"` |
| chapter slug missing or not kebab | `chapter "X": slug is missing or not kebab-case` |
| chapter slug repeats | `chapter "X": slug repeats` |
| `order` not an integer | `chapter "X": "order" must be an integer` |
| `order` repeats | `chapter "X": order 3 repeats` |
| chapter has no title | `chapter "X": no title` |
| chapter has no `argues` | `chapter "X": no "argues" — one line, a CLAIM rather than a topic` |
| `part` not declared in `parts` | `chapter "X": part "y" is not in "parts"` |
| bad `verdict` | `chapter "X": verdict "maybe", must be one of deep-dive, skim, skip` |
| `verdict: "skip"` in `chapters` | `chapter "X": verdict "skip" — a skipped chapter belongs in "antiChapters", not "chapters"` |
| bad `weightInArgument` | `chapter "X": weightInArgument "big", must be one of load-bearing, supporting, illustrative` |
| `clarified` not a boolean | `chapter "X": "clarified" must be true or false — a deliberate value, not a default nobody looked at` |
| `inventory` missing | `missing "inventory" — { chapters, read, skipped }. Spec §3` |
| the coverage law fails | `inventory does not balance: read 12 + skipped 1 !== chapters 14.` |
| `inventory.read` ≠ `chapters.length` | `inventory.read is 12 but "chapters" holds 11 entries.` |
| `inventory.skipped` ≠ `antiChapters.length` | `inventory.skipped is 1 but "antiChapters" holds 0 entries.` |
| an `antiChapters` entry has no reason | `antiChapters "Rule #3" has no reason — and it must be a reason FOR HIM` |

Every one of those maps to a line in this file that says *rewrite*. The script says so itself:

```
These are brief defects, not scripting problems. Take the whole list back to
Stage 2 rather than hand-patching the JSON past a check — every check maps to a
line in context/book-spec.md that says rewrite.
```

### ADVISORY — these print and the run proceeds

| Condition | The message |
|---|---|
| over 15 chapters, empty `antiChapters` | `N chapters and an empty antiChapters. That is a table of contents, not a decision — but it scaffolds anyway.` |
| total `estMinutes` over 20 hours | `estimated N hours of reading. The four-week ceiling is a signal, not a rule.` |
| an edition with no `source` | `editions[0] has no "source". A date nobody can check is a date that drifts.` |

**The split is deliberate and worth stating as a principle: the brief decides how much of a book to
read; the script does not get a veto.** A structural error makes the tree wrong and is refused. A
judgment the script disagrees with is reported and obeyed. Where a rule in this file is not in the
BINDING table above, it is a rule you hold yourself to — including the whole of §4 below.

---

## 3c · How an amendment reaches pages that already exist

Stage 2 is not a single event. A brief is amended when a chapter turns out to argue something
different, when the coverage law is failed and re-balanced, or when the spine itself changes.

**`new-chapters.mjs` refuses to overwrite an existing chapter file**, and says so:

```
6 chapter file(s) already exist. The WHOLE run is refused,
so it cannot half-apply and leave the book in a state nobody can reason about.
```

So there are three narrow doors, and each writes only inside a generated region:

| Flag | Rewrites | Refuses |
|---|---|---|
| `--outline` | The `OUTLINE` region on every chapter — the brief's own words, restated on the page | A file whose `OUTLINE` markers have been deleted. Named, never skipped quietly |
| `--spine` | The `SPINE` region — the sub-sections of the explanation layer | **Any chapter that has been written in.** Safe means every body inside the region is still the literal `TODO` |
| `--refresh` | The chapter grid **and the `BRIEF` region** on the book's `index.mdx` | A book that is not `kind: read`. A page with no `BRIEF` markers is named and skipped, with the two lines to paste |

**`--outline` also re-derives each chapter's frontmatter `description` from `argues`**, because
the scaffolder writes one from the other and they are one field with two homes. It prints every
change with its old and new value rather than making them quietly — a description may have been
improved during a paste, and discarding that silently would be the same defect in the other
direction. Before this, amending a brief updated the comment block on the page and left six pages
carrying `description: "PLACEHOLDER — the claim this chapter makes, in one line."`, which is the
`<meta name="description">` and the search snippet, on a green build.

**`--refresh` also writes the `BRIEF` region**, which is `whyNow` and `questions` — restated on the
book page from the brief that already holds them. They were hand-copied prose until 2026-09-04, when
*Deep Work* was found with a complete `book.json` and a page reading "TODO" in every one of them. A
required field of the brief kept in two places is a field that goes stale, and a stale copy is not an
error anything can report. **`outsideView` is no longer restated there, since 2026-09-14:** the book
page's `## Context then vs. context today` (§6) is its long form, written with sources by `P2b`, and a
three-line digest beside it would be a second, thinner copy of the same judgement.

**A `private: true` chapter is omitted from the grid entirely** — not badged. See `CLAUDE.md`
stack fact 23.

```bash
node scripts/new-chapters.mjs <domain> <cluster> <book> --outline    # after a brief amendment
node scripts/new-chapters.mjs <domain> <cluster> <book> --spine      # after a SPINE change
node scripts/new-chapters.mjs <domain> <cluster> <book> --refresh    # after a paste
```

**Never edit between the markers by hand.** The regions say so twice, and the reason is that the
next `--outline` silently discards whatever was written there. **An amendment that did not reach the
page is an amendment that did not happen** — which is why both flags print what they skipped and
name each file.

**A change to `published` or `editions` needs no flag.** The dates are read from `book.json` at build
time and rendered by the page chrome (§6), so editing the file is the whole amendment.

`--spine` exists because of a specific event: the explanation layer went from nine sub-sections to
ten on 2026-08-31 (`chapter-spine.md` §3), and before it the only ways to propagate that were to
hand-edit inside a generated region or delete and rebuild the stub, losing its frontmatter.

---

## 4 · Title grammar

**One test, at every level:**

> From the title alone, with nothing else on screen, can you tell whether the thing you are looking
> for is inside it?

Titles are read in a sidebar, in search results and on a review card months later — **always out of
context.** A title that only makes sense under its parent has failed.

| Level | Length | Shape |
|---|---|---|
| Part | 2–5 words | noun phrase, the capability |
| Chapter | ≤ 9 words | the book's own chapter title, unless it is pure marketing |

**Rules that hold everywhere:** sentence case · no numeric prefix (`order` carries position) · at
most one em dash · no trailing punctuation, no emoji · slugs are kebab-case, derived from the title,
and **permanent** — renaming one after the page exists breaks every inbound link, silently resets
its review card, and **detaches every comment anchored to it**.

**Banned:** `Introduction`, `Understanding X`, `Advanced X`, `Miscellaneous`, `Tips and tricks`, and
any title that restates its parent.

---

## 5 · Pre-flight

- [ ] `kind` is set, and matches how the book will actually be used.
- [ ] `published` is set, and was read from a source this session — not from memory.
- [ ] `editions` lists major revisions only, oldest first, each with a date, a change and a source —
      or is `[]` because a search found none.
- [ ] `gap` is set. Reading will not fix a doing problem, and the machine should not pretend it will.
- [ ] `questions` were written before reading, not after.
- [ ] `read + skipped === chapters`, and the three numbers are in `inventory`.
- [ ] Every `antiChapters` entry has a reason **for you**, not a reason in general.
- [ ] Every chapter has `argues`, and it is a claim rather than a topic.
- [ ] `clarified` is a deliberate value on every chapter, not a default nobody looked at.
- [ ] Every slug is unique within the book, kebab-case, derived from the title.
- [ ] `exitCondition` is observable. "Understand deep work better" is not.

---

## 6 · The book page — `index.mdx`

**Added 2026-09-14 on his instruction** (`reader.md` §10b). Produced by **`P2b`**, after `/scaffold`
has created the page and before the first chapter. `standards.md` §8 holds the standard each section
is written to; `source-rules.md` §2b says what may source a date or a biographical fact.

### The dates — displayed, never typed into the page

> *"Every book must display its original release date, along with any major updates or version dates
> (major changes only), shown somewhere in the presentation."*

**`book.json` is the only place they are written.** The page chrome reads `published` and `editions`
at build time and shows them **under the title of the book page** — *First published 2016 · Revised
and expanded edition 2024* — and **beside the book's name on every chapter page of it**. Nothing in
the MDX repeats them, so an edition added later reaches every page with one edit and cannot disagree
with itself. A book whose `book.json` does not exist yet simply shows no line.

### The sections — `kind: read`

`##` headings in this order. The `###` under the two new sections are fixed strings, for the same
reason a chapter's are: they are anchors, and comments and cross-links attach to them.

| `##` | Produced by | Owes |
|---|---|---|
| `## Why this book, now` | **generated** — `book.json` `whyNow`, his words, inside the `BRIEF` markers | The problem that made this the next book |
| `## Questions I brought to it` | **generated** — `book.json` `questions[]`, verbatim, inside the `BRIEF` markers | Written before reading |
| `## Author context` | **`P2b`** | The four `###` below |
| `## Context then vs. context today` | **`P2b`** | The six `###` below |
| `## Chapters` | **generated** — `new-chapters.mjs`, between the `CHAPTERS` markers | The grid. Never hand-edited |
| `## What it changed` | **him**, at Stage 10 after `P8` — and `P8` Part D's map | One of three verdicts, in his words. **`P8` Part D's book-level concept map sits under it**, with its caption — the map of how the whole argument hangs together, placed where the book is judged rather than under a new `##` |
| `## Where I stopped, if I stopped` | **him** | Empty if finished |
| `## Sources` | **`P2b`**, and `P8` appends | `\| Claim \| Source \| Read on \| Tier \|` for every date and fact above |

**`## Author context`** — biography, in detail, because he asked for it; every fact sourced; the
author's inner life only where the author or a biographer says so.

```
### Where and when they grew up
### What they studied and where they worked
### What led to this book
### What that means for reading it
```

The last one connects the life to the book — what features of the argument those circumstances help
explain — and **never** uses them to explain the argument away.

**`## Context then vs. context today`** — symmetric: what has supported the book since publication,
with the same effort as what has undermined it. Every point is dated and says which kind of change it
is — the author's, the evidence's, the world's or the audience's.

```
### The world the book was written in
### What the author has changed or said since
### Research since — what supports it and what does not
### What critics and other scholars argue
### What is different today
### What still holds
```

`### What still holds` ends in a `:::tip[What still holds]` — the book-level counterpart of a
chapter's `### The version to hold`, and like it, a synthesis that carries a scar.

### The sections — `kind: reference` and `kind: lifelong`

The same `## Author context`, `## Context then vs. context today` and `## Sources`, placed after the
page's opening section (`## What it is for` · `## What it is`) and before its log. A novel's
`### Research since — what supports it and what does not` usually says, in one sentence, that the
book makes no empirical claim — and then covers how its reading has changed, which is the part of
that sub-section a novel does have.

### Reading order — where the two new sections sit against the recall

**`## Author context` is read before chapter one.** It describes a life, not the chapter's claims, so
it cannot pre-digest the reading the recall protects — and it is the context he asked to have in hand.

**`## Context then vs. context today` is best read after the first chapter's recall.** It contains
criticism and later evidence about the book's claims, and read first it frames what he looks for in
the chapter — the same reason the explanation layer comes after `## Recall`
(`chapter-spine.md` §3, ground 3). This is guidance in `GUIDE.md`, not a lock: the page is his.
