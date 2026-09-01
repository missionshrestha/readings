import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { isPublished, isAuthored } from '../lib/visibility';

/**
 * llms-full.txt — the authored corpus as one plain-text file.
 *
 * This exists for ONE workflow: the stages where a question spans every book at
 * once — the ledger synthesis, the 30-day review, "what have I actually
 * committed to across all of this" — where copying pages one at a time is the
 * friction that stops the stage happening at all.
 *
 * THE 102 MAP PAGES ARE EXCLUDED. They are transcription of universe.md, which
 * a chat session can be handed directly and far more cheaply. Spending the size
 * budget on them would crowd out the thing that is actually hard to reassemble.
 *
 * IT REPORTS ITS OWN SIZE, in its header, so it says when it has outgrown a
 * paste rather than being silently truncated at the far end.
 */
export const GET: APIRoute = async ({ site }) => {
	const docs = (await getCollection('docs'))
		// isPublished, not a hand-rolled draft test. Upstream found three of four
		// consumers filtering differently, and one of them shipped draft SOURCE at
		// HTTP 200 while the page itself was correctly hidden.
		.filter((entry) => isPublished(entry.data as { draft?: boolean; private?: boolean }))
		.filter((entry) => isAuthored(String(entry.id)))
		.sort((a, b) => String(a.id).localeCompare(String(b.id)));

	const parts: string[] = [];
	for (const entry of docs) {
		if (!entry.filePath) continue; // skip, never fail: a missing path is not a reason to 500
		let source: string;
		try {
			source = await readFile(entry.filePath, 'utf8');
		} catch {
			continue;
		}
		parts.push(
			['='.repeat(78), `SOURCE: ${entry.filePath}`, `URL:    ${new URL(String(entry.id) + '/', site).href}`, '='.repeat(78), '', source, ''].join('\n')
		);
	}

	const body = parts.join('\n');
	const header = [
		'# Readings — the authored corpus',
		'#',
		`# documents   ${parts.length}`,
		`# characters  ${body.length.toLocaleString('en-GB')}`,
		`# ~tokens     ${Math.round(body.length / 4).toLocaleString('en-GB')}`,
		'#',
		'# Books and chapters only. The 102 generated map pages are excluded: they are',
		'# transcription of context/universe.md, which is cheaper to hand over directly.',
		'#',
		'# If the token figure above has outgrown what a chat will accept, that is the',
		'# signal to paste one book rather than the corpus — not to truncate this.',
		'',
		'',
	].join('\n');

	return new Response(header + body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
