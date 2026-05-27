/**
 * Lists all websitePage documents in Sanity with their key, path, pageType, and content lengths.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/list-all-pages.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

const query = encodeURIComponent(
  `*[_type == "websitePage"]{ _id, key, path, pageType, title, "bodyLen": count(body), "blocksLen": count(blocks) } | order(path asc)`
);

const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
  { headers: { Authorization: `Bearer ${token}` } },
);

const json = await res.json();
if (!res.ok) { console.error(json); process.exit(1); }

for (const doc of json.result ?? []) {
  console.log(`${doc._id.padEnd(55)} key=${doc.key?.padEnd(40) ?? "(none)".padEnd(40)} body=${doc.bodyLen ?? 0} blocks=${doc.blocksLen ?? 0}`);
}
