/**
 * Fetches the body/blocks from old stranded documents to inspect their content.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/fetch-stranded-content.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;
if (!token) { console.error("Set SANITY_WRITE_TOKEN before running."); process.exit(1); }

const query = encodeURIComponent(
  `*[_id in ["website-page-terms-of-service", "website-page-medical-record-request"]]{ _id, key, title, body, blocks }`
);

const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
  { headers: { Authorization: `Bearer ${token}` } },
);
const { result } = await res.json();

for (const doc of result ?? []) {
  console.log(`\n=== ${doc._id} (key: ${doc.key}) ===`);
  console.log(`title: ${doc.title}`);
  if (doc.body?.length) {
    console.log(`\nbody[${doc.body.length} blocks] — first 5:`);
    doc.body.slice(0, 5).forEach((b, i) => {
      const text = b.children?.map(c => c.text).join("") ?? "";
      console.log(`  [${i}] style=${b.style ?? b._type} | ${text.slice(0, 100)}`);
    });
  }
  if (doc.blocks?.length) {
    console.log(`\nblocks[${doc.blocks.length}] — types:`);
    doc.blocks.forEach((b, i) => console.log(`  [${i}] _type=${b._type} heading=${b.heading ?? "(none)"}`));
  }
}
