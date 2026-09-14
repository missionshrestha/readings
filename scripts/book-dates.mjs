/**
 * book-dates.mjs — the release date and major editions every book must carry.
 *
 * Shared by scripts/new-chapters.mjs (which REFUSES a brief without them) and
 * scripts/audit.mjs (which REPORTS a book.json that drifted after scaffolding),
 * so the two can never disagree about what a readable date is.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS EXISTS
 *
 * His instruction, 2026-09-14, after reading the sample book:
 *
 *     "Every book must display its original release date, along with any major
 *      updates or version dates (major changes only), shown somewhere in the
 *      presentation."
 *
 * `published` was already in book.json and nothing read it. The dates are now
 * DISPLAYED — src/overrides/PageTitle.astro reads them at build time — so a
 * missing or unreadable one is no longer an untidy field, it is a page that
 * silently shows nothing. context/book-spec.md section 2 and section 6.
 *
 * ---------------------------------------------------------------------------
 * THE FORMATS, AND WHY THERE ARE FIVE
 *
 *   2016 / "2016"        a year — most books are only known to the year
 *   "2016-01"            a month
 *   "2016-01-05"         a day
 *   "c. 170–180 CE"      an approximate composition date, for a work older than
 *                        print. Its first printed edition goes in `editions`
 *   "450 BCE"            a bare era year
 *
 * A free-text date would read fine in the page chrome and sort as nonsense
 * everywhere else, so anything outside these is refused with the list.
 */

const YEAR = /^\d{4}$/;
const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;
const DAY = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const APPROX = /^c\.\s?\d{1,4}(\s?[–-]\s?\d{1,4})?(\s(BCE|CE))?$/;
const ERA = /^\d{1,4}\s(BCE|CE)$/;

/** True when a value is one of the five accepted date shapes. */
export function isReadableDate(v) {
	if (typeof v === 'number') return Number.isInteger(v) && v >= 1000 && v <= 9999;
	if (typeof v !== 'string') return false;
	const s = v.trim();
	return [YEAR, MONTH, DAY, APPROX, ERA].some((re) => re.test(s));
}

const FORMATS = 'a year ("2016"), a month ("2016-01"), a day ("2016-01-05") or an approximate date ("c. 170–180 CE")';

/**
 * Every problem with `published` and `editions`, split the way new-chapters.mjs
 * splits everything: PROBLEMS refuse the brief, WARNINGS are printed and obeyed.
 * The messages are reproduced verbatim in context/book-spec.md section 3b — change
 * one here and change it there.
 */
export function checkBookDates(raw) {
	const problems = [];
	const warnings = [];

	if (raw.published === undefined || raw.published === null || raw.published === '')
		problems.push('missing "published" — the original release date. Every page of the book displays it. Spec §2');
	else if (!isReadableDate(raw.published))
		problems.push(`"published" is "${raw.published}" — write ${FORMATS}`);

	if (!Array.isArray(raw.editions)) {
		problems.push('missing "editions" — an array of MAJOR revisions only. [] is a real answer when a search found none. Spec §2');
	} else {
		raw.editions.forEach((e, i) => {
			if (!e || typeof e !== 'object') {
				problems.push(`editions[${i}]: not an object — { date, label, change, source }`);
				return;
			}
			if (!isReadableDate(e.date))
				problems.push(`editions[${i}]: "date" is missing or unreadable — same formats as "published"`);
			if (!e.change) problems.push(`editions[${i}]: no "change" — what materially changed, not just "revised"`);
			if (!e.source) warnings.push(`editions[${i}] has no "source". A date nobody can check is a date that drifts.`);
		});
	}
	return { problems, warnings };
}
