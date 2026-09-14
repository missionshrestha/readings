/**
 * comments-shared.ts — the shape of a comment, and the one renderer for it.
 *
 * Imported by FOUR places, and the reason it is one file is that they must agree:
 *
 *   src/overrides/MarkdownContent.astro   renders the read-only list at BUILD time
 *   src/scripts/reader-annotations.ts     re-renders that list in the browser
 *   src/scripts/comment-editor.ts         previews a draft while he writes, in dev
 *   scripts/comments-dev.mjs              validates what the dev server writes
 *
 * If the preview and the published page used different renderers, a comment
 * would look one way while he wrote it and another way on the site, and nothing
 * would say so. No node: imports here — it runs in the browser too.
 *
 * ---------------------------------------------------------------------------
 * WHY A SMALL MARKDOWN SUBSET AND NOT A RICH-TEXT EDITOR
 *
 * His instruction, 2026-09-14: comments must allow "long, formatted,
 * multi-paragraph comments — including bullet points and numbered lists".
 *
 * A contenteditable editor stores HTML, and HTML typed into a page that is then
 * published is HTML that has to be sanitised forever. Markdown stores TEXT: the
 * file stays readable in a diff, and the renderer below ESCAPES EVERYTHING FIRST
 * and only then adds the handful of tags it knows. There is no path by which a
 * `<script>` in a comment reaches the page as a tag.
 *
 * Supported, and nothing else:
 *   paragraphs (a blank line), line breaks (a single newline)
 *   - bullet lists  ·  1. numbered lists  ·  nested by indenting two spaces
 *   > quotes  ·  **bold**  ·  *italic*  ·  `code`
 *   [text](https://…) and root-absolute [text](/path/) links
 */

export interface CommentAnchor {
	/** The id of the nearest heading above the passage, e.g. "the-teaching-pass". */
	heading?: string;
	/** That heading's text, kept so a detached comment still says where it was. */
	headingText?: string;
	/** The exact words he selected, whitespace collapsed. The anchor itself. */
	quote: string;
	/** Up to 40 characters before and after, to choose between repeats of the quote. */
	prefix?: string;
	suffix?: string;
}

export interface ReaderComment {
	id: string;
	created: string;
	updated?: string;
	/** `local` never leaves the repository: it is filtered out of every build. */
	visibility: 'public' | 'local';
	anchor: CommentAnchor;
	/** Markdown, in the subset above. */
	body: string;
}

const str = (v: unknown, max = 20000): string | undefined =>
	typeof v === 'string' && v.length <= max ? v : undefined;

/**
 * Keep every well-formed comment and drop the rest, never throwing.
 *
 * The same degrade-never-break rule as src/content.config.ts: a hand-damaged
 * comments file must cost that page its comments, not the whole build.
 */
export function normaliseComments(raw: unknown): ReaderComment[] {
	const list = Array.isArray(raw)
		? raw
		: raw && typeof raw === 'object' && Array.isArray((raw as { comments?: unknown }).comments)
			? (raw as { comments: unknown[] }).comments
			: [];
	const out: ReaderComment[] = [];
	for (const c of list) {
		if (!c || typeof c !== 'object') continue;
		const o = c as Record<string, unknown>;
		const a = (o.anchor ?? {}) as Record<string, unknown>;
		const id = str(o.id, 80);
		const body = str(o.body);
		const quote = str(a.quote, 4000);
		const created = str(o.created, 40);
		/* The id reaches HTML attributes and CSS selectors, so it is held to a
		   pattern that needs no escaping in either. */
		if (!id || !/^[a-z0-9-]+$/i.test(id) || body === undefined || !quote || !created) continue;
		out.push({
			id,
			created,
			updated: str(o.updated, 40),
			visibility: o.visibility === 'local' ? 'local' : 'public',
			anchor: {
				heading: str(a.heading, 200),
				headingText: str(a.headingText, 300),
				quote,
				prefix: str(a.prefix, 200),
				suffix: str(a.suffix, 200),
			},
			body,
		});
	}
	return out;
}

/* ------------------------------------------------------------------------- */

export const escapeHtml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/*
 * The placeholder that protects a code span while bold and italic are applied.
 * A Private Use Area character, because it cannot occur in anything he types —
 * the first version used plain spaces and would have turned " 3 " in an ordinary
 * sentence into the fourth code span on the page.
 */
const HOLD = '\uE000';
const HELD = new RegExp(`${HOLD}(\\d+)${HOLD}`, 'g');

/** Inline formatting, applied to text that has ALREADY been escaped. */
function inline(text: string): string {
	let s = escapeHtml(text.replaceAll(HOLD, ''));
	const codes: string[] = [];
	s = s.replace(/`([^`\n]+)`/g, (_, c: string) => {
		codes.push(c);
		return `${HOLD}${codes.length - 1}${HOLD}`;
	});
	s = s.replace(
		/\[([^\]\n]+)\]\(((?:https?:\/\/|\/)[^\s)]*)\)/g,
		(_, t: string, u: string) => `<a href="${u}" rel="nofollow noopener">${t}</a>`
	);
	/* Emphasis needs a non-space just inside each marker, as in CommonMark — so
	   "2 * 3 * 4" stays arithmetic. Measured: the first version italicised it. */
	s = s.replace(/\*\*(?!\s)([^*\n]+?)(?<!\s)\*\*/g, '<strong>$1</strong>');
	s = s.replace(/(^|[^*\w])\*(?![\s*])([^*\n]+?)(?<!\s)\*(?![*\w])/g, '$1<em>$2</em>');
	s = s.replace(/(^|[^_\w])_(?![\s_])([^_\n]+?)(?<!\s)_(?![_\w])/g, '$1<em>$2</em>');
	return s.replace(HELD, (_, i: string) => `<code>${codes[Number(i)]}</code>`);
}

const LIST = /^(\s*)([-*+]|\d{1,3}[.)])\s+(.*)$/;
const QUOTE = /^\s*>\s?/;
const indentOf = (line: string) => line.length - line.trimStart().length;

function list(lines: string[], start: number, base: number): { html: string; next: number } {
	const first = lines[start].match(LIST)!;
	const ordered = /\d/.test(first[2]);
	const startAt = ordered ? parseInt(first[2], 10) : 1;
	const items: string[] = [];
	let i = start;
	while (i < lines.length) {
		const line = lines[i];
		const m = line.match(LIST);
		if (!m) {
			if (!line.trim()) {
				// A blank line ends the list unless the next item continues it.
				let j = i + 1;
				while (j < lines.length && !lines[j].trim()) j++;
				const n = j < lines.length ? lines[j].match(LIST) : null;
				if (n && n[1].length >= base && (n[1].length > base || /\d/.test(n[2]) === ordered)) {
					i = j;
					continue;
				}
				break;
			}
			// An indented line with no marker continues the item above it.
			if (items.length && indentOf(line) > base) {
				items[items.length - 1] += `<br>${inline(line.trim())}`;
				i++;
				continue;
			}
			break;
		}
		const indent = m[1].length;
		if (indent < base) break;
		if (indent > base && items.length) {
			const sub = list(lines, i, indent);
			items[items.length - 1] += sub.html;
			i = sub.next;
			continue;
		}
		if (/\d/.test(m[2]) !== ordered) break;
		items.push(inline(m[3]));
		i++;
	}
	const tag = ordered ? 'ol' : 'ul';
	const attr = ordered && startAt !== 1 ? ` start="${startAt}"` : '';
	return { html: `<${tag}${attr}>${items.map((x) => `<li>${x}</li>`).join('')}</${tag}>`, next: i };
}

/** Render a comment body to HTML. Everything is escaped before any tag is added. */
export function renderComment(src: string): string {
	const lines = String(src ?? '').replace(/\r\n?/g, '\n').split('\n');
	const out: string[] = [];
	let i = 0;
	while (i < lines.length) {
		const line = lines[i];
		if (!line.trim()) {
			i++;
			continue;
		}
		if (QUOTE.test(line)) {
			const inner: string[] = [];
			while (i < lines.length && QUOTE.test(lines[i])) inner.push(lines[i++].replace(QUOTE, ''));
			out.push(`<blockquote>${renderComment(inner.join('\n'))}</blockquote>`);
			continue;
		}
		if (LIST.test(line)) {
			const l = list(lines, i, indentOf(line));
			out.push(l.html);
			i = l.next;
			continue;
		}
		const para: string[] = [];
		while (i < lines.length && lines[i].trim() && !LIST.test(lines[i]) && !QUOTE.test(lines[i]))
			para.push(lines[i++].trim());
		out.push(`<p>${para.map(inline).join('<br>')}</p>`);
	}
	return out.join('');
}

/* ------------------------------------------------------------------------- */

const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * "2026-09-14T21:04:00+05:45" → "14 September 2026".
 *
 * Read off the string rather than through Date, so the build (UTC on Cloudflare)
 * and his browser (Kathmandu) print the same day for the same comment. A comment
 * written at 01:00 local time is not "yesterday" on the public site.
 */
export function formatWhen(iso: string): string {
	const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
	return m && MONTHS[Number(m[2]) - 1] ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : iso;
}

/**
 * One entry in the comments list. The build and the browser both call this, so
 * the server-rendered list and the one re-drawn after an edit are byte-identical.
 */
export function renderCommentItem(c: ReaderComment, opts: { editable: boolean }): string {
	const quote = c.anchor.quote.length > 240 ? `${c.anchor.quote.slice(0, 237).trimEnd()}…` : c.anchor.quote;
	const heading = c.anchor.headingText
		? `<span class="rd-citem__heading">${escapeHtml(c.anchor.headingText)}</span>`
		: '';
	const edited =
		c.updated && c.updated.slice(0, 10) !== c.created.slice(0, 10) ? ` · edited ${formatWhen(c.updated)}` : '';
	const local =
		c.visibility === 'local' ? ' · <span class="rd-citem__local">Local only — never published</span>' : '';
	const actions = opts.editable
		? `<p class="rd-citem__actions"><button type="button" class="rd-btn" data-rd-cedit="${c.id}">Edit</button>` +
			`<button type="button" class="rd-btn rd-btn--danger" data-rd-cdelete="${c.id}">Delete</button></p>`
		: '';
	return (
		`<li class="rd-citem" data-rd-citem="${c.id}">` +
		`<button type="button" class="rd-citem__where" data-rd-jump="${c.id}">${heading}` +
		`<span class="rd-citem__quote">${escapeHtml(quote)}</span></button>` +
		`<div class="rd-citem__body">${renderComment(c.body)}</div>` +
		`<p class="rd-citem__meta"><time datetime="${escapeHtml(c.created)}">${formatWhen(c.created)}</time>${edited}${local}</p>` +
		actions +
		`</li>`
	);
}
