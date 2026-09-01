# P7 — recap and page assembly

**Stage 9. Eight minutes.** Publishes the finished chapter page.

**Length: 593 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

---

````text
Assemble the rest of chapter [N]'s page. These sections only:

  ## Concept map

    A mermaid diagram. Pick the type that matches the SHAPE of what
    the chapter argues — not "a diagram":

      mindmap        ideas branching from a centre
      flowchart TD   a process, a decision tree, a causal chain
      graph LR       relationships that are not hierarchical
      timeline       an arc, or historical context
      quadrantChart  a two-axis comparison
      journey        a sequence with a felt quality at each step

    SHOW THE RELATIONSHIPS, NOT A LIST OF NOUNS. Label the edges. An
    unlabelled edge asserts that two things are connected without
    saying how, which is the diagram equivalent of "studies show".

    THE TEST: if the graph is a star — one root, N leaves, no
    cross-links — you have drawn a table of contents. A concept map
    earns its place through the links that are NOT hierarchical: the
    idea in section 3 that undercuts the claim in section 1, the two
    mechanisms that turn out to be the same mechanism.

    A diagram that restates the paragraph above it has not earned its
    place — say so and omit the section rather than drawing one.

    Never hard-code a colour: the site re-themes across four reading
    themes and a fixed fill will be invisible in at least one of them.
    Keep node labels short; mermaid measures the label to size the box
    and a long one is clipped rather than wrapped.

  ## The 30-second version

    What I would say about this chapter in a lift, to someone who has
    not read it and is deciding whether to. Not a summary of the
    summary — the thing that would make them read it, or not.

    Keep it to roughly the core message plus three sentences. If it is
    longer than that it has become a fourth summary, and the page
    already has enough of those.

    Then, at the end, the cross-links: other chapters and other books
    in my universe that this connects to, and SAY HOW they connect —
    "argues the opposite from neurochemistry" beats "related".

    Use <LinkCard title href description /> where I have already read
    the target, and PLAIN TEXT where I have not. A link to a page that
    does not exist FAILS THE BUILD OUTRIGHT — starlight-links-validator
    runs with failOnError, and a draft page has no URL at all.

    Every path comes from src/generated/book-slugs.md. Root-absolute,
    never a relative ../ chain: relative links are a hard build error
    here, not a resolved convenience, because a ../ pasted from a chat
    session is a guess.

    If you are not certain a target exists, write it as plain text and
    say you were not certain. A broken link costs a build; a plain-text
    mention costs nothing.

CONSTRAINTS

  Do NOT write ## Recall or ## Open questions. Those are mine, and
  they are the two sections the whole design exists to protect.

  Do NOT write the actions — they are frontmatter, and <Actions />
  renders them from the data. Writing them twice guarantees the two
  disagree, and the ledger is computed from the data.

  Do NOT write ## Sources; P4 owns it. If assembling this made you
  notice a claim that is missing from it, say so in prose OUTSIDE the
  fence and I will go back to P4.

  Do NOT add a heading that is not one of the twelve in the spine. An
  extra ## is a defect: headings are anchors, and anchors are contracts
  across the whole corpus.

  Use only the components in md-spec.md. No fifth custom component and
  no second diagram tool.

Four-backtick fence. Nothing outside it.
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
