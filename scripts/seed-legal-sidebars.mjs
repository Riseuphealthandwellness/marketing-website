/**
 * Seeds sidebar cards for legal child pages under /patients-rights-privacy.
 *
 * Usage:
 *   npx sanity exec ../../scripts/seed-legal-sidebars.mjs --with-user-token
 */

const API_VERSION = "2025-01-01";

const {getCliClient} = await import("sanity/cli");

const client = getCliClient({apiVersion: API_VERSION});

const contactCard = {
  _key: "contact-us",
  _type: "sidebarCard",
  heading: "Contact Us",
  description: "Let us know if you have questions.",
  ctaLabel: "Contact us",
  ctaHref: "/contact",
};

const pages = [
  {
    id: "website-page-notice-privacy-practices",
    sidebar: [
      {
        _key: "privacy-policy",
        _type: "sidebarCard",
        heading: "Privacy Policy",
        description: "Learn how website information is collected and used.",
        ctaLabel: "Learn more",
        ctaHref: "/patients-rights-privacy/privacy-policy",
      },
      {
        _key: "medical-record-request",
        _type: "sidebarCard",
        heading: "Medical Record Request",
        description: "Find out how to request your medical records.",
        ctaLabel: "Request records",
        ctaHref: "/patients-rights-privacy/medical-record-request-authorization",
      },
      contactCard,
    ],
  },
  {
    id: "website-page-medical-record-request-authorization",
    sidebar: [
      {
        _key: "notice-privacy-practices",
        _type: "sidebarCard",
        heading: "Notice of Privacy Practices",
        description: "Your privacy is important to us.",
        ctaLabel: "Learn more",
        ctaHref: "/patients-rights-privacy/notice-privacy-practices",
      },
      {
        _key: "privacy-policy",
        _type: "sidebarCard",
        heading: "Privacy Policy",
        description: "Review how website information is handled.",
        ctaLabel: "Read policy",
        ctaHref: "/patients-rights-privacy/privacy-policy",
      },
      contactCard,
    ],
  },
  {
    id: "website-page-terms-of-use",
    sidebar: [
      {
        _key: "privacy-policy",
        _type: "sidebarCard",
        heading: "Privacy Policy",
        description: "Review how website information is handled.",
        ctaLabel: "Read policy",
        ctaHref: "/patients-rights-privacy/privacy-policy",
      },
      {
        _key: "notice-privacy-practices",
        _type: "sidebarCard",
        heading: "Notice of Privacy Practices",
        description: "Learn about your health information privacy rights.",
        ctaLabel: "Learn more",
        ctaHref: "/patients-rights-privacy/notice-privacy-practices",
      },
      contactCard,
    ],
  },
];

const results = [];

for (const page of pages) {
  const result = await client.patch(page.id).set({sidebar: page.sidebar}).commit();
  results.push({
    _id: result._id,
    key: result.key,
    title: result.title,
    sidebar: result.sidebar?.map((card) => ({
      heading: card.heading,
      ctaHref: card.ctaHref,
    })),
  });
}

console.log("Legal sidebars seeded.", JSON.stringify(results, null, 2));
