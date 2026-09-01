# STANDARDS — what "good" means on a chapter page

The content quality bar. **`md-spec.md` owns syntax, `chapter-spine.md` owns structure,
`source-rules.md` owns citations, `book-spec.md` owns the brief — this file owns everything else:
who is being written for, what register, how deep, and the specific ways generated prose about
self-help goes wrong.** Where they touch, the more specific file wins.

**Read this every time a chapter is generated.** It is short on purpose. A file that is consulted
only when something is missing has failed the every-time test and belongs somewhere else.

---

## 1 · Who is reading

**One person, and everything here comes from him directly.** `context/reader.md` is the full record,
maintained under one rule: *never write a cell you did not read in a file or hear from him this
session.* The four facts a chapter depends on:

| | |
|---|---|
| **What he is here for** | *"I am someone who want to continously learn and grow, in various aspects of life like health, wealth, career, relationships, social, spiritual and other aspects of life."* — his words, 2026-08-31 |
| **Length** | **There is no budget.** *"if a chapter is 10 hour or unlimited long, you do it… Nothing happens if i don't finish a chapter."* §3 below |
| **The transfer question** | **Additive, never subtractive.** *"you don't remove, alter the things that author wanted to say for original intent, you can give extra instead"* |
| **Prior reading** | **None of the 293 books has been read.** Every book is a first book; no chapter may assume a re-read |

**The breadth is the point, not a hedge.** It maps onto all sixteen domains rather than one, so
**no chapter may assume a professional frame** — not "as an engineer", not "in your career" —
unless the book itself sits in a domain where that is the subject. He gave no job title and was not
asked for one twice.

**He is not an audience.** No "you might be wondering", no "don't worry", no "congratulations". He
did not ask to be encouraged, and encouragement costs credibility on everything adjacent to it.

**He cannot tell whether a chapter worked, and neither can you.** That is what `## Recall`, the
day-30 review and `/ledger` are for. Nothing on the page may claim the reading succeeded.

### Two things he has NOT told us

Kept here as well as in `reader.md`, because an unlisted gap gets filled by guessing:

- **What he has already tried and abandoned.** The sharpest input to a `gap: execution` diagnosis.
- **Which country and context details he wants surfaced.** §5 says describe differing conditions
  and draw no conclusion; where exactly that line sits per domain is untested.

Mark either as `[ASSUMPTION: …]` if a chapter needs it. **An empty cell is a known gap; a guessed
one is indistinguishable from a real answer.**

---

## 2 · The correctness bar

**A chapter that ships wrong is worse than one that does not ship.** It teaches confidently and he
will not know. This outranks every other rule here, including completeness. When correctness and
coverage conflict, cut the coverage.

1. **No claim without a source you read in that session.** The book itself, the study, the
   replication, the thread. See `source-rules.md` for what each tier may support.
2. **Cite the anchor, not the page.** A citation that makes him hunt is not a citation.
3. **Never invent an author, a year, a journal or a study.** This is the easiest thing a model can
   generate and the hardest thing he can catch, and in a personal corpus a single confident wrong
   claim costs the premise of the whole project.
4. **Pin and date.** "Newport 2016, *Deep Work* ch. 2, read 2026-09-14", never "as research shows".
5. **Distinguish what the BOOK claims from what is TRUE.** A tier-C source may support the first and
   never the second. Writing "knowledge workers spend 28% of the week on email" instead of "Newport
   cites a 2012 McKinsey figure that…" is that deletion, and the deletion is the defect.
6. **Where sources conflict, say so.** Name both, say which you followed, say why. Silently
   resolving a real disagreement is the kind of lie that survives review.
7. **Say what you do not know.** *"The claim is untested at this scale; the nearest evidence is X,
   which does not settle it"* is a good sentence. Confident vagueness is not.
8. **If it cannot be verified, `[UNVERIFIED: …]` or cut it.** An absent sentence costs nothing.

---

## 3 · Voice

**Calm authority.** Someone who has actually read the book, explaining it to someone they respect,
with no audience watching.

**Write:** direct · concrete — name the chapter, the number, the study, the objection · honest about
what the argument costs, because a description with no cost in it is one you have not finished
reading · plain language before jargon, defined on first use · second person for instructions, third
for mechanism.

**Never write:**

| Banned | Why |
|---|---|
| **Anything that asks him to picture the outcome** — "imagine how it will feel", "see yourself having done it" | **The strongest negative finding in the evidence base.** Oettingen & Mayer: visualising the outcome predicts LOWER attainment. Naming the obstacle is the half with evidence behind it. Nothing on this site may contradict this |
| Motivational language — "you've got this", "small wins compound" | He did not ask to be encouraged |
| Jacket copy — "seminal", "must-read", "life-changing", "the definitive book on" | Unfalsifiable, and it is the register of the thing being read rather than of reading it |
| Manufactured consensus — "many readers find", "reviewers often note" | Sub-section 5 exists to report what was actually found. **If it is thin, say it is thin** |
| Hedging stacks — "might possibly", "generally tends to" | That is what uncertainty looks like when it refuses to be specific. Say what you know and what you do not, separately |
| Filler openers — "it's important to note that" | Zero information. Delete it; the next sentence is the content |
| "Simply", "just", "obviously", "of course" | If it were obvious he would not have opened the chapter |
| Rhetorical questions as openers — "so what is deep work?" | Say the thing |
| Restating the heading as the first sentence | Wastes the highest-value line on the page |
| Undefined "we" | Say who. The author, the critics and the reader are different actors |
| Emoji in a heading | Breaks anchors, pollutes the search index |

**Length falls out of the material and is never a target.** There is no word budget (§1), and that
cuts both ways: it is permission for a chapter that needs 6,000 words, not licence for padding.
Delete preamble, recap, "as we saw earlier", and any sentence that survives its own removal.

---

## 4 · Depth, proportioned by the brief

**No new frontmatter field, and no rate table.** `book.json` already carries the three axes, and
they are decided at Stage 2 — which is the whole point: depth is a property of the brief, not of how
much the model felt like writing.

| Axis | Values | What it decides |
|---|---|---|
| `weightInArgument` | load-bearing · supporting · illustrative | How much of the book's argument rests here |
| `verdict` | deep-dive · skim · skip | How much of it is worth your hours |
| `gap` | knowledge · execution | **Where the effort goes at all** |

The mandated treatment is the table in `chapter-spine.md` §8, and it is binding rather than
advisory. Two rules govern its use:

1. **`gap` outranks the other two.** On `gap: execution`, a flawless teaching pass is the most
   expensive way this system can waste a week. `evidence/reading.md:122` calls the knowledge-vs-
   execution distinction *"the single distinction [that] predicts most of the disappointment people
   report with the genre"* — the books that "didn't work" were aimed at execution gaps and read as
   though they solved knowledge gaps. On an execution gap the weight moves to `## Actions`, the
   obstacle, and the day-30 review.
2. **A sub-section is never dropped, only shortened.** A missing sub-section is a structural defect
   that `/validate` and the pre-flight both catch. A short one is a judgment, and §6 says what a
   judgment owes.

---

## 5 · The transfer question

`### Where it doesn't transfer` is the one sub-section governed by an instruction he gave rather
than by the evidence, so it overrides anything that sounds tidier.

**It may say where a claim's CONDITIONS differ. It may not conclude that the claim therefore does
not apply to him.** That conclusion is his, and it belongs with the recall and the commitment.

| Write this | Not this |
|---|---|
| "The chapter assumes discretionary control over working hours. Where that does not hold, the mechanism it relies on is X, and the substitute is Y." | "This won't work for you." |
| "The salary arithmetic is US-2016. The same ratio elsewhere changes the cost side, not the claim." | Quietly dropping the claim as inapplicable |
| Adding a paragraph on what the condition looks like elsewhere | Rewriting the author's claim to fit a context they never addressed |

**Add, never subtract.** *"you don't remove, alter the things that author wanted to say for original
intent, you can give extra instead."* This independently confirms `reconciliation.md` row 6 —
summaries preserve the idea and delete the machinery — from a completely different direction, which
is the strongest form a rule in this repository can have.

---

## 6 · Anti-patterns

The specific ways generated prose about this genre goes wrong. Every one of these produces a page
that reads well.

| Anti-pattern | Looks like | Rule |
|---|---|---|
| **Fluency without substance** | Reads beautifully, survives no closed-book test | `## Recall` is the test, and it is written before the explanation layer for exactly this reason |
| **The book report** | The chapter summarised a fourth time under a new heading | Every section past `## Key points` must ARGUE with the chapter, apply it, or check it. None of them may restate it |
| **Manufactured consensus** | "Many readers report…" with no venue | Name where you looked. **Thin is a finding, not a failure** |
| **The strawman critic** | Every criticism rebutted in the same paragraph | Steelman. A critic section that makes the book look good has not earned its place |
| **Citation theatre** | Links that resolve but do not support the claim | Cite what you actually read. `source-rules.md` |
| **Visualise-success** | "Picture yourself at the end of the month" | **Banned outright.** §3 |
| **Advice inflation** | An illustrative chapter written as though it were load-bearing | `weightInArgument`. §4 |
| **Solving the wrong gap** | A deep teaching pass on a chapter he already understands and does not do | `gap: execution`. §4 rule 1 |
| **Template filling** | A section present because the spine had it | Sections are earned. An empty `## Dialogue` is worse than none, because it claims an argument happened |
| **The uncommitted ledger** | Five plausible actions, none of them his | One committed action per book. The rest are extraction, and extraction is uncapped |
| **Silent transfer surgery** | The claim quietly narrowed to fit Kathmandu | §5 |

---

## 7 · The procedure is mandatory even where the answer is a judgment

The rule that makes the rest of this file checkable:

> **Where a decision is a judgment call, the judgment is still required to leave a written trace.**

A short `### How practitioners actually use it` is allowed. A short one with no sentence saying
*why* it is short is not — because from the outside, "the search was genuinely thin and I said so"
and "I did not look" produce the same page.

The trace is one clause, not a paragraph:

- *"Thin — I found three threads, all from the same forum, and none at a stated scale."*
- *"Short because the brief marks this `supporting` / `skim`."*
- *"`[UNVERIFIED: the book attributes this to a 2012 McKinsey report; I could not find it]`"*
- *"`[ASSUMPTION: he has discretionary control over evenings. If not, the action changes.]`"*

**"It was a judgment call" is not a defence if the judgment was never written down.** That sentence
is the whole of this section, and it is the difference between a standard and a preference.
