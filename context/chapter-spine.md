# CHAPTER-SPINE — the grammar of one chapter page

**This governs the page. `book-spec.md` governs the tree the page hangs off and the book page above
it, `md-spec.md` governs the syntax, and `standards.md` governs clarity, register and depth.** Where
they touch, the more specific file wins.

One rule sits above all of it:

> **The chapter map is decided at Stage 2 and nowhere else. Generation decides nothing.**
>
> By the time a chapter is generated, its order, its title, what it argues, its weight in the
> book's argument and whether it gets clarified at all are already written in `book.json`.
> Stage 3 fills prose into a fixed shape. **A chapter that had to invent its own structure is
> evidence the brief was incomplete**, and that defect is upstream, not on the page.

And one standard sits under every section: **`standards.md` §2b.** *"The user must be able to
interpret and understand every sentence produced."* Complete sentences, every term defined where it
first appears, an example beside every difficult idea, and no length limit on explanation.

---

## 1 · The spine

**Twelve `##` headings, these exact strings, this order.** Headings are anchors, and anchors are
contracts across the whole corpus — prev/next, search, inbound links, the `↔` cross-links, the review
loop and **the comments anchored to them** all depend on them. Paraphrasing one ("What it says", "My
thoughts") breaks every inbound link and is a defect, not a style choice.

| # | Heading | Produced by | Fails when |
|---|---|---|---|
| 1 | `## Pre-context` | `P3`, **on every chapter** | It explains the chapter instead of preparing for it |
| 2 | `## Core message` | `P3` when `clarified: true`, else `P4` | More than one sentence |
| 3 | `## Key points` | `P3` when `clarified: true`, else `P4` | It is a summary of the chapter rather than its load-bearing claims — **or a claim stands with no explanation beside it** |
| 4 | `## The clarified chapter` | `P3` | **Present when `clarified: false`** — see §4 |
| 5 | `## Recall` | **YOU** | Written after reading the explanation layer |
| 6 | `## The explanation layer` | `P4` | Fewer than the **ten** `###` sub-sections, or it invents consensus |
| 7 | `## Dialogue` | `P5`, **the whole exchange** | Your position appears before the question — or **the middle of the argument is missing**. §6 |
| 8 | `## Concept map` | `P7` | It is a list of nouns rather than relationships, **or it cannot be read inside the column**. §6b |
| 9 | `## Actions` | `P6` | Anything other than `<Actions />` — **or fewer than two or more than ten actions in the frontmatter**. §6c |
| 10 | `## The 30-second version` | `P7` | Longer than thirty seconds of reading |
| 11 | `## Open questions` | **YOU** | **The AI wrote anything in it** |
| 12 | `## Sources` | `P4` | A claim in the body appears nowhere in it — **or appears with the wrong tier**, which is the defect `source-rules.md` exists for and the one that reads as correct |

**Any other `##` is a defect.** `###` freely inside 3, 4, 6, 7 and 8. **An `####` anywhere means the
chapter should have been split**, which is a `book.json` amendment, not a heading choice.

### The three orphans, and the correction that closed them

**Found 2026-08-31, and it was live on the majority case.** This table used to name `P3` as the
producer of sections 1, 2 and 3. But `P3-clarify.md:3` says P3 runs **only when `clarified: true`**
and is otherwise *"skipped entirely"* — so on a `clarified: false` chapter, three REQUIRED headings
had **no producer at all**. Four of the six *Deep Work* stubs carried `clarified: false`, so this was
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

**And one thing that is NOT a section: comments.** He comments on passages while reading, and those
comments live in a file beside the chapter, not in its MDX (`md-spec.md` §5d). They are his, like
`## Recall`, and the AI never writes one.

---

## 2 · What each section owes, how it fails, and the tell

**A section is earned, never filled.** An empty `## Dialogue` under a heading is worse than no
dialogue, because it claims an argument happened.

The third column is the part worth reading twice. Several of these fail in a way that looks like
success — the prose is fluent, the structure is right, and the content is wrong. The **tell** is the
mechanical give-away: something you can look for without having to judge the writing.

| Section | It owes | It fails when | **The tell** |
|---|---|---|---|
| `## Pre-context` | What must already be in your head — a term the chapter uses without defining, **defined with an example**; the argument of the chapter before it; the debate it is answering. **As long as that takes** | It summarises what is coming | It contains a claim FROM the chapter rather than a condition FOR it. Grep for the chapter's own thesis sentence appearing here |
| `## Core message` | One sentence, in `:::note[Core message]`, in plain words | Two messages fused with "and" or a semicolon | A semicolon, or a second finite verb clause that could stand alone. If both halves survive being cut apart, the chapter has two messages and the brief should say so |
| `## Key points` | The claims the argument RESTS on. **Each is one plain bold sentence, followed by as much explanation as it needs: what it means, why the author holds it, and an example.** No length limit | It becomes a précis — every point in chapter order, all the same weight — or a list of bare assertions | Point ordering matches the chapter's paragraph ordering exactly, no point is longer than any other, **or a point has no "for example" and no "because"** |
| `## The clarified chapter` | A rebuild that keeps the examples, the numbers and the repetition, plus a cut list that names what went | The cut list says "some repetition" | The cut list has no nouns in it. A real one names the anecdote |
| `## Recall` | Your attempt, closed-book, plus the questions you could not answer | The AI wrote in it, or it was written after the explanation layer | Vocabulary from the explanation layer that is not in the chapter. That is not proof, but it is where to look |
| `## The explanation layer` | Ten sub-sections, §3. **No length limit** | Manufactured consensus, invented critics, unverified citations, **compressed notes where explanation was owed** | See §3. Each sub-section has its own |
| `## Dialogue` | **Five** sub-sections in the fixed order, recording the whole exchange | Your position precedes the model's answer, or the record jumps from the first reply to the conclusion | `### What I then argued` appears before `### What it said`; `### What I asked` states a conclusion rather than a question; **or `### How the exchange went` is missing while `### Where we ended up` describes a change of mind nobody can see happen** |
| `## Concept map` | Relationships between ideas, drawn to fit the column, with a caption. §6b | It is a list of nouns with a root, or a wide diagram shrunk to unreadable | Every edge is unlabelled and the graph is a star: one root, N leaves, no cross-links. **Or more than about four nodes side by side at any level** |
| `## Actions` | `<Actions />` and nothing else — **and two to ten actions in frontmatter**. §6c | Prose creeps in around it; filler actions reach the minimum | Any character in the section other than the component. An action whose `then` would be satisfied by another action's `then` |
| `## The 30-second version` | What you would say in a lift, **in complete sentences with no undefined term**, plus the `↔` cross-links | It becomes a second summary | It is longer than `## Core message` plus three sentences |
| `## Open questions` | Your questions, and nothing generated | Anything the AI wrote | See §7. This is the prohibition zone |
| `## Sources` | Claim, anchored URL, date read, tier — **including every reader source, chart value and real-life incident** | A body claim is absent — or present at the wrong tier | A tier-C row supporting a statement about the WORLD rather than about the book. `source-rules.md` is entirely about this one |

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

**Revised 2026-09-14, two rows, both on his instruction** (`reader.md` §10):

- **Sub-section 1 stopped carrying the biography.** He asked for a *"more detailed section on the
  author's context"*, and it now lives once per book, on the book page, as `## Author context`
  (`book-spec.md` §6). The chapter sub-section says only what about the author bears on **this
  chapter's** claim, and links up.
- **Sub-section 5 was overhauled.** *"not just 3-4 specific users, since that sample size won't
  reflect reality."* §3b is the method.

| # | Sub-section | It owes | It fails when | **The tell** |
|---|---|---|---|---|
| 1 | `### Where the author was standing` | What about the author's life and moment bears on **this chapter's** claim — the job they held, the field's debate that year, the audience they were writing for — and what that predicts about **where this chapter's argument bends**. A link to `## Author context` on the book page for the full biography | It repeats the book page's biography, or it explains the argument away | A biographical sentence with no line connecting it to a claim in this chapter. Test: delete every sentence that does not end in a prediction about this chapter's argument. If nothing survives, it belongs on the book page |
| 2 | `### What the author is actually saying` | The argument, more plainly than the chapter states it, **with an example of the claim in action** | It is a paraphrase at the same level of abstraction | It is the same length as the chapter's own thesis paragraph and uses the same nouns |
| 3 | `### Where readers get confused` | The SPECIFIC misreadings, named, **and the correct reading beside each** | "Some find it difficult" | No misreading is stated as a sentence a confused reader would actually say |
| 4 | `### The teaching pass` | The mechanism, taught — why it works, not that it works — **with at least one worked case, and an analogy where the idea is abstract** | It summarises the chapter a third time | It contains no "because" and no worked case |
| 5 | `### What real readers say` | **Clusters of opinion from a wide sample of real readers, with the venues, the counts and the limits of the sample** — §3b | It manufactures consensus, or presents three or four reviewers as "readers" | No venue, no count, or a count with no denominator. **If the sample is thin, the correct output says THIN, with the number** |
| 6 | `### What critics say` | The strongest case against, **steelmanned** | The critique is chosen because it is easy to answer | Every criticism is rebutted in the same paragraph. A steelman that loses every round was not one |
| 7 | `### What's been tested since` | Replication, later evidence, what failed to hold — **and what has supported it** | A citation is not verified | A study named with an author and a year and no anchored link. See `source-rules.md` and the standing replication list. The book page's `## Context then vs. context today` is checked first; this sub-section applies it to the chapter's claims |
| 8 | `### How practitioners actually use it` | What operators do, **at a stated scale**, with **real, sourced** cases | It restates the book's advice as practice | No number anywhere: no team size, no duration, no frequency. "It has a learning curve" is not a failure mode |
| 9 | `### Where it doesn't transfer` | Where the claim's **conditions** differ — economics, institutions, country, life stage | It concludes, on his behalf, that the claim does not apply to him | A sentence with "you" as its subject and a conclusion as its verb. **§5 governs this section** |
| 10 | `### The version to hold` | The synthesis, in `:::tip[The version to hold]` — what survives all nine above | It is the core message again | It contains no qualification. Something that survived nine sections of scrutiny carries a scar |

---

## 3b · `### What real readers say` — the method

> *"This section needs to be improved. It should extensively search for clusters of opinions from a
> wide range of real people — from a minimum number up to hundreds of real users — not just 3-4
> specific users, since that sample size won't reflect reality."*
>
> *"Consider using a Reddit-style AI feature that summarizes all user answers on a given topic —
> retrieve that summary where possible. If it can't be retrieved, provide the relevant Reddit
> posts/subreddit topics instead, so the user can bring them and read them personally."*
>
> — his instructions, 2026-09-14. `reader.md` §10e.

**Why the old version failed while following its own rule.** It asked for *"actual threads and
reviews, with where you looked named"*. That is honest, and it produced three or four quoted
reviewers — a sample that tells you what four people thought, under a heading that says *readers*.
Naming the venue stopped consensus being invented; it did nothing about consensus being
extrapolated.

### The shape — five parts, in this order, under the one `###`

Plain paragraphs and short lists. **No `####`**; a bold lead-in names each part.

1. **Where I looked, and how much I read.** Every venue by name, with links — the subreddits and the
   specific threads, Goodreads, Amazon, StoryGraph, Hacker News, YouTube comment sections, blogs,
   forums — the date of the search, and **N: the number of distinct reader opinions actually read.**
   A thread counts by the comments read, never by the comments it holds.
2. **The clusters.** Each distinct position readers take, largest first, as:
   - one plain sentence stating the position;
   - ***n* of *N*** who held it;
   - one or two short quotes, linked, that show it in the readers' own words;
   - whether it is about **this chapter** or about the book in general.

   A minority view of 3 of 140 is still a cluster when it makes an argument the others do not.
3. **Who is speaking.** What the sample can and cannot tell him: who writes reviews (people who
   finished, people who were annoyed), which venue skews which way, how old the threads are, and
   whether the readers describe situations like the ones the chapter assumes. **Descriptive only** —
   it never concludes that the book does or does not apply to him (§5).
4. **The AI summary.** Try Reddit Answers (reddit.com/answers), and any similar summary feature the
   session can reach.
   - **If it is retrieved:** quote it as tier C — the tool, the exact query, the date, and the
     summary text — then say where it agrees with the clusters above and where it does not
     (`source-rules.md` §1b).
   - **If it cannot be retrieved** — no access, a login wall, a tool the session does not have — say
     so in one sentence, then give him: **(a)** the exact query to type into Reddit Answers himself;
     **(b)** the five to ten most useful threads, each with its link, its subreddit, its date and one
     line on why it is worth reading; **(c)** the subreddit searches worth running. He reads those
     himself, and may paste what he finds back into the chat.
5. **What it adds up to.** Two or three sentences: where readers agree, where they split, and what
   that says about the chapter's **reception** — never about whether its claim is true.

### The floor, the aim and the stop — numbers, not a feeling

| | |
|---|---|
| **Floor** | **At least 30 distinct opinions from at least 3 different kinds of venue** before any cluster is reported with a count. Below it, report what was found and write **THIN**, with the actual N — *"THIN: 18 opinions from two venues."* Set by Claude Code on 2026-09-14 as a default for *"a minimum number"*; `reader.md` §8 lists it as his to change |
| **Aim** | **Up to hundreds.** *"from a minimum number up to hundreds of real users"* |
| **Stop** | **Saturation** — the last 20 opinions read added no new cluster — or the tools ran out, and the section says which |

**Honesty about the tools.** A chat session's search may reach only a handful of pages, and several
review sites block automated reading. **Never report a count that was not read.** A small, honest N
with the reason is a correct output; a large round number is an invented citation (`standards.md`
§2 rule 11). That is also why part 4's fallback exists: the list of threads is how *he* gets to the
hundreds when the session cannot.

### One sweep per book, reused per chapter

Most readers discuss the book, not chapter 7. **The first chapter's sweep collects the book-wide
threads**, and its venue list is kept with the book's notes. Later chapters paste that list into `P4`,
add chapter-specific threads where they exist, and say which opinions address **this chapter's**
claim. A chapter nobody discusses specifically says so — that is a finding, not a gap.

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

## 6 · `## Dialogue` records the ORDER — and, since 2026-09-14, the whole exchange

`P5`'s drafted template asked for `MY CONFUSIONS`, `MY PUSHBACK` and `MY QUESTION` — every field
states a belief before the model answers, which is precisely the input condition under which
sycophancy is strongest:

> **Never state your conclusion before asking.** Sycophantic agreement is triggered by the user
> *conveying a belief*. Withhold the belief and the trigger is absent.
> — `evidence/reading-with-ai.md:422`

The section used to be four sub-sections — the question, the answer, his position, the ending. He
read one and said what was missing:

> *"The back-and-forth dialogue feature should support the full flow of a conversation — not just a
> single "what I said / what it said" pair, but the complete exchange: what was argued next, and
> where the conversation ended up — since the middle portion of a dialogue can be longer and more
> involved."*
> — his instruction, 2026-09-14. `reader.md` §10d.

So the section is **five** sub-sections, in this order, and the order is still the point:

```
### What I asked            the opening question, as asked, with no position in it
### What it said            the model's independent answer, before it knew his view
### What I then argued      his position, stated only after that answer
### How the exchange went   every turn after that, in order, both sides
### Where we ended up       each side's final position, and what moved whom
```

**The first three are unchanged, because they are the audit.** If the page shows his position before
the answer, the answer that follows it is suspect — and that is what makes the section checkable a
year later. `### How the exchange went` is **added** between the position and the ending, so the
change of mind — or the refusal to change — is visible where it happened.

### Writing `### How the exchange went`

**One turn per speaker label, in order, and nothing summarised away:**

```mdx
**Me:** I think the ritual only works if the day already had an end. Mine often does not.

**AI:** The chapter's own example assumes a fixed finish, so that objection is fair — but the
mechanism it names is closing open loops, not ending the day. For example, …

- first point it made
- second point it made

**Me:** Then the test is whether writing the loops down works at 23:00 as well as at 17:30.

**AI (as sceptic):** …
```

| Rule | Because |
|---|---|
| **Labels are exactly `**Me:**` and `**AI:**`** at the start of a paragraph, and `**AI (as sceptic):**` for `P5` message three | The page styles each turn as one side of a conversation from those labels, and a paragraph with no label belongs to the turn above it. A different label reads as ordinary prose |
| **His turns are his words.** Spelling may be corrected where it would confuse; the wording, the order and the position may not | A cleaned-up version of what he argued is a better argument than the one he made, and it hides where he actually was |
| **The model's turns keep every point, concession and example**; only padding may be condensed | *"the middle portion of a dialogue can be longer and more involved"*. A condensed middle is the one-exchange dialogue with more words |
| **No length limit** | The same rule as the explanation layer |
| **If nothing followed his position**, the sub-section says so in one sentence | An absent sub-section and an argument that ended at the first reply look identical otherwise |

### `### Where we ended up`

**Each side's final position in its own sentence, and for any change of mind, the turn where it
happened and the step that caused it.** It is allowed to record that nothing moved. *"I still think
the objection stands and it still thinks it doesn't"* is a better entry than a manufactured
convergence, and a `## Dialogue` in which the model agrees every time is evidence the questions
carried the answers.

---

## 6b · `## Concept map` and diagrams

> *"A clean concept map designed to fit within the current flow of paragraphs and side widths, with
> the ability to expand/collapse to fill the whole screen."*
>
> *"the user wants Mermaid used to its full capacity wherever relevant/required — including tables,
> graphics, bar graphs, charts, pie charts, line graphs, histograms, mindmaps, etc."*
> — his instructions, 2026-09-14. `reader.md` §10c.

### The concept map

**It still owes relationships, not nouns** — a concept map with no cross-links is a table of contents.
What changed is that it must now **read cleanly inside the text column**: every diagram on a reading
page stays within the paragraph width (595px at Normal size on a 1280px screen, measured 2026-09-14, and a phone's width on a phone),
and carries an **Expand** control that opens it to fill the screen, with **Close** and Escape to
return. The column version must be readable on its own. **Expand is for detail, not for rescue.**

| Rule | The tell it prevents |
|---|---|
| **A one- or two-sentence caption before the fence**: what the map shows and how to read it | A diagram whose meaning has to be reverse-engineered from its shape. `standards.md` §2b |
| **Grow down, not across.** `flowchart TD` or `mindmap`; **no more than about four nodes side by side at any level** | A wide `graph LR` scaled to fit the column until every label is 7px |
| **About twelve nodes is a signal to split.** Two maps, each with its own caption, beat one dense one | A 25-node map that is legible only after Expand |
| **Short labels — about five words.** The explanation belongs in the prose; the node names the idea | A sentence inside a box, clipped at the edge |
| **Every edge labelled**, in two to four words, saying *how* the two ideas relate | An unlabelled edge asserts a connection without saying what it is — the diagram's "studies show" |
| **At least one cross-link** that is not hierarchy — the idea that undercuts another, the two mechanisms that are one | A star: one root, N leaves |
| **One or two diagrams**, never a gallery | A section that became a picture book |
| **If the chapter does not have that kind of structure, say so and omit the fence** rather than drawing one | A diagram that restates the paragraph above it |

### Diagrams anywhere else on the page

**Mermaid is used wherever it helps understanding**, not only in `## Concept map`: a flowchart of a
mechanism in `### The teaching pass`, a bar chart of effect sizes in `### What's been tested since`, a
sequence diagram of how an argument unfolded, a pie chart of where the book spends its pages. The
types, with a working example of each, are in `md-spec.md` §6 and rendered on `/elements/`.

Three rules apply to every one:

1. **It earns its place** — it shows something the prose cannot show as quickly. Decoration is a
   defect.
2. **A caption sentence comes first**, in the prose: what the diagram shows and how strong the
   evidence behind it is.
3. **A chart is a claim.** Every plotted number is in `## Sources`, or the chart's title says the
   numbers are illustrative (`source-rules.md` §3b). **Tables stay Markdown tables** — he listed
   tables with the diagrams, and a GFM table is the right tool for tabular text.

---

## 6c · `## Actions` — two to ten per chapter

> *"A list of action items for each chapter — minimum 2, maximum 10. Only put things that earns"*
> — his instruction, 2026-09-14, **with the end of the sentence missing**. `reader.md` §10c.

**What it reverses.** Until this date the rule was *"extraction is uncapped"*, and `P6` and
`<Actions />` both said *"a conceptual chapter may support none"*. He set a floor and a ceiling:
**every chapter carries between two and ten actions in its frontmatter.**

**What does not change.** **One committed action per book** (`reconciliation.md` row 2) — at most one
`committed: true` with `tier: now` across the whole book, written by him, with its obstacle named.
The two to ten are the ledger's candidates; the commitment is still one.

### "Earns" — earns its place, confirmed

*"Only put things that earns"* means **earns its place** — the phrase this repository already uses
for sections and diagrams. Read that way on 2026-09-14 and **confirmed by him the same day**
(`reader.md` §10c). An action earns its place when all four hold:

| | Test |
|---|---|
| 1 | **Anchored** — it follows from a specific, named claim in this chapter. `P6` names the claim for every candidate |
| 2 | **Observable** — someone watching could tell whether it happened |
| 3 | **Distinct** — no other action in the book is satisfied by the same behaviour |
| 4 | **Worth a ledger row** — its honest impact says what it would change, even when that is "probably marginal but costs nothing" |

### At the two edges

- **Fewer than two honest candidates.** A conceptual chapter meets the floor with **`tier:
  reference`** actions — a rule to apply when the situation arises (*"When I next meet a claim resting
  on one study, I look for its replication before repeating it"*) — which are real and are not
  habits. **Inventing a habit to reach two is the defect.** If even two honest reference rules cannot
  be anchored, `P6` says so, the chapter carries the two it has, and `/validate` reports it for him to
  decide: that chapter was probably mis-weighted in the brief.
- **More than ten.** `P6` keeps the ten that carry the most weight and lists the rest outside the YAML
  as *considered, not kept*, each with a one-line reason. They do not reach the page.

---

## 7 · `## Open questions` is the prohibition zone

Emit the heading and nothing else. **The AI never writes here.**

Questions you could not answer are the highest-value note anyone keeps and the ones nobody records.
The section exists to make you record them. A chapter marked `complete` with an empty
`## Open questions` and a full `## Dialogue` is the one inconsistency always worth flagging.

The same prohibition covers the first half of `## Recall`, and **every comment** he leaves on the page
(`md-spec.md` §5d). One rule: **the AI never writes what only you can know.**

---

## 8 · Depth — decided by the brief, never by word count

**There is no length budget, and this is load-bearing rather than permissive.**

> *"No you generate what you generate, there shouldn't be any hard limit on that, if a chapter is 10
> hour or unlimited long, you do it, I read usually 30 mins a day on weekdays and 60 mins on
> weekends. Nothing happens if i don't finish a chapter or section or cover multiple chapters."*
> — `context/reader.md` §2, his words, 2026-08-31

> *"Key points & explanation layer: No limit on length or level of detail — since these are major,
> they should be as long and as detailed as each chapter demands or requires."*
> — his instruction, 2026-09-14

So: **no per-section word budget. No rate table converting words to minutes. No "this section has
overrun."** A section that is long because the material is long is correct. `estMinutes` is
descriptive — what a chapter will cost, not what it may cost.

What *does* govern depth is the brief, through three fields that are already in `book.json`. **Depth
decides breadth — how many angles, how many examples — and never clarity** (`standards.md` §4 rule 3):
a narrower sub-section still defines every term and gives every claim an example.

| `weightInArgument` | `verdict` | Treatment |
|---|---|---|
| `load-bearing` | `deep-dive` | Everything. Full teaching pass, critics steelmanned at length, replication checked claim by claim |
| `load-bearing` | `skim` | The mechanism in full; the practitioner and reader sections may cover fewer angles if the search is genuinely thin — **and must say so, with the count** |
| `supporting` | `deep-dive` | Full layer, but sub-section 4 (`The teaching pass`) carries the weight and 8 (`practitioners`) may be narrower |
| `supporting` | `skim` | The layer in full, each sub-section covering fewer angles. Nothing is dropped and nothing is compressed: a missing sub-section is a defect, a narrower one is a judgment |
| `illustrative` | anything | The chapter exists to carry an example. Say what the example is FOR, and do not inflate it into an argument |

And `gap` decides where the effort goes:

- **`gap: knowledge`** — the explanation layer carries the chapter. Sub-sections 2, 4 and 7.
- **`gap: execution`** — the explanation layer is not the point; `## Actions`, the obstacle and the
  day-30 review are. A perfect teaching pass on an execution gap is the most common way this system
  can waste a week. `evidence/reading.md:122` calls this the single distinction that predicts most
  of the disappointment people report with the genre.

**Every one of those judgments must leave a written trace.** Where a section is narrower because the
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
- [ ] `### Where the author was standing` is the first of them, and is about **this chapter**.
- [ ] `## Dialogue` has **five** `###`, in the order in §6, and `### How the exchange went` uses the
      `**Me:**` / `**AI:**` labels.

**Clarity** — `standards.md` §2b

- [ ] Every sentence is a complete sentence. No arrows, slash-lists or dropped articles in prose.
- [ ] Every technical term is defined, in plain words, where it first appears.
- [ ] Every key point and every load-bearing claim has an example, a worked case or an analogy.
- [ ] Every analogy says where it breaks; every real-life incident has a source row; every
      hypothetical is labelled and is about someone else.
- [ ] Nothing was simplified into a different claim.

**Order and prohibition**

- [ ] `## Recall` was written closed-book, before the explanation layer was read.
- [ ] `## Dialogue` shows the question before the position.
- [ ] `## Open questions` contains nothing but the placeholder.
- [ ] Nothing anywhere asks the reader to visualise an outcome.
- [ ] `### Where it doesn't transfer` describes conditions and draws no conclusion about him.

**Readers, diagrams, actions**

- [ ] `### What real readers say` names its venues and its N, reports clusters as *n of N*, and either
      quotes the AI summary or gives the query and the threads. THIN is written where N is under 30.
- [ ] Every diagram has a caption sentence before it and fits the column; the concept map has labelled
      edges and at least one cross-link.
- [ ] Every chart's numbers are in `## Sources`, or its title says illustrative.
- [ ] `## Actions` contains `<Actions />` and nothing else, and the frontmatter holds **two to ten**.
- [ ] At most one action carries `committed: true` with `tier: now`, across the whole book.
- [ ] Every `committed` action names an `obstacle`, and it is not vague.

**Evidence and placement**

- [ ] Every claim in `## The explanation layer` appears in `## Sources` with an anchor and a tier.
- [ ] No tier-C source supports a claim about the world rather than about the book.
- [ ] Frontmatter `domain`, `cluster` and `book` match the directory this file sits in.
- [ ] `draft` was flipped to `false` **before** `npm run ci` was run — a `draft: true` page's MDX is
      syntax-checked by nothing at all. `CLAUDE.md` stack fact 11.
