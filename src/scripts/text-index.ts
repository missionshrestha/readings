/**
 * text-index.ts — find a passage of a page by its words, and mark it.
 *
 * A comment is anchored to the WORDS he selected, not to a DOM path or a
 * character offset. A DOM path breaks the moment Starlight changes its markup;
 * an offset breaks the moment one earlier sentence is re-pasted. Words survive
 * both, and when they do not survive — the passage itself was rewritten — the
 * comment is reported as detached rather than pinned to the wrong sentence.
 * That is the W3C Web Annotation "TextQuoteSelector" shape, without the library.
 *
 * ---------------------------------------------------------------------------
 * WHY THE TEXT IS NORMALISED, AND WHY BLOCKS ARE JOINED WITH A SPACE
 *
 * `Selection.toString()` puts a newline between two paragraphs; the DOM puts
 * nothing between their text nodes; the source has whatever the paste had. So
 * every run of whitespace becomes one space, and a boundary between two block
 * elements becomes a space too — otherwise a selection across two paragraphs
 * would be stored as "end.Start" by one path and "end. Start" by the other, and
 * never be found again.
 */

import type { CommentAnchor } from '../lib/comments-shared';

/** Never anchored into, never marked: code, diagrams, controls, heading links. */
const SKIP =
	'pre, .expressive-code, .rd-diagram, svg, script, style, button, input, textarea, .sl-anchor-link, [data-rd-noanchor]';
const BLOCK = 'p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, dt, dd, figcaption, summary';

export interface TextIndex {
	/** The page's readable text, whitespace collapsed. */
	text: string;
	/** For every character of `text`, the text node and offset it came from. */
	map: Array<[Text, number]>;
	/** The text nodes, in document order. */
	nodes: Text[];
}

export const normalise = (s: string) => s.replace(/\s+/g, ' ').trim();

export function buildIndex(root: Element): TextIndex {
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
		acceptNode: (n) =>
			n.parentElement?.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
	});
	let text = '';
	const map: Array<[Text, number]> = [];
	const nodes: Text[] = [];
	let lastBlock: Element | null = null;
	for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
		nodes.push(n);
		const block = n.parentElement?.closest(BLOCK) ?? null;
		if (text && block !== lastBlock && !text.endsWith(' ')) {
			text += ' ';
			map.push(map[map.length - 1]);
		}
		lastBlock = block;
		const s = n.data;
		for (let i = 0; i < s.length; i++) {
			if (/\s/.test(s[i])) {
				if (!text || text.endsWith(' ')) continue;
				text += ' ';
			} else {
				text += s[i];
			}
			map.push([n, i]);
		}
	}
	return { text, map, nodes };
}

/** The first index in `text` at or after a DOM boundary point. Binary search. */
export function indexAt(ix: TextIndex, container: Node, offset: number): number {
	const r = document.createRange();
	r.setStart(container, offset);
	r.collapse(true);
	let lo = 0;
	let hi = ix.map.length;
	while (lo < hi) {
		const mid = (lo + hi) >> 1;
		const [node, off] = ix.map[mid];
		if (r.comparePoint(node, off) < 0) lo = mid + 1;
		else hi = mid;
	}
	return lo;
}

const tail = (a: string, b: string) => {
	let n = 0;
	while (n < a.length && n < b.length && a[a.length - 1 - n] === b[b.length - 1 - n]) n++;
	return n;
};
const head = (a: string, b: string) => {
	let n = 0;
	while (n < a.length && n < b.length && a[n] === b[n]) n++;
	return n;
};

/** The [start, end) span of the section under a heading, in `text` indices. */
function sectionOf(ix: TextIndex, root: Element, id?: string): [number, number] | null {
	if (!id) return null;
	const heading = root.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
	if (!heading) return null;
	const level = Number(heading.tagName.slice(1)) || 6;
	const all = [...root.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')];
	const next = all.slice(all.indexOf(heading) + 1).find((h) => Number(h.tagName.slice(1)) <= level);
	const firstIn = (el: Element) => ix.map.findIndex(([n]) => el.contains(n));
	const s = firstIn(heading);
	const e = next ? firstIn(next) : -1;
	return s === -1 ? null : [s, e === -1 ? ix.text.length : e];
}

/**
 * Where a comment's quote is on the page now, or null if it is not.
 *
 * When the same words occur more than once, the occurrence inside the section it
 * was written under wins, then the one whose surrounding words match best.
 */
export function locate(
	ix: TextIndex,
	anchor: CommentAnchor,
	root: Element
): { start: number; end: number } | null {
	const q = normalise(anchor.quote);
	if (!q) return null;
	const hits: number[] = [];
	for (let at = ix.text.indexOf(q); at !== -1; at = ix.text.indexOf(q, at + 1)) hits.push(at);
	if (!hits.length) return null;
	let best = hits[0];
	if (hits.length > 1) {
		const section = sectionOf(ix, root, anchor.heading);
		let bestScore = -1;
		for (const h of hits) {
			const e = h + q.length;
			let score =
				tail(ix.text.slice(Math.max(0, h - 40), h), anchor.prefix ?? '') +
				head(ix.text.slice(e, e + 40), anchor.suffix ?? '');
			if (section && h >= section[0] && h < section[1]) score += 1000;
			if (score > bestScore) {
				bestScore = score;
				best = h;
			}
		}
	}
	return { start: best, end: best + q.length };
}

/**
 * Wrap `text[start, end)` in <mark> elements — one per text node it crosses, so
 * a passage spanning a link, an italic phrase or two paragraphs is marked without
 * ever putting a <mark> somewhere HTML does not allow one.
 */
export function wrapRange(ix: TextIndex, start: number, end: number, id: string): void {
	if (end <= start || end > ix.map.length) return;
	const [startNode, startOff] = ix.map[start];
	const [endNode, endOff] = ix.map[end - 1];
	const first = ix.nodes.indexOf(startNode);
	const last = ix.nodes.indexOf(endNode);
	if (first === -1 || last === -1) return;
	for (let i = first; i <= last; i++) {
		const node = ix.nodes[i];
		const from = node === startNode ? startOff : 0;
		const to = node === endNode ? endOff + 1 : node.data.length;
		// Whitespace-only runs sit between block elements; a <mark> there is invalid.
		if (to <= from || !node.data.slice(from, to).trim()) continue;
		let target = node;
		if (from > 0) target = target.splitText(from);
		if (to - from < target.data.length) target.splitText(to - from);
		const mark = document.createElement('mark');
		mark.className = 'rd-cmark';
		mark.dataset.rdComment = id;
		mark.title = 'A comment is attached to this passage';
		target.before(mark);
		mark.append(target);
	}
}

/** Remove every comment mark and rejoin the text nodes they split. */
export function unwrapMarks(root: Element): void {
	const parents = new Set<Node>();
	for (const m of root.querySelectorAll('mark.rd-cmark')) {
		const parent = m.parentNode;
		if (!parent) continue;
		m.replaceWith(...m.childNodes);
		parents.add(parent);
	}
	for (const p of parents) p.normalize();
}
