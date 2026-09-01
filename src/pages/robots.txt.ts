import type { APIRoute } from 'astro';
import { isIndexable } from '../lib/indexing';

/**
 * robots.txt — GENERATED from `site`, so it cannot drift from the sitemap.
 *
 * It used to be a static file in public/ upstream, holding a second hardcoded
 * copy of the hostname. Repointing the deploy would have left it advertising
 * the old host, silently. Do not reintroduce a static one.
 *
 * `Allow: /` IN BOTH MODES, and that is not an oversight. See src/lib/
 * indexing.ts: `Disallow` means "do not crawl", and a page that is never
 * crawled is a page whose `noindex` is never READ. To keep a page OUT of the
 * index you must let the crawler in and tell it noindex. Only the Sitemap: line
 * changes.
 */
export const GET: APIRoute = ({ site }) => {
	const indexable = isIndexable(site);
	const body = indexable
		? ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site).href}`, '']
		: [
				'# This host is TEMPORARY and deliberately not indexed.',
				'#',
				'# Crawling is ALLOWED on purpose. Every page carries',
				'#   <meta name="robots" content="noindex">',
				'# and a crawler has to be let in to read it. `Disallow: /` would do the',
				'# opposite of what it looks like: the pages would stay uncrawled, the',
				'# noindex would never be seen, and a URL linked from anywhere could be',
				'# indexed without a description and stay that way.',
				'#',
				'# No Sitemap: line, because there is nothing here that should be indexed',
				'# yet. Both halves flip themselves the day `site` becomes a real domain —',
				'# src/lib/indexing.ts.',
				'',
				'User-agent: *',
				'Allow: /',
				'',
			];
	return new Response(body.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
