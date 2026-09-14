# P1 — select the next book

**Stage 0. Fifteen minutes, hard limit.** Between books, never during one.

**Length: 1081 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **The gate is real.** This stage can end in *"not now"*, and a selection stage that always says yes
> is theatre. It can also end in *"this is an execution gap and another book will not fix it"*,
> which is the most useful outcome it has.

## Paste with it

`00-CONTEXT-PACK` ● · `source-rules` ○ — `GUIDE.md` Appendix A. **Search on.** No chapter, no
`book.json`: neither exists yet.

---

````text
I am choosing my next book. Before any recommendation, work through
this with me — and push back rather than agreeing. Ask me one question
at a time and wait for the answer. Do not produce all four sections in
one message; each depends on what I say in the one before.

1 · THE GAP, AND IT COMES BEFORE EVERYTHING

Ask me what the problem actually is, in the form of something that
happened, not a category. "I keep losing my afternoons" is a problem.
"Focus" is a category. If I give you a category, ask for the last time
it happened and what I did instead.

Then tell me which of these it is:

  KNOWLEDGE GAP   I don't know how. Reading can fix this.
  EXECUTION GAP   I know how and I don't do it. Reading largely cannot.

Marrs (1995): the genre works for knowledge gaps and largely does not
for execution gaps. This single distinction predicts most of the
disappointment people report with self-help — the books that "didn't
work" were usually aimed at execution gaps and read as though they
were solving knowledge gaps.

The test I want you to apply, and to say out loud: if I already knew
exactly what to do, would I do it? If the honest answer is no, it is
an execution gap however much I would prefer it not to be.

IF IT IS AN EXECUTION GAP, SAY SO PLAINLY, in the first sentence, and
tell me what would actually move it — a constraint, a deadline with
someone else in it, a smaller commitment, a change of environment, or
removing something rather than adding one. Do not soften this into
"well, this book might still help." Offer me a book only after I have
heard that, and only if I ask a second time.

2 · AM I AVOIDING SOMETHING?

If I am picking an easier or more enjoyable book to avoid a harder,
more useful one, say so. You have my map; you can see which domains I
keep circling and which I keep not opening. Name the domain I am
avoiding rather than asking me whether I am avoiding one — I will say
no.

Also ask: is this book adjacent to one I have just finished? Reading
three books on the same idea feels like depth and is usually the
comfortable option. I want to know when I am doing it.

3 · SCREEN IT — search on, and I will verify every citation

  · What is the evidence base, and how much of it has replicated?
    Name the studies. If the book's central claim rests on any of
    these six, tell me that in the FIRST LINE of the screen:

      priming · ego depletion · power posing · learning styles
      the 10,000-hour rule · handwriting beats typing

    Each has either failed to replicate or been materially walked
    back, and each appears across dozens of the books on my shelf. A
    book whose spine is one of them is a different decision from a
    book that merely mentions one.
  · Who are the serious critics, and what is their STRONGEST point?
    Not the weakest one you can answer. If you cannot find a critic
    after a real look, say that you looked and found none — that is a
    fact about the book's reception, not evidence that it is right.
  · What has aged badly since publication? Give me the year it was
    first published, as you found it and where, and what changed
    since. The year is only a screen here: P2 verifies it against the
    publisher or a library record before it goes into book.json,
    because every page of the book will display it.
  · Does it contain a PROCEDURE, or only a thesis? Given two books,
    the one with exercises and sequences beats the one with an
    argument and anecdotes.
  · Roughly what fraction of it is the idea and what fraction is
    illustration? A book that is one idea and three hundred pages of
    anecdote is a skim, and I would rather know now.

Where any of this is thin, say THIN and say what you searched. Do not
manufacture consensus and do not attribute a position to critics you
cannot name.

4 · THE HONEST RECOMMENDATION

One of exactly four, and commit to one:

  · read it   · skim one chapter   · abandon it   · not now

For "not now", say what would have to change — a situation, a
question I do not yet have, a prerequisite book. "Not now" with no
condition attached is a soft no dressed up as a plan.

For "skim one chapter", name the chapter and say what I am looking
for in it.

CONSTRAINTS ON YOUR OUTPUT

Do NOT produce a reading plan, a schedule, or a summary of the book.
Do NOT tell me the book is excellent, seminal, or a must-read; give me
the evidence and let me decide. If I argue you into a yes after you
said no, say that I have just done that.

Fifteen minutes is a limit on the stage, not on clarity. Write in
complete sentences, define any term I would have to look up, and put
an example beside a claim that is not obvious. A short answer I cannot
follow costs more of the fifteen minutes than a longer one I can.

MISSING INPUTS — NAME THEM AND STOP

If you do not have search, say so in the first line and stop: section 3
is the whole screen and a screen written from training knowledge is a
recollection of a book's reputation, not an examination of it. If I
have not told you which book, ask — do not screen a plausible one. If
you cannot see my map, say so rather than guessing at section 2; you
cannot name the domain I am avoiding without it, and a guess there is
worse than silence.

This stage is fifteen minutes. Output nothing outside the four
sections.
````

---

## What lands on the page

**Nothing yet — this is conversation, not a file.** Two values survive it and both go into
`book.json` at Stage 2, where they are fixed and never re-derived:

| From | Becomes |
|---|---|
| Section 1's diagnosis | `gap` — `knowledge` or `execution` |
| Section 4's recommendation, in your words | `whyNow` |

A "not now" produces no `book.json` at all. It goes in `reader-profile.md`, with its condition.

**The publication year seen here is not recorded yet.** `P2` verifies it against the publisher or a
library record and writes it into `book.json` as `published`, with any major revision in `editions`
— since 2026-09-14 both are displayed on every page of the book (`book-spec.md` §2).

## Landed / Did not

| | |
|---|---|
| **Landed** | It named a critic, and the critic's point was one you had to think about |
| **Did not** | *"Some readers find it repetitive."* That is a review aggregate wearing a critic's coat |
| **Landed** | It said THIN, and said what it searched. A stated gap is a correct output here |
| **Did not** | A fluent paragraph on what critics generally say, with no name in it |
| **Landed** | It committed to one of the four words and stayed there when you pushed |
| **Did not** | *"It depends on what you're looking for"* — which is the four options restated as a non-answer |
| **Landed** | It said *execution gap* in a first sentence and offered no book until you asked twice |
| **Did not** | *"This is more of an execution gap, but the book might still help with…"* — the softening the prompt forbids by name |

## If it comes back wrong

````text
You gave me a survey rather than a recommendation. One of exactly
four — read it · skim one chapter · abandon it · not now — and commit
to it in the first line. For "not now", the condition that would
change it.
````

````text
You named no critic. Say where you looked and that you found none —
that is a fact about the book's reception and I want it. Do not
substitute a summary of general criticism.
````

## Do not move on if

- It said **no** and you argued it into a yes. That is a successful outcome, not a failure.
- The gap came out **execution** and you took the book anyway without naming what else you are
  changing.
- Fifteen minutes became an hour. **Choosing is not reading**, and the drafts name this exactly:
  *"the most sophisticated procrastination available to me."*
- You cannot say, in one sentence and without looking, what problem this book is for.

## What to record afterwards

`gap` and `whyNow` go into `book.json` at Stage 2 and never get re-derived. The `gap` value in
particular reaches every chapter of the book: it decides whether the explanation layer or the action
stages carry the weight (`context/standards.md` §4, `chapter-spine.md` §8).

A "not now" is worth recording too — in `reader-profile.md`, with its condition. A book refused
twice for the same reason is telling you something the second time.
