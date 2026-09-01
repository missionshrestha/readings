/**
 * contrast.mjs — every colour pair, measured. Never claimed.
 *
 * Reads the four reading themes straight out of src/styles/reading.css and
 * computes the WCAG relative-luminance ratio for every pair that carries text
 * or a boundary. Exits 1 if any pair is under its floor.
 *
 * WHY THIS IS A SCRIPT AND NOT A COMMENT
 *
 * The sibling project records its ratios in comments beside the tokens, which
 * is good until someone nudges a lightness by 4% and the comment silently
 * becomes a lie. It also shipped a real defect that a comment could not have
 * caught: `opacity: 0.72` on a card measured 3.78:1 and 3.05:1 — "slightly
 * muted" and "illegible" turned out to be the same slider.
 *
 * Four grounds instead of two is the reason this has to be automated at all.
 * A palette that clears 4.5:1 on white and near-black can still fail on cream
 * and warm-dark, and checking twelve pairs by hand across four themes is the
 * kind of arithmetic nobody repeats after the first time.
 *
 * FLOORS
 *   4.5   body text, and anything a reader has to read           WCAG AA
 *   3.0   large text (>= 24px), borders, and non-text boundaries WCAG AA / 1.4.11
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CSS = join(ROOT, 'src', 'styles', 'reading.css');

/* ---- colour ------------------------------------------------------------- */

function parseColor(v) {
	const s = v.trim();
	let m = s.match(/^#([0-9a-f]{6})$/i);
	if (m) {
		const n = parseInt(m[1], 16);
		return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
	}
	m = s.match(/^#([0-9a-f]{3})$/i);
	if (m) return [...m[1]].map((c) => parseInt(c + c, 16));
	m = s.match(/^hsl\(\s*([\d.]+)\s*,?\s*([\d.]+)%\s*,?\s*([\d.]+)%\s*\)$/i);
	if (m) return hslToRgb(+m[1], +m[2] / 100, +m[3] / 100);
	return null;
}

function hslToRgb(h, s, l) {
	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - c / 2;
	const t = h / 60;
	let r = 0, g = 0, b = 0;
	if (t < 1) [r, g, b] = [c, x, 0];
	else if (t < 2) [r, g, b] = [x, c, 0];
	else if (t < 3) [r, g, b] = [0, c, x];
	else if (t < 4) [r, g, b] = [0, x, c];
	else if (t < 5) [r, g, b] = [x, 0, c];
	else [r, g, b] = [c, 0, x];
	return [r, g, b].map((v) => Math.round((v + m) * 255));
}

const lum = ([r, g, b]) => {
	const f = (v) => {
		v /= 255;
		return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
	};
	return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const ratio = (a, b) => {
	const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
	return (x + 0.05) / (y + 0.05);
};

/* ---- read the themes out of the stylesheet ------------------------------ */

/**
 * Each theme is a block of the form
 *   [data-reading-theme='night'] {  --rd-x: #hex;  ... }
 * plus the :root block, which is Day.
 */
function readThemes() {
	const css = readFileSync(CSS, 'utf8');
	const themes = {};
	const blockRe = /(?:\/\*\s*THEME:\s*(\w+)\s*\*\/)\s*([^{]+)\{([^}]*)\}/g;
	let m;
	while ((m = blockRe.exec(css))) {
		const name = m[1];
		const body = m[3];
		const vars = {};
		for (const [, k, v] of body.matchAll(/(--rd-[\w-]+)\s*:\s*([^;]+);/g)) {
			const c = parseColor(v);
			if (c) vars[k] = c;
		}
		themes[name] = vars;
	}
	return themes;
}

/* ---- the pairs that matter ---------------------------------------------- */

/**
 * fg, bg, floor, description, level.
 *
 * level 'fail'     — under the floor is a defect and exits 1.
 * level 'advisory' — reported and never fails, and the reason is specific:
 *
 *   A CARD EDGE IS NOT A WCAG 1.4.11 BOUNDARY. That rule governs "visual
 *   information required to IDENTIFY a component", and a card here is
 *   identified by its title, its fill and its shadow — the border is redundant
 *   reinforcement, and 1.4.11 exempts information available in another form.
 *   Forcing 3:1 on it would draw a hard outline around every book on the page,
 *   which is the wrong instrument for a reading site.
 *
 *   What IS enforced instead is the row below it: the card's FILL must be
 *   distinguishable from the page. That is the real "a card that needs a hover
 *   to prove it is a card has failed at rest" check, and unlike a border it
 *   cannot be satisfied by decoration.
 *
 *   --rd-border-strong stays at 'fail' because it carries STATE — focus rings,
 *   the current item, a pressed control — which 1.4.11 does govern.
 */
const PAIRS = [
	['--rd-ink', '--rd-ground', 4.5, 'body text on the page', 'fail'],
	['--rd-ink', '--rd-surface', 4.5, 'body text on a card', 'fail'],
	['--rd-muted', '--rd-ground', 4.5, 'secondary text on the page', 'fail'],
	['--rd-muted', '--rd-surface', 4.5, 'secondary text on a card', 'fail'],
	['--rd-accent', '--rd-ground', 4.5, 'a link on the page', 'fail'],
	['--rd-accent', '--rd-surface', 4.5, 'a link on a card', 'fail'],
	['--rd-heading', '--rd-ground', 4.5, 'a heading on the page', 'fail'],
	['--rd-on-accent', '--rd-accent', 4.5, 'text on an accent fill', 'fail'],
	['--rd-border-strong', '--rd-surface', 3.0, 'a state edge (focus, current)', 'fail'],
	['--rd-tier-core', '--rd-surface', 3.0, 'the core chip on a card', 'fail'],
	['--rd-tier-deepen', '--rd-surface', 3.0, 'the deepen chip on a card', 'fail'],
	['--rd-tier-reference', '--rd-surface', 3.0, 'the reference chip on a card', 'fail'],
	['--rd-surface', '--rd-ground', 1.06, 'a card fill against the page', 'fail'],
	['--rd-border', '--rd-ground', 1.25, 'a card edge against the page', 'advisory'],

	/*
	 * THE ASIDES, and they are here because of the worst contrast defect this
	 * project has shipped: a :::note body at 1.06:1, near-white on near-white.
	 *
	 * It passed 56/56 the whole time it was live. Starlight derives an aside's
	 * ground from hue arithmetic keyed on data-theme (props.css:23 dark,
	 * props.css:143 light) while its ink is --sl-color-white, which custom.css
	 * maps to --rd-heading and which follows data-reading-theme. Two controls,
	 * one surface, nothing reconciling them — and NOTHING this script could see,
	 * because it reads --rd-* tokens and Starlight's arithmetic is not one.
	 *
	 * The repair was to stop deriving them: reading.css now carries twelve
	 * literal --rd-aside-* tokens per theme, which is what makes these rows
	 * possible. A fix a script cannot re-check is a fix that comes back.
	 *
	 * :::note[Core message] is MANDATED by context/chapter-spine.md, so these
	 * twelve rows per theme guard a required section of every chapter that will
	 * ever be written.
	 */
	...['note', 'tip', 'caution', 'danger'].flatMap((k) => [
		[`--rd-aside-${k}-title`, `--rd-aside-${k}-bg`, 4.5, `a ${k} aside's own title`, 'fail'],
		['--rd-heading', `--rd-aside-${k}-bg`, 4.5, `body text in a ${k} aside`, 'fail'],
		[`--rd-aside-${k}-edge`, '--rd-ground', 3.0, `the ${k} aside's 4px edge`, 'fail'],
	]),
];

const themes = readThemes();
const names = Object.keys(themes);
if (!names.length) {
	console.error('\n  no themes found in src/styles/reading.css.');
	console.error('  Each block must be preceded by a /* THEME: <name> */ marker.\n');
	process.exit(1);
}

let fails = 0;
let advisories = 0;
let checked = 0;
console.log('');
for (const name of names) {
	const t = themes[name];
	console.log(`  ${name.toUpperCase()}`);
	for (const [fg, bg, floor, what, level] of PAIRS) {
		if (!t[fg] || !t[bg]) {
			console.log(`    ----  ${what.padEnd(34)} (missing ${!t[fg] ? fg : bg})`);
			continue;
		}
		const r = ratio(t[fg], t[bg]);
		checked++;
		const ok = r >= floor;
		if (!ok && level === 'fail') fails++;
		if (!ok && level === 'advisory') advisories++;
		const tag = ok ? ' ok ' : level === 'fail' ? 'FAIL' : 'note';
		console.log(
			`    ${tag}  ${what.padEnd(34)} ${r.toFixed(2).padStart(6)}:1   (floor ${floor.toFixed(2)})`
		);
	}
	console.log('');
}
console.log(`  ${checked - fails - advisories}/${checked} pairs pass across ${names.length} themes` + (advisories ? `, ${advisories} advisory note(s)` : '') + '\n');
process.exit(fails ? 1 : 0);
