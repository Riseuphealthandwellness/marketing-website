/**
 * Patches missing fields on the existing homepageSettings document.
 * Only adds heroFeaturePanel, careOptions, and hero.buttons.
 * Does NOT overwrite existing fields.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<editor-token> node scripts/patch-homepage-missing.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

const mutations = [
  {
    patch: {
      id: "homepageSettings",
      setIfMissing: {
        "hero.buttons": [
          {
            _key: "hero-btn-1",
            _type: "ctaButton",
            label: "Get started",
            href: "/contact",
            style: "primary",
            icon: "arrow",
          },
          {
            _key: "hero-btn-2",
            _type: "ctaButton",
            label: "Refer a patient",
            href: "/referrals",
            style: "secondary",
            icon: "arrow",
          },
        ],
        heroFeaturePanel: {
          eyebrow: "One coordinated starting point",
          items: [
            {
              _key: "fp-1",
              _type: "homepageFeaturePanelItem",
              iconName: "phone",
              text: "Call, request an appointment, or start a referral from the same public site.",
            },
            {
              _key: "fp-2",
              _type: "homepageFeaturePanelItem",
              iconName: "heart-pulse",
              text: "Treatment support and primary care stay part of the same care conversation.",
            },
            {
              _key: "fp-3",
              _type: "homepageFeaturePanelItem",
              iconName: "map-pin",
              text: "Built for West Virginia patients, families, and community referral partners.",
            },
          ],
          ctaLabel: "Explore care model",
          ctaHref: "/care",
        },
        careOptions: {
          eyebrow: "Care options",
          heading: "Choose the door that matches the need.",
          description:
            "Some visitors arrive looking for treatment support. Others need primary care, program information, or a referral route. Keep each path distinct and easy to scan.",
          ctaLabel: "View care overview",
          ctaHref: "/care",
        },
      },
    },
  },
];

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
  console.error("Patch failed:", JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log("Patch applied.", JSON.stringify(json, null, 2));
