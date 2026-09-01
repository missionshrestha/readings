# P4 — the explanation layer

**Stage 6. AFTER you have written `## Recall` closed-book.** Search on where possible.

**Length: 822 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **Do not run this before the recall.** The whole design is that you produce first and receive
> second — retrieval scored **61% against 40%** for rereading. Running this first turns the chapter
> into something you have read rather than something you know.

> **TEN sub-sections since 2026-08-31, not nine.** `### Where the author was standing` is new and is
> first. It came from him, unprompted: *"everyone's thought is inspired, derived from their own
> circumstances, so that can help understand what writer/author actually meant and why."*
> `chapter-spine.md` §3 has the three reasons it sits here rather than in `## Pre-context`.

---

````text
Here is chapter [N] of [BOOK], and here is what I wrote from memory
before reading anything of yours:

[PASTE YOUR RECALL]

FIRST: mark my recall. What did I miss, and what did I get wrong?
State the misses AS QUESTIONS first — let me answer before you tell me.
Do not soften the marking. If I reconstructed the conclusion and lost
the mechanism, say that in those words; it is the most common failure
and the one I most need told.

IF book.json says clarified: false FOR THIS CHAPTER, also produce
## Core message and ## Key points now, AFTER the marking above and
before the explanation layer. On familiar material these come after my
own attempt rather than before my reading, so they check the attempt
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

Then ## Sources — claim, anchored URL, date read, AND ITS TIER:

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

Anything on this list gets its replication status IN THE SENTENCE, not
in a footnote: priming · ego depletion · power posing · learning styles
· the 10,000-hour rule.

There is no length limit. Depth is set by the brief: a load-bearing
deep-dive chapter gets everything; a supporting skim gets every
sub-section, each shorter. NEVER DROP A SUB-SECTION — a missing one is
a structural defect. Where one is short, say in one clause why.

Four-backtick fence. Nothing outside it.
````

---

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
