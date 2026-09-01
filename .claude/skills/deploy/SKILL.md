---
name: deploy
description: Build, verify, push, and confirm the site is live at its public URL. Use when he says "deploy", "ship it", "push", "make it live", or after a chapter has been validated. Cloudflare Workers Builds builds on push; there is no Actions workflow.
---

# /deploy

**Target: Cloudflare Workers static assets, serving from the ROOT of
`https://readings.<subdomain>.workers.dev`.** `DEPLOY.md` is authoritative.

**The host is TEMPORARY and deliberately NOT indexed.** Every page carries
`<meta name="robots" content="noindex">` and `/robots.txt` advertises no sitemap, because Workers
cannot redirect one hostname to another — anything indexed here could never be moved to the real
domain. Both halves flip themselves the day `site` becomes a real domain. `src/lib/indexing.ts`.

## First run

Three things decide whether it works, and all three fail in ways that do not look like their cause:

1. **Node version.** `.nvmrc` holds **`24.18.0`**, one of the two versions the Workers Builds image
   preinstalls. Naming any other patch makes Cloudflare fetch it mid-build, which is reported
   failing. **Do not "try a lower version to see if it works."**
2. **The Worker name decides the URL.** `name` in `wrangler.jsonc` must equal the dashboard Worker
   name or the deploy is refused. Name + account subdomain = the served URL = what `SITE` in
   `astro.config.mjs` must be. **Set the name first, then `SITE`.**
   `SITE` is derived, not confirmed: the sibling project is live at
   `mylearnstack.missionshrestha.workers.dev`, and a workers.dev subdomain is per ACCOUNT.
   **Check it against the dashboard before the first deploy.**
   Since 2026-08-31 the build **cross-checks the first host label against `name` in
   `wrangler.jsonc`** and refuses if they disagree, naming both files. What it still cannot check is
   the account subdomain — nothing in the repository knows it, so the dashboard is still the only
   thing that settles it. DEPLOY.md §3b.
3. **`assets` keys are not optional.** `not_found_handling: "404-page"` is what serves
   `dist/404.html`. Never `"single-page-application"` — it answers every typo with HTTP 200 and the
   home page.

Build command `npm run ci`; deploy command `npx wrangler deploy`; branch `main`.

## Every run

1. `npm run ci` — the exact command CI runs. Stop at the first failure and report it.
2. `node scripts/audit.mjs` — the four controls, plus anything stuck.
   `node scripts/contrast.mjs` — 104 colour pairs across four themes.
3. **`npx wrangler dev`, then probe it.** This is the **only** local server that applies
   `html_handling`, `not_found_handling`, `_headers` and `_redirects`. `astro preview` does not, and
   will pass things production fails.
4. Report what changed since the last deploy: which chapters, which book.
5. **Ask before committing and pushing. Never push on your own initiative.**
6. Watch the Cloudflare build to completion.
7. **Fetch the live URL and confirm it responds.** Then print it.

## Rules

- **Step 7 is not optional.** "The build went green" and "the site is live and correct" are
  different claims.
- **Never deploy a chapter that failed validation.**
- **Never deploy a stub.** A stub carries `draft: true` and is excluded by design. If a chapter
  should go live, that line is removed deliberately — never as a side effect of something else.
- **Never add `main` to `wrangler.jsonc`.** With no Worker script, static requests are free and
  unmetered, and the free plan's 100,000/day cap does not apply because it counts invocations.
  Adding `main` silently converts every page view into a billable invocation.
- **After any routing or navigation change, check the DEPLOYED site by hand:** a drawer link, a
  breadcrumb, prev/next across a part boundary, a `↔` pointer, and a search. Navigation defects in
  the sibling repo were **twice** invisible to the build.
- **The privacy sweep is Control 4 and it runs INSIDE `npm run build`** as of 2026-08-31, at
  `astro:build:done`, because it reads `dist/` and `dist/` does not exist before then. It used to
  live only in `audit.mjs`, which printed *"The build refuses these too"* — and that was false:
  `npm run ci` is `astro check && astro build`, `audit.mjs` was in neither, and there is no git hook.
  Run `audit.mjs` anyway: it re-runs the same four so the two can never disagree, and it is the one
  that reports SKIPPED when there is no `dist/`.
  **Never substitute a `grep -r <slug> dist/`**: a published code sample naming a chapter file is not
  a leak, and that version of the check false-positived the day `/method/` was published. DEPLOY.md §5.
- **`private: true` really excludes a page now.** It did not until 2026-08-31 — Starlight filters
  `draft` and nothing else, so a private page in `money-and-wealth` built, served at 39,609 bytes,
  and was **listed in the sitemap**, with all three controls green. Two mechanisms cover it now:
  the collection loader drops it, and Control 4 re-checks `dist/`.
