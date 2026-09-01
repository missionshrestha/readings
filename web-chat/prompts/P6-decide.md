# P6 — candidate actions

**Stage 8. Menu only.** The AI proposes; you choose and you write the sentence.

**Length: 807 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **`P0`'s one rule is live here and nowhere else matters as much.** If it writes your commitment,
> it produces something excellent, you feel finished, and nothing happens.

---

## Step 1 — you ask for the menu

````text
For chapter [N], propose CANDIDATE actions. Do not choose for me and do
not write my commitment.

For each candidate:

  THE ACTION      one line, observable. Could someone watching tell
                  whether I did it? "Be more deliberate about my
                  mornings" fails that test. "Write tomorrow's three
                  blocks in the notebook before the phone goes on
                  charge" passes it.
  THE TRIGGER     a concrete situation — a time, a place, a person, a
                  recurring moment that already happens without my
                  arranging it. NEVER a feeling. "When I feel
                  scattered" is not a trigger; I do not notice feeling
                  scattered, which is the problem.
  THE TIER        now / next / later / reference
                    now        I could start this week
                    next       real, but queued behind something
                    later      depends on a life stage not yet here
                    reference  not a habit. A rule to apply when the
                               situation arises
  HONEST IMPACT   including "probably marginal". Say what it would
                  change and roughly how much. If the honest estimate
                  is that it changes little but costs little, say
                  that — a cheap marginal action is a reasonable thing
                  to keep, and pretending it is transformative is not.
  WHERE IT COMES  the specific claim in the chapter it follows from.
  FROM            An action with no anchor in the chapter is one you
                  invented, and I want it labelled as such.

RULES

· Extract everything genuinely distinct. No cap — an action is data
  and a ledger row costs nothing. Extraction is uncapped; commitment
  is not.
· Two candidates that would be satisfied by the same behaviour are one
  candidate. Merge them and say you did.
· IF THE CHAPTER DOES NOT REALLY SUPPORT AN ACTION, SAY SO. A
  conceptual chapter may support none, and that is a legitimate
  result. Inventing one to fill the section makes the ledger
  meaningless, and the ledger is the only measure this whole system
  has.
· Do not propose an action that is really a decision I have to make
  once. Those are not habits and they do not belong in a ledger with
  a day-30 review.
· Do not propose "read more about X".

Then STOP. Do not recommend one. Do not rank them. Do not tell me
which you would pick if you were me.
````

## Step 2 — you choose ONE, and you write it

**One.** Not three.

> Adding intentions does not raise the ~53% conversion rate — **it divides the same attention.**
> One implemented beats five considered.

Write it yourself:

```
If [concrete situation], then [specific behaviour].
```

Everything else in the menu goes into the ledger at `next`, `later` or `reference`. It is recorded,
not abandoned — and it is not being attempted. **At most one action across the whole book carries
`committed: true` with `tier: now`**, and `scripts/audit.mjs` reports it when more do.

## Step 3 — you name the obstacle, and it asks you to

````text
Here is my commitment, which I wrote:

  If [...] then [...]

Ask me what will actually stop me — the INNER obstacle, not the
circumstance. Ask it as a question and wait; do not propose one.

REFUSE A VAGUE ONE. "Being busy", "lack of discipline", "not enough
time" and "forgetting" are not obstacles — they are descriptions of
not having done it, restated. Push until I give you something with a
mechanism in it: a thought I have at the moment of failure, a thing I
do instead, a story I tell myself that makes stopping reasonable.

Good obstacles sound like: "I tell myself I will remember it in the
morning." "By 21:30 I have decided the day is over and this feels like
extending it." Those can be planned against. "Busy" cannot.

Then run a pre-mortem: it is eight weeks from now and this failed.
What happened?

  · Attack the TRIGGER FIRST. Most failures are the trigger, not the
    action — the moment never arrived, or it arrived and I did not
    notice it, or it arrived while I was doing something I would not
    interrupt.
  · Then the action: was it too big for a bad day? What is the version
    I would still do when tired?
  · Then the environment: what would have to be true around me for the
    trigger to be noticeable?

Give me the three most likely failure paths, in order of likelihood,
and for each one the earliest point at which I could have noticed it
happening.

Do NOT ask me to imagine it succeeding. Do not ask how it will feel
when it works, and do not close with encouragement.
````

**Why that last line.** Positive fantasy predicts **worse** attainment — one of the more robust
findings in motivation research, and it directly contradicts a technique a large fraction of the
genre promotes. Naming the obstacle is what mental contrasting actually is; picturing the outcome is
the part that does not work.

## Step 4 — it attacks your draft

````text
Now attack my commitment, and be specific rather than thorough.

  · Is the TRIGGER concrete enough that I will notice it without
    having to remember to look for it? Does it already happen daily
    without my arranging it?
  · Is the ACTION small enough that I will do it on a bad day, tired,
    at the end of a week that went badly? What is the smallest version
    that still counts?
  · Is the OBSTACLE the real one, or the acceptable-sounding one? If I
    gave you something that makes me look organised, say so.
  · Is this actually downstream of the chapter, or is it something I
    already wanted to do and have now attached to a book?
  · If I fail this at week two, what will I tell myself? Name the
    excuse in advance so I recognise it.

One paragraph. Do not soften it, and do not end by saying it is a good
commitment.
````

Then it goes into frontmatter, and `<Actions />` renders it. `md-spec.md` §4 has the field rules;
`obstacle` is required whenever `committed: true`, and `/validate` flags one under six words.
