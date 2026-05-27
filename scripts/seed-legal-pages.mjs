/**
 * Seeds placeholder websitePage documents for the three legal child pages
 * under /patients-rights-privacy that don't yet exist in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-legal-pages.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

// Uses createIfNotExists + patch so existing body content is never wiped.
const pages = [
  {
    id: "website-page-privacy-policy",
    key: "privacy-policy",
    path: "/patients-rights-privacy/privacy-policy",
    title: "Privacy Policy",
  },
  {
    id: "website-page-medical-record-request-authorization",
    key: "medical-record-request-authorization",
    path: "/patients-rights-privacy/medical-record-request-authorization",
    title: "Medical Record Request & Authorization",
  },
  {
    id: "website-page-terms-of-use",
    key: "terms-of-use",
    path: "/patients-rights-privacy/terms-of-use",
    title: "Terms of Use",
  },
  {
    id: "website-page-notice-privacy-practices",
    key: "notice-privacy-practices",
    path: "/patients-rights-privacy/notice-privacy-practices",
    title: "Notice of Privacy Practices",
  },
];

const mutations = pages.flatMap(({ id, key, path, title }) => [
  {
    createIfNotExists: {
      _id: id,
      _type: "websitePage",
      key,
      path,
      pageType: "legal",
      status: "published",
      title,
      eyebrow: "Patient rights",
      seo: { _type: "seoFields", noIndex: false },
    },
  },
  {
    patch: {
      id,
      set: { key, path, pageType: "legal", status: "published", title, eyebrow: "Patient rights" },
    },
  },
]);

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations }),
});

const json = await res.json();

if (!res.ok) {
  console.error("Seed failed:", JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log(`✓ Seeded ${pages.length} legal page documents.`);
console.log(JSON.stringify(json, null, 2));
