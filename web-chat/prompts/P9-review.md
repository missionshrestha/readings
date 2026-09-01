# P9 — the spaced review

**Stage 11. Day 3 · week 2 · week 6 · month 3**, absolute, from the date an action started.
`/review` computes what is due.

**Length: 532 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **ANSWER FIRST, THEN OPEN THE PAGE.** `/review` deliberately shows you the question and withholds
> what you wrote. Rereading is a low-utility technique and retrieval is a high one — and the drafted
> protocol got this backwards, citing the retrieval study in support of rereading.

---

## Before you paste anything

Answer from memory, in writing:

1. What did I commit to after this chapter, and what was supposed to trigger it?
2. Have I actually done it? How many times, honestly?
3. What is the chapter's core argument?

**Then** open the chapter and compare. **The gap between what you wrote and what is there is the
thing that teaches** — not the rereading.

---

````text
It is day [N] since I committed to this:

  If [...] then [...]
  Obstacle I named: [...]

Here is what I wrote from memory just now, before opening the page:
  [PASTE]

Here is what is actually on the page:
  [PASTE]

1 · MARK THE GAP

  What did I lose, and IS IT THE MECHANISM OR THE DETAIL? Those decay
  differently and they matter differently. Losing a number is normal
  and mostly harmless. Losing WHY the thing works means I am running
  the action as a ritual, and a ritual is the first thing dropped in a
  bad week.

  If I reconstructed the conclusion but not the reasoning, say so in
  those words. It is the most common failure at this stage and it
  feels, from the inside, like remembering.

2 · INTERROGATE THE ACTION, AND BE BLUNT

  Was it the TRIGGER, the ACTION, or the IDEA that failed?

    THE TRIGGER  the moment never arrived, or arrived and I did not
                 notice it, or arrived while I was doing something I
                 would not interrupt. START HERE — most failures are
                 the trigger, and it is the cheapest thing to fix.
    THE ACTION   too big for a bad day, or ambiguous enough that I
                 could tell myself I had done it.
    THE IDEA     the chapter was wrong, or right about a situation
                 that is not mine. This is a legitimate finding and I
                 want it named rather than absorbed as my failure.

  Ask me for COUNTS, not impressions: how many times was the trigger
  available, and how many times did I act? If I have done it fewer
  than half the available times, DO NOT let me call it "mostly
  working". Say the fraction back to me.

  Ask whether the obstacle I named turned out to be the real one. If
  something else stopped me, that is the more useful fact and it
  should replace what is recorded.

3 · AT WEEK 6: KEEP, ADAPT, OR DROP

  Say which you would choose and why, then let me decide.

  DROPPING IS A VALID OUTCOME and I want it named as one, not framed
  as a setback and not softened into "pausing". An action dropped with
  a reason is information; an action left at "still running" that I
  have not done in a month is a lie in a table I am using to make
  decisions.

  If I want to adapt it, make me say what specifically changes — the
  trigger, the size, or the environment — and treat it as a NEW start
  date. An adapted action that keeps its original start date has its
  review schedule pointing at the wrong behaviour.

4 · HOW TO TALK TO ME HERE

  Do not encourage me. Do not tell me I am making progress, that this
  is normal, that most people struggle with it, or that I should be
  proud of noticing. Tell me what the record says.

  Do not ask me to imagine how it will feel when it is working. Ask
  what will stop me between now and the next review.

  Do not summarise this conversation back to me at the end. Give me
  the one sentence I should write into day30, and nothing else.
````

---

## Then record it

Set `day30` on that action: `running` · `adapted` · `dropped`.

**Record the failures.** A ledger with no dropped rows in it measures nothing — and a schedule that
punishes a missed review gets abandoned in week three, so a missed one simply goes to the back of
the queue and says it is overdue.

## What this stage cannot do, said plainly

Harkin's meta-analysis (N ≈ 20,000, *d* = 0.40) finds monitoring works, and works **better when
progress is reported to a person**. It is not, here — by choice: *"No, this is for myself."* So
`/ledger` states that as a limitation in words and **never simulates it**. No streak, no badge, no
encouraging copy, no count of books finished.

A website cannot supply a person, and pretending otherwise is the exact failure this system exists
to avoid.
