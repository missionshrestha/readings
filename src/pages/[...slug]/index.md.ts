import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { isPublished } from '../../lib/visibility';

/**
 * /<path>/index.md — the raw source of every page, as a real file.
 *
 * The whole reading loop is paste-between-tools: the dialogue stage, the repair
 * stage and the review stage all begin with "here is the chapter". One URL that
 * yields pasteable source collapses that to a copy.
 *
 * THE SOURCE IS READ FROM DISK, NEVER RECONSTRUCTED. `entry.body` has the
 * frontmatter stripped, so rebuilding from `entry.data` would emit frontmatter
 * this repo never wrote — reordered keys, re-serialised dates, and every
 * `.catch(undefined)` default materialised as though it had been typed. The
 * acceptance criterion is that the copied source STILL BUILDS IF PASTED BACK,
 * and only the bytes on disk satisfy that.
 *
 * THE FILTER IS THE POINT. Upstream shipped this route without one: Starlight
 * correctly excluded every draft's HTML while this route iterated the whole
 * collection and served the raw .mdx at HTTP 200. `draft: true` hid the page
 * and published the source, which is the exact opposite of what the flag means.
 * It stayed invisible because it needs a draft AND a deploy simultaneously.
 */
export const getStaticPaths: GetStaticPaths = async () => {
	const docs = (await getCollection('docs')).filter((entry) =>
		isPublished(entry.data as { draft?: boolean; private?: boolean })
	);
	return docs.map((entry) => ({
		params: { slug: String(entry.id) || undefined },
		props: { filePath: entry.filePath },
	}));
};

export const GET: APIRoute = async ({ props }) => {
	const { filePath } = props as { filePath?: string };
	if (!filePath) return new Response('Not found', { status: 404 });
	let source: string;
	try {
		source = await readFile(filePath, 'utf8');
	} catch {
		return new Response('Not found', { status: 404 });
	}
	// text/plain, not text/markdown, so it opens in a tab rather than downloading.
	return new Response(source, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
