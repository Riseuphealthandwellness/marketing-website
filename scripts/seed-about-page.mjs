/**
 * Seeds the custom About page content on the existing website-page-about document.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<editor-token> node scripts/seed-about-page.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;

const aboutContent = {
  _type: "aboutContent",
  hero: {
    heading: "Whole-person care, rooted in community.",
    primaryLabel: "Start care",
    primaryHref: "/new-patients",
    secondaryLabel: "Meet the team",
    secondaryHref: "/team",
    imageAlt:
      "Original collage artwork showing integrated care, community connection, and Appalachian landscape motifs",
    panelEyebrow: "Our mission, vision, and values",
    panelDescription:
      "Make care easier to enter, easier to understand, and easier to stay connected to.",
  },
  glance: {
    eyebrow: "Rise Up at a glance",
    heading: "A simpler front door for connected healthcare.",
    items: [
      {
        _key: "glance-integrated-care",
        _type: "aboutIconCard",
        iconName: "stethoscope",
        label: "Integrated care",
        detail: "Primary care plus recovery support",
      },
      {
        _key: "glance-clear-access",
        _type: "aboutIconCard",
        iconName: "route",
        label: "Clear access",
        detail: "New patients and referrals routed simply",
      },
      {
        _key: "glance-whole-person-focus",
        _type: "aboutIconCard",
        iconName: "sparkles",
        label: "Whole-person focus",
        detail: "Wellness, stability, and follow-through",
      },
      {
        _key: "glance-local-team",
        _type: "aboutIconCard",
        iconName: "badge-check",
        label: "Local team",
        detail: "Care designed for West Virginia communities",
      },
    ],
  },
  values: {
    eyebrow: "What guides us",
    heading: "Care is more durable when it is coordinated.",
    items: [
      {
        _key: "value-care-stays-connected",
        _type: "aboutIconCard",
        iconName: "heart-handshake",
        title: "Care stays connected",
        description:
          "Primary care, treatment, recovery support, and wellness goals stay in the same conversation.",
      },
      {
        _key: "value-people-before-process",
        _type: "aboutIconCard",
        iconName: "users",
        title: "People before process",
        description:
          "Patients and families get a clear starting point, plain next steps, and support from real staff.",
      },
      {
        _key: "value-rooted-in-west-virginia",
        _type: "aboutIconCard",
        iconName: "map-pin",
        title: "Rooted in West Virginia",
        description:
          "Our model is built around local access, community referrals, and long-term relationships.",
      },
    ],
  },
  team: {
    eyebrow: "People",
    heading: "Meet the team",
    ctaLabel: "View all",
    mobileCtaLabel: "View all team members",
  },
  community: {
    eyebrow: "Community connections",
    heading: "Built for patients, families, and referral partners.",
    description:
      "Whether someone reaches out directly or through a provider, Rise Up gives them a clear route into support that can continue over time.",
    ctaLabel: "Referral information",
    ctaHref: "/referrals",
    imageAlt:
      "Original collage artwork showing integrated care, community connection, and Appalachian landscape motifs",
  },
};

const mutation = {
  patch: {
    id: "website-page-about",
    set: {
      title: "Whole-person care, rooted in community",
      eyebrow: "About us",
      description:
        "RiseUp Health & Wellness brings primary care, addiction medicine, recovery support, and wellness care together under one roof - so patients get coordinated support.",
      aboutContent,
    },
    setIfMissing: {
      _type: "websitePage",
      key: "about",
      path: "/about",
      pageType: "custom",
      status: "published",
    },
  },
};

async function seedWithCliClient() {
  const { getCliClient } = await import("sanity/cli");
  const client = getCliClient({ apiVersion: API_VERSION });

  return client
    .patch("website-page-about")
    .set(mutation.patch.set)
    .setIfMissing(mutation.patch.setIfMissing)
    .commit();
}

async function seedWithWriteToken() {
  if (!token) {
    throw new Error(
      "Set SANITY_WRITE_TOKEN before running this script, or run it with `npx sanity exec ../../scripts/seed-about-page.mjs --with-user-token` from apps/studio.",
    );
  }

  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations: [mutation] }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(`Seed failed: ${JSON.stringify(json, null, 2)}`);
  }

  return json;
}

let json;
try {
  json = token ? await seedWithWriteToken() : await seedWithCliClient();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

console.log("About page content seeded.", JSON.stringify(json, null, 2));
