# P8 — ledger and synthesis

**Stage 10. End of book, forty-five minutes.**

**Length: 633 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

---

````text
[BOOK] is finished. Here are all my chapter recaps and every action.

Work through the four parts in order and STOP AFTER EACH ONE. Part B
depends on what I say about Part A.

PART A — THE ACTIONS, CONSOLIDATED

  Which of these are the same action wearing different words? Merge
  them, say which you merged, and say which wording you kept and why.
  Two actions that would be satisfied by the same behaviour on the
  same evening are one action.

  Which contradict each other? Name the pair and make me choose. Two
  actions that compete for the same slot in the day are in conflict
  even when they sound compatible — say so.

  Which have I already quietly stopped doing? ASK rather than assume,
  one at a time, and take "I don't know" as a no. An action I cannot
  remember whether I did is an action I did not do.

  Which never had a real trigger? Look back at each one: if the
  trigger is a feeling, a time of day I do not reliably observe, or a
  situation that has not occurred since I wrote it, that action was
  never running and the ledger should say so rather than showing it
  as live.

  Then: what is the ONE that carried the most weight? Argue for it
  properly, with the reason, and name your second choice so I can see
  what you were weighing. I decide.

PART B — THE SYNTHESIS

  · What did this book actually argue, in one paragraph, now that I
    have read all of it? Not the blurb, and not what it said it was
    about in chapter one.
  · Which of my opening questions did it answer, which did it not, and
    which turned out to be the WRONG QUESTION? The third category is
    the most useful and the one you will be tempted to skip.
  · Where was it weakest, and did that weakness matter for MY use? A
    book can be badly evidenced in a section I will never act on.
  · What did it CHANGE, as opposed to CONFIRM? Be strict about this.
    Confirmation feels like insight and is not the same thing: if I
    could have written the sentence before reading, it confirmed.
    Ask me for one specific thing I now do or believe differently, and
    do not accept an abstraction.
  · What would I have lost by not reading it? If the honest answer is
    "the confidence to keep doing what I was doing", say that.
  · Where did the author's own circumstances shape the argument in a
    way that matters for me? Pull together what the chapters said
    about where they were standing.

PART C — WHAT THIS OPENS

  What should I read next because of this — with the reason, not just
  the title. And, more usefully, WHAT SHOULD I NOT READ because this
  covered it. Name the specific books in my universe this makes
  redundant, and say what would have to be true for one of them to
  still be worth opening.

  If this book made a case I should now hear the other side of, name
  the strongest opposing book rather than a complementary one.

PART D — THE BOOK-LEVEL CONCEPT MAP

  One mermaid diagram of the whole argument. Relationships, not nouns,
  with labelled edges. Chapter-level nodes, not idea-level: this is the
  map of how the book hangs together, and the per-chapter maps already
  exist. Never hard-code a colour.

CONSTRAINTS

  Do NOT write my verdict. That line is mine.
  Do NOT tell me the book was worth reading.
  Do NOT congratulate me on finishing it.
  If the honest reading of the ledger is that nothing changed, say
  that plainly — it is the most valuable output this stage can produce
  and the least likely to be volunteered.
````

## The verdict is yours, and it is one of three

**changed something · confirmed something · entertainment**

All three are legitimate. **Only the first is growth**, and a shelf where every book "changed
something" is a shelf that has stopped being measured.

The test for "changed something" is not a feeling: it is a row in the ledger with `day30: running`
and a date on it. If nothing is running, the honest verdict is one of the other two, however good
the book was.

## Then, in Claude Code

```bash
/progress      # writes the book profile and reader-profile.md
/ledger        # reports the drift between actions and their day-30 outcomes
```

`/progress` **asks before it writes**. It never fills a cell by inference — an empty cell is a known
gap and a guessed one is indistinguishable from a real answer.
