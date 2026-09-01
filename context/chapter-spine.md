# CHAPTER-SPINE — the grammar of one chapter page

**This governs the page. `book-spec.md` governs the tree the page hangs off, `md-spec.md` governs
the syntax, and `standards.md` governs the register and the depth.** Where they touch, the more
specific file wins.

One rule sits above all of it:

> **The chapter map is decided at Stage 2 and nowhere else. Generation decides nothing.**
>
> By the time a chapter is generated, its order, its title, what it argues, its weight in the
> book's argument and whether it gets clarified at all are already written in `book.json`.
> Stage 3 fills prose into a fixed shape. **A chapter that had to invent its own structure is
> evidence the brief was incomplete**, and that defect is upstream, not on the page.

---

## 1 · The spine

**Twelve `##` headings, these exact strings, this order.** Headings are anchors, and anchors are
contracts across the whole corpus — prev/next, search, inbound links, the `↔` cross-links and the
review loop all depend on them. Paraphrasing one ("What it says", "My thoughts") breaks every
inbound link and is a defect, not a style choice.

| # | Heading | Produced by | Fails when |
|---|---|---|---|
| 1 | `## Pre-context` | `P3`, **on every chapter** | It explains the chapter instead of preparing for it |
| 2 | `## Core message` | `P3` when `clarified: true`, else `P4` | More than one sentence |
| 3 | `## Key points` | `P3` when `clarified: true`, else `P4` | It is a summary of the chapter rather than its load-bearing claims |
| 4 | `## The clarified chapter` | `P3` | **Present when `clarified: false`** — see §4 |
| 5 | `## Recall` | **YOU** | Written after reading the explanation layer |
| 6 | `## The explanation layer` | `P4` | Fewer than the **ten** `###` sub-sections, or it invents consensus |
| 7 | `## Dialogue` | `P5` | Your position appears before the question — see §6 |
| 8 | `## Concept map` | `P7` | It is a list of nouns rather than relationships |
| 9 | `## Actions` | `P6` | Anything other than `<Actions />` |
| 10 | `## The 30-second version` | `P7` | Longer than thirty seconds of reading |
| 11 | `## Open questions` | **YOU** | **The AI wrote anything in it** |
| 12 | `## Sources` | `P4` | A claim in the body appears nowhere in it — **or appears with the wrong tier**, which is the defect `source-rules.md` exists for and the one that reads as correct |

**Any other `##` is a defect.** `###` freely inside 6, 7 and 8. **An `####` anywhere means the
chapter should have been split**, which is a `book.json` amendment, not a heading choice.

### The three orphans, and the correction that closed them

**Found 2026-08-31, and it was live on the majority case.** This table used to name `P3` as the
producer of sections 1, 2 and 3. But `P3-clarify.md:3` says P3 runs **only when `clarified: true`**
and is otherwise *"skipped entirely"* — so on a `clarified: false` chapter, three REQUIRED headings
had **no producer at all**. Four of the six *Deep Work* stubs carry `clarified: false`, so this was
the common case rather than the edge.

It was introduced honestly: `reconciliation.md` row 6 made `P3` conditional on the evidence that a
summary of familiar material *deletes the machinery*, and nobody re-checked what else `P3` was
carrying. That is the shape of the defect — a correct decision with an unexamined side effect.

**The correction splits `P3` by what each section is FOR, rather than by which prompt happens to
emit it:**

| Section | When | Why there |
|---|---|---|
| `## Pre-context` | **Always.** `P3` part A | Orientation, not summary. You need it BEFORE the original text as much as before a rebuild — arguably more, since nothing is being simplified for you |
| `## Core message`, `## Key points` | `P3` part B when `clarified: true`; **`P4`, after the recall is marked**, when `clarified: false` | These are extraction. On familiar material, receiving them before you read IS the summary that deletes the machinery. After your own closed-book attempt they are a check on it instead of a substitute for it |
| `## The clarified chapter` | `P3` part B only | Unchanged. This is the rebuild, and the rebuild is what the evidence made conditional |

**The ordering consequence is the point, and it is not a compromise.** On an unclarified chapter you
get orientation, then the original text, then your own recall, then the extraction. Nothing
pre-digests the chapter for you.

### What folded into what

The protocol's Part 4 lists "nine sections", but `P3`, `P4` and `P7` between them emit **24**. The
difference is not a discrepancy to preserve:

| Protocol section | Now lives in |
|---|---|
| `## What I cut, and why` | an aside inside `## The clarified chapter` |
| `## Chapter rating` | frontmatter `rating:` |
| `## Questions to carry` | the second half of `## Recall` |
| `## What we worked out` · `## Where I pushed back` | `## Dialogue`, in that order |
| `## Connects To` | `## The 30-second version`, as links |

---

## 2 · What each section owes, how it fails, and the tell

**A section is earned, never filled.** An empty `## Dialogue` under a heading is worse than no
dialogue, because it claims an argument happened.

The third column is the part worth reading twice. Several of these fail in a way that looks like
success — the prose is fluent, the structure is right, and the content is wrong. The **tell** is the
mechanical give-away: something you can look for without having to judge the writing.

| Section | It owes | It fails when | **The tell** |
|---|---|---|---|
| `## Pre-context` | What must already be in your head — a term the chapter uses without defining, the argument of the chapter before it, the debate it is answering | It summarises what is coming | It contains a claim FROM the chapter rather than a condition FOR it. Grep for the chapter's own thesis sentence appearing here |
| `## Core message` | One sentence, in `:::note[Core message]` | Two messages fused with "and" or a semicolon | A semicolon, or a second finite verb clause that could stand alone. If both halves survive being cut apart, the chapter has two messages and the brief should say so |
| `## Key points` | The claims the argument RESTS on | It becomes a précis — every point in chapter order, all the same weight | Point ordering matches the chapter's paragraph ordering exactly, and no point is longer than any other. Load-bearing claims are unevenly sized |
| `## The clarified chapter` | A rebuild that keeps the examples, the numbers and the repetition, plus a cut list that names what went | The cut list says "some repetition" | The cut list has no nouns in it. A real one names the anecdote |
| `## Recall` | Your attempt, closed-book, plus the questions you could not answer | The AI wrote in it, or it was written after the explanation layer | Vocabulary from the explanation layer that is not in the chapter. That is not proof, but it is where to look |
| `## The explanation layer` | Ten sub-sections, §3 | Manufactured consensus, invented critics, unverified citations | See §3. Each sub-section has its own |
| `## Dialogue` | Four sub-sections in the fixed order | Your position precedes the model's answer | `### What I then argued` appears before `### What it said`, or `### What I asked` states a conclusion rather than a question |
| `## Concept map` | Relationships between ideas | It is a list of nouns with a root | Every edge in the mermaid source is unlabelled and the graph is a star: one root, N leaves, no cross-links. A concept map with no cross-links is a table of contents |
| `## Actions` | `<Actions />` and nothing else | Prose creeps in around it | Any character in the section other than the component |
| `## The 30-second version` | What you would say in a lift, plus the `↔` cross-links | It becomes a second summary | It is longer than `## Core message` plus three sentences |
| `## Open questions` | Your questions, and nothing generated | Anything the AI wrote | See §7. This is the prohibition zone |
| `## Sources` | Claim, anchored URL, date read, tier | A body claim is absent — or present at the wrong tier | A tier-C row supporting a statement about the WORLD rather than about the book. `source-rules.md` is entirely about this one |

---

## 3 · The explanation layer — ten sub-sections

**TEN, not nine, since 2026-08-31.** `### Where the author was standing` was added on his own
instruction, given unprompted in the reader interview:

> *"Moreover in context you might tell the context of author, his/her settings, background, as
> everyone's thought is inspired, derived from their own circumstances, so that can help understand
> what writer/author actually meant and why"*
> — `context/reader.md` §4c, his words, 2026-08-31

It is **first**, and it is inside the explanation layer rather than folded into `## Pre-context`.
Three grounds, and the third is the one that decides it:

1. **`P4` is unconditional; `P3` is not.** Putting required material into a section that has a
   conditional producer is how the three orphans in §1 happened. `P4` runs on every chapter.
2. **Adjacency is the argument.** It sits immediately before `### What the author is actually
   saying`, which is exactly the claim it contextualises.
3. **Reading order protects the recall.** The explanation layer is read *after* the closed-book
   recall. Author context placed *before* the chapter would frame the reading and bias the
   retrieval this whole system exists to preserve. After is not a compromise here — it is correct.

| # | Sub-section | It owes | It fails when | **The tell** |
|---|---|---|---|---|
| 1 | `### Where the author was standing` | Who they were, when they wrote, what problem they were living inside, what they were reacting against — and what that predicts about **where the argument bends** | It becomes biography, or it explains the argument away | It describes the AUTHOR rather than what shaped the CLAIM. Test: delete every sentence that does not end in a prediction about the argument. If nothing survives, it is biography |
| 2 | `### What the author is actually saying` | The argument, more plainly than the chapter states it | It is a paraphrase at the same level of abstraction | It is the same length as the chapter's own thesis paragraph and uses the same nouns |
| 3 | `### Where readers get confused` | The SPECIFIC misreadings, named | "Some find it difficult" | No misreading is stated as a sentence a confused reader would actually say |
| 4 | `### The teaching pass` | The mechanism, taught — why it works, not that it works | It summarises the chapter a third time | It contains no "because" and no worked case |
| 5 | `### What real readers say` | Actual threads and reviews, **with where you looked named** | It manufactures consensus | Attributed to "many readers" / "reviewers often" with no venue. **If it is thin, the correct output says so.** A section that always finds agreement has stopped looking |
| 6 | `### What critics say` | The strongest case against, **steelmanned** | The critique is chosen because it is easy to answer | Every criticism is rebutted in the same paragraph. A steelman that loses every round was not one |
| 7 | `### What's been tested since` | Replication, later evidence, what failed to hold | A citation is not verified | A study named with an author and a year and no anchored link. See `source-rules.md` and the standing replication list |
| 8 | `### How practitioners actually use it` | What operators do, **at a stated scale** | It restates the book's advice as practice | No number anywhere: no team size, no duration, no frequency. "It has a learning curve" is not a failure mode |
| 9 | `### Where it doesn't transfer` | Where the claim's **conditions** differ — economics, institutions, country, life stage | It concludes, on his behalf, that the claim does not apply to him | A sentence with "you" as its subject and a conclusion as its verb. **§5 governs this section** |
| 10 | `### The version to hold` | The synthesis, in `:::tip[The version to hold]` — what survives all nine above | It is the core message again | It contains no qualification. Something that survived nine sections of scrutiny carries a scar |

---

## 4 · `clarified: false` — when the AI does not rewrite the chapter

`book.json` carries `familiarity` per book, and each chapter carries `clarified`.

> **Practical rule:** on unfamiliar material, let it explain freely. **On familiar material, go
> back to the original instead.**
> — `evidence/reading-with-ai.md:252`

And the sharper argument, which is about the genre rather than about you:

> A self-help book is usually one idea plus the examples, repetition and specificity that make it
> *actionable*. **Summaries preserve the idea and delete the machinery.**

When `clarified: false`:

- **`## The clarified chapter` is omitted entirely.** READ I is the original text.
- **`## Pre-context` is still produced** — `P3` part A. Orientation is not summary.
- **`## Core message` and `## Key points` move to `P4`,** after the recall has been marked. §1.
- **The explanation layer still runs in full.** It is doing a different job: it argues with the
  chapter, it checks the evidence, and it names where the claim's conditions differ. None of that
  is a summary.

**It is independently confirmed by him**, which matters because it is now two arguments rather than
one: *"you don't remove, alter the things that author wanted to say for original intent, you can
give extra instead"* (`reader.md` §4b). A clarified chapter may reorganise and expand; its cut list
must stay genuinely confined to padding and repetition. **When in doubt, keep it and add beside it.**

---

## 5 · The transfer question is ADDITIVE, never subtractive

This governs sub-section 9 and it is **his instruction, not the evidence's** — which is why it
overrides a tidier-sounding alternative.

> *"No, you don't think this as personal, what transfer or not in my context, you don't remove,
> alter the things that author wanted to say for original intent, you can give extra instead where
> this might be different for my context, environment, situations, country, personality, etc."*
> — `context/reader.md` §4, his words, 2026-08-31

| Allowed | Not allowed |
|---|---|
| "The chapter assumes a salaried role with discretionary hours. Where that does not hold, the mechanism it relies on is X." | "This will not work for you." |
| "The economics here are US-2016; the same ratio in Kathmandu is different, and here is why that changes the cost side." | Silently dropping the claim as inapplicable |
| Adding a paragraph on what the claim's condition looks like elsewhere | Rewriting the author's claim to fit a context they never addressed |

**The conclusion is his**, and it belongs with the recall and the commitment. An earlier version of
this file framed the section as a judgment about *his* life. He declined that framing explicitly.

---

## 6 · `## Dialogue` records the ORDER, not just the content

`P5`'s drafted template asked for `MY CONFUSIONS`, `MY PUSHBACK` and `MY QUESTION` — every field
states a belief before the model answers, which is precisely the input condition under which
sycophancy is strongest:

> **Never state your conclusion before asking.** Sycophantic agreement is triggered by the user
> *conveying a belief*. Withhold the belief and the trigger is absent.
> — `evidence/reading-with-ai.md:422`

So the section is written in two parts, in this order, and the order is the point:

```
### What I asked
### What it said
### What I then argued
### Where we ended up
```

**If the page shows your position before the answer, the answer that follows it is suspect.** That
is what makes the section auditable a year later, and it is why the shape is fixed.

`### Where we ended up` is allowed to record that nothing moved. *"I still think the objection
stands and it still thinks it doesn't"* is a better entry than a manufactured convergence, and a
`## Dialogue` in which the model agrees every time is evidence the questions carried the answers.

---

## 7 · `## Open questions` is the prohibition zone

Emit the heading and nothing else. **The AI never writes here.**

Questions you could not answer are the highest-value note anyone keeps and the ones nobody records.
The section exists to make you record them. A chapter marked `complete` with an empty
`## Open questions` and a full `## Dialogue` is the one inconsistency always worth flagging.

The same prohibition covers the first half of `## Recall`. Two sections, one rule: **the AI never
writes what only you can know.**

---

## 8 · Depth — decided by the brief, never by word count

**There is no length budget, and this is load-bearing rather than permissive.**

> *"No you generate what you generate, there shouldn't be any hard limit on that, if a chapter is 10
> hour or unlimited long, you do it, I read usually 30 mins a day on weekdays and 60 mins on
> weekends. Nothing happens if i don't finish a chapter or section or cover multiple chapters."*
> — `context/reader.md` §2, his words, 2026-08-31

So: **no per-section word budget. No rate table converting words to minutes. No "this section has
overrun."** A section that is long because the material is long is correct. `estMinutes` is
descriptive — what a chapter will cost, not what it may cost.

What *does* govern depth is the brief, through three fields that are already in `book.json`:

| `weightInArgument` | `verdict` | Treatment |
|---|---|---|
| `load-bearing` | `deep-dive` | Everything. Full teaching pass, critics steelmanned at length, replication checked claim by claim |
| `load-bearing` | `skim` | The mechanism in full; the practitioner and reader sections may be short if the search is genuinely thin — **and must say so** |
| `supporting` | `deep-dive` | Full layer, but sub-section 4 (`The teaching pass`) carries the weight and 8 (`practitioners`) may be brief |
| `supporting` | `skim` | The layer in full, each sub-section shorter. Nothing is dropped: a missing sub-section is a defect, a short one is a judgment |
| `illustrative` | anything | The chapter exists to carry an example. Say what the example is FOR, and do not inflate it into an argument |

And `gap` decides where the effort goes:

- **`gap: knowledge`** — the explanation layer carries the chapter. Sub-sections 2, 4 and 7.
- **`gap: execution`** — the explanation layer is not the point; `## Actions`, the obstacle and the
  day-30 review are. A perfect teaching pass on an execution gap is the most common way this system
  can waste a week. `evidence/reading.md:122` calls this the single distinction that predicts most
  of the disappointment people report with the genre.

**Every one of those judgments must leave a written trace.** Where a section is short because the
brief said `skim`, the section says so in one clause. "It was a judgment call" is not a defence if
the judgment was never written down.

---

## 9 · Pre-flight

Run this before the chapter is pasted. Any "no" is a rewrite.

**Structure**

- [ ] Twelve headings, exact strings, right order. No extra `##`. No `####`.
- [ ] `## The clarified chapter` is present if and only if `clarified: true`.
- [ ] `## Pre-context` is present even when `clarified: false`.
- [ ] `## Core message` and `## Key points` are present — from `P3` or from `P4`, per §1.
- [ ] The explanation layer has **ten** `###` sub-sections, in the order in §3.
- [ ] `### Where the author was standing` is the first of them.

**Order and prohibition**

- [ ] `## Recall` was written closed-book, before the explanation layer was read.
- [ ] `## Dialogue` shows the question before the position.
- [ ] `## Open questions` contains nothing but the placeholder.
- [ ] Nothing anywhere asks the reader to visualise an outcome.
- [ ] `### Where it doesn't transfer` describes conditions and draws no conclusion about him.

**Actions**

- [ ] `## Actions` contains `<Actions />` and nothing else.
- [ ] At most one action carries `committed: true` with `tier: now`, across the whole book.
- [ ] Every `committed` action names an `obstacle`, and it is not vague.

**Evidence and placement**

- [ ] Every claim in `## The explanation layer` appears in `## Sources` with an anchor and a tier.
- [ ] No tier-C source supports a claim about the world rather than about the book.
- [ ] Frontmatter `domain`, `cluster` and `book` match the directory this file sits in.
- [ ] `draft` was flipped to `false` **before** `npm run ci` was run — a `draft: true` page's MDX is
      syntax-checked by nothing at all. `CLAUDE.md` stack fact 11.
