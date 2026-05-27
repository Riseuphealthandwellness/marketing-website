import type { Drug } from "@/lib/cms/types";

type RawSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type RawMarkDef = {
  _key: string;
  _type: string;
  [key: string]: unknown;
};

type RawBlock = {
  _type: string;
  _key: string;
  children?: RawSpan[];
  markDefs?: RawMarkDef[];
  [key: string]: unknown;
};

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function processSpan(
  span: RawSpan,
  existingMarkDefs: RawMarkDef[],
  drugPatterns: { regex: RegExp; drug: Drug }[],
): { spans: RawSpan[]; newMarkDefs: RawMarkDef[] } {
  // Skip spans that already carry annotation marks — don't double-annotate
  const hasAnnotation = span.marks.some((m) =>
    existingMarkDefs.some((def) => def._key === m),
  );
  if (hasAnnotation) return { spans: [span], newMarkDefs: [] };

  type Match = { start: number; end: number; drug: Drug; matched: string };
  const matches: Match[] = [];

  for (const { regex, drug } of drugPatterns) {
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(span.text)) !== null) {
      const start = m.index;
      const end = start + m[0].length;
      const overlaps = matches.some((x) => start < x.end && end > x.start);
      if (!overlaps) matches.push({ start, end, drug, matched: m[0] });
    }
  }

  if (matches.length === 0) return { spans: [span], newMarkDefs: [] };

  matches.sort((a, b) => a.start - b.start);

  const newSpans: RawSpan[] = [];
  const newMarkDefs: RawMarkDef[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (cursor < match.start) {
      newSpans.push({
        _type: "span",
        _key: `${span._key}t${cursor}`,
        text: span.text.slice(cursor, match.start),
        marks: [...span.marks],
      });
    }

    const markKey = `drug-auto-${match.drug.slug}-${span._key}-${match.start}`;
    newMarkDefs.push({
      _key: markKey,
      _type: "drugReference",
      drug: { name: match.drug.name, slug: match.drug.slug, description: match.drug.description },
    });
    newSpans.push({
      _type: "span",
      _key: `${span._key}d${match.start}`,
      text: match.matched,
      marks: [...span.marks, markKey],
    });

    cursor = match.end;
  }

  if (cursor < span.text.length) {
    newSpans.push({
      _type: "span",
      _key: `${span._key}t${cursor}`,
      text: span.text.slice(cursor),
      marks: [...span.marks],
    });
  }

  return { spans: newSpans, newMarkDefs };
}

/** Builds a deduplicated list of all names/aliases for each drug, longest first
 *  (so "buprenorphine/naloxone" matches before "naloxone"). */
function buildPatterns(drugs: Drug[]): { regex: RegExp; drug: Drug }[] {
  const entries: { name: string; drug: Drug }[] = [];

  for (const drug of drugs) {
    const names = [
      drug.name,
      drug.genericName,
      ...(drug.aliases ?? []),
    ].filter((n): n is string => Boolean(n));

    for (const name of names) {
      entries.push({ name, drug });
    }
  }

  // Longest names first so longer matches win over shorter substrings
  entries.sort((a, b) => b.name.length - a.name.length);

  return entries.map(({ name, drug }) => ({
    regex: new RegExp(`\\b${escapeRegex(name)}\\b`, "gi"),
    drug,
  }));
}

/**
 * Processes portable text blocks and injects drugReference marks whenever a
 * drug name (or alias) appears in plain text spans.  Only spans with no
 * existing annotation marks are touched so manually-set references are never
 * overwritten.
 */
export function autolinkDrugs(blocks: unknown[], drugs: Drug[]): unknown[] {
  if (!drugs.length) return blocks;

  const patterns = buildPatterns(drugs);

  return (blocks as RawBlock[]).map((block) => {
    if (block._type !== "block" || !Array.isArray(block.children)) return block;

    const existingMarkDefs: RawMarkDef[] = block.markDefs ?? [];
    const newMarkDefs: RawMarkDef[] = [];
    const newChildren: RawSpan[] = [];

    for (const child of block.children) {
      if (child._type !== "span" || !child.text) {
        newChildren.push(child);
        continue;
      }

      const { spans, newMarkDefs: added } = processSpan(child, existingMarkDefs, patterns);
      newChildren.push(...spans);
      newMarkDefs.push(...added);
    }

    return {
      ...block,
      children: newChildren,
      markDefs: [...existingMarkDefs, ...newMarkDefs],
    };
  });
}
