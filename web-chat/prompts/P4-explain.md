# P4 — the explanation layer

**Stage 6. AFTER you have written `## Recall` closed-book.** Search on where possible.

**Length: 1217 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **Do not run this before the recall.** The whole design is that you produce first and receive
> second — retrieval scored **61% against 40%** for rereading. Running this first turns the chapter
> into something you have read rather than something you know.

> **TEN sub-sections since 2026-08-31, not nine.** `### Where the author was standing` is new and is
> first. It came from him, unprompted: *"everyone's thought is inspired, derived from their own
> circumstances, so that can help understand what writer/author actually meant and why."*
> `chapter-spine.md` §3 has the three reasons it sits here rather than in `## Pre-context`.

## Paste with it

`00-CONTEXT-PACK` ● · the full chapter ● · its `book.json` node ● · `chapter-spine` ● · `md-spec` ● ·
`standards` ● · `source-rules` ● — `GUIDE.md` Appendix A. **Everything.** This is the heaviest prompt
in the library and the one where an invented citation costs the most. **Search on.**

And your recall, written closed-book. See [recall.md](recall.md).

---

````text
Here is chapter [N] of [BOOK]. Here is its node from my brief:

[PASTE THE CHAPTER'S book.json NODE — argues, weightInArgument,
 verdict, clarified, and the book's gap]

And here is what I wrote from memory before reading anything of yours:

[PASTE YOUR RECALL]

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
  ## Core message  one sentence, in a :::note[Core message] block
  ## Key points    the claims the argument rests on, unevenly sized

THEN produce the explanation layer as TEN ### sub-sections, in this
order, under ## The explanation layer:

  ### Where the author was standing
      Who they were, when they wrote, what problem they were living
      inside, what they were reacting against — and WHAT THAT PREDICTS
      ABOUT WHERE THE ARGUMENT BENDS. Not biography. If a sentence
      does not end in a prediction about the claim, cut it. Do not use
      this to explain the argument away.
  ### What the author is actually saying
      The argument, more plainly than the chapter states it. If your
      version is the same length and uses the same nouns, you have
      paraphrased rather than clarified.
  ### Where readers get confused
      The specific misreadings, each stated as a sentence a confused
      reader would actually say. Not "some find it difficult".
  ### The teaching pass
      The mechanism, taught rather than summarised. WHY it works, not
      that it works. If there is no "because" in this section it is a
      fourth summary.
  ### What real readers say
      From actual threads and reviews. NAME WHERE YOU LOOKED. IF THIS
      IS THIN, SAY SO. Do not manufacture consensus, do not write
      "many readers find", and do not invent reviews.
  ### What critics say
      The strongest case against, argued properly — steelmanned, not
      dismissed. If you rebut every criticism in the same paragraph
      you raised it, you chose the criticisms you could answer.
  ### What's been tested since
      Replication, later evidence, what has failed to hold. Verify
      every citation; I will check them. A study named with an author
      and a year and no anchored link is not a citation.
  ### How practitioners actually use it
      What people who operate this do, AT A STATED SCALE — a team
      size, a duration, a frequency. "It has a learning curve" is not
      a failure mode. If there is no number in this section, it is the
      book's advice restated as practice.
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

Then ## Sources, as a table with EXACTLY these four columns:

  | Claim | Source | Read on | Tier |

One row per empirical claim in the body. "Source" is an anchored URL,
not a bare title. "Read on" is the date you opened it. "Tier" is one
of four and it is not optional:

  A  primary       the study, the meta-analysis, the original text
  B  independent   a replication, a critic, a review with no stake
  C  the book      what THIS BOOK says about its own evidence
  D  unsourced     "studies show". Not allowed to support anything

TIER C MAY ONLY SUPPORT WHAT THE BOOK CLAIMS, NEVER WHAT IS TRUE.
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

There is no length limit. Depth is set by the brief: a load-bearing
deep-dive chapter gets everything; a supporting skim gets every
sub-section, each shorter. NEVER DROP A SUB-SECTION — a missing one is
a structural defect. Where one is short, say in one clause why.

MISSING INPUTS — NAME THEM AND STOP

If my recall is not above, STOP and ask for it. Producing the
explanation first contaminates it, and the marking afterwards measures
nothing. If the brief node is not above, say so — without clarified
you cannot know whether sections 2 and 3 are yours to write. If you do
not have search, say so in the first line: "what real readers say" and
"what's been tested since" are not written from memory, and a
plausible paragraph in either is the most expensive output in this
system.

Four-backtick fence. Nothing outside it. The ten sub-sections land
between the SPINE marker comments already on the page — do not
reproduce those comments, do not rename a heading, and keep all ten
even where one is a single clause.
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

## Landed / Did not

| | |
|---|---|
| **Landed** | It marked the recall first, as questions, and the marking stung |
| **Did not** | It explained first and marked afterwards. The marking is now worthless — it is grading an answer against a paper it already showed you |
| **Landed** | Every sentence in `### Where the author was standing` ends in a prediction about the claim |
| **Did not** | Biography. Delete every sentence that does not predict where the argument bends; if nothing survives, that is the finding |
| **Landed** | `### What real readers say` names a venue — a subreddit, a thread, a review site |
| **Did not** | *"Many readers find…"* with no venue. Manufactured consensus is the cheapest thing this prompt can produce and the hardest for you to catch |
| **Landed** | `### How practitioners actually use it` contains a number — a team size, a duration, a frequency |
| **Did not** | *"It has a learning curve."* No number means it is the book's advice restated as practice |
| **Landed** | `### Where it doesn't transfer` describes conditions and stops |
| **Did not** | A sentence with "you" as its subject and a conclusion as its verb. That conclusion is yours, and it belongs with your recall |
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
"What real readers say" names no venue. Say where you looked and that
it was thin. A stated gap is a correct output here; a fluent paragraph
about what readers generally think is not.
````

## What to check

- **Did it mark the recall before explaining?** If it explained first, the marking is worthless.
- **Is `### Where the author was standing` first, and is it about the claim rather than the person?**
  Delete every sentence that does not end in a prediction about the argument. If nothing survives,
  it is biography.
- **Are the critics steelmanned or strawmanned?** A critic section that makes the book look good has
  not earned its place.
- **Does "what real readers say" name where it looked?** If it cannot, it should have said so.
- **Does `### Where it doesn't transfer` describe conditions, or draw conclusions about you?** A
  sentence with "you" as its subject and a conclusion as its verb is the defect.
- **Every citation.** A confident wrong claim in a personal corpus costs the premise of the whole
  project, because you will not know it is wrong.
- **Ten sub-sections, in order.** Nine means it used the old shape.
