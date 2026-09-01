# MD-SPEC — the complete authoring contract

**Handed verbatim to whichever tool writes a chapter**, alongside `chapter-spine.md`. It is the only
reference. If a component is not here it does not exist, and using it fails the build.

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
---
```

| Field | Rule |
|---|---|
| `title` | **The only field Starlight requires.** Becomes the H1 — never write a `#` in the body |
| `domain` `cluster` `book` | **Must match the directory.** The build refuses otherwise — the path is the truth |
| `clarified` | `false` means `## The clarified chapter` is **absent**, not empty |
| `gap` | `knowledge` or `execution`. Comes from `book.json`, and it changes what the chapter owes |
| `private` | Excludes the page from `build`. **Required, explicitly, in a sensitive domain** |
| `status` | `stub` → `reading` → `generated` → `recalled` → `explained` → `complete`, plus `skipped` and `dropped`. Set by hand. **Eight values, and `stub` is one of them** — see below |
| `read` | When it was actually read, not generated. Renders as "Last updated" |
| `actions[]` | See §4. `obstacle` is required whenever `committed: true` |

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
`node scripts/audit.mjs` will ever say so.

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
disagree, and the ledger is computed from the data.

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

---

## 4 · Actions

One YAML object per action. **Extraction is uncapped; commitment is not.**

| Field | Rule |
|---|---|
| `id` | **Permanent.** The review key, and rendered visibly. Renaming it silently resets that action's schedule |
| `if` / `then` | The rule. One line, observable. *Could someone watching tell whether you did it?* |
| `trigger` | A concrete situation — a time, a place, a person. **Never a feeling** |
| `obstacle` | The **inner** obstacle. **Required when `committed: true`** |
| `tier` | `now` · `next` · `later` · `reference` |
| `impact` | Honest, **including "probably marginal"** |
| `committed` | True only when **he** wrote the sentence. The AI never writes one |
| `day30` | `not-yet` · `running` · `adapted` · `dropped`. Filled in honestly, failures included |

**At most one action across the whole book carries `committed: true` with `tier: now.`**

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

## 6 · Free from Markdown and the build

Headings and anchors · GFM tables, footnotes, task lists · lists · blockquotes · inline formatting ·
full-text search · four reading themes with a toggle · breadcrumbs · prev/next · build-time link
validation · "Last updated" from `read`.

**Diagrams are Mermaid**, in a ` ```mermaid ` fence. Six types, and pick the one that matches the
shape rather than "a diagram":

| Type | For |
|---|---|
| `mindmap` | A chapter concept map — ideas branching from a centre |
| `flowchart TD` | A process, a decision tree, a causal chain |
| `graph LR` | Relationships that are not hierarchical |
| `timeline` | A book's arc, or historical context |
| `quadrantChart` | A two-axis comparison |
| `journey` | A sequence with a felt quality at each step |

**Show the RELATIONSHIPS, not a list of nouns.** A diagram that restates the paragraph above it has
not earned its place. Never hard-code a colour: they re-theme across all four themes automatically.

**Maths is NOT ENABLED.** `$$…$$` hard-fails — the braces parse as MDX.

---

## 7 · The rules that break every first draft

1. **`<` and `{` are syntax, not text.** Put them in backticks. **Measured 2026-08-31, and it is
   narrower and nastier than "any bare `<` fails":** `a < b` with spaces around it compiles fine;
   `a <b` is a hard parse error, and `{threshold}` is a RUNTIME error that only fires if the page
   has a route. See §9 for all three verbatim.
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
| Writing an action, an obstacle, or an IF–THEN commitment | `P0`'s one rule |
| Asking him to visualise an outcome | Contradicts the evidence the whole system is built on |
| Emoji in a heading | Breaks anchors, pollutes the search index |
| An unpinned claim — "studies show" | Undated facts rot silently; dated facts rot visibly |
