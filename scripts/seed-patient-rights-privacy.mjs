/**
 * Seeds the Patient Rights & Privacy landing page (website-page-patient-rights-privacy).
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<editor-token> node scripts/seed-patient-rights-privacy.mjs
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

function bullet(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _key: `${key}c`, _type: "span", marks: [], text }],
  };
}

function section(key, heading, bodyBlocks) {
  return {
    _key: key,
    _type: "pageSection",
    heading,
    body: bodyBlocks,
  };
}

const doc = {
  _id: "website-page-patient-rights-privacy",
  _type: "websitePage",
  key: "patient-rights-privacy",
  path: "/patients-rights-privacy/notice-privacy-practices",
  pageType: "landing",
  status: "published",
  title: "Your rights and your privacy",
  eyebrow: "Patient rights",
  description:
    "Information about your privacy rights, HIPAA protections, and how Rise Up Health & Wellness handles your health information.",
  blocks: [
    section("s1", "Your Rights Under HIPAA", [
      block("s1p1", "As a patient at Rise Up Health & Wellness, you have the following rights regarding your protected health information (PHI):"),
      block("s1h1", "Right to access your records", "h3"),
      block("s1p2", "You may request a copy of your medical records. We will respond to your request within 30 days. Copies may be provided electronically or on paper. A reasonable fee may apply for paper copies."),
      block("s1h2", "Right to request corrections", "h3"),
      block("s1p3", "If you believe information in your record is incorrect or incomplete, you may request an amendment. We may deny the request in limited circumstances, but will explain the reason in writing."),
      block("s1h3", "Right to request restrictions", "h3"),
      block("s1p4", "You may ask us to limit how we use or share your health information. We are not required to agree to most requests, but we will consider each one. We must agree if the request involves information shared with a health plan and the service was paid for entirely out of pocket."),
      block("s1h4", "Right to confidential communications", "h3"),
      block("s1p5", "You may request that we contact you in a specific way — for example, by phone at a number other than your home number, or by mail to a different address. We will accommodate reasonable requests."),
      block("s1h5", "Right to an accounting of disclosures", "h3"),
      block("s1p6", "You may request a list of instances where we shared your health information for purposes other than treatment, payment, or healthcare operations within the past six years."),
      block("s1h6", "Right to a paper notice", "h3"),
      block("s1p7", "You have the right to receive a paper copy of our Notice of Privacy Practices at any time, even if you have agreed to receive it electronically."),
    ]),
    section("s2", "Special Protections for Substance Use Records", [
      block("s2p1", "Federal law (42 CFR Part 2) provides additional protections for records related to substance use disorder treatment — including records related to addiction medicine services at Rise Up."),
      block("s2p2", "These records generally cannot be disclosed to outside parties without your written consent, except in limited circumstances such as:"),
      bullet("s2b1", "A medical emergency where disclosure is necessary to protect your life"),
      bullet("s2b2", "A court order that meets specific legal requirements"),
      bullet("s2b3", "Research, audit, or program evaluation activities conducted under strict confidentiality agreements"),
      block("s2p3", "If you have questions about how your substance use treatment records are protected, please speak with our front desk or care team."),
    ]),
    section("s3", "How We Use and Share Your Information", [
      block("s3p1", "We use your health information to provide and coordinate your care. We may share it with:"),
      bullet("s3b1", "Other providers involved in your treatment, such as specialists or pharmacies"),
      bullet("s3b2", "Health insurers for billing and payment purposes"),
      bullet("s3b3", "Public health authorities as required by law"),
      bullet("s3b4", "Law enforcement when required by a valid court order or legal obligation"),
      block("s3p2", "We do not sell your health information. We do not share it for marketing purposes without your explicit written authorization."),
    ]),
    section("s4", "How to Exercise Your Rights or File a Complaint", [
      block("s4p1", "To request your records, request a restriction, or exercise any of the rights listed above, submit a written request to our office. You may drop it off in person, mail it, or contact us by phone to request a form."),
      block("s4p2", "If you believe your privacy rights have been violated, you may file a complaint with us directly or with the U.S. Department of Health & Human Services Office for Civil Rights. We will not retaliate against you for filing a complaint."),
      block("s4p3", "For questions or to reach our privacy officer, contact us at the address or phone number on the Contact page."),
    ]),
  ],
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

console.log("✓ Patient rights & privacy page seeded.");
console.log(JSON.stringify(json, null, 2));
