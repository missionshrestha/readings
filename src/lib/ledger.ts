import { getCollection } from 'astro:content';
import { isPublished, isAuthored } from './visibility';

/**
 * The ledger, COMPUTED from chapter frontmatter. Never hand-kept.
 *
 * The drafts call the ledger "the actual output of the whole system" and warn,
 * in their own failure-modes table, that it is the thing that goes stale first.
 * A hand-maintained table drifts from the chapters the moment one is edited; a
 * computed one cannot. That is the entire reason actions are structured data
 * rather than prose.
 */

export interface Action {
	id: string;
	if?: string;
	then?: string;
	trigger?: string;
	obstacle?: string;
	tier?: string;
	impact?: string;
	committed?: boolean;
	started?: string | Date;
	day30?: string;
	note?: string;
}

export interface LedgerRow extends Action {
	/** The directory slug. Sort key and grouping key — never rendered. */
	book: string;
	/** The book's real title, from its index page. What a reader is shown. */
	bookTitle: string;
	chapter?: number;
	chapterTitle: string;
	href: string;
}

const asDate = (v: string | Date | undefined): Date | undefined => {
	if (!v) return undefined;
	const d = v instanceof Date ? v : new Date(String(v));
	return Number.isNaN(d.getTime()) ? undefined : d;
};

/** Every action on every published chapter, in book then chapter order. */
export async function ledger(): Promise<LedgerRow[]> {
	const all = (await getCollection('docs')).filter((e) =>
		isPublished(e.data as { draft?: boolean; private?: boolean })
	);
	const docs = all.filter((e) => isAuthored(String(e.id)));

	/*
	 * THE BOOK'S REAL TITLE, READ OFF THE BOOK'S OWN INDEX PAGE.
	 *
	 * `bookTitle` used to be assigned `d.book ?? ''` — the directory SLUG, not a
	 * title — and nothing read it, so /ledger's "From" column showed only the
	 * chapter and the over-commitment warning rendered "deep-work has 2 actions
	 * committed at Now". With one book that reads as a quirk. With three it is
	 * ambiguous, which is exactly when this page starts to matter.
	 *
	 * The index page of a book is the entry whose id is <domain>/<cluster>/<book>
	 * — three segments exactly — so the map is built from the collection rather
	 * than from a second copy of the title kept anywhere else. A book with no
	 * index page degrades to a title-cased slug rather than breaking: content
	 * arrives by paste, and a missing file must never take the build with it.
	 */
	const titleOf = new Map<string, string>();
	for (const e of all) {
		const parts = String(e.id).split('/').filter(Boolean);
		if (parts.length === 3) titleOf.set(parts.join('/'), e.data.title);
	}
	const bookTitleFor = (id: string): string => {
		const root = id.split('/').filter(Boolean).slice(0, 3).join('/');
		const known = titleOf.get(root);
		if (known) return known;
		const slug = root.split('/')[2] ?? '';
		return slug.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
	};

	const rows: LedgerRow[] = [];
	for (const entry of docs) {
		const d = entry.data as {
			actions?: Action[];
			book?: string;
			title?: string;
			chapter?: number;
		};
		if (!d.actions?.length) continue;
		for (const a of d.actions)
			rows.push({
				...a,
				book: d.book ?? '',
				bookTitle: bookTitleFor(String(entry.id)),
				chapter: d.chapter,
				chapterTitle: entry.data.title,
				href: `/${entry.id}/`,
			});
	}
	return rows.sort(
		(a, b) => a.book.localeCompare(b.book) || (a.chapter ?? 0) - (b.chapter ?? 0)
	);
}

/**
 * The spaced-retrieval schedule, from the evidence rather than from a habit
 * app's default: day 3, week 2, week 6, month 3.
 *
 * ABSOLUTE, from the date the action started — never "after N more chapters".
 * A schedule that depends on natural gaps does not happen, and one that
 * punishes a missed week gets abandoned in week three, so a missed review is
 * simply overdue and says so.
 */
export const INTERVALS = [
	{ label: 'Day 3', days: 3 },
	{ label: 'Week 2', days: 14 },
	{ label: 'Week 6', days: 42 },
	{ label: 'Month 3', days: 90 },
] as const;

export interface DueRow extends LedgerRow {
	interval: string;
	due: Date;
	overdueDays: number;
}

/** What is due now, oldest first. */
export function due(rows: LedgerRow[], now: Date): DueRow[] {
	const out: DueRow[] = [];
	for (const r of rows) {
		const start = asDate(r.started);
		if (!start) continue;
		if (r.day30 === 'dropped') continue;
		for (const iv of INTERVALS) {
			const when = new Date(start.getTime() + iv.days * 86400000);
			if (when <= now)
				out.push({
					...r,
					interval: iv.label,
					due: when,
					overdueDays: Math.floor((now.getTime() - when.getTime()) / 86400000),
				});
		}
	}
	return out.sort((a, b) => a.due.getTime() - b.due.getTime());
}

/** Books with at least one action still marked running. THE metric. */
export function runningCount(rows: LedgerRow[]): number {
	return rows.filter((r) => r.day30 === 'running').length;
}
