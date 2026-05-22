/**
 * Patches missing content on siteSettings (contactBand) and
 * referralPageSettings (form text fields).
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<editor-token> node scripts/patch-contact-and-referral.mjs
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
  // Add contactBand to siteSettings
  {
    patch: {
      id: "siteSettings",
      setIfMissing: {
        contactBand: {
          eyebrow: "Contact",
          heading: "Start with the team, not a maze of forms.",
          description:
            "Public contact should stay simple and low-friction. Clinical details, appointment changes, and urgent concerns belong in approved care channels or direct staff communication.",
        },
      },
    },
  },

  // Add missing form text fields to referralPageSettings
  {
    patch: {
      id: "referralPageSettings",
      setIfMissing: {
        formEyebrow: "Online referral",
        formHeading: "Send referral details.",
        formDescription:
          "Complete the fields below to send a referral. Our team will follow up to confirm receipt and next steps.",
        formDocumentNote:
          "Labs, radiology reports, progress notes, and other clinical attachments must be sent through the approved secure channel — not this form.",
        formConsentLabel:
          "I understand this online form only accepts the last 4 digits of Social Security numbers and does not accept labs, radiology reports, progress notes, or attachments. Supporting documents will be sent through the approved secure channel.",
        pdfSectionHeading: "Printable referral form",
        pdfSectionDescription:
          "Prefer to fax or mail? Download and complete the printable referral form.",
        missingPdfMessage:
          "The printable referral form is not currently available. Please use the online form above or contact us directly.",
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

console.log("Done.", JSON.stringify(json, null, 2));
