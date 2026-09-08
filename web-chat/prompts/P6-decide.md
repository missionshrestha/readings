# P6 — candidate actions

**Stage 8. Menu only.** The AI proposes; you choose and you write the sentence.

**Length: 1209 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **`P0`'s one rule is live here and nowhere else matters as much.** If it writes your commitment,
> it produces something excellent, you feel finished, and nothing happens.

## Paste with it

`00-CONTEXT-PACK` ● · the chapter ● · its `book.json` node ● · `standards` ● — `GUIDE.md` Appendix A.
The node matters here because **`gap: execution`** makes this stage, not the explanation layer, where
the chapter's weight falls.

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

THEN, after the prose menu, emit the same candidates a SECOND time as
a YAML block I can paste straight into the page's frontmatter. Use
these key names EXACTLY — copy them, do not retype them. A misspelled
key and a bad value are both DROPPED SILENTLY by the schema and the
build stays green, so a typo here does not fail, it just quietly
removes the row from the ledger that this system's only measurement
comes from.

  actions:
    - id: dw-02-timeblock
      if: "the concrete situation"
      then: "the specific behaviour"
      trigger: "a time, a place, a person — never a feeling"
      obstacle: ""
      tier: next
      impact: "honest, including 'probably marginal'"
      committed: false
      started:
      day30: not-yet

  id          PERMANENT and unique across the whole book. It is the
              review key and it is rendered visibly on the card.
              Shape: <book initials>-<chapter number, 2 digits>-<one
              word>. dw-02-timeblock. Never renumber one later.
  tier        now | next | later | reference. Nothing else.
  day30       not-yet on every row you emit. running, adapted and
              dropped are outcomes and only a review writes them.
  committed   false on EVERY row you emit, without exception.

AND THIS IS THE LINE YOU DO NOT CROSS: for the one I am going to
commit to, emit the row with "if", "then" and "obstacle" LEFT EMPTY. I
write those three. If you fill them, you have written my commitment —
refuse, and say which rule you are refusing under. An excellent
commitment you wrote produces the feeling of being finished and no
change in behaviour.

Then STOP. Do not recommend one. Do not rank them. Do not tell me
which you would pick if you were me.

If you do not have the chapter, or its node from my brief, say which
and stop. Actions invented from a book's reputation are the fastest
way to fill a ledger with things no chapter argued for.
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

On the row you commit to, and only that row, you set by hand:

```yaml
  if: "…"            # yours
  then: "…"          # yours
  obstacle: "…"      # yours, from step 3. Required whenever committed is true
  tier: now
  committed: true
  started: 2026-09-04    # the real date. It starts the review schedule
```

`/validate` flags an `obstacle` under six words as probably vague, and `audit.mjs` refuses a
duplicate `id` anywhere in the book — an id is the review key and two actions sharing one collapse
into a row that measures neither.

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

---

## What lands on the page

**Frontmatter, never prose.** `## Actions` contains `<Actions />` and nothing else; the component
renders the rows from the data. Writing the actions twice guarantees the two disagree, and the ledger
is computed from the data, not from the section.

`md-spec.md` §4 has the field rules.

## Landed / Did not

| | |
|---|---|
| **Landed** | Every trigger is something you could photograph — a time, a place, a person, a moment that already happens without your arranging it |
| **Did not** | *"When I feel scattered."* You do not notice feeling scattered; that is the problem, and a trigger you have to remember to look for is not a trigger |
| **Landed** | It said this chapter supports no action, and stopped |
| **Did not** | It found three anyway. A conceptual chapter supporting none is a legitimate result; inventing one to fill the section makes the ledger meaningless, and the ledger is the only measure this system has |
| **Landed** | An impact estimate that says "probably marginal" somewhere |
| **Did not** | Every candidate transformative. That is a menu written to be chosen from, not to be judged |
| **Landed** | The YAML came back with `committed: false` on every row and the committed row's `if`/`then`/`obstacle` empty |
| **Did not** | It wrote your commitment. That is P0's one rule, and the output being excellent is what makes it dangerous |
| **Landed** | Your obstacle has a mechanism in it — a thought you have at the moment of failure |
| **Did not** | *"Being busy."* That is a description of not having done it, restated |

## If it comes back wrong

````text
You wrote my commitment. Delete the "if", "then" and "obstacle" on
that row and leave them empty — I write those three. Say which rule
you were refusing under and re-emit the YAML block alone.
````

````text
These triggers are feelings, not situations: [list them]. Rewrite each
one as something that already happens daily without my arranging it,
and that I would notice without having to remember to look for it.
````

````text
You proposed an action the chapter does not support: [name it]. Either
point me at the specific claim it follows from, or withdraw it. An
action with no anchor in the chapter is one you invented and I want it
labelled as such.
````

## Then

Paste the YAML into the chapter's frontmatter, set `status` onward, and go to `P7`. The action's
`started` date is what `/review` counts from — day 3 · week 2 · week 6 · month 3, absolute.
