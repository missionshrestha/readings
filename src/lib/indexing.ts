/**
 * Whether the site should let itself be indexed, DERIVED FROM `site` — never a
 * flag someone has to remember to flip.
 *
 * WHY THIS IS NOT A ROBOTS.TXT `Disallow`, and getting it backwards fails
 * silently:
 *
 *   `Disallow: /` does NOT mean "do not index". It means "do not crawl" — and a
 *   page that is never crawled is a page whose `noindex` is never READ. A URL
 *   that is disallowed but linked from anywhere can still be indexed, listed
 *   without a description, and it will stay that way.
 *
 *   To keep a page OUT of the index you must let the crawler IN and tell it
 *   `noindex`. So robots.txt says `Allow: /` in both modes; only the `Sitemap:`
 *   line changes.
 *
 * WHY IT MATTERS HERE: Cloudflare's `_redirects` cannot redirect one hostname to
 * another, so URLs indexed on a *.workers.dev host can never be 301'd to the
 * real domain — they are stranded, not migrated. The only way to redirect would
 * be adding a `main` script to wrangler.jsonc, which makes every page view a
 * billable invocation.
 *
 * The day `site` becomes a real domain this returns true and the noindex tag
 * disappears by itself.
 */
export function isIndexable(site: URL | string | undefined): boolean {
	if (!site) return false;
	const host = new URL(String(site)).hostname;
	return !host.endsWith('.workers.dev') && !host.endsWith('.pages.dev');
}

export const NOINDEX_META = {
	tag: 'meta',
	attrs: { name: 'robots', content: 'noindex' },
} as const;
