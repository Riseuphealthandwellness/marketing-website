/**
 * Seeds the Spravato drug document.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-spravato.mjs
 */

const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN before running this script.");
  process.exit(1);
}

function block(key, text, style = "normal") {
  return {
    _key: key,
    _type: "block",
    style,
    markDefs: [],
    children: [{ _key: `${key}c`, _type: "span", marks: [], text }],
  };
}

const doc = {
  _id: "drug-spravato",
  _type: "drug",
  name: "Spravato",
  genericName: "esketamine",
  aliases: ["esketamine", "ketamine nasal spray"],
  slug: { _type: "slug", current: "spravato" },
  description:
    "An evidence-based treatment option for those struggling with Treatment Resistant Depression or Major Depressive Disorder with suicidal thoughts.",
  body: [
    block(
      "b1",
      "An evidence-based treatment option for those struggling with Treatment Resistant Depression or Major Depressive Disorder with suicidal thoughts.",
    ),
    block(
      "b2",
      "If you are interested in learning more about Spravato or would like to schedule an evaluation, our team is here to help guide you through every step of the process.",
    ),
    block(
      "b3",
      "At this time we can only offer this service to commercially insured payors.",
    ),
  ],
  learnMoreUrl: "https://www.spravato.com/what-is-spravato",
  learnMoreLabel:
    "What is SPRAVATO® (esketamine)? | An FDA-approved Nasal Spray for Adults with TRD",
  seo: { _type: "seoFields", noIndex: false },
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

console.log("✓ Spravato drug document seeded.");
console.log(JSON.stringify(json, null, 2));
