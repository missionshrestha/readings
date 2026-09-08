# P5 — the dialogue

**Stage 7. A conversation, not a request.** Stay in it until the chapter is clear.

**Length: 750 words.** `node scripts/prompt-words.mjs` measures it; `--stamp` writes it back.

> **THE ORDER IS THE POINT, and it is the reverse of the drafted version.**
>
> The drafted `P5` asked you to fill in *my confusions*, *where it contradicted what I concluded*,
> *my pushback*. **Every field states a belief before the model answers**, and that is the exact
> input condition under which sycophancy is strongest:
>
> > Sycophantic agreement is triggered by the user **conveying a belief**. Withhold the belief and
> > the trigger is absent.
>
> So this runs in **two messages**, and the page records both in that order.

> **This prompt was 117 words** when it was measured on 2026-08-31 — the shortest in the library,
> and close to the ~50-word arm of the study that produced the 500-word rule. It was the prompt with
> the single most demanding job in the whole pipeline, written at a length the evidence calls the
> harmful configuration. Everything below exists because of that.

## Paste with it

`00-CONTEXT-PACK` ● · the chapter ● · `standards` ● · its `book.json` node ○ · `chapter-spine` ○ —
`GUIDE.md` Appendix A.

**Three messages, in this order, in this chat.** Not one message with three parts — the order is the
entire mechanism, and collapsing it removes the mechanism while keeping the headings.

---

## Message one — the question, alone

````text
On chapter [N]: [YOUR QUESTION, WITH NO POSITION ATTACHED]

Answer independently first. Do not ask me what I think yet, and do not
hedge toward an answer you think I want — I have deliberately not told
you my view, and if you can infer it from the phrasing of my question,
say so and answer the version you would give a stranger.

HOW TO ANSWER THIS ONE

· Commit. Give me the answer you actually think is right, not a
  balanced survey of possible positions. A survey is what a model
  produces when it is protecting itself against my disagreeing, and it
  is the failure mode this whole two-message shape exists to prevent.
· Say how confident you are, and on what basis: the chapter, the wider
  literature, your own reasoning, or a guess. Those are four different
  things and they read identically in prose.
· If the chapter is genuinely ambiguous on the point, say that it is
  ambiguous and say which reading you would defend and why. "It could
  mean either" is not an answer.
· Cite the chapter for anything you attribute to the author. If you
  need to reach outside it, say you are doing so.
· Do NOT compliment the question. Do NOT tell me it is a good one, an
  interesting one, or one that gets at something important. Answer it.
· Do NOT end by asking whether that helped, or offering to go deeper.
  I will ask.

If you find yourself writing "it depends", finish the sentence: on
what, and which way does it go in each case?

If you do not have this chapter, say so and stop. Do not answer from
what the book is generally understood to argue — that is the book's
reputation, and I can get that anywhere.
````

**Ask it as an open question.** *"What does this chapter argue about X?"* — never *"this chapter
argues X, right?"* If the question already contains the answer you expect, rewrite it before you
send it. This is the one step nobody does and the one that makes the rest of the stage worth
anything.

## Message two — your position, after it has committed

````text
Here is what I concluded, which I withheld until now:

[YOUR POSITION]

Now: where do we differ, and which of us is wrong?

RULES FOR THIS REPLY, AND I WILL BE CHECKING THEM

· Argue your side properly rather than converging on mine. If your
  first answer was right, defend it. Moving toward my position because
  I have now stated it is the exact failure I structured these two
  messages to prevent, and it will not read to me as agreement — it
  will read as you having had no position.
· If I am right, say so, and say WHY MY REASONING WAS BETTER THAN
  YOURS — which step you got wrong and what you should have noticed.
  "You make a good point" is not that. If you cannot name the step,
  you have not actually changed your mind.
· If we are both wrong, say that. It is the most useful outcome
  available here and the least likely one to be volunteered.
· Name the disagreement precisely. Is it about what the author meant,
  about whether the author is correct, or about whether it applies in
  my situation? Those three get confused constantly and they have
  completely different resolutions.
· Do not split the difference. A synthesis that neither of us actually
  holds is worse than an unresolved disagreement, because it ends the
  conversation without settling anything.
· It is a legitimate ending that neither of us moves. Say so plainly
  if that is where we are.
````

## Message three — the sceptic, when you are stuck

**Optional, and it lands in `### Where we ended up` or nowhere.** There is no fifth `###` for it, and
adding one is a defect: the four headings are anchors and anchors are contracts. If the sceptic
produced an objection that survived, it belongs in the last sub-section as what you ended up holding.
If nothing survived, it produced nothing to record, and that is a legitimate outcome of asking.

````text
Play a sceptic who thinks this chapter is wrong — not sloppy, not
overstated, WRONG. Give me the strongest version of that case, and do
not let me off it.

  · Attack the chapter's strongest claim, not its weakest.
  · Use the evidence: what has failed to replicate, what the author
    assumes about their own setting, what the argument needs to be
    true that it never establishes.
  · When I answer, push back on my answer at least twice before you
    concede anything.
  · Stay in character until I say stop. Do not soften into "of course,
    there is much of value here" — I have read the value; I am here
    for the objection.

At the end, and only at the end, step out of character and tell me
which of the sceptic's points you actually think survives.
````

---

## What lands on the page

Four `###` sub-sections under `## Dialogue`, in this order:

```
### What I asked
### What it said
### What I then argued
### Where we ended up
```

**If the page shows your position before the answer, the answer that follows it is suspect.** That
is what makes this section auditable a year later, and it is the only reason the shape is fixed.

`### Where we ended up` is allowed to record that nothing moved. *"I still think the objection
stands and it still thinks it doesn't"* is a better entry than a manufactured convergence — and a
`## Dialogue` in which the model agrees every time is evidence that the questions carried the
answers.

## Landed / Did not

| | |
|---|---|
| **Landed** | Message one committed to an answer and said on what basis — the chapter, the literature, its own reasoning, or a guess |
| **Did not** | A balanced survey of positions. That is what a model produces when it is protecting itself against your disagreeing, and it is the failure this two-message shape exists to prevent |
| **Landed** | In message two it defended its first answer, and named which step of yours was better if it moved |
| **Did not** | *"You make a good point."* If it cannot name the step, it has not changed its mind — it has stopped arguing |
| **Landed** | It named which KIND of disagreement this is: what the author meant, whether the author is right, or whether it applies to you |
| **Did not** | A synthesis neither of you holds. That ends the conversation without settling anything, which is worse than an open disagreement |
| **Landed** | The sceptic pushed back twice before conceding anything |
| **Did not** | *"Of course, there is much of value here."* It broke character at the first answer, which means it was never in character |

## If it comes back wrong

````text
You moved toward my position as soon as I stated it. Go back to the
answer you gave before I told you what I thought, and defend it — or
name the specific step where my reasoning beat yours. Converging
without naming the step reads to me as having had no position.
````

````text
You complimented the question. Delete that and answer it.
````

## Then

Write the four `###` into `## Dialogue` in the fixed order, and go to `P6`.

**Two rewrites is the limit.** On the third, start a new chat — a long transcript has accumulated
your own stated positions, which is exactly the condition sycophancy feeds on, and asking again more
firmly does not fix it. `reference/troubleshooting.md`.
