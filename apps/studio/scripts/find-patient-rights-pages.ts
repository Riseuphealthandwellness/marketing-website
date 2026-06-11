import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'k23sgnrq', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_AUTH_TOKEN })
async function run() {
  const docs = await client.fetch(`*[path match "*patient-rights*" || _id match "*patient-rights*"]{ _id, _type, path, key, title, status }`)
  console.log(JSON.stringify(docs, null, 2))
}
run().catch(err => { console.error(err); process.exit(1) })
