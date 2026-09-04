# The producer map — which prompt owns which heading

**Read this before you run a prompt, and again before you decide a chapter is finished.**

Every heading on a chapter page has exactly one producer. This file names it. It exists because on
2026-08-31 three of the twelve had **no producer at all** and nobody noticed: `P3` had been made
conditional in its entirety, so on a `clarified: false` chapter `## Pre-context`, `## Core message`
and `## Key points` were simply never generated. **Four of the six *Deep Work* stubs carry
`clarified: false`** — that was the common case, not the edge. `P3-clarify.md` records the incident.

**A table like this one would have caught it in a glance.** That is the whole argument for the file.

Source of truth: `context/chapter-spine.md` §1 and §3. Where this file and that one disagree, that
one wins and this one is stale — say so rather than following it.

---

## The twelve `##`, in this exact order

**These exact strings.** Headings are anchors and anchors are contracts across the whole corpus.
Paraphrasing one — "What it says", "My thoughts" — breaks every inbound link and is a defect, not a
style choice. **Any other `##` is a defect.** `###` freely inside 6, 7 and 8. **An `####` anywhere
means the chapter should have been split**, which is a `book.json` amendment, not a heading choice.

| # | Heading | Producer | It fails when |
|---|---|---|---|
| 1 | `## Pre-context` | **`P3` part A — every chapter, clarified or not** | It explains the chapter instead of preparing for it |
| 2 | `## Core message` | **`P3` part B** when `clarified: true` · **`P4`** when `false` | More than one sentence |
| 3 | `## Key points` | **`P3` part B** when `clarified: true` · **`P4`** when `false` | It is a summary rather than the load-bearing claims |
| 4 | `## The clarified chapter` | **`P3` part B only** | **Present at all when `clarified: false`** |
| 5 | `## Recall` | **HIM. Closed book.** No prompt exists | Written after the explanation layer, or the AI wrote in it |
| 6 | `## The explanation layer` | **`P4`** | Fewer than **ten** `###`, or it invents consensus |
| 7 | `## Dialogue` | **`P5`** | His position appears before the model's answer |
| 8 | `## Concept map` | **`P7`** | It is a list of nouns rather than relationships |
| 9 | `## Actions` | **`P6`**, as frontmatter data | Anything in the section other than `<Actions />` |
| 10 | `## The 30-second version` | **`P7`** | Longer than `## Core message` plus three sentences |
| 11 | `## Open questions` | **HIM.** No prompt exists | **The AI wrote anything in it** |
| 12 | `## Sources` | **`P4`** | A body claim is absent — **or present at the wrong tier** |

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
is genuinely short — search was thin, the material is thin — it says so in one clause and stays.

Two carry extra obligations the scaffolder does not pre-write:

- **`### The version to hold`** owes a `:::tip[The version to hold]` directive.
- **`### Where it doesn't transfer`** may describe where a claim's *conditions* differ. It may
  **never** conclude that the claim therefore does not apply to him. That conclusion is his, and it
  belongs in the prohibition zone with his recall and his commitment. **Add, never subtract.**

These ten land **inside the `SPINE` marker comments** in the stub. Those comments are located by
literal string match — a paste that mangles them makes
`node scripts/new-chapters.mjs <d> <c> <b> --spine` silently no-op.

---

## The four `###` inside `## Dialogue` — `P5`

```
### What I asked
### What it said
### What I then argued
### Where we ended up
```

**The order is the audit.** If `### What I then argued` appears before `### What it said`, the answer
that follows a stated position is suspect — sycophantic agreement is triggered by conveying a belief,
and this shape is the only record that shows whether one was conveyed first.

`### Where we ended up` is allowed to record that nothing moved. *"I still think the objection stands
and it still thinks it doesn't"* is a better entry than a manufactured convergence.

---

## The prohibition zone — 5 and 11

**`## Recall` and `## Open questions` have no producer, and that is deliberate.** No prompt writes
them, no toggle may produce content for them, and a model asked to fill one refuses and names the
rule it is refusing under.

`## Recall` also carries the questions you could not answer — that is its second half. See
[recall.md](recall.md); it is the only step in the pipeline with no AI in it, and it is the one that
does the work.

---

## Pre-flight, in the order the defects actually occur

1. Twelve `##`, **exact strings**, right order. No extra `##`. No `####` anywhere.
2. `## The clarified chapter` present **if and only if** `clarified: true`.
3. `## Pre-context` present even when `clarified: false` — **the orphan that shipped.**
4. `## Core message` and `## Key points` present, from whichever producer the flip names.
5. Ten `###` in the explanation layer, in order, `### Where the author was standing` first.
6. `## Recall` written closed-book **before** the explanation layer.
7. `## Dialogue` shows the question before the position.
8. `## Open questions` contains nothing the AI wrote.
9. `## Actions` contains `<Actions />` and nothing else.
10. Every explanation-layer claim appears in `## Sources` with an anchor **and a tier**.
