# Operating rules — how you use AI while reading

**Read this before the first chapter and again at chapter five.** Nothing else in this system
matters if this goes wrong, and it goes wrong by drift rather than by decision.

The core problem, stated plainly: **the same interaction that most accelerates your output most
reliably prevents you from learning**, because it removes exactly the generation and retrieval
effort that produces understanding. Both halves are true at once. The answer is not to use less AI.
It is to know which mode you are in.

**The protocol in one line:**

> **Let AI do everything about the book. Do everything about yourself.**

---

## 1 · The layer table

The single most useful artifact in the evidence base. Thirteen rows, and each one is a decision
someone otherwise makes by feel.

| Layer | AI off | AI on |
|---|:---:|:---:|
| Diagnosing whether a book is even the right tool | **Off** | — |
| Choosing which book | — | Screening evidence, checking critics |
| First pass through the book | **Off** | — |
| Identifying the 10% that applies to you | **Off** | — |
| Notes in your own words | **Off** | — |
| **Summary from memory** | **Off** | — |
| Filling gaps in unfamiliar material | — | Explaining, expanding |
| Quizzing yourself afterwards | — | Generating questions, marking answers |
| Explaining it back | — | Playing sceptical student |
| **Deciding what to change** | **Off** | — |
| Turning the decision into a plan | **Write the sentence yourself** | Draft the menu, run the pre-mortem |
| Tracking | **Off** — physical, public | — |
| Review cadence | — | Scheduling, interrogating, prompting |

---

## 2 · The dividing line

| ✅ Let it do this | ❌ Do this yourself |
|---|---|
| Explain what the chapter argues | Decide which idea matters to you |
| Give background you lack | Identify where it applies in your life |
| Assemble the criticism | Judge whether the criticism is right |
| Test whether you understood | **Produce the understanding** |
| Draft candidate if–then plans | **Choose one and write the sentence** |
| Attack your plan | **Write the plan** |
| Interrogate your tracking data | **Record the tracking data** |

**The tell, and it is worth checking every few chapters:** if the transcript is mostly AI-generated
prose, you are in the harmful condition. **The AI should be asking you questions more often than
you are asking it.**

---

## 3 · The six design rules

Every prompt in this library is built on these. They are also what to fall back on when you are
improvising.

1. **The AI withholds; you produce.** It may explain the book freely. It must not produce your
   conclusions, your summary of what matters, or your plan.
2. **One step at a time.** Never the complete answer in a single message. Attempt first, receive
   second.
3. **Ground it in the source — one chapter at a time.** Upload the actual text. Ask for citations to
   that chapter. **Never the whole book at once:** the lost-in-the-middle effect makes whole-book
   uploads the worst case, with **>30% degradation** for material in the middle.
4. **Instruct at length.** A short prompt gets you the harmful configuration by default. The
   measured difference was **500+ words against ~50** — the length was the safeguard, not decoration.
5. **Make it adversarial about you, generous about the book.**
6. **Distrust the tail.** Request takeaways and action items separately, and short.

---

## 4 · Sycophancy — the thing all four practitioner guides missed

This is not a general caution. It is specific, and self-help is the worst possible case for it.

> **Every request in this genre is a request for judgement about the user, framed by the user, using
> the user's own account of the facts.** That is the exact input condition under which sycophancy is
> strongest — and it is the entire content of self-help.

**The mitigation that works, and it costs nothing:**

> **Never state your conclusion before asking.** Ask *"what does this chapter argue?"*, not *"this
> chapter argues X, right?"* Sycophantic agreement is triggered by the user **conveying a belief**.
> Withhold the belief and the trigger is absent.

**And the counterintuitive one:** personalisation makes it worse, not better. Supplying memory
profiles or interaction history raised agreement sycophancy **up to +45%** across five frontier
models, and models progressively mirrored the user's viewpoint. **The more it knows about you, the
more it tells you what you want to hear.** That is why `P0` carries a constraint set and not a
character sketch.

---

## 5 · The prohibition zone

Name it before you start, and do not delegate it. For this system it is **fixed and
non-negotiable**:

- **`## Recall`** — written closed-book, before any AI contact.
- **The obstacle** — what will actually stop you.
- **The IF–THEN commitment** — you write the sentence.

Everything else in a chapter is fair game.

> `P0` makes it refuse. **If it complies anyway, you broke your own system.**

---

## 6 · Standing checks on anything it generates

- **Do the named things exist?** Verify every citation before it enters your notes — especially the
  ones most useful to you.
- **Is that documented, or observed?** And against which edition?
- **Who disagrees, and at what scale do they operate?**
- **Am I accepting this because it is right, or because it flatters a decision I already made?**

---

## 7 · Two things the evidence says that the site cannot do for you

Stated here because a system that only lists what it solves is marketing.

**Tell a human being.** Monitoring works, and it works **better when progress is reported to
someone** and **better when the record is physical** — Harkin, *d* = 0.40, N ≈ 20,000, larger on
both counts. A private page ticked by the person who wrote it satisfies neither. `/ledger` says so
in its own words rather than simulating it with a streak.

**Thirty days between books.** Not because the reading needs the gap, but because the doing does.
The genre's central risk is that **consuming it feels like doing it**, and that failure is
indistinguishable from productive effort while it is happening.

---

## 8 · The one-screen version

- **Let AI do everything about the book. Do everything about yourself.**
- **Ask before you tell.** Never state your conclusion first.
- **Attempt from memory, every time.** This one rule prevents most of the crutch effect.
- **On familiar material, go back to the original** rather than a clarified version.
- **One chapter per upload.** Never the whole book.
- **Choose ONE action.** One implemented beats five considered.
- **Name the obstacle. Never picture the outcome.**
- **Record the failures too.** A ledger with no dropped rows measures nothing.
- **Never delegate:** the recall, the obstacle, the commitment.
