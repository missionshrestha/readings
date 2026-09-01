#!/usr/bin/env node
/**
 * prompt-words.mjs — the web-chat prompt library, measured against its own rule.
 *
 *   node scripts/prompt-words.mjs
 *
 * ---------------------------------------------------------------------------
 * WHY THIS EXISTS
 *
 * web-chat/03-OPERATING-RULES.md, design rule 4, states the bar:
 *
 *     "Instruct at length. A short prompt gets you the harmful configuration by
 *      default. The measured difference was 500+ words against ~50 — the length
 *      was the safeguard, not decoration."
 *
 * sourced to context/evidence/reading-with-ai.md:136.
 *
 * MEASURED 2026-08-31, before this script existed: TEN OF TEN PROMPTS WERE
 * UNDER THE BAR.
 *
 *     P0 391 · P1 301 · P2 302 · P3 185 · P4 414
 *     P5 117 · P6 237 · P7 206 · P8 204 · P9 149
 *
 * P5-argue — the one prompt whose entire job is to resist sycophancy, which
 * reconciliation.md calls "the exact input condition under which sycophancy is
 * strongest" — was 117 words, close to the ~50-word harmful arm of the study
 * the rule is drawn from.
 *
 * A rule stated in one file and contradicted by every file that must obey it is
 * not a rule. This makes the number visible, so the next prompt written is
 * measured rather than estimated.
 *
 * ---------------------------------------------------------------------------
 * WHAT IT COUNTS, AND WHAT IT DELIBERATELY DOES NOT
 *
 * ONLY the text inside a ````text fence — the block that is actually pasted
 * into a chat. The prose around it is guidance for the reader of the file and
 * never reaches the model, so counting it would let a prompt pass the bar by
 * being well documented, which is precisely backwards.
 *
 * A file may hold more than one pasteable block (P0 does). They are summed:
 * the bar is on what the session receives, not on any single paste.
 *
 * `--stamp` REWRITES the "Length: N words" line at the top of each prompt file
 * from the measured value, so the number in the file cannot drift from the
 * number in the fence. A count recorded by hand is a comment, and comments rot.
 *
 * Exits 1 if any prompt is under the floor, so it can be wired into a check.
 * It is NOT in `npm run ci`: prompt length is a property of the library, not of
 * the build, and a failing word count must never be able to stop a chapter from
 * being validated.
 */

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'web-chat', 'prompts');

/** The bar, from 03-OPERATING-RULES.md design rule 4. */
const FLOOR = 500;

const STAMP = process.argv.includes('--stamp');

const files = readdirSync(DIR)
	.filter((f) => /^P\d/.test(f))
	.sort();

let under = 0;
let total = 0;
console.log('\n  WEB-CHAT PROMPTS — words inside the pasteable fence\n');
console.log(`  floor ${FLOOR}, from 03-OPERATING-RULES.md rule 4 (evidence/reading-with-ai.md:136)\n`);

for (const f of files) {
	const text = readFileSync(join(DIR, f), 'utf8');
	const blocks = [...text.matchAll(/^````text\n([\s\S]*?)^````/gm)];
	const words = blocks
		.map((b) => b[1].trim().split(/\s+/).filter(Boolean).length)
		.reduce((a, b) => a + b, 0);
	total += words;
	const ok = words >= FLOOR;
	if (!ok) under++;
	if (STAMP) {
		const line = `**Length: ${words} words.**`;
		const stamped = text.replace(/^\*\*Length: [^*]*\*\*/m, line);
		if (stamped !== text) writeFileSync(join(DIR, f), stamped);
	}
	const detail = blocks.length > 1 ? `  (${blocks.length} blocks)` : '';
	console.log(
		`  ${ok ? ' ok ' : 'UNDER'}  ${f.replace(/\.md$/, '').padEnd(12)} ${String(words).padStart(5)} words${detail}` +
			(blocks.length ? '' : '   NO ````text FENCE FOUND')
	);
}

console.log(
	`\n  ${files.length - under}/${files.length} at or over ${FLOOR} words. ${total} words in the library.\n`
);
if (under)
	console.log(
		'  A short prompt gets the harmful configuration by default. Length is the\n' +
			'  safeguard here, not decoration — but padding is not length. Add the\n' +
			'  refusals, the worked example and the failure modes, never adjectives.\n'
	);
process.exit(under ? 1 : 0);
