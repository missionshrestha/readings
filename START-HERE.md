# START HERE

A personal reading system: **one MDX file per chapter**, rendered as a reading site, with the
thinking done in chat and the machinery done in Claude Code.

---

## The split, and why it exists

| | **Claude Code** — this repository | **Web chat** — `web-chat/` |
|---|---|---|
| Does | Scaffolds, validates, aggregates, ships | Selects, briefs, clarifies, explains, argues |
| Never | **Authors a chapter.** Ask it to and it declines | Touches the filesystem |
| Why | The build is the only honest validator | The book is uploaded there, and prose is cheaper |

**Both halves draw on one Claude Pro pool.** Tokens spent in Claude Code are tokens unavailable for
reading — that is the whole reason for the split, not a stylistic preference.

---

## Read in this order

**0.** [`GUIDE.md`](GUIDE.md) — **the runbook.** What to do, in order, with a verification after
every step.

**1.** [`CLAUDE.md`](CLAUDE.md) — what Claude Code does and does not do.
**2.** [`context/reconciliation.md`](context/reconciliation.md) — **where the drafts contradict their
own evidence, and which side wins.** Fourteen conflicts, each citing both files. Read this before
the first book; it changes what the pipeline owes.
**3.** [`WORKFLOW.md`](WORKFLOW.md) — the division of labour and the budgets.
**4.** [`web-chat/03-OPERATING-RULES.md`](web-chat/03-OPERATING-RULES.md) — **how you use AI while
reading.** If you read one file, read this one.

---

## Three things to do before the first chapter

**1. Answer the questions in [`context/reader.md`](context/reader.md).** It is currently a skeleton
of `[ASK]` markers, and every chapter generated while they are unanswered is a chapter written for a
stranger. Run `/progress` and it will ask.

**2. Decide the one that cannot be undone later:** the site is public and currently `noindex` on a
temporary host. Chapters in the relationships, love and money domains will carry real personal
material. The build **refuses** a page in those domains with no explicit `private:` decision — but
the decision is yours. `DEPLOY.md`.

**3. Choose your chat mode.** Either works, and the output is identical if the context is.
Project mode → [`web-chat/01-SETUP.md`](web-chat/01-SETUP.md).
Standalone → [`web-chat/00-CONTEXT-PACK.md`](web-chat/00-CONTEXT-PACK.md).

---

## The loop, once you are in it

```
1  BRIEF      P2 in chat  ->  book.json          once per book
2  SCAFFOLD   /scaffold                          once per book
3  READ       the chapter, AI off                per chapter
4  RECALL     closed book, before anything else  per chapter  ← the point
5  EXPLAIN    P4  ·  ARGUE  P5  ·  DECIDE  P6
6  PASTE      over the stub
7  VALIDATE   /validate
8  RECORD     ## Open questions by hand, status: complete
9  SHIP       /deploy
```

**Steps 3, 4 and 8 are the deliverable. Everything else is logistics.**

---

## Did it work? The five-part test

After chapter one is live, **all five** must be true:

1. The chapter is at its **public URL**, not just localhost.
2. **Search returns it** — from `npm run preview` or the live site, never `file://`.
3. **Every element renders** and re-themes across all four reading themes.
4. **You wrote `## Recall` closed-book, BEFORE reading the explanation layer.**
5. **You filled `## Open questions` yourself.**

**If 4 failed, nothing else on the list matters.** You have built a very good bookmark folder.
