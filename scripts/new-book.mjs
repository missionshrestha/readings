/**
 * new-book.mjs — create a book's directory and its private profile.
 *
 *   node scripts/new-book.mjs <domain> <cluster> <book> [--kind read|reference|lifelong]
 *
 * Writes exactly TWO files, checked separately:
 *
 *   src/content/docs/<domain>/<cluster>/<book>/index.mdx   public
 *   context/books/<domain>/<cluster>/<book>.md             PRIVATE — never published
 *
 * The profile path MIRRORS THE CONTENT TREE rather than being flat
 * context/books/<book>.md, because two clusters can legitimately want the same
 * short name.
 *
 * REFUSAL IS PER FILE, not per run: a book scaffolded before the profile
 * mechanism existed can still get one. Only "both already exist" is fatal.
 *
 * A typo in a slug is a REFUSAL THAT PRINTS THE VALID SLUGS, never a guess. The
 * universe is the whitelist here, unlike the sibling project where the taxonomy
 * lists candidates — a book that is not in universe.md is not a book this system
 * knows about, and inventing a directory for it would put a page at a URL the
 * map can never link to.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseUniverse } from './universe.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'src', 'content', 'docs');
const TEMPLATES = join(ROOT, 'context', 'templates');

const KINDS = { read: 'BOOK', reference: 'REFERENCE', lifelong: 'LIFELONG' };

function fail(msg, list) {
	console.error(`\n  ${msg}\n`);
	if (list) for (const l of list) console.error(`    ${l}`);
	console.error('');
	process.exit(1);
}

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const kindArg = process.argv.find((a) => a.startsWith('--kind'));
const [domainSlug, clusterSlug, bookSlug] = args;

if (args.length < 3)
	fail('usage: node scripts/new-book.mjs <domain> <cluster> <book> [--kind read|reference|lifelong]');

const u = parseUniverse();

const domain = u.domains.find((d) => d.slug === domainSlug);
if (!domain)
	fail(`no domain "${domainSlug}" in context/universe.md. Valid domains:`, u.domains.map((d) => d.slug));

const cluster = domain.clusters.find((c) => c.slug === clusterSlug);
if (!cluster)
	fail(
		`no cluster "${clusterSlug}" in domain "${domainSlug}". Valid clusters:`,
		domain.clusters.map((c) => `${c.number}  ${c.slug}`)
	);

const book = cluster.books.find((b) => b.slug === bookSlug);
if (!book)
	fail(
		`no book "${bookSlug}" in cluster ${cluster.number}. Books in this cluster:`,
		cluster.books.map((b) => `${b.tier.padEnd(9)} ${b.slug}`)
	);

/* Default the kind from the universe's own flags, then let --kind override.
   A lifelong book is one the file already marks as such; guessing is not needed. */
let kind = book.flags.includes('lifelong') ? 'lifelong' : book.tier === 'reference' ? 'reference' : 'read';
if (kindArg) {
	const v = kindArg.includes('=') ? kindArg.split('=')[1] : process.argv[process.argv.indexOf(kindArg) + 1];
	if (!KINDS[v]) fail(`--kind must be one of: ${Object.keys(KINDS).join(', ')}`);
	kind = v;
}

const bookDir = join(DOCS, domain.slug, cluster.slug, book.slug);
const indexPath = join(bookDir, 'index.mdx');
const profilePath = join(ROOT, 'context', 'books', domain.slug, cluster.slug, `${book.slug}.md`);

const haveIndex = existsSync(indexPath);
const haveProfile = existsSync(profilePath);
if (haveIndex && haveProfile)
	fail(`"${book.slug}" already exists, both files. Nothing to do.\n  ${indexPath}\n  ${profilePath}`);

const yaml = (v) => JSON.stringify(String(v));
const written = [];

if (!haveIndex) {
	let tpl = readFileSync(join(TEMPLATES, `_TEMPLATE-${KINDS[kind]}.mdx`), 'utf8');
	// Replace only the frontmatter; the body is the template's and stays TODO.
	const end = tpl.indexOf('\n---', 4);
	const body = tpl.slice(end + 4);
	const fm = ['---', `title: ${yaml(book.title)}`];
	fm.push(
		`description: ${yaml(
			kind === 'reference'
				? 'A reference. Opened against a specific problem, never read through.'
				: kind === 'lifelong'
					? 'Not meant to be finished. A few pages at a time, for years.'
					: book.why.length > 150
						? book.why.slice(0, book.why.lastIndexOf(' ', 150)) + '…'
						: book.why
		)}`
	);
	if (book.author) fm.push(`author: ${yaml(book.author)}`);
	fm.push(
		`domain: ${domain.slug}`,
		`cluster: ${cluster.slug}`,
		`book: ${book.slug}`,
		`kind: ${kind}`,
		`tier: ${book.tier}`,
		`weight: ${book.weight}`,
		'status: reading',
		// Control 2: a sensitive domain must carry an EXPLICIT decision, so the
		// scaffold stamps one rather than leaving a hole someone forgets to fill.
		'private: false',
		'sidebar:',
		'  order: 0',
		'  label: The book',
		'---'
	);
	mkdirSync(bookDir, { recursive: true });
	writeFileSync(indexPath, fm.join('\n') + body);
	written.push(indexPath);
}

if (!haveProfile) {
	mkdirSync(dirname(profilePath), { recursive: true });
	writeFileSync(
		profilePath,
		[
			'---',
			`book: ${book.slug}`,
			`domain: ${domain.slug}`,
			`cluster: ${cluster.slug}`,
			`kind: ${kind}`,
			`tier: ${book.tier}`,
			`weight: ${book.weight}`,
			'started:',
			'finished:',
			'lastUpdated:',
			'---',
			'',
			`# ${book.title}${book.author ? ` — ${book.author}` : ''}`,
			'',
			'**PRIVATE.** Deliberately outside `src/content/docs/`, and it stays there. This file',
			'records what reading this book actually did, which is a different thing from what the',
			'public page says it argues.',
			'',
			'Maintained by Claude Code. **Never write a cell you did not read in a file or hear from',
			'him this session. Ask, then write. An unasked cell stays empty** — an empty cell is a',
			'known gap; a guessed one is indistinguishable from a real answer.',
			'',
			'---',
			'',
			'## Why this book, now',
			'',
			`From \`universe.md\`: *${book.why}*`,
			'',
			'His own reason, in his words:',
			'',
			'---',
			'',
			'## The gap',
			'',
			'| | |',
			'| --- | --- |',
			'| **Knowledge or execution** | |',
			'| **What would be different if it worked** | |',
			'',
			'Reading does not fix a doing problem. If this is an execution gap, the action stages',
			'carry the weight and the explanation layer is trimmed.',
			'',
			'---',
			'',
			'## Chapter state',
			'',
			'| # | Chapter | Status | Clarified | Recall done | Effort | Est |',
			'| --- | --- | --- | --- | --- | --- | --- |',
			'',
			'`Effort` is measured minutes and stays blank until he says a number. Copying `Est`',
			'into it destroys the only comparison the column exists to make.',
			'',
			'---',
			'',
			'## Actions committed',
			'',
			'| id | If — then | Obstacle | Started | Day 30 |',
			'| --- | --- | --- | --- | --- |',
			'',
			'---',
			'',
			'## What it changed',
			'',
			'One of: **changed something · confirmed something · entertainment.** All three are',
			'legitimate; only the first is growth.',
			'',
			'---',
			'',
			'## Open questions still unanswered',
			'',
			'Lifted from each chapter\'s `## Open questions`. Anything here longer than a week either',
			'gets asked in the book Project or gets deleted as not actually important.',
			'',
			'| Chapter | Question | Raised |',
			'| --- | --- | --- |',
			'',
		].join('\n')
	);
	written.push(profilePath);
}

console.log(`\n  ${book.title}${book.author ? ` — ${book.author}` : ''}`);
console.log(`  ${book.tier} · ${book.weight} · kind: ${kind}${book.flags.length ? ` · ${book.flags.join(', ')}` : ''}\n`);
for (const w of written) console.log(`    written   ${w.replace(ROOT + '/', '')}`);
if (haveIndex) console.log(`    kept      ${indexPath.replace(ROOT + '/', '')} (already existed)`);
if (haveProfile) console.log(`    kept      ${profilePath.replace(ROOT + '/', '')} (already existed)`);
console.log(`\n  url       /${domain.slug}/${cluster.slug}/${book.slug}/`);
console.log('\n  next');
if (kind === 'read') {
	console.log('    1  Stage 2 (BRIEF) in web chat produces book.json, with its release date and editions');
	console.log(`    2  save it to src/content/docs/${domain.slug}/${cluster.slug}/${book.slug}/book.json`);
	console.log(`    3  node scripts/new-chapters.mjs ${domain.slug} ${cluster.slug} ${book.slug}`);
	console.log('    4  node scripts/gen-pages.mjs');
	console.log('    5  Stage 2b (P2b) writes Author context and Context then vs. context today into index.mdx');
} else {
	console.log(`    1  Stage 2 (BRIEF, block B) produces book.json — a ${kind} book has no chapter map`);
	console.log('    2  node scripts/gen-pages.mjs');
	console.log('    3  Stage 2b (P2b) writes Author context and Context then vs. context today into index.mdx');
	console.log('    4  then append to its log as you consult it');
}
/*
 * THE gen-pages STEP WAS MISSING, AND IT IS NOT COSMETIC.
 *
 * gen-pages.mjs::startedBooks() scans this tree for `index.mdx` and decides two
 * things from it: whether a domain card on `/` carries the `reading` chip, and
 * whether the book's card on its own cluster page is a LINK or an inert card.
 * Until it is re-run, a book that has just been started is unreachable from the
 * map — the page exists, the sidebar knows it, and the only route to it is
 * search or a typed URL. MEASURED 2026-09-04: three books scaffolded, three
 * cluster pages still showing them as not started.
 *
 * The 102 map pages are committed files, so this is a real step somebody has to
 * take and not something the build can do. `node scripts/audit.mjs` reports the
 * drift weekly if it is forgotten.
 */
console.log('       — the 102 map pages are committed, and startedBooks() reads this tree.');
console.log('       Until it is re-run this book is not linked from its own cluster page.');
console.log('');
