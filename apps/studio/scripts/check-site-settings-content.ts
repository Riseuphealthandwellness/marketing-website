import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'k23sgnrq', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_AUTH_TOKEN })
async function run() {
  const s = await client.fetch(`*[_type == "siteSettings"][0]{ showBreadcrumbs, contactBand }`)
  console.log(JSON.stringify(s, null, 2))
}
run().catch(err => { console.error(err); process.exit(1) })
