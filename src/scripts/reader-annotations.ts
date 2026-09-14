/**
 * reader-annotations.ts — what a reading page does in the browser beyond
 * displaying prose. SITE CHROME. Three behaviours, all asked for on 2026-09-14
 * after he read the sample book (context/reader.md section 10):
 *
 *   1 · COMMENTS    his comments, marked on the passages they were written on,
 *                   and listed in a drawer behind one header button. Read-only
 *                   on the built site; in `astro dev` the editor is loaded too.
 *   2 · DIALOGUE    under `### How the exchange went`, each paragraph labelled
 *                   Me: or AI: is drawn as one side of a conversation.
 *   3 · DIAGRAMS    every Mermaid diagram stays inside the text column and gets
 *                   an Expand control that opens it full screen, with zoom.
 *
 * Loaded from src/overrides/MarkdownContent.astro, so it is bundled ONCE and
 * survives client-side navigation. Everything is (re)applied on
 * `astro:page-load`, which fires on the first load and after every chapter turn.
 *
 * WITHOUT JAVASCRIPT all three degrade to something readable: the comments list
 * is server-rendered inside the drawer, the dialogue is labelled paragraphs, and
 * a diagram is a diagram that simply cannot be expanded.
 */

import { renderCommentItem, type ReaderComment } from '../lib/comments-shared';
import { buildIndex, locate, unwrapMarks, wrapRange } from './text-index';

export interface PageComments {
	page: string;
	editable: boolean;
	/** A new comment starts local — true on a page in a sensitive domain. */
	defaultLocal: boolean;
	comments: ReaderComment[];
}

/** What the dev-only editor is given. Nothing else in this file is exported. */
export interface CommentsApi {
	state(): PageComments | null;
	content(): HTMLElement | null;
	save(next: ReaderComment[]): Promise<void>;
	openDrawer(focusId?: string): void;
	flashMarks(id: string): void;
}

let state: PageComments | null = null;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const content = () => document.querySelector<HTMLElement>('.sl-markdown-content');
const drawer = () => document.querySelector<HTMLElement>('[data-rd-cdrawer]');

/** `:popover-open` throws in a browser that predates it, rather than failing to match. */
const isOpen = (el: Element | null) => {
	try {
		return !!el?.matches(':popover-open');
	} catch {
		return false;
	}
};

function flash(el: Element) {
	el.classList.remove('is-flash');
	void (el as HTMLElement).offsetWidth;
	el.classList.add('is-flash');
	setTimeout(() => el.classList.remove('is-flash'), 1600);
}

/* ==========================================================================
 * 1 · COMMENTS
 * ========================================================================== */

function readPayload(): PageComments | null {
	const el = document.querySelector<HTMLScriptElement>('script[data-rd-comments]');
	if (!el) return null;
	try {
		const d = JSON.parse(el.textContent || '{}');
		return {
			page: String(d.page ?? ''),
			editable: d.editable === true,
			defaultLocal: d.defaultLocal === true,
			comments: Array.isArray(d.comments) ? d.comments : [],
		};
	} catch {
		return null;
	}
}

/*
 * EVERY LOOKUP OF A HEADER CONTROL IS querySelectorAll — Starlight renders the
 * SocialIcons slot twice (CLAUDE.md stack fact 17), so the visible button is a
 * different element at 420px than at 1280px.
 */
function syncToggles() {
	const show = !!state && (state.editable || state.comments.length > 0);
	const open = isOpen(drawer());
	for (const b of document.querySelectorAll<HTMLElement>('[data-rd-comments-toggle]')) {
		b.hidden = !show;
		b.setAttribute('aria-expanded', String(open));
	}
}

function applyComments() {
	const root = content();
	const d = drawer();
	if (!root || !state) return syncToggles();

	unwrapMarks(root);
	const at = new Map<string, number>();
	for (const c of state.comments) {
		// Re-indexed per comment: each wrap splits text nodes the next one needs.
		const ix = buildIndex(root);
		const hit = locate(ix, c.anchor, root);
		if (!hit) continue;
		wrapRange(ix, hit.start, hit.end, c.id);
		at.set(c.id, hit.start);
	}

	const list = d?.querySelector<HTMLElement>('[data-rd-clist]');
	if (list) {
		const ordered = [...state.comments].sort(
			(a, b) => (at.get(a.id) ?? Number.POSITIVE_INFINITY) - (at.get(b.id) ?? Number.POSITIVE_INFINITY)
		);
		list.innerHTML = ordered.map((c) => renderCommentItem(c, { editable: state!.editable })).join('');
		for (const c of ordered) {
			if (at.has(c.id)) continue;
			const li = list.querySelector(`[data-rd-citem="${c.id}"]`);
			li?.classList.add('is-detached');
			li?.insertAdjacentHTML(
				'beforeend',
				'<p class="rd-citem__detached">The passage this was written on is no longer on the page, so it is kept here with its original words.</p>'
			);
		}
	}
	const empty = d?.querySelector<HTMLElement>('[data-rd-cempty]');
	if (empty) empty.hidden = state.comments.length > 0;
	syncToggles();
}

function openDrawer(focusId?: string) {
	const d = drawer();
	if (!d) return;
	if (!isOpen(d)) d.showPopover();
	syncToggles();
	const item = focusId ? d.querySelector<HTMLElement>(`[data-rd-citem="${focusId}"]`) : null;
	if (item) {
		item.scrollIntoView({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' });
		flash(item);
		item.querySelector<HTMLElement>('[data-rd-jump]')?.focus({ preventScroll: true });
	} else {
		d.querySelector<HTMLElement>('[data-rd-cdrawer-close]')?.focus();
	}
}

function closeDrawer() {
	const d = drawer();
	if (d && isOpen(d)) d.hidePopover();
	syncToggles();
}

function flashMarks(id: string) {
	for (const m of document.querySelectorAll(`mark.rd-cmark[data-rd-comment="${id}"]`)) flash(m);
}

function jumpTo(id: string) {
	const mark = document.querySelector<HTMLElement>(`mark.rd-cmark[data-rd-comment="${id}"]`);
	if (!mark) return;
	// On a phone the drawer covers the page it is pointing at.
	if (window.matchMedia('(max-width: 50rem)').matches) closeDrawer();
	mark.scrollIntoView({ block: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' });
	flashMarks(id);
}

const api: CommentsApi = {
	state: () => state,
	content,
	openDrawer,
	flashMarks,
	async save(next) {
		/*
		 * Guarded here as well as at the import below, so the build removes the
		 * request itself and not only the editor that calls it: the public bundle
		 * should not even name an endpoint that exists only on a dev server.
		 */
		if (!import.meta.env.DEV) return;
		const s = state;
		if (!s) return;
		const res = await fetch('/__rd/comments', {
			method: 'PUT',
			headers: { 'content-type': 'application/json', 'x-readings-comments': '1' },
			body: JSON.stringify({ page: s.page, comments: next }),
		});
		const data = await res.json().catch(() => ({}));
		if (!res.ok) throw new Error(data.error || `the dev server answered ${res.status}`);
		s.comments = Array.isArray(data.comments) ? data.comments : next;
		applyComments();
	},
};

/* ==========================================================================
 * 2 · DIALOGUE — the turns under `### How the exchange went`
 *
 * The heading id is Starlight's slug of the fixed string in
 * context/chapter-spine.md section 6. A paragraph whose first child is a bold
 * label starts a turn; everything after it, until the next label or heading,
 * belongs to that turn. context/md-spec.md section 5c is the authoring side.
 * ========================================================================== */

const LABEL = /^(me|ai(\s*\(as sceptic\))?)\s*:?$/i;

function tagDialogue() {
	const heading = document.getElementById('how-the-exchange-went');
	if (!heading) return;
	let el = (heading.closest('.sl-heading-wrapper') ?? heading).nextElementSibling;
	let who: string | null = null;
	while (el && !el.matches('.sl-heading-wrapper, h1, h2, h3, h4')) {
		const lead = el.tagName === 'P' ? el.firstChild : null;
		if (lead instanceof HTMLElement && lead.tagName === 'STRONG' && LABEL.test(lead.textContent?.trim() ?? '')) {
			const label = lead.textContent!.trim().toLowerCase();
			who = label.startsWith('me') ? 'me' : 'ai';
			(el as HTMLElement).dataset.rdTurnStart = label.includes('sceptic') ? 'sceptic' : '';
		}
		if (who) (el as HTMLElement).dataset.rdTurn = who;
		el = el.nextElementSibling;
	}
}

/* ==========================================================================
 * 3 · DIAGRAMS — in the column, with Expand
 *
 * The control lives in a wrapper AROUND pre.mermaid, never inside it:
 * astro-mermaid re-renders a diagram on every theme change by replacing the
 * pre's innerHTML (astro-mermaid-integration.js:551), which would delete
 * anything placed inside it. Moving the <pre> into the dialog, rather than
 * cloning its SVG, keeps the SVG's ids unique — mermaid's arrowheads and its
 * themeCSS are both scoped by id.
 * ========================================================================== */

const ZOOM = [1, 1.5, 2, 3, 4];
const moved = new WeakMap<HTMLDialogElement, { pre: HTMLElement; spot: Comment }>();

function enhanceDiagrams() {
	for (const pre of document.querySelectorAll<HTMLElement>('.sl-markdown-content pre.mermaid')) {
		if (pre.parentElement?.classList.contains('rd-diagram')) continue;
		const wrap = document.createElement('div');
		wrap.className = 'rd-diagram';
		pre.before(wrap);
		wrap.append(pre);
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'rd-diagram__expand';
		btn.dataset.rdExpand = '';
		btn.innerHTML =
			'<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg><span>Expand</span>';
		btn.setAttribute('aria-label', 'Expand diagram to full screen');
		wrap.append(btn);
	}
}

function diagramDialog(): HTMLDialogElement {
	const found = document.querySelector<HTMLDialogElement>('dialog.rd-diagram-dialog');
	if (found) return found;
	const dlg = document.createElement('dialog');
	dlg.className = 'rd-diagram-dialog';
	dlg.setAttribute('aria-label', 'Diagram, full screen');
	dlg.innerHTML =
		'<div class="rd-diagram-dialog__head">' +
		'<p class="rd-diagram-dialog__title">Diagram</p>' +
		'<button type="button" class="rd-btn" data-rd-zoom="out" aria-label="Zoom out">−</button>' +
		'<button type="button" class="rd-btn" data-rd-zoom="fit">Fit</button>' +
		'<button type="button" class="rd-btn" data-rd-zoom="in" aria-label="Zoom in">+</button>' +
		'<button type="button" class="rd-btn rd-btn--primary" data-rd-diagram-close>Close</button>' +
		'</div><div class="rd-diagram-dialog__stage" data-rd-stage></div>';
	document.body.append(dlg);
	dlg.addEventListener('close', () => {
		const m = moved.get(dlg);
		if (!m) return;
		m.spot.replaceWith(m.pre);
		moved.delete(dlg);
		m.pre.parentElement?.querySelector<HTMLElement>('[data-rd-expand]')?.focus({ preventScroll: true });
	});
	dlg.addEventListener('click', (e) => {
		const t = e.target as HTMLElement;
		if (t.closest('[data-rd-diagram-close]')) return dlg.close();
		const z = t.closest<HTMLElement>('[data-rd-zoom]');
		if (!z) return;
		let i = Number(dlg.dataset.zoom || 0);
		i = z.dataset.rdZoom === 'fit' ? 0 : Math.max(0, Math.min(ZOOM.length - 1, i + (z.dataset.rdZoom === 'in' ? 1 : -1)));
		dlg.dataset.zoom = String(i);
		dlg.style.setProperty('--rd-zoom', String(ZOOM[i]));
	});
	return dlg;
}

function openDiagram(pre: HTMLElement) {
	const dlg = diagramDialog();
	if (dlg.open) return;
	const spot = document.createComment('rd-diagram');
	pre.before(spot);
	dlg.querySelector('[data-rd-stage]')!.append(pre);
	moved.set(dlg, { pre, spot });
	dlg.dataset.zoom = '0';
	dlg.style.setProperty('--rd-zoom', '1');
	dlg.showModal();
	dlg.querySelector<HTMLElement>('[data-rd-diagram-close]')?.focus();
}

/* ==========================================================================
 * Wiring. Document listeners are registered ONCE — this module is never
 * re-executed on navigation, so registering per page would double-fire.
 * ========================================================================== */

document.addEventListener('click', (e) => {
	const t = e.target as HTMLElement;
	if (t.closest('[data-rd-comments-toggle]')) return isOpen(drawer()) ? closeDrawer() : openDrawer();
	if (t.closest('[data-rd-cdrawer-close]')) return closeDrawer();
	const jump = t.closest<HTMLElement>('[data-rd-jump]');
	if (jump?.dataset.rdJump) return jumpTo(jump.dataset.rdJump);
	const expand = t.closest<HTMLElement>('[data-rd-expand]');
	if (expand) {
		const pre = expand.parentElement?.querySelector<HTMLElement>('pre.mermaid');
		if (pre) openDiagram(pre);
		return;
	}
	// A mark opens its comment — but not at the end of a drag that selected text.
	const mark = t.closest<HTMLElement>('mark.rd-cmark');
	if (mark?.dataset.rdComment && !String(window.getSelection() ?? '').trim()) openDrawer(mark.dataset.rdComment);
});

document.addEventListener('keydown', (e) => {
	if (e.key !== 'Escape') return;
	// A modal dialog handles its own Escape, and must be the one that closes.
	if (document.querySelector('dialog[open]')) return;
	if (isOpen(drawer())) {
		/*
		 * preventDefault is the signal to ReaderControls.astro's own Escape
		 * handler, which otherwise reads "nothing was open" and leaves focus mode
		 * in the same keystroke that closed this drawer.
		 */
		e.preventDefault();
		closeDrawer();
	}
});

// The ClientRouter replaces <body>; a dialog left open would be swapped away
// holding a diagram that belongs to the page being left.
document.addEventListener('astro:before-swap', () => {
	for (const d of document.querySelectorAll<HTMLDialogElement>('dialog[open]')) d.close();
});

document.addEventListener('astro:page-load', async () => {
	state = readPayload();
	tagDialogue();
	enhanceDiagrams();
	applyComments();
	drawer()?.addEventListener('toggle', syncToggles);
	/*
	 * THE EDITOR EXISTS ONLY IN DEV. `import.meta.env.DEV` is replaced by a
	 * literal at build time, so this branch — and the chunk it would import — is
	 * removed from dist/ entirely. The public site ships no code that can write.
	 */
	if (import.meta.env.DEV && state?.editable) {
		const { attachEditor } = await import('./comment-editor');
		attachEditor(api);
	}
});
