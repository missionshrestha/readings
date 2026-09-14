# RECONCILIATION — where the protocol and the evidence disagree, and which wins

**Read this once, before the first book. Then only when a rule surprises you.**

`protocol.md` was written at **14:44** on 2026-08-30. `evidence/reading.md` was written at
**15:01** and `evidence/reading-with-ai.md` at **15:10** — seventeen and twenty-six minutes later.
The evidence files contradict the protocol in fourteen places and **acknowledge none of them**,
because they were written after it and never folded back in.

This file folds them back in. **Where they conflict, the evidence wins** — that was decided
explicitly, and the reason is in the protocol's own appendix:

> **No study tests this pipeline.** The components are evidenced; the assembly is design. Treat it
> as a well-reasoned bet.
> — `protocol.md:1063`-ish, "What is reasoning rather than evidence"

A well-reasoned bet loses to a measured finding. Every row below cites both sides by line number so
you can check the call rather than trust it.

**One thing this file does not do:** it does not rewrite `protocol.md`. That file stays as the
record of what was originally designed. Where the two disagree, **this file is operative** and the
prompt library in `web-chat/prompts/` already reflects it.

---

## The fourteen, at a glance

| # | Conflict | Winner | What it changes in the machine |
|---|---|---|---|
| 1 | No closed-book recall stage | evidence | A required `## Recall` section + `<Recall>` |
| 2 | "No cap" on actions vs "choose ONE" | evidence | One `committed` + `tier: now` per book |
| 3 | Whole-book upload vs one chapter | evidence | P0/P3 rewritten; Stage 1 changed |
| 4 | P5's template triggers sycophancy | evidence | P5 restructured, question-first |
| 5 | P0's profile maximises sycophancy | evidence | P0 trimmed to the constraint set |
| 6 | P3 clarifies every chapter | evidence | `clarified:` per chapter; P3 conditional |
| 7 | Reread the recap vs retrieve it | evidence | `/review` serves the question, not the answer |
| 8 | Four-week ceiling vs 30-day gap | evidence | `nextEligible` on the book page |
| 9 | Throughput arithmetic vs volume-as-failure | evidence | **No counters anywhere in the chrome** |
| 10 | No mental contrasting | evidence | `obstacle:` required on a committed action |
| 11 | No knowledge/execution diagnosis | evidence | `gap:` required in `book.json` |
| 12 | Solo private site vs human in the loop | **neither** | Stated as a limitation, never simulated |
| 13 | Rule 11 exempts fiction, but 3 CORE books are novels | internal | `kind: lifelong` |
| 14 | Three divergent frontmatter shapes | internal | One schema |

Rows 13 and 14 are **internal** contradictions — the protocol against itself, or against
`universe.md`. They are here because they are settled in the same place.

**Rows 2, 4, 5, 6 and 12 were amended on 2026-09-14 by his own instructions**, after he read a
complete sample book. The rows below stay as written; the amendments are at the foot of this file.

---

## 1 · There is no closed-book recall stage, and it is the most important one

**Protocol.** The twelve stages run `GENERATE → READ I → EXPLAIN → READ II → DIALOGUE`
(`protocol.md:16-41`). Nothing between READ I and EXPLAIN asks you to produce anything from memory.

**Evidence.** `evidence/reading-with-ai.md:485`, Stage 5:

> **AI off:** write a one-page summary from memory, book closed, before any AI contact.
> **This step *is* the learning.** Then answer every question before checking.
> — 61% vs 40% (Roediger & Karpicke); 89% vs 73% with LLM-generated questions (An et al.)

And `:542`, Guardrail 4:

> **Never let AI do the retrieval.** Attempt from memory first, every time. **This one rule
> prevents most of the crutch effect.**

**Call — evidence wins.** A required `## Recall` section lands **before** the explanation layer,
carried by a `<Recall>` component that reads as a wall rather than a note, for the same reason
`<Attempt>` does upstream: a reader who scrolls past it should feel that they skipped something.

`/validate` refuses to mark a chapter `status: complete` with an empty Recall. This is the single
largest structural change the reconciliation makes, and it is the one that makes the difference
between reading and having read.

---

## 2 · "No cap" on actions against "choose ONE behaviour"

**Protocol**, in three places — `:187` (Stage 8), `:624` (P6), `:1007` (Rule 4):

> Extract **every genuinely distinct, relevant action this chapter supports.** No cap.

At twelve chapters that is plausibly dozens.

**Evidence.** `evidence/reading.md:443` is a section titled **"One behaviour per book"**, and `:568`
step 11:

> **Choose ONE behaviour.** One active change at a time.
> **Adding intentions doesn't raise the ~53% conversion rate; it divides attention.**

`evidence/reading-with-ai.md:487`, Stage 7: *"**Choose one.** One implemented beats five
considered."*

**Call — both, and the distinction is the point.** *Extraction* is uncapped, because an action is
**data** and a ledger row costs nothing. *Commitment* is capped: **exactly one action per book may
carry `committed: true` together with `tier: now`.** The rest are logged at `next`, `later` or
`reference` and are not being attempted.

`audit.mjs` warns — never refuses — above one. The protocol's own hedge already pointed here:
*"three simultaneous new behaviours is usually the ceiling before none of them survive."*

---

## 3 · Whole-book upload against one chapter at a time

**Protocol.** `:74`-`:76`, Stage 1:

> **Verify the upload before doing anything else.** … **Large books:** split by part and upload
> sequentially.

**Evidence.** `evidence/reading-with-ai.md:348`:

> Uploading a whole 300-page book and asking a broad question is the worst case for this effect.
> **Upload one chapter at a time and ask specific questions.**

`:445` Rule 3 and `:540` Guardrail 2 repeat it, citing Liu et al. on lost-in-the-middle: **>30%
degradation for mid-context material.**

**Call — evidence wins.** One chapter per upload. P0 and P3 are rewritten; Stage 1 ACQUIRE drops
whole-book verification and verifies the chapter map instead.

---

## 4 · P5's dialogue template states a conclusion in every field

**Protocol.** `P5`'s template, `:577`-`:584`, has the reader fill in `MY CONFUSIONS`,
`WHERE THE EXPLANATION CONTRADICTED WHAT I CONCLUDED`, `MY PUSHBACK` and `MY QUESTION`. Every field
supplies a belief before the model answers.

**Evidence.** `evidence/reading-with-ai.md:422`, the top sycophancy mitigation:

> **Never state your conclusion before asking.** Ask "what does this chapter argue?" not "this
> chapter argues X, right?" — Sycophantic agreement is triggered by the user *conveying a belief*.
> **Withhold the belief and the trigger is absent.**

The same file notes that all four practitioner guides it reviewed miss sycophancy entirely, and
that self-help is *"the exact input condition under which sycophancy is strongest."*

**Call — evidence wins.** P5 is restructured into two messages: **the question first, alone**, then
your position in a separate turn once the model has committed. `## Dialogue` on the page records
both **in that order**, so the sequence is auditable months later — if the page shows your position
first, the answer that follows it is suspect.

---

## 5 · P0 maximises personalisation; personalisation maximises sycophancy

**Protocol.** `P0 — MASTER SETUP` (`:250`) opens with a `WHO I AM` block (`:258`) — roughly 700
words of personal profile, pasted at the top of every book conversation. Its rule 4 is
*"PERSONALISE, NEVER GENERALISE."*

**Evidence.** `evidence/reading-with-ai.md:412`:

> **Personalisation and memory *increase* sycophancy.** Benchmarking across five frontier models
> found supplying memory profiles or interaction history raised agreement sycophancy
> **up to +45%** for one model.

And `:577`: models *"progressively mirrored users' viewpoints."*

**Call — evidence wins, narrowly and precisely.** P0 keeps the **constraint set** — time budget,
country and language context, what a usable answer looks like. It drops the **self-narrative**:
values, aspirations, the story of who you are. Those move to Stage 7 DECIDE, where *you* are
choosing an action and the model is not being asked to judge you.

P0's rule 5 — *"BE DIRECT. Don't soften a correction into a compliment"* — is the half with
evidence behind it and it stays, strengthened.

---

## 6 · P3 clarifies every chapter, on every book

**Protocol.** P3 runs unconditionally, and instructs: *"LENGTH IS NOT A CONSTRAINT. If clarity
needs more words than the original chapter, use more."*

**Evidence.** `evidence/reading-with-ai.md:252`:

> **Practical rule:** on unfamiliar material, let it explain freely. **On familiar material, go back
> to the original instead.**

That is the expertise reversal effect. The same file's "worst uses" list names *"summaries in place
of reading"*, and its §5.3 makes the sharper argument:

> A self-help book is usually one idea plus the examples, repetition and specificity that make it
> *actionable*. **Summaries preserve the idea and delete the machinery.**

**Call — evidence wins, conditionally.** `book.json` carries `familiarity` per book, and each
chapter carries `clarified: true|false`. When false, `## The clarified chapter` is **omitted from
the page** and READ I is the original text. The protocol's own Rule 8 — *"open the original for the
passages that matter"* — is upgraded from a hedge to a branch.

---

## 7 · Reread the recap, against the finding that rereading loses to retrieval

**Protocol.** `:1010`, Rule 7: *"**Reread the previous recap before every new chapter.** Thirty
seconds."*

**Evidence.** Rereading is rated **low utility** by Dunlosky et al.; retrieval practice is rated
high. The protocol's own appendix cites Roediger & Karpicke — the retrieval finding — and then
concludes *"this is why the recap card is reread before every chapter,"* which inverts what the
study found. **That is an internal misreading of its own citation**, not merely a conflict.

**Call — evidence wins.** The previous chapter's recap is **answered from memory first, then
opened**. `/review` serves the question and withholds the answer until you have committed to one.
Thirty seconds either way; only one of them is practice.

---

## 8 · A four-week ceiling against a thirty-day gap

**Protocol.** `:1006`, Rule 3: *"**Four-week ceiling.** Beyond that, it's the wrong book."* Combined
with Rule 2 (one book at a time) and Stage 0's *"When: between books"*, the next book starts
immediately.

**Evidence.** `evidence/reading-with-ai.md:489`, Stage 9: *"**30 days minimum before the next
book.**"* `evidence/reading.md:568`, step 19: *"Only then start the next book"* — after the week-6
keep/adapt/drop decision, so **six weeks at least.**

**Call — evidence wins.** A thirty-day gap is the default. The book page carries `nextEligible`,
computed from `finished`. It is a default, not a lock: you can start earlier and the site will say
you did.

---

## 9 · Throughput arithmetic against volume as the failure mode

**Protocol.** `:965`-`:967` computes *"~3.75 weeks per book → 12–15 books a year"* and
*"The 73 🔴 CORE books become a five-year path."* A whole Part is given to this arithmetic.

**Evidence.** `evidence/reading.md:491` is a section titled **"Reading the next book instead of
doing the last one"**:

> **The genre's central risk is that consuming it feels like doing it**, and this is the most
> insidious failure mode because it is indistinguishable from productive effort while it is
> happening.

**Call — evidence wins, and the protocol already agrees with itself at `:994` and `:1032`:**
*"This is the metric. Not books read. Not chapters published."* · *"The ledger is the metric. The
count is vanity."*

So: **no book counter, no chapter counter, no word count, anywhere in the site chrome.** `/shelf`
counts **running actions** — rows on the ledger still marked `day30: running`. The arithmetic stays
in `protocol.md` as a planning estimate and never becomes a display.

---

## 10 · Mental contrasting is absent, and it is the strongest negative finding in the corpus

**Protocol.** P6's STEP 3 attacks the draft commitment on five criteria, none of which is the inner
obstacle. No stage forbids visualising the outcome.

**Evidence.** `evidence/reading.md:569`, step 12: *"**Do NOT visualise success.**"* — and `:479`:

> It is one of the more robust findings in motivation research — and it **directly contradicts a
> technique promoted by a large fraction of the self-help genre.** Any book recommending that you
> visualise success as already accomplished is recommending something the evidence contradicts.

`evidence/reading-with-ai.md:488`, Stage 8: *"Ask me for the inner obstacle. **Refuse a vague
one.**"*

**Call — evidence wins.** `obstacle:` is a **required field on any action carrying
`committed: true`**. `/validate` flags one under six words as probably vague. And **nothing anywhere
on this site ever asks you to picture the outcome** — not a component, not a template, not a prompt.

---

## 11 · The knowledge-gap / execution-gap diagnosis is missing from Stage 0

**Protocol.** Stage 0 SELECT (`:44`) asks four questions. None is this one.

**Evidence.** `evidence/reading.md:122` states it as the question that comes before everything:

> **"Is my problem a knowledge gap, or an execution gap?"**

and `:127`: *"This single distinction predicts most of the disappointment people report with the
genre."* It is grounded in Marrs (1995) — `:25` — which found the genre works for knowledge gaps and
largely does not for execution gaps.

**Call — evidence wins.** `gap: knowledge | execution` is a **required field in `book.json`**. A
book chosen for an execution gap gets its action stages weighted and its explanation layer trimmed:
more reading will not fix a doing problem, and the machine should stop pretending otherwise.

---

## 12 · The accountability the evidence wants, this site cannot provide

**Protocol.** The whole apparatus is a solo, private, gated website. No human appears in any of the
twelve stages.

**Evidence.** `evidence/reading.md:607`: *"(Plus one structural condition: **someone who knows**
what you're attempting.)"* `evidence/reading-with-ai.md:546`, Guardrail 8: *"**Keep a human in the
loop.**"* Harkin's meta-analysis (N ≈ 20,000) finds **d = 0.40**, larger when progress is
**reported** and **physically recorded**.

**Call — neither wins, and that is the honest answer.** A website cannot supply a person, and a
private MDX ledger satisfies neither of Harkin's moderators. **This is stated as a limitation on
`/ledger` in words, and never simulated.** No streak, no badge, no encouraging copy. The machine
does not get to pretend it is accountability.

If you want the effect the evidence describes, tell someone. That is outside this repository, and
saying so is more useful than a progress bar.

---

## 13 · Rule 11 exempts all fiction, but three 🔴 CORE entries are novels

**Internal contradiction**, protocol against `universe.md`.

**Protocol.** `:1014`, Rule 11:

> **♾️ books are exempt from all of this.** *Meditations*, the Gita, the Tao Te Ching, the
> Dhammapada, **and all fiction. No pipeline, no explanation layer, no actions, no page.**

**Universe.** `universe.md:382` `🔴 S **The Course of Love**` · `:780` `🔴 S **Siddhartha**` ·
`:790` `🔴 L 🇳🇵 **Karnali Blues**` — all novels, all CORE. And *"73 🔴 CORE books cover all 16
domains"* counts them. If all fiction gets no page, three CORE books and most of Domain 15 cannot
exist on the site.

**Call — a third book shape resolves it.** `kind: lifelong` gives a book **one page and a dated
log**: no chapter pipeline, no explanation layer, no actions, no rating. Rule 11's intent — do not
apply the completion instinct to these — is preserved. Its literal claim, that they get *no page*,
is dropped, because a page that only holds what you noticed on each pass costs nothing and is the
only place those notes could live.

---

## 14 · Three frontmatter shapes, none of which agree

**Internal contradiction**, protocol against itself.

- `:868` — the Part 4 spec: `status: complete # generated | explained | complete`
- `:387` — P2's book frontmatter emits `status: reading`, **a value absent from that enum**
- `:745` — P8 introduces `finished:` and a book-level `verdict:`, **present in no spec**
- P3's chapter frontmatter omits `author`, `domain`, `cluster`, `rating`, `verdict`, `actions`,
  `committed` and `read` — all of which the Part 4 spec requires

**Call — one schema, in `src/content.config.ts`**, and it is the only one. `status` becomes
`stub | reading | generated | recalled | explained | complete | skipped | dropped` — `recalled` is
new and exists because of row 1, and `reading`, `skipped` and `dropped` exist because the pipeline
already produced them without declaring them.

> **`stub` was added to this list on 2026-08-31, and its absence is worth recording as a defect in
> its own right.** `scripts/new-chapters.mjs:346` has always written `status: stub` onto every
> scaffolded chapter and `scripts/audit.mjs:159` has always recognised it — but this row listed
> seven values and `md-spec.md` listed five. **The code was right and both contracts were stale**,
> and this file is one of the ones a web-chat Project uploads, so the stale copy was the one being
> read. The cost is specific: `audit.mjs` reports an unrecognised status as *"not a known value. It
> counts as not-complete everywhere, silently"*, so a spec that under-declares teaches you to
> hand-write a value the tooling then quietly discounts.

**Note the trade, because it is deliberate:** `status` is **not** validated as an enum. Enforcing it
would turn a typo in a pasted chapter into a build failure, which is the wrong trade for content
that arrives from a session that cannot see this filesystem. The cost is that `complete`, `Complete`
and `done` differ silently — so `scripts/audit.mjs` reports them, and that is the only thing that
will.

---

## Amendments — his second set of instructions, 2026-09-14

**Not a fifteenth conflict between the protocol and the evidence.** These are changes **he** made
after reading a complete sample book, quoted in `reader.md` §10. Where one of them touches a row
above, **his instruction is operative** — the same standing his 2026-08-31 answers already have over
the drafts — and the row above stays as the record of what was decided before.

| # | Touches | What changed | Where it landed |
|---|---|---|---|
| A | Row 2 · *extraction uncapped* | **Two to ten actions per chapter.** Commitment is unchanged: one `committed` + `tier: now` per book. *"a conceptual chapter may support none"* is withdrawn | `chapter-spine.md` §6c · `P6` · `<Actions />` · `audit.mjs` |
| B | Row 4 · *P5 question-first* | **The whole exchange is recorded**, not one pair. The question still comes first and the position second — that order is the audit and it is untouched. `### How the exchange went` is added between the position and the ending | `chapter-spine.md` §6 · `P5` |
| C | Row 5 · *P0 trimmed to the constraint set* | **Clarity replaces brevity** in the constraint set. `P0`'s *"I read fast"* is gone; the character sketch stays out, because the reason for removing it — personalisation raises sycophancy — is unchanged | `standards.md` §2b · `P0` |
| D | Row 6 · *summaries delete the machinery* | **Confirmed, from a third direction.** *"not oversimplified to the point where meaning is lost. Keep the original meaning intact"* is the same rule arrived at from the reader's side. Nothing about `clarified` changes | `standards.md` §2b a |
| E | Row 12 · *solo private site, stated as a limitation* | **He now plans to share progress publicly.** The limitation is qualified, not removed: a public post is not a person who asks, its effect is untested, and nothing simulates it | `reader.md` §5 and §10f |

**One amendment touches no row, and is recorded because it reverses an earlier call made in this
repository rather than in the protocol:** `### Where the author was standing` was told on 2026-08-31
*not* to become biography. At book level, biography is now owed — `## Author context`
(`book-spec.md` §6) — and the chapter sub-section keeps only what bears on its own chapter.

---

## What this file does NOT reconcile

Stated so nobody assumes it was handled.

| Open | Why it is left open |
|---|---|
| **Books whose unit is not a chapter** | *The Psychology of Money* (19 short chapters), *Atlas of the Heart* (87 emotions), *A Pattern Language* (253 patterns), *Letters from a Stoic*. `kind: reference` covers most of it; the 19-chapter case genuinely breaks the four-week ceiling and needs a per-book decision |
| **96 🔵 REFERENCE books** | `kind: reference` gives them a page shape, but nothing tests whether a problem→answer log is the right shape until one is actually used |
| **Reading order ≠ sidebar order** | P2 asks whether a chapter should be read out of order; `sidebar.order` is bound to `chapter`. No field carries a reading sequence yet |
| **`verdict: skip` chapters** | Whether a skipped chapter still gets a page is decided per book in `book.json` `antiChapters`, but the ergonomics are untested |
| **The 12-chapter assumption** | The protocol's arithmetic hardcodes 12; `weight: L` is defined as 400+ pages, which is routinely 20–30 chapters |

---

## Provenance

Every line number above was read on **2026-08-31** against the copies in this directory, which are
byte-identical to the originals in
`learn-anything-in-tech-system/book-context/` (md5 verified at copy time). If a file is edited, the
citations move and this file needs re-anchoring — **re-anchor them, never delete them.**
