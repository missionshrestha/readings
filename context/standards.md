# STANDARDS — what "good" means on a chapter page and a book page

The content quality bar. **`md-spec.md` owns syntax, `chapter-spine.md` owns the chapter's structure,
`book-spec.md` owns the brief and the book page's structure, `source-rules.md` owns citations — this
file owns everything else: who is being written for, how clearly, in what register, how deep, and
the specific ways generated prose about self-help goes wrong.** Where they touch, the more specific
file wins.

**Read this every time a chapter or a book page is generated.** A file that is consulted only when
something is missing has failed the every-time test and belongs somewhere else.

---

## 1 · Who is reading

**One person, and everything here comes from him directly.** `context/reader.md` is the full record,
maintained under one rule: *never write a cell you did not read in a file or hear from him this
session.* The facts a page depends on:

| | |
|---|---|
| **What he is here for** | *"I am someone who want to continously learn and grow, in various aspects of life like health, wealth, career, relationships, social, spiritual and other aspects of life."* — his words, 2026-08-31 |
| **Clarity** | *"Write all output/reading content in a clear, understandable, non-ambiguous way. Avoid being short, imprecise, confusing, unclear, or misleading. Expand and add more detail where needed — length should not be a concern; user understanding is the priority."* — his instruction, 2026-09-14. **§2b below is the whole standard** |
| **Length** | **There is no budget.** *"if a chapter is 10 hour or unlimited long, you do it… Nothing happens if i don't finish a chapter."* §3 below |
| **The transfer question** | **Additive, never subtractive.** *"you don't remove, alter the things that author wanted to say for original intent, you can give extra instead"* |
| **Prior reading** | **None of the 293 books has been read.** Every book is a first book; no chapter may assume a re-read |
| **The pages are public, and he means to share them** | *"Primary goal: self-learning and growth. Secondary goal: Google ranking, ads, monetization, visitors, and personal branding."* — 2026-09-14, `reader.md` §10. **This changes who a page is FOR by nothing.** It is written for him. A page clear enough for him is, as a side effect, clear enough for anyone who finds it; a page written for an audience has already started performing |

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

His unfinished sentence about actions — *"Only put things that earns"* — is no longer a gap: he
confirmed *earns its place* on 2026-09-14, and `chapter-spine.md` §6c holds the four tests.

Mark any of these as `[ASSUMPTION: …]` if a page needs it. **An empty cell is a known gap; a guessed
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
9. **A "real-life incident" is a claim, and it needs a source like any other.** §2b asks for real
   practices and incidents wherever they help. A plausible story about a company or a person with
   no source row is an invented citation wearing a narrative. If it cannot be sourced, write it as
   a labelled hypothetical — *"Suppose a team…"* — or leave it out.
10. **A number in a chart is a claim.** Every plotted value appears in `## Sources`, or the chart's
    own title says the numbers are illustrative. `source-rules.md` §3b.
11. **A count of readers is a claim.** "Most of the 140 opinions I read" must be 140 opinions
    actually read. `source-rules.md` §1b.

---

## 2b · Clarity — his standard for every sentence

> *"Write all output/reading content in a clear, understandable, non-ambiguous way. Avoid being
> short, imprecise, confusing, unclear, or misleading. Expand and add more detail where needed —
> length should not be a concern; user understanding is the priority."*
>
> *"Don't write overly complex sentences. Aim for optimal simplicity: not so complex that normal
> people can't understand the wording or meaning, but also not oversimplified to the point where
> meaning is lost. Keep the original meaning intact, expressed in a simpler, clearer, easier way
> wherever possible. The user must be able to interpret and understand every sentence produced."*
>
> *"Give examples, analogies, real-life practices/incidents, and cite research wherever relevant —
> or wherever concepts are difficult or confusing."*
>
> — his instructions, 2026-09-14, written after reading the sample book. `reader.md` §10.

**This section and §2 are two halves of one job, and neither may be traded for the other.** A
correct sentence he cannot understand has taught him nothing. A clear sentence that is wrong has
taught him something false. It applies to **every** page he reads — chapter, book page, dialogue
record, action card text, diagram caption.

**Why it had to be written down.** The sample chapters he read were correct in register and too
compressed to follow: terms used before they were explained, claims stated with no example beside
them, and notes where sentences should have been. Every one of those reads as *concise* to the
writer and as *unclear* to the reader, which is why it survived review.

### a · Plain first, then precise

| Rule | Write | Not |
|---|---|---|
| **Complete sentences, not notes** | "When you switch from one task to another, part of your attention stays on the first task. Sophie Leroy (2009) called this *attention residue*." | "Attention residue → next task worse." Arrows, slashes and dropped articles are note-taking, not explanation. Tables and diagram labels are the only exemption, and even they must be readable alone |
| **One main idea per sentence** | Two short sentences joined by a full stop | A 50-word sentence with three clauses and a parenthesis. **Over roughly 35 words is a tell, not a limit** — a list inside a sentence is fine |
| **Define a term the first time it appears on the page** | "Deliberate practice — practice designed to push just past what you can already do, with fast feedback — …" | Using "deliberate practice" and defining it two sections later. **Sections are read days apart**, so a term that returns in a later section gets a short reminder the first time it does |
| **Name the thing** | "The shutdown ritual makes this work because…" | "This works because…" when *this* is three sentences back |
| **The claim, then its strength, then why** | "Newport argues that depth is becoming rare. The evidence for *rare* is thin — mostly observation — but the mechanism he gives is testable: …" | Opening with the qualification, so the reader has to hold the hedge before they know what is being hedged |
| **Concrete nouns and verbs** | "Meetings cut the afternoon into pieces too short to start hard work." | "The fragmentation of temporal resources impedes cognitively demanding output." |
| **Keep precise words, and define them** | "The result did not *replicate* — when other labs ran the same experiment, they did not get the same effect." | Swapping "did not replicate" for "was questioned". Simpler, and it now says less than the truth |

**The rule that governs all seven: keep the meaning intact.** Simplifying may change the words. It
may never change the claim's **strength**, its **scope**, or its **conditions**. The test is one
question: *would the author sign the simpler sentence?* If the plain version says more or less than
the original, it is wrong however readable it is — and this is the same rule as *add, never
subtract* (§5), arrived at from the language side.

### b · Examples, analogies, incidents and research — wherever a concept is difficult

| Kind | Owed where | Rule |
|---|---|---|
| **Example** | Every claim that is not self-evident, and every rule | A concrete case: who, what, what happened. **At least one per load-bearing claim** — this is the mechanical tell for §2b being skipped |
| **Worked case** | Every mechanism | Walk through one situation step by step, so the *because* is visible. `### The teaching pass` owes at least one |
| **Analogy** | Wherever an idea is abstract | Say it is an analogy, and **say where it breaks** — *"like a muscle, except that…"*. An analogy with no stated limit is read as an identity |
| **Real-life practice or incident** | Wherever the claim is about what people actually do | **Real, and sourced.** A named person, organisation or study, with a row in `## Sources`. §2 rule 9 |
| **Hypothetical** | Wherever no real case exists or one would distract | **Labelled** — *"Suppose a team of five…"* — and about a third person. **Never a scenario that asks him to picture his own success** (§3, the banned list). A hypothetical about someone else's failure is an example; a picture of his own finish line is the technique with the strongest negative evidence in this repository |
| **Research** | Wherever a claim is empirical | `source-rules.md`: who, when, what kind of study, and a strength word in the sentence |

**The claim comes first and the example serves it.** An example with no stated claim above it is an
anecdote, and anecdotes are what the genre already over-supplies.

### c · Length is never a concern; understanding is

His words, and they settle a conflict that used to live in the prompts — an earlier `P0` told the
model *"I read fast"*, and `P3` called three sentences a normal pre-context. **Both were removed on
2026-09-14.**

- **Never shorten by compressing.** Remove padding; never remove explanation.
- **Padding** is a sentence whose removal costs him no understanding: preamble, recap, "as we saw
  earlier", restating the heading, reassurance, a second example that teaches nothing the first did
  not. It is still banned (§3).
- **A section is too short** when a term in it is undefined, a claim in it has no example, a step in
  a mechanism is skipped, or he would have to look something up to follow it.
- **Two sections are short on purpose, and stay clear.** `## Core message` is one sentence and
  `## The 30-second version` is a lift summary. Short by design is not compressed: complete
  sentences, no undefined term, no shorthand.

### d · The self-check — run it on every section before it is pasted

1. **Could he read any single sentence here a week from now, alone, and say what it means?**
2. **Is there a word he would have to look up?** Define it, or replace it.
3. **Does every difficult idea have an example, a worked case or an analogy next to it?**
4. **Did simplifying change what the author claimed?** If so, restore the claim and simplify the
   words instead.

---

## 3 · Voice

**Calm authority.** Someone who has actually read the book, explaining it to someone they respect,
with no audience watching.

**Write:** direct · concrete — name the chapter, the number, the study, the objection · honest about
what the argument costs, because a description with no cost in it is one you have not finished
reading · plain language before jargon, defined on first use (§2b) · second person for instructions,
third for mechanism.

**Never write:**

| Banned | Why |
|---|---|
| **Anything that asks him to picture the outcome** — "imagine how it will feel", "see yourself having done it" | **The strongest negative finding in the evidence base.** Oettingen & Mayer: visualising the outcome predicts LOWER attainment. Naming the obstacle is the half with evidence behind it. Nothing on this site may contradict this |
| Motivational language — "you've got this", "small wins compound" | He did not ask to be encouraged |
| Jacket copy — "seminal", "must-read", "life-changing", "the definitive book on" | Unfalsifiable, and it is the register of the thing being read rather than of reading it |
| Manufactured consensus — "many readers find", "reviewers often note" | Sub-section 5 exists to report what was actually found, **with the count and the venues**. `chapter-spine.md` §3b |
| Hedging stacks — "might possibly", "generally tends to" | That is what uncertainty looks like when it refuses to be specific. Say what you know and what you do not, separately |
| Filler openers — "it's important to note that" | Zero information. Delete it; the next sentence is the content |
| "Simply", "just", "obviously", "of course" | If it were obvious he would not have opened the chapter |
| Rhetorical questions as openers — "so what is deep work?" | Say the thing |
| Restating the heading as the first sentence | Wastes the highest-value line on the page |
| Undefined "we" | Say who. The author, the critics and the reader are different actors |
| Notes instead of sentences — arrows, slash-lists, dropped articles | §2b a. It reads as concise to the writer and as a puzzle to the reader |
| Emoji in a heading | Breaks anchors, pollutes the search index |

**Length falls out of the material and the explanation, and is never a target.** There is no word
budget (§1) and brevity is not a virtue (§2b c). That cuts both ways: it is permission for a chapter
that needs 12,000 words, and no licence for padding.

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
advisory. Three rules govern its use:

1. **`gap` outranks the other two.** On `gap: execution`, a flawless teaching pass is the most
   expensive way this system can waste a week. `evidence/reading.md:122` calls the knowledge-vs-
   execution distinction *"the single distinction [that] predicts most of the disappointment people
   report with the genre"* — the books that "didn't work" were aimed at execution gaps and read as
   though they solved knowledge gaps. On an execution gap the weight moves to `## Actions`, the
   obstacle, and the day-30 review.
2. **A sub-section is never dropped, only given less breadth.** A missing sub-section is a
   structural defect that `/validate` and the pre-flight both catch.
3. **Depth decides breadth, never clarity.** Added 2026-09-14. A `skim` sub-section may cover fewer
   angles and carry fewer examples; it may **not** leave a term undefined, a claim without an
   example, or a step of a mechanism out. `## Key points` and `## The explanation layer` have **no
   length limit at all** — *"they should be as long and as detailed as each chapter demands or
   requires"* — so "short because skim" is a statement about scope, never permission to compress.

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
that reads well to the person who wrote it.

| Anti-pattern | Looks like | Rule |
|---|---|---|
| **Fluency without substance** | Reads beautifully, survives no closed-book test | `## Recall` is the test, and it is written before the explanation layer for exactly this reason |
| **Compression** | Correct, dense, and impossible to follow without the book open: terms before definitions, notes instead of sentences | §2b. *"The user must be able to interpret and understand every sentence produced"* |
| **The unexplained abstraction** | A load-bearing claim with no example, worked case or analogy anywhere near it | §2b b. At least one per load-bearing claim |
| **Simplified into a different claim** | Readable, and the author would not sign it — the strength, scope or conditions moved | §2b a, the rule that governs all seven |
| **The book report** | The chapter summarised a fourth time under a new heading | Every section past `## Key points` must ARGUE with the chapter, apply it, or check it. None of them may restate it |
| **Manufactured consensus** | "Many readers report…" with no venue | Name where you looked. **Thin is a finding, not a failure** |
| **Three reviewers as "readers"** | Four quoted reviews presented as what readers think | `chapter-spine.md` §3b: clusters, counts, venues, and the sample's limits stated. *"not just 3-4 specific users, since that sample size won't reflect reality"* |
| **The invented incident** | "One company that tried this saw…" with no name and no source | §2 rule 9. Real and sourced, or a labelled hypothetical |
| **The chart with borrowed authority** | A tidy bar chart of numbers nobody can trace | §2 rule 10. Sourced, or titled illustrative |
| **The strawman critic** | Every criticism rebutted in the same paragraph | Steelman. A critic section that makes the book look good has not earned its place |
| **Citation theatre** | Links that resolve but do not support the claim | Cite what you actually read. `source-rules.md` |
| **Visualise-success** | "Picture yourself at the end of the month" | **Banned outright.** §3 |
| **Advice inflation** | An illustrative chapter written as though it were load-bearing | `weightInArgument`. §4 |
| **Solving the wrong gap** | A deep teaching pass on a chapter he already understands and does not do | `gap: execution`. §4 rule 1 |
| **Template filling** | A section present because the spine had it | Sections are earned. An empty `## Dialogue` is worse than none, because it claims an argument happened |
| **The one-exchange dialogue** | The record keeps the first question and the last position and drops the argument in between | `chapter-spine.md` §6. *"the middle portion of a dialogue can be longer and more involved"* |
| **Filler actions** | Two thin actions invented to reach the minimum | `chapter-spine.md` §6c. Every action is anchored to a named claim and earns its place |
| **The uncommitted ledger** | Ten plausible actions, none of them his | Two to ten per chapter are extracted; **one** is committed per book, and he writes it |
| **Silent transfer surgery** | The claim quietly narrowed to fit Kathmandu | §5 |
| **The biography that explains the book away** | "He wrote this because of his own anxiety, so the advice is really about him" | §8. Circumstances shape a claim; they do not refute it |

---

## 7 · The procedure is mandatory even where the answer is a judgment

The rule that makes the rest of this file checkable:

> **Where a decision is a judgment call, the judgment is still required to leave a written trace.**

A narrow `### How practitioners actually use it` is allowed. A narrow one with no sentence saying
*why* it is narrow is not — because from the outside, "the search was genuinely thin and I said so"
and "I did not look" produce the same page.

The trace is one clause, not a paragraph:

- *"Thin — I read 22 opinions across two forums, below the floor of 30, and none at a stated scale."*
- *"Narrower because the brief marks this `supporting` / `skim`."*
- *"`[UNVERIFIED: the book attributes this to a 2012 McKinsey report; I could not find it]`"*
- *"`[ASSUMPTION: he has discretionary control over evenings. If not, the action changes.]`"*

**"It was a judgment call" is not a defence if the judgment was never written down.** That sentence
is the whole of this section, and it is the difference between a standard and a preference.

---

## 8 · The book page — author context, and the book then and now

**Added 2026-09-14 on his instruction.** `book-spec.md` §6 owns the structure; these are the
standards the two new sections are held to. Both obey §2 and §2b like any chapter.

### `## Author context`

> *"A more detailed section on the author's context: the time and surroundings they were born and
> raised in, where they worked, and the experiences that led the author to think the way they do —
> anything that could have influenced what the author says in the book/chapters."*

| Owes | Must not |
|---|---|
| **Biography, in detail, because he asked for it** — when and where they were born and grew up, their family and schooling where it is documented, where they worked and what they did there, what was happening in their field and in the world when they wrote | **Guess at inner life.** "His father's absence made him distrust institutions" needs a source in which the author or a biographer says so. Otherwise it is interpretation and is labelled as interpretation, or it is cut |
| **The experiences that plausibly shaped the argument**, each tied to a feature of the book it helps explain | **Explain the argument away.** Where an author stood tells you why a claim looks the way it does. It never tells you the claim is wrong — that is `## Context then vs. context today`'s job, and it needs evidence |
| **Every fact sourced** — the author's own site, interviews and memoirs are tier A for what they say about themselves; an encyclopaedia or a profile is tier B | Rely on the book's own jacket copy for facts about its author |

The chapter-level `### Where the author was standing` no longer repeats the biography. It says only
what about the author bears on **this chapter's** claim, and links up to this section.

### `## Context then vs. context today`

> *"The book's content was written in a particular time and may not be fully relevant today. This
> section should surface: any changes the author themselves made later, counter-research from other
> scholars, new/different circumstances, science-based counter-arguments, shifts in general
> perception, or anything — research backing, similar findings from other scholars, or other rational
> points — that supports or argues against the book's content/author, including things that weren't
> relevant when the book was written but are relevant now."*

**The rule that makes it trustworthy is symmetry.** It reports what has **supported** the book since
publication with the same effort and the same sourcing as what has **undermined** it. A section that
only finds problems is as manufactured as one that only finds praise.

- **Date everything.** "Since publication" is meaningless without the publication date, which is why
  `book.json` now carries `published` and `editions` and the page displays both.
- **Say which kind of change each point is**: the author changed their mind · the evidence changed ·
  the world changed · the audience's perception changed. They have different consequences, and a
  paragraph that mixes them lets a change in fashion read as a change in evidence.
- **The standing replication list in `source-rules.md` §3 is checked here first**, once per book, so
  every chapter inherits the result rather than rediscovering it.
- **It never subtracts from the chapters.** A claim that has aged badly stays on the chapter page in
  the author's words, with the change added beside it. §5.
