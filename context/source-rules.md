# SOURCE-RULES — what may support what

`## Sources` is the twelfth heading in `chapter-spine.md`, and its stated failure is *"a claim in
the body appears nowhere in it."* That rule says a citation must **exist**. This file says what a
citation must **be**, because the two are different defects and only the first is visible.

**The problem this exists for.** Almost every chapter of a non-fiction book rests on a study, and
almost every one of those studies is described in the book by an author with a thesis to sell. An
explanation layer that repeats the book's description of its own evidence has verified nothing —
it has laundered a claim through a second voice, which makes it *read* as corroborated. That is
the single most likely way this site ends up teaching something false, confidently.

**It governs the book page too.** Since 2026-09-14 the book page carries `## Author context`,
`## Context then vs. context today` and its own `## Sources` (`book-spec.md` §6). Every rule below
applies there exactly as it does on a chapter.

---

## 1 · The four tiers

| Tier | What it is | May support |
|---|---|---|
| **A — Primary** | The study, the meta-analysis, the pre-registration, the dataset, the original text | Anything |
| **B — Independent secondary** | A replication, a review by someone with no stake, a critic, an encyclopaedia entry | Anything, if the primary is named in it |
| **C — A source reporting its own claim** | What this book says about its own evidence — **and any summary quoted for what it says**, such as an AI-generated summary of reader opinion (§1b) | **Only what that source claims.** Never what is true |
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

## 1b · Reader opinion is evidence about RECEPTION, never about truth

**Added 2026-09-14**, with the overhaul of `### What real readers say` (`chapter-spine.md` §3b).

A Reddit thread, a Goodreads review or a Hacker News comment is **primary evidence of what that
reader thought**. It is evidence of nothing else. So:

| A reader source may support | It may never support |
|---|---|
| "In the 3 r/productivity threads I read (180 comments), the largest group of commenters — roughly 40 of them — said the shutdown ritual was the part they kept." | "The shutdown ritual works." |
| "Several Goodreads reviewers who described themselves as parents said the scheduling advice assumed evenings they did not have." | "The advice does not work for parents." |

**Counts are claims.** *"Most readers"* needs a denominator, and the denominator must be opinions
**actually read in this session** — never an estimate of how many exist, and never the size of a
thread that was only skimmed. Write *"n of N read"*, not a percentage of an unknown population.

**An AI-generated summary of reader opinion is tier C.** Reddit Answers (reddit.com/answers) and
similar features summarise many posts at once, which is exactly what he asked for — and what they
summarise, how they sampled and what they left out are not visible. So:

- **Quote it as what the summary says**: the query, the date, the tool, and the summary text.
  *"Reddit Answers, asked 'Is Deep Work worth reading' on 2026-09-14, summarised that…"*
- **Treat it as a lead, not a finding.** The clusters in `### What real readers say` are built from
  threads actually read. Where the summary and the threads disagree, say so.
- **If it cannot be retrieved, say so plainly** and give him the query and the links instead —
  `chapter-spine.md` §3b step 4. Never paraphrase what a summary would probably have said.

**In `## Sources`**, a reader source is a row like any other, with its tier written as **`B ·
reception`**, and an AI summary as **`C · AI summary`**.

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

## 2b · Biography and dates are facts too

**Added 2026-09-14**, because `## Author context` and the release date are now on every book page.

| Fact | Acceptable source | Tier |
|---|---|---|
| **When a book was first published, and by whom** | The publisher's page, a national library or WorldCat record, the copyright page of the edition in hand | A |
| **A major revised edition** | The publisher's page for that edition, or the author announcing it | A |
| **What changed in a revision** | The new edition's own preface or foreword, or the author's own account | A for what the author says changed |
| **Where and when the author was born, schooled and worked** | The author's own site, memoir or interview (for what they say about themselves); an encyclopaedia, obituary or published profile | A self-reported · B independent |
| **What shaped their thinking** | Only where the author or a biographer **says so**. Anything else is interpretation, and is written as interpretation | A / B, or labelled |

**A date nobody can check is a date that drifts.** `book.json` `editions[]` carries a `source` for
each entry, and `/validate` reports an entry without one.

**Major changes only.** A new cover, a paperback release or a corrected typo is not a version. A
revised edition with new or removed chapters, a new afterword that changes the argument, or a
substantially updated evidence base is.

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

**Plain language does not remove the word.** §2b of `standards.md` asks for simpler sentences, and a
strength word is exactly the kind of precise term it says to keep and define: *"did not replicate —
when other labs ran the same experiment, they did not get the same result."*

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

## 3b · A chart is a claim

**Added 2026-09-14**, because Mermaid is now used for bar charts, line charts, pie charts and the rest
(`md-spec.md` §6). A number drawn as a bar reads as more certain than the same number in a sentence,
and it carries no strength word.

- **Every plotted value appears in `## Sources`**, with the tier of the source it came from. A chart
  built from three studies has three rows.
- **Or the chart's own title says the numbers are illustrative** — *"Illustrative, not data: how
  attention residue would compound across a fragmented day"*. An illustrative chart is allowed; an
  unlabelled one is tier D drawn in colour.
- **The sentence before the chart says what it shows and how strong the evidence is**, because the
  chart itself cannot carry a strength word.
- **Never round toward the argument, never truncate an axis to exaggerate a difference, and never
  drop the error bars or confidence interval** where the source reports one — say it in the caption
  if the chart type cannot draw it.

---

## 4 · The book page is where this lands at book level

`book.json` carries `outsideView` as a three-line digest, and the book page carries the long form in
`## Context then vs. context today` (`book-spec.md` §6). Both are filled **before a single chapter is
generated**, and every chapter inherits them.

```
outsideView: {
  replication: "what in this book has failed to replicate",
  critics:     "who disagrees, and their strongest point — not their weakest",
  agedBadly:   "what was true in <year> and is not now"
}
```

**"Their strongest point, not their weakest"** is the whole value of the field. A steelman you
cannot answer is the most useful thing a book can give you; a strawman is flattery with extra
steps. **And the book page adds the other side**, which the digest never had: what has *supported*
the book since, with the same effort (`standards.md` §8).

`kind: lifelong` is exempt from the replication rows. A novel makes no empirical claim, so there is
nothing to tier — but its book page still carries `## Author context`, and its dates.

### The stopping rule — a number, not a feeling

This research is unbounded by nature: there is always one more review to read. Left without a floor
and a ceiling it becomes either two minutes of skimming or an afternoon. Both are failures, and only
the first is obvious.

**Stop when all five of these are true, and not before:**

| | Floor |
|---|---|
| 1 | **At least three independent sources consulted**, none of them the book, its publisher, or the author's own site |
| 2 | **At least one is a critic** — someone arguing the book is wrong, not someone noting it is imperfect |
| 3 | **At least one is supporting evidence found independently** — research or a scholar reaching a similar conclusion by a different route — or a sentence saying you looked for it and found none |
| 4 | **Every claim on the standing list in §3 that the book makes has been looked up**, and carries its qualifier |
| 5 | **You can state the strongest objection in a sentence you would not be embarrassed to show its author** |

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
- **Invent a real-life incident, a reader quote, a reader count or a chart value.** Each is a
  citation in a different costume (§1b, §3b, `standards.md` §2).

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

## 6 · Pre-flight — six questions before `## Sources` is done

1. **Does every empirical claim in the body appear here, with a name and a year?**
2. **Is anything tier C written as though it were tier A?** — the sentence test in §1.
3. **Is there a claim on the replication list in §3 with no qualifier next to it?**
4. **Does every real-life incident, reader quote and reader count have a row?** §1b.
5. **Does every chart either have a row per plotted value or say "illustrative" in its title?** §3b.
6. **On a book page: does every date and every biographical fact have a row?** §2b.

Any "no" is a defect in the page, not a note for later.
