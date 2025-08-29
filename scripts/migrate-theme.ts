/*
 * One-shot migration script
 * - Reads /mnt/data/original.json and /mnt/data/target.json
 * - Generates extendedColors from tag tokens (warningTagText .. volcanoTagBorder inclusive)
 * - Removes tag tokens from schemes.light and schemes.dark
 * - Writes target.generated.json at project root
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";

// --- Types that roughly match original & target structures ---
const ColorHex = z.string().regex(/^#([A-Fa-f0-9]{6})$/);

const SchemesWithTags = z.object({
  light: z.record(z.any()),
  dark: z.record(z.any()),
});

const OriginalThemeSchema = z.object({
  themeName: z.string().optional(),
  seed: ColorHex.optional(),
  schemes: SchemesWithTags,
  timestamp: z.string().optional(),
});

const ExtendedColorSchema = z.object({
  name: z.string(),
  color: ColorHex,
  description: z.string(),
  fallback: z.string(),
  harmonized: z.literal(false),
});

const TargetSchema = z.object({
  themeName: z.string().optional().default(""),
  seed: ColorHex.optional().default("#000000"),
  schemes: SchemesWithTags,
  extendedColors: z.array(ExtendedColorSchema).optional().default([]),
  timestamp: z.string().optional().default(new Date().toISOString()),
});

// Inclusive ordered tag token list boundaries
const TAG_START = "warningTagText";
const TAG_END = "volcanoTagBorder";

function isTagTokenKey(key: string): boolean {
  const groups = [
    "warning", "information", "success", "default", "critical",
    "blue", "cyan", "geekblue", "gold", "green", "lime", "magenta", "orange", "purple", "red", "volcano",
  ];
  const suffixes = ["TagText", "TagBackground", "TagBorder"];
  return groups.some(g => key.startsWith(g)) && suffixes.some(s => key.endsWith(s));
}

function descriptionFor(name: string): string {
  const base = name.replace(/Tag(Text|Background|Border)$/, "");
  if (name.endsWith("TagText")) return `${base} tag text color`;
  if (name.endsWith("TagBackground")) return `${base} tag background color`;
  if (name.endsWith("TagBorder")) return `${base} tag border color`;
  return name.replace(/([A-Z])/g, " $1").trim().toLowerCase() + " color token";
}

function migrate() {
  const localOriginal = resolve(process.cwd(), "schemas/original.json");
  const localTarget = resolve(process.cwd(), "schemas/target.json");
  const originalPath = (() => {
    try { readFileSync(localOriginal); return localOriginal; } catch {}
    return "/mnt/data/original.json";
  })();
  const targetPath = (() => {
    try { readFileSync(localTarget); return localTarget; } catch {}
    return "/mnt/data/target.json";
  })();
  const targetOut = resolve(process.cwd(), "target.generated.json");

  const originalRaw = readFileSync(originalPath, "utf-8");
  const targetRaw = readFileSync(targetPath, "utf-8");

  const original = OriginalThemeSchema.parse(JSON.parse(originalRaw));
  const target = TargetSchema.omit({ extendedColors: true }).extend({ extendedColors: z.any() }).parse(JSON.parse(targetRaw));

  // Collect keys between TAG_START and TAG_END from light scheme (inclusive)
  const lightEntries = Object.entries(original.schemes.light);
  const startIndex = lightEntries.findIndex(([k]) => k === TAG_START);
  const endIndex = lightEntries.findIndex(([k]) => k === TAG_END);
  let slice: [string, unknown][];
  if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
    slice = lightEntries.slice(startIndex, endIndex + 1) as [string, unknown][];
  } else {
    // Fallback: take all tag tokens in appearance order
    slice = lightEntries.filter(([k]) => isTagTokenKey(k)) as [string, unknown][];
    if (slice.length === 0) {
      throw new Error(`Could not locate any tag tokens in original light scheme`);
    }
  }

  // Build extendedColors from the slice
  const extendedColors = slice.map(([name, value]) => {
    if (typeof value !== "string" || !/^#([A-Fa-f0-9]{6})$/.test(value)) {
      throw new Error(`Invalid hex for ${name}: ${String(value)}`);
    }
    const fallback = name
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toLowerCase() + " color token";
    return {
      name,
      color: value,
      description: descriptionFor(name),
      fallback,
      harmonized: false as const,
    };
  });

  // Remove tag tokens from schemes.light and schemes.dark
  const stripTags = (scheme: Record<string, unknown>) => {
    const clone: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(scheme)) {
      if (!isTagTokenKey(k)) clone[k] = v;
    }
    return clone;
  };

  const newTarget = {
    ...target,
    schemes: {
      light: stripTags(target.schemes.light),
      dark: stripTags(target.schemes.dark),
    },
    extendedColors, // overwrite entirely
  };

  // Validate output
  const validated = TargetSchema.parse(newTarget);

  writeFileSync(targetOut, JSON.stringify(validated, null, 2), "utf-8");

  // Also emit a generated type file for ExtendedTagName
  const names = extendedColors.map(ec => ec.name);
  const typeFile = `// This file is auto-generated by scripts/migrate-theme.ts\n` +
`export type ExtendedTagName =\n` + names.map(n => `  | "${n}"`).join("\n") + `;\n`;
  writeFileSync(resolve(process.cwd(), "src/theme/extended-tags.generated.ts"), typeFile, "utf-8");

  console.log(`Wrote ${targetOut} with ${extendedColors.length} extendedColors.`);
}

migrate();
