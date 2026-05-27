/**
 * Seeds the Patient Rights & Privacy landing page document.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-patients-rights-privacy.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

const doc = {
  _id: "website-page-patients-rights-privacy",
  _type: "websitePage",
  key: "patients-rights-privacy",
  path: "/patients-rights-privacy",
  pageType: "custom",
  status: "published",
  title: "Your Privacy is Important to Us",
  eyebrow: "Patient rights",
  description:
    "Rise Up is committed to protecting our patients' privacy. We make all reasonable efforts to comply with applicable federal and state privacy regulations, including the Health Insurance Portability and Accountability Act (HIPAA)/HITECH ACT.",
  seo: {
    _type: "seoFields",
    noIndex: false,
  },
};

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
});

const json = await res.json();

if (!res.ok) {
  console.error("Seed failed:", JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log("✓ Patient Rights & Privacy page document seeded.");
console.log(JSON.stringify(json, null, 2));
