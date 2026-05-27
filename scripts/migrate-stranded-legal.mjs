/**
 * Migrates stranded legal content to the new document IDs/keys.
 *
 *   website-page-terms-of-service        (body, 64 blocks, portable text)
 *     → website-page-terms-of-use
 *
 *   website-page-medical-record-request  (blocks, 4 pageSections)
 *     → website-page-medical-record-request-authorization  (flattened to portable text)
 *
 * Safe to re-run — uses createOrReplace.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/migrate-stranded-legal.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) { console.error("Set SANITY_WRITE_TOKEN before running."); process.exit(1); }

// ─── Fetch source documents ───────────────────────────────────────────────────

const query = encodeURIComponent(
  `*[_id in ["website-page-terms-of-service", "website-page-medical-record-request"]]{ _id, key, title, body, blocks }`
);

const fetchRes = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
  { headers: { Authorization: `Bearer ${token}` } },
);
const { result } = await fetchRes.json();

const tos = result?.find(d => d._id === "website-page-terms-of-service");
const mrr = result?.find(d => d._id === "website-page-medical-record-request");

if (!tos) { console.error("website-page-terms-of-service not found."); process.exit(1); }
if (!mrr) { console.error("website-page-medical-record-request not found."); process.exit(1); }

console.log(`terms-of-service: ${tos.body?.length ?? 0} body blocks`);
console.log(`medical-record-request: ${mrr.blocks?.length ?? 0} pageSection blocks`);

// ─── Convert medical-record-request pageSections → portable text ──────────────

let keyIdx = 1;
const makeKey = () => `migrated-${String(keyIdx++).padStart(4, "0")}`;

function sectionsToBody(blocks) {
  return (blocks ?? [])
    .filter(b => b._type === "pageSection")
    .flatMap(section => [
      {
        _type: "block",
        _key: makeKey(),
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: makeKey(), text: section.heading, marks: [] }],
      },
      ...(section.body ?? []).map(b => ({ ...b, _key: makeKey() })),
    ]);
}

const mrrBody = sectionsToBody(mrr.blocks);
console.log(`Converted medical-record-request → ${mrrBody.length} portable text blocks`);

// ─── Mutations ────────────────────────────────────────────────────────────────

const mutations = [
  {
    createOrReplace: {
      _id: "website-page-terms-of-use",
      _type: "websitePage",
      key: "terms-of-use",
      path: "/patients-rights-privacy/terms-of-use",
      pageType: "legal",
      status: "published",
      title: "Terms of Use",
      seo: { _type: "seoFields", noIndex: false },
      body: tos.body,
    },
  },
  {
    createOrReplace: {
      _id: "website-page-medical-record-request-authorization",
      _type: "websitePage",
      key: "medical-record-request-authorization",
      path: "/patients-rights-privacy/medical-record-request-authorization",
      pageType: "legal",
      status: "published",
      title: "Medical Record Request & Authorization",
      seo: { _type: "seoFields", noIndex: false },
      body: mrrBody,
    },
  },
];

const mutateRes = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations }),
  },
);

const mutateJson = await mutateRes.json();
if (!mutateRes.ok) { console.error("Migration failed:", JSON.stringify(mutateJson, null, 2)); process.exit(1); }

console.log("✓ Migrated terms-of-service → terms-of-use");
console.log("✓ Migrated medical-record-request → medical-record-request-authorization");
console.log(JSON.stringify(mutateJson, null, 2));
