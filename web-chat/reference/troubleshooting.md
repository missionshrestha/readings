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
| A dialogue turn shows as an ordinary bold word, build green | The label is not exactly `**Me:**`, `**AI:**` or `**AI (as sceptic):**`. **Silent** | "Turn labels are exactly `**Me:**`, `**AI:**` and `**AI (as sceptic):**`, colon inside the bold. Re-emit `### How the exchange went`." |

**Every one is a one-line fix and none is worth a conversation.** If the same one recurs, the
contract in the Project is stale — re-upload `md-spec`.

---

## Substantive — the fourteen that actually happen

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

### "What real readers say" is three or four reviewers

> That is what four people thought, not what readers think. Give me the venues with links, N — the
> opinions you actually read — and the clusters as *n of N* with linked quotes. Under 30 opinions from
> 3 kinds of venue, write THIN with the number. Then the Reddit Answers summary quoted with its query
> and date, or the exact query and five to ten threads for me to read myself.

### It compressed the explanation into notes

> I cannot follow this: [quote it]. Say it again in complete sentences, define every term the first
> time it appears, and put an example beside each claim. Simplify the words, not the claim — would the
> author sign the simpler sentence? Length is not a concern.

### It clarified a chapter I know

> The brief says `clarified: false` for this chapter. I read the original. Do not produce a
> rewritten version — the examples and repetition are the part that makes it usable.

### The dialogue record dropped the middle

> The record goes from my position straight to where we ended up. Put every turn into
> `### How the exchange went`, in order, labelled `**Me:**`, `**AI:**` or `**AI (as sceptic):**` — my
> turns in my words, yours with every point kept — and name the turn where anyone moved.

**If you are no longer in the chat that held the argument, it cannot be recorded** — a new chat has no
transcript, and a reconstructed dialogue is an invented one.

### The concept map is too wide for the column

> This only reads after Expand. Grow it down, not across: `flowchart TD` or `mindmap`, no more than
> about four nodes side by side, labels of about five words. Past about twelve nodes, split it into
> two maps with a caption sentence before each. Expand is for detail, not rescue.

### It gave me more than ten actions

> Ten is the ceiling. Keep the ten that carry the most weight, re-emit the YAML with those alone, and
> list the rest after it as *considered, not kept*, one line each. Do not recommend one — I commit to
> ONE per book, and I choose it.

### It invented actions to reach two

> These do not follow from a named claim in the chapter: [name them]. Withdraw them. Meet the floor
> with `tier: reference` rules anchored to claims in this chapter — or tell me that even two cannot
> be anchored, and stop.

### The book page's "Context then vs. context today" only criticises

> This section only finds problems. Look for what has supported the book since publication with the
> same effort — independent research, scholars who reached a similar conclusion by another route —
> then date each point, say which kind of change it is, and source it. If you looked and found none,
> say so in one sentence under `### Research since — what supports it and what does not`.

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
4. Is `md-spec`, `chapter-spine` or `standards` in the Project out of date with the repo?

**Nearly every persistent failure is one of those four**, and none is fixed by asking again more
firmly.
