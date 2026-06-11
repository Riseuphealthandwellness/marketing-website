import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  await client.delete('website-page-terms-of-service')
  console.log('✅  Deleted website-page-terms-of-service')
}

run().catch(err => { console.error(err); process.exit(1) })
