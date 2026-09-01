# SOURCE-RULES — what may support what

`## Sources` is the twelfth heading in `chapter-spine.md`, and its stated failure is *"a claim in
the body appears nowhere in it."* That rule says a citation must **exist**. This file says what a
citation must **be**, because the two are different defects and only the first is visible.

**The problem this exists for.** Almost every chapter of a non-fiction book rests on a study, and
almost every one of those studies is described in the book by an author with a thesis to sell. An
explanation layer that repeats the book's description of its own evidence has verified nothing —
it has laundered a claim through a second voice, which makes it *read* as corroborated. That is
the single most likely way this site ends up teaching something false, confidently.

---

## 1 · The four tiers

| Tier | What it is | May support |
|---|---|---|
| **A — Primary** | The study, the meta-analysis, the pre-registration, the dataset, the original text | Anything |
| **B — Independent secondary** | A replication, a review by someone with no stake, a critic, an encyclopaedia entry | Anything, if the primary is named in it |
| **C — The book itself** | What this book says about its own evidence | **Only what the book claims.** Never what is true |
| **D — Unsourced** | "Studies show", "research suggests", a number with no owner | **Nothing.** Delete it or mark it |

**Tier C is the trap, not tier D.** Tier D is loud — it reads as vague and a reader discounts it.
Tier C reads as a fact and is indistinguishable from one. *"Newport cites a 2012 McKinsey figure
that knowledge workers spend 28% of the week on email"* is a correct tier-C sentence. *"Knowledge
workers spend 28% of the week on email"* is the same sentence with its provenance removed, and
that removal is the defect.

**The test, in one line:** if the book turned out to be wrong about its own source, would this
sentence still be on the page? If yes, it needed tier A or B and does not have it.

### Four worked rewrites

Each of these is a tier-C sentence that reads as tier A, and the repair beside it. Notice that the
repair is never shorter and never hedged — it is the same claim with its provenance restored.

| Written as tier A (wrong) | The tier-C repair | The tier-A/B upgrade, if you did the work |
|---|---|---|
| "Knowledge workers spend 28% of the week on email." | "Newport cites a 2012 McKinsey figure that knowledge workers spend 28% of the week on email." | Find the McKinsey report, read it, cite it with a date and a URL — **and say what its sample was.** If you cannot find it: `[UNVERIFIED: …]` |
| "Task-switching leaves attention residue that measurably degrades the next task." | "The book rests this on Leroy 2009, which it describes as showing attention residue." | "Leroy 2009, *OBHDP* — attention residue, measured in a lab task-switching paradigm. Narrow, real, and it does not test the multi-hour blocks the chapter builds on it." |
| "Writing by hand beats typing for retention." | "The chapter asserts this; it does not name a study." | **This one is on the standing list.** `evidence/reading.md:316` and `:652`: Mueller & Oppenheimer (2014, *Psych Science*) is the original, Morehead, Dunlosky & Rawson (2019, *Educ Psych Rev*) is a preregistered replication that **did not cleanly reproduce it**, and a 2024 meta-analysis across 24 studies finds an advantage but a small one, **Hedges' g ≈ 0.25**. The honest sentence says "contested", and says that generative-vs-verbatim is the real variable |
| "Priming effects show how much of behaviour is unconscious." | "*Thinking, Fast and Slow* argues this at length." | *"Thinking, Fast and Slow* does not tell you the priming chapters failed replication" — `evidence/reading-with-ai.md:237`. **Kahneman himself walked the chapter back.** A chapter that repeats the claim without that clause is retyping the book's marketing |

**The middle column is a legitimate output.** A chapter that says "the book asserts X and names no
study" has told you something true and useful. A chapter that says "X" has not.

---

## 2 · Pin and date, or do not write it

Every empirical claim carries **who, when, and what kind of thing it is**:

> Oettingen & Mayer 2002, *JPSP* — four studies, correlational plus experimental. Positive fantasy
> about an outcome predicted **lower** attainment across all four.

Never *"a famous study found"*. Never *"the latest research"*. **Undated facts rot silently;
dated facts rot visibly** — the same rule that governs a version number, for the same reason.

An effect size beats an adjective. *"d = 0.40 when the goal was reported to someone"* is a fact a
reader can argue with; *"accountability helps a lot"* is not.

---

## 3 · Say how strong it is, in the sentence

A claim that does not carry its own weight gets read at full strength. Four words, and one is
required whenever the claim is doing work:

| Word | Means |
|---|---|
| **Replicated** | Independent groups, same direction. Treat as load-bearing |
| **Single study** | One lab, one sample. Interesting, not settled |
| **Contested** | Real, competent people disagree about it now |
| **Failed to replicate** | Say it, and say it *where the original claim is made* — not in a footnote |

### The standing list

**These appear across dozens of the 293 books in this universe, and each has either failed to
replicate or been materially walked back.** A chapter that repeats one without a qualifier **in the
sentence** is not neutral — it is the book's marketing, retyped.

| Claim as books state it | What must appear in the sentence | Where this repository already says so |
|---|---|---|
| **Priming** — subtle cues reliably shift behaviour | Failed to replicate; the author of the most-cited popular account walked the chapter back | `evidence/reading-with-ai.md:237` — *"Thinking, Fast and Slow does not tell you the priming chapters failed replication"* |
| **Ego depletion** — willpower is a depleting resource | Failed to replicate at the effect size the popular accounts use | `[VERIFY IN SESSION]` — no anchor in this repository yet |
| **Power posing** — a posture changes hormones and behaviour | The hormonal claim did not replicate; a smaller felt-power effect is what survives | `[VERIFY IN SESSION]` |
| **Learning styles** — visual/auditory/kinaesthetic matching improves learning | No evidence of a matching effect. It is one of the most-tested and most-refuted claims in education | `[VERIFY IN SESSION]` |
| **The 10,000-hour rule** — deliberate practice explains expertise | Materially overstated relative to the research it cites; the original author has disputed the popular version | `[VERIFY IN SESSION]` |
| **Handwriting beats typing** | **Contested**, with a preregistered replication that did not cleanly reproduce it and a small meta-analytic effect | `evidence/reading.md:316`, `:652` |

**`[VERIFY IN SESSION]` is not laziness, it is the rule applied to this file.** This file may not
hardcode a citation nobody read while writing it — that would be the exact tier-C laundering it
exists to prevent, one level up. The row tells you **what you must find**, and the session with
search on must find it and pin it. A stale citation in a contract is worse than an absent one,
because the next reader treats it as verified.

**Nothing on this list may be cited FROM this table.** The table is a trigger, not a source.

---

## 4 · `outsideView` is where this lands at book level

`book.json` carries it, and Stage 2 is where it is filled — before a single chapter is generated:

```
outsideView: {
  replication: "what in this book has failed to replicate",
  critics:     "who disagrees, and their strongest point — not their weakest",
  agedBadly:   "what was true in <year> and is not now"
}
```

**"Their strongest point, not their weakest"** is the whole value of the field. A steelman you
cannot answer is the most useful thing a book can give you; a strawman is flattery with extra
steps.

`kind: lifelong` is exempt. A novel makes no empirical claim, so there is nothing to tier.

### The stopping rule — a number, not a feeling

`outsideView` research is unbounded by nature: there is always one more review to read. Left
without a floor and a ceiling it becomes either two minutes of skimming or an afternoon. Both are
failures, and only the first is obvious.

**Stop when all four of these are true, and not before:**

| | Floor |
|---|---|
| 1 | **At least three independent sources consulted**, none of them the book, its publisher, or the author's own site |
| 2 | **At least one is a critic** — someone arguing the book is wrong, not someone noting it is imperfect |
| 3 | **Every claim on the standing list in §3 that the book makes has been looked up**, and carries its qualifier |
| 4 | **You can state the strongest objection in a sentence you would not be embarrassed to show its author** |

**And a ceiling: if 20 minutes of searching has not produced (2), stop and write that down.**

> `critics: "Searched reviews, two forums and the author's own critics page for 20 minutes. Found
> no substantive critic — only complaints about tone. That is a finding about the book's reception,
> not evidence that the book is right."`

**That is a correct, complete value for the field.** *"When it's thin, say so rather than inventing
consensus"* cuts both ways: an empty critics section is honest, and a manufactured one is the
single most damaging thing that can go into `book.json`, because every chapter of the book
inherits it.

---

## 5 · What the AI may not do here

- **Invent a citation.** A plausible author, year and journal is the easiest thing in the world to
  generate and the hardest thing on this page to catch. **If it cannot name the source, it says
  so** — `[UNVERIFIED: …]` is a correct output and an empty `## Sources` is not.

### What `[UNVERIFIED: …]` must contain

Four parts, and a marker missing any of them is a shrug with square brackets round it:

1. **What the book attributes the claim to**, in the book's own terms.
2. **What you searched for**, specifically enough that the next person does not repeat it.
3. **What you found instead** — nothing, a paywall, a different number, a secondary source quoting
   the same secondary source.
4. **What changes if it is wrong.** This is the part everyone omits and the only part that decides
   whether the chapter can stand.

```
[UNVERIFIED: Newport attributes the 28% figure to a 2012 McKinsey report on the
social economy. Searched McKinsey Global Institute 2012 publications and the
report's own title; the figure appears in coverage OF the report, not in a copy
of it I could open. If the number is wrong the chapter's argument survives —
it needs email to be a large share of the week, not 28% of it.]
```

Compare: `[UNVERIFIED: could not confirm]`. That tells the next reader nothing, and it will still
be there in a year.
- **Upgrade a tier.** Reading the book's account of a study does not produce a tier-A citation,
  and describing it in the third person does not either.
- **Round a number toward the argument**, or drop the confidence interval because it was untidy.

---

## 6 · Pre-flight — three questions before `## Sources` is done

1. **Does every empirical claim in the body appear here, with a name and a year?**
2. **Is anything tier C written as though it were tier A?** — the sentence test in §1.
3. **Is there a claim on the replication list in §3 with no qualifier next to it?**

Any "no" is a defect in the chapter, not a note for later.
