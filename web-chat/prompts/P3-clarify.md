# P3 — orientation, and the clarified chapter

**Stage 3. TWO PARTS, and only the second is conditional.** Three to six minutes.

**Length: 776 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **This prompt used to be conditional in its entirety, and that was a defect.**
>
> `reconciliation.md` row 6 made the *rebuild* conditional on the evidence that a summary of familiar
> material deletes the machinery. Nobody re-checked what else `P3` was carrying — and it was
> carrying three of the twelve required headings. On a `clarified: false` chapter,
> `## Pre-context`, `## Core message` and `## Key points` had **no producer at all**. Four of the
> six *Deep Work* stubs carry `clarified: false`, so this was the common case, not the edge.
>
> **Part A runs on every chapter. Part B runs only when `book.json` says `clarified: true`.** When
> it does not, `## Core message` and `## Key points` are produced by `P4` instead, after your
> closed-book recall has been marked — which is the better place for them anyway.
> `chapter-spine.md` §1, and [spine-map.md](spine-map.md) is the table that would have caught it.

## Paste with it

**Part A** — `00-CONTEXT-PACK` ● · the chapter's **opening only** ● · its `book.json` node ● ·
`chapter-spine` ● · `standards` ●.
**Part B** — the same, plus the **full chapter** ● · `md-spec` ● · `source-rules` ○.

`GUIDE.md` Appendix A. **The one forgotten most often is the `book.json` node**: without `argues`,
`clarified` and `verdict`, the model invents the shape, and inventing the shape is the single failure
the brief exists to prevent.

---

## Part A — orientation. Every chapter, clarified or not

Run this **before** you read the chapter, and paste only the chapter's own opening pages plus the
table of contents entry — not the whole chapter.

````text
Here is the opening of chapter [N] of [BOOK], and the table of
contents around it.

Write ## Pre-context, and nothing else.

WHAT PRE-CONTEXT IS
  What I need to have IN MIND before I open this chapter. It prepares
  me; it does not tell me what the chapter says.

  Include, where they exist:
    · a term the chapter uses without defining, defined
    · the claim from the previous chapter this one builds on
    · the debate or the position the author is answering
    · the thing a reader of THIS chapter is assumed to already accept
    · anything the author takes for granted about their own setting

WHAT IT IS NOT
  It is not a summary, an outline, a set of key points, or "what you
  will learn". If a sentence you write could be deleted from the
  chapter and lose nothing, it belongs in the chapter, not here.

  THE TEST: does the sentence state a CONDITION for reading, or a
  CLAIM from the reading? If it is a claim, cut it. I would rather
  open the chapter under-prepared than pre-digested.

LENGTH
  As long as it needs and no longer. Three sentences is a normal
  answer. If you find yourself at four paragraphs, you are summarising.

MISSING INPUTS
  If I have pasted the whole chapter rather than its opening, say so
  and use only the opening — you cannot write a condition for reading
  from material you have already read past. If you do not have the
  chapter before this one, and this chapter builds on it, name what
  you need instead of reconstructing it from the title.

Four-backtick fence. Nothing outside it.
````

---

## Part B — the rebuild. ONLY when `clarified: true`

If `book.json` says `clarified: false`, **skip this entirely** and read the original. The section is
already absent from the stub, and `## Core message` and `## Key points` will come from `P4`.

````text
Here is chapter [N] of [BOOK], uploaded in full.

Rebuild it so it is clearer than the original, WITHOUT losing the parts
that make it usable.

LENGTH IS NOT A CONSTRAINT. If clarity needs more words than the
original, use more. There is no budget in this system and a rebuild
that is shorter than the original is not, by itself, better. But:

  KEEP the examples, the specific numbers, the repetition that makes
  an idea settle, every concrete instruction, and every hedge the
  author put in. A book is one idea plus the machinery that makes it
  actionable, and the machinery is what a summary deletes.

  KEEP the author's own emphasis. If they spend a third of the chapter
  on one case, that proportion is a claim about importance. Do not
  flatten it.

  CUT padding, throat-clearing, and the third anecdote making the same
  point as the first two — and tell me exactly what you cut and why it
  was safe. Name the anecdote. "Some repetition" is not a cut list.

  ADD, NEVER SUBTRACT, where my situation differs. You may add a
  paragraph describing what a claim assumes and how that differs from
  Nepal, or from my stage of life. You may NOT remove or soften what
  the author meant, and you may NOT conclude on my behalf that it does
  not apply to me.

Emit these sections, and only these:

  ## Core message
    One sentence, in a :::note[Core message] block. If it takes two,
    the chapter has two messages — say so explicitly and say which one
    the chapter actually argues for.

  ## Key points
    The load-bearing claims: the ones the argument RESTS on. Not a
    précis. Load-bearing claims are unevenly sized, so if every point
    comes out the same length and in chapter order, you have written a
    summary under a different heading.

  ## The clarified chapter
    The rebuild. Then, in an <Aside type="note" title="What I cut, and
    why">, what you dropped and why it was safe.

Everything cites the uploaded chapter. Where the chapter asserts
something you know to be contested, MARK IT IN PLACE — do not smooth
it, and do not move the qualification to a footnote.

MISSING INPUTS
  ONE CHAPTER. If I have uploaded the whole book, say so and stop —
  material in the middle of a long context degrades by more than 30%
  and you will not be able to tell me which parts. If the brief says
  clarified: false for this chapter, refuse it: I read the original,
  and a rebuild deletes the machinery that made it usable.

Four-backtick fence. Nothing outside it.
````

---

## What lands on the page

| Part | Section |
|---|---|
| **A, always** | `## Pre-context` |
| **B, only when `clarified: true`** | `## Core message` · `## Key points` · `## The clarified chapter` |

When `clarified: false`, `## The clarified chapter` is **absent from the page** — not empty — and
sections 2 and 3 come from `P4`. [spine-map.md](spine-map.md) has the flip in one table.

## Landed / Did not

| | |
|---|---|
| **Landed** | Every pre-context sentence states a CONDITION for reading |
| **Did not** | *"The chapter argues that depth is becoming rare."* That is a claim from the reading — the test the prompt names, failed |
| **Landed** | The cut list has nouns in it. "The Roosevelt anecdote, third instance of the same point" |
| **Did not** | *"Some repetition and throat-clearing."* A cut list with no nouns is a claim that cutting happened |
| **Landed** | The numbers and the named cases survived the rebuild |
| **Did not** | A clarified chapter that is all argument. That is the summary this stage exists to avoid, produced under a different heading |
| **Landed** | Where his situation differs, a paragraph was **added** beside the author's claim |
| **Did not** | The claim was rewritten into advice for Kathmandu and you can no longer tell what the book said |

## If it comes back wrong

````text
That is a summary, not a pre-context. Delete every sentence that
states a claim FROM the chapter and keep only what must be in my head
BEFORE it. If nothing survives, say the chapter needs no pre-context.
````

````text
The cut list names nothing. Tell me which anecdote, which paragraph,
which repetition — with a noun for each — and why dropping it was
safe. If you cut nothing, say you cut nothing.
````

## What to check

- **Part A ran at all.** It is the one that gets skipped by habit, because the old version of this
  file made the whole prompt conditional.
- Did it keep the **numbers and the examples**? A clarified chapter that is all argument has done
  exactly the thing this stage exists to avoid.
- Is `## Core message` really one sentence?
- Does the cut list **name** what was removed, or does it say "some repetition"? A real cut list has
  nouns in it.
- Did it add where your situation differs, rather than subtracting? *"you don't remove, alter the
  things that author wanted to say for original intent, you can give extra instead."*
