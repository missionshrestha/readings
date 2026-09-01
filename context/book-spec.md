# BOOK-SPEC — the shape of `book.json`

**Read this at Stage 2 (BRIEF) and by `/scaffold`. Not in the chapter loop.**

`chapter-spine.md` governs one page. **This governs the tree that page hangs off** — the chapter
map, the coverage law, and the fields that decide how the whole book is read.

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

---

## 2 · The complete `book.json` — `kind: "read"`

Lives at `<domain>/<cluster>/<book>/book.json`, beside `index.mdx`.

```json
{
  "slug": "deep-work",
  "title": "Deep Work",
  "author": "Cal Newport",
  "published": 2016,
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

### Field rules

| Node | Field | Rule |
|---|---|---|
| root | `gap` | **`knowledge` or `execution`.** The Stage-0 diagnostic, and it comes before everything. *"This single distinction predicts most of the disappointment people report with the genre."* A book chosen for an execution gap weights the action stages and trims the explanation layer |
| root | `familiarity` | `new` · `familiar` · `expert`. Decides the DEFAULT for `clarified` |
| root | `questions` | **3–5, written BEFORE reading**, in the inspectional pass. Written after, they are a summary |
| root | `outsideView` | Filled at Stage 1 with search on. **Every citation verified yourself.** *"When it's thin, say so rather than inventing consensus"* |
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
`kind !== 'read'` line still applies, which is easy to miss: `gap`, `questions` and `exitCondition`
are required on all three.

### `kind: "reference"` — one of the 96 🔵 books

```json
{
  "slug": "the-elements-of-typographic-style",
  "title": "The Elements of Typographic Style",
  "author": "Robert Bringhurst",
  "published": 1992,
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

**The page is a dated log, appended to when consulted**, and the completion instinct never touches
it. `exitCondition` therefore measures *use*, not coverage: "finish it" is the wrong goal for a book
you are not reading front to back, and writing one would quietly convert a reference into a `read`.

### `kind: "lifelong"` — one of the 7 ♾️ books, and all fiction

```json
{
  "slug": "meditations",
  "title": "Meditations",
  "author": "Marcus Aurelius",
  "published": 180,
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
| `--refresh` | The chapter grid on the book's `index.mdx`, from what is actually on disk | Nothing. It reads frontmatter and needs no `book.json` |

```bash
node scripts/new-chapters.mjs <domain> <cluster> <book> --outline    # after a brief amendment
node scripts/new-chapters.mjs <domain> <cluster> <book> --spine      # after a SPINE change
node scripts/new-chapters.mjs <domain> <cluster> <book> --refresh    # after a paste
```

**Never edit between the markers by hand.** The regions say so twice, and the reason is that the
next `--outline` silently discards whatever was written there. **An amendment that did not reach the
page is an amendment that did not happen** — which is why both flags print what they skipped and
name each file.

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
and **permanent** — renaming one after the page exists breaks every inbound link and silently resets
its review card.

**Banned:** `Introduction`, `Understanding X`, `Advanced X`, `Miscellaneous`, `Tips and tricks`, and
any title that restates its parent.

---

## 5 · Pre-flight

- [ ] `kind` is set, and matches how the book will actually be used.
- [ ] `gap` is set. Reading will not fix a doing problem, and the machine should not pretend it will.
- [ ] `questions` were written before reading, not after.
- [ ] `read + skipped === chapters`, and the three numbers are in `inventory`.
- [ ] Every `antiChapters` entry has a reason **for you**, not a reason in general.
- [ ] Every chapter has `argues`, and it is a claim rather than a topic.
- [ ] `clarified` is a deliberate value on every chapter, not a default nobody looked at.
- [ ] Every slug is unique within the book, kebab-case, derived from the title.
- [ ] `exitCondition` is observable. "Understand deep work better" is not.
