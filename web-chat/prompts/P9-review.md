# P9 — the spaced review

**Stage 11. Day 3 · week 2 · week 6 · month 3**, absolute, from the date an action started.
`/review` computes what is due.

**Length: 709 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **ANSWER FIRST, THEN OPEN THE PAGE.** `/review` deliberately shows you the question and withholds
> what you wrote. Rereading is a low-utility technique and retrieval is a high one — and the drafted
> protocol got this backwards, citing the retrieval study in support of rereading.

## Paste with it

`00-CONTEXT-PACK` ● · `standards` ● · the chapter ○ — `GUIDE.md` Appendix A. **A new chat.** The
transcript that produced the action is the last place to judge whether it survived.

## Which review writes `day30`

Four review points, one field, and they are not the same thing. `day30` is a **day-30 outcome**, and
**week 6 is the first review that happens after day 30.**

| Review | What it does | `day30` |
|---|---|---|
| **Day 3** | Did the trigger fire at all? Was the obstacle you named the real one? | Leave `not-yet` |
| **Week 2** | Counts. How many times was the trigger available, how many times did you act? | Leave `not-yet` |
| **Week 6** | **Keep, adapt or drop.** This is the decision the field records | **Write `running` · `adapted` · `dropped`** |
| **Month 3** | Is a `running` row still running? If not, correct it to `dropped` with a date | Correct it if it is now false |

Writing a verdict at day 3 records an outcome twenty-seven days early, and the row then reads as
reviewed for the next month. **`/ledger` flags any action whose `started` is more than thirty days
old while `day30` is still `not-yet`** — so a missed week-6 review surfaces on its own and needs no
reminder. An **adapted** action takes a **new `started` date**, which restarts the whole schedule:
an adapted action keeping its original date has its reviews pointing at a behaviour it no longer is.

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
  the one sentence I should write into the action's note, and nothing
  else.

  ONLY THE WEEK-6 REVIEW SETS day30. At day 3 and week 2 the field
  stays not-yet — those reviews correct the obstacle and count the
  trigger, they do not record an outcome. If the day number above is
  under 30, do not offer me a verdict and do not ask me to choose one.

MISSING INPUTS

  If I have not pasted what I wrote from memory, stop and ask for it.
  Opening the page first turns this into rereading, which is the
  low-utility technique this whole schedule exists to replace, and the
  gap I would have measured is gone. If I have not given you counts
  when you asked, ask once more before accepting an impression.
````

---

## What lands on the page

Frontmatter, not prose. `day30` at week 6, `note` with the one sentence, and a corrected `obstacle`
whenever the one you named turned out not to be the one that stopped you — **that correction is the
more useful fact and it should replace what is recorded**, not sit beside it.

An adapted action gets a **new `started`**. Nothing here writes a `##` section.

## Landed / Did not

| | |
|---|---|
| **Landed** | It said the fraction back to you — "four of eleven" |
| **Did not** | It let you call it "mostly working" at under half. That is the phrase this section exists to refuse |
| **Landed** | It separated trigger, action and idea, and started with the trigger |
| **Did not** | It concluded you lacked discipline. That is not one of the three, and it is not a diagnosis — it is the failure restated as a character trait |
| **Landed** | It named "the idea was wrong for my situation" as a live option |
| **Did not** | Every failure came back as yours. The chapter being wrong is a legitimate finding and the one least likely to be volunteered |
| **Landed** | Dropping was offered as an outcome, not a setback |
| **Did not** | *"Let's pause it."* An action left at "still running" that you have not done in a month is a lie in a table you use to make decisions |
| **Landed** | It ended with one sentence and stopped |
| **Did not** | Encouragement. You are not being cheered on here; there is no person in this loop and simulating one is worse than admitting there is none |

## If it comes back wrong

````text
You encouraged me. Delete it. Tell me what the record says: how many
times the trigger was available, how many times I acted, and the
fraction.
````

````text
It is day [N], which is under 30. Do not offer me a keep/adapt/drop
verdict — that is the week-6 review. Ask whether the obstacle I named
was the real one, and stop.
````

## Then record it

At **week 6**, set `day30` on that action: `running` · `adapted` · `dropped`.

**Record the failures.** A ledger with no dropped rows in it measures nothing — and a schedule that
punishes a missed review gets abandoned in week three, so a missed one simply goes to the back of
the queue and says it is overdue.

## What this stage cannot do, said plainly

Harkin's meta-analysis (N ≈ 20,000, *d* = 0.40) finds monitoring works, and works **better when
progress is reported to a person**. It was not, here — by choice: *"No, this is for myself."* So
`/ledger` states that as a limitation in words and **never simulates it**. No streak, no badge, no
encouraging copy, no count of books finished.

**Qualified on 2026-09-14, not removed.** He now plans to *"read each chapter and share the progress
publicly"*. A public post is closer to reported progress, and it is still a broadcast rather than a
person who asks what the count was. Whether it produces the effect for him is untested, and nothing
in this review counts it as if it did (`context/reader.md` §5).

A website cannot supply a person, and pretending otherwise is the exact failure this system exists
to avoid.
