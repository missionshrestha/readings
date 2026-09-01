/**
 * measure-type.mjs — measure the reading face, rather than assuming it.
 *
 *   npx astro dev --port 4340
 *   node scripts/measure-type.mjs [url]
 *
 * Renders a known string in the ACTUAL computed font of the reading column and
 * reports the character advance and the resulting characters per line at each
 * of the three sizes.
 *
 * WHY THIS IS NOT A CONSTANT SOMEONE WROTE DOWN: the sibling project measured
 * 0.467em for its sans. Charter measures 0.4421em — 5.5% narrower — so reusing
 * that figure puts every line about six characters short of where it was meant
 * to be, and nothing anywhere would report it. `--rd-advance` in reading.css is
 * the output of this script and nothing else.
 */
/*
 * playwright is NOT a dependency of this project, deliberately. The CI contract
 * is `astro check && astro build`, and adding a browser download to every
 * npm install for a script that runs when the font stack changes — which is
 * roughly never — is the wrong trade.
 *
 * Run it with playwright available on NODE_PATH:
 *   NODE_PATH=/path/to/somewhere/node_modules node scripts/measure-type.mjs
 */
let chromium;
try {
	({ chromium } = await import('playwright'));
} catch {
	console.error(
		"\n  measure-type.mjs needs playwright, which this project does not depend on.\n" +
			"  Install it somewhere and point NODE_PATH at that node_modules, or run\n" +
			"  `npm i -D playwright` temporarily.\n"
	);
	process.exit(1);
}

const URL_ =
	process.argv[2] ??
	'http://localhost:4340/self-command/attention-dopamine-and-digital-discipline/deep-work/deep-work-is-valuable/';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(URL_, { waitUntil: 'networkidle' });

const rows = [];
for (const size of ['small', 'normal', 'large']) {
	for (const measure of ['narrow', 'normal', 'wide']) {
		await page.evaluate(
			([s, m]) => {
				document.documentElement.setAttribute('data-reading-size', s);
				document.documentElement.setAttribute('data-reading-measure', m);
			},
			[size, measure]
		);
		const r = await page.evaluate(() => {
			const el = document.querySelector('.sl-markdown-content p');
			const cs = getComputedStyle(el);
			const span = document.createElement('span');
			/*
			 * SET THE SUB-PROPERTIES, NEVER THE `font` SHORTHAND.
			 *
			 * getComputedStyle().font returns an EMPTY STRING unless every
			 * sub-property is set, so `span.style.font = cs.font` silently applied
			 * nothing and the span rendered in the browser default at 16px. The
			 * measurement came back constant at 8.40px absolute across three
			 * different font sizes, which is the tell: a real face scales.
			 */
			span.style.fontFamily = cs.fontFamily;
			span.style.fontSize = cs.fontSize;
			span.style.fontWeight = cs.fontWeight;
			span.style.fontStyle = cs.fontStyle;
			span.style.letterSpacing = cs.letterSpacing;
			span.style.fontFeatureSettings = cs.fontFeatureSettings;
			span.style.fontVariantNumeric = cs.fontVariantNumeric;
			span.style.position = 'absolute';
			span.style.whiteSpace = 'pre';
			span.textContent = 'abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz';
			document.body.appendChild(span);
			const advance = span.getBoundingClientRect().width / span.textContent.length;
			span.remove();
			const w = el.getBoundingClientRect().width;
			return {
				face: cs.fontFamily.split(',')[0].replace(/["']/g, ''),
				px: Math.round(parseFloat(cs.fontSize)),
				col: Math.round(w),
				advanceEm: +(advance / parseFloat(cs.fontSize)).toFixed(4),
				cpl: Math.round(w / advance),
			};
		});
		rows.push({ size, measure, ...r });
	}
}
await browser.close();

console.log(`\n  face: ${rows[0].face}\n`);
console.log('  size      measure   px   column   advance    cpl');
console.log('  ------------------------------------------------');
for (const r of rows)
	console.log(
		`  ${r.size.padEnd(9)} ${r.measure.padEnd(8)} ${String(r.px).padStart(3)}  ${String(r.col).padStart(5)}px  ${r.advanceEm.toFixed(4)}em  ${String(r.cpl).padStart(4)}`
	);
const bad = rows.filter((r) => r.cpl < 55 || r.cpl > 82);
console.log(
	bad.length
		? `\n  ${bad.length} combination(s) outside 55-82 cpl.\n`
		: '\n  every combination sits inside the comfortable band.\n'
);
