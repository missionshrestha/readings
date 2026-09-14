# P7 — recap and page assembly

**Stage 9. Eight minutes.** Publishes the finished chapter page.

**Length: 1371 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **The concept map changed on 2026-09-14.** He asked for *"a clean concept map designed to fit within
> the current flow of paragraphs and side widths, with the ability to expand/collapse to fill the
> whole screen."* The site now adds Expand to every diagram; this prompt owns the other half — a map
> that reads inside the text column without it. `chapter-spine.md` §6b, `md-spec.md` §6.

## Paste with it

`00-CONTEXT-PACK` ● · its `book.json` node ● · `chapter-spine` ● · `md-spec` ● · `standards` ● · the
chapter ○ — `GUIDE.md` Appendix A.

**And the slug list.** `src/generated/book-slugs.md` holds every valid internal path. Web chat cannot
open it, so either paste it with this prompt or accept plain-text cross-links: a link to a page that
does not exist **fails the build outright**.

---

````text
Assemble the rest of chapter [N]'s page. These sections only:

  ## Concept map

    FIRST, a caption: one or two sentences in the prose BEFORE the
    fence, saying what the map shows and how to read it. A diagram
    whose meaning has to be worked out from its shape has explained
    nothing.

    Then a mermaid diagram — one of the nineteen types in md-spec §6,
    with its opening line written exactly, -beta included. Pick the
    type that matches the SHAPE of what the chapter argues — not "a
    diagram". For a concept map that is almost always one of two:

      flowchart TD   ideas and how they act on each other, top-down.
                     The default: it grows down, so it fits the column
      mindmap        ideas branching from a centre, when the chapter
                     really is one idea with parts

    Reach past those two only when the chapter's structure is that
    shape: stateDiagram-v2 for states and transitions, sequenceDiagram
    for an exchange in order, ishikawa-beta for causes of one effect,
    venn-beta for overlapping ideas. A type not in md-spec §6 is not
    themed and may be unreadable in two of the four reading themes.

    IT MUST READ INSIDE THE TEXT COLUMN — about 595px at normal text
    size, and a phone's width on a phone. The site gives every diagram
    an Expand control, but Expand is for detail, not for rescue: the
    version in the column has to be readable on its own. So:
      · GROW DOWN, NOT ACROSS. Prefer flowchart TD or mindmap. No more
        than about four nodes side by side at any level. graph LR grows
        wide; use it only for a short chain.
      · ABOUT TWELVE NODES IS A SIGNAL TO SPLIT. Two maps, each with
        its own caption, beat one dense one. One or two diagrams in
        this section, never a gallery.
      · SHORT LABELS, about five words. The node names the idea; the
        explanation belongs in the prose. Mermaid sizes a box to its
        label and clips a long one rather than wrapping it.

    SHOW THE RELATIONSHIPS, NOT A LIST OF NOUNS. Label EVERY edge, in
    two to four words saying HOW the two ideas relate. An unlabelled
    edge asserts that two things are connected without saying how,
    which is the diagram equivalent of "studies show".

    THE TEST: if the graph is a star — one root, N leaves, no
    cross-links — you have drawn a table of contents. A concept map
    earns its place through the links that are NOT hierarchical: the
    idea in section 3 that undercuts the claim in section 1, the two
    mechanisms that turn out to be the same mechanism. At least one.

    A diagram that restates the paragraph above it has not earned its
    place. If the chapter does not have that kind of structure, say
    so and omit the fence rather than drawing one.

    A CHART IS A CLAIM. If a diagram plots numbers — a bar, line or pie
    chart — every plotted value needs a row in ## Sources, or the
    chart's own title says the numbers are illustrative, and the
    caption says how strong the evidence behind them is.

    Never hard-code a colour: the site re-themes across four reading
    themes and a fixed fill will be invisible in at least one of them.

  ## The 30-second version

    What I would say about this chapter in a lift, to someone who has
    not read it and is deciding whether to. Not a summary of the
    summary — the thing that would make them read it, or not.

    Keep it to roughly the core message plus three sentences. If it is
    longer than that it has become a fourth summary, and the page
    already has enough of those.

    SHORT BY DESIGN IS NOT COMPRESSED. Complete sentences, no
    shorthand, and no term I would have to look up. If the chapter's
    own term is needed, say what it means in the same sentence.

    Then, at the end, the cross-links: other chapters and other books
    in my universe that this connects to, and SAY HOW they connect —
    "argues the opposite from neurochemistry" beats "related".

    Use <LinkCard title href description /> where I have already read
    the target, and PLAIN TEXT where I have not. A link to a page that
    does not exist FAILS THE BUILD OUTRIGHT — starlight-links-validator
    runs with failOnError, and a draft page has no URL at all.

    Every path must come from the slug list, if I pasted one. Links
    are ROOT-ABSOLUTE — /domain/cluster/book/chapter/ — never a
    relative ../ chain. Relative links are a hard build error here,
    not a resolved convenience, because a ../ pasted from a chat
    session is a guess.

    If you are not certain a target exists, write it as plain text and
    say you were not certain. A broken link costs a build; a plain-text
    mention costs nothing.

CONSTRAINTS

  Do NOT write ## Recall or ## Open questions. Those are mine, and
  they are the two sections the whole design exists to protect. The
  same goes for my comments on the page: never write one.

  Do NOT write the actions — they are frontmatter, and <Actions />
  renders them from the data. Writing them twice guarantees the two
  disagree, and the ledger is computed from the data.

  Do NOT write ## Sources; P4 owns it. If assembling this made you
  notice a claim that is missing from it — including a chart value you
  plotted — say so in prose OUTSIDE the fence and I will go back to P4.

  Do NOT add a heading that is not one of these twelve, in this order.
  An extra ## is a defect: headings are anchors, and anchors are
  contracts across the whole corpus. An #### anywhere means the
  chapter should have been split, which is a brief amendment.

    ## Pre-context              ## Dialogue
    ## Core message             ## Concept map
    ## Key points               ## Actions
    ## The clarified chapter    ## The 30-second version
    ## Recall                   ## Open questions
    ## The explanation layer    ## Sources

  Use ONLY these components. There is no fifth custom one and no
  second diagram tool:

    custom   <Recall> <Actions /> <Passage> <Margin>
    stock    <Aside> <Badge> <Card> <CardGrid> <Code> <LinkCard>
             <Steps> <Tabs> <TabItem>

  <Aside> types are note, tip, caution and danger. There is NO success
  type. Every component needs BLANK LINES around its inner content or
  the Markdown inside is not parsed as Markdown — it renders, wrongly.
  Maths is not enabled; $$…$$ hard-fails.

  Put every bare < and { in prose inside backticks. "a <b" is a parse
  error naming the line; "{threshold}" is a RUNTIME error that only
  fires on a page with a route, so on a draft it is invisible.

MISSING INPUTS — NAME THEM AND STOP

If I have not given you the slug list, do not stop: write every
cross-link as plain text and say so. A plain-text mention costs
nothing and a broken link costs the build, so degrading is correct
here and guessing a path is not.

Everything else, stop for. If you do not have the chapter's node from
my brief, say so — without "argues" you are drawing a concept map of
whatever the chapter seemed to be about. If the sections above this
one are not on the page yet, say which are missing: the 30-second
version is what I would say having read the whole page, and written
against half of it, it is a blurb.

Four-backtick fence. Nothing outside it.
````

---

## What lands on the page

`## Concept map` and `## The 30-second version`. **Two sections, and no others** — `## Sources` is
`P4`'s, the actions are frontmatter, and `## Recall` and `## Open questions` are yours.

## Landed / Did not

| | |
|---|---|
| **Landed** | A caption sentence before the diagram says what it shows and how to read it |
| **Did not** | A diagram with no caption, so its meaning has to be reverse-engineered from its shape |
| **Landed** | The map reads in the column without Expand — it grows down, with no more than about four nodes side by side |
| **Did not** | A wide `graph LR` shrunk to fit until every label is 7px, legible only after Expand. That is Expand used as rescue |
| **Landed** | The diagram has a cross-link — an idea in one section that undercuts a claim in another |
| **Did not** | A star: one root, N leaves, no cross-links. That is a table of contents drawn sideways |
| **Landed** | Every edge is labelled with how the two things relate |
| **Did not** | Unlabelled edges. An unlabelled edge asserts a connection without saying what it is, which is the diagram equivalent of "studies show" |
| **Landed** | It said the chapter did not need a diagram and omitted the section |
| **Did not** | A diagram restating the paragraph above it, drawn because the heading was there |
| **Landed** | The 30-second version is complete sentences, and every term in it is explained where it is used |
| **Did not** | A lift pitch built from the chapter's jargon — correct, short, and meaningless to anyone who has not read it |
| **Landed** | Cross-links say **how** — "argues the opposite from neurochemistry" |
| **Did not** | *"Related: Atomic Habits."* Related how? |
| **Landed** | Uncertain targets came back as plain text, flagged as uncertain |
| **Did not** | A confident `<LinkCard>` to a page that does not exist, which fails the build |

## If it comes back wrong

````text
The concept map is a star — one root and a list of leaves. Redraw it
with at least one non-hierarchical link: the idea in one section that
undercuts a claim in another, or two mechanisms that turn out to be
the same mechanism. If there is no such link, omit the section and
say so.
````

````text
These edges are unlabelled: [list them]. Label each with how the two
nodes relate, or remove the edge.
````

````text
The concept map is too wide to read inside the text column. Redraw it
growing down — flowchart TD or mindmap — with no more than about four
nodes at any level and labels of about five words. If it needs more
than about twelve nodes, split it into two maps, each with its own
caption sentence before it.
````

## Then, in Claude Code

```bash
/validate
node scripts/new-chapters.mjs <d> <c> <b> --refresh
```

`--refresh` turns that chapter's plain card on the book index into a real link. **Without it the
grid silently drifts.**

**Flip `draft: false` BEFORE you validate, not after.** A `draft: true` page has no route, so Astro
never compiles its body — its MDX is syntax-checked by nothing at all, and `npm run ci` will report
a clean build over a file full of errors. `CLAUDE.md` stack fact 11, and `md-spec.md` §8.

Set `status: complete` only when both hold: the recall was written **closed-book before** the
explanation layer, **and** `## Open questions` is filled in by hand. A chapter marked `complete` with
an empty `## Open questions` and a full `## Dialogue` is the one inconsistency always worth flagging.
