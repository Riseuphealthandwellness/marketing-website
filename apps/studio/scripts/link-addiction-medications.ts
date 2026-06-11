/**
 * Links all existing drugs to the addiction-medicine service.
 * Run from apps/studio:
 *   npx sanity exec scripts/link-addiction-medications.ts --with-user-token
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  const drugs = await client.fetch<{ _id: string; name: string; slug: string }[]>(
    `*[_type == "drug"] | order(name asc) { _id, name, "slug": slug.current }`
  )

  console.log('All drugs found:')
  for (const d of drugs) {
    console.log(`  ${d.slug}  →  ${d.name}`)
  }

  const service = await client.fetch<{ _id: string; title: string; medications: { _ref: string }[] } | null>(
    `*[_type == "service" && slug.current == "addiction-medicine"][0]{ _id, title, "medications": medications[]{ _ref } }`
  )

  if (!service) {
    console.error('addiction-medicine service not found')
    process.exit(1)
  }

  const existingRefs = new Set((service.medications ?? []).map(m => m._ref))
  const toAdd = drugs.filter(d => !existingRefs.has(d._id))

  if (toAdd.length === 0) {
    console.log('\nAll drugs already linked.')
    return
  }

  console.log(`\nLinking ${toAdd.length} drug(s) to "${service.title}":`)
  for (const d of toAdd) {
    console.log(`  + ${d.name}`)
  }

  await client
    .patch(service._id)
    .setIfMissing({ medications: [] })
    .append('medications', toAdd.map(d => ({ _type: 'reference', _ref: d._id })))
    .commit()

  console.log('\nDone.')
}

run().catch(err => { console.error(err); process.exit(1) })
