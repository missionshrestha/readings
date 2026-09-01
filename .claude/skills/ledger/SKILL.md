---
name: ledger
description: Report drift between the actions in chapter frontmatter and their real outcomes. Use when he says "the ledger", "what am I actually running", "what did I commit to", or at a 30-day review.
---

# /ledger — report the drift, never invent the data

`/ledger` and `/review` are **computed pages**. They cannot be wrong about what the chapters say —
they can only be wrong about whether the chapters say the truth. **That gap is what this skill
reports.**

> **The ledger is the output of the whole system.** Not books read, not chapters published. The
> drafts call it *"the actual output"* and *"the metric"*, and their own failure-modes table predicts
> it is the thing that goes stale first — which is why it is computed from frontmatter and never
> hand-kept. A hand-maintained ledger drifts from the chapters the moment one is edited.

## Steps

1. `node scripts/audit.mjs` — it already checks the action rules and prints the corpus totals.
2. Read `/ledger` and `/review` as built, or compute the same from frontmatter with
   `src/lib/ledger.ts`. **Do not recompute the review dates by hand** — `INTERVALS` is the source.
3. Report the five drifts below, **in this order**, because it is roughly the order of severity.
4. **Ask** for the outcomes that are missing. Then write them into frontmatter — and only those.

## The five drifts

| | What to look for | Why it is first / last |
|---|---|---|
| **Committed but never started** | `committed: true` with no `started` date | The single most common failure the whole system exists to catch. It was decided, it felt finished, and it never began |
| **Past day 30 with no outcome** | `started` more than 30 days ago and `day30` still `not-yet` | The ledger has stopped being a record and become a list of intentions. Everything below this line is measuring nothing until it is fixed |
| **More than one `now` per book** | Reconciliation row 2 | Adding intentions does not raise the ~53% conversion rate; it divides the same attention |
| **Committed with no obstacle** | Row 10 | Naming what will stop you is the half with evidence behind it. Picturing the outcome is the half that does not work |
| **Dropped, and why** | `day30: dropped` with no `note` | A dropped action is data. **A ledger with no dropped rows in it measures nothing** — it means nothing is being reviewed honestly |

## Reading the page itself

| Column | Comes from | Watch for |
|---|---|---|
| Action | `if` / `then`, with the permanent `id` rendered visibly | An `id` that changed. It is the review key — renaming one silently resets that action's schedule, which is why it is on screen |
| Trigger | `trigger` | A feeling rather than a situation. *"When I feel scattered"* is not a trigger |
| Obstacle | `obstacle`, or **`NOT NAMED`** in caps when `committed` and absent | The `NOT NAMED` is deliberate and must not be softened |
| Started | `started` | Absent on a committed row — drift 1 |
| Day 30 | `day30` | `not-yet` on something months old — drift 2 |
| From | the chapter title **and the book's real title beneath it** | — |

> **The "From" column showed only the chapter until 2026-08-31.** `bookTitle` in `src/lib/ledger.ts`
> was assigned `d.book ?? ''` — the directory **slug**, not a title — and nothing read it, so the
> over-commitment warning rendered *"**deep-work** has 2 actions committed at Now"*. With one book
> that reads as a quirk; with three it is ambiguous, which is exactly when this page starts to
> matter. It now resolves from the book's own `index.mdx` title, degrading to a title-cased slug
> rather than breaking if that page is missing.

## What a good report looks like

```
LEDGER — 2026-09-01

  drift
    · dw-02-timeblock   committed 2026-09-14, no `started`. 18 days.
    · dw-05-shutdown    started 2026-08-01, day30 still `not-yet`. 31 days overdue.
    · Deep Work         2 actions committed at tier: now.

  running   1 of 4
  dropped   0        ← nothing dropped in 4 actions over 5 weeks is a finding,
                       not a success. Ask which of these he has quietly stopped.

  ASK
    1. Did dw-02-timeblock ever start? If not — was it the trigger?
    2. dw-05-shutdown is past day 30. running, adapted, or dropped?
```

**Zero dropped rows is reported as a finding.** It is the one number on this page that looks good
and usually is not.

## Rules

- **You never write an action, an obstacle or an IF–THEN sentence.** Propose candidates, attack a
  draft, and stop. `P0`'s one rule is not negotiable, and this skill is where it is most tempting to
  break — a missing `obstacle` is trivially easy to fill in plausibly, and a plausible one is worse
  than an empty one because it cannot be told apart from a real one.
- **Day 30 gets filled in honestly, including the failures.** A ledger of intentions is worthless;
  a ledger with dropped rows in it is data.
- **Never add a streak, a badge or a percentage.** The evidence says accountability needs a person
  and a physical record, and this site can supply neither. He chose that: *"No, this is for myself."*
  Simulating it would make the page feel like it was working, which is worse than the page admitting
  it is not — and `/ledger` states the limitation in words for that reason.
- **No book counter.** *"The ledger is the metric. The count is vanity."*
- **A missed review is not a failure.** It goes to the back of the queue and says it is overdue. A
  schedule that punishes a missed week gets abandoned in week three.
- **Never ask him to picture the outcome.** The strongest negative finding in the evidence base, and
  this page is where a well-meaning "imagine where you'll be in 30 days" would land.
