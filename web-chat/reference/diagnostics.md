# Diagnostics — am I actually retaining this

Everything else in `web-chat/` tells you what to type. This file tells you how to find out whether
it worked, and it exists because **the sensation of learning and the fact of learning come apart
in exactly this genre**.

> Rereading increases familiarity, familiarity feels like knowledge, **and the feeling is wrong.**
> Roediger & Karpicke surveyed 117 students: most chose rereading, very few self-tested. They named
> it the **illusion of competence**. — `evidence/reading.md:161`

And the reason it bites harder here than in a textbook:

> Self-help prose is **professionally optimised for fluency**. It is edited to feel obvious. The
> sensation of *"yes, of course, this is exactly right"* is what the writing is engineered to
> produce — **and it is precisely the sensation that predicts you will not remember it in a
> month.** — `evidence/reading.md:163`

So: **do not ask yourself whether you understood it.** You will say yes and you will be wrong at a
rate you cannot detect. Ask the questions below instead. Every one is answerable with a fact.

---

## 1 · The four tells, in order of how early they fire

| # | Tell | What it means | Do this |
|---|---|---|---|
| 1 | **The recall was easy to write** | Almost always fluency, not knowledge. A real closed-book recall is uncomfortable | Compare it to the chapter. Count what you *actually* had |
| 2 | **You cannot say what the chapter argued without saying the book's phrase for it** | You retained the packaging | Say it in words the author never used. If you cannot, you have the slogan, not the claim |
| 3 | **You stall when explaining it aloud** | The stall is the location of the gap, precisely | Note *where* you stalled. That paragraph is the reread |
| 4 | **The action has no trigger you could photograph** | It is an intention, not a plan | Rewrite it with a time and a place, or delete it |

Tell 3 is the highest-signal one and the least used:

> Participants who taught material **without notes** performed comparably to a retrieval-practice
> group, and both outperformed those who taught *with* notes or did neither, a week later.
> **Where you stall is where you don't understand it.** — Koh et al. 2018, `evidence/reading.md:369`

---

## 2 · The one measurement worth taking — recall coverage

After you write `## Recall` closed-book, and **only then**, open the chapter and count:

- **Load-bearing claims the chapter made:** _____ (use `## Key points`)
- **How many appeared in your recall, in any words at all:** _____

That ratio is the only honest number this system produces about your memory.

**The benchmark is not 100%.** In the study everyone cites, the recall group scored **61% at one
week** — and that was the *good* condition. `evidence/reading.md:157`

| Ratio | Read it as |
|---|---|
| **Above ~60%** | Working. Move on |
| **30–60%** | Normal. The reread is the specific claims you missed, not the chapter |
| **Below ~30%** | Either the chapter was denser than the brief said, or you read it while tired. Both are facts about the *conditions*, not about you |
| **Near 100%, immediately, repeatedly** | **Suspect the measurement.** You are almost certainly recalling with the page open, or the chapter had two ideas and the brief said six |

**Do not track this over time and do not average it.** It is a diagnostic for one chapter, and
turning it into a score reintroduces the counter this whole system removed on purpose.

---

## 2b · Could you follow every sentence — the clarity check

His standard for every page, set on 2026-09-14: *"The user must be able to interpret and understand
every sentence produced."* It is the one property of the output that only you can measure — and it is
measured the same way memory is, with a count rather than a feeling.

**Once per chapter, after the recall**, take one section of the explanation layer and count:

- **Sentences you had to read twice to understand:** _____
- **Terms you would have had to look up:** _____
- **Load-bearing claims with no example, worked case or analogy beside them:** _____

| Result | Read it as |
|---|---|
| **All three zero** | The section met the standard. Move on |
| **A term to look up, or a claim with no example** | **A defect in the page, not in you.** Send it back: *"say that again in plain words with an example, without changing the claim"* |
| **Several sentences read twice** | Compression — terms before definitions, notes instead of sentences. `troubleshooting.md` has the line |
| **Everything was easy and nothing surprised you** | **Not the same result as all zeros.** That is tell 1 in §1 — fluency. Check it against the recall count in §2 before you trust it |

**Clear is not the same as correct.** A sentence you understood perfectly can still be wrong, and a
simplified sentence can say less than the author did. The check for that is different: *would the
author sign the simpler sentence?* — and the sources.

**Do not track this over time and do not average it**, for the same reason as §2.

---

## 3 · The AI-specific tells

The transcript is evidence, and it is the evidence you are least likely to look at.

| Tell | Diagnosis |
|---|---|
| **The transcript is mostly AI prose** | You are in the harmful condition. Stated twice in the source. `evidence/reading-with-ai.md` |
| **It has not disagreed with you in three chapters** | Sycophancy. Ask the question *before* stating your position — reconciliation row 4 — and check `phrasebook.md` |
| **You read the retrieval question and its answer together** | You converted the one high-utility technique into the low-utility one. *"The single easiest mistake to make."* `evidence/reading-with-ai.md:262` |
| **You asked it what you should do about your life** | `P0`'s one rule. It may compress, expand, rewrite, explain and criticise the **book**; it may not decide what you do |
| **Everything it summarised sounded right and none of it surprised you** | Ask for the strongest objection to the chapter, from someone competent. If nothing changes, the chapter had no content |

**The operational tell, from the evidence, in one line:** *the AI should be asking you questions
more often than you are asking it.* If that is not true of this transcript, the balance is wrong.

---

## 4 · The delayed check — day 3, and it is not optional

Everything above measures the same sitting, and same-sitting memory is nearly worthless as a
predictor. **The retrieval advantage grows as the interval lengthens** (`evidence/reading.md:161`)
— which is another way of saying that at zero delay the two conditions look the same, and the one
that is failing looks fine.

`/review` exists for this and **serves the question without the answer** on purpose. Reconciliation
row 7.

> **Answer from memory. Then open the page.** In that order, or the exercise measures nothing.

A miss is a scheduling fact, not a verdict:

> Median **66 days** to automaticity, range **18–254**, and **a single miss did not derail it.**
> Lally et al., `evidence/reading-with-ai.md:489`

---

## 5 · The book-level diagnostic — three questions, at the end

1. **Name the one thing you changed.** Not learned — *changed*. If there is nothing, the verdict is
   `confirmed something` or `entertainment`, and both are legitimate. Writing `changed something`
   when nothing changed is the only wrong answer.
2. **Is the committed action still running at day 30?** `/ledger` knows. If it is not: was it the
   **trigger**, the **action**, or the **idea**? Those need different fixes and only the third means
   the book was wrong.
3. **Would reading it plainly have been faster?** Answer honestly, every time.

And the honesty valve on the whole system, which lives in `reader-profile.md` and is repeated here
because this is the file where you would notice it:

> **If three books in a row say *"reading it plainly would have been faster"*, the system is wrong
> and needs changing — not more effort.**

---

## 6 · What this file will not do

It will not tell you whether you are a good reader, whether you are making progress, or whether you
are behind. There is no score, no streak and no percentage anywhere in it, for the reason
`WORKFLOW.md` records: **the evidence wants a person and a physical record, and simulating
accountability is worse than admitting there is none.**
