/**
 * guards.mjs — the checks that REFUSE THE BUILD.
 *
 * Imported by astro.config.mjs as a tiny integration and re-used by audit.mjs
 * so the two can never disagree about what the rules are.
 *
 * A STEP IN A RUNBOOK IS NOT A CONTROL. Everything here is something that would
 * otherwise be a line in a checklist that gets skipped on the night it matters.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

/**
 * Domains whose chapters carry material about other people, money or family.
 *
 * CHECKED AGAINST THE DIRECTORY, never the frontmatter — because nested routes
 * make the path the truth. Checking the `domain:` field would let a typo in the
 * very field being protected evade the protection.
 */
export const SENSITIVE_DOMAINS = new Set([
	'relationships-family-and-communication',
	'love-attraction-and-partnership',
	'money-and-wealth',
]);

function walk(dir, out = []) {
	if (!existsSync(dir)) return out;
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) walk(full, out);
		else if (entry.endsWith('.mdx') && !entry.startsWith('_')) out.push(full);
	}
	return out;
}

function frontmatter(file) {
	const raw = readFileSync(file, 'utf8');
	const open = raw.indexOf('---');
	if (open !== 0) return null;
	const close = raw.indexOf('\n---', 3);
	return close === -1 ? null : raw.slice(3, close);
}

const field = (fm, name) => {
	const m = fm?.match(new RegExp(`^${name}:\\s*(.*)$`, 'm'));
	return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
};

/**
 * CONTROL 2 — no silent default on sensitive material.
 *
 * Any page under a SENSITIVE_DOMAINS directory must carry an EXPLICIT
 * `private:` decision, true or false. A MISSING one refuses the build.
 *
 * Forgetting is the failure mode here, and a default is not a decision. If the
 * default were `false` a forgotten flag publishes; if it were `true` a
 * forgotten flag silently hides work and looks like a build bug. Refusing is
 * the only option that cannot be wrong quietly.
 */
export function checkSensitivePrivacy(docsRoot) {
	const problems = [];
	for (const file of walk(docsRoot)) {
		const rel = relative(docsRoot, file);
		const parts = rel.split('/');
		/*
		 * AUTHORED PAGES ONLY — depth 4 is <domain>/<cluster>/<book>/<file>.
		 *
		 * The 102 generated map pages sit at depth 1 and 2 and are exempt by
		 * design: they are the catalogue, and the personal why-lines they carry
		 * were a published-on-purpose decision. Requiring a `private:` flag on a
		 * file that gen-pages.mjs rewrites on every run would be a control that
		 * fights its own generator.
		 */
		if (parts.length < 4) continue;
		const domain = parts[0];
		if (!SENSITIVE_DOMAINS.has(domain)) continue;
		const fm = frontmatter(file);
		const v = field(fm, 'private');
		if (v !== 'true' && v !== 'false')
			problems.push(
				`${rel}\n      sits in "${domain}" and carries no explicit \`private:\` decision.\n` +
					'      Write `private: true` or `private: false`. There is no default, because a\n' +
					'      forgotten flag would either publish something personal or hide work while\n' +
					'      looking like a build bug.'
			);
	}
	return problems;
}

/**
 * CONTROL 3 — the path validates the frontmatter.
 *
 * A chapter's `domain:`, `cluster:` and `book:` must agree with the directory
 * it sits in. This control EXISTS ONLY BECAUSE ROUTES ARE NESTED: under flat
 * routes those fields are unverifiable, and a mis-pasted `cluster:` would
 * silently mis-file the book on the shelf, in the ledger and in every count the
 * site renders, with a completely green build.
 */
export function checkPathMatchesFrontmatter(docsRoot) {
	const problems = [];
	for (const file of walk(docsRoot)) {
		const rel = relative(docsRoot, file);
		const parts = rel.split('/');
		if (parts.length < 4) continue; // map pages carry none of these fields
		const [domain, cluster, book] = parts;
		const fm = frontmatter(file);
		for (const [name, expected] of [
			['domain', domain],
			['cluster', cluster],
			['book', book],
		]) {
			const actual = field(fm, name);
			if (actual !== undefined && actual !== expected)
				problems.push(
					`${rel}\n      \`${name}: ${actual}\` but the directory says "${expected}". The path is the truth.`
				);
		}
	}
	return problems;
}

/**
 * Strip comments WITHOUT touching string literals.
 *
 * A plain `text.replace(/\/\/.*$/gm, '')` eats the rest of any line containing
 * `https://`, which is most of them. This walks the file once, tracking quotes
 * and template literals, and drops only real comments. It is deliberately
 * simple — it does not attempt to distinguish a regex literal from division —
 * because the only thing downstream needs is that a call site cannot hide
 * inside a comment.
 */
function stripComments(text) {
	let out = '';
	let i = 0;
	/** @type {null | '"' | "'" | '`'} */
	let quote = null;
	while (i < text.length) {
		const c = text[i];
		const next = text[i + 1];
		if (quote) {
			if (c === '\\') {
				out += c + (next ?? '');
				i += 2;
				continue;
			}
			if (c === quote) quote = null;
			out += c;
			i++;
			continue;
		}
		if (c === '"' || c === "'" || c === '`') {
			quote = c;
			out += c;
			i++;
			continue;
		}
		if (c === '/' && next === '/') {
			while (i < text.length && text[i] !== '\n') i++;
			continue;
		}
		if (c === '/' && next === '*') {
			i += 2;
			while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) i++;
			i += 2;
			out += ' ';
			continue;
		}
		out += c;
		i++;
	}
	return out;
}

/**
 * CONTROL 1 — every consumer routes through isPublished().
 *
 * Upstream found THREE OF FOUR consumers of getCollection('docs') filtering
 * drafts differently or not at all, including one that served every draft's raw
 * source at HTTP 200 while the page was correctly hidden.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS USED TO BE, AND WHY IT WAS NOT A CONTROL
 *
 * Until 2026-08-31 the whole test was two lines:
 *
 *     if (!text.includes("getCollection('docs')")) continue;
 *     if (text.includes('isPublished')) continue;
 *
 * That asks whether the STRING `isPublished` occurs anywhere in the file. It
 * does not ask whether the filter is applied, or applied to that collection, or
 * applied at all. Three ways to pass it while being broken, all of them
 * plausible rather than contrived:
 *
 *   · `// TODO: isPublished` in a comment
 *   · `void isPublished;` — which this repository ACTUALLY CONTAINED, in
 *     src/starlightRouteData.ts, with a comment saying it existed "so audit.mjs
 *     can see the call site". A reference kept alive to satisfy a grep is the
 *     purest form of the defect this control is for.
 *   · a file with TWO consumers where only the first one filters
 *
 * All four real consumers filtered correctly, so the control had never been
 * watched fail — and a check nobody has watched fail is not a check.
 *
 * ---------------------------------------------------------------------------
 * WHAT IT ASKS NOW
 *
 * Comments are stripped first, so nothing in prose counts. Then, per file:
 *
 *   calls    = occurrences of getCollection('docs')
 *   guarded  = occurrences of isPublished( that sit inside a .filter( in the
 *              same statement
 *
 * and `guarded < calls` is a finding. Counting rather than testing presence is
 * what catches the two-consumer file: one filtered call and one bare one gives
 * 1 < 2.
 *
 * It is a static check on source text, so it is a heuristic and says so. What
 * it CANNOT catch: a filter that calls isPublished and ignores the result, or
 * one that inverts it. Those are visible in review; a missing filter is not.
 *
 * PROBED IN BOTH DIRECTIONS 2026-08-31 — see the four probe files listed in
 * DEPLOY.md's control table. Each was added, watched to refuse the build with
 * this exact message, and removed.
 */
export function checkVisibilityGate(srcRoot) {
	const problems = [];
	const files = [];
	const collect = (dir) => {
		if (!existsSync(dir)) return;
		for (const entry of readdirSync(dir)) {
			const full = join(dir, entry);
			if (statSync(full).isDirectory()) collect(full);
			else if (/\.(ts|astro|mjs|js)$/.test(entry)) files.push(full);
		}
	};
	collect(srcRoot);
	for (const file of files) {
		/* One line, so a call split across three of them still reads as one. */
		const code = stripComments(readFileSync(file, 'utf8')).replace(/\s+/g, ' ');
		const calls = [...code.matchAll(/getCollection\s*\(\s*['"]docs['"]\s*\)/g)].length;
		if (!calls) continue;

		let guarded = 0;
		for (const m of code.matchAll(/isPublished\s*\(/g)) {
			/*
			 * Look back to the start of the statement. `;` ends it; 240 characters
			 * is comfortably more than the longest real call site here (the widest
			 * is 118) and short enough that an unrelated .filter() two statements
			 * up cannot be borrowed.
			 */
			const before = code.slice(Math.max(0, m.index - 240), m.index);
			const cut = before.lastIndexOf(';');
			if (/\.filter\s*\(/.test(cut === -1 ? before : before.slice(cut))) guarded++;
		}

		if (guarded < calls)
			problems.push(
				`${relative(srcRoot, file)}\n` +
					`      calls getCollection('docs') ${calls}x but applies isPublished() inside a\n` +
					`      .filter() only ${guarded}x. Every consumer filters independently, and the\n` +
					'      one that forgets is the one that publishes a draft.\n' +
					'      Write `.filter((e) => isPublished(e.data as { draft?: boolean; private?: boolean }))`.\n' +
					'      src/lib/visibility.ts. Naming the symbol is not enough — this control\n' +
					'      counts CALLS inside a filter, because a mention in a comment used to pass.'
			);
	}
	return problems;
}

/** Every .html under a directory. */
function walkHtml(dir, out = []) {
	if (!existsSync(dir)) return out;
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) walkHtml(full, out);
		else if (entry.endsWith('.html')) out.push(full);
	}
	return out;
}

/**
 * CONTROL 4 — THE PRIVACY SWEEP, and it now runs INSIDE the build.
 *
 * ---------------------------------------------------------------------------
 * WHY IT MOVED HERE
 *
 * It lived in audit.mjs, which printed, on a real leak:
 *
 *     FAIL · no draft or private page has a route or an inbound link in dist/
 *     ...
 *     1 control violation(s). The build refuses these too.
 *
 * The last sentence was FALSE. `npm run ci` is `astro check && astro build`;
 * audit.mjs is not in it, has no pre- or post-hook, and there is no git hook in
 * the repository. The only protection for personal material about other people
 * was a line a human had to remember to type — and the tool asserting otherwise
 * was the tool that found the leak.
 *
 * ---------------------------------------------------------------------------
 * WHY IT RUNS AT astro:build:done AND NOT WITH THE OTHER THREE
 *
 * The other three read source. This one reads dist/, which does not exist until
 * the build has finished writing it. So it is the one control that cannot
 * refuse before the work is done — it refuses after, with a non-zero exit, and
 * `npm run ci` stops there. A page that reached dist/ has still not reached
 * anybody.
 *
 * ---------------------------------------------------------------------------
 * WHAT IT ASKS, AND WHY NEITHER QUESTION IS A SUBSTRING SEARCH
 *
 *   1 · Does a ROUTE exist for a page that must not be published?
 *   2 · Does any href in dist/ POINT at one?
 *
 * The hand-rolled version was `grep dist/ for the slug`, which went false
 * positive the day /method/protocol/ was published: the protocol document
 * illustrates a directory layout using `02-deep-work-is-rare.mdx` as its
 * example filename. A string in a published code sample is not a leak, and a
 * check that cries wolf gets ignored — which is worse than not having one.
 *
 * NOTE the string comparison against 'true'. `field()` reads scalars off raw
 * frontmatter text, so these are the STRINGS. Comparing against the boolean
 * silently matched nothing, and an earlier version of this check passed both of
 * its own probes while being inert.
 */
export function checkNoHiddenRouteEmitted(distDir, docsRoot) {
	if (!existsSync(distDir)) return [];
	const problems = [];

	const hidden = [];
	for (const file of walk(docsRoot)) {
		const rel = relative(docsRoot, file);
		if (rel.split('/').length < 4) continue; // authored pages only
		const fm = frontmatter(file);
		if (field(fm, 'draft') === 'true' || field(fm, 'private') === 'true') hidden.push(rel);
	}
	if (!hidden.length) return [];

	const hrefs = new Set();
	for (const f of walkHtml(distDir)) {
		const html = readFileSync(f, 'utf8');
		for (const m of html.matchAll(/href="(\/[^"#?]*)/g))
			hrefs.add('/' + m[1].replace(/^\/+|\/+$/g, ''));
	}

	for (const rel of hidden) {
		const route = '/' + rel.replace(/\.mdx?$/, '').replace(/\/index$/, '').replace(/^\/+/, '');
		if (existsSync(join(distDir, route.slice(1), 'index.html')))
			problems.push(
				`${rel}\n      is draft/private, and yet dist${route}/index.html EXISTS and is served.\n` +
					'      src/content.config.ts drops private entries from the collection during\n' +
					'      `build`, and Starlight drops drafts. If one got through, one of those two\n' +
					'      stopped working — do not deploy this dist/.'
			);
		if (hrefs.has(route))
			problems.push(
				`${rel}\n      is draft/private, and something in dist/ links to ${route}/.\n` +
					'      The page may be absent and the link still leaks its existence and title.'
			);
	}
	return problems;
}

/**
 * The Astro integration. Runs the controls and THROWS rather than warns.
 *
 * Two hooks, because the four controls do not all read the same thing:
 *
 *   astro:build:start   controls 1-3 read SOURCE, so they refuse before any
 *                       work is done and a violation costs seconds.
 *   astro:build:done    control 4 reads dist/, which does not exist until the
 *                       build has written it.
 */
export function buildGuards({ docsRoot, srcRoot, distDir = './dist' }) {
	const refuse = (problems, when) => {
		if (!problems.length) return;
		throw new Error(
			`\n\n  BUILD REFUSED — ${problems.length} control violation(s)${when}.\n\n` +
				problems.map((p) => `    · ${p}`).join('\n\n') +
				'\n\n  These are controls, not lint. Each one exists because the failure it\n' +
				'  prevents is silent: a green build that publishes something personal, or\n' +
				'  mis-files a book everywhere at once.\n'
		);
	};
	return {
		name: 'readings:guards',
		hooks: {
			'astro:build:start': () => {
				refuse(
					[
						...checkSensitivePrivacy(docsRoot),
						...checkPathMatchesFrontmatter(docsRoot),
						...checkVisibilityGate(srcRoot),
					],
					''
				);
			},
			'astro:build:done': () => {
				refuse(checkNoHiddenRouteEmitted(distDir, docsRoot), ' AFTER RENDERING');
			},
		},
	};
}
