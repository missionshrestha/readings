# The recall — the step with no prompt

**There is no prompt on this page, and that is the point. The AI window is closed.**

Every other file in this directory tells you what to paste. This one is the only step in the pipeline
where nothing is pasted, nothing is generated, and nothing arrives — and it is the step that does the
work. It sits between reading the chapter and running `P4`.

> Producing from memory scored **61% at one week against 40% for rereading** (Roediger & Karpicke),
> and **89% against 73%** when the questions were LLM-generated (An et al.).
> `reconciliation.md` row 1 · `evidence/reading-with-ai.md:485`

> **Never let AI do the retrieval.** Attempt from memory first, every time. **This one rule prevents
> most of the crutch effect.** — Guardrail 4, `evidence/reading-with-ai.md:542`

`prompts/README.md` calls this one of the two steps you will be tempted to skip. It had no page until
now, which is a strange thing to be true of the highest-leverage step in a system this documented.

---

## Where it sits, and why the order is not negotiable

```
P3 part A — pre-context                    AI on
P3 part B — the rebuild, if clarified      AI on
READ IT                                    ⏹ AI OFF
▶ WRITE ## Recall, CLOSED BOOK             ⏹ AI OFF   ← this file
P4 — it marks what you wrote               AI on
```

**Run `P4` first and the marking is worthless.** You will have read its version, recognised
everything, and produced a recall of the explanation rather than of the chapter. The tell is
vocabulary: words from the explanation layer that are not in the chapter.

`/validate` refuses `status: complete` on a chapter with an empty `## Recall`. That refusal is the
only structural defence this step has.

---

## What to write

Book closed. Page closed. Two parts, and the second is the one people drop.

**Part one — the attempt.**

1. **What did the chapter argue?** One or two sentences. **In words the author did not use.** If you
   can only say it in the book's phrase for it, you retained the packaging, not the claim.
2. **What is the mechanism?** *Why* it works, not that it works. This is the part that decays first
   and matters most — an action whose mechanism you have lost is a ritual, and a ritual is the first
   thing dropped in a bad week.
3. **What did it actually claim, as opposed to assert?** Numbers, names, conditions — whatever you
   have. Getting these wrong is fine and useful. Not attempting them is not.
4. **Where do you disagree?** Disagreements are worth more than confusions, and they are the input to
   `P5`.

**Part two — the questions you could not answer.**

These belong in `## Recall` too; they are its second half. They are not `## Open questions` — that
section is what survives *after* the chapter is finished, and it is filled last, by hand.

Write down every place you stalled. **The stall is the location of the gap, precisely**, and it is
the highest-signal thing this whole exercise produces.

> Participants who taught material **without notes** performed comparably to a retrieval-practice
> group, and both outperformed those who taught *with* notes, a week later.
> Koh et al. 2018, `evidence/reading.md:369`

---

## The one measurement worth taking

**After you have written it, and only then**, open the chapter and count:

- **Load-bearing claims the chapter made:** _____ (use `## Key points`)
- **How many appeared in your recall, in any words at all:** _____

| Ratio | Read it as |
|---|---|
| **Above ~60%** | Working. Move on |
| **30–60%** | Normal. The reread is the specific claims you missed, not the chapter |
| **Below ~30%** | The chapter was denser than the brief said, or you read it tired. Both are facts about the **conditions**, not about you |
| **Near 100%, immediately, repeatedly** | **Suspect the measurement.** You are almost certainly recalling with the page open |

**The benchmark is not 100%.** In the study everyone cites, the recall group scored **61% at one
week** — and that was the *good* condition.

**Do not track this over time and do not average it.** It is a diagnostic for one chapter. Turning it
into a score reintroduces the counter this system removed on purpose — `reconciliation.md` row 9,
**no counters anywhere in the chrome.**

---

## Four tells that it did not work

| Tell | What it means | Do this |
|---|---|---|
| **It was easy to write** | Almost always fluency, not knowledge. A real closed-book recall is uncomfortable | Do the count above. Fluency and knowledge come apart hardest in exactly this genre |
| **You can only say it in the book's phrase** | You retained the packaging | Say it in words the author never used, or admit you have the slogan |
| **You stalled explaining it aloud** | The stall is the gap, located exactly | Note *where*. That paragraph is the reread — not the chapter |
| **Nothing surprised you** | Self-help prose is professionally optimised for fluency. *"Yes, of course"* is what the writing is engineered to produce, **and it is the sensation that predicts you will not remember it in a month** | Ask `P5` for the strongest objection. If nothing changes, the chapter had no content |

---

## Then

Run [`P4`](P4-explain.md) and paste this recall into it **verbatim, before anything else in that
message**. Do not tidy it up first. The errors are the data — a corrected recall marks as a good one
and teaches nothing.

Set `status: recalled` on the chapter once it is written.

**See also:** [spine-map.md](spine-map.md) for where `## Recall` sits among the twelve, and
`web-chat/reference/diagnostics.md` for the same measurements at book level.
