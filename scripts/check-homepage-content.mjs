const PROJECT_ID = "k23sgnrq";
const DATASET = "production";
const API_VERSION = "2025-01-01";
const token = process.env.SANITY_WRITE_TOKEN;
if (!token) { console.error("Set SANITY_WRITE_TOKEN"); process.exit(1); }

// Fetch both homepage and care model block
const query = encodeURIComponent(`{
  "homepage": *[_type == "homepage" && _id == "singleton-homepage"][0]{
    "heroDesc": hero.description,
    "featurePanelItems": heroFeaturePanel.items[].text,
    "serviceHighlights": serviceHighlights[]{ title, description },
    "careOptions": careOptions.description
  },
  "careModel": *[_type == "websitePage" && key == "care" && status == "published"][0].blocks[_type == "careModelBlock"][0]{
    eyebrow, heading, description, "items": items[]{ title, body }
  }
}`);
const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
  { headers: { Authorization: `Bearer ${token}` } }
);
const json = await res.json();
console.log(JSON.stringify(json.result, null, 2));
