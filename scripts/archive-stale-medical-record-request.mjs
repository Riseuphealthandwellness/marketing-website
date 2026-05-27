/**
 * Archives the old medical-record-request landing page after migrating to the
 * legal medical-record-request-authorization page.
 *
 * Usage:
 *   npx sanity exec ../../scripts/archive-stale-medical-record-request.mjs --with-user-token
 */

const API_VERSION = "2025-01-01";

const {getCliClient} = await import("sanity/cli");

const client = getCliClient({apiVersion: API_VERSION});

const result = await client
  .patch("website-page-medical-record-request")
  .set({
    pageType: "legal",
    status: "draft",
    path: "/patients-rights-privacy/medical-record-request-authorization",
  })
  .commit();

console.log(
  "Archived stale medical-record-request landing page.",
  JSON.stringify(
    {
      _id: result._id,
      key: result.key,
      pageType: result.pageType,
      status: result.status,
      path: result.path,
    },
    null,
    2,
  ),
);
