/**
 * comment-editor.ts — writing a comment while reading. DEV ONLY.
 *
 * reader-annotations.ts imports this behind `import.meta.env.DEV`, so it never
 * reaches dist/. The dev server's /__rd/comments endpoint (scripts/comments-dev.mjs)
 * is the only thing it talks to.
 *
 * His instruction, 2026-09-14: "The user selects a heading, paragraph, or
 * specific lines, which opens a comment pop-up with proper UI/UX, allowing long,
 * formatted, multi-paragraph comments — including bullet points and numbered
 * lists."
 *
 *   select any passage  →  a "Comment" button appears beside the selection
 *   press it            →  the editor opens, with the passage quoted at the top
 *   write               →  Markdown, with a toolbar, list continuation on Enter,
 *                          Tab to indent a list item, and a Preview tab that uses
 *                          the SAME renderer as the published page
 *   Ctrl/Cmd + Enter    →  save
 *
 * NOTHING IS LOST TO A FAILED SAVE. Every keystroke is mirrored into
 * localStorage, and the draft is offered back the next time the same passage is
 * selected. It is removed only after the dev server confirms the write.
 */

import { renderComment, type CommentAnchor, type ReaderComment } from '../lib/comments-shared';
import type { CommentsApi } from './reader-annotations';
import { buildIndex, indexAt } from './text-index';

const SKIP =
	'pre, .expressive-code, .rd-diagram, svg, button, input, textarea, .sl-anchor-link, [data-rd-noanchor]';
const DRAFT = 'rd-comment-draft';

let api: CommentsApi;
let attached = false;
let pending: Range | null = null;
let current: { anchor: CommentAnchor; comment?: ReaderComment } | null = null;
let dirty = false;

/* ---- small helpers ------------------------------------------------------- */

/** An ISO timestamp in HIS time zone, offset included — "2026-09-14T21:04:00+05:45". */
function localIso(d = new Date()) {
	const p = (n: number) => String(Math.abs(n)).padStart(2, '0');
	const off = -d.getTimezoneOffset();
	return (
		`${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}` +
		`${off >= 0 ? '+' : '-'}${p(Math.trunc(off / 60))}:${p(off % 60)}`
	);
}
const newId = () => `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const store = {
	get(): { page: string; quote: string; body: string } | null {
		try {
			return JSON.parse(localStorage.getItem(DRAFT) || 'null');
		} catch {
			return null;
		}
	},
	set(v: { page: string; quote: string; body: string } | null) {
		try {
			if (v) localStorage.setItem(DRAFT, JSON.stringify(v));
			else localStorage.removeItem(DRAFT);
		} catch {
			/* Blocked storage throws. The comment still saves; only the backup is lost. */
		}
	},
};

/* ---- the selection ------------------------------------------------------- */

function selectedRange(): Range | null {
	const root = api.content();
	const sel = window.getSelection();
	if (!root || !api.state() || !sel || sel.isCollapsed || !sel.rangeCount) return null;
	const r = sel.getRangeAt(0);
	if (!root.contains(r.commonAncestorContainer)) return null;
	const node = r.commonAncestorContainer;
	const el = node instanceof Element ? node : node.parentElement;
	if (el?.closest(SKIP) || !sel.toString().trim()) return null;
	return r;
}

function anchorFor(range: Range): CommentAnchor | null {
	const root = api.content();
	if (!root) return null;
	const ix = buildIndex(root);
	let start = indexAt(ix, range.startContainer, range.startOffset);
	let end = indexAt(ix, range.endContainer, range.endOffset);
	while (start < end && ix.text[start] === ' ') start++;
	while (end > start && ix.text[end - 1] === ' ') end--;
	if (end <= start) return null;

	let heading: HTMLElement | null = null;
	for (const h of root.querySelectorAll<HTMLElement>('h2[id], h3[id]')) {
		const before =
			h.contains(range.startContainer) ||
			!!(h.compareDocumentPosition(range.startContainer) & Node.DOCUMENT_POSITION_FOLLOWING);
		if (!before) break;
		heading = h;
	}
	return {
		heading: heading?.id,
		headingText: heading?.textContent?.trim() || undefined,
		quote: ix.text.slice(start, end),
		prefix: ix.text.slice(Math.max(0, start - 40), start),
		suffix: ix.text.slice(end, end + 40),
	};
}

function addButton(): HTMLButtonElement {
	const found = document.querySelector<HTMLButtonElement>('button.rd-cadd');
	if (found) return found;
	const b = document.createElement('button');
	b.type = 'button';
	b.className = 'rd-cadd';
	b.setAttribute('popover', 'manual');
	b.textContent = 'Comment';
	// Pressing the button must not collapse the selection it is about.
	b.addEventListener('pointerdown', (e) => e.preventDefault());
	b.addEventListener('click', () => {
		const r = pending;
		hideAdd();
		if (r) openEditor({ range: r });
	});
	document.body.append(b);
	return b;
}

function showAdd(r: Range) {
	const rects = r.getClientRects();
	const last = rects[rects.length - 1] ?? r.getBoundingClientRect();
	const b = addButton();
	pending = r.cloneRange();
	b.style.top = `${Math.round(Math.min(window.innerHeight - 48, last.bottom + 8))}px`;
	b.style.left = `${Math.round(Math.max(8, Math.min(window.innerWidth - 116, last.right - 44)))}px`;
	try {
		if (!b.matches(':popover-open')) b.showPopover();
	} catch {
		/* already showing */
	}
}

function hideAdd() {
	const b = document.querySelector<HTMLElement>('button.rd-cadd');
	try {
		if (b?.matches(':popover-open')) b.hidePopover();
	} catch {
		/* not showing */
	}
}

/* ---- the editor ---------------------------------------------------------- */

const q = <T extends Element>(root: ParentNode, sel: string) => root.querySelector(sel) as T;

function editor(): HTMLDialogElement {
	const found = document.querySelector<HTMLDialogElement>('dialog.rd-ceditor');
	if (found) return found;
	const d = document.createElement('dialog');
	d.className = 'rd-ceditor';
	d.setAttribute('aria-labelledby', 'rd-ceditor-title');
	d.innerHTML = `
		<div class="rd-ceditor__head">
			<h2 class="rd-ceditor__title" id="rd-ceditor-title">New comment</h2>
			<button type="button" class="rd-btn" data-act="cancel">Close</button>
		</div>
		<div class="rd-ceditor__scroll">
			<p class="rd-ceditor__where" data-el="where"></p>
			<blockquote class="rd-ceditor__quote" data-el="quote"></blockquote>
			<div class="rd-ceditor__bar">
				<div class="rd-ceditor__tabs" role="tablist" aria-label="Write or preview">
					<button type="button" class="rd-btn" role="tab" aria-selected="true" data-tab="write">Write</button>
					<button type="button" class="rd-btn" role="tab" aria-selected="false" data-tab="preview">Preview</button>
				</div>
				<div class="rd-ceditor__tools" role="toolbar" aria-label="Formatting" data-el="tools">
					<button type="button" class="rd-btn" data-fmt="bold" title="Bold (Ctrl+B)"><strong>B</strong></button>
					<button type="button" class="rd-btn" data-fmt="italic" title="Italic (Ctrl+I)"><em>I</em></button>
					<button type="button" class="rd-btn" data-fmt="bullets" title="Bulleted list">• List</button>
					<button type="button" class="rd-btn" data-fmt="numbers" title="Numbered list">1. List</button>
					<button type="button" class="rd-btn" data-fmt="quote" title="Quote">“ Quote</button>
					<button type="button" class="rd-btn" data-fmt="link" title="Link">Link</button>
				</div>
			</div>
			<textarea class="rd-ceditor__text" data-el="text" rows="12" aria-label="Your comment" spellcheck="true"></textarea>
			<div class="rd-ceditor__preview" data-el="preview" hidden></div>
			<p class="rd-ceditor__help">A blank line starts a new paragraph. Start a line with <code>-</code> for bullets or <code>1.</code> for numbers; Enter continues the list and Tab indents it. <kbd>Ctrl</kbd> + <kbd>Enter</kbd> saves.</p>
			<label class="rd-ceditor__local"><input type="checkbox" data-el="local"> Keep this comment local — never publish it</label>
			<p class="rd-ceditor__note" data-el="note" hidden></p>
			<p class="rd-ceditor__error" data-el="error" role="alert" hidden></p>
		</div>
		<div class="rd-ceditor__foot">
			<button type="button" class="rd-btn rd-btn--danger" data-act="delete" hidden>Delete</button>
			<span class="rd-ceditor__spacer"></span>
			<button type="button" class="rd-btn" data-act="cancel">Cancel</button>
			<button type="button" class="rd-btn rd-btn--primary" data-act="save">Save comment</button>
		</div>`;
	document.body.append(d);

	const text = q<HTMLTextAreaElement>(d, '[data-el="text"]');
	text.addEventListener('input', () => {
		dirty = true;
		const s = api.state();
		if (s && current && !current.comment) store.set({ page: s.page, quote: current.anchor.quote, body: text.value });
	});
	text.addEventListener('keydown', (e) => onKey(e, text));
	d.addEventListener('click', (e) => {
		const t = e.target as HTMLElement;
		const act = t.closest<HTMLElement>('[data-act]')?.dataset.act;
		if (act === 'cancel') return cancel(d);
		if (act === 'save') return void save(d);
		if (act === 'delete' && current?.comment) return void remove(current.comment.id, d);
		const tab = t.closest<HTMLElement>('[data-tab]')?.dataset.tab;
		if (tab) return setTab(d, tab as 'write' | 'preview');
		const fmt = t.closest<HTMLElement>('[data-fmt]')?.dataset.fmt;
		if (fmt) format(text, fmt);
	});
	d.addEventListener('cancel', (e) => {
		if (dirty && !window.confirm('Discard this comment? It has not been saved.')) e.preventDefault();
	});
	return d;
}

function setTab(d: HTMLDialogElement, tab: 'write' | 'preview') {
	const text = q<HTMLTextAreaElement>(d, '[data-el="text"]');
	const preview = q<HTMLElement>(d, '[data-el="preview"]');
	for (const b of d.querySelectorAll<HTMLElement>('[data-tab]'))
		b.setAttribute('aria-selected', String(b.dataset.tab === tab));
	q<HTMLElement>(d, '[data-el="tools"]').hidden = tab === 'preview';
	text.hidden = tab === 'preview';
	preview.hidden = tab === 'write';
	if (tab === 'preview')
		preview.innerHTML = renderComment(text.value) || '<p class="rd-ceditor__nothing">Nothing to preview yet.</p>';
	else text.focus();
}

function openEditor(opts: { range?: Range; comment?: ReaderComment }) {
	const s = api.state();
	const anchor = opts.comment?.anchor ?? (opts.range ? anchorFor(opts.range) : null);
	if (!s || !anchor) return;
	const d = editor();
	current = { anchor, comment: opts.comment };
	const draft = store.get();
	const restored = !opts.comment && draft?.page === s.page && draft.quote === anchor.quote ? draft.body : null;

	q<HTMLElement>(d, '#rd-ceditor-title').textContent = opts.comment ? 'Edit comment' : 'New comment';
	const where = q<HTMLElement>(d, '[data-el="where"]');
	where.textContent = anchor.headingText ? `Under “${anchor.headingText}”` : '';
	where.hidden = !anchor.headingText;
	q<HTMLElement>(d, '[data-el="quote"]').textContent = anchor.quote;
	const text = q<HTMLTextAreaElement>(d, '[data-el="text"]');
	text.value = opts.comment?.body ?? restored ?? '';
	// An edit keeps the comment's own setting; a NEW comment on a sensitive-domain
	// page starts local, his decision of 2026-09-14 (MarkdownContent.astro).
	q<HTMLInputElement>(d, '[data-el="local"]').checked = opts.comment
		? opts.comment.visibility === 'local'
		: s.defaultLocal;
	q<HTMLElement>(d, '[data-act="delete"]').hidden = !opts.comment;
	const note = q<HTMLElement>(d, '[data-el="note"]');
	note.textContent = restored ? 'An unsaved draft for this passage was restored.' : '';
	note.hidden = !restored;
	q<HTMLElement>(d, '[data-el="error"]').hidden = true;
	dirty = false;

	window.getSelection()?.removeAllRanges();
	d.showModal();
	setTab(d, 'write');
	text.setSelectionRange(text.value.length, text.value.length);
}

function cancel(d: HTMLDialogElement) {
	if (dirty && !window.confirm('Discard this comment? It has not been saved.')) return;
	dirty = false;
	d.close();
}

function fail(d: HTMLDialogElement, msg: string) {
	const el = q<HTMLElement>(d, '[data-el="error"]');
	el.textContent = msg;
	el.hidden = false;
}

async function save(d: HTMLDialogElement) {
	const s = api.state();
	if (!s || !current) return;
	const body = q<HTMLTextAreaElement>(d, '[data-el="text"]').value.replace(/\s+$/, '');
	if (!body.trim()) return fail(d, 'Write something first — an empty comment is not saved.');
	const visibility = q<HTMLInputElement>(d, '[data-el="local"]').checked ? 'local' : 'public';
	const now = localIso();
	const id = current.comment?.id ?? newId();
	const next: ReaderComment[] = current.comment
		? s.comments.map((c) => (c.id === id ? { ...c, body, visibility, updated: now } : c))
		: [...s.comments, { id, created: now, visibility, anchor: current.anchor, body }];

	const btn = q<HTMLButtonElement>(d, '[data-act="save"]');
	btn.disabled = true;
	btn.textContent = 'Saving…';
	try {
		await api.save(next);
		store.set(null);
		dirty = false;
		d.close();
		api.flashMarks(id);
	} catch (e) {
		fail(
			d,
			`Not saved: ${(e as Error).message}. The text is kept in this browser, so reloading loses nothing.`
		);
	} finally {
		btn.disabled = false;
		btn.textContent = 'Save comment';
	}
}

async function remove(id: string, d?: HTMLDialogElement) {
	const s = api.state();
	if (!s || !window.confirm('Delete this comment? This removes it from the file beside the page.')) return;
	try {
		await api.save(s.comments.filter((c) => c.id !== id));
		dirty = false;
		d?.close();
	} catch (e) {
		if (d) fail(d, `Not deleted: ${(e as Error).message}`);
		else window.alert(`Not deleted: ${(e as Error).message}`);
	}
}

/* ---- writing Markdown without having to think about Markdown ------------- */

function lineBounds(v: string, s: number, e: number) {
	const from = v.lastIndexOf('\n', s - 1) + 1;
	const nl = v.indexOf('\n', e);
	return [from, nl === -1 ? v.length : nl] as const;
}

function format(t: HTMLTextAreaElement, kind: string) {
	const { selectionStart: s, selectionEnd: e, value: v } = t;
	const wrap = (before: string, after: string, placeholder: string) => {
		const inner = v.slice(s, e) || placeholder;
		t.setRangeText(`${before}${inner}${after}`, s, e, 'end');
		t.setSelectionRange(s + before.length, s + before.length + inner.length);
	};
	if (kind === 'bold') wrap('**', '**', 'bold text');
	else if (kind === 'italic') wrap('*', '*', 'italic text');
	else if (kind === 'link') {
		const label = v.slice(s, e) || 'link text';
		t.setRangeText(`[${label}](https://)`, s, e, 'end');
		const url = s + label.length + 3;
		t.setSelectionRange(url, url + 8);
	} else {
		const [from, to] = lineBounds(v, s, e);
		const lines = v.slice(from, to).split('\n');
		const marker = (i: number) => (kind === 'bullets' ? '- ' : kind === 'numbers' ? `${i + 1}. ` : '> ');
		const has = kind === 'bullets' ? /^\s*[-*+]\s/ : kind === 'numbers' ? /^\s*\d+[.)]\s/ : /^\s*>\s?/;
		const allHave = lines.every((l) => has.test(l) || !l.trim());
		const out = lines.map((l, i) => (allHave ? l.replace(has, '') : `${marker(i)}${l}`)).join('\n');
		t.setRangeText(out, from, to, 'select');
	}
	t.focus();
	t.dispatchEvent(new Event('input'));
}

const ITEM = /^(\s*)([-*+]|(\d{1,3})([.)]))\s+(.*)$/;

function onKey(e: KeyboardEvent, t: HTMLTextAreaElement) {
	const mod = e.ctrlKey || e.metaKey;
	if (mod && e.key === 'Enter') {
		e.preventDefault();
		void save(t.closest('dialog') as HTMLDialogElement);
		return;
	}
	if (mod && (e.key === 'b' || e.key === 'i')) {
		e.preventDefault();
		format(t, e.key === 'b' ? 'bold' : 'italic');
		return;
	}
	const { selectionStart: s, selectionEnd: end, value: v } = t;
	const lineStart = v.lastIndexOf('\n', s - 1) + 1;
	const line = v.slice(lineStart, s);
	const m = line.match(ITEM);

	if (e.key === 'Enter' && !e.shiftKey && !mod && s === end && (m || /^\s*>\s?/.test(line))) {
		e.preventDefault();
		if (m && !m[5].trim()) {
			// Enter on an empty item ends the list, the way every editor does.
			t.setRangeText('', lineStart, s, 'end');
		} else if (m) {
			const nextMarker = m[3] ? `${Number(m[3]) + 1}${m[4]}` : m[2];
			t.setRangeText(`\n${m[1]}${nextMarker} `, s, s, 'end');
		} else {
			t.setRangeText(line.trim() === '>' ? '' : '\n> ', line.trim() === '>' ? lineStart : s, s, 'end');
		}
		t.dispatchEvent(new Event('input'));
		return;
	}
	if (e.key === 'Tab' && !mod && m) {
		// Tab indents a list item. Anywhere else it moves focus, as it should.
		e.preventDefault();
		if (e.shiftKey) {
			const remove = Math.min(2, m[1].length);
			if (remove) t.setRangeText('', lineStart, lineStart + remove, 'preserve');
			t.setSelectionRange(s - remove, end - remove);
		} else {
			t.setRangeText('  ', lineStart, lineStart, 'preserve');
			t.setSelectionRange(s + 2, end + 2);
		}
		t.dispatchEvent(new Event('input'));
	}
}

/* ---- wiring, once ---------------------------------------------------------- */

export function attachEditor(a: CommentsApi) {
	api = a;
	if (attached) return;
	attached = true;

	let timer: ReturnType<typeof setTimeout> | undefined;
	document.addEventListener('selectionchange', () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			if (document.querySelector('dialog[open]')) return hideAdd();
			const r = selectedRange();
			if (r) showAdd(r);
			else hideAdd();
		}, 140);
	});
	window.addEventListener(
		'scroll',
		() => {
			const r = selectedRange();
			if (r) showAdd(r);
			else hideAdd();
		},
		{ passive: true }
	);

	document.addEventListener('click', (e) => {
		const t = e.target as HTMLElement;
		const edit = t.closest<HTMLElement>('[data-rd-cedit]')?.dataset.rdCedit;
		const del = t.closest<HTMLElement>('[data-rd-cdelete]')?.dataset.rdCdelete;
		const s = api.state();
		if (edit && s) {
			const c = s.comments.find((x) => x.id === edit);
			if (c) openEditor({ comment: c });
		}
		if (del) void remove(del);
	});

	document.addEventListener('astro:before-swap', () => {
		hideAdd();
		pending = null;
	});
}
