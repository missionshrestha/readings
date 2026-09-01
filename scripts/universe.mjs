/**
 * universe.mjs — THE ONE PARSER.
 *
 * context/universe.md  ->  { parts, domains, clusters, books }  ->  everything.
 *
 * 1 home page + 16 domain pages + 85 cluster pages + every book card + the
 * sidebar + nav-labels.json + book-slugs.md + _redirects all derive from this.
 * Nothing downstream re-reads the Markdown.
 *
 * ---------------------------------------------------------------------------
 * WHY EVERY STEP THROWS
 *
 * A half-parsed universe produces a PLAUSIBLE map with books silently missing —
 * a domain that quietly lost a cluster looks exactly like a domain that never
 * had one. There is no visual difference and no build error. So every step
 * die()s, and the totals below are asserted rather than trusted.
 *
 * THE FILE STATES ITS OWN TOTALS, which is what makes this checkable at all.
 * The numbers come from its "THE UNIVERSE AT A GLANCE" table and were confirmed
 * by counting on 2026-08-31.
 *
 * ---------------------------------------------------------------------------
 * SLUGS ARE READ, NOT DERIVED — after the one-time migration.
 *
 * Unlike the sibling project's taxonomy.md, universe.md shipped with NO slugs:
 * headings are `## DOMAIN 1 — SELF-COMMAND`, so a slug would have to be derived
 * from a title carrying emoji, `&`, `,` and `·`.
 *
 * A derivation rule that changes breaks every URL beneath it, silently, with a
 * green build. So `node scripts/universe.mjs --migrate` derives them ONCE and
 * writes them back into universe.md, after which this parser READS them and
 * REFUSES a heading without one. Slugs become explicit, hand-editable and
 * permanent — the same reason an action id is permanent.
 *
 * Book slugs are the exception: they are derived from the title and FROZEN by
 * the directory new-book.mjs creates. audit.mjs reports a book directory whose
 * title no longer derives to it.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const UNIVERSE = join(ROOT, 'context', 'universe.md');

/* --------------------------------------------------------------------------
 * The declared totals. Read off universe.md's own summary table.
 * Change one of these ONLY when the file itself changes and you have recounted.
 * ------------------------------------------------------------------------ */
const EXPECTED = {
	parts: 7,
	domains: 16,
	clusters: 85,
	books: 293,
	core: 73,
	deepen: 124,
	reference: 96,
	crossRefs: 16,
};

const TIERS = { '🔴': 'core', '🟡': 'deepen', '🔵': 'reference' };
const WEIGHTS = new Set(['S', 'M', 'L']);
/** Flag glyph -> name. Kept as explicit strings: several carry a U+FE0F
 *  variation selector and one is a two-codepoint regional-indicator pair, both
 *  of which a regex character class gets wrong. */
const FLAGS = {
	'⚠️': 'caveat',
	'♾️': 'lifelong',
	'🆓': 'free',
	'🇳🇵': 'ground',
};
const ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7 };

function die(line, msg, raw) {
	const where = line === null ? '' : ` at context/universe.md:${line}`;
	throw new Error(
		`\n  universe.md could not be parsed${where}\n  ${msg}` +
			(raw ? `\n\n  > ${raw}\n` : '\n') +
			'\n  Refusing rather than guessing: a half-parsed universe renders a\n' +
			'  plausible map with books silently missing.\n'
	);
}

/* --------------------------------------------------------------------------
 * Slugs
 * ------------------------------------------------------------------------ */

/** Title -> kebab slug. `&` becomes `and`; apostrophes vanish rather than
 *  becoming separators, so "Poor Charlie's" is poor-charlies, not poor-charlie-s. */
export function slugify(input) {
	return String(input)
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')      // strip diacritics
		.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu, ' ')
		.toLowerCase()
		.replace(/&/g, ' and ')
		.replace(/['’‘]/g, '')      // apostrophes disappear
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, '-');
}

/* --------------------------------------------------------------------------
 * Line grammars
 * ------------------------------------------------------------------------ */

const RE_PART = /^# \S+ PART ([IVX]+) — (.+?)(?: · `([a-z0-9-]+)`)?\s*$/u;
const RE_DOMAIN = /^## (\S+) DOMAIN (\d+) — (.+?)(?: · `([a-z0-9-]+)`)?\s*$/u;
const RE_CLUSTER = /^### (\d+)\.(\d+) · (.+?)(?: · `([a-z0-9-]+)`)?\s*$/u;
const RE_BOOK = /^- ([🔴🟡🔵]) `([A-Z])` (.*)$/u;
const RE_XREF = /^- ↔ (.+)$/u;

/**
 * The book line, after the tier/weight/flag prefix has been stripped:
 *
 *   **Title** [*(edition)*] [— Author [*(edition)*]] — *why it is here*
 *
 * The author segment is genuinely optional — six of the 293 have none
 * (Tao Te Ching, Dhammapada and other translated works where the edition note
 * stands in its place). The `why` is always the final italic run and always
 * runs to end of line, which is the invariant this leans on: split at the LAST
 * ` — *`.
 */
function parseBookBody(body, lineNo, raw) {
	// NOTE: no trailing \s* here. Consuming the space after the title destroys
	// the " — *" separator on the six lines that carry no author, and the
	// failure looks like a data defect rather than a parser one.
	const title = body.match(/^\*\*(.+?)\*\*/u);
	if (!title) die(lineNo, 'no **bold title** found on a book line', raw);
	let rest = body.slice(title[0].length);

	const tail = rest.match(/^(.*) — \*(.+)\*$/u); // greedy: takes the LAST " — *"
	if (!tail) die(lineNo, 'no trailing " — *why it is here*" italic run', raw);

	let authorBlob = tail[1].trim();
	const why = tail[2].trim();

	let edition = null;
	const ed = authorBlob.match(/\*\((.+?)\)\*/u);
	if (ed) {
		edition = ed[1];
		authorBlob = authorBlob.replace(ed[0], '').trim();
	}
	// What survives is either "" or "— Author".
	let author = null;
	if (authorBlob.startsWith('—')) author = authorBlob.slice(1).trim();
	else if (authorBlob) author = authorBlob.trim();
	if (author === '') author = null;

	return { title: title[1].trim(), author, edition, why };
}

/** Strip the flag glyphs that sit between the weight and the title. */
function takeFlags(s, lineNo, raw) {
	const flags = [];
	let out = s;
	let guard = 0;
	for (;;) {
		let matched = false;
		for (const [glyph, name] of Object.entries(FLAGS)) {
			if (out.startsWith(glyph + ' ')) {
				flags.push(name);
				out = out.slice(glyph.length + 1);
				matched = true;
				break;
			}
		}
		if (!matched) break;
		if (++guard > 8) die(lineNo, 'more than eight flags on one book line', raw);
	}
	return [flags, out];
}

/* --------------------------------------------------------------------------
 * The parse
 * ------------------------------------------------------------------------ */

/**
 * "THE MAP" table, near the top of universe.md, is a second source for two
 * things the headings do not carry: a title-cased display name (the headings
 * are ALL CAPS, which is shouting on a card) and the ONE QUESTION each domain
 * answers, which is the best single line of copy in the whole file.
 *
 * Asserted at 16 rows, so a table someone reformats fails here rather than
 * quietly costing every domain page its subtitle.
 */
function parseMapTable(lines) {
	const rows = new Map();
	let inTable = false;
	for (let i = 0; i < lines.length; i++) {
		const raw = lines[i];
		if (raw.startsWith('# ') && raw.includes('THE MAP')) { inTable = true; continue; }
		if (inTable && raw.startsWith('# ')) break;
		if (!inTable || !raw.startsWith('|')) continue;
		const cells = raw.split('|').slice(1, -1).map((c) => c.trim());
		if (cells.length < 4) continue;
		// /^\\d+$/ and NOT Number(): the header row has an empty second cell and
		// Number("") is 0, which is an integer, which made the header a domain.
		if (!/^[0-9]+$/.test(cells[1])) continue; // header and separator rows
		const n = Number(cells[1]);
		// cells[2] is "<emoji> Self-Command"; drop the leading glyph run.
		const display = cells[2].replace(/^[^A-Za-z0-9]+/u, '').trim();
		rows.set(n, { display, question: cells[3].trim(), line: i + 1 });
	}
	if (rows.size !== EXPECTED.domains)
		die(null, `"THE MAP" table has ${rows.size} domain rows, expected ${EXPECTED.domains}`);
	return rows;
}

let CACHE = null;

export function parseUniverse({ requireSlugs = true, file = UNIVERSE } = {}) {
	if (CACHE && CACHE.file === file && CACHE.requireSlugs === requireSlugs) return CACHE.data;

	const lines = readFileSync(file, 'utf8').split('\n');
	const mapRows = parseMapTable(lines);

	const parts = [];
	const domains = [];
	const books = [];
	const crossRefs = [];

	let part = null;
	let domain = null;
	let cluster = null;
	/** True once "# ⚡ PART I" is seen; the legend above it has book-shaped
	 *  example lines that must not be collected. False again at the summary. */
	let inMap = false;

	for (let i = 0; i < lines.length; i++) {
		const raw = lines[i];
		const lineNo = i + 1;

		if (raw.startsWith('# ')) {
			const m = RE_PART.exec(raw);
			if (!m) {
				// A non-part level-1 heading. The map ends at the first one after
				// PART I — everything below is summary prose.
				if (inMap) inMap = false;
				continue;
			}
			inMap = true;
			const order = ROMAN[m[1]];
			if (!order) die(lineNo, `unknown roman numeral "${m[1]}" in a PART heading`, raw);
			const name = m[2].trim();
			const slug = m[3] ?? (requireSlugs ? null : slugify(name));
			if (!slug) die(lineNo, 'PART heading has no ` · `slug`` — run: node scripts/universe.mjs --migrate', raw);
			part = { kind: 'part', order, roman: m[1], name, slug, line: lineNo, domains: [] };
			parts.push(part);
			domain = null;
			cluster = null;
			continue;
		}

		if (!inMap) continue;

		if (raw.startsWith('## ')) {
			const m = RE_DOMAIN.exec(raw);
			if (!m) die(lineNo, 'a `## ` heading inside the map is not a DOMAIN heading', raw);
			if (!part) die(lineNo, 'DOMAIN heading before any PART heading', raw);
			const number = Number(m[2]);
			const name = m[3].trim();
			const slug = m[4] ?? (requireSlugs ? null : slugify(name));
			if (!slug) die(lineNo, 'DOMAIN heading has no ` · `slug`` — run: node scripts/universe.mjs --migrate', raw);
			const row = mapRows.get(number);
			if (!row) die(lineNo, `DOMAIN ${number} has no row in "THE MAP" table`, raw);
			domain = {
				kind: 'domain', number, name, slug, emoji: m[1],
				displayName: row.display, question: row.question,
				part: part.slug, partName: part.name, line: lineNo, clusters: [],
			};
			domains.push(domain);
			part.domains.push(domain);
			cluster = null;
			continue;
		}

		if (raw.startsWith('### ')) {
			const m = RE_CLUSTER.exec(raw);
			if (!m) die(lineNo, 'a `### ` heading inside the map is not a `N.N · Name` cluster heading', raw);
			if (!domain) die(lineNo, 'cluster heading before any DOMAIN heading', raw);
			if (Number(m[1]) !== domain.number)
				die(lineNo, `cluster numbered ${m[1]}.x sits under DOMAIN ${domain.number}`, raw);
			const name = m[3].trim();
			const slug = m[4] ?? (requireSlugs ? null : slugify(name));
			if (!slug) die(lineNo, 'cluster heading has no ` · `slug`` — run: node scripts/universe.mjs --migrate', raw);
			cluster = {
				kind: 'cluster', number: `${m[1]}.${m[2]}`, name, slug,
				domain: domain.slug, domainName: domain.name, domainNumber: domain.number,
				part: domain.part, rationale: null, line: lineNo, books: [], crossRefs: [],
			};
			domain.clusters.push(cluster);
			continue;
		}

		// The optional one-line rationale directly under a cluster heading.
		if (cluster && !cluster.rationale && raw.startsWith('> ')) {
			cluster.rationale = raw.slice(2).replace(/^\*|\*$/g, '').trim();
			continue;
		}

		if (raw.startsWith('- ')) {
			const b = RE_BOOK.exec(raw);
			if (b) {
				if (!cluster) die(lineNo, 'book line before any cluster heading', raw);
				const tier = TIERS[b[1]];
				const weight = b[2];
				if (!WEIGHTS.has(weight)) die(lineNo, `weight "${weight}" is not S, M or L`, raw);
				const [flags, body] = takeFlags(b[3], lineNo, raw);
				const parsed = parseBookBody(body, lineNo, raw);
				const book = {
					kind: 'book', ...parsed, tier, weight, flags,
					slug: slugify(parsed.title),
					cluster: cluster.slug, clusterNumber: cluster.number, clusterName: cluster.name,
					domain: cluster.domain, domainName: cluster.domainName,
					part: cluster.part, line: lineNo,
				};
				books.push(book);
				cluster.books.push(book);
				continue;
			}
			const x = RE_XREF.exec(raw);
			if (x) {
				if (!cluster) die(lineNo, 'cross-reference line before any cluster heading', raw);
				// One line can carry several, separated by " · ".
				const entries = x[1].split(' · ').map((e) => {
					const t = e.match(/\*\*(.+?)\*\*/u);
					const to = e.match(/→\s*([\d.]+)/u);
					if (!t) die(lineNo, 'cross-reference entry with no **bold title**', raw);
					if (!to) die(lineNo, 'cross-reference entry with no "→ N.N" target', raw);
					return { title: t[1].trim(), slug: slugify(t[1]), toCluster: to[1] };
				});
				const rec = { line: lineNo, from: cluster.slug, entries };
				crossRefs.push(rec);
				cluster.crossRefs.push(...entries);
				continue;
			}
			die(lineNo, 'a `- ` list item inside the map is neither a book line nor a `↔` cross-reference', raw);
		}
	}

	/* ---- the assertions. Every one of these has been verified to hold. ---- */
	const clusters = domains.flatMap((d) => d.clusters);
	const counted = {
		parts: parts.length,
		domains: domains.length,
		clusters: clusters.length,
		books: books.length,
		core: books.filter((b) => b.tier === 'core').length,
		deepen: books.filter((b) => b.tier === 'deepen').length,
		reference: books.filter((b) => b.tier === 'reference').length,
		crossRefs: crossRefs.length,
	};
	for (const [k, want] of Object.entries(EXPECTED)) {
		if (counted[k] !== want)
			die(null, `expected ${want} ${k}, parsed ${counted[k]}.\n  Either the file changed and EXPECTED needs recounting, or the parse is wrong.`);
	}
	for (const d of domains)
		if (d.clusters.length === 0) die(d.line, `DOMAIN ${d.number} has no clusters`);
	for (const c of clusters)
		if (c.books.length === 0 && c.crossRefs.length === 0)
			die(c.line, `cluster ${c.number} has neither books nor cross-references`);

	/* ---- slug uniqueness, at every level that becomes a directory ---- */
	const seen = new Map();
	const claim = (slug, what, line) => {
		const prev = seen.get(slug);
		if (prev) die(line, `slug "${slug}" is already used by ${prev}`);
		seen.set(slug, what);
	};
	for (const p of parts) claim(p.slug, `part "${p.name}"`, p.line);
	for (const d of domains) claim(d.slug, `domain "${d.name}"`, d.line);
	// A cluster slug only has to be unique WITHIN its domain, because the URL
	// carries the domain. A book slug only has to be unique within its cluster.
	for (const d of domains) {
		const local = new Map();
		for (const c of d.clusters) {
			if (local.has(c.slug)) die(c.line, `cluster slug "${c.slug}" repeats inside domain "${d.slug}"`);
			local.set(c.slug, c.name);
		}
	}
	for (const c of clusters) {
		const local = new Map();
		for (const b of c.books) {
			if (local.has(b.slug)) die(b.line, `book slug "${b.slug}" repeats inside cluster "${c.slug}"`);
			local.set(b.slug, b.title);
		}
	}

	/* ---- every cross-reference must resolve to a real cluster and a real book ---- */
	const byNumber = new Map(clusters.map((c) => [c.number, c]));
	const bookTitles = new Map(books.map((b) => [b.slug, b]));
	for (const x of crossRefs) {
		for (const e of x.entries) {
			const target = byNumber.get(e.toCluster);
			if (!target) die(x.line, `cross-reference points at cluster ${e.toCluster}, which does not exist`);
			const book = bookTitles.get(e.slug);
			if (!book)
				die(x.line, `cross-reference "${e.title}" has no full entry anywhere in the universe.\n  The legend says the full entry lives in another cluster — so one must exist.`);
			e.resolved = { domain: book.domain, cluster: book.cluster, slug: book.slug };
		}
	}

	const data = { parts, domains, clusters, books, crossRefs, counted };
	CACHE = { file, requireSlugs, data };
	return data;
}

/* --------------------------------------------------------------------------
 * The one-time slug migration
 * ------------------------------------------------------------------------ */

function migrate() {
	const lines = readFileSync(UNIVERSE, 'utf8').split('\n');
	const data = parseUniverse({ requireSlugs: false });
	const bySlugLine = new Map();
	for (const p of data.parts) bySlugLine.set(p.line, p.slug);
	for (const d of data.domains) bySlugLine.set(d.line, d.slug);
	for (const c of data.clusters) bySlugLine.set(c.line, c.slug);

	let written = 0;
	let already = 0;
	for (const [lineNo, slug] of bySlugLine) {
		const i = lineNo - 1;
		if (/ · `[a-z0-9-]+`\s*$/.test(lines[i])) { already++; continue; }
		lines[i] = lines[i].replace(/\s*$/, '') + ' · `' + slug + '`';
		written++;
	}
	writeFileSync(UNIVERSE, lines.join('\n'));
	console.log(`  slugs written  ${written}`);
	console.log(`  already there  ${already}`);
	console.log('\n  universe.md now carries explicit slugs. They are PERMANENT:');
	console.log('  a slug is a URL, and changing one breaks every inbound link to it.\n');
}

/* --------------------------------------------------------------------------
 * The sidebar — explicit, never autogenerate
 * ------------------------------------------------------------------------ */

/**
 * Starlight's `autogenerate` resolves a DIRECTORY to a flat list, so a book's
 * own parts would reach the navigation nowhere and all its chapters would land
 * in one wall. This builds the tree from chapter frontmatter instead.
 *
 * THE CONSEQUENCE THAT MUST NOT BE UNDONE: an explicit list has to filter
 * drafts itself. A draft page does not exist in `build`, the link validator
 * sees sidebar anchors like any other link, and a link to one fails the build.
 * autogenerate never hit this because a draft is simply absent from the
 * collection it enumerates.
 */
const BUILDING = process.argv.includes('build');

function frontmatterOf(file) {
	const raw = readFileSync(file, 'utf8');
	const open = raw.indexOf('---');
	if (open === -1) return null;
	const close = raw.indexOf('\n---', open + 3);
	return close === -1 ? null : raw.slice(open + 3, close);
}
const field = (fm, name) => {
	const m = fm?.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
	return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
};
/** Handles exactly one indent level, because `sidebar:` is the only nested
 *  block these pages carry. */
const nested = (fm, name) => {
	const m = fm?.match(new RegExp(`^\\s+${name}:\\s*(.+)$`, 'm'));
	return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
};

function chaptersIn(dir) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir)
		.filter((f) => f.endsWith('.mdx') && !f.startsWith('_') && f !== 'index.mdx')
		.map((file) => {
			const fm = frontmatterOf(join(dir, file));
			const order = fm?.match(/^\s+order:\s*(\d+)\s*$/m);
			return {
				slug: file.replace(/\.mdx$/, ''),
				title: field(fm, 'title') ?? file.replace(/\.mdx$/, ''),
				part: field(fm, 'part') ?? '',
				order: order ? Number(order[1]) : Number.POSITIVE_INFINITY,
				hidden: field(fm, 'draft') === 'true' || field(fm, 'private') === 'true',
			};
		})
		.filter((p) => !(BUILDING && p.hidden))
		.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

/** Part titles for a book, from its book.json, degrading to a title-cased slug. */
function partTitles(bookDir) {
	const f = join(bookDir, 'book.json');
	if (!existsSync(f)) return new Map();
	try {
		const j = JSON.parse(readFileSync(f, 'utf8'));
		return new Map((j.parts ?? []).map((p) => [p.slug, p.title]));
	} catch {
		return new Map(); // a malformed book.json costs a nicer label, never the sidebar
	}
}

const titleCase = (s) => s.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());

export function bookSidebar(docsRoot = join(ROOT, 'src', 'content', 'docs')) {
	const { domains } = parseUniverse();
	const groups = [];
	for (const d of domains) {
		for (const c of d.clusters) {
			const clusterDir = join(docsRoot, d.slug, c.slug);
			if (!existsSync(clusterDir)) continue;
			for (const entry of readdirSync(clusterDir)) {
				const bookDir = join(clusterDir, entry);
				if (!statSync(bookDir).isDirectory()) continue;
				const base = `/${d.slug}/${c.slug}/${entry}`;
				const items = [];

				const indexFm = existsSync(join(bookDir, 'index.mdx'))
					? frontmatterOf(join(bookDir, 'index.mdx'))
					: null;
				/*
				 * THE BOOK INDEX IS FILTERED THE SAME WAY ITS CHAPTERS ARE.
				 *
				 * chaptersIn() has always dropped draft and private chapters during a
				 * build; the index page itself was pushed unconditionally, so a book
				 * whose index.mdx is draft or private would put a sidebar link to a
				 * route that does not exist — and starlight-links-validator fails the
				 * build on it, with an error that reads like a typo in a path that is
				 * in fact correct. Latent rather than theoretical: nothing stops a
				 * book index carrying `private: true` in a sensitive domain, which is
				 * precisely where one would.
				 */
				const indexHidden =
					field(indexFm, 'draft') === 'true' || field(indexFm, 'private') === 'true';
				if (!(BUILDING && indexHidden))
					items.push({ label: nested(indexFm, 'label') ?? 'The book', link: `${base}/` });

				const chapters = chaptersIn(bookDir);
				const byPart = new Map();
				for (const ch of chapters) {
					if (!byPart.has(ch.part)) byPart.set(ch.part, []);
					byPart.get(ch.part).push(ch);
				}
				const titles = partTitles(bookDir);
				/*
				 * THE ORDER PREFIX IS SKIPPED WHEN THE TITLE ALREADY CARRIES ONE.
				 *
				 * chapter-spine.md has a chapter title itself begin "Ch N · …", so
				 * prefixing the order produced "1. Ch 1 · Deep work is valuable" —
				 * in the drawer AND, because Starlight builds pagination from these
				 * same labels, at the foot of every chapter: "Next — 2. Ch 2 · Deep
				 * work is rare". Two numbers for one chapter, three characters apart.
				 *
				 * The prefix stays for a title that carries no number of its own,
				 * which is what it was for: order is what makes a flat list scannable
				 * when the titles do not say it.
				 */
				const SELF_NUMBERED = /^(?:ch(?:apter)?\.?\s*)?\d+\s*[·.:—–-]/i;
				const numbered = (ch) => ({
					label:
						Number.isFinite(ch.order) && !SELF_NUMBERED.test(ch.title)
							? `${ch.order}. ${ch.title}`
							: ch.title,
					link: `${base}/${ch.slug}/`,
				});
				const keys = [...byPart.keys()];
				if (keys.length === 1 && keys[0] === '') {
					if (byPart.get('').length)
						items.push({ label: 'Chapters', collapsed: false, items: byPart.get('').map(numbered) });
				} else {
					for (const key of keys) {
						items.push({
							// `collapsed: true` is not "closed": Starlight opens any group
							// containing the current page, so the reader sees their own part
							// expanded and the others as names.
							label: key ? (titles.get(key) ?? titleCase(key)) : 'Other chapters',
							collapsed: true,
							items: byPart.get(key).map(numbered),
						});
					}
				}
				/* A book with nothing visible is not a group with no items — Starlight
				   renders an empty group as a bare label that goes nowhere. */
				if (items.length)
					groups.push({
						label: field(indexFm, 'title') ?? titleCase(entry),
						collapsed: false,
						items,
					});
			}
		}
	}
	return groups;
}

/* --------------------------------------------------------------------------
 * CLI
 * ------------------------------------------------------------------------ */

const invokedDirectly =
	process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (invokedDirectly) {
	if (process.argv.includes('--migrate')) {
		migrate();
	} else {
		const u = parseUniverse();
		console.log('\n  context/universe.md parsed and verified\n');
		for (const [k, v] of Object.entries(u.counted)) console.log(`    ${k.padEnd(12)} ${v}`);
		console.log('\n  by weight');
		for (const w of ['S', 'M', 'L'])
			console.log(`    ${w.padEnd(12)} ${u.books.filter((b) => b.weight === w).length}`);
		console.log('\n  by flag');
		for (const f of Object.values(FLAGS))
			console.log(`    ${f.padEnd(12)} ${u.books.filter((b) => b.flags.includes(f)).length}`);
		console.log('');
	}
}
