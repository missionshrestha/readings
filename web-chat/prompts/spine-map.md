# The producer map — which prompt owns which heading

**Read this before you run a prompt, and again before you decide a chapter is finished.**

Every heading on a chapter page has exactly one producer. This file names it. It exists because on
2026-08-31 three of the twelve had **no producer at all** and nobody noticed: `P3` had been made
conditional in its entirety, so on a `clarified: false` chapter `## Pre-context`, `## Core message`
and `## Key points` were simply never generated. **Four of the six *Deep Work* stubs carry
`clarified: false`** — that was the common case, not the edge. `P3-clarify.md` records the incident.

**A table like this one would have caught it in a glance.** That is the whole argument for the file.

Source of truth: `context/chapter-spine.md` §1, §3, §6 and §6c for the chapter, and
`context/book-spec.md` §6 for the book page. Where this file and those disagree, they win and this one
is stale — say so rather than following it.

---

## The twelve `##`, in this exact order

**These exact strings.** Headings are anchors and anchors are contracts across the whole corpus —
including the comments he anchors to them. Paraphrasing one — "What it says", "My thoughts" — breaks
every inbound link and is a defect, not a style choice. **Any other `##` is a defect.** `###` freely
inside 3, 4, 6, 7 and 8. **An `####` anywhere means the chapter should have been split**, which is a
`book.json` amendment, not a heading choice.

| # | Heading | Producer | It fails when |
|---|---|---|---|
| 1 | `## Pre-context` | **`P3` part A — every chapter, clarified or not** | It explains the chapter instead of preparing for it — or uses a term it never defines |
| 2 | `## Core message` | **`P3` part B** when `clarified: true` · **`P4`** when `false` | More than one sentence |
| 3 | `## Key points` | **`P3` part B** when `clarified: true` · **`P4`** when `false` | It is a summary rather than the load-bearing claims — **or a claim stands with no explanation and no example beside it** |
| 4 | `## The clarified chapter` | **`P3` part B only** | **Present at all when `clarified: false`** |
| 5 | `## Recall` | **HIM. Closed book.** No prompt exists | Written after the explanation layer, or the AI wrote in it |
| 6 | `## The explanation layer` | **`P4`** | Fewer than **ten** `###`, invented consensus, or compressed notes where explanation was owed |
| 7 | `## Dialogue` | **`P5`, message four — the whole exchange** | His position appears before the model's answer — **or the middle of the argument is missing** |
| 8 | `## Concept map` | **`P7`** | It is a list of nouns rather than relationships — **or it cannot be read inside the text column** |
| 9 | `## Actions` | **`P6`**, as frontmatter data | Anything in the section other than `<Actions />` — **or fewer than two or more than ten actions in the frontmatter** |
| 10 | `## The 30-second version` | **`P7`** | Longer than `## Core message` plus three sentences, or a term in it is undefined |
| 11 | `## Open questions` | **HIM.** No prompt exists | **The AI wrote anything in it** |
| 12 | `## Sources` | **`P4`** | A body claim is absent — **or present at the wrong tier** — including a reader source, a chart value or a real-life incident |

### `## Key points` — what one point is

**One plain sentence in bold — the claim — followed by as much explanation as that claim needs: what
it means, why the author holds it, and an example.** No length limit; his instruction of 2026-09-14
was *"they should be as long and as detailed as each chapter demands or requires."* Points are ordered
by how much of the argument rests on each, so they come out unevenly sized.

**The tell:** a point with no *because* and no *for example* is a bare assertion, and a list of those
is a précis whatever it is called.

### The `clarified` flip, which is where this goes wrong

| | `clarified: true` | `clarified: false` |
|---|---|---|
| `## Pre-context` | `P3` part A | **`P3` part A. Unchanged** |
| `## Core message` · `## Key points` | `P3` part B, before reading | **`P4`, after the recall has been marked** |
| `## The clarified chapter` | `P3` part B | **Absent from the page entirely.** Not empty — absent |
| The explanation layer | `P4`, in full | **`P4`, in full.** Nothing is dropped |

`clarified: false` does **not** mean less work. It means you read the original, and the extraction
arrives after your own attempt rather than before your reading. Order on an unclarified chapter:
**orientation → the original text → your own recall → the extraction.** Nothing pre-digests it.

---

## The ten `###` inside `## The explanation layer` — `P4`

**TEN, not nine, since 2026-08-31.** A prompt or a page showing nine is using the old shape. In this
order, and `### Where the author was standing` is **first**:

```
### Where the author was standing
### What the author is actually saying
### Where readers get confused
### The teaching pass
### What real readers say
### What critics say
### What's been tested since
### How practitioners actually use it
### Where it doesn't transfer
### The version to hold
```

**Never drop one.** A missing sub-section is a structural defect, not an editorial choice. Where one
is genuinely narrower — search was thin, the brief says `skim` — it says so in one clause and stays.
**Narrower means fewer angles, never compressed.**

Four carry obligations the scaffolder does not pre-write:

- **`### Where the author was standing`** says only what about the author bears on **this chapter's**
  claim, and links up to `## Author context` on the book page. **Revised 2026-09-14**: the biography
  moved there, once per book.
- **`### What real readers say`** is a sample, in five parts — venues and N · clusters as *n of N* ·
  who is speaking · the Reddit Answers summary or the query and the threads · what it adds up to.
  **THIN** below 30 opinions from 3 kinds of venue. `chapter-spine.md` §3b. **Revised 2026-09-14.**
- **`### The version to hold`** owes a `:::tip[The version to hold]` directive.
- **`### Where it doesn't transfer`** may describe where a claim's *conditions* differ. It may
  **never** conclude that the claim therefore does not apply to him. That conclusion is his, and it
  belongs in the prohibition zone with his recall and his commitment. **Add, never subtract.**

These ten land **inside the `SPINE` marker comments** in the stub. Those comments are located by
literal string match — a paste that mangles them makes
`node scripts/new-chapters.mjs <d> <c> <b> --spine` silently no-op.

---

## The five `###` inside `## Dialogue` — `P5`

**FIVE, not four, since 2026-09-14.**

```
### What I asked            the opening question, as asked, with no position in it
### What it said            the model's independent answer, before it knew his view
### What I then argued      his position, stated only after that answer
### How the exchange went   every turn after that, in order, both sides
### Where we ended up       each side's final position, and what moved whom
```

**The order is the audit.** If `### What I then argued` appears before `### What it said`, the answer
that follows a stated position is suspect — sycophantic agreement is triggered by conveying a belief,
and this shape is the only record that shows whether one was conveyed first.

**`### How the exchange went` is the middle, and the middle is the point of adding it.** *"the middle
portion of a dialogue can be longer and more involved."* Its rules:

| Rule | |
|---|---|
| **Turn labels** | A paragraph starting exactly `**Me:**`, `**AI:**` or `**AI (as sceptic):**`. An unlabelled paragraph belongs to the turn above |
| **His turns** | His words. Spelling only, where it would confuse |
| **The model's turns** | Every point, concession and example. Only padding condensed |
| **The sceptic** | `P5` message three lands here, labelled `**AI (as sceptic):**` |
| **Nothing followed** | One sentence saying so. Never omitted |

`### Where we ended up` is allowed to record that nothing moved. *"I still think the objection stands
and it still thinks it doesn't"* is a better entry than a manufactured convergence. Any change of mind
names the turn where it happened.

---

## `## Actions` — `P6`, two to ten

| | Rule |
|---|---|
| **Per chapter** | **Two to ten** actions in the frontmatter. Fewer or more is reported by `/validate` and `audit.mjs`, never refused by the build |
| **Per book** | **At most one** `committed: true` with `tier: now`, written by him, with its obstacle named |
| **Each action** | Names the claim in the chapter it follows from, and passes four tests — anchored, observable, distinct, worth a ledger row — because *"Only put things that earns"* means *earns its place*, confirmed by him on 2026-09-14 |
| **More than ten honest candidates** | Ten are kept. The rest are listed outside the YAML as *considered, not kept*, and never reach the page |
| **Fewer than two** | `tier: reference` rules. **Never an invented habit.** If even two cannot be anchored, `P6` says so and the brief was probably mis-weighted |

---

## The book page — `index.mdx`

**Added 2026-09-14.** `book-spec.md` §6. The `###` under the two new sections are fixed strings, for
the same reason a chapter's are.

| On the page | Producer | Note |
|---|---|---|
| The dates | **`book.json`** — `published`, `editions` — rendered by the page chrome | **Never typed into the MDX.** Shown under the title and beside the book's name on every chapter |
| `## Why this book, now` | **HIM** — `whyNow`, his words | |
| `## Author context` | **`P2b`** | `### Where and when they grew up` · `### What they studied and where they worked` · `### What led to this book` · `### What that means for reading it` |
| `## Context then vs. context today` | **`P2b`** | `### The world the book was written in` · `### What the author has changed or said since` · `### Research since — what supports it and what does not` · `### What critics and other scholars argue` · `### What is different today` · `### What still holds`, ending in `:::tip[What still holds]` |
| `## Questions I brought to it` | **HIM** — `questions[]`, verbatim | Written before reading |
| `## Chapters` | **Generated** — `new-chapters.mjs`, between the `CHAPTERS` markers | Never hand-edited |
| `## What it changed` | **HIM**, at Stage 10, after `P8` | One of three verdicts |
| `## Where I stopped, if I stopped` | **HIM** | Empty if finished |
| `## Sources` | **`P2b`**, and **`P8`** appends | A row for every date and fact |

On `kind: reference` and `kind: lifelong`, the same three `P2b` sections sit after the page's opening
section and before its log.

**Reading order.** `## Author context` before chapter one. `## Context then vs. context today` is best
read after the first chapter's recall, because it contains criticism that would frame the reading.
Guidance, not a lock.

---

## The prohibition zone — 5 and 11, and every comment

**`## Recall` and `## Open questions` have no producer, and that is deliberate.** No prompt writes
them, no toggle may produce content for them, and a model asked to fill one refuses and names the
rule it is refusing under.

`## Recall` also carries the questions you could not answer — that is its second half. See
[recall.md](recall.md); it is the only step in the pipeline with no AI in it, and it is the one that
does the work.

**Comments are in the zone too, and they are not a section.** He leaves them on passages while
reading on `npm run dev`; they live in a file beside the page, never in its MDX, and the AI never
writes, pastes or edits one (`md-spec.md` §5d). **A comment written with the page open is not the
recall.**

---

## Pre-flight, in the order the defects actually occur

**Structure**

1. Twelve `##`, **exact strings**, right order. No extra `##`. No `####` anywhere.
2. `## The clarified chapter` present **if and only if** `clarified: true`.
3. `## Pre-context` present even when `clarified: false` — **the orphan that shipped.**
4. `## Core message` and `## Key points` present, from whichever producer the flip names — and every
   key point explained, with an example.
5. Ten `###` in the explanation layer, in order, `### Where the author was standing` first and about
   **this chapter**.
6. Five `###` in `## Dialogue`, in order; `### How the exchange went` uses the exact turn labels.

**Order and prohibition**

7. `## Recall` written closed-book **before** the explanation layer.
8. `## Dialogue` shows the question before the position.
9. `## Open questions` contains nothing the AI wrote, and no comment was generated.

**Clarity** — `standards.md` §2b

10. Every sentence is complete; every term is defined where it first appears; every load-bearing claim
    has an example; nothing was simplified into a different claim.

**Readers, diagrams, actions, evidence**

11. `### What real readers say` gives venues, N and *n of N*, and either the AI summary or the query
    and the threads. **THIN** under 30.
12. Every diagram has a caption before it and reads inside the column; the concept map has labelled
    edges and a cross-link; every chart's numbers are sourced or its title says illustrative.
13. `## Actions` contains `<Actions />` and nothing else; the frontmatter holds **two to ten**; at most
    one `committed: true` with `tier: now` across the book.
14. Every explanation-layer claim appears in `## Sources` with an anchor **and a tier**.
15. `draft` flipped to `false` **before** validating — a draft's MDX is checked by nothing.
