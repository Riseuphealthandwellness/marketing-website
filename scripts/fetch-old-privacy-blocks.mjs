/**
 * Fetches the page blocks from the old patient-rights-privacy document
 * so we can see what content is there.
 *
 * Usage:
 *   node --env-file=.env.local scripts/fetch-old-privacy-blocks.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

const query = encodeURIComponent(
  `*[_id == "website-page-patient-rights-privacy"][0]{ _id, title, blocks }`
);

const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
  { headers: { Authorization: `Bearer ${token}` } },
);

const json = await res.json();
const doc = json.result;

if (!doc) {
  console.log("Document not found.");
  process.exit(0);
}

console.log(`Title: ${doc.title}`);
console.log(`Blocks (${doc.blocks?.length ?? 0}):\n`);
console.log(JSON.stringify(doc.blocks, null, 2));
