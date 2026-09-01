import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

/**
 * THE GOVERNING RULE: content arrives by PASTE from a chat session that cannot
 * see this filesystem. A missing or misspelled field must DEGRADE, never break
 * the build.
 *
 * Two zod behaviours make that true, both verified against the installed
 * zod@4.5.4 rather than recalled:
 *
 *   1. A misspelled KEY needs no handling — zod objects are non-strict, so
 *      `chaptr: 2` is dropped silently.
 *   2. A bad VALUE does NOT degrade on its own. `chapter: "two"` fails the parse
 *      and takes the build with it. `.catch(undefined)` is what turns that into
 *      an absent field.
 *
 * The trade is stated rather than hidden: a wrong value disappears quietly,
 * which is the wrong default for authored source and the right one here.
 * scripts/audit.mjs reports what the schema deliberately tolerates.
 *
 * NO FIELD IS AN ENUM AND NO NUMBER IS RANGE-CHECKED. `status` is
 * reading|generated|recalled|explained|complete|skipped|dropped BY CONVENTION.
 * Enforcing it would convert a typo into a build failure, which is the wrong
 * trade for pasted content — but the cost is real and recorded: `complete`,
 * `Complete` and `done` differ, and only audit.mjs will say so.
 */

/** One extracted action. The ledger is computed from these, never hand-kept. */
const action = z.object({
	/**
	 * PERMANENT, and rendered visibly on the card so a rename is something you
	 * can SEE rather than something that happens quietly in a diff. It is the
	 * day-30 review key: renaming one silently resets that action's schedule.
	 */
	id: z.string(),
	/** The condition. "it is 21:30 on a workday" */
	if: z.string().optional().catch(undefined),
	/** The behaviour. One line, observable. */
	then: z.string().optional().catch(undefined),
	/** A concrete situation — a time, a place, a person. Never a feeling. */
	trigger: z.string().optional().catch(undefined),
	/**
	 * The INNER obstacle, required whenever `committed` is true.
	 *
	 * Oettingen & Mayer is the strongest negative finding in the evidence base:
	 * visualising the outcome predicts LOWER attainment. Naming the obstacle is
	 * what mental contrasting actually is. /validate flags one under six words,
	 * and nothing on this site ever asks you to visualise a result.
	 */
	obstacle: z.string().optional().catch(undefined),
	/** now | next | later | reference */
	tier: z.string().optional().catch(undefined),
	/** Honest impact estimate, INCLUDING "probably marginal". */
	impact: z.string().optional().catch(undefined),
	/** True only when the IF–THEN sentence was written by him, not the AI. */
	committed: z.boolean().optional().catch(undefined),
	started: z.union([z.string(), z.date()]).optional().catch(undefined),
	/** not-yet | running | adapted | dropped. Filled in honestly, failures included. */
	day30: z.string().optional().catch(undefined),
	note: z.string().optional().catch(undefined),
});

const readingFields = z.object({
	// --- where it sits. Checked against the DIRECTORY by audit.mjs, which is a
	// control only nested routes make possible.
	book: z.string().optional().catch(undefined),
	author: z.string().optional().catch(undefined),
	domain: z.string().optional().catch(undefined),
	cluster: z.string().optional().catch(undefined),
	part: z.string().optional().catch(undefined),
	chapter: z.number().optional().catch(undefined),

	// --- what kind of thing it is
	/** read | reference | lifelong — decides the page shape. */
	kind: z.string().optional().catch(undefined),
	/** core | deepen | reference — the universe's tier. */
	tier: z.string().optional().catch(undefined),
	/** S | M | L — what it costs at 30 min/day. */
	weight: z.string().optional().catch(undefined),
	/** knowledge | execution — the Stage-0 diagnostic, before everything else. */
	gap: z.string().optional().catch(undefined),

	// --- state
	status: z.string().optional().catch(undefined),
	/** deep-dive | skim | skip */
	verdict: z.string().optional().catch(undefined),
	/** False when READ I was the original book, not an AI-clarified version. */
	clarified: z.boolean().optional().catch(undefined),
	rating: z
		.object({
			usefulness: z.number().optional().catch(undefined),
			novelty: z.number().optional().catch(undefined),
			actionability: z.number().optional().catch(undefined),
		})
		.optional()
		.catch(undefined),

	// --- dates. `string | Date` because YAML parses a bare 2026-09-14 into a JS
	// Date before zod ever sees it. Starlight's own `lastUpdated` uses the same union.
	started: z.union([z.string(), z.date()]).optional().catch(undefined),
	read: z.union([z.string(), z.date()]).optional().catch(undefined),
	finished: z.union([z.string(), z.date()]).optional().catch(undefined),

	/**
	 * Force the READING FRAME on a page that is not at book depth.
	 *
	 * `data-reader` is normally derived from the path — depth >= 3 — because a
	 * derived flag cannot be forgotten or set wrongly on a chapter. This is the
	 * escape hatch for the one page that needs the frame without being a chapter:
	 * src/content/docs/elements.mdx, whose entire job is showing what a chapter
	 * will look like. Rendering it in the docs frame would prove the components
	 * COMPILE and prove nothing about how they LOOK, since 25 rules in
	 * reading.css — the serif, the measure, the drop cap, the grain, the margin
	 * notes — are gated on [data-reader].
	 *
	 * It costs the table of contents, for the reason chapters have none: the
	 * right rail is removed rather than hidden, or `data-has-toc` stays on <html>
	 * and reserves 540px beside a column that then will not centre.
	 */
	reader: z.boolean().optional().catch(undefined),

	// --- visibility. See src/lib/visibility.ts.
	/**
	 * Excludes the page from `build` entirely — no route, no sitemap entry, no
	 * Pagefind record — which is enforced by publishedDocsLoader() at the foot of
	 * this file and re-checked against dist/ by Control 4 in scripts/guards.mjs.
	 *
	 * It did NOT do this until 2026-08-31. Starlight's routing filters `draft`
	 * and nothing else, so a private page built, served, and was listed in the
	 * sitemap while every control passed. The proof is with the loader.
	 *
	 * A chapter in a SENSITIVE_DOMAINS domain must set this EXPLICITLY — true or
	 * false — or the build refuses. Forgetting is the failure mode, and a default
	 * is not a decision.
	 */
	private: z.boolean().optional().catch(undefined),

	// --- the ledger
	actions: z.array(action).optional().catch(undefined),
});

/**
 * THE LOADER THAT MAKES `private: true` REAL.
 *
 * ---------------------------------------------------------------------------
 * THE DEFECT, VERIFIED BY PROBE ON 2026-08-31 — NOT BY READING
 *
 * CLAUDE.md said "`private: true` excludes a page from `build` entirely" and
 * the comment on the field above said it worked "exactly as `draft` does".
 * BOTH WERE FALSE. Starlight's route generator filters on ONE field:
 *
 *     node_modules/@astrojs/starlight/utils/routing/index.ts:37-41
 *     return import.meta.env.MODE !== 'production' || data.draft === false;
 *
 * `private` appears NOWHERE in Starlight's routing or schema. It was honoured
 * only by this project's own four consumers of getCollection('docs'), and was
 * never wired to page routing at all.
 *
 * The probe: one page, `private: true`, in money-and-wealth — a sensitive
 * domain, the exact case the flag exists for — with a unique marker in the body.
 *
 *     build            exit 0, GREEN, 113 -> 114 pages
 *     route            dist/money-and-wealth/.../index.html  39,609 bytes, served
 *     body text        marker PRESENT in dist/
 *     sitemap          LISTED in sitemap-0.xml
 *     pagefind         emitted data-pagefind-body — offered to the search index
 *     llms-full.txt    correctly absent (that consumer does gate)
 *     the 3 controls   all passed
 *
 * ---------------------------------------------------------------------------
 * WHY THE FIX IS HERE AND NOT IN THE ROUTE MIDDLEWARE
 *
 * By the time route middleware runs, the route EXISTS. Middleware can blank a
 * page; it cannot un-generate one, and it cannot reach the sitemap or the
 * Pagefind index. The collection is the only layer upstream of all three: an
 * entry that is not in the store is a page Starlight never knew about.
 *
 * ---------------------------------------------------------------------------
 * WHY IT IS SCOPED TO `build`
 *
 * The same reason drafts stay visible in `dev`: you have to be able to SEE the
 * page you are writing. `dev` shows everything; `build` publishes nothing
 * private. Same test the sidebar in scripts/universe.mjs already used, spelled
 * the same way — process.argv — so the two cannot drift.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS DOES NOT FIX, STATED RATHER THAN LEFT TO BE DISCOVERED
 *
 * Stack fact 11: a page with no route is never compiled to JSX, so its MDX is
 * syntax-checked by nothing. `draft: true` already had that hole and `private:
 * true` now shares it. A paste that lands while either flag is set is validated
 * by NOTHING — flip the flag first, then validate.
 *
 * Backstop: Control 4 in scripts/guards.mjs re-reads dist/ at astro:build:done
 * and refuses if a route or an inbound link to one of these pages exists
 * anyway. Two independent mechanisms, because the material is about other
 * people.
 */
const BUILDING = process.argv.includes('build');

function publishedDocsLoader(): Loader {
	const inner = docsLoader();
	return {
		name: 'readings-docs-loader',
		load: async (context) => {
			await inner.load(context);
			if (!BUILDING) return;
			const dropped: string[] = [];
			for (const [id, entry] of context.store.entries()) {
				if ((entry.data as { private?: boolean }).private === true) {
					context.store.delete(id);
					dropped.push(id);
				}
			}
			/*
			 * Announced, never silent. A page vanishing from a build is exactly the
			 * kind of thing that should be visible in the log the one time it was
			 * not what you meant.
			 */
			if (dropped.length)
				context.logger.warn(
					`private: ${dropped.length} page(s) held back from this build — ${dropped.join(', ')}`
				);
		},
	};
}

export const collections = {
	docs: defineCollection({
		loader: publishedDocsLoader(),
		schema: docsSchema({ extend: readingFields }),
	}),
};
