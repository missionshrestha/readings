import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { normaliseComments, type ReaderComment } from './comments-shared';

/**
 * comments.ts — read a page's comments at render time. SERVER ONLY.
 *
 * ---------------------------------------------------------------------------
 * WHY readFileSync AND NOT import.meta.glob
 *
 * A glob import puts every comments file into Vite's module graph, and in
 * `astro dev` a change to a module in the graph reloads the page. The dev server
 * WRITES this file every time he saves a comment (scripts/comments-dev.mjs) — so
 * a glob would reload the chapter he is reading, and throw away his scroll
 * position, on every save. Reading the file from disk at render time keeps it
 * out of the graph: in dev the editor updates the page in place, and at build
 * time the file is read once per page like any other input.
 *
 * ---------------------------------------------------------------------------
 * WHAT IS PUBLISHED
 *
 * `local` comments are included only in dev. A build never sees them, so they
 * cannot reach dist/, the search index or a share preview. A page that is
 * `draft` or `private` is not built at all, so its comments are not either.
 */

/** `src/content/docs/a/b/c/ch.mdx` → `src/content/docs/a/b/c/ch.comments.json` */
export const commentsPathFor = (filePath: string) => filePath.replace(/\.mdx?$/, '.comments.json');

export function loadComments(
	filePath: string | undefined,
	opts: { includeLocal: boolean }
): ReaderComment[] {
	if (!filePath || !/\.mdx?$/.test(filePath)) return [];
	const abs = resolve(process.cwd(), commentsPathFor(filePath));
	if (!existsSync(abs)) return [];
	try {
		const all = normaliseComments(JSON.parse(readFileSync(abs, 'utf8')));
		return opts.includeLocal ? all : all.filter((c) => c.visibility !== 'local');
	} catch (e) {
		/*
		 * Announced, never silent — and never fatal. A hand-damaged comments file
		 * costs that one page its comments, not the build.
		 */
		console.warn(
			`[readings:comments] ${commentsPathFor(filePath)} is not valid JSON, so that page shows no comments. ${
				(e as Error).message
			}`
		);
		return [];
	}
}
