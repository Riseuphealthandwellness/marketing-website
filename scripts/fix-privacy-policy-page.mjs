/**
 * Repairs stale Privacy Policy metadata/sidebar after legal page migrations.
 *
 * Usage:
 *   npx sanity exec ../../scripts/fix-privacy-policy-page.mjs --with-user-token
 */

const API_VERSION = "2025-01-01";

const {getCliClient} = await import("sanity/cli");

const client = getCliClient({apiVersion: API_VERSION});

const result = await client
  .patch("website-page-privacy-policy")
  .set({
    key: "privacy-policy",
    path: "/patients-rights-privacy/privacy-policy",
    pageType: "legal",
    status: "published",
    title: "Privacy Policy",
    eyebrow: "Privacy Policy",
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
        _key: "contact-us",
        _type: "sidebarCard",
        heading: "Contact Us",
        description: "Let us know if you have questions.",
        ctaLabel: "Contact us",
        ctaHref: "/contact",
      },
    ],
  })
  .commit();

console.log(
  "Privacy Policy page repaired.",
  JSON.stringify(
    {
      _id: result._id,
      key: result.key,
      path: result.path,
      title: result.title,
      eyebrow: result.eyebrow,
      sidebar: result.sidebar,
    },
    null,
    2,
  ),
);
