/**
 * Seed / restore the homepageSettings singleton in Sanity.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<your-editor-token> node scripts/seed-homepage.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

const homepageDoc = {
  _id: "homepageSettings",
  _type: "homepageSettings",
  title: "Homepage settings",

  hero: {
    eyebrow: "Integrated healthcare in West Virginia",
    heading: [
      {
        _key: "hero-h-1",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "hero-h-span-1",
            _type: "span",
            text: "Care that keeps treatment, recovery, and primary care connected.",
            marks: [],
          },
        ],
      },
    ],
    description:
      "Rise Up gives patients, families, and referral partners a clearer path into coordinated care without asking people to navigate it alone.",
    buttons: [
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

  careOptions: {
    eyebrow: "Care options",
    heading: "Choose the door that matches the need.",
    description:
      "Some visitors arrive looking for treatment support. Others need primary care, program information, or a referral route. Keep each path distinct and easy to scan.",
    ctaLabel: "View care overview",
    ctaHref: "/care",
  },

  serviceHighlights: [
    {
      _key: "sh-1",
      _type: "serviceHighlight",
      title: "Addiction Medicine",
      description:
        "Evidence-based treatment for substance use disorders, including medication-assisted treatment and recovery support.",
      href: "/care/addiction-medicine",
    },
    {
      _key: "sh-2",
      _type: "serviceHighlight",
      title: "Primary Care",
      description:
        "Ongoing primary care that stays connected to your treatment and recovery plan — not separate from it.",
      href: "/care/primary-care",
    },
    {
      _key: "sh-3",
      _type: "serviceHighlight",
      title: "Weight Management",
      description:
        "Medical weight loss support designed around your whole health picture, including metabolic and behavioral factors.",
      href: "/care/weight-loss-management",
    },
  ],

  referralCta: {
    eyebrow: "Referral partners",
    heading: "A direct route for providers, families, and community partners.",
    description:
      "Use the referral path for service questions and partner coordination. Sensitive clinical details should stay in approved intake, portal, or direct staff channels.",
    primaryLabel: "Referral information",
    primaryHref: "/referrals",
    secondaryLabel: "Contact team",
    secondaryHref: "/contact",
  },
};

const mutations = [{ createOrReplace: homepageDoc }];

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
  console.error("Sanity mutation failed:", JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log("Done.", JSON.stringify(json, null, 2));
