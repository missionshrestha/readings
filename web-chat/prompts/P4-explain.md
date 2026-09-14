# P4 — the explanation layer

**Stage 6. AFTER you have written `## Recall` closed-book.** Search on where possible.

**Length: 2522 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **Do not run this before the recall.** The whole design is that you produce first and receive
> second — retrieval scored **61% against 40%** for rereading. Running this first turns the chapter
> into something you have read rather than something you know.

> **TEN sub-sections since 2026-08-31, not nine.** `### Where the author was standing` is new and is
> first. It came from him, unprompted: *"everyone's thought is inspired, derived from their own
> circumstances, so that can help understand what writer/author actually meant and why."*
> `chapter-spine.md` §3 has the three reasons it sits here rather than in `## Pre-context`.

> **Two sub-sections changed on 2026-09-14, on his instruction.** `### Where the author was standing`
> stopped carrying the biography — that now lives once per book, on the book page, as
> `## Author context`, written by [`P2b`](P2b-book-page.md) — and says only what bears on this
> chapter. `### What real readers say` became a sample: *"not just 3-4 specific users, since that
> sample size won't reflect reality."* `chapter-spine.md` §3 and §3b.

## Paste with it

`00-CONTEXT-PACK` ● · the full chapter ● · its `book.json` node ● · `chapter-spine` ● · `md-spec` ● ·
`standards` ● · `source-rules` ● — `GUIDE.md` Appendix A. **Everything.** This is the heaviest prompt
in the library and the one where an invented citation costs the most. **Search on.**

And your recall, written closed-book. See [recall.md](recall.md).

**Not the first chapter of the book?** Paste the **venue list** from the first chapter's
`### What real readers say` as well — the subreddits, threads and review pages it read. One sweep per
book, reused per chapter: most readers discuss the book, not chapter 7. The book page's
`## Author context` helps sub-section 1 ○.

---

````text
Here is chapter [N] of [BOOK]. Here is its node from my brief:

[PASTE THE CHAPTER'S book.json NODE — argues, weightInArgument,
 verdict, clarified, and the book's gap, domain, cluster and slug]

And here is what I wrote from memory before reading anything of yours:

[PASTE YOUR RECALL]

The book's venue list for "What real readers say":

[PASTE THE VENUE LIST FROM THE FIRST CHAPTER'S SWEEP — OR WRITE
 "FIRST CHAPTER: NO LIST YET"]

FIRST: mark my recall. What did I miss, and what did I get wrong?
State the misses AS QUESTIONS first — let me answer before you tell me.
Do not soften the marking. If I reconstructed the conclusion and lost
the mechanism, say that in those words; it is the most common failure
and the one I most need told.

IF THE NODE ABOVE SAYS clarified: false, also produce ## Core message
and ## Key points now, AFTER the marking above and before the
explanation layer. On familiar material these come after my own
attempt rather than before my reading, so they check the attempt
instead of replacing the reading.
  ## Core message  one sentence, in plain words, in a
                   :::note[Core message] block
  ## Key points    the claims the argument RESTS on, ordered by how
                   much rests on each, so they come out unevenly
                   sized. EACH POINT is one plain sentence in bold —
                   the claim — followed by as much explanation as it
                   needs: what it means, why the author holds it, and
                   an example. A point with no "because" and no "for
                   example" is a bare assertion. No length limit.

THEN produce the explanation layer as TEN ### sub-sections, in this
order, under ## The explanation layer:

  ### Where the author was standing
      What about the author's life and moment bears on THIS chapter's
      claim — the job they held, the field's debate that year, the
      audience they were writing for — and WHAT THAT PREDICTS ABOUT
      WHERE THIS CHAPTER'S ARGUMENT BENDS. The full biography is on
      the book page; do not repeat it. Link up to it as
      [Author context](/DOMAIN/CLUSTER/BOOK/#author-context), with the
      three slugs from the node. If a sentence does not end in a
      prediction about this chapter, it belongs on the book page, not
      here. Never use it to explain the argument away.
  ### What the author is actually saying
      The argument, more plainly than the chapter states it, WITH AN
      EXAMPLE OF THE CLAIM IN ACTION. If your version is the same
      length and uses the same nouns, you have paraphrased rather than
      clarified.
  ### Where readers get confused
      The specific misreadings, each stated as a sentence a confused
      reader would actually say, AND THE CORRECT READING BESIDE EACH.
      Not "some find it difficult".
  ### The teaching pass
      The mechanism, taught rather than summarised. WHY it works, not
      that it works. At least one WORKED CASE — one situation walked
      through step by step, so the "because" is visible — and an
      analogy where the idea is abstract, saying where the analogy
      breaks. If there is no "because" in this section it is a fourth
      summary.
  ### What real readers say
      A SAMPLE OF REAL READERS, NOT THREE REVIEWERS. Five parts, in
      this order, each with a bold lead-in, as paragraphs and short
      lists. No ####.
      1 · WHERE I LOOKED, AND HOW MUCH I READ. Every venue by name,
          with links: the subreddits and the specific threads,
          Goodreads, Amazon, StoryGraph, Hacker News, YouTube comment
          sections, blogs, forums. The date of the search. And N: the
          number of distinct reader opinions ACTUALLY READ. A thread
          counts by the comments you read, never by the comments it
          holds.
      2 · THE CLUSTERS, largest first. For each: the position in one
          plain sentence; n of N who held it; one or two short linked
          quotes in the readers' own words; and whether it is about
          THIS chapter or the book in general. A minority of 3 of 140
          is still a cluster when it makes an argument the others do
          not.
      3 · WHO IS SPEAKING. What the sample can and cannot tell me: who
          writes reviews (people who finished, people who were
          annoyed), which venue skews which way, how old the threads
          are, and whether the readers describe situations like the
          ones the chapter assumes. Descriptive only — never a
          conclusion that the book does or does not apply to me.
      4 · THE AI SUMMARY. Try Reddit Answers (reddit.com/answers), and
          any similar summary feature you can reach.
          IF RETRIEVED: quote it as tier C — the tool, the exact query,
          the date and the summary text — then say where it agrees
          with your clusters and where it does not. It is a lead, not a
          finding.
          IF NOT: say so in one sentence, and why — no access, a login
          wall, no such tool. Then give me (a) the exact query to type
          into Reddit Answers myself; (b) the five to ten most useful
          threads, each with its link, its subreddit, its date and one
          line on why it is worth reading; (c) the subreddit searches
          worth running. Never paraphrase what a summary would probably
          have said.
      5 · WHAT IT ADDS UP TO. Two or three sentences: where readers
          agree, where they split, and what that says about the
          chapter's RECEPTION — never about whether its claim is true.
      THE NUMBERS. FLOOR: at least 30 distinct opinions from at least 3
      different kinds of venue before any cluster is reported with a
      count. Below it, report what you found and write THIN with the
      real N — "THIN: 18 opinions from two venues." AIM: up to
      hundreds. STOP at saturation — the last 20 opinions read added no
      new cluster — or when the tools ran out, and say which.
      NEVER REPORT A COUNT YOU DID NOT READ. A small, honest N with the
      reason is a correct output; a large round number is an invented
      citation. If your search reaches only a handful of pages, or a
      site blocks you, say so — the thread list in part 4 is how I get
      to the hundreds myself.
      ONE SWEEP PER BOOK. On the first chapter, collect the book-wide
      threads and end part 1 with the venue list, so I can keep it. On
      a later chapter, start from the venue list I pasted above, add
      chapter-specific threads where they exist, and say which opinions
      address THIS chapter's claim. A chapter nobody discusses
      specifically is a finding, not a gap.
  ### What critics say
      The strongest case against, argued properly — steelmanned, not
      dismissed. If you rebut every criticism in the same paragraph
      you raised it, you chose the criticisms you could answer.
  ### What's been tested since
      Replication, later evidence, what has failed to hold — AND WHAT
      HAS SUPPORTED IT. Verify every citation; I will check them. A
      study named with an author and a year and no anchored link is
      not a citation. The book page's "Context then vs. context today"
      checked the book once; apply its findings to this chapter's
      claims rather than rediscovering them.
  ### How practitioners actually use it
      What people who operate this do, AT A STATED SCALE — a team
      size, a duration, a frequency — with REAL, SOURCED cases. "It has
      a learning curve" is not a failure mode. If there is no number in
      this section, it is the book's advice restated as practice.
  ### Where it doesn't transfer
      Where the CLAIM'S CONDITIONS differ: economics, institutions,
      country, stage of life, who controls the interruptions. Describe
      the difference and what it costs. DO NOT conclude that it
      therefore does not apply to me — that conclusion is mine, and it
      belongs with my recall and my commitment. ADD, never subtract.
  ### The version to hold
      The synthesis, in a :::tip[The version to hold]. What survives
      all nine sections above. If it carries no qualification it did
      not survive them; it skipped them.

HOW TO WRITE ALL OF IT — my standard, not a style note: "The user must
be able to interpret and understand every sentence produced."
  · Complete sentences, not notes. No arrows, slash-lists or dropped
    articles. One main idea per sentence.
  · Define every term where it first appears on the page, in plain
    words. A term that returns in a later sub-section gets a short
    reminder the first time it does: sections are read days apart.
  · Name the thing; never "this" for something three sentences back.
  · The claim first, then its strength, then why.
  · An example beside every claim that is not self-evident. A worked
    case for every mechanism. An analogy where an idea is abstract,
    saying where it breaks.
  · A real-life incident is real and has a row in Sources, or it is a
    labelled hypothetical about someone else — "Suppose a team of
    five…". Never a scenario that asks me to picture my own success.
  · Keep the meaning intact. Simplify the words, never a claim's
    strength, scope or conditions. Would the author sign it?
  · Never shorten by compressing. Padding is still banned: preamble,
    recap, restating the heading, reassurance.

DIAGRAMS — allowed in any sub-section, wherever they help
  A mermaid flowchart of the mechanism in the teaching pass; a bar
  chart of effect sizes in what's been tested since. Each one:
  · earns its place — it shows what the prose cannot show as quickly
  · has a caption sentence BEFORE it: what it shows, how to read it,
    and for a chart how strong the evidence behind the numbers is
  · reads inside the text column: grow down, labels of about five
    words, split past about twelve nodes
  · IS A CLAIM if it is a chart: every plotted number has a row in
    Sources, or the chart's title says the numbers are illustrative
  · never hard-codes a colour. Tables stay Markdown tables.

Then ## Sources, as a table with EXACTLY these four columns:

  | Claim | Source | Read on | Tier |

One row per empirical claim in the body — AND one per reader source,
per real-life incident and per plotted chart value. "Source" is an
anchored URL, not a bare title. "Read on" is the date you opened it.
"Tier" is one of four and it is not optional:

  A  primary       the study, the meta-analysis, the original text
  B  independent   a replication, a critic, a review with no stake
  C  self-report   what a source says about its own claim — THIS BOOK
                   about its evidence, or an AI summary of opinions
  D  unsourced     "studies show". Not allowed to support anything

A reader thread or review is written "B · reception"; Reddit Answers
is "C · AI summary". Reader opinion is evidence of what readers
thought, never of what is true.

TIER C MAY ONLY SUPPORT WHAT THE SOURCE CLAIMS, NEVER WHAT IS TRUE.
Write "Newport cites a 2012 McKinsey figure that...", never "knowledge
workers spend 28% of the week on email". The second is the first with
its provenance deleted, and that deletion is the defect. The test: if
the book turned out to be wrong about its own source, would the
sentence still stand? If yes it needed tier A or B.

If you cannot verify a citation, write
  [UNVERIFIED: what the book attributes it to; what I searched; what
   I found instead; and what changes if it is wrong]
All four parts. An honest gap is a correct output. An invented author,
year and journal is the easiest thing you can generate and the hardest
thing I can catch.

EVERY empirical claim carries a STRENGTH WORD in the sentence itself,
never in a footnote and never in the table alone. Four words, and they
are not interchangeable:

  replicated           independent groups, same direction. Load-bearing
  single study         one lab, one sample. Interesting, not settled
  contested            competent people disagree about it NOW
  failed to replicate  say it WHERE the original claim is made

An effect size beats an adjective, and an undated fact rots silently
while a dated one rots visibly.

These six get their status in the sentence without exception, because
each has failed to replicate or been materially walked back and each
runs through dozens of books on my shelf:

  priming · ego depletion · power posing · learning styles
  the 10,000-hour rule · handwriting beats typing (contested)

There is no length limit. Depth is set by the brief, and it decides
BREADTH, never clarity. A load-bearing deep-dive chapter gets
everything; a supporting skim gets every sub-section, each covering
fewer angles with fewer examples — but never an undefined term, a
claim without an example, or a skipped step. NEVER DROP A SUB-SECTION
— a missing one is a structural defect. Where one is narrower, say in
one clause why.

MISSING INPUTS — NAME THEM AND STOP

If my recall is not above, STOP and ask for it. Producing the
explanation first contaminates it, and the marking afterwards measures
nothing. If the brief node is not above, say so — without clarified
you cannot know whether sections 2 and 3 are yours to write. If you do
not have search, say so in the first line: "what real readers say" and
"what's been tested since" are not written from memory, and a
plausible paragraph in either is the most expensive output in this
system. If the venue-list bracket above is unfilled, ask whether this
is the first chapter; do not pretend an earlier sweep exists. If the
node has no domain, cluster or slug, write the link to Author context
as plain text and say so.

Four-backtick fence. Nothing outside it. The ten sub-sections land
between the SPINE marker comments already on the page — do not
reproduce those comments, do not rename a heading, and keep all ten
even where one is narrow.
````

---

## What lands on the page

`## The explanation layer` with its **ten** `###`, and `## Sources`. Plus `## Core message` and
`## Key points` **when `clarified: false`** — the flip that had no producer until 2026-08-31.

The ten `###` go **inside the `SPINE` marker comments** in the stub, replacing each `TODO`. Those
comments are found by literal string match: a paste that alters or drops one makes
`node scripts/new-chapters.mjs <d> <c> <b> --spine` silently no-op on that file for ever after.

`### The version to hold` owes a `:::tip[The version to hold]` directive. The scaffolder does not
pre-write it.

**On the first chapter of a book, keep the venue list** that ends part 1 of
`### What real readers say`, with the book's notes. Every later chapter pastes it into this prompt.

## Landed / Did not

| | |
|---|---|
| **Landed** | It marked the recall first, as questions, and the marking stung |
| **Did not** | It explained first and marked afterwards. The marking is now worthless — it is grading an answer against a paper it already showed you |
| **Landed** | `### Where the author was standing` connects the author to **this chapter's** claim, and links up to `## Author context` |
| **Did not** | The book page's biography again. Delete every sentence that does not predict where this chapter's argument bends; if nothing survives, it belonged on the book page |
| **Landed** | `### What real readers say` gives its venues, its N and its clusters as *n of N* — or says THIN with the number |
| **Did not** | Four quoted reviewers under a heading that says *readers*. That is what four people thought |
| **Landed** | It quoted the Reddit Answers summary with query and date — or said it could not, and gave you the query and the threads |
| **Did not** | *"Hundreds of readers agree…"* A count nobody read is an invented citation |
| **Landed** | `### How practitioners actually use it` contains a number — a team size, a duration, a frequency |
| **Did not** | *"It has a learning curve."* No number means it is the book's advice restated as practice |
| **Landed** | `### Where it doesn't transfer` describes conditions and stops |
| **Did not** | A sentence with "you" as its subject and a conclusion as its verb. That conclusion is yours, and it belongs with your recall |
| **Landed** | Every term is defined where it first appears, and every load-bearing claim has an example beside it |
| **Did not** | Notes: *"residue → next task worse"*. Correct, dense, and impossible to follow a week later |
| **Landed** | Every chart has a caption before it and a `## Sources` row per plotted number, or says illustrative in its title |
| **Did not** | A tidy bar chart of numbers nobody can trace |
| **Landed** | A `[UNVERIFIED: …]` with all four parts in it |
| **Did not** | An author, a year and a journal that do not exist. This is the easiest thing a model generates and the hardest thing you will catch |
| **Landed** | Ten sub-sections |
| **Did not** | Nine. That is the pre-2026-08-31 shape |

## If it comes back wrong

````text
You produced nine sub-sections. The missing one is
### [heading]. Emit that sub-section alone, in a four-backtick fence,
in the same voice as the rest. Do not re-emit the others.
````

````text
This tier-C row supports a claim about the world: [quote it]. Rewrite
the sentence so it says what the BOOK claims — "Newport cites a 2012
McKinsey figure that…" — or find the primary and give me tier A.
````

````text
"What real readers say" is a handful of reviewers, not a sample. Redo
it in five parts: the venues with links and N actually read; the
clusters as n of N with linked quotes; who is speaking; the Reddit
Answers summary, or the exact query and five to ten threads for me to
read; what it adds up to. Under 30 opinions from 3 kinds of venue,
write THIN with the number.
````

````text
I cannot follow this: [quote it]. Say it again in complete sentences,
define each term where it first appears, and put an example beside
each claim. Do not change what the author claimed — simplify the
words, not the claim. Length is not a concern.
````

````text
### Where the author was standing repeats the biography. Keep only what
bears on this chapter's claim and predicts where its argument bends,
link up to Author context on the book page, and cut the rest.
````

## What to check

- **Did it mark the recall before explaining?** If it explained first, the marking is worthless.
- **Is `### Where the author was standing` first, and is it about this chapter rather than the
  person?** Delete every sentence that does not end in a prediction about this chapter's argument. If
  nothing survives, it is the book page's biography.
- **Are the critics steelmanned or strawmanned?** A critic section that makes the book look good has
  not earned its place.
- **Does "what real readers say" give venues, N and *n of N*?** And either the AI summary or the query
  and the threads? Under 30 opinions, does it say THIN?
- **Does `### Where it doesn't transfer` describe conditions, or draw conclusions about you?** A
  sentence with "you" as its subject and a conclusion as its verb is the defect.
- **Could you understand every sentence?** A term you would have to look up, or a claim with no
  example beside it, is a defect in the page — `standards.md` §2b.
- **Every citation, every chart value, every real-life incident.** A confident wrong claim in a
  personal corpus costs the premise of the whole project, because you will not know it is wrong.
- **Ten sub-sections, in order.** Nine means it used the old shape.
