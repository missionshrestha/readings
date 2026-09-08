/**
 * audit.mjs — the weekly report, and the checks the build cannot make.
 *
 *   node scripts/audit.mjs
 *
 * Two kinds of thing live here, and the split matters:
 *
 *   CONTROLS   re-run from scripts/guards.mjs so this and the build can never
 *              disagree about the rules. They already refuse the build; running
 *              them here means you can see them without waiting for one.
 *
 *   FINDINGS   things that are not defects but are worth knowing weekly. The
 *              drafts name four explicitly: validate frontmatter against the
 *              spec, rebuild the ledger, find broken cross-links, and list
 *              chapters stuck at `status: generated` for more than a week.
 *              The third is now the build's job (starlight-links-validator) and
 *              the second is a computed page, so what remains is here.
 *
 * NOTHING HERE WRITES. It reports, and every number it prints is read off a
 * file. `never write a fact you did not read in a file or hear from him this
 * session` applies to the agent using this output, not just to the ledger.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { parseUniverse } from './universe.mjs';
import {
	checkSensitivePrivacy,
	checkPathMatchesFrontmatter,
	checkVisibilityGate,
	checkNoHiddenRouteEmitted,
} from './guards.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'src', 'content', 'docs');
const SRC = join(ROOT, 'src');

const DAY = 86400000;
const now = new Date();

/* --- read every authored page ------------------------------------------- */

function walk(dir, out = []) {
	if (!existsSync(dir)) return out;
	for (const e of readdirSync(dir)) {
		const full = join(dir, e);
		if (statSync(full).isDirectory()) walk(full, out);
		else if (e.endsWith('.mdx') && !e.startsWith('_')) out.push(full);
	}
	return out;
}

function parseFrontmatter(file) {
	const raw = readFileSync(file, 'utf8');
	if (!raw.startsWith('---')) return {};
	const close = raw.indexOf('\n---', 3);
	if (close === -1) return {};
	const fm = raw.slice(3, close);
	const get = (n) => {
		const m = fm.match(new RegExp(`^${n}:\\s*(.*)$`, 'm'));
		return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
	};
	// Actions are a YAML list; counted rather than fully parsed, which is all
	// this report needs and avoids adding a YAML dependency.
	const actionIds = [...fm.matchAll(/^\s*-\s*id:\s*(.+)$/gm)].map((m) => m[1].trim());
	const committed = (fm.match(/^\s*committed:\s*true\s*$/gm) ?? []).length;
	const obstacles = (fm.match(/^\s*obstacle:\s*\S/gm) ?? []).length;
	const nowTier = (fm.match(/^\s*tier:\s*now\s*$/gm) ?? []).length;
	return { raw, fm, get, actionIds, committed, obstacles, nowTier };
}

const pages = walk(DOCS)
	.map((file) => ({ file, rel: relative(DOCS, file), ...parseFrontmatter(file) }))
	.filter((p) => p.rel.split('/').length >= 4); // authored only

/* --- the controls -------------------------------------------------------- */

/**
 * THE PRIVACY SWEEP is CONTROL 4, and since 2026-08-31 it lives in guards.mjs
 * and runs inside `npm run build` at astro:build:done.
 *
 * It used to live here, and that was the defect: this file printed "The build
 * refuses these too" underneath it, which was false. `npm run ci` is
 * `astro check && astro build`; audit.mjs is in neither, has no hook, and there
 * is no git hook in the repository. The only protection for personal material
 * about other people was a line a human had to remember to type.
 *
 * It is re-run here for the same reason the other three are: so this report and
 * the build can never disagree about the rules. What is added here and NOT in
 * the build is the SKIPPED state — the build always has a dist/, a weekly audit
 * may not, and "didn't run" is never "passed".
 */
function privacySweep() {
	const dist = join(ROOT, 'dist');
	if (!existsSync(dist)) return ['SKIPPED — no dist/. Run `npm run build` first.'];
	return checkNoHiddenRouteEmitted(dist, DOCS);
}

const controls = [
	['sensitive material carries an explicit private: decision', checkSensitivePrivacy(DOCS)],
	['frontmatter agrees with the path', checkPathMatchesFrontmatter(DOCS)],
	['every getCollection consumer routes through isPublished', checkVisibilityGate(SRC)],
	['no draft or private page has a route or an inbound link in dist/', privacySweep()],
];

/* --- findings ------------------------------------------------------------ */

const findings = [];
const notes = [];

// 1 · chapters stuck. The drafts' own failure mode: "chapters accumulate at
//     status: generated, three weeks later there are six unpublished chapters
//     and the site is a graveyard."
for (const p of pages) {
	const status = p.get?.('status');
	if (status !== 'generated' && status !== 'explained' && status !== 'recalled') continue;
	const age = Math.floor((now - statSync(p.file).mtime) / DAY);
	if (age > 7)
		findings.push(`${p.rel}\n      status: ${status}, untouched for ${age} days. Publish it or drop it.`);
}

// 2 · status values the schema deliberately tolerates. No field is an enum,
//     because a typo in a pasted chapter should not fail a build — so the cost
//     is that `complete`, `Complete` and `done` differ, and ONLY this says so.
const STATUS = new Set(['reading','generated','recalled','explained','complete','skipped','dropped','stub']);
for (const p of pages) {
	const s = p.get?.('status');
	if (s && !STATUS.has(s))
		findings.push(`${p.rel}\n      status: "${s}" is not a known value. It counts as not-complete everywhere, silently.`);
}

// 3 · reconciliation row 2 — one committed `now` per book.
const byBook = new Map();
for (const p of pages) {
	const book = p.rel.split('/').slice(0, 3).join('/');
	const cur = byBook.get(book) ?? { committedNow: 0, actions: 0, obstacles: 0, committed: 0 };
	cur.actions += p.actionIds?.length ?? 0;
	cur.committed += p.committed ?? 0;
	cur.obstacles += p.obstacles ?? 0;
	if (p.committed && p.nowTier) cur.committedNow += Math.min(p.committed, p.nowTier);
	byBook.set(book, cur);
}
for (const [book, c] of byBook) {
	if (c.committedNow > 1)
		findings.push(
			`${book}\n      ${c.committedNow} actions committed at tier: now. One at a time converts;\n` +
				'      adding intentions does not raise the conversion rate, it divides the attention.'
		);
	// reconciliation row 10 — a committed action must name its obstacle.
	if (c.committed > c.obstacles)
		findings.push(
			`${book}\n      ${c.committed} committed action(s) but only ${c.obstacles} obstacle(s) named.\n` +
				'      Picturing the outcome predicts WORSE attainment; naming what will actually\n' +
				'      stop you is the half with evidence behind it.'
		);
}

// 4 · permanent ids, duplicated. An id is the review key: two actions sharing
//     one means one review card silently tracks the wrong thing.
const ids = new Map();
for (const p of pages)
	for (const id of p.actionIds ?? []) {
		if (ids.has(id)) findings.push(`action id "${id}" appears in both\n      ${ids.get(id)}\n      ${p.rel}\n      An id is the review key and must be unique.`);
		else ids.set(id, p.rel);
	}

// 5 · a book directory whose title no longer derives to its slug. Book slugs
//     are frozen by the directory; a retitled book in universe.md orphans it.
const u = parseUniverse();
const known = new Set(u.books.map((b) => `${b.domain}/${b.cluster}/${b.slug}`));
const onDisk = new Set(pages.map((p) => p.rel.split('/').slice(0, 3).join('/')));
for (const d of onDisk)
	if (!known.has(d))
		findings.push(`${d}\n      has a directory but no entry in context/universe.md at that path.\n      Either the book was retitled (its slug is frozen by this directory) or it moved cluster.`);

/*
 * 6 · THE DERIVED FILES STILL MATCH THEIR GENERATOR.
 *
 * "Never hand-write a derived file" was a rule with no instrument. Measured
 * 2026-09-04: a plain `node scripts/gen-pages.mjs` rewrote 61 of the 102
 * committed map pages, because the generator had stopped emitting zero-count
 * chips and the committed pages still carried them. Nothing was broken and the
 * build was green, which is exactly why it went unnoticed.
 *
 * It is a FINDING and not a control, deliberately. A stale map page still
 * renders; refusing a deploy over a chip would block a chapter for a cosmetic
 * drift. This is the weekly report, which is the right altitude for it.
 */
try {
	execFileSync('node', [join(ROOT, 'scripts', 'gen-pages.mjs'), '--check'], {
		cwd: ROOT,
		stdio: 'pipe',
	});
} catch (e) {
	const out = String(e.stdout ?? '').trim();
	const files = out.split('\n').filter((l) => l.trim().startsWith('· ')).map((l) => l.trim().slice(2));
	findings.push(
		`${files.length} generated file(s) have DRIFTED from scripts/gen-pages.mjs.\n` +
			'      Run `node scripts/gen-pages.mjs`. A derived file edited by hand is a file\n' +
			'      the next run silently discards.\n' +
			files.slice(0, 8).map((f) => `        · ${f}`).join('\n') +
			(files.length > 8 ? `\n        … and ${files.length - 8} more` : '')
	);
}

// 7 · books started, for the report line.
const started = [...onDisk].length;

/* --- report -------------------------------------------------------------- */

console.log('\n  READINGS — audit\n');

let broken = 0;
for (const [name, problems] of controls) {
	console.log(`  ${problems.length ? 'FAIL' : ' ok '}  ${name}`);
	broken += problems.length;
	for (const p of problems) console.log(`          · ${p.split('\n')[0]}`);
}

console.log('\n  CORPUS');
console.log(`    books in the universe   ${u.books.length}`);
console.log(`    books started           ${started}`);
console.log(`    authored pages          ${pages.length}`);
console.log(`    actions extracted       ${[...byBook.values()].reduce((n, c) => n + c.actions, 0)}`);
console.log(`    actions committed       ${[...byBook.values()].reduce((n, c) => n + c.committed, 0)}`);

if (findings.length) {
	console.log(`\n  FINDINGS  (${findings.length})\n`);
	for (const f of findings) console.log(`    · ${f}\n`);
} else {
	console.log('\n  no findings.\n');
}

if (notes.length) for (const n of notes) console.log(`  note: ${n}`);

console.log(
	broken
		? `  ${broken} control violation(s). All four refuse the build — 1-3 before it\n` +
			'  renders, 4 after it writes dist/. This report never has the last word.\n'
		: '  all controls pass.\n'
);
process.exit(broken ? 1 : 0);
