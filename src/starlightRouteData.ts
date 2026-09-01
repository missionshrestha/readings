import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import type { StarlightRouteData } from '@astrojs/starlight/route-data';

/**
 * Route middleware. Three jobs, and every one of them is load-bearing.
 *
 * ---------------------------------------------------------------------------
 * 1 · SCOPE THE SIDEBAR TO THE BOOK BEING READ
 *
 * Without this, every page carries every book's every chapter. The sibling
 * project measured what that costs once its corpus was populated:
 *
 *     one module page ......... 648.4 KB
 *       of which sidebar ...... 630.2 KB   = 97% of the page
 *     dist total .............. 1.6 GB
 *
 * After scoping: 26.1 KB per page, 91 MB total, and — the defining property —
 * PAGE SIZE STAYS FLAT AS THE CORPUS GROWS. With 293 books on the map this is
 * not an optimisation, it is the difference between a site that works in five
 * years and one that does not.
 *
 * ---------------------------------------------------------------------------
 * 2 · RECOMPUTE PAGINATION
 *
 * Starlight builds `pagination` BEFORE any route middleware runs, by flattening
 * the UNFILTERED sidebar. Without recomputing it, "next" from the last chapter
 * of one book lands on the first chapter of a different book — a defect that is
 * completely invisible to the build and was shipped twice upstream.
 *
 * A frontmatter `prev`/`next` is respected; only automatic values are replaced.
 *
 * ---------------------------------------------------------------------------
 * 3 · `lastUpdated` COMES FROM FRONTMATTER, NEVER FROM GIT
 *
 * GIT WILL LIE HERE. Chapters are authored in a chat session and pasted, so a
 * commit date records when it was pasted, when the repo was reformatted, or
 * when an unrelated typo was fixed — never when the chapter was read. `read:`
 * is the only honest date, and astro.config.mjs leaves `lastUpdated` unset so
 * git is never consulted at all.
 */

type SidebarEntry = StarlightRouteData['sidebar'][number];

/** `<domain>/<cluster>/<book>` for anything at or below a book, else null. */
function bookRoot(id: string): string | null {
	const parts = id.split('/').filter(Boolean);
	return parts.length >= 3 ? parts.slice(0, 3).join('/') : null;
}

/** Does this sidebar entry lead into the given book? */
function belongsTo(entry: SidebarEntry, root: string): boolean {
	if (entry.type === 'link') return entry.href.replace(/^\/|\/$/g, '').startsWith(root);
	return entry.entries.some((e) => belongsTo(e, root));
}

/** Every link in the tree, in render order. */
function flatten(entries: SidebarEntry[]): Extract<SidebarEntry, { type: 'link' }>[] {
	return entries.flatMap((e) => (e.type === 'link' ? [e] : flatten(e.entries)));
}

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const id = String(route.entry.id ?? '');

	/* --- 3 · dates ------------------------------------------------------- */
	const data = route.entry.data as { read?: string | Date; finished?: string | Date };
	const stamp = data.read ?? data.finished;
	if (stamp) {
		const d = stamp instanceof Date ? stamp : new Date(String(stamp));
		if (!Number.isNaN(d.getTime())) route.lastUpdated = d;
	}

	/* --- 1 · sidebar ----------------------------------------------------- */
	const root = bookRoot(id);
	if (!root) {
		// A map page, /method/, or /elements/. No sidebar, nothing to scope.
		route.sidebar = [];
		route.hasSidebar = false;

		/*
		 * AND NO PAGINATION, which is not merely tidy.
		 *
		 * Starlight computed prev/next before this middleware ran, by flattening
		 * the UNFILTERED sidebar — which contains nothing but book chapters. Left
		 * alone, the foot of /method/protocol/ offers "Next: 3. Deep Work Is Rare".
		 *
		 * The map pages never showed this because `template: splash` hides the
		 * footer entirely, so the defect was present and invisible the whole time.
		 * The first `template: doc` page outside a book is what surfaces it.
		 */
		route.pagination.prev = undefined;
		route.pagination.next = undefined;

		/*
		 * A page that opted into the reading frame with `reader: true` still needs
		 * the TOC REMOVED, not hidden — reading.css hides `.right-sidebar-container`
		 * under [data-reader], and hiding it while `data-has-toc` remains on <html>
		 * reserves 540px beside a column that then cannot centre. Same defect as on
		 * a chapter, arrived at from the other direction.
		 */
		if ((route.entry.data as { reader?: boolean }).reader === true) route.toc = undefined;
		return;
	}

	route.sidebar = route.sidebar.filter((entry) => belongsTo(entry, root));

	/*
	 * NO TABLE OF CONTENTS ON A READING PAGE, and this is REMOVED rather than
	 * hidden with CSS — the difference is load-bearing.
	 *
	 * Starlight stamps `data-has-toc` on <html> whenever route.toc exists, and
	 * TwoColumnContent keys a width calculation off it:
	 *
	 *     [data-has-sidebar][data-has-toc] .main-pane {
	 *       --sl-content-margin-inline: auto 0;
	 *       width: min(calc(100% - sidebar), ...);
	 *     }
	 *
	 * Hiding the TOC with display:none left that attribute in place, so the
	 * reading column kept a 540px hole reserved beside it and was pushed hard
	 * left instead of centring. Telling Starlight the truth fixes the layout as
	 * a consequence rather than fighting it.
	 *
	 * A chapter has twelve FIXED sections. A reader who wants one of them uses
	 * search, not a rail of anchors that is identical on every page in the site.
	 */
	route.toc = undefined;

	/* --- 2 · pagination -------------------------------------------------- */
	/*
	 * NO FILTER HERE, AND THAT IS THE FIX RATHER THAN THE OMISSION.
	 *
	 * This line used to read `.filter((l) => isPublishedLink(l))`, and
	 * isPublishedLink's whole body was `return true`. Its docstring said "a
	 * sidebar link is only a pagination target if its page exists" — a
	 * description of a filter that was not there. Below it sat `void isPublished;`
	 * with a comment saying the reference existed "so audit.mjs can see the call
	 * site": a symbol kept alive to satisfy a grep, in a file that never calls
	 * getCollection('docs') and was therefore never scanned. Both are gone, and
	 * Control 1 in scripts/guards.mjs no longer counts a bare mention as a pass.
	 *
	 * Nothing needs filtering here. bookSidebar() in scripts/universe.mjs already
	 * drops every draft and private chapter — and now the book index too — during
	 * `build`, so route.sidebar cannot contain an unpublished target. In `dev` a
	 * stub IS in the tree on purpose and paginating into one is correct: that is
	 * what a stub is for.
	 *
	 * A function that lies is worse than an absent one, because it makes the next
	 * reader believe a check is happening.
	 */
	const links = flatten(route.sidebar);
	const here = links.findIndex((l) => l.isCurrent);
	if (here !== -1) {
		const fm = route.entry.data as { prev?: unknown; next?: unknown };
		if (fm.prev === undefined) route.pagination.prev = links[here - 1];
		if (fm.next === undefined) route.pagination.next = links[here + 1];
	}
});
