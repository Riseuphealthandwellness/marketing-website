/**
 * Removes the "Your Privacy is Important to Us" pageSection block
 * from the website-page-about document.
 *
 * Usage:
 *   node --env-file=.env.local scripts/remove-about-privacy-block.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

const base = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`;

// 1. Fetch current document
const fetchRes = await fetch(
  `${base}/data/query/${DATASET}?query=*[_id == "website-page-about"][0]{blocks}`,
  { headers: { Authorization: `Bearer ${token}` } },
);
const { result } = await fetchRes.json();

if (!result) {
  console.error("Could not find website-page-about document.");
  process.exit(1);
}

const blocks = result.blocks ?? [];
console.log(`Found ${blocks.length} blocks on the about page.`);

// 2. Find and report matching blocks
const PRIVACY_HEADINGS = [
  "Your Privacy is Important to Us",
  "Your Privacy is Important",
];

const toRemove = blocks.filter(
  (b) => b._type === "pageSection" && PRIVACY_HEADINGS.some((h) => b.heading?.trim().startsWith(h)),
);

if (toRemove.length === 0) {
  console.log("No privacy block found — nothing to remove.");
  process.exit(0);
}

console.log(`Removing ${toRemove.length} block(s):`);
toRemove.forEach((b) => console.log(`  - "${b.heading}" (_key: ${b._key})`));

// 3. Patch: unset each matching block by key
const unsetPaths = toRemove.map((b) => `blocks[_key == "${b._key}"]`);

const patchRes = await fetch(`${base}/data/mutate/${DATASET}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    mutations: [{ patch: { id: "website-page-about", unset: unsetPaths } }],
  }),
});

const json = await patchRes.json();

if (!patchRes.ok) {
  console.error("Patch failed:", JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log("✓ Privacy block removed from about page.");
