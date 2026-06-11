import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'k23sgnrq', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_AUTH_TOKEN })
async function run() {
  const pages = await client.fetch(`*[_type == "websitePage" && key in ["terms-of-use","terms-of-service","privacy-policy","notice-privacy-practices","patient-rights-privacy","patients-rights-privacy"]]{ _id, key, path, status, breadcrumbs, "hasBody": defined(body) && length(body) > 0 }`)
  console.log('Legal page docs:\n', JSON.stringify(pages, null, 2))
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ showBreadcrumbs }`)
  console.log('\nSite showBreadcrumbs:', JSON.stringify(settings))
}
run().catch(err => { console.error(err); process.exit(1) })
