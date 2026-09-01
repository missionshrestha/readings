/**
 * THE ONE GATE FOR WHETHER A PAGE IS PUBLIC.
 *
 * Every consumer of getCollection('docs') routes through this: the sidebar,
 * llms-full.txt, the raw .md route, /shelf, /ledger, /review and Pagefind.
 *
 * This is not tidiness. Upstream (learn-anything-in-tech-system) found THREE OF
 * FOUR consumers silently not filtering `draft` — including one that served
 * every draft's raw .mdx at HTTP 200 while Starlight correctly hid the page.
 * `draft: true` hid the page and published the source, which is the opposite of
 * what the flag means. It stayed invisible because it needs a draft AND a deploy
 * simultaneously.
 *
 * scripts/audit.mjs greps for getCollection('docs') and FAILS on any call site
 * that does not go through isPublished(). That is the control; this file is only
 * the implementation.
 */

/** Domains whose chapters carry material about other people, money or family. */
export const SENSITIVE_DOMAINS = new Set([
	'relationships-family-and-communication',
	'love-attraction-and-partnership',
	'money-and-wealth',
]);

type Frontmatter = {
	draft?: boolean;
	private?: boolean;
};

/** A page reaches the public site only if it is neither a draft nor private. */
export function isPublished(data: Frontmatter | undefined): boolean {
	if (!data) return false;
	return data.draft !== true && data.private !== true;
}

/**
 * `<domain>/<cluster>/<book>` and below — a page someone authored.
 *
 * Depth is the test because routes are nested, which is exactly why they are:
 * `/`, `/<domain>/` and `/<domain>/<cluster>/` are generated map pages, and
 * everything at depth 3 or more is a book or a chapter. The reader frame, the
 * llms-full corpus and the staleness badge all branch on this one predicate.
 */
export function isAuthored(id: string): boolean {
	return id.split('/').filter(Boolean).length >= 3;
}
