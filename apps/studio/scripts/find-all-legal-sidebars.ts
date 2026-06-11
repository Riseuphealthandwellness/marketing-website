import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  const docs = await client.fetch(`*[_type == "websitePage" && defined(sidebar) && count(sidebar) > 0]{ _id, key, sidebar }`)
  for (const doc of docs) {
    console.log(`\n─── ${doc._id} (key: ${doc.key}) ───`)
    for (const card of doc.sidebar) {
      console.log(`  ${card.heading}: ${card.ctaHref}`)
    }
  }
}

run().catch(err => { console.error(err); process.exit(1) })
