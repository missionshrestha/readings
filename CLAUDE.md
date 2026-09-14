# Readings — agent entry point

A static, publicly deployed reading site. **One MDX file per chapter.** Built with Astro +
Starlight + Mermaid. The chapters are authored in Claude web chat and pasted in here; this
repository renders them, validates them, aggregates the ledger, and ships it.

**Your deliverable is the machine and the checks — never the chapter.** If you find yourself
writing what a chapter argues, stop: that is the output, not yours.

---

## Vocabulary — fixed, never improvised

| Level | Example | Role |
|---|---|---|
| **Part** | ⚡ I — The Engine | An arc of domains. 7. A heading on `/`, **never a page** |
| **Domain** | ⚙️ Self-Command | A life area. 16. A page. **Never a generation target** |
| **Cluster** | 1.3 · Attention, Dopamine & Digital Discipline | A question several books answer. 85. A page |
| **Book** | Deep Work | **One package.** One directory, one web-chat Project. 293 catalogued |
| **Chapter** | Ch 2 · Deep work is rare | **The unit of work. Always the generation target.** One page, one cycle |
| **Section** | The explanation layer | One fixed `##` on a chapter page. **Never a page** |
| **Sub-section** | Where the author was standing | One of the **ten** fixed `###` inside the explanation layer |
| **Action** | `dw-02-timeblock` | One IF–THEN leaf. Structured data. Rolls up to the ledger |

Full map: `context/universe.md` for part, domain, cluster and book; **`context/book-spec.md` for
the chapter map, the coverage law and the `book.json` shape**; `context/chapter-spine.md` for the
twelve fixed sections of one page.

**Everything below the book is decided at Stage 2 and nowhere else.** By the time a chapter is
generated, its order, what it argues, its weight in the argument and whether it is clarified at all
are already written down. Generation fills prose into a fixed shape. A chapter that had to invent
its own structure is evidence the brief was incomplete, and that defect is upstream.

---

## The reconciliation — read it once, before the first book

`context/protocol.md` was written **before** the two evidence reviews in `context/evidence/`, and
they contradict it in fourteen places. **`context/reconciliation.md` is operative wherever they
disagree**, and every row cites both sides by line number.

The five that change what you do:

1. **A closed-book `## Recall` comes before the explanation layer.** Retrieval, not rereading.
2. **One committed action per book**, not "no cap". **Two to ten actions are recorded per chapter**
   (his instruction, 2026-09-14); commitment is still one per book.
3. **One chapter per upload**, never the whole book.
4. **The question is asked before the position is stated** — sycophancy is triggered by conveying a belief.
5. **No counters anywhere in the chrome.** The ledger is the metric; the count is vanity.

---

## His second set of instructions — 2026-09-14

He read a complete sample book end to end and wrote down what had to change before real reading
starts. **`context/reader.md` §10 quotes all of it, and it is operative over anything older.** What
it changes for you:

| Changed | What you do about it |
|---|---|
| **Clarity over brevity, on every page he reads** — complete sentences, terms defined, an example beside every difficult idea, no length limit | Nothing to author. `/validate` reports the tells (`context/standards.md` §2b) as candidates, never as rewrites |
| **Every book shows its release date and major editions** — `published` and `editions` in `book.json` | `new-chapters.mjs` refuses a brief without them; `audit.mjs` reports drift. The page chrome renders them — never type them into a page |
| **The book page gains `## Author context` and `## Context then vs. context today`** — produced by `P2b` | `/scaffold` stamps the headings; `/validate` checks them after the paste (`context/book-spec.md` §6) |
| **Two to ten actions per chapter**; commitment still one per book | `/validate` and `audit.mjs` report it; the build never refuses it |
| **`## Dialogue` records the whole exchange** — five `###`, turns labelled `**Me:**` / `**AI:**` | `/validate` checks the five and the order (`context/chapter-spine.md` §6) |
| **`### What real readers say` reports clusters, counts and venues** — or THIN with the number | `/validate` flags a section with no N (`context/chapter-spine.md` §3b) |
| **Comments** — written while he reads on `npm run dev`, stored beside the page, published read-only; **a new comment starts local in the three sensitive domains** | **You never write, edit or paste one.** The dev server is the only writer (`scripts/comments-dev.mjs`) |
| **`reader.md` is never uploaded to a web-chat Project** — settled 2026-09-14 | It stays yours to maintain; it is not context for the model (`web-chat/01-SETUP.md` §3) |
| **Diagrams stay in the column, with Expand; Mermaid wherever it helps** | Charts need sourced numbers or an "illustrative" title (`context/source-rules.md` §3b) |
| **The site is public and meant to be shared** — secondary to learning | `GROWTH.md` holds the open decisions. **Build none of them until he chooses** |

---

## What YOU do, and what you do not

| You (Claude Code) | Not you |
|---|---|
| `/scaffold` a book's directory and one stub per chapter, from the agreed `book.json` | Writing what a chapter argues |
| `/validate` — `npm run ci` after every paste, and fix what breaks | **Authoring a chapter, or a book page** |
| Report a detached or unreadable comments file | **Writing, editing, reformatting or deleting a comment** |
| `/progress` — read the records, **ask what is missing, then write it** | Deciding whether he understood something |
| `/ledger` — report drift between actions and their day-30 outcomes | Writing an action, or an obstacle |
| `/deploy` — build, probe, push, confirm live | Choosing the next book |
| Maintain `reader-profile.md` and `context/books/<domain>/<cluster>/<book>.md` | Filling any cell by inference |

Authoring happens in Claude web chat: the book is uploaded there, its search is better, and prose
costs less. **Do not offer to author a chapter.** Asked to, say it belongs in web chat and offer to
validate the paste instead.

---

## Where things live

```
CLAUDE.md  WORKFLOW.md  DEPLOY.md         root — read every session
GUIDE.md                                  root — the runbook. HIS reference, but match it
GROWTH.md                                 root — the public side, and the decisions still HIS.
                                          Nothing in it is built until he chooses
SETUP.md                                  root — Phase 1 only. Never reopened after it passes
reader-profile.md                         root — the cross-book ledger. YOU maintain it
.nvmrc                                    24.18.0 — one of Cloudflare's two preinstalls
wrangler.jsonc                            the DEPLOY contract. Assets-only: NO `main`, ever
public/                                   site chrome ONLY — favicon, _headers, _redirects, audio/
.claude/skills/                           /scaffold /validate /progress /ledger /deploy
context/                                  the contract. Read what your task NAMES
  universe.md                             THE source of truth. 7/16/85/293, with frozen slugs
  reconciliation.md                       the 14 conflicts and which side wins
  protocol.md  evidence/                  the drafts, verbatim. Superseded where they conflict
  book-spec.md                            the book.json tree + the coverage law. Stage 2 only
  chapter-spine.md                        the twelve fixed sections of one page
  md-spec.md                              the authoring contract
  source-rules.md                         what a citation must BE, not just that one exists
  reader.md                               who he is. YOU maintain it
  templates/                              the four page shapes
  books/<domain>/<cluster>/<book>.md      the private book profile. NEVER under src/content/docs/
scripts/                                  universe · gen-pages · new-book · new-chapters
                                          · guards · audit · contrast · measure-type
                                          · prompt-words · synth-corpus (DEV ONLY, never committed)
                                          · book-dates (published/editions, shared by the
                                            scaffolder and the audit)
                                          · comments-dev (the ONLY comments writer; exists only
                                            in `astro dev`)
src/components/                           4 components + index.ts (`@components`)
src/overrides/                            Starlight chrome. NOT authoring components.
                                          ThemeSelect.astro is EMPTY ON PURPOSE — it deletes
                                          Starlight's own light/dark picker. Fact 16
                                          MarkdownContent.astro adds the comments payload and
                                          the read-only list. PageTitle.astro shows the dates
src/scripts/                              reader-annotations (comments, dialogue turns, diagram
                                          Expand) · text-index · comment-editor (DEV ONLY)
src/lib/                                  visibility · indexing · ledger
                                          · comments (read at render) · comments-shared (the one
                                            renderer, build and browser)
src/pages/                                robots.txt · llms-full.txt · [...slug]/index.md
                                          · shelf · ledger · review
src/generated/                            universe.json · nav-labels.json · book-slugs.md
src/content/docs/
  index.mdx                               ┐
  <domain>/index.mdx              × 16    │ GENERATED by gen-pages.mjs. Never hand-edit
  <domain>/<cluster>/index.mdx    × 85    ┘
  method/index.mdx + 4 × .md              context/ published verbatim. GENERATED. `.md` on
                                          purpose: 38 bare `<` in the sources
  elements.mdx                            every element on one page. THE RENDERING TEST — it is
                                          published, not draft, because fact 11
  404.mdx                                 hand-written, not generated. Four ways out and a search
                                          hint — Starlight's own carries none in <main>
  <domain>/<cluster>/<book>/              appears ONLY when a book is actually started
    index.mdx · book.json · <NN>-<chapter>.mdx
                                          index.mdx has TWO generated regions: BRIEF (whyNow and
                                          questions, straight from book.json) and CHAPTERS (the
                                          grid). Both written by --refresh
    <chapter>.comments.json               HIS comments, written only by the dev server.
                                          Never create, edit or delete one
```

**Read only what your task names.** `context/` is not preloaded. Never read the whole content tree.

---

## Stack facts that will bite you

Each of these fails **silently**. That is why they are here and not in a checklist.

1. **Astro 7's default Markdown engine is Sätteri, and it runs NO remark plugins.** A third-party
   remark transformer does nothing and still exits 0. `astro-mermaid` is safe only because it
   carries an explicit Sätteri branch. **Assert the rendered output after any upgrade, never that
   the plugin is present.**

2. **`<ClientRouter />` strips every attribute off `<html>` on navigation.**
   `astro/dist/transitions/swap-functions.js:46` removes them all and replaces them from the
   incoming document; only two `data-astro-*` survive. And it cannot self-heal, because
   `deselectScripts()` marks an already-run inline script `data-astro-exec` and will not re-run it.
   **Measured: without the fix, `data-reading-theme` and `data-focus` are gone after one chapter
   turn.** The fix is the `astro:after-swap` handler in `src/overrides/Head.astro`, which fires
   before paint — verified same-animation-frame, so there is no flash.

   Starlight's own `data-theme` survives WITHOUT help, and you cannot generalise from that:
   `StarlightThemeSelect`'s **constructor** re-applies it and custom elements are reconstructed on
   every swap. Our attributes have no element to heal them.

3. **`writing-mode: vertical-rl` swaps the logical axes.** Inside it, `inline-size` is the HEIGHT
   and `block-size` is the width. `/shelf` uses physical `width`/`height` for exactly this reason —
   every spine rendered as a horizontal bar until it did.

4. **`getComputedStyle().font` returns an empty string** unless every sub-property is set. A type
   probe that sets `span.style.font = cs.font` silently measures the browser default at 16px. The
   tell is an absolute advance that is constant across three different font sizes.
   `scripts/measure-type.mjs` sets the sub-properties.

5. **Starlight stamps `data-has-toc` on `<html>` whenever `route.toc` exists**, and
   `TwoColumnContent` keys a width calculation off it. Hiding the TOC with CSS leaves the attribute
   and the reading column keeps a 540px hole reserved beside it. The middleware sets
   `route.toc = undefined` instead.

6. **Asides never read the accent.** `asides.css` maps note/tip/caution/danger onto blue, purple,
   orange and red from five hue variables. Re-colour the accent and a `:::note` is still lavender.
   `custom.css` sets `--sl-hue-*`.

7. **MDX has no HTML comments.** `<!-- -->` is a parse error. And a literal `*/` inside `{/* */}`
   closes it early — which is why `safeComment()` in `new-chapters.mjs` rewrites it visibly.

8. **Bare `<` and `{` in prose are syntax, not text** — and the two fail differently, which is the
   part that matters. **Measured 2026-08-31:** `a < b` with spaces compiles fine; `a <b` is a hard
   parse error naming the line (*"Unexpected character after `<`, expected a valid JSX tag"*); and
   `{threshold}` is a **RUNTIME** `ReferenceError` thrown while rendering — so it only fires on a
   page that has a route. On a `draft: true` page it is invisible. Backticks fix all three.

9. **SVG attributes are camelCase in `.mdx` and kebab-case in `.astro`.** Asymmetric, and it matters
   which way you get it wrong: `.astro` fails loudly at `astro check`; `stroke-width` in `.mdx` is
   silently dropped and leaves hairline strokes on a green build.

10. **Components need blank lines around their inner content**, or the Markdown inside is not
    parsed as Markdown. It renders — just wrongly.

11. **A `draft: true` page's MDX is never syntax-checked — by anything.** A draft has no route, so
    Astro never compiles its body to JSX. **Probed 2026-08-31:** a deliberate `if (a < b)` outside
    backticks was appended to a draft page and `npm run ci` reported **0 errors, 107 pages**. The
    mermaid pre-processor still logs the file, which makes it look processed.
    **What this means for the loop:** a paste that lands while `draft: true` is still set is
    validated by nothing at all — `/validate` will say green and the errors appear later, when the
    flag flips, looking like a regression. **Flip `draft` first, then validate.** It is also why
    `src/content/docs/elements.mdx` is published rather than drafted: a control that is never
    compiled controls nothing.

12. **`starlight-links-validator` cannot see `.astro` pages**, so a link to `/shelf/`, `/ledger/` or
    `/review/` from any `.mdx` is reported as *"invalid link to custom page"* and **fails the
    build** — even though the path is correct. They are enumerated in the plugin's `exclude` in
    `astro.config.mjs`. A fourth computed view must be added there or every chapter that links to
    it fails. The exclusion is exact, never a wildcard, so a real typo still fails.

13. **Pagination is computed from the UNFILTERED sidebar before route middleware runs**, and the
    sidebar holds nothing but book chapters. Any page outside a book that uses `template: doc`
    therefore offers "Next: 3. Deep Work Is Rare" at its foot. The map pages hid this for months
    because `template: splash` drops the footer entirely. `starlightRouteData.ts` now clears
    `pagination.prev/next` for every non-book route.

14. **`themeCSS` is a JS template literal AND a CSS string, so it has two escaping traps and both
    are silent.** A backtick in one of its comments ends the string and the build dies pointing at a
    brace 150 lines away. **A literal `*/` in one of its comments closes the CSS comment early and
    swallows the next rule** — the build stays green, mermaid emits a stylesheet with that rule
    simply absent, and the only symptom is a colour that did not change. Same defect class as `*/`
    inside an MDX comment, which `safeComment()` already guards.

15. **Several mermaid diagram types write colour as an inline `fill` ATTRIBUTE**, so rules keyed on
    `.node`/`.nodeLabel` never reach them. Verified on `mermaid@11.17.2`: `quadrantChart` emitted
    `fill="#ECECFF"` panels with `fill="#131300"` text — light panels, near-black text, on a
    near-black page. `quadrantChart` also emitted `fill="hsl(240, 100%, NaN%)"` for its data points
    under `theme: 'base'` (invalid → SVG paints black), fixed by setting `quadrantPointFill`.
    **`timeline` text nodes carry the literal class string `"null"`**, so no `themeCSS` selector can
    reach them at all — their colour comes from `cScaleLabel0-5`, which must be set explicitly or
    mermaid picks black for two of the six sections.
    **The general rule: assert the rendered pixel, never the rule you wrote.** `/elements/` is where
    all four of these were found, and it found them in one pass.

16. **The site shipped TWO theme controls and nothing reconciled them, and it cost 1.06:1.**
    `data-reading-theme` (the Aa panel, four themes) decided the INK; Starlight's own light/dark
    picker wrote `data-theme`, which decided an aside's GROUND through hue arithmetic in
    `props.css:23` (dark) and `:143` (light). Measured through real UI clicks: Night via the Aa panel
    gave a `:::note` body at **10.38:1**; Night then Starlight's picker → Light gave **1.06:1**, and
    **it survived a reload** because both values persist. All four aside types failed together, and
    `:::note[Core message]` is mandated by `chapter-spine.md` — so it sat in a required section of
    every chapter. `contrast.mjs` reported 56/56 the whole time, because it reads `--rd-*` tokens and
    Starlight's arithmetic is not one.
    **Two independent fixes, because either alone leaves the class open:** `src/overrides/
    ThemeSelect.astro` renders nothing, so `data-theme` is now derived and divergence is
    structurally impossible; and the asides stopped reading `data-theme` at all, driven instead by
    twelve `--rd-aside-*` literals per theme that `contrast.mjs` can measure — which took it from 56
    pairs to 104. **A fix a script cannot re-check is a fix that comes back.**

17. **Starlight renders the `SocialIcons` override TWICE** — `Header.astro:26` and
    `MobileMenuFooter.astro:9` — and **which copy is visible depends on the viewport.** Measured: at
    1440/1024 the visible one is index 0, at 768/420 it is index 1. So `document.querySelector` in
    `ReaderControls.astro` picked the right one on desktop by coincidence and the wrong one on a
    phone: the session timer was unhidden inside the panel the reader was not looking at, and the
    one they had opened stayed `hidden: true`, `offsetParent: null`. **The timer simply did not exist
    on mobile, silently.** Same root cause made `id="rd-panel"` appear twice — invalid HTML, with
    `aria-controls` resolving to the hidden copy. Every lookup is `querySelectorAll` now, and the id
    comes from a per-render counter on `Astro.locals`.

18. **Starlight's markdown CSS puts `margin-top` on EVERY sibling, including
    yours** — `.sl-markdown-content :not(a,strong,…) + :not(a,strong,…)` in
    `@layer starlight.content`. A grid item's default `align-self` is `stretch`,
    so a `.ds-card` after the first got 16px of margin-top, the row stayed the
    same height, and **the second and third cards were pushed DOWN while the
    first was not.** Every card row on `/`, on all 16 domain pages and on all 85
    cluster pages came out bottom-aligned and visibly staggered. Measured
    2026-09-01: `card[0] y=588 h=157 mt=0px` · `card[1] y=604 h=141 mt=16px`.
    **A grid owns the spacing between its own children — that is what `gap` is.**
    `.ds-grid > * { margin-block-start: 0 }`.

19. **`em` INSIDE A HEADING DOES NOT MEAN WHAT YOU THINK, because Starlight
    wraps every heading in a div that carries a font-size.**
    `<div class="sl-heading-wrapper level-h2">` is set to `--sl-text-h2` (35px),
    and `em` on a `font-size` resolves against the PARENT's computed size — so
    `[data-reader] h2 { font-size: 1.32em }`, written to mean 1.32 x the 19px
    reading body, computed 1.32 x 35 = **46.2px**. Measured 2026-09-01 on a
    chapter page: **h1 42.0 · h2 46.2 · h3 31.9 · body 19.0.** The section
    headings were larger than the title of the page they were on, on every
    chapter in the site, and `margin-block-start: 2.4em` was inflated the same
    way. **Use `calc(var(--rd-size) * n)`**: it keeps the property `em` was
    chosen for — headings track the reader's Small/Normal/Large — and is immune
    to whatever a parent happens to be.

20. **Starlight hides the entire header right-group below 50rem** —
    `<div class="sl-hidden md:sl-flex … right-group">`, `Header.astro:24` — and
    `SocialIcons` is where this project mounts the ambience picker, the chapter
    drawer and the whole `Aa` panel. Below 800px it survives only in
    `MobileMenuFooter`, which lives inside the sidebar drawer. **A splash page
    has no sidebar, so it has no drawer, so it has no footer:** on `/`,
    `/shelf/`, `/ledger/`, `/review/` and all 102 generated map pages, a reader
    on a phone could not change the theme or the text size AT ALL. Not one tap
    away — absent. `custom.css` un-hides it (unlayered beats
    `@layer starlight.utils`) and hides the drawer-footer copy so exactly one is
    ever visible. **Verified at 1854/1280/1024/768/420/360 on four page kinds.**

21. **A custom drawer button can set every attribute correctly and still open
    nothing, because Starlight's own un-hider is a SIBLING selector.** Below
    `50em`, `.sidebar-pane`'s only path to visible is
    `:global([aria-expanded='true']) ~ .sidebar-pane` — `PageFrame.astro:62` —
    and it matches only an element that is itself a **sibling** of the pane.
    This project's chapter-drawer button lives in the header, mounted through
    `SocialIcons`, so it is never a sibling of anything. **Measured
    2026-09-01**: the button toggled `data-contents` on `<html>` and reported
    `aria-expanded="true"` — correct by every attribute a script could check —
    while `.sidebar-pane` stayed `visibility: hidden` and zero chapter links
    were reachable, on every book and chapter page below 800px. The fix writes
    Starlight's own `--sl-sidebar-visibility` custom property directly, which
    composes with their rule instead of needing to be its sibling.

22. **`astro-mermaid` DOES NOT SHIP A STYLESHEET — IT INJECTS ONE AT RUNTIME, AND IT
    WINS.** `astro-mermaid-integration.js:618` appends a `<style>` from a page script,
    so it lands after every stylesheet this project emits and is in no layer, which
    means `@layer` cannot demote it either. **One root cause, three visible defects,
    all silent, all invisible until the corpus had real diagrams in it:**
    it sets `border: none` and a `background-color` keyed on `[data-theme]` and
    `prefers-color-scheme` — so the "framed like a card" comment in `reading.css`
    described a frame that had not existed since the integration was added, and the
    diagram's ground tracked the OS rather than any of the four reading themes. And
    it sets **`display: flex`, which makes the SVG a FLEX ITEM**: a flex item shrinks
    to its container whatever width it is given, so `overflow-x: auto` had nothing to
    scroll and an inline `width: 2879px` set by hand still computed to `896px`.
    Combined with `useMaxWidth: true` and Starlight's own `svg { max-width: 100% }`
    (`markdown.css:75`), every `## Concept map` — a REQUIRED heading on every chapter
    — was scaled down instead of scrolled. **Measured 2026-09-04 across four authored
    chapters: 31%–62% at 1280px, and 12%–24% at 420px, with label text at 2.8–5.6px
    on a phone.** The fix is three places and none works alone: `useMaxWidth: false`
    on all five diagram types, `max-inline-size: none` + `block-size: auto` on the
    svg, and the frame rules re-declared at `html .sl-markdown-content pre.mermaid`
    with `!important` on the four properties the vendor actively fights for.
    **Diagnosed with CDP `CSS.getMatchedStylesForNode`, after two rounds of measuring
    a computed value with no visible cause** — when a computed style disagrees with
    every rule you can find, enumerate the matched rules rather than reading more CSS.
    **The layout part was replaced on 2026-09-14:** diagrams now sit inside the text
    column and open full screen with Expand (facts 24 and 30, `/elements/`). The
    runtime stylesheet, and the frame rules that fight it, are unchanged.

23. **A generated page can be the thing that leaks.** `readChapterFrontmatter()` in
    `new-chapters.mjs` read `draft` and not `private`, so a chapter carrying
    `draft: false, private: true` — the correct, intended combination for personal
    material — counted as *written* and got a real `<LinkCard>` in the chapter grid.
    Control 4 refused the build, correctly, naming the link. **The point is which side
    produced it:** an author who writes that link sees the refusal once and edits one
    page, whereas `--refresh` reintroduces it on every run, so the failure returns
    every time the grid is regenerated. A private chapter is now OMITTED from the grid
    rather than badged — a "Private" badge still puts the chapter's TITLE on a public
    page, which is half of what the control's own message names — and a count line
    replaces it, so the page does not claim a coverage it is not showing.

24. **astro-mermaid re-renders a diagram by replacing the `<pre>`'s innerHTML, on every theme
    change** — `astro-mermaid-integration.js:551`, fired by the `data-theme` observer at `:582`. So
    **anything placed inside `pre.mermaid` is deleted the first time the reader changes theme.** The
    Expand control lives in a `.rd-diagram` wrapper around the `<pre>`, and the full-screen view
    *moves* the `<pre>` into its dialog rather than cloning the SVG, because mermaid's arrowheads and
    `themeCSS` are scoped by the SVG's id.

25. **A class that sets `display` beats the browser's `[hidden]` rule.** The UA's
    `[hidden] { display: none }` is less specific than `.rd-btn { display: inline-flex }`, so an
    element with `hidden` correctly set still shows. **It bit twice on 2026-09-14** — the header
    comments button appeared on every page, and "Delete" appeared on a new comment — and was caught
    only by a screenshot. Every class here that sets `display` on something toggled with `hidden`
    carries a `[hidden]` override in `src/styles/annotations.css`.

26. **Starlight's reset removes the margin that centres a modal `<dialog>`.** `* { margin: 0 }`,
    `@astrojs/starlight/style/reset.css:8-10`. `showModal()` still works and the backdrop still
    draws — **the dialog just opens pinned to the top-left corner.** `.rd-ceditor` sets
    `margin: auto` back.

27. **`astro dev` and `astro preview` detach into a daemon in Astro 7.** The launching command exits 0
    within a second — *"Preview server running … Stop: astro preview stop"* — while the server keeps
    running. A background task reported as "completed" is therefore not a stopped server, and a
    probe that starts one must end with `astro dev stop` / `astro preview stop`.

28. **This site never renders Mermaid with `theme: 'base'`, whatever the config says.** astro-mermaid's
    `autoTheme` maps `data-theme` light to `default` and dark to `dark`
    (`astro-mermaid-integration.js:485-488`), and `Head.astro` always sets `data-theme`. Measured
    2026-09-14: sequence actor boxes painted `#ECECFF` in Day and `#1F2020` in Night — the stock
    themes' colours. Read fact 15's "under `theme: 'base'`" with that in mind: the fix held, the stated
    cause was wrong. Every colour that matters is set in `themeCSS` or as a complete nested
    `themeVariables` object — **a partial nested object (`xyChart`, `radar`, `cynefin`) replaces the
    defaults wholesale**, which was read in mermaid's code and not probed.

29. **`&` in `themeCSS` silently matches nothing.** Mermaid prefixes every rule with the diagram's id,
    and `&` resolves to that same id, so `& text` is emitted as `#mermaid-x #mermaid-x … text`. Green
    build, rule present in the stylesheet, xychart text still at 3.20:1. The SVG root cannot be
    selected from `themeCSS` at all — scope a rule by the diagram's own group classes.

30. **Two diagram types ignore the column's width.** `xychart` hard-codes `useMaxWidth: true`
    (`xychartDiagram-S5SC5T6Z.mjs:2080`), so it shrinks on a phone instead of scrolling; `gantt` lays
    out to the page BODY's width — 1278px at a 1280 viewport, then scaled to 4.4px text — until
    `useWidth` is set. Both are pinned in `astro.config.mjs`, and both were found only by measuring
    the rendered text size.

---

## The controls

These **refuse the build**. They are not lint, and each exists because the failure it prevents is
silent. `scripts/guards.mjs`, run from `astro.config.mjs` — controls 1–3 at `astro:build:start`,
control 4 at `astro:build:done`.

| | Refuses when |
|---|---|
| **1 · one visibility gate** | A file calls `getCollection('docs')` without going through `isPublished()`. Upstream found three of four consumers filtering differently, and one published draft source at HTTP 200 while the page was hidden |
| **2 · no silent default on sensitive material** | An authored page under `relationships-…`, `love-…` or `money-and-wealth` carries no explicit `private:` decision. Checked against the DIRECTORY, so a typo in the field being protected cannot evade it |
| **3 · the path validates the frontmatter** | A chapter's `domain`, `cluster` or `book` disagrees with its directory. This control is only possible BECAUSE routes are nested |
| **4 · the privacy sweep** | A `draft` or `private` page has a route in `dist/`, or anything in `dist/` links to one. **Runs at `astro:build:done`**, because it reads `dist/` and `dist/` does not exist before then |

**Control 4 moved into the build on 2026-08-31.** It lived in `audit.mjs`, which printed *"The build
refuses these too"* underneath it — and that was **false**: `npm run ci` is `astro check && astro
build`, `audit.mjs` is in neither, and there is no git hook. The only protection for personal
material about other people was a line a human had to remember to type, and the tool asserting
otherwise was the tool that found the leak.

**Control 1 was grep-shaped until the same day.** It tested whether the *string* `isPublished`
appeared anywhere in a file — so `// TODO: isPublished` in a comment passed, and so did
`void isPublished;`, which this repository actually contained. It now strips comments and counts
`isPublished(` calls that sit inside a `.filter()`, against the number of `getCollection('docs')`
calls. **All four were probed in both directions**; the probes are tabulated in `DEPLOY.md` §6c.

Plus two more that are not the build's job: `scripts/contrast.mjs` (**104** pairs across four
themes) and `scripts/audit.mjs` (the weekly report).

---

## Non-negotiables

- **Correctness over volume.** A chapter that ships wrong teaches confidently and he will not know.
- **Never state a fact you did not read this session.** Cite the anchor, not the page.
- **Retrieval before exposition.** `## Recall` is written closed-book, before the explanation layer.
  The AI never writes in it, and never in `## Open questions`.
- **Never ask him to visualise an outcome.** Picturing success predicts worse attainment — it is the
  strongest negative finding in the evidence base, and nothing on this site may contradict it.
- **Mark gaps `[ASSUMPTION: …]`.** Never guess a fact only he can supply.
- **The records are yours, the facts in them are his.** `reader-profile.md` and the book profiles are
  maintained by you, under one rule: **never write a cell you did not read in a file or hear from him
  this session. Ask, then write. An unasked cell stays empty.** An empty cell is a known gap; a
  guessed one is indistinguishable from a real answer.
- **Never hand-write a derived file.** The 102 map pages, the sidebar, `book-slugs.md`, the chapter
  grid, the book page's `BRIEF` region and the `OUTLINE`/`SPINE` regions are generated. Re-run the
  script; never edit between markers. **A chapter's `description` is derived too** — it is
  `book.json`'s `argues`, and `--outline` re-derives it and prints every change.
- **`.mdx` only, never `.md`.** Stock Starlight components plus exactly four custom ones. A fifth
  requires him to ask explicitly, in writing, in that session.
- **There is NO length budget, and this is his instruction, not an omission.** *"if a chapter is 10
  hour or unlimited long, you do it… Nothing happens if i don't finish a chapter."* Nothing here may
  size a chapter to a sitting, and `estMinutes` is descriptive. `context/reader.md` §2.
- **The transfer question is ADDITIVE, never subtractive.** *"you don't remove, alter the things that
  author wanted to say for original intent, you can give extra instead."* A chapter may describe
  where a claim's conditions differ; it may never conclude the claim does not apply to him. §4.
- **The SITE is public. The repository is private.** `private: true` excludes a page from `build`
  entirely. What the repo keeps private is `reader-profile.md`, `context/books/` and the git history.
- **Clear before short, on every page he reads.** *"The user must be able to interpret and understand
  every sentence produced."* `context/standards.md` §2b. You author none of it; you report the tells.
- **THE DESIGN SYSTEM IS FROZEN.** Four themes, one serif, one grid, one card, one chip, one spine,
  four components. It was built once, measured, and closed. Further UI work is logged to a deferred
  list and opened in a quarterly pass — the drafts name "building the site instead of reading" as
  *"the most sophisticated procrastination available to me"*, and that risk starts now, not later.
  **Opened once, on 2026-09-14, by his explicit written instruction** — comments, dialogue turns,
  diagram Expand and the book's dates, all as site chrome with no new colour and no fifth authoring
  component — **and closed again.** `GROWTH.md` is a list of decisions, not a backlog.

---

## Commands

```bash
npm run dev        # localhost. Drafts ARE visible here — that is what a stub is for — and it is
                   # the ONLY place comments can be written. Astro 7 detaches it: `astro dev stop`
npm run build      # THE VALIDATOR. Run after every paste
npm run preview    # the built site. file:// breaks Pagefind — always use preview
npm run check      # astro check
npm run ci         # astro check && astro build — EXACTLY what Cloudflare runs

node scripts/universe.mjs                    parse and verify the universe
node scripts/gen-pages.mjs                   regenerate the 102 map pages.
                                             RUN IT AFTER STARTING A BOOK — the
                                             cluster card is inert until you do
node scripts/gen-pages.mjs --check           writes nothing; reports drift. audit runs it
node scripts/new-book.mjs <d> <c> <b>         start a book
node scripts/new-chapters.mjs <d> <c> <b>     scaffold its chapters from book.json
node scripts/new-chapters.mjs <d> <c> <b> --refresh    after a paste
node scripts/new-chapters.mjs <d> <c> <b> --outline    after a brief amendment
node scripts/new-chapters.mjs <d> <c> <b> --spine       after a SPINE change
node scripts/audit.mjs                       the weekly report + all four controls
node scripts/contrast.mjs                    104 colour pairs across four themes
node scripts/prompt-words.mjs                every web-chat prompt against its 500-word floor
node scripts/prompt-words.mjs --stamp        write the measured count back into each file
node scripts/synth-corpus.mjs [--scale N]    DEV ONLY. Populate the site for testing
node scripts/synth-corpus.mjs --clean        and remove it. NEVER COMMIT synthetic files
```

`npm run build` IS the content validator: `starlight-links-validator`, the collection schema and
**all four** controls run inside it. There is no separate check.

Skills: `/scaffold <book>` · `/validate` · `/progress` · `/ledger` · `/deploy`

---

## Response economy

**Terse by default.** The files are the deliverable.

| The turn is mostly… | Reply like this |
|---|---|
| Scaffolding, validating, mechanical fixes | **Terse.** What changed, what is next. Under ~8 lines |
| A question, a judgment call, a trade-off | **Prose.** Reason it out and give a recommendation |
| A finding, a failure, a blocker, a refusal | **Prose, however terse the rest was** |

**Never compress a finding.** Every defect gets its file, its line, and why it matters. If a check
failed, say so and show the output. **"Didn't run" is never "passed."**
