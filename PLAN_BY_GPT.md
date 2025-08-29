Goal

Migrate our theme from the old “original” export to the new “target” export so it matches Figma’s Material Theme Builder plugin format and our team’s conventions.

Only implement the changes below. Detect the rest from the files.
Files are available at:
	•	schemas/original.json (old export)
	•	schemas/target.json (new export baseline)

Required changes

1) Generate extendedColors from tag tokens
	•	Source keys: all tokens from warningTagText through volcanoTagBorder (inclusive) in the light scheme of the original file.
	•	For each of those tokens, create an object in extendedColors with:
	•	name: semantic camelCase = the token key as-is (e.g., warningTagText)
	•	color: hex from light scheme’s value for that key
	•	description: short readable description derived from the name:
	•	*TagText → “<base> tag text color”
	•	*TagBackground → “<base> tag background color”
	•	*TagBorder → “<base> tag border color”
	•	fallback: “<camel case words> color token”
	•	harmonized: always false
	•	Replace any example items currently present in target.json’s extendedColors with the complete generated list from above.
	•	Do not add other tokens to extendedColors. Only the slice warningTagText → volcanoTagBorder.

2) Remove tag tokens from color schemes
	•	In the resulting theme object, remove the tag token keys from schemes.light/schemes.dark if they exist there. They must be represented only in extendedColors.
	•	Do not otherwise alter scheme values.

3) Types & runtime accessors
	•	Introduce strict TypeScript types for the target format, including ExtendedColor and the new Theme shape.
	•	Add a resolver:
getExtended(theme, name: string): ExtendedColor | undefined
	•	Returns the extended color by name.
	•	Add a helper to fetch the hex easily:
getExtendedHex(theme, name: string): string | undefined
	•	Export a union type for all supported extended color names detected from the generated list, e.g.:

export type ExtendedTagName =
  | "warningTagText"
  | "warningTagBackground"
  | "warningTagBorder"
  | ... // through volcanoTagBorder

Generate this union from the migration step to stay in sync.

4) Automatic code migration (codemod)
	•	Add a codemod that scans the React codebase for direct uses of removed tag tokens under schemes.{mode}.{token} and rewrites them to use the new accessors.
	•	Before: theme.schemes.light.warningTagText
	•	After: getExtendedHex(theme, "warningTagText")
	•	Patterns to cover:
	•	theme.schemes.(light|dark).<AnyTagToken>
	•	Optional chaining variants and destructuring.
	•	Provide a dry-run mode and a --write mode.
	•	Print a summary of replacements by file.

5) Build a migration script (one-shot transform)
	•	scripts/migrate-theme.ts:
	•	Load /mnt/data/original.json
	•	Load /mnt/data/target.json as the baseline
	•	Generate extendedColors per rule (Section 1)
	•	Remove tag tokens from schemes (Section 2)
	•	Overwrite target.extendedColors
	•	Write target.generated.json
	•	Add Zod (or TypeScript + asserts) validation for both input and output.
	•	Ensure harmonized is always false (no inference or harmonization logic).

6) Vite/React integration
	•	Update the theme import path(s) to point to the new target file (target.generated.json) wherever applicable.
	•	Add a small compatibility shim to avoid breaking older components during rollout:

export function getTagHex(theme, token: ExtendedTagName) {
  return getExtendedHex(theme, token) ?? "#000000";
}


	•	Do not change component props; only update internals to use the new resolver.

7) Tests
	•	Unit tests:
	•	Migration produces an extendedColors list with exactly the expected names and counts (slice inclusive).
	•	All harmonized flags are false.
	•	Example lookups for a few tokens return the expected hex.
	•	Confirm the removed keys are no longer present in schemes.light/schemes.dark.
	•	Codemod tests:
	•	Snapshot of a component before/after rewrite.
	•	Ensure no changes when files don’t reference removed tokens.

8) Developer UX
	•	NPM scripts:
	•	"migrate:theme": "ts-node scripts/migrate-theme.ts"
	•	"codemod:tags:dry": "node codemods/replace-tag-tokens.cjs --dry"
	•	"codemod:tags": "node codemods/replace-tag-tokens.cjs --write"
	•	"test:theme": "vitest run --coverage"
	•	Add a short README section:
	•	How to run migration and codemod.
	•	How to verify with tests.
	•	Rollback instructions (backup created before writing).

9) Acceptance criteria
	•	target.generated.json matches target.json except:
	•	extendedColors is fully replaced by the generated tag list (no examples left).
	•	No tag tokens exist anywhere under schemes.
	•	App builds and renders with no TypeScript errors.
	•	All references to removed tokens now resolve via getExtendedHex.
	•	Tests pass.

Deliverables
	1.	scripts/migrate-theme.ts
	2.	src/theme/types.ts with final types & helpers
	3.	codemods/replace-tag-tokens.cjs (or TS) with dry-run and write modes
	4.	Updated imports/usages in components via codemod
	5.	Unit tests for migration + codemod
	6.	target.generated.json produced by the script

Implement exactly the changes above. Do not add new features or change unrelated structure.