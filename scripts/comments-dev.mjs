/**
 * comments-dev.mjs — the ONLY writer of a page's comments, and it exists only
 * inside `astro dev`.
 *
 * ---------------------------------------------------------------------------
 * WHAT IT IS FOR
 *
 * His instruction, 2026-09-14: "The user selects a heading, paragraph, or
 * specific lines, which opens a comment pop-up … In production, that comment
 * stays tied to its specific scroll section … for view-only access."
 *
 * So comments are WRITTEN locally, while he reads on `npm run dev`, and READ on
 * the public site. A static site has nowhere to write to, which is why this is
 * a dev-server middleware and not a route: `astro:server:setup` runs for
 * `astro dev` and never for `astro build`, so the endpoint does not exist in
 * dist/ at all — there is nothing on the public site to probe or abuse.
 *
 * The file it writes sits beside the page, `<page>.comments.json`, and is
 * committed like the page. context/md-spec.md section 5d.
 *
 * ---------------------------------------------------------------------------
 * WHAT IT REFUSES
 *
 *   · a page path that is not an existing .mdx under src/content/docs/ — the
 *     path arrives from the browser, so it is checked against a strict pattern
 *     AND the filesystem before anything is written
 *   · a request without the x-readings-comments header. A custom header cannot
 *     be sent cross-origin without a preflight this middleware never answers, so
 *     another site open in the same browser cannot write to a dev server on
 *     localhost
 *   · a body over 2 MB
 *
 * Every comment is passed through normaliseComments() before it is written, the
 * same function the build reads with — so a malformed comment is dropped at the
 * door rather than written and then silently ignored.
 */

import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { normaliseComments } from '../src/lib/comments-shared.ts';

const PAGE = /^src\/content\/docs\/[a-z0-9][a-z0-9/-]*\.mdx$/;
const MAX_BYTES = 2 * 1024 * 1024;

const json = (res, status, body) => {
	res.statusCode = status;
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.setHeader('Cache-Control', 'no-store');
	res.end(JSON.stringify(body));
};

function readBody(req) {
	return new Promise((ok, fail) => {
		let size = 0;
		const chunks = [];
		req.on('data', (c) => {
			size += c.length;
			if (size > MAX_BYTES) {
				fail(new Error('body over 2 MB'));
				req.destroy();
			} else chunks.push(c);
		});
		req.on('end', () => ok(Buffer.concat(chunks).toString('utf8')));
		req.on('error', fail);
	});
}

export function commentsDev() {
	return {
		name: 'readings:comments-dev',
		hooks: {
			'astro:server:setup': ({ server, logger }) => {
				const root = server.config.root;
				server.middlewares.use('/__rd/comments', async (req, res) => {
					try {
						if (req.headers['x-readings-comments'] !== '1')
							return json(res, 403, { error: 'missing x-readings-comments header' });

						const url = new URL(req.url ?? '/', 'http://localhost');
						const body = req.method === 'PUT' ? JSON.parse(await readBody(req)) : null;
						const page = String((body ? body.page : url.searchParams.get('page')) ?? '');
						if (!PAGE.test(page) || !existsSync(resolve(root, page)))
							return json(res, 400, { error: `"${page}" is not an existing .mdx page under src/content/docs/` });

						const file = resolve(root, page.replace(/\.mdx$/, '.comments.json'));

						if (req.method === 'GET') {
							const comments = existsSync(file)
								? normaliseComments(JSON.parse(readFileSync(file, 'utf8')))
								: [];
							return json(res, 200, { page, comments });
						}

						if (req.method === 'PUT') {
							const comments = normaliseComments(body?.comments);
							if (!comments.length) {
								if (existsSync(file)) rmSync(file);
							} else {
								writeFileSync(file, JSON.stringify({ version: 1, comments }, null, '\t') + '\n');
							}
							logger.info(`${comments.length} comment(s) on ${page}`);
							return json(res, 200, { page, comments });
						}

						return json(res, 405, { error: 'GET or PUT' });
					} catch (e) {
						return json(res, 500, { error: e instanceof Error ? e.message : String(e) });
					}
				});
			},
		},
	};
}
