/**
 * Checks what websitePage documents exist for the legal page keys
 * and whether they have body content.
 *
 * Usage:
 *   node --env-file=.env.local scripts/check-legal-pages.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN or SANITY_API_READ_TOKEN before running this script.");
  process.exit(1);
}

const keys = ["privacy-policy", "medical-record-request-authorization", "terms-of-use", "patient-rights-privacy", "patients-rights-privacy"];

const query = encodeURIComponent(
  `*[_type == "websitePage" && key in ${JSON.stringify(keys)}]{ _id, key, pageType, status, title, path, "bodyLength": count(body), "blocksLength": count(blocks) } | order(key asc)`
);

const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
  { headers: { Authorization: `Bearer ${token}` } },
);

const json = await res.json();

if (!res.ok) {
  console.error("Query failed:", JSON.stringify(json, null, 2));
  process.exit(1);
}

const docs = json.result ?? [];
console.log(`Found ${docs.length} document(s):\n`);
for (const doc of docs) {
  console.log(`  _id:         ${doc._id}`);
  console.log(`  key:         ${doc.key}`);
  console.log(`  pageType:    ${doc.pageType}`);
  console.log(`  status:      ${doc.status}`);
  console.log(`  title:       ${doc.title}`);
  console.log(`  path:        ${doc.path}`);
  console.log(`  body blocks: ${doc.bodyLength ?? 0}`);
  console.log(`  page blocks: ${doc.blocksLength ?? 0}`);
  console.log();
}
