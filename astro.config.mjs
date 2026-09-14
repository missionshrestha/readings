// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightLinksValidator from 'starlight-links-validator';
import { isIndexable, NOINDEX_META } from './src/lib/indexing.ts';
import { bookSidebar } from './scripts/universe.mjs';
import { buildGuards } from './scripts/guards.mjs';
import { commentsDev } from './scripts/comments-dev.mjs';
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
		 * THE COMMENTS WRITER, and it exists only in `astro dev`. It registers a
		 * dev-server middleware in `astro:server:setup`, a hook `astro build`
		 * never calls — so there is no endpoint in dist/ for anyone to find.
		 * scripts/comments-dev.mjs says what it refuses.
		 */
		commentsDev(),

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
			//
			// CORRECTED 2026-09-14: on this site 'base' is never the theme a diagram
			// is drawn with. autoTheme maps data-theme light -> 'default' and dark ->
			// 'dark' (astro-mermaid-integration.js:485-488, applied at :512), and
			// Head.astro always writes data-theme, so 'base' is only the fallback for
			// a page with no data-theme. Confirmed on the pixels: sequence actor boxes
			// rendered #ECECFF (default's primaryColor) in Day and #1F2020 (dark's
			// mainBkg) in Night. Both stock themes DO take themeVariables
			// (Theme.calculate, chunk-DU6HZSFF.mjs:794), but anything not stated
			// derives differently in light and dark, which is why every colour below
			// is stated rather than left to derive.
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
				 * EVERY TYPE, not just the three that overflow (five on 2026-09-04, all
				 * nineteen declared types on 2026-09-14). quadrantChart and pie lay
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
				/*
				 * THE THIRTEEN TYPES ADDED 2026-09-14, and journey, which was one of the
				 * six and never in this list. MEASURED on /elements/ in all four themes at
				 * 1280 and 420, with the diagram frame now INSIDE the reading column
				 * (reading.css): 561px of drawing room at 1280, 354px at 420.
				 *
				 * journey inherited useMaxWidth: true, so moving the frame into the column
				 * SHRANK it: 0.596 scale in the old 894px frame, 0.374 in the new one —
				 * 5.2px labels at 1280 and 3.3px at 420. Intrinsic now: 1500px, 14px
				 * labels, and it scrolls.
				 *
				 * pie's legend sat to the RIGHT, which made the svg 777px wide in a 561px
				 * frame: the legend labels were out of view and the title was cut at the
				 * frame edge. Legend below: 490x560, fits.
				 *
				 * The fixed-size charts are sized to the 560px column so they draw 1:1 at
				 * 1280 instead of being scaled or scrolled. Their stock sizes scaled them
				 * to xyChart 0.802 (11.2px labels), sankey 0.936, venn 0.702, cynefin 0.638
				 * (7px item text) and radar 0.802; treemap was 996px and scrolled.
				 * cynefin adds 40px of its own padding each side, hence 480. treemap's
				 * width is nodeWidth x 10 (SECTION_INNER_PADDING), hence 54.
				 *
				 * xyChart's useMaxWidth IS IGNORED. xychartDiagram-S5SC5T6Z.mjs:2080 calls
				 * configureSvgSize(..., true) unconditionally, so at 420 the chart is
				 * scaled to 354px (0.63, 8.8px labels) and its outermost x-axis label is
				 * cut at the svg edge. The flag is set anyway, so the day it is honoured
				 * nothing changes.
				 *
				 * gantt lays out to the width of the RENDER CONTAINER, which is the body,
				 * not the column: 1278px, then scaled to 0.439 — 4.4px text. useWidth pins
				 * it to 560.
				 *
				 * radar puts its legend at three quarters of (width/2 + marginRight) from
				 * the centre, so the legend's room is set by marginRight and not by the
				 * total width. At the default margins the axis labels ran outside the svg
				 * (Actionability to x=576 of 560, Durability from x=-3). At these margins
				 * the legend's "Make It Stick" ends at x=566 of 560 — drawn, because radar
				 * stamps overflow="visible", and inside the frame's padding.
				 *
				 * sequence: mirrorActors off drops the repeated actor row at the foot.
				 */
				pie: { useMaxWidth: false, textPosition: 0.6, legendPosition: 'bottom' },
				journey: { useMaxWidth: false },
				sequence: { useMaxWidth: false, mirrorActors: false },
				state: { useMaxWidth: false },
				gantt: { useMaxWidth: false, useWidth: 560 },
				block: { useMaxWidth: false },
				xyChart: { useMaxWidth: false, width: 560, height: 400 },
				sankey: { useMaxWidth: false, width: 560, height: 360 },
				radar: { useMaxWidth: false, width: 320, height: 320, marginTop: 80, marginBottom: 30, marginLeft: 60, marginRight: 180 },
				treemap: { useMaxWidth: false, nodeWidth: 54, nodeHeight: 36 },
				venn: { useMaxWidth: false, width: 560, height: 400 },
				ishikawa: { useMaxWidth: false },
				cynefin: { useMaxWidth: false, width: 480, height: 420 },

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

					/*
					 * pieOpacity, and it is a CONTRAST FIX. Mermaid paints every slice at
					 * 0.7. Over a light ground that LIGHTENS the categorical fill — #a8502f
					 * rendered #bf8167 — and the white percentage on it measured 2.81 to
					 * 3.21:1 in Day, MEASURED 2026-09-14. Over a dark ground it darkens the
					 * slice instead, under 3:1 against the page. At 1 the floors are 4.63:1
					 * for the label and 3.18:1 for a slice against the Dusk ground.
					 */
					pieOpacity: '1',

					/*
					 * THE THREE NESTED OBJECTS BELOW ARE COMPLETE ON PURPOSE. Theme.calculate
					 * (chunk-DU6HZSFF.mjs:794-806) assigns the overrides, derives every
					 * default, then assigns the overrides AGAIN, so a partial xyChart, radar
					 * or cynefin object would replace the derived one and every key left out
					 * would reach the renderer undefined. Read, not probed: they are supplied
					 * whole so it cannot happen.
					 *
					 * Every #888888 is a PLACEHOLDER that themeCSS blocks J, L and P replace
					 * with the flipping tokens. Nobody should ever see one; the day a block
					 * J selector stopped matching, xychart text rendered exactly #888888, at
					 * 3.20:1 on the Day ground.
					 *
					 * plotColorPalette is the categorical six, comma-joined WITHOUT spaces —
					 * the same .split(',') trap as the pie note above.
					 */
					xyChart: {
						backgroundColor: 'transparent',
						titleColor: '#888888', dataLabelColor: '#888888', legendTextColor: '#888888',
						xAxisTitleColor: '#888888', xAxisLabelColor: '#888888', xAxisTickColor: '#888888', xAxisLineColor: '#888888',
						yAxisTitleColor: '#888888', yAxisLabelColor: '#888888', yAxisTickColor: '#888888', yAxisLineColor: '#888888',
						plotColorPalette: '#a8502f,#3f7d6e,#4a6fa5,#8a5a9b,#8a7233,#4e7d43',
					},
					radar: {
						axisColor: '#888888', axisStrokeWidth: 1, axisLabelFontSize: 13,
						curveOpacity: 0.25, curveStrokeWidth: 2,
						graticuleColor: '#888888', graticuleStrokeWidth: 1, graticuleOpacity: 1,
						legendBoxSize: 12, legendFontSize: 13,
					},
					/*
					 * cynefin's stock domain colours are different under mermaid's default
					 * and dark themes, and this site uses both (see the theme note at the
					 * top of this block). Under dark, MEASURED 2026-09-14: item text #cccccc
					 * on #F57F17 at 1.75:1, and on #BF360C at 3.67:1. The five domains are
					 * now the categorical palette and the item text is white on them, floor
					 * 4.61:1 (Sepia, on #8a7233). The cliff is #a8502f rather than the stock
					 * #FF6B6B, which is 2.6:1 on the Day ground.
					 */
					cynefin: {
						domainFontSize: 16, itemFontSize: 12,
						boundaryColor: '#888888', boundaryWidth: 2,
						cliffColor: '#a8502f', cliffWidth: 4,
						arrowColor: '#888888', arrowWidth: 2,
						complexBg: '#3f7d6e', complicatedBg: '#4a6fa5', chaoticBg: '#a8502f',
						clearBg: '#8a7233', confusionBg: '#8a5a9b',
						textColor: '#ffffff', labelColor: '#ffffff',
					},
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

					/*
					 * I. timeline EVENTS SIT UNDER filter: brightness(120%), from mermaid's
					 * own .eventWrapper rule. It lifted each event box above its cScale
					 * colour — #a8502f painted as #ca6038 — and the white label on it
					 * measured 3.35 to 4.01:1 in ALL FOUR themes. MEASURED 2026-09-14; the
					 * defect was on /elements/ from the first pass and survived it, because
					 * the computed fill of the box was still #a8502f. Only the pixel said
					 * otherwise. Floor now 4.63:1.
					 */
					.eventWrapper {
						filter: none !important;
					}

					/*
					 * J. xychart paints an OPAQUE chart background (fill="#333" under the
					 * dark theme: a grey slab on the Night page) and writes every text and
					 * axis colour as an inline attribute. Scoped by its own group names,
					 * read off the live SVG: .main, .left-axis, .bottom-axis, .legend.
					 *
					 * NOT BY aria-roledescription, AND THAT WAS TRIED FIRST. The ampersand
					 * nesting selector resolves to the diagram id, and mermaid ALSO prefixes
					 * every rule with that id, so what reached the stylesheet was
					 *
					 *     #mermaid-x #mermaid-x[aria-roledescription="xychart"] text
					 *
					 * — the svg as a descendant of itself, which matches nothing. Green
					 * build, rule present, text still #888888 at 3.20:1. The svg element
					 * itself cannot be selected from themeCSS at all.
					 *
					 * MEASURED 2026-09-14 after: text floor 12.13:1, bars 3.18:1 and the
					 * line 3.61:1 against the Dusk ground, axes 3.39:1.
					 */
					.main > rect.background {
						fill: transparent !important;
					}
					.main > .chart-title text,
					.left-axis text, .bottom-axis text, .top-axis text, .right-axis text,
					.main > .legend text {
						fill: var(--ds-mm-node-text) !important;
					}
					.left-axis path, .bottom-axis path, .top-axis path, .right-axis path {
						stroke: var(--ds-mm-line) !important;
					}

					/*
					 * K. sankey. Its nodes are .nodes > .node > rect with NO class attribute,
					 * and that is what keeps flowchart, state and block out: every one of
					 * their node rects carries a class. Block A had painted these nodes
					 * --ds-mm-node-fill, erasing all five identities; mermaid's own d3
					 * Tableau10 colours are keyed by node name and are not this palette. The
					 * palette is assigned by position.
					 *
					 * The links are drawn with mix-blend-mode: multiply, which on a dark
					 * ground multiplies toward black: in Dusk and Night they were invisible.
					 *
					 * THE LINK BAND IS UNDER 3:1 BY NECESSITY, not by oversight. A node label
					 * is drawn over the band, and in Night no single band colour gives both
					 * band-on-ground 3:1 and ink-on-band 4.5:1 — the first needs relative
					 * luminance of at least 0.11, the second at most 0.10. The label wins.
					 * MEASURED 2026-09-14: band 1.82 to 2.11:1, labels floor 4.75:1 (Dusk),
					 * node bars floor 3.18:1.
					 */
					.nodes > .node > rect:not([class]) {
						stroke: none !important;
					}
					.nodes > .node:nth-child(6n+1) > rect:not([class]) { fill: #a8502f !important; }
					.nodes > .node:nth-child(6n+2) > rect:not([class]) { fill: #3f7d6e !important; }
					.nodes > .node:nth-child(6n+3) > rect:not([class]) { fill: #4a6fa5 !important; }
					.nodes > .node:nth-child(6n+4) > rect:not([class]) { fill: #8a5a9b !important; }
					.nodes > .node:nth-child(6n+5) > rect:not([class]) { fill: #8a7233 !important; }
					.nodes > .node:nth-child(6n+6) > rect:not([class]) { fill: #4e7d43 !important; }
					.links > .link {
						mix-blend-mode: normal !important;
					}
					.links > .link > path {
						stroke: var(--ds-mm-label-text) !important;
						stroke-opacity: 0.4 !important;
					}
					.node-labels text {
						fill: var(--ds-mm-node-text) !important;
					}

					/*
					 * L. radar. Its graticule is a FILLED circle, #DEDEDE at 0.3, so five
					 * stacked grey discs sat behind the curves and turned both into the same
					 * mud in Night. Rings are strokes now (3.39:1). A curve's identity is its
					 * 2px stroke (floor 3.18:1); its 0.25 fill is a tint and measures 1.23 to
					 * 1.41:1, deliberately. Legend swatches were half-opacity and are solid.
					 * Text floor 12.13:1. MEASURED 2026-09-14.
					 */
					.radarGraticule {
						fill: none !important;
						stroke: var(--ds-mm-line) !important;
					}
					.radarAxisLine {
						stroke: var(--ds-mm-line) !important;
					}
					.radarAxisLabel, .radarLegendText, .radarTitle {
						fill: var(--ds-mm-node-text) !important;
					}
					[class*='radarLegendBox'] {
						fill-opacity: 1 !important;
					}

					/*
					 * M. treemap. MEASURED 2026-09-14 in Day before: leaves at fill-opacity
					 * 0.3 under WHITE labels, 1.66:1; section labels white on the canvas,
					 * 1.11:1; section borders stock hsl lavender and yellow. Leaves are solid
					 * now, so white reads against the categorical fill (floor 4.63:1).
					 *
					 * The section VALUE carried a stroke in the line colour. Its computed
					 * fill was ink at 15.78:1 and its pixels measured 3.39:1 — a 10px glyph
					 * that is mostly outline. stroke: none, floor 4.81:1.
					 */
					.treemapSection {
						fill: transparent !important;
						stroke: var(--ds-mm-line) !important;
						stroke-opacity: 1 !important;
					}
					.treemapSectionHeader {
						fill: none !important;
					}
					.treemapSectionLabel, .treemapSectionValue {
						fill: var(--ds-mm-node-text) !important;
						stroke: none !important;
					}
					.treemapLeaf {
						fill-opacity: 1 !important;
					}
					.treemapLabel, .treemapValue {
						fill: #ffffff !important;
					}

					/*
					 * N. venn writes fills and label colours as INLINE STYLE, which only an
					 * important declaration beats. MEASURED 2026-09-14 in Day before: stock
					 * fills rgb(83,83,255), rgb(255,255,69) and rgb(181,255,32), and each set
					 * label coloured like its circle — rgb(171,171,0) on its own tint at
					 * 2.21:1. Circles are now the palette as a 0.16 tint with a full stroke
					 * (floor 3.18:1), every label is ink (floor 8.30:1).
					 *
					 * THE TITLE CLIPPED AT ANY WIDTH UNDER 1600. The renderer scales the title
					 * attribute by width/1600 (11.2px at 560) and places it at y = 32 x that
					 * scale, but mermaid's own stylesheet sets .venn-title to 32px, which
					 * beats the attribute: a 32px glyph centred 11px from the top.
					 */
					.venn-circle path {
						fill-opacity: 0.16 !important;
						stroke-opacity: 1 !important;
					}
					.venn-set-0 path { fill: #a8502f !important; stroke: #a8502f !important; }
					.venn-set-1 path { fill: #3f7d6e !important; stroke: #3f7d6e !important; }
					.venn-set-2 path { fill: #4a6fa5 !important; stroke: #4a6fa5 !important; }
					.venn-set-3 path { fill: #8a5a9b !important; stroke: #8a5a9b !important; }
					.venn-set-4 path { fill: #8a7233 !important; stroke: #8a7233 !important; }
					.venn-set-5 path { fill: #4e7d43 !important; stroke: #4e7d43 !important; }
					.venn-area text, text.venn-title {
						fill: var(--ds-mm-node-text) !important;
					}
					text.venn-title {
						font-size: 18px !important;
						dominant-baseline: hanging !important;
					}

					/*
					 * O. ishikawa. The head and the category boxes were stock #ECECFF under
					 * the default theme and #1F2020 under dark, with #333 bones in Day.
					 * MEASURED 2026-09-14 after: bones and box edges 3.39:1, text 11.61:1.
					 */
					.ishikawa-head, .ishikawa-label-box {
						fill: var(--ds-mm-node-fill) !important;
						stroke: var(--ds-mm-node-stroke) !important;
					}
					.ishikawa-spine, .ishikawa-branch, .ishikawa-sub-branch {
						stroke: var(--ds-mm-line) !important;
					}
					.ishikawa-head-label, .ishikawa-label {
						fill: var(--ds-mm-node-text) !important;
					}

					/*
					 * P. cynefin. The domain colours are themeVariables (see the note there);
					 * this block moves the text onto the flipping tokens. Domain tints are
					 * 0.4 and measure 1.49 to 1.64:1 as areas; the boundaries carry the
					 * shape at 3.39:1. Item boxes are solid so white text keeps 4.61:1.
					 */
					.cynefinDomainLabel, .cynefinSubtitle, .cynefinTitle, .cynefinArrowLabel {
						fill: var(--ds-mm-node-text) !important;
					}
					.cynefinItem {
						fill-opacity: 1 !important;
						stroke: none !important;
					}
					.cynefinItemText {
						fill: #ffffff !important;
					}
					.cynefinBoundary, .cynefinArrowLine, .cynefinConfusion {
						stroke: var(--ds-mm-line) !important;
					}

					/*
					 * Q. sequenceDiagram. Actor boxes were stock #ECECFF in Day. The box
					 * selector is rect.actor and NOT .actor, because the actor's LABEL is a
					 * text element carrying the same class: under .actor its computed fill
					 * was the box colour, 1:1, legible only because its tspan overrode it.
					 * MEASURED 2026-09-14 after: text floor 6.09:1, every line 3.39:1.
					 */
					rect.actor {
						fill: var(--ds-mm-node-fill) !important;
						stroke: var(--ds-mm-node-stroke) !important;
					}
					text.actor, text.actor tspan, .labelText, .labelText tspan, .loopText, .loopText tspan {
						fill: var(--ds-mm-node-text) !important;
					}
					.actor-line, .loopLine {
						stroke: var(--ds-mm-line) !important;
					}
					.activation0, .activation1, .activation2 {
						fill: var(--ds-mm-alt-fill) !important;
						stroke: var(--ds-mm-node-stroke) !important;
					}

					/*
					 * R. gantt. Mermaid sets .grid .tick to opacity 0.8, so the date labels
					 * computed at 6.09:1 and PAINTED at 3.07 to 4.00:1 — MEASURED 2026-09-14,
					 * the two numbers from the same glyphs.
					 *
					 * Block A's .task rule had also painted done, active and critical bars
					 * the same node fill, so a gantt could no longer say what was finished.
					 * Status is an identity, so it is categorical: done #3f7d6e, active
					 * #4a6fa5, critical #a8502f, white labels (floor 4.63:1). A label that
					 * does not fit its bar is drawn beside it on the canvas and carries BOTH
					 * classes, so the outside rule is text.taskTextOutside* — one more type
					 * selector than the white rule, and it wins.
					 */
					.grid .tick {
						opacity: 1 !important;
					}
					.grid .tick line {
						stroke-opacity: 0.45;
					}
					.task.done0, .task.done1, .task.done2, .task.done3 { fill: #3f7d6e !important; stroke: #3f7d6e !important; }
					.task.active0, .task.active1, .task.active2, .task.active3 { fill: #4a6fa5 !important; stroke: #4a6fa5 !important; }
					.task.crit0, .task.crit1, .task.crit2, .task.crit3,
					.task.activeCrit0, .task.activeCrit1, .task.activeCrit2, .task.activeCrit3,
					.task.doneCrit0, .task.doneCrit1, .task.doneCrit2, .task.doneCrit3 { fill: #a8502f !important; stroke: #a8502f !important; }
					.doneText0, .doneText1, .doneText2, .doneText3,
					.activeText0, .activeText1, .activeText2, .activeText3,
					.critText0, .critText1, .critText2, .critText3,
					.doneCritText0, .doneCritText1, .doneCritText2, .doneCritText3,
					.activeCritText0, .activeCritText1, .activeCritText2, .activeCritText3 {
						fill: #ffffff !important;
					}
					text.taskTextOutsideLeft, text.taskTextOutsideRight {
						fill: var(--ds-mm-node-text) !important;
					}

					/*
					 * S. stateDiagram. Block A's .node circle rule painted the start state
					 * the node fill, so the solid start dot became a hollow ring. MEASURED
					 * 2026-09-14: computed fill rgb(21,21,26) in Night. Ink now, 12.13:1.
					 */
					circle.state-start {
						fill: var(--ds-mm-node-text) !important;
						stroke: var(--ds-mm-node-text) !important;
					}

					/*
					 * T. journey. Its faces are cornsilk discs whose only edge is a stock
					 * #999 stroke: 2.57:1 on Day and 2.33:1 on Sepia, MEASURED 2026-09-14,
					 * so in the two light themes the face was barely a shape.
					 */
					circle.face {
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
				// Comments, dialogue turns and diagram Expand. Tokens only, no new colour.
				'./src/styles/annotations.css',
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
				// Starlight's, plus his comments on the page: the data the passages are
				// marked from, the read-only list, and the one client script for
				// comments, dialogue turns and diagram Expand. Chrome, not an authoring
				// component — added 2026-09-14, context/md-spec.md section 5d.
				MarkdownContent: "./src/overrides/MarkdownContent.astro",
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
