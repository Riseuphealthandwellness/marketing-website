import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  // Get both patients-rights docs fully
  const docs = await client.fetch(`*[_id in [
    "website-page-patient-rights-privacy",
    "website-page-patients-rights-privacy"
  ]]{ _id, key, sidebar, blocks }`)

  for (const doc of docs) {
    console.log(`\n─── ${doc._id} (key: ${doc.key}) ───`)
    console.log('sidebar:', JSON.stringify(doc.sidebar, null, 2))
  }

  // Also check the terms-of-use sidebar for stale links
  const termsDoc = await client.fetch(`*[_id == "website-page-terms-of-use"][0]{ _id, sidebar }`)
  console.log(`\n─── website-page-terms-of-use sidebar ───`)
  console.log(JSON.stringify(termsDoc?.sidebar, null, 2))

  // Grep all websitePages for any text/href containing "terms-of-service"
  console.log('\n─── Any doc with terms-of-service in sidebar hrefs ───')
  const stale = await client.fetch(`*[_type == "websitePage" && (
    sidebar[].ctaHref match "*terms-of-service*"
  )]{ _id, key, sidebar }`)
  console.log(stale.length ? JSON.stringify(stale, null, 2) : 'none found')
}

run().catch(err => { console.error(err); process.exit(1) })
