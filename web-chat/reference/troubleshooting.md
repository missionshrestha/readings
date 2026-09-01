# Troubleshooting — when the output is wrong

Two kinds of wrong, fixed in different places.

**Mechanical** — it does not paste, build or render. Fixed by Claude Code with `/validate`, in
seconds.

**Substantive** — it builds fine and it is wrong. Fixed here, and it is the only kind worth your
attention.

---

## Mechanical

| Symptom | Cause | Say |
|---|---|---|
| Half a file arrived | The wrapper was three backticks and closed on the first code block | "The fence closed early. Re-send in a **four-backtick** fence." |
| `Unexpected end of file in expression` | An HTML comment, or a literal `*/` inside an MDX one | "Comments are `{/* … */}` and must not contain `*/`. Re-emit." |
| `ReferenceError: <name> is not defined` | A bare `{` in prose | "Put every `<` and `{` in prose inside backticks." |
| `errorOnRelativeLinks` | A `../` chain — **a hard error, never resolved** | "Internal links are root-absolute. Paths are in book-slugs. Re-emit every link." |
| A link fails validation | It links a page that does not exist, or a draft | "Only link pages that are live. A draft has no URL." |
| A component renders as literal text | Not in the contract, or not imported | "That element is not in md-spec. Use what is." |
| A diagram has hairline strokes, build green | `stroke-width` in `.mdx`, which needs camelCase. **Silent** | "SVG attributes are camelCase in `.mdx` — `strokeWidth`." |
| Markdown inside a block is one flat paragraph | Missing blank lines around inner content | "Blank lines around the inner content of every block." |

**Every one is a one-line fix and none is worth a conversation.** If the same one recurs, the
contract in the Project is stale — re-upload `md-spec`.

---

## Substantive — the eight that actually happen

### It explained before I recalled

> I had not written my recall. Everything you just gave me has contaminated it. Start again after I
> paste mine, and mark it rather than pre-empting it.

### It agreed with me too fast

> You accepted that immediately. Argue the other side properly: what would someone who disagrees
> say, and what evidence would they point at?

### It wrote my commitment

> That is mine. Give me candidates with honest impact estimates and stop. `P0`'s one rule.

### It invented the consensus

> "Readers say" — which readers, where? If you cannot name where you looked, say the section is thin
> rather than filling it. I would rather have a gap than a confident guess.

### It clarified a chapter I know

> The brief says `clarified: false` for this chapter. I read the original. Do not produce a
> rewritten version — the examples and repetition are the part that makes it usable.

### It gave me fifteen actions and no ranking

> No cap on extraction, but I commit to ONE. Which single one carries the most weight, and argue for
> it — then stop and let me choose.

### It asked me to imagine it working

> Never ask me to visualise success. Positive fantasy predicts worse attainment. Ask me for the
> obstacle, and refuse a vague one.

### It flattered a decision I had already made

> You are agreeing with a position I gave you. Answer as though I had not told you what I thought,
> and tell me where that answer differs.

---

## When it will not stop being wrong

**Two rewrites is the limit.** On the third, **start a new chat.** The transcript is now full of the
wrong version and is anchoring everything — and in a long transcript your own stated positions have
accumulated, which is exactly the condition sycophancy feeds on.

**If a fresh chat gets it wrong the same way, the problem is the input.** Check, in this order:

1. Is the chapter's node in `book.json` vague — is `argues` a topic rather than a claim?
2. Did you paste the whole book rather than one chapter?
3. Did you state your conclusion before asking?
4. Is `md-spec` in the Project out of date with the repo?

**Nearly every persistent failure is one of those four**, and none is fixed by asking again more
firmly.
