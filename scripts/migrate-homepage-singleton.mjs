/**
 * Copies homepage content from the old websitePage document (website-page-home)
 * into the new homepage singleton (singleton-homepage).
 *
 * Safe to re-run — uses createOrReplace so it is fully idempotent.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<editor-token> node scripts/migrate-homepage-singleton.mjs
 *
 * Get a token: sanity.io/manage → your project → API → Tokens → Add API token (Editor role)
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

// ─── Exact data from website-page-home, fetched 2026-05-25 ─────────────────
const homepageDoc = {
  _id: "singleton-homepage",
  _type: "homepage",

  hero: {
    eyebrow: "Integrated healthcare in West Virginia",
    heading: [
      {
        _key: "4985c87887a8",
        _type: "block",
        style: "normal",
        markDefs: [
          { _key: "cec28ff5732c", _type: "textColor", color: "riseRed" },
          { _key: "4a570c4265fc", _type: "textColor", color: "riseRed" },
        ],
        children: [
          { _key: "b26987edace8", _type: "span", marks: [], text: "Comprehensive " },
          { _key: "086c5fc1bd1c", _type: "span", marks: ["cec28ff5732c"], text: "care" },
          { _key: "b86d94fe4492", _type: "span", marks: [], text: " in one location to get you " },
          { _key: "d851328a1095", _type: "span", marks: ["4a570c4265fc"], text: "feeling your best" },
          { _key: "cdfb3ee452f0", _type: "span", marks: [], text: "." },
        ],
      },
    ],
    description:
      "Rise Up gives patients, families, and referral partners a clear path into coordinated care without asking people to navigate it alone.",
    buttons: [
      {
        _key: "hero-btn-2",
        _type: "ctaButton",
        label: "Refer a patient",
        href: "/referrals",
        style: "secondary",
        icon: "arrow",
      },
    ],
    backgroundImage: {
      _type: "image",
      asset: { _ref: "image-5e2719835e4636762f010f6e7e69d5a3d55c26ba-1536x1024-png", _type: "reference" },
    },
    featureImage: {
      _type: "image",
      asset: { _ref: "image-f4e165370cf50ce6600e55ba89ab49a3d928f09a-1281x745-png", _type: "reference" },
    },
  },

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

  careModelHighlights: [],

  serviceHighlights: [
    {
      _key: "afc718392b25",
      _type: "serviceHighlight",
      title: "Addiction Medicine",
      description: "Medication-assisted treatment, Suboxone, and recovery support",
      href: "/care/addiction-medicine",
    },
    {
      _key: "71a9431368e2",
      _type: "serviceHighlight",
      title: "Primary Care",
      description: "Ongoing health management, preventive care, and chronic condition treatment",
      href: "/care/primary-care",
    },
    {
      _key: "da1ac03cf056",
      _type: "serviceHighlight",
      title: "Weight Loss Management",
      description:
        "Get back to looking and feeling your best with a combination of weight loss techniques including diet, exercise and medications.",
      href: "/care/weight-loss-mgmt",
    },
  ],

  careOptions: {
    eyebrow: "Care options",
    heading: "Choose the door that matches the need.",
    description:
      "Some visitors arrive looking for treatment support. Others need primary care, program information, or a referral route. Keep each path distinct and easy to scan.",
    ctaLabel: "View care overview",
    ctaHref: "/care",
  },

  referralCta: {
    _type: "ctaBlock",
    heading: "Referral partners",
    description: "A direct route for providers, families, and community partners.",
    primaryLabel: "Referral Information",
    primaryHref: "/referrals",
    secondaryLabel: "Contact Team",
    secondaryHref: "/contact",
  },

  seo: {
    _type: "seoFields",
    noIndex: false,
  },
};

// ────────────────────────────────────────────────────────────────────────────

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations: [{ createOrReplace: homepageDoc }] }),
});

const json = await res.json();

if (!res.ok) {
  console.error("Migration failed:", JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log("✓ singleton-homepage created/updated.", JSON.stringify(json, null, 2));
console.log("\nNext step: update queries.ts to use *[_type == \"homepage\"][0] and deploy.");
