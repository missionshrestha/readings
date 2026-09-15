# MD-SPEC — the complete authoring contract

**Handed verbatim to whichever tool writes a chapter or a book page**, alongside `chapter-spine.md`
and `standards.md`. It is the only reference. If a component is not here it does not exist, and
using it fails the build.

> **Why `.mdx` and stock components.** Stock Starlight components are **publicly documented** — any
> model already knows `<Aside>` and `<CardGrid>`. A bespoke directive vocabulary is a private
> language that must be re-taught in every Project, forever. The four that must be bespoke are
> bespoke either way.

---

## 1 · Frontmatter

```yaml
---
title: "Ch 2 · Deep work is rare"
description: "Why organisations destroy concentration — and why that is leverage."
sidebar:
  order: 2
book: deep-work
author: "Cal Newport"
domain: self-command
cluster: attention-dopamine-and-digital-discipline
part: the-idea
chapter: 2
kind: read
tier: core
weight: M
gap: execution
clarified: false
status: complete
verdict: deep-dive
rating: { usefulness: 4, novelty: 3, actionability: 5 }
read: 2026-09-14
private: false
actions:
  - id: dw-02-timeblock
    if: "it is 21:30 on a workday"
    then: "I write tomorrow's three blocks in the notebook"
    trigger: "21:30, desk, before the phone goes on charge"
    obstacle: "I tell myself I will remember it in the morning"
    tier: now
    impact: "probably marginal — I already plan loosely"
    committed: true
    started: 2026-09-14
    day30: not-yet
  - id: dw-02-single-study
    if: "a claim in this book rests on a single study"
    then: "I look up whether it replicated before I repeat it to anyone"
    trigger: "the moment I quote the book in conversation or in a post"
    tier: reference
    impact: "small, and it costs two minutes each time"
    committed: false
    day30: not-yet
---
```

| Field | Rule |
|---|---|
| `title` | **The only field Starlight requires.** Becomes the H1 — never write a `#` in the body. Scaffolded from `book.json` as `Ch N · <title>`, or `Introduction · <title>` for a section the book prints without a number — never retyped |
| `chapter` | The book's own printed chapter number, so `Ch 1` is the book's Chapter 1. **Absent on a labelled chapter** |
| `label` | Only on a section the book prints without a number — `Introduction`, `Conclusion`, `Prologue`… From `book.json`'s `label` (`book-spec.md` §2). `sidebar.order` still places it in the book |
| `domain` `cluster` `book` | **Must match the directory.** The build refuses otherwise — the path is the truth |
| `clarified` | `false` means `## The clarified chapter` is **absent**, not empty |
| `gap` | `knowledge` or `execution`. Comes from `book.json`, and it changes what the chapter owes |
| `private` | Excludes the page from `build`. **Required, explicitly, in a sensitive domain** |
| `status` | `stub` → `reading` → `generated` → `recalled` → `explained` → `complete`, plus `skipped` and `dropped`. Set by hand. **Eight values, and `stub` is one of them** — see below |
| `read` | When it was actually read, not generated. Renders as "Last updated" |
| `actions[]` | See §4. **Two to ten on every chapter.** `obstacle` is required whenever `committed: true` |

**No release date in a chapter's frontmatter, and none in the book page's either.** The dates live
in `book.json` (`published`, `editions`) and the page chrome shows them on every page of the book
(`book-spec.md` §6). A second copy would be a second place for them to disagree.

### `status` — all eight values, and why `stub` was missing from this list

| Value | Means | Set by |
|---|---|---|
| `stub` | The scaffolder wrote the file; nothing has been read | `scripts/new-chapters.mjs` |
| `reading` | READ I is under way | you |
| `generated` | The chapter has been clarified or the original read; nothing recalled yet | you |
| `recalled` | `## Recall` is written, closed-book | you |
| `explained` | `P4` has run and the explanation layer is filled | you |
| `complete` | Everything, including `## Open questions` | you |
| `skipped` | Deliberately not read. The brief said so | you |
| `dropped` | Started and abandoned. **Recorded, not deleted** | you |

**`stub` was emitted by the scaffolder and declared by no spec until 2026-08-31.**
`scripts/new-chapters.mjs:346` writes it and `scripts/audit.mjs:159` knows it, but this file listed
five values and `reconciliation.md` §14 listed seven. The code was right and both contracts were
stale — and `reconciliation.md` is one of the files a web-chat Project uploads, so the stale copy
was the one being read. It is a small drift with a specific cost: `audit.mjs` reports any status it
does not recognise as *"not a known value. It counts as not-complete everywhere, silently"*, so a
spec that under-declares teaches you to hand-write a value the tooling then quietly discounts.

**No field is an enum and no number is range-checked.** Enforcing `status` would turn a typo in a
pasted chapter into a build failure, which is the wrong trade for content that arrives by paste. The
cost is real and stated: `complete`, `Complete` and `done` are three different values, and only
`node scripts/audit.mjs` will ever say so. **The same trade governs the action count**: fewer than
two or more than ten is reported by `/validate` and `audit.mjs`, and never refuses a build.

### How a bad field degrades — the four cases, verified against zod@4.5.4

**Every added field is optional in the schema.** Content arrives from a session that cannot see this
filesystem; a missing or misspelled field must **degrade, never break the build.**

| What you paste | What happens | Why |
|---|---|---|
| `chaptr: 2` — a misspelled KEY | **Dropped silently.** The field is absent | zod objects are non-strict by default. Nothing is checked, so nothing complains |
| `chapter: "two"` — a bad VALUE | **Dropped silently.** The field is absent | `.catch(undefined)` on every field. WITHOUT it this fails the parse and takes the build with it — a bad value does NOT degrade on its own |
| `title:` missing | **The build fails, loudly.** Starlight requires it | The only required field, and the only one whose absence is a hard error |
| `private:` missing in a sensitive domain | **The build is REFUSED by Control 2** | A default is not a decision. `scripts/guards.mjs` |

**The trade is stated rather than hidden:** a wrong value disappears quietly, which is the wrong
default for authored source and the right one for pasted content. `scripts/audit.mjs` is the file
that reports what the schema deliberately tolerates, and it is the only one that will.

---

## 2 · The import block — two lines, verbatim, never change

```mdx
import { Aside, Badge, Card, CardGrid, Code, LinkCard, Steps, TabItem, Tabs } from '@astrojs/starlight/components';
import { Recall, Actions, Passage, Margin } from '@components';
```

`@components` is a **path alias** to `src/components/index.ts`. That is what keeps this block
constant regardless of how deep the file sits — a relative `../../../../` chain is a guess a chat
session has no way to verify.

---

## 3 · The four custom components

Everything else composes from stock. These four have no stock equivalent.

### `<Recall>` — required, exactly one, BEFORE the explanation layer

```mdx
<Recall minutes={10}>

Book shut. What the chapter argued, in my own words.

Then: the questions I could not answer.

</Recall>
```

**The AI never writes inside this.** It is the closed-book section, and it is the single largest
thing the drafted pipeline was missing.

### `<Actions />` — required, exactly one, no children

```mdx
<Actions />
```

Reads the frontmatter. Actions are **data**, not prose — writing them twice guarantees the two
disagree, and the ledger is computed from the data. **It renders a visible note when the chapter
carries fewer than two actions or more than ten.**

### `<Passage>` — optional

```mdx
<Passage at="p. 41">

The metric of busyness became a proxy for productivity precisely because knowledge work
resisted measurement.

</Passage>
```

A quotation from the **original book**. Everything else on the page is generated or written by the
reader; this is the only element whose words came out of the book, and it looks different because
its provenance is different.

### `<Margin>` — optional

```mdx
<Margin label="Where this stops">

The scheduling advice assumes the interruptions are yours to refuse.

</Margin>
```

Floats into the outer margin above 1200px, collapses inline below. Never load-bearing: anything
needed to follow the argument belongs in the column.

### Three things that look like components and are not

**Added 2026-09-14.** Each is **site chrome**: it works on every page automatically, there is nothing
to import, and nothing in a paste can switch it on or off.

| Feature | What it does | What a paste owes it |
|---|---|---|
| **Expand on every diagram** | A control on each Mermaid diagram opens it to fill the screen, with zoom; Close or Escape returns it to the column | Nothing. Draw the diagram to read inside the column anyway — §6 |
| **Dialogue turns** | Under `### How the exchange went`, each paragraph beginning `**Me:**` or `**AI:**` is shown as one side of a conversation | The labels, exactly. §5c |
| **Comments** | While reading on `npm run dev` he selects any passage and writes a comment; the built site shows them read-only, anchored to the passage, with a list behind one button | **Nothing, ever.** Comments are never pasted and never generated. §5d |

---

## 4 · Actions

One YAML object per action. **Two to ten per chapter; one committed per book.**

> *"A list of action items for each chapter — minimum 2, maximum 10."* — his instruction, 2026-09-14.
> `chapter-spine.md` §6c has the four tests an action must pass to earn its place, and what to do at
> either edge.

| Field | Rule |
|---|---|
| `id` | **Permanent.** The review key, and rendered visibly. Renaming it silently resets that action's schedule. Unique across the whole book |
| `if` / `then` | The rule. One line, observable. *Could someone watching tell whether you did it?* |
| `trigger` | A concrete situation — a time, a place, a person. **Never a feeling** |
| `obstacle` | The **inner** obstacle. **Required when `committed: true`** |
| `tier` | `now` · `next` · `later` · `reference`. `reference` is a rule applied when a situation arises, and it is how a conceptual chapter meets the floor honestly |
| `impact` | Honest, **including "probably marginal"** |
| `committed` | True only when **he** wrote the sentence. The AI never writes one |
| `day30` | `not-yet` · `running` · `adapted` · `dropped`. Filled in honestly, failures included |

**At most one action across the whole book carries `committed: true` with `tier: now`.**

**Every action is anchored to a claim in its chapter.** `P6` names the claim for each candidate; an
action that follows from no claim was invented, and a filler action written to reach two is the
defect the floor makes most likely.

**Nothing anywhere asks him to picture the outcome.** Positive fantasy predicts worse attainment —
the strongest negative finding in the evidence base.

---

## 5 · Stock components — the closed list, with a working example of each

Nothing outside this list exists. It is a **ceiling, not a starting point**, and every one of these
is rendered on `/elements/` so the list can be checked against pixels rather than against memory.

**Copy these. Do not paraphrase the shape.** The blank lines inside a component are load-bearing:
without them the Markdown inside is not parsed as Markdown, and it renders — just wrongly. That is
the whole failure mode. Nothing warns.

### `<Aside>` — a callout. Four types

The directive form and the component form are the same thing; use whichever reads better in the
sentence you are writing. `chapter-spine.md` mandates the directive form for `## Core message`.

```mdx
:::note[Core message]
Concentration is a skill that has become rare and therefore valuable.
:::

:::caution[Where this stops]
The scheduling advice assumes the interruptions are yours to refuse.
:::

<Aside type="danger" title="What I cut, and why">

Dropped the third airline anecdote — it makes the same point as the first two and adds
no number.

</Aside>
```

`type`: `note` · `tip` · `caution` · `danger`. **No `success` type exists**, despite
`--sl-hue-green` being set — that variable is for badges.

### `<Tabs>` / `<TabItem>` — the same question, answered differently

```mdx
<Tabs syncKey="stance">
  <TabItem label="The book's version">

Four hours of uninterrupted work is the practical ceiling.

  </TabItem>
  <TabItem label="The critics' version">

The ceiling is a property of the job, not of attention.

  </TabItem>
  <TabItem label="The version to hold">

Treat four hours as the ceiling *for the kind of work you can schedule*.

  </TabItem>
</Tabs>
```

**Never for sequential steps.** Tabs hide everything but one panel; a procedure whose step 3 is
invisible while you read step 2 is a procedure nobody can follow. `syncKey` links tab groups across
the page so all three switch together.

### `<Steps>` — a sequential procedure

```mdx
<Steps>

1. Shut the book and close the page.

2. Write what the chapter argued, in your own words.

3. Only then open the explanation layer.

</Steps>
```

**Blank lines between the items are required.** Without them the list renders as one paragraph.

### `<Card>` / `<CardGrid>` — grouped boxes

```mdx
<CardGrid>
  <Card title="Green flags">

A number, a named study, an argument that survives its own objection.

  </Card>
  <Card title="Red flags">

"Studies show." A critic who loses every round. A practitioner section with no scale.

  </Card>
</CardGrid>
```

### `<LinkCard>` — a cross-link that carries its own description

```mdx
<LinkCard
  title="Dopamine Nation"
  href="/self-command/attention-dopamine-and-digital-discipline/dopamine-nation/"
  description="The same attention problem, argued from neurochemistry rather than from craft."
/>
```

**Root-absolute `href`, always.** Every valid path is in `src/generated/book-slugs.md`.

### `<Badge>` — a status chip

```mdx
Newport's own evidence for this is <Badge text="tier C" variant="caution" size="small" /> — the
book citing itself.
```

`variant`: `note` · `danger` · `success` · `caution` · `tip` · `default`. `size`: `small` ·
`medium` · `large`.

### `<Code>` — a code block built from a variable

```mdx
<Code code={snippet} lang="text" title="The rule, as written" />
```

Almost always the wrong tool here. A fenced block is simpler and does not need a variable to exist.

---

## 5b · What may nest inside what

Composition is where a first draft usually breaks, and the failures are not symmetrical.

| Outer | May contain | Must not contain |
|---|---|---|
| `<Aside>` | prose, lists, a table, `<Badge>`, a fenced code block | another `<Aside>`, `<Tabs>`, `<Steps>`, `<CardGrid>` |
| `<TabItem>` | prose, lists, `<Aside>`, `<Steps>`, a mermaid fence | another `<Tabs>` |
| `<Steps>` | **an ordered list, and nothing else at the top level.** Each item may contain prose, a fence, an `<Aside>` | a heading, a `<CardGrid>` |
| `<Card>` | prose, a list, a `<Badge>`, a short fence | a heading, `<CardGrid>` |
| `<CardGrid>` | `<Card>` and `<LinkCard>` only | prose between the cards |
| `<Recall>` | **your prose only** | any generated content, any component |
| `<Passage>` | the quotation, and nothing else | commentary — put that after the closing tag |
| `<Margin>` | one or two sentences | anything the argument needs. It is optional reading by construction |
| `<Actions />` | **nothing. It is self-closing** | children of any kind |

**A heading inside any component is always wrong.** Headings are anchors, the twelve `##` are a
corpus-wide contract, and one nested inside a `<Card>` is invisible to every one of them.

---

## 5c · Writing a dialogue exchange

`## Dialogue` has **five** `###` since 2026-09-14 (`chapter-spine.md` §6). The first three are prose.
**`### How the exchange went` is a sequence of turns, and the label is the syntax:**

```mdx
### How the exchange went

**Me:** I think the shutdown ritual only works if the day already has an end. Mine often does not.

**AI:** That objection is fair to the chapter's example, which assumes a fixed finishing time. The
mechanism it names is different, though: it is about closing open loops, not about ending the day.
For example, a nurse finishing a night shift at 07:00 has the same open loops as an office worker at
17:30 …

- the first point, kept in full
- the second point, kept in full

**Me:** Then the real test is whether writing the loops down works at 23:00 as well as at 17:30.

**AI (as sceptic):** …
```

| Rule | Because |
|---|---|
| **A turn starts with a paragraph whose first words are `**Me:**`, `**AI:**` or `**AI (as sceptic):**`** — bold, colon inside the bold, then a space | The page draws each turn as one side of a conversation from exactly these labels. Any other spelling renders as an ordinary bold word |
| **A paragraph, list or quote with no label belongs to the turn above it** | So a long turn can have several paragraphs and lists without repeating the label |
| **No heading between turns, no component around them** | A heading is an anchor, and a component would hide the turns from the styling |
| **Blank line between every paragraph and list** | The same rule as everywhere: without it, Markdown joins them |

Without JavaScript the turns still read correctly, as labelled paragraphs.

---

## 5d · Comments are not content

**Added 2026-09-14.** He comments on passages while he reads, on `npm run dev`. Those comments are:

- **stored beside the page**, as `<chapter-slug>.comments.json` (and `index.comments.json` for a book
  page), written only by the dev server — `scripts/comments-dev.mjs`;
- **never pasted, never edited by hand, and never generated.** They are in the prohibition zone with
  `## Recall` and `## Open questions`: **the AI never writes what only he can know**;
- **published by default**, read-only and anchored to the passage he selected, **unless he marks one
  local** — then it stays in the repository and is left out of every build. **On a page in
  `relationships-…`, `love-…` or `money-and-wealth` a new comment starts local** (his decision,
  2026-09-14): a note written mid-read there is most likely to be about a real person, so publishing
  one takes a deliberate untick;
- **never published from a `private: true` or `draft: true` page**, because those pages are not built.

**What a paste owes them: stable text.** A comment finds its passage by the words he selected. A
re-paste that rewords that passage **detaches** the comment — it is kept, and listed as detached with
its original quote, but it no longer points anywhere. So a correction to a chapter he has already
commented on changes as few words as the correction needs.

---

## 6 · Free from Markdown and the build

Headings and anchors · GFM tables, footnotes, task lists · lists · blockquotes · inline formatting ·
full-text search · four reading themes with a toggle · breadcrumbs · prev/next · build-time link
validation · "Last updated" from `read` · the book's release dates on every page of it · Expand on
every diagram · comments.

**Tables are Markdown tables.** He listed tables with the diagrams; a GFM table is the right tool for
anything tabular, and Mermaid does not draw them.

### Diagrams are Mermaid — used wherever they help

> *"the user wants Mermaid used to its full capacity wherever relevant/required — including tables,
> graphics, bar graphs, charts, pie charts, line graphs, histograms, mindmaps, etc."*
> — his instruction, 2026-09-14

In a ` ```mermaid ` fence, **in any section that is prose** — `## Key points`, `## The clarified
chapter`, any sub-section of the explanation layer, and `## Concept map`. Pick the type that matches
the **shape** of what is being shown, rather than "a diagram".

**Nineteen types, since 2026-09-14.** Each was rendered on `/elements/` in all four reading themes, at
1280px and at 420px, and measured: no render error, no invalid paint, and no text under its contrast
floor. **A type not in this table is not themed and may be unreadable in two of the four themes** —
the `-beta` suffix is part of the opening line where it is shown. **Fits** means it reads inside the
column at 1280px; **expand** means it scrolls or shrinks there and relies on the Expand control.

| Type | Opening line | For | At 1280 | Watch for |
|---|---|---|---|---|
| Mind map | `mindmap` | A chapter concept map — ideas branching from a centre | expand | Keep it to about twelve nodes |
| Flowchart, top-down | `flowchart TD` | A process, a decision tree, a causal chain. **The concept map's default** | fits | — |
| Flowchart, left-right | `flowchart LR` | A causal chain read left to right | expand | Wide beyond about four nodes; prefer `TD` |
| Relationship graph | `graph LR` | Relationships that are not hierarchical | expand | Left-to-right grows wide — keep it short |
| Timeline | `timeline` | A book's arc, a life, historical context | expand | — |
| Quadrant chart | `quadrantChart` | A two-axis comparison | fits | — |
| Journey | `journey` | A sequence with a felt quality at each step | expand | Keeps its natural width and scrolls |
| Pie chart | `pie` | Parts of one whole | fits | **At most six slices** (six colours). Numbers sourced |
| Bar, line, bar-and-line, histogram | `xychart-beta` | Effect sizes, trends, a distribution | fits | **One y-axis: combine bars and a line only in the same unit.** Shrinks rather than scrolls on a phone. Numbers sourced |
| Sankey | `sankey-beta` | Where a quantity went | fits | **Draws no title** — the caption carries it. Flow bands are deliberately faint |
| Radar | `radar-beta` | One book, or two, across several criteria | fits | Title unquoted; legend labels over about twelve characters crowd the frame |
| Treemap | `treemap-beta` | A nested whole — how big each part is | fits | **A small leaf silently loses its label** |
| Venn | `venn-beta` | Where ideas or groups overlap | fits | Overlap labels collide above about ten characters |
| Fishbone | `ishikawa-beta` | Why something failed — causes branching to one effect | fits | Indentation defines the tree; the first line is the effect |
| Cynefin | `cynefin-beta` | **Only when the book itself uses the Cynefin framework** | fits | Prints the framework's own domain descriptions by default |
| Sequence | `sequenceDiagram` | A question-first dialogue; who said what, in order | expand | Long message labels set the width |
| State | `stateDiagram-v2` | The life of an action or a habit — its states and transitions | fits | — |
| Gantt | `gantt` | A book across weeks | fits | Write `tickInterval 1week` and `todayMarker off` — a moving "today" line misleads on a static page |
| Block | `block-beta` | The structure of an argument, as blocks | expand | Width is the longest label times the columns |

**Rejected: `classDiagram`.** It models software; `flowchart` and `graph` already cover relationships
between ideas, and its multiplicity labels clip in every theme.

**Every diagram obeys five rules**, whatever its type:

1. **It earns its place.** It shows something the prose cannot show as quickly. A diagram that
   restates the paragraph above it is decoration.
2. **A caption sentence comes before it**, in the prose: what it shows, how to read it, and — for a
   chart — how strong the evidence behind the numbers is.
3. **It reads inside the text column.** Every diagram gets an Expand control, but Expand is for
   detail, not rescue: grow down rather than across, keep labels to about five words, and split a
   diagram that needs more than about twelve nodes. `chapter-spine.md` §6b.
4. **A chart is a claim.** Every plotted number has a row in `## Sources`, or the chart's title says
   the numbers are illustrative. `source-rules.md` §3b.
5. **Never hard-code a colour.** Diagrams re-theme across all four reading themes automatically, and a
   literal colour will be wrong — or invisible — in at least one of them.

**Show the RELATIONSHIPS, not a list of nouns.**

**Maths is NOT ENABLED.** `$$…$$` hard-fails — the braces parse as MDX.

---

## 7 · The rules that break every first draft

1. **`<` and `{` are syntax, not text.** Put them in backticks. **Measured 2026-08-31, and it is
   narrower and nastier than "any bare `<` fails":** `a < b` with spaces around it compiles fine;
   `a <b` is a hard parse error, and `{threshold}` is a RUNTIME error that only fires if the page
   has a route. See §8 for all three verbatim.
2. **Blank lines around every component's inner content.**
3. **The paste fence is FOUR backticks.** A chapter contains three-backtick blocks, and a
   three-backtick wrapper closes on the first one — you paste half a file.
4. **No `#` heading in the body.** `title` is the H1.
5. **Only the twelve headings in `chapter-spine.md` as `##`.** `###` freely inside them. **An `####`
   anywhere means the chapter should have been split.**
6. **Every fence carries a language tag.**
7. **Internal links are ROOT-ABSOLUTE**, never a relative `../` chain — that is a hard build error.
   Every path is in `src/generated/book-slugs.md`.
8. **Only link pages that exist.** Never link a `draft: true` page — a draft has no URL.
9. **MDX comments are `{/* … */}`**, and **must not contain a literal `*/`**.
10. **Images live BESIDE the chapter**, referenced `./name.png`. Never `public/`. `alt` is never
    empty. You cannot create binary files — ask for the screenshot rather than inventing a path.
11. **Dialogue turn labels are exactly `**Me:**`, `**AI:**` and `**AI (as sceptic):**`.** §5c.
12. **Every diagram has a caption sentence before it.** §6.

---

## 8 · What refuses the build, in its own words

**Read this before you go looking for the mistake.** Every string below was produced by an actual
build in this repository on 2026-08-31, not recalled. The value of having them here is that three of
them name a symptom rather than a cause, and one of them fires on a line that is correct.

### A bare `<` followed by a letter

```mdx
The rule is a <b and nothing else.
```

```
[ERROR] [vite] ✗ Build failed in 582ms
12:15: Unexpected character after `<`, expected a valid JSX tag
(note: to create a link in MDX, use `[text](url)`) (mdx-jsx:unexpected-character)
```

**Loud, and it names the line.** Note what does NOT fail: `a < b`, with spaces, compiles and renders.
So the rule is not "escape every `<`" — it is that `<` immediately followed by a letter opens a JSX
tag. Backticks solve both, and are correct anyway.

### Bare braces in prose

```mdx
Set it to {threshold} and stop.
```

```
[ERROR] ReferenceError: threshold is not defined
[ERROR] [build] Caught error rendering /.../zz-probe: ReferenceError: threshold is not defined
    This issue often occurs when your MDX component encounters runtime errors.
```

**A RUNTIME error, not a parse error**, and that difference matters: it fires while rendering the
page, so a page with no route never reaches it. On a `draft: true` chapter this is invisible.

### A component you did not import

```mdx
<Callout>hi</Callout>
```

```
[ERROR] Error: Expected component `Callout` to be defined:
you likely forgot to import, pass, or provide it.
```

**Two causes, one message.** Either you forgot the import line, or the component does not exist in
this project — and §5 is the list of the ones that do. Adding it to the import line will not help if
it is the second.

### A relative link

```mdx
See [the book](../deep-work/).
```

```
12 | ../deep-work/
   ·            ╰── relative link
╭─                               ─╮
· Found 1 invalid link in 1 file. ·
╰─                               ─╯
[ERROR] [starlight-links-validator] Links validation failed.
```

`errorOnRelativeLinks` is on deliberately. A `../` chain pasted from a session that cannot see this
filesystem is a guess, and a guess that happens to resolve is worse than one that does not.

### A hash that does not exist on the target

```mdx
See [the elements page](/elements/#no-such-anchor).
```

```
   ·                        ╰── invalid hash
· Found 1 invalid link in 1 file. ·
```

This is why paraphrasing one of the twelve `##` headings breaks things far away: an anchor is a
contract, and every inbound link to it fails at once.

### A correct link to `/shelf/`, `/ledger/` or `/review/`

```
· Found 1 invalid link in 1 file. ·   ...  invalid link to custom page
```

**This one fires on a path that is right.** Those three are `.astro` pages, not collection entries,
so the validator cannot see them and honestly says so. They are enumerated in the plugin's
`exclude` in `astro.config.mjs`. **A fourth computed view must be added there** or every chapter
linking to it fails the build. The exclusion is exact and never a wildcard, so `/shelves/` still
fails — which is the point.

### The four controls

```
BUILD REFUSED — 1 control violation(s).

  · money-and-wealth/money-psychology/zz-probe-book/index.mdx
    sits in "money-and-wealth" and carries no explicit `private:` decision.
```

```
BUILD REFUSED — 1 control violation(s) AFTER RENDERING.

  · ...  is draft/private, and yet dist/.../index.html EXISTS and is served.
```

Controls 1–3 refuse at `astro:build:start`, before anything is rendered. Control 4 refuses at
`astro:build:done`, because it reads `dist/` and `dist/` does not exist until then. All four are in
`scripts/guards.mjs` and all four were watched fail on 2026-08-31.

### And the one that refuses NOTHING

**A `draft: true` page's MDX is never syntax-checked — by anything.** A draft has no route, so Astro
never compiles its body to JSX. Probed: a deliberate `if (a < b)` outside backticks was appended to
a draft page and `npm run ci` reported **0 errors, 107 pages**. The mermaid pre-processor still logs
the file, which makes it look processed. `private: true` shares this hole for the same reason.

**So: flip `draft` to `false` FIRST, then validate.** A paste validated while the flag is still set
was validated by nothing at all, and the errors surface later, looking like a regression.

---

## 9 · Forbidden

| Never | Because |
|---|---|
| A component not in §3 or §5 | Fails the build |
| A fifth custom component | Say it in one sentence instead. A new one requires him to ask explicitly, in writing, in that session |
| Any second diagram tool | Mermaid is the ceiling |
| Writing in `## Recall` or `## Open questions` | Those are his. The prohibition zone |
| **Writing, pasting or editing a comment** | His, like the recall. §5d |
| Writing an action, an obstacle, or an IF–THEN commitment | `P0`'s one rule |
| An action anchored to no claim in its chapter | It was invented, and the ledger is the only measure this system has |
| Asking him to visualise an outcome | Contradicts the evidence the whole system is built on |
| A chart whose numbers are neither sourced nor titled illustrative | `source-rules.md` §3b |
| A "real-life" incident with no source | It is an invented citation in narrative form. `standards.md` §2 rule 9 |
| Emoji in a heading | Breaks anchors, pollutes the search index |
| An unpinned claim — "studies show" | Undated facts rot silently; dated facts rot visibly |
