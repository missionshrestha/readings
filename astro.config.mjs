// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightLinksValidator from 'starlight-links-validator';
import { isIndexable, NOINDEX_META } from './src/lib/indexing.ts';
import { bookSidebar } from './scripts/universe.mjs';
import { buildGuards } from './scripts/guards.mjs';
import { readFileSync } from 'node:fs';

/*
 * THE SINGLE PLACE THE PUBLIC ORIGIN APPEARS IN THIS REPOSITORY.
 *
 * Four things derive from this and nothing else:
 *   · <link rel="canonical"> and og:url        (Starlight)
 *   · every <loc> in the sitemap               (Starlight)
 *   · the Sitemap: line in /robots.txt         (src/pages/robots.txt.ts)
 *   · the URL header on every /llms-full.txt entry
 *
 * Never reintroduce a second, hardcoded copy: repointing the deploy would leave
 * it advertising the old hostname, silently.
 *
 * The subdomain is DERIVED, not guessed: the sibling project is live at
 * mylearnstack.missionshrestha.workers.dev, and a workers.dev subdomain is per
 * ACCOUNT, so the same account yields readings.missionshrestha.workers.dev.
 * Confirm it against the dashboard before the first deploy anyway — DEPLOY.md.
 *
 * Root path, no `base`. Serving from the root of its own subdomain is why the
 * base-path failure class cannot occur here.
 */
const SITE = 'https://readings.missionshrestha.workers.dev';

/*
 * A WRONG `site` FAILS NO CHECK. It type-checks, it builds, every internal link
 * validates, and wrangler dev serves it happily — while every page tells Google
 * the real page lives on a host that does not exist. Undoing it means waiting
 * for a re-crawl.
 *
 * A step in a runbook is not a control. This is, so the mistake cannot ship.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS USED TO BE, AND WHY IT WAS NOT A CONTROL
 *
 * Until 2026-08-31 the whole check was:
 *
 *     if (process.argv.includes('build') && SITE.includes('REPLACE-ME')) throw
 *
 * The placeholder had already been replaced, so the condition could never be
 * true again. It was a no-op wearing a comment that called itself a control —
 * and the mistake its own comment describes (a DERIVED but WRONG host) was the
 * one case it could not catch. DEPLOY.md said so in plain words the whole time.
 *
 * ---------------------------------------------------------------------------
 * WHAT IT CHECKS NOW, AND WHY EACH LINE CAN ACTUALLY FIRE
 *
 * 1 · It is a well-formed absolute https origin with no path, no query, no
 *     trailing slash and no port. Astro joins `site` with a path to build every
 *     canonical, so a stray trailing segment silently doubles up.
 * 2 · It is not localhost or an IP. Both parse, both build, both poison every
 *     canonical on the deployed site.
 * 3 · THE CROSS-CHECK, which is the part with teeth. A workers.dev origin is
 *     `https://<worker name>.<account subdomain>.workers.dev`, and the worker
 *     name is written down a second time, in wrangler.jsonc. So the first label
 *     of the host MUST equal wrangler's `name`. Rename the worker and forget
 *     `site` — or fix `site` and forget the worker — and the build refuses,
 *     naming both files. This is the only guard here that catches a value that
 *     is plausible, parses cleanly, and is wrong.
 *
 * The account subdomain (`missionshrestha`) is NOT asserted: nothing in this
 * repository knows it, and inventing an expected value would be a guess
 * enforced as a rule. DEPLOY.md 4b confirms it against the dashboard instead.
 *
 * PROBED IN BOTH DIRECTIONS 2026-08-31: with `name: "readings"` the build
 * passes; with SITE pointed at `https://reading.<sub>.workers.dev` (one letter
 * short) the build refuses and prints both values.
 *
 * Scoped to `build` deliberately: `astro dev` and `astro check` do not need a
 * real origin, and breaking them would just push someone to delete the guard.
 */
if (process.argv.includes('build')) {
	/**
	 * @param {string} why
	 * @param {string} fix
	 * @returns {never}
	 */
	const refuse = (why, fix) => {
		throw new Error(
			['', '  BUILD REFUSED — `site` in astro.config.mjs.', '', '  ' + why, '', '  ' + fix, '', '  DEPLOY.md section 4b.', ''].join('\n')
		);
	};

	/** @type {URL | null} */
	let parsed = null;
	try {
		parsed = new URL(SITE);
	} catch {
		parsed = null;
	}
	if (!parsed || parsed.protocol !== 'https:')
		refuse(
			`SITE is ${JSON.stringify(SITE)}, which is not an absolute https:// URL.`,
			'It generates every canonical, every og:url, every sitemap <loc> and the\n  Sitemap: line in /robots.txt. All four are absolute.'
		);
	const origin = parsed;
	if (origin.pathname !== '/' || origin.search || origin.hash || origin.port)
		refuse(
			`SITE is ${JSON.stringify(SITE)} — an origin only, please: no path, port, query or hash.`,
			'Astro joins `site` with each page path, so anything after the host is\n  duplicated into every canonical on the site.'
		);
	if (/^(localhost$|127\.|0\.0\.0\.0$|\[|\d+\.\d+\.\d+\.\d+$)/.test(origin.hostname))
		refuse(
			`SITE resolves to ${origin.hostname}, which is a local address.`,
			'Every deployed page would advertise a host nobody else can reach.'
		);

	/* The cross-check. Two files, one fact. */
	if (origin.hostname.endsWith('.workers.dev')) {
		const raw = readFileSync(new URL('./wrangler.jsonc', import.meta.url), 'utf8');
		/* jsonc: strip line comments before reading the one field we need. */
		const name = raw
			.split('\n')
			.filter((l) => !l.trim().startsWith('//'))
			.join('\n')
			.match(/"name"\s*:\s*"([^"]+)"/)?.[1];
		const label = origin.hostname.split('.')[0];
		if (!name)
			refuse(
				'wrangler.jsonc has no `name`, so the worker name cannot be cross-checked.',
				'Set `name` in wrangler.jsonc. It must equal the dashboard Worker name or\n  Workers Builds refuses the deploy.'
			);
		else if (name !== label)
			refuse(
				`SITE says the worker is "${label}" and wrangler.jsonc says it is "${name}".`,
				'A workers.dev origin is https://<worker name>.<account subdomain>.workers.dev,\n  so these two are the same fact written down twice. Fix whichever is stale —\n  astro.config.mjs SITE, or wrangler.jsonc "name".'
			);
	}
}

export default defineConfig({
	site: SITE,

	integrations: [
		/*
		 * THE CONTROLS. They refuse the build rather than warning, and they run
		 * before anything is rendered so a violation costs seconds rather than a
		 * deploy. scripts/guards.mjs says what each one prevents.
		 */
		buildGuards({
			docsRoot: './src/content/docs',
			srcRoot: './src',
		}),

		/*
		 * BEFORE starlight(): the integration has to see the ```mermaid fences
		 * before Starlight's own markdown handling claims them.
		 *
		 * Client-side rendering, deliberately. The build-time strategies
		 * (rehype-mermaid and friends) pull in Playwright or Puppeteer, which is
		 * slow locally and fragile in CI.
		 *
		 * THIS PACKAGE IS THE EXCEPTION TO THE "no third-party remark plugin"
		 * RULE, and only because it was checked. Astro 7's default engine is
		 * Satteri, which runs NO remark plugins, so a third-party remark
		 * transformer silently does nothing and still exits 0. astro-mermaid@2.1.0
		 * carries an explicit Satteri branch. Nothing else may be assumed to.
		 * ASSERT THE RENDERED OUTPUT after any upgrade — never that the plugin is
		 * present.
		 *
		 * Verified 2026-08-31 on astro-mermaid@2.1.0: it also registers an
		 * `astro:after-swap` listener (astro-mermaid-integration.js:607),
		 * unconditionally, so diagrams survive a client-side navigation. That is
		 * one of the five rows of the view-transition gate, and it passes.
		 *
		 * Full four-ground palette and themeCSS land in task 11; this is the
		 * minimum that renders correctly in both themes.
		 */
		mermaid({
			// Starlight writes data-theme="dark"|"light" onto <html>; autoTheme
			// watches it, which is what re-themes a diagram on the toggle without
			// a reload. Our four reading themes MAP ONTO those two values for
			// exactly this reason.
			autoTheme: true,
			// 'base' is the only theme that yields to themeVariables. The stock
			// 'default' and 'dark' themes ignore them.
			theme: 'base',
			enableLog: false,
			mermaidConfig: {
				/*
				 * THE FONT IS LOAD-BEARING, NOT COSMETIC.
				 *
				 * Mermaid MEASURES every label to size the box around it, then the
				 * browser PAINTS it. If those two use different fonts the box is cut
				 * to the wrong width and labels are clipped. A literal stack is used
				 * rather than a CSS variable, and `font-family` stays deliberately
				 * ABSENT from themeCSS so the mismatch cannot be reintroduced.
				 */
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
				/*
				 * useMaxWidth: false ON THE THREE THAT LAY OUT WIDE — AND IT IS A BUG
				 * FIX, NOT A PREFERENCE.
				 *
				 * `useMaxWidth: true` makes mermaid stamp `width: 100%` on the SVG, so
				 * a diagram wider than the column is SCALED DOWN rather than allowed to
				 * overflow. reading.css already gives `pre.mermaid` `overflow-x: auto`
				 * and says in its own comment that a diagram "scrolls inside its own box
				 * so the page body never scrolls horizontally" — but with width:100% the
				 * SVG can never exceed the box, so scrollWidth always equalled clientWidth
				 * and that scroll container had nothing to scroll. The CSS was written for
				 * one model and the config enforced the other.
				 *
				 * It is invisible on a stub and unmissable on a real chapter, which is why
				 * it survived until the corpus had content. MEASURED 2026-09-04, on the
				 * mandated `## Concept map` of four authored Deep Work chapters:
				 *
				 *   page                 viewBox   drawn   scale   median label
				 *   work-deeply           2879px   896px    31%     14px, min 7px
				 *   deep-work-is-valuable 1453px   896px    62%     13.9px
				 *   drain-the-shallows    1629px   896px    55%     12.4px
				 *   embrace-boredom       1716px   896px    52%     23.5px, min 11.7px
				 *
				 * and at 420px, which is the phone case:
				 *
				 *   work-deeply           2879px   356px    12%     5.6px, MIN 2.8px
				 *   drain-the-shallows    1629px   356px    22%     4.9px
				 *
				 * A 2.8px glyph is not a small diagram, it is a picture of one. And
				 * `## Concept map` is a REQUIRED heading on every chapter
				 * (context/chapter-spine.md §1), so this was every chapter in the corpus.
				 *
				 * With useMaxWidth false the SVG renders at its intrinsic size, overflows
				 * the framed box, and the box scrolls — the behaviour reading.css was
				 * already built for. The page body still never scrolls sideways, because
				 * the overflow is contained by `pre.mermaid`, and that is asserted by the
				 * OVERFLOW probe rather than assumed.
				 *
				 * ALL FIVE, not just the three that overflow. quadrantChart and pie lay
				 * out to a fixed box (500x500 measured) that already fits the column, so
				 * they never trigger the downscale — but the CSS override that frees the
				 * wide ones (`max-inline-size: none` in reading.css) cannot be aimed at
				 * one diagram type, and with `useMaxWidth: true` the quadrant carries
				 * `width="100%"` plus an inline `max-width: 500px`. Freeing the max-width
				 * and leaving the 100% made it STRETCH: measured 896x896 from 500x500, a
				 * 1.79x blow-up, with 32px labels. Intrinsic sizing everywhere is the only
				 * setting where one CSS rule is correct for every diagram, and a 500px
				 * diagram then simply centres inside the column.
				 */
				flowchart: { useMaxWidth: false, htmlLabels: true, nodeSpacing: 55, rankSpacing: 65, padding: 14 },
				mindmap: { useMaxWidth: false, padding: 14 },
				timeline: { useMaxWidth: false },
				quadrantChart: { useMaxWidth: false },
				pie: { useMaxWidth: false, textPosition: 0.6 },

				/*
				 * CATEGORICAL colour — set ONCE, identical in all four themes.
				 *
				 * A series colour is an IDENTITY. The same slice must be the same
				 * colour in Day and in Night, or a reader comparing two screenshots
				 * has to re-learn the legend.
				 *
				 * FOUR GROUNDS, NOT TWO: every fill clears 3:1 against warm white,
				 * cream, warm dark AND near-black, which is why these are desaturated
				 * mid-tones rather than bright ones. Minimum hue separation is 40
				 * degrees — an earlier attempt drew them from one family and two
				 * slices read as the same colour.
				 *
				 * HEX, NEVER hsl(). Mermaid parses plotColorPalette with .split(','),
				 * so an `hsl(174, 58%, 31%)` shreds into three invalid tokens — and
				 * SVG renders an invalid fill as BLACK.
				 */
				themeVariables: {
					fontFamily:
						'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
					fontSize: '15px',

					pie1: '#a8502f', pie2: '#3f7d6e', pie3: '#4a6fa5',
					pie4: '#8a5a9b', pie5: '#8a7233', pie6: '#4e7d43',
					pieStrokeWidth: '0px',
					pieOuterStrokeWidth: '0px',
					pieSectionTextColor: '#ffffff',
					pieSectionTextSize: '14px',

					cScale0: '#a8502f', cScale1: '#3f7d6e', cScale2: '#4a6fa5',
					cScale3: '#8a5a9b', cScale4: '#8a7233', cScale5: '#4e7d43',

					/*
					 * The label ON each of those six, and it has to be stated rather than
					 * left to mermaid.
					 *
					 * Timeline text nodes are emitted with the literal class string
					 * "null" — read off the live SVG — so NOTHING in themeCSS can select
					 * them, and mermaid falls back to deriving each label colour from its
					 * section. It chose black for sections 1 and 3: black on #3f7d6e is
					 * 3.0:1, and on #8a5a9b it is 3.4:1, against white's 4.9 and 4.4.
					 *
					 * All six cScale values are deliberately dark mid-tones chosen to
					 * clear 3:1 on four grounds, so white is correct on every one of
					 * them, in every theme. A label on a coloured node reads against the
					 * NODE, not the page, which is why this is categorical and static.
					 */
					cScaleLabel0: '#ffffff', cScaleLabel1: '#ffffff', cScaleLabel2: '#ffffff',
					cScaleLabel3: '#ffffff', cScaleLabel4: '#ffffff', cScaleLabel5: '#ffffff',

					/*
					 * quadrantChart's point fill, and it is a BUG FIX, not a preference.
					 *
					 * Left unset under `theme: 'base'`, mermaid derives it by doing
					 * lightness arithmetic on a variable it has not been given, and emits
					 *
					 *     fill="hsl(240, 100%, NaN%)"
					 *
					 * — read off the live SVG, not guessed. SVG renders an invalid fill as
					 * BLACK, so every plotted book was a black dot on a black ground in
					 * Dusk and Night, and an unexplained black dot in Day and Sepia.
					 *
					 * A point is a data identity, so it is categorical and does NOT flip.
					 */
					quadrantPointFill: '#a8502f',
					quadrantPointTextFill: '#a8502f',
				},

				/*
				 * STRUCTURAL colour — injected as CSS so it FLIPS with the theme.
				 *
				 * Grouped by WHAT THE THING IS, not by diagram type, because a label
				 * on a node and a label on the canvas need different colours and
				 * every diagram has both.
				 *
				 * font-family is DELIBERATELY ABSENT. Mermaid MEASURES every label to
				 * size the box around it and the browser PAINTS it; if the two use
				 * different fonts the box is cut to the wrong width and labels are
				 * clipped. Setting it here would reintroduce exactly that mismatch.
				 */
				themeCSS: `
					/* A. Anything that is a box on the canvas. */
					.node rect, .node circle, .node ellipse, .node polygon, .node path,
					.cluster rect, .stateGroup rect, .labelBox, .note,
					.mindmap-node, .section-node, .task {
						fill: var(--ds-mm-node-fill) !important;
						stroke: var(--ds-mm-node-stroke) !important;
						stroke-width: 1.25px !important;
					}

					/* B. Text INSIDE a node — reads against the node fill. */
					.nodeLabel, .nodeLabel p, .node .label, .node foreignObject div,
					.cluster-label, .cluster-label p, .stateGroup text,
					.noteText, .noteText tspan, .mindmap-node text, .taskText {
						fill: var(--ds-mm-node-text) !important;
						color: var(--ds-mm-node-text) !important;
					}

					/*
					 * C. Text ON the canvas — and it splits in two, because a TITLE and
					 * an AXIS TICK are different things wearing the same colour.
					 *
					 * Both were --ds-mm-label-text, which is --rd-muted. That is right
					 * for a tick and wrong for a title: a diagram title measured 2.36:1
					 * against the Night ground, which is below the 3.0 floor this project
					 * holds every other non-body element to.
					 */
					.titleText, .pieTitleText, .chart-title, .sectionTitle, .quadrantTitle {
						fill: var(--ds-mm-node-text) !important;
						color: var(--ds-mm-node-text) !important;
					}
					.legend text, .legend, .tick text, .axis text,
					.quadrant-point-text, .messageText {
						fill: var(--ds-mm-label-text) !important;
						color: var(--ds-mm-label-text) !important;
					}

					/* D. Every line: edges, transitions, axes, grids. */
					.edgePath .path, .flowchart-link, .transition, .relation,
					.tick line, .domain, .axis path, .axis line, .grid path,
					.mindmap-edge, .edge, .messageLine0, .messageLine1 {
						stroke: var(--ds-mm-line) !important;
					}

					/* Arrowheads are FILLED, not stroked — without their own rule
					   every arrow keeps Mermaid's stock colour. */
					.arrowheadPath, marker path, defs marker path, .marker {
						fill: var(--ds-mm-line) !important;
						stroke: var(--ds-mm-line) !important;
					}

					/* E. An edge label needs an opaque ground, or the edge it sits on
					   strikes straight through the words. */
					.edgeLabel, .edgeLabel p, .edgeLabel rect, .labelBkg,
					.edgeLabel foreignObject div, .label-container {
						background-color: var(--ds-mm-label-bg) !important;
						fill: var(--ds-mm-label-bg) !important;
					}
					.edgeLabel text, .edgeLabel span, .edgeLabel p {
						color: var(--ds-mm-label-text) !important;
						fill: var(--ds-mm-label-text) !important;
					}

					/* F. Alternating bands. */
					.section0, .section2, .sectionOdd {
						fill: var(--ds-mm-alt-fill) !important;
					}
					.section1, .section3, .sectionEven {
						fill: var(--ds-mm-canvas) !important;
					}

					/*
					 * G. quadrantChart writes its colours as INLINE fill ATTRIBUTES, so
					 * rules A–F never reached it: the four panels came out #ECECFF and
					 * their labels #131300 — light lavender panels with near-black text,
					 * on a near-black page. Legible in Day, unreadable in Night, and
					 * invisible to every check that does not look at the pixels.
					 *
					 * Found by /elements/, which is the entire reason that page exists.
					 * Its selectors are structural (.quadrants, .border, .data-points),
					 * not the generated mermaid-<n> ids, so they survive a re-render.
					 *
					 * TWO ESCAPING TRAPS LIVE IN THIS BLOCK, AND BOTH WERE HIT WRITING IT:
					 *
					 *   1 · This is a JS TEMPLATE LITERAL. One backtick in a comment ends
					 *       the string, and the build dies pointing at a brace 150 lines
					 *       away with no mention of the comment.
					 *   2 · This is also CSS. A literal star-slash inside one of these
					 *       comments closes it EARLY, and the first rule after it is
					 *       swallowed silently — the build stays green, mermaid emits a
					 *       stylesheet with that rule simply absent, and the only symptom
					 *       is a colour that did not change.
					 *
					 * The second is the same defect safeComment() in new-chapters.mjs
					 * exists to prevent in MDX, reached by a different road.
					 */
					.quadrants .quadrant rect {
						fill: var(--ds-mm-alt-fill) !important;
					}
					.quadrants .quadrant:nth-of-type(2n) rect {
						fill: var(--ds-mm-canvas) !important;
					}
					.quadrants .quadrant text,
					.labels .label text,
					g.title text {
						fill: var(--ds-mm-node-text) !important;
					}
					.border line {
						stroke: var(--ds-mm-line) !important;
					}
					.data-points circle {
						stroke: none !important;
					}

					/*
					 * A QUADRANT POINT'S LABEL IS NOT THE POINT. Same defect class as
					 * the timeline "null" class, reached by a different road.
					 *
					 * Block C above carries a .quadrant-point-text selector. Mermaid
					 * 11.17.2 EMITS NO SUCH CLASS — read off the live SVG, the label is
					 *
					 *     g.data-points > g.data-point > text[fill="#a8502f"]
					 *
					 * with class null. So the selector matched nothing and the label kept
					 * quadrantPointTextFill, which is the CATEGORICAL colour of the mark.
					 *
					 * (Both of those words were written inside backticks first, and the
					 * build died at astro.config.mjs:451 with a rolldown parse error
					 * pointing at line 188 — trap 1 of stack fact 14, live, in the exact
					 * block that documents it.)
					 *
					 * MEASURED 2026-09-04 on the Ch 4 quadrant, against the panel each
					 * label actually sits on: Day 4.55:1 and Sepia comparable, but Night
					 * and Dusk 3.61:1 — under the 4.5:1 floor this project holds text to,
					 * in two of four themes, and contrast.mjs cannot see it because it
					 * reads --rd-* tokens and this is an inline SVG attribute.
					 *
					 * The split the rest of this block already uses decides the fix: the
					 * 5px DOT is a data identity and stays #a8502f; its label sits on the
					 * canvas and reads against the canvas, so it is STRUCTURAL and flips
					 * with the theme like every other piece of text on a diagram.
					 */
					.data-points .data-point text,
					.data-points text {
						fill: var(--ds-mm-node-text) !important;
						color: var(--ds-mm-node-text) !important;
					}

					/*
					 * H. timeline draws its connector lines and its axis with stock
					 * pastels and a literal black — stroke="black" on the axis, which
					 * is a black line on a near-black ground. The node fills are left
					 * alone: those come from cScale0-5 and are categorical.
					 */
					.timeline-node line,
					.lineWrapper line,
					line[class*='node-line'] {
						stroke: var(--ds-mm-line) !important;
					}
				`,
			},
		}),

		starlight({
			title: 'Readings',
			description:
				'One book at a time — read, argued with, and acted on. 16 domains, 85 clusters, 293 books.',

			customCss: [
				'./src/styles/custom.css',
				'./src/styles/reading.css',
				'./src/styles/design-system.css',
			],

			/*
			 * Content is authored in a chat session that cannot see this
			 * filesystem, so a broken internal link is the EXPECTED failure mode,
			 * not an edge case. Every option is left at its installed default:
			 *
			 *   failOnError            true  — a bad link fails the build, loudly
			 *   errorOnRelativeLinks   true  — `../foo` is an error OUTRIGHT, never
			 *                                  resolved. A pasted ../../../ chain is
			 *                                  a guess web chat cannot verify, so
			 *                                  every internal link is root-absolute.
			 *   errorOnInvalidHashes   true  — `#anchor` must exist on the target
			 *   errorOnLocalLinks      true  — no localhost:4321 survives a paste
			 *
			 * Runs on `build` only; `dev` stays fast.
			 */
			plugins: [
				starlightLinksValidator({
					/*
					 * THE THREE COMPUTED VIEWS ARE `.astro` PAGES, NOT COLLECTION ENTRIES.
					 *
					 * The validator resolves a link by looking it up in the content
					 * collection. `/shelf/`, `/ledger/` and `/review/` are src/pages/*.astro
					 * routes, so they are not in it, and the plugin reports them as
					 * "invalid link to custom page" — which is the honest thing for it to
					 * say: it cannot see them, so it cannot vouch for them.
					 *
					 * WHY THIS MATTERS BEYOND THIS FILE: they are the natural targets for a
					 * cross-link in a pasted chapter ("the running actions are on the
					 * ledger"). Without this, every such paste fails the build with an
					 * error that reads like a typo in a path that is, in fact, correct.
					 *
					 * The exclusion is exact and enumerated, never a `/*` wildcard: a real
					 * typo like `/shelves/` must still fail. When a fourth computed view is
					 * added it goes here, and if it is ever forgotten the symptom is loud.
					 */
					exclude: ['/shelf/', '/ledger/', '/review/'],
				}),
			],

			components: {
				Head: "./src/overrides/Head.astro",
				// SocialIcons is empty in this project and renders in the header right
				// group beside the theme select. The controls must stay reachable when
				// the sidebar they open is hidden, so they cannot live inside it.
				SocialIcons: "./src/overrides/ReaderControls.astro",
				// Starlight ships no top nav, and the four computed views are otherwise
				// unreachable — no sidebar or card grid links a .astro route.
				SiteTitle: "./src/overrides/SiteTitle.astro",
				// Starlight's own PageTitle, plus the crumb a chapter page had
				// no way to show: measured 2026-09-01, the book's title appeared
				// nowhere in the document on any chapter page.
				PageTitle: "./src/overrides/PageTitle.astro",
				// EMPTY ON PURPOSE — it deletes Starlight's own light/dark picker.
				// Two theme controls wrote two attributes and nothing reconciled
				// them: a :::note body measured 1.06:1 when they disagreed. The file
				// itself carries the measurement and why removal beats syncing.
				ThemeSelect: "./src/overrides/ThemeSelect.astro",
			},

			/*
			 * DERIVED, never hand-written. One group per book that exists on disk,
			 * its chapters grouped by that book's own parts.
			 *
			 * NOT autogenerate. That resolves a DIRECTORY to a flat list, so a book's
			 * parts would reach the navigation nowhere and every chapter would land in
			 * one wall.
			 *
			 * THE CONSEQUENCE THAT MUST NOT BE UNDONE: an explicit list has to filter
			 * drafts ITSELF. A draft page does not exist in `build`, the link validator
			 * sees sidebar anchors like any other link, and a link to one fails the
			 * build. autogenerate never hit this because a draft is simply absent from
			 * the collection it enumerates. The filter is the BUILDING guard in
			 * scripts/universe.mjs.
			 *
			 * With no book started this is an empty array and no sidebar renders
			 * anywhere, which is correct: map pages are template: splash.
			 */
			sidebar: bookSidebar(),

			// Scopes the sidebar to the book being read and recomputes pagination.
			// See src/starlightRouteData.ts for what each of the three jobs prevents.
			routeMiddleware: "./src/starlightRouteData.ts",

			// "Edit this page" is OFF: the repository is private, so the URL would
			// 404 for every visitor. Restore it the day the repo goes public.
			// editLink: { baseUrl: '...' },

			head: [
				/*
				 * Keep a temporary host out of the search index. Derived from SITE,
				 * so it disappears by itself the day SITE becomes a real domain.
				 * src/lib/indexing.ts explains why this is a `noindex` tag and NOT a
				 * robots.txt `Disallow` — they are not the same instruction, and
				 * getting it backwards fails silently.
				 */
				...(isIndexable(SITE) ? [] : [NOINDEX_META]),
			],
		}),
	],
});
