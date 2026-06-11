import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  const doc = await client.fetch(`*[_id == "website-page-patient-rights-privacy" || _id == "website-page-patients-rights-privacy"][0]`)
  console.log(JSON.stringify(doc, null, 2))
}

run().catch(err => { console.error(err); process.exit(1) })
