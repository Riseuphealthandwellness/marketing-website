/**
 * Seeds the footerDisclaimers array on the siteSettings document.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-footer-disclaimers.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

const disclaimers = [
  {
    _key: "disc-medical-advice",
    _type: "object",
    text: "The information on this website is for general informational purposes only and is not intended to replace the advice of a qualified healthcare professional. Always consult your provider regarding your specific health needs, diagnosis, or treatment.",
  },
  {
    _key: "disc-insurance",
    _type: "object",
    text: "Insurance coverage, benefits, and prior authorization requirements vary by plan. Please contact your insurance provider for details regarding your specific coverage. Rise Up Health & Wellness participates with select commercial, Medicaid, and Medicare plans.",
  },
  {
    _key: "disc-spravato",
    _type: "object",
    text: "Spravato® (esketamine) is currently available at Rise Up to commercially insured patients only and must be administered in a certified healthcare setting under direct clinical supervision as required by the FDA REMS program. Coverage and prior authorization requirements vary by plan.",
  },
  {
    _key: "disc-wv",
    _type: "object",
    text: "Rise Up Health & Wellness provides integrated primary care and specialty services to patients in West Virginia. Services and program availability may vary by location.",
  },
];

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    mutations: [
      {
        patch: {
          id: "siteSettings",
          set: { footerDisclaimers: disclaimers },
        },
      },
    ],
  }),
});

const json = await res.json();

if (!res.ok) {
  console.error("Seed failed:", JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log(`✓ Seeded ${disclaimers.length} footer disclaimers.`);
console.log(JSON.stringify(json, null, 2));
