#!/usr/bin/env node
/**
 * synth-corpus.mjs — DEV TOOL. Writes SYNTHETIC books and chapters into
 * src/content/docs so the reading room, the sidebar, /shelf, /ledger, /review
 * and build performance can be judged against a POPULATED corpus.
 *
 *   node scripts/synth-corpus.mjs                  ~8 books  — the reading walk-through
 *   node scripts/synth-corpus.mjs --scale full     all 293   — the performance run
 *   node scripts/synth-corpus.mjs --scale 40       40 books
 *   node scripts/synth-corpus.mjs --with-private   also emit private: true pages
 *   node scripts/synth-corpus.mjs --clean          remove EVERY file it wrote
 *
 * ---------------------------------------------------------------------------
 * WHY THIS EXISTS
 *
 * Exactly one book is scaffolded and all six of its chapters are `draft: true`,
 * so nothing is published below a book index. That means the property
 * src/starlightRouteData.ts exists to protect — PAGE WEIGHT STAYS FLAT AS THE
 * CORPUS GROWS — has never been measured here. It is quoted there from the
 * sibling project (648.4 KB -> 26.1 KB per page; 1.6 GB -> 91 MB of dist) as a
 * justification. A quotation is not a measurement.
 *
 * The sibling also records two defects that were invisible until entities
 * existed: breadcrumbs 404ing from every module page, and a sidebar that put
 * every entity's every module on every page. Neither could appear on an empty
 * corpus, and neither was found by the build.
 *
 * ---------------------------------------------------------------------------
 * HOW THIS DIFFERS FROM THE SIBLING'S VERSION, AND WHY IT HAD TO
 *
 * learn-anything-in-tech-system/scripts/synth-corpus.mjs `--clean` walks every
 * cluster directory the taxonomy declares and rmSync's EVERY directory inside
 * it, recursive and force, with no way to tell a synthetic entity from a real
 * one. Run in this repository it would delete the real Deep Work book.
 *
 * So:
 *   1. Every generated file carries `synthetic: true` in its frontmatter.
 *   2. Every directory created is recorded in a MANIFEST at .synth-corpus.json.
 *   3. `--clean` deletes ONLY what the manifest names, and re-checks the marker
 *      on disk before unlinking. A directory in neither state is REFUSED, named,
 *      and left alone. Both halves are probed — a manifest that has gone stale
 *      must not become a licence to delete content.
 *   4. A book whose directory already exists is SKIPPED, never overwritten.
 *
 * ---------------------------------------------------------------------------
 * THREE THINGS IT DELIBERATELY DOES NOT DO
 *
 * · It does not run gen-pages.mjs. Those 102 map pages are committed files, and
 *   regenerating them would leave the tree dirty after --clean. The consequence
 *   is that a cluster page will not link a synthetic book. Everything that
 *   actually needed populating — the sidebar, the reading frame, /shelf,
 *   /ledger, /review, page weight — is computed from the collection at build
 *   and populates without it.
 *
 * · It does not emit `private: true` unless asked (--with-private). As of
 *   2026-08-31 `private` does NOT exclude a page from the build (Starlight's
 *   route generator filters on `draft` alone), so a private page in the default
 *   corpus would make scripts/audit.mjs control 4 fail on every run and drown
 *   the walk-through in a finding that is already recorded. The flag exists to
 *   demonstrate that defect on purpose.
 *
 * · It writes no real prose. Bodies are obviously-synthetic filler at realistic
 *   LENGTH, because page weight and build time measured against one-line bodies
 *   are measured against something the real corpus will never resemble. Mermaid
 *   is the expensive part of a chapter build and one-line bodies never touch it.
 *
 * SYNTHETIC FILES ARE NEVER COMMITTED. Run --clean, then `git status`.
 */

import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseUniverse } from './universe.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'src', 'content', 'docs');
const MANIFEST = join(ROOT, '.synth-corpus.json');
const GIT_EXCLUDE = join(ROOT, '.git', 'info', 'exclude');

/*
 * A GENERATED DIRECTORY IS UNTRACKED BUT NOT IGNORED, and that gap is real:
 * MEASURED 2026-09-01, `git status --porcelain` listed all 16 synthetic book
 * directories as `??` after a normal run. `.gitignore` deliberately does not
 * match them — CLAUDE.md's own file map says why: they sit under
 * src/content/docs/ among real books, and no pattern can tell a synthetic
 * cluster from a real one without also hiding real content. That asymmetry is
 * why --clean is the mechanism at all. But it also means a broad `git add -A`
 * — exactly the kind of command a commit workflow runs — stages them.
 *
 * `.git/info/exclude` is the fix: it is per-repository, never committed
 * itself (it lives inside `.git/`), and unlike `.gitignore` it can hold EXACT
 * paths without needing a pattern that could also catch something real. Each
 * directory this run creates is appended between two marker lines; --clean
 * removes exactly that block. A generate-without-clean-first leaves stale
 * entries in the file, which is harmless — `git status` simply ignores a few
 * paths that no longer exist — so this never refuses to run.
 */
const EXCLUDE_START = '# BEGIN synth-corpus.mjs — do not edit by hand, see scripts/synth-corpus.mjs';
const EXCLUDE_END = '# END synth-corpus.mjs';

function readExcludeOutsideBlock() {
	if (!existsSync(GIT_EXCLUDE)) return [];
	const lines = readFileSync(GIT_EXCLUDE, 'utf8').split('\n');
	const start = lines.indexOf(EXCLUDE_START);
	const end = lines.indexOf(EXCLUDE_END);
	if (start === -1 || end === -1 || end < start) return lines;
	return [...lines.slice(0, start), ...lines.slice(end + 1)];
}

/** Appends the given repo-relative doc paths as an exact-match exclude block. */
function writeExcludeBlock(relDirs) {
	const outside = readExcludeOutsideBlock().filter((l) => l.trim() !== '');
	const block = relDirs.length
		? [EXCLUDE_START, ...relDirs.map((r) => `/src/content/docs/${r}/`), EXCLUDE_END]
		: [];
	const text = [...outside, ...block].join('\n') + (outside.length || block.length ? '\n' : '');
	if (!existsSync(dirname(GIT_EXCLUDE))) return; // not inside a git repo — nothing to do
	writeFileSync(GIT_EXCLUDE, text);
}

/** The marker. Present in every generated file; checked again before deletion. */
const MARK = 'synthetic: true';

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const valueOf = (f, dflt) => {
	const i = argv.indexOf(f);
	return i === -1 ? dflt : (argv[i + 1] ?? dflt);
};

/* ==========================================================================
 * --clean
 * ========================================================================== */

if (has('--clean')) {
	if (!existsSync(MANIFEST)) {
		console.log('\n  synth: no .synth-corpus.json — nothing was generated, so nothing is removed.\n');
		process.exit(0);
	}
	let manifest;
	try {
		manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
	} catch (e) {
		console.error(`\n  synth: .synth-corpus.json is unreadable (${e.message}).`);
		console.error('  REFUSING to delete anything. Remove the synthetic directories by hand,');
		console.error('  or restore the manifest. This tool never guesses which files are yours.\n');
		process.exit(1);
	}

	const removed = [];
	const refused = [];
	const missing = [];

	for (const rel of manifest.directories ?? []) {
		const dir = join(DOCS, rel);
		if (!existsSync(dir)) { missing.push(rel); continue; }

		/*
		 * THE SECOND CHECK, and it is the one that matters.
		 *
		 * The manifest says this directory is ours. Before deleting anything we
		 * ask the directory itself, because a manifest can go stale, be
		 * hand-edited, or survive a `git checkout` that restored real content
		 * over a synthetic path. Every .mdx inside must carry the marker. One
		 * file without it and the whole directory is refused.
		 */
		const files = readdirSync(dir, { recursive: true })
			.map((f) => join(dir, String(f)))
			.filter((f) => statSync(f).isFile() && f.endsWith('.mdx'));

		const unmarked = files.filter((f) => !readFileSync(f, 'utf8').includes(MARK));
		if (files.length === 0 || unmarked.length > 0) {
			refused.push({ rel, why: files.length === 0 ? 'no .mdx inside' : `${unmarked.length} file(s) carry no \`${MARK}\`` });
			continue;
		}

		rmSync(dir, { recursive: true, force: true });
		removed.push(rel);
	}

	/*
	 * THE MANIFEST SURVIVES A REFUSAL, holding exactly the entries that were
	 * refused. Found by probing this path: the first version unlinked it
	 * unconditionally, so a refusal destroyed the only record of what was left
	 * behind and a re-run had nothing to retry against. A cleanup tool that
	 * loses its own audit trail at the one moment something went wrong is worse
	 * than one that never had it.
	 */
	if (refused.length) {
		writeFileSync(MANIFEST, JSON.stringify({
			generated: manifest.generated ?? null,
			note: 'REDUCED BY --clean. These directories were REFUSED because they do not carry `synthetic: true`. Nothing here was deleted. Inspect them by hand; if they really are synthetic, add the marker or delete them yourself.',
			scale: manifest.scale ?? null,
			withPrivate: manifest.withPrivate ?? false,
			refusedAt: new Date().toISOString(),
			directories: refused.map((r) => r.rel),
		}, null, 2) + '\n');
	} else {
		unlinkSync(MANIFEST);
	}

	console.log(`\n  synth: removed ${removed.length} synthetic book director${removed.length === 1 ? 'y' : 'ies'}.`);
	if (missing.length) console.log(`  synth: ${missing.length} already gone.`);
	if (refused.length) {
		console.error(`\n  REFUSED to delete ${refused.length} director${refused.length === 1 ? 'y' : 'ies'} — they do not look synthetic:\n`);
		for (const r of refused) console.error(`    · ${r.rel}\n      ${r.why}`);
		console.error('\n  Nothing in that list was touched. Check them by hand.');
		console.error('  .synth-corpus.json was KEPT, reduced to just those entries.\n');
		// The refused directories are real content (or at least not provably
		// synthetic) — they stay OUT of the exclude block so `git status` still
		// reports them normally.
		writeExcludeBlock(refused.map((r) => r.rel));
		process.exit(1);
	}
	writeExcludeBlock([]);
	console.log('  synth: manifest deleted. Run `git status --porcelain` to confirm a clean tree.\n');
	process.exit(0);
}

/* ==========================================================================
 * generate
 * ========================================================================== */

if (existsSync(MANIFEST)) {
	console.error('\n  synth: .synth-corpus.json already exists — a corpus is already generated.');
	console.error('  Run `node scripts/synth-corpus.mjs --clean` first.\n');
	process.exit(1);
}

const scaleArg = String(valueOf('--scale', '8'));
const withPrivate = has('--with-private');

const u = parseUniverse();
const wanted = scaleArg === 'full' ? u.books.length : Number(scaleArg);
if (!Number.isFinite(wanted) || wanted < 1) {
	console.error(`\n  synth: --scale must be a positive number or "full", got "${scaleArg}"\n`);
	process.exit(1);
}

/** Chapters scale with the book's declared weight. S/M/L are real data. */
const CHAPTERS = { S: 5, M: 8, L: 12 };
/** Cycled so every declared diagram type is exercised across the corpus. */
const DIAGRAMS = ['mindmap', 'flowchart', 'graph', 'timeline', 'quadrant', 'journey'];

const esc = (s) => String(s).replace(/"/g, "'");
/** MDX-safe prose: a bare < or { is syntax, not text. */
const safe = (s) => String(s).replace(/[<{]/g, (c) => (c === '<' ? '‹' : '('));

function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
	return h >>> 0;
}
/** Deterministic, so two runs at the same scale are byte-identical. */
const pick = (slug, n, salt = 0) => (hash(slug + ':' + salt) % n);

function isoDaysAgo(n) {
	const d = new Date(Date.UTC(2026, 7, 31));
	d.setUTCDate(d.getUTCDate() - n);
	return d.toISOString().slice(0, 10);
}

const BANNER = [
	'{/* ============================================================',
	'     SYNTHETIC. GENERATED BY scripts/synth-corpus.mjs.',
	'     Not a chapter. Not content. Never committed.',
	'     Every word below is filler written to give the page realistic',
	'     WEIGHT so the reading frame and the build can be measured.',
	'     Remove with: node scripts/synth-corpus.mjs --clean',
	'     ============================================================ */}',
].join('\n');

const NOTICE = [
	':::danger[Synthetic page]',
	'This page was generated by `scripts/synth-corpus.mjs` to populate the corpus for testing.',
	'It is filler, not a chapter. Nothing on it was read, argued or decided.',
	':::',
].join('\n');

/** Filler at a realistic length — long enough that page weight means something. */
function paragraphs(seed, n) {
	const stock = [
		'This paragraph exists to occupy the reading column at a realistic width so the measured line length, the serif metrics and the paper grain can be judged against something other than a heading. It carries no argument and makes no claim.',
		'A second block of filler follows, because a chapter that renders as three short lines tells you nothing about how the frame behaves when a reader actually scrolls, and scrolling is most of what a reader does.',
		'The point of this text is its length and nothing else. Where a real chapter would carry the load-bearing claims of a book, this carries bytes, so that page weight measured against a populated corpus is measured against a page shaped like a real one.',
		'Filler again. If this reads as though it is avoiding saying anything, that is correct and deliberate: the machine that renders chapters is under test here, never the chapter.',
		'One more block, so that a section runs past the fold on a normal window and the drop cap, the margin notes and the quiet-mode chrome fade all have something to happen against.',
	];
	return Array.from({ length: n }, (_, i) => stock[(pick(seed, stock.length, i) + i) % stock.length]).join('\n\n');
}

function diagram(kind, title) {
	const t = safe(title).slice(0, 28);
	switch (kind) {
		case 'mindmap':
			return '```mermaid\nmindmap\n  root((' + t + '))\n    First branch\n      A leaf\n      Another leaf\n    Second branch\n      A leaf\n```';
		case 'flowchart':
			return '```mermaid\nflowchart TD\n  A[Start] --> B{A decision}\n  B -->|yes| C[One way]\n  B -->|no| D[The other]\n  C --> E[End]\n  D --> E\n```';
		case 'graph':
			return '```mermaid\ngraph LR\n  A[One] --- B[Two]\n  B --- C[Three]\n  C --- A\n  B --- D[Four]\n```';
		case 'timeline':
			return '```mermaid\ntimeline\n  title An arc\n  Early : first thing : second thing\n  Middle : third thing\n  Late : fourth thing : fifth thing\n```';
		case 'quadrant':
			return '```mermaid\nquadrantChart\n  title A two-axis comparison\n  x-axis Low --> High\n  y-axis Small --> Large\n  quadrant-1 One\n  quadrant-2 Two\n  quadrant-3 Three\n  quadrant-4 Four\n  Alpha: [0.7, 0.7]\n  Beta: [0.3, 0.6]\n  Gamma: [0.6, 0.25]\n```';
		default:
			return '```mermaid\njourney\n  title A sequence with a felt quality\n  section Opening\n    First step: 3: Reader\n    Second step: 4: Reader\n  section Later\n    Third step: 5: Reader\n```';
	}
}

/* -------------------------------------------------------------------------- */

const created = [];
let books = 0, chapters = 0, drafts = 0, privates = 0;

for (const book of u.books) {
	if (books >= wanted) break;
	const dir = join(DOCS, book.domain, book.cluster, book.slug);
	// NEVER overwrite. A real book's directory is left exactly alone.
	if (existsSync(dir)) continue;

	const nCh = CHAPTERS[book.weight] ?? 8;
	const parts = [
		{ slug: 'the-ground', title: 'The ground', order: 1, outcome: 'Say what the book is claiming and why it thinks so.' },
		{ slug: 'the-work', title: 'The work', order: 2, outcome: 'Run the thing the book asks for and say what happened.' },
	];
	const chs = Array.from({ length: nCh }, (_, i) => ({
		slug: `synthetic-chapter-${String(i + 1).padStart(2, '0')}`,
		title: `Synthetic chapter ${i + 1}`,
		order: i + 1,
		part: i < Math.ceil(nCh / 2) ? 'the-ground' : 'the-work',
		argues: `SYNTHETIC — filler standing in for what chapter ${i + 1} claims.`,
		weightInArgument: i % 3 === 0 ? 'load-bearing' : i % 3 === 1 ? 'supporting' : 'illustrative',
		estMinutes: 20 + (i % 4) * 10,
		verdict: i % 4 === 3 ? 'skim' : 'deep-dive',
		clarified: i % 3 === 0,
	}));

	mkdirSync(dir, { recursive: true });

	/* ---- book.json — bookSidebar() reads it for part titles ---- */
	writeFileSync(join(dir, 'book.json'), JSON.stringify({
		_synthetic: 'GENERATED BY scripts/synth-corpus.mjs. Not a brief. Never committed.',
		slug: book.slug, title: book.title, author: book.author ?? 'Unknown',
		domain: book.domain, cluster: book.cluster, clusterNumber: book.clusterNumber,
		tier: book.tier, weight: book.weight, kind: 'read',
		gap: books % 2 ? 'knowledge' : 'execution',
		familiarity: 'new',
		whyNow: 'SYNTHETIC.',
		questions: ['SYNTHETIC question one.', 'SYNTHETIC question two.', 'SYNTHETIC question three.'],
		outsideView: { replication: 'SYNTHETIC.', critics: 'SYNTHETIC.', agedBadly: 'SYNTHETIC.' },
		parts, chapters: chs,
		antiChapters: [{ title: 'A chapter deliberately not read', reason: 'SYNTHETIC.' }],
		inventory: { chapters: nCh + 1, read: nCh, skipped: 1 },
		exitCondition: 'SYNTHETIC.',
	}, null, 2) + '\n');

	/* ---- the book index ---- */
	writeFileSync(join(dir, 'index.mdx'), [
		'---',
		`title: "${esc(book.title)}"`,
		'description: "SYNTHETIC — a generated book page for corpus testing."',
		`author: "${esc(book.author ?? 'Unknown')}"`,
		`domain: ${book.domain}`,
		`cluster: ${book.cluster}`,
		`book: ${book.slug}`,
		'kind: read',
		`tier: ${book.tier}`,
		`weight: ${book.weight}`,
		'status: reading',
		'private: false',
		MARK,
		'sidebar:',
		'  order: 0',
		'  label: The book',
		'---',
		"import { Aside, Badge, Card, CardGrid, LinkCard } from '@astrojs/starlight/components';",
		'',
		BANNER,
		'',
		NOTICE,
		'',
		'## Why this book, now',
		'',
		safe(book.why ?? 'SYNTHETIC.'),
		'',
		'## The outside view',
		'',
		'SYNTHETIC. Nothing here was researched.',
		'',
		'## Chapters',
		'',
		'<CardGrid>',
		...chs.map((c) => {
			const isDraft = c.order % 7 === 0;
			return isDraft
				? `<Card title="${esc(c.title)}"><Badge text="Not written" variant="default" /></Card>`
				: `<LinkCard title="${esc(c.title)}" href="/${book.domain}/${book.cluster}/${book.slug}/${c.slug}/" description="SYNTHETIC." />`;
		}),
		'</CardGrid>',
		'',
	].join('\n'));

	/* ---- the chapters ---- */
	for (const c of chs) {
		const isDraft = c.order % 7 === 0;
		const isPrivate = withPrivate && c.order === 2;
		if (isDraft) drafts++;
		if (isPrivate) privates++;

		const seed = `${book.slug}-${c.slug}`;
		const kind = DIAGRAMS[pick(seed, DIAGRAMS.length)];

		const actions = c.order === 1
			? [
				'actions:',
				`  - id: ${book.slug.slice(0, 12)}-${String(c.order).padStart(2, '0')}-a`,
				'    if: "it is a synthetic trigger condition"',
				'    then: "I take a synthetic action"',
				'    trigger: "a stated time and place"',
				'    obstacle: "a named inner obstacle, written out in full"',
				'    tier: now',
				'    impact: "synthetic"',
				'    committed: true',
				`    started: ${isoDaysAgo(pick(seed, 90, 1))}`,
				`    day30: ${['not-yet', 'running', 'adapted', 'dropped'][pick(seed, 4, 2)]}`,
				`  - id: ${book.slug.slice(0, 12)}-${String(c.order).padStart(2, '0')}-b`,
				'    if: "a second synthetic condition"',
				'    then: "I do the second synthetic thing"',
				'    trigger: "another stated time"',
				'    tier: next',
				'    impact: "probably marginal"',
				'    committed: false',
			  ]
			: c.order % 2 === 0
			? [
				'actions:',
				`  - id: ${book.slug.slice(0, 12)}-${String(c.order).padStart(2, '0')}-a`,
				'    if: "a synthetic condition"',
				'    then: "I do a synthetic thing"',
				'    trigger: "a stated time"',
				`    tier: ${['next', 'later', 'reference'][pick(seed, 3, 3)]}`,
				'    impact: "synthetic"',
				'    committed: false',
			  ]
			: [];

		const body = [
			'---',
			`title: "Ch ${c.order} · ${esc(c.title)}"`,
			`description: "SYNTHETIC — generated chapter ${c.order} for corpus testing."`,
			'sidebar:',
			`  order: ${c.order}`,
			`book: ${book.slug}`,
			`author: "${esc(book.author ?? 'Unknown')}"`,
			`domain: ${book.domain}`,
			`cluster: ${book.cluster}`,
			`part: "${c.part}"`,
			`chapter: ${c.order}`,
			'kind: read',
			`tier: ${book.tier}`,
			`weight: ${book.weight}`,
			`clarified: ${c.clarified}`,
			'status: complete',
			`verdict: ${c.verdict}`,
			`read: ${isoDaysAgo(pick(seed, 120, 4))}`,
			`private: ${isPrivate}`,
			...(isDraft ? ['draft: true'] : []),
			MARK,
			...actions,
			'---',
			"import { Aside, Badge, Card, CardGrid, LinkCard, Steps, TabItem, Tabs } from '@astrojs/starlight/components';",
			"import { Recall, Actions, Passage, Margin } from '@components';",
			'',
			BANNER,
			'',
			NOTICE,
			'',
			'## Pre-context',
			'',
			paragraphs(seed + 'pre', 2),
			'',
			'<Margin label="A margin note">',
			'',
			'This floats into the outer margin above 1200px and collapses inline below it.',
			'',
			'</Margin>',
			'',
			'## Core message',
			'',
			':::note[Core message]',
			'SYNTHETIC — one sentence standing in for what this chapter argues.',
			':::',
			'',
			'## Key points',
			'',
			'- A synthetic load-bearing claim.',
			'- A second synthetic claim.',
			'- A third, so the list has shape.',
			'',
			...(c.clarified ? [
				'## The clarified chapter',
				'',
				paragraphs(seed + 'cl', 3),
				'',
				'<Aside type="note" title="What I cut, and why">',
				'',
				'SYNTHETIC. Nothing was cut, because nothing was written.',
				'',
				'</Aside>',
				'',
			] : []),
			'## Recall',
			'',
			'<Recall minutes={10}>',
			'',
			'SYNTHETIC. On a real page the reader writes this closed-book, before the explanation layer.',
			'',
			'</Recall>',
			'',
			'## The explanation layer',
			'',
			...['What the author is actually saying', 'Where readers get confused', 'The teaching pass',
				'What real readers say', 'What critics say', "What's been tested since",
				'How practitioners actually use it', "Where it doesn't transfer", 'The version to hold']
				.flatMap((h, i) => [`### ${h}`, '', paragraphs(seed + i, i === 0 ? 3 : 2), '',
					...(i === 2 ? ['<Passage at="p. 00">', '', 'SYNTHETIC — a quotation from the original book would sit here.', '', '</Passage>', ''] : [])]),
			'## Dialogue',
			'',
			'### What I asked', '', paragraphs(seed + 'q', 1), '',
			'### What it said', '', paragraphs(seed + 'a', 2), '',
			'### What I then argued', '', paragraphs(seed + 'r', 1), '',
			'### Where we ended up', '', paragraphs(seed + 'e', 1), '',
			'## Concept map',
			'',
			diagram(kind, c.title),
			'',
			'## Actions',
			'',
			'<Actions />',
			'',
			'## The 30-second version',
			'',
			paragraphs(seed + '30', 1),
			'',
			'## Open questions',
			'',
			'{/* Left empty deliberately, exactly as a real chapter would be. */}',
			'',
			'## Sources',
			'',
			'| Claim | Source | Read on |',
			'| --- | --- | --- |',
			'| SYNTHETIC | SYNTHETIC | 2026-08-31 |',
			'',
		].join('\n');

		writeFileSync(join(dir, `${c.slug}.mdx`), body);
		chapters++;
	}

	created.push(relative(DOCS, dir));
	books++;
}

writeFileSync(MANIFEST, JSON.stringify({
	generated: new Date().toISOString(),
	note: 'Written by scripts/synth-corpus.mjs. --clean deletes ONLY what is listed here, and only after re-checking the `synthetic: true` marker on disk. NEVER COMMIT THIS FILE OR THE DIRECTORIES IT NAMES.',
	scale: scaleArg,
	withPrivate,
	directories: created,
}, null, 2) + '\n');
writeExcludeBlock(created);

console.log(`\n  synth: ${books} books · ${chapters} chapters · ${drafts} draft · ${privates} private`);
console.log(`  synth: manifest at .synth-corpus.json`);
console.log(`  synth: ${created.length} director${created.length === 1 ? 'y' : 'ies'} added to .git/info/exclude — \`git status\` will not offer them`);
console.log(`\n  Remove with:  node scripts/synth-corpus.mjs --clean`);
console.log(`  NEVER COMMIT these files.\n`);
