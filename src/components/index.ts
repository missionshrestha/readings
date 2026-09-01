/**
 * The authoring surface. FOUR COMPONENTS, and that is a ceiling.
 *
 * A FIFTH IS NOT ADDED HERE without an explicit written request in the session
 * that needs it. Everything else composes from the stock Starlight components,
 * which are publicly documented and which any model already knows — and
 * "say it in one sentence instead" is the rule.
 *
 * Each of these four exists because the reading protocol produces something
 * stock Starlight cannot express:
 *
 *   <Recall>    the closed-book section, reconciliation row 1
 *   <Actions/>  frontmatter-driven, because the ledger is computed from it
 *   <Passage>   a quotation from the ORIGINAL, which nothing else on the page is
 *   <Margin>    a note attached to a paragraph, which a section rule cannot do
 *
 * Rating, progress and page metadata are frontmatter rendered by the reader
 * frame, deliberately NOT components: they are chrome, and an author should not
 * be able to forget them or place them wrongly.
 *
 * The alias `@components` resolves here via tsconfig `paths`, which is what
 * keeps the import line byte-identical at every file depth. A relative
 * ../../../ chain is a guess a chat session has no way to verify.
 */
export { default as Recall } from './Recall.astro';
export { default as Actions } from './Actions.astro';
export { default as Passage } from './Passage.astro';
export { default as Margin } from './Margin.astro';
