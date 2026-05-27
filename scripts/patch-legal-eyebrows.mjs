/**
 * Patches eyebrow: "Patient rights" onto all legal pages under /patients-rights-privacy.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/patch-legal-eyebrows.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) { console.error("Set SANITY_WRITE_TOKEN before running."); process.exit(1); }

const ids = [
  "website-page-privacy-policy",
  "website-page-terms-of-use",
  "website-page-medical-record-request-authorization",
  "website-page-notice-privacy-practices",
];

const mutations = ids.map(id => ({
  patch: { id, set: { eyebrow: "Patient rights" } },
}));

const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations }),
  },
);

const json = await res.json();
if (!res.ok) { console.error("Patch failed:", JSON.stringify(json, null, 2)); process.exit(1); }

console.log(`✓ Patched eyebrow on ${ids.length} legal pages`);
console.log(JSON.stringify(json, null, 2));
