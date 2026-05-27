/**
 * Migrates the 4 HIPAA content blocks from the old website-page-patient-rights-privacy
 * document into a new website-page-notice-privacy-practices legal page document.
 *
 * The old document stores content as pageSection blocks (heading + body[]).
 * This script flattens each section into h2 + paragraph blocks in portable text format.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/migrate-notice-privacy-practices.mjs
 *
 * Safe to run multiple times — uses createOrReplace so the body is always replaced
 * with a fresh conversion from the source document.
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

// ─── Fetch old document ──────────────────────────────────────────────────────

const query = encodeURIComponent(
  `*[_id == "website-page-patient-rights-privacy"][0]{ _id, title, blocks }`
);

const fetchRes = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
  { headers: { Authorization: `Bearer ${token}` } },
);

const { result: source } = await fetchRes.json();

if (!source) {
  console.error("Source document website-page-patient-rights-privacy not found.");
  process.exit(1);
}

console.log(`Found source: "${source.title}" with ${source.blocks?.length ?? 0} blocks`);

// ─── Convert pageSection blocks → flat portable text ─────────────────────────

let keyCounter = 1;
const makeKey = () => `migrated-${String(keyCounter++).padStart(4, "0")}`;

function convertSectionToBody(section) {
  const blocks = [];

  // Section heading → h2
  if (section.heading) {
    blocks.push({
      _type: "block",
      _key: makeKey(),
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: makeKey(), text: section.heading, marks: [] }],
    });
  }

  // Body blocks — already portable text; re-key them and keep h3/h4 as-is
  for (const block of section.body ?? []) {
    blocks.push({ ...block, _key: makeKey() });
  }

  return blocks;
}

const pageSections = (source.blocks ?? []).filter((b) => b._type === "pageSection");

if (pageSections.length === 0) {
  console.error("No pageSection blocks found in source document.");
  process.exit(1);
}

const body = pageSections.flatMap(convertSectionToBody);

console.log(`Converted ${pageSections.length} sections → ${body.length} portable text blocks`);

// ─── Write destination document ──────────────────────────────────────────────

const mutation = {
  createOrReplace: {
    _id: "website-page-notice-privacy-practices",
    _type: "websitePage",
    key: "notice-privacy-practices",
    path: "/patients-rights-privacy/notice-privacy-practices",
    pageType: "legal",
    status: "published",
    title: "Notice of Privacy Practices",
    seo: { _type: "seoFields", noIndex: false },
    body,
  },
};

const mutateRes = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations: [mutation] }),
  },
);

const result = await mutateRes.json();

if (!mutateRes.ok) {
  console.error("Migration failed:", JSON.stringify(result, null, 2));
  process.exit(1);
}

console.log("✓ Created website-page-notice-privacy-practices with migrated HIPAA content");
console.log(JSON.stringify(result, null, 2));
