/**
 * Deletes any remaining draft or published versions of website-page-terms-of-service.
 * Sanity keeps drafts.* documents separately from published ones.
 *
 * Run from apps/studio:
 *   npx sanity exec scripts/delete-terms-drafts.ts --with-user-token
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
  const idsToDelete = [
    'website-page-terms-of-service',
    'drafts.website-page-terms-of-service',
  ]

  for (const id of idsToDelete) {
    const exists = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id })
    if (!exists) {
      console.log(`  ⏭  ${id} — not found, skipping`)
      continue
    }
    await client.delete(id)
    console.log(`  ✅  Deleted ${id}`)
  }

  // Also check for any other terms-of-service variants
  const remaining = await client.fetch<{ _id: string }[]>(
    `*[_id match "*terms-of-service*"]{ _id }`,
  )
  if (remaining.length) {
    console.log('\nStill found:')
    for (const doc of remaining) {
      console.log(`  ${doc._id}`)
      await client.delete(doc._id)
      console.log(`  ✅  Deleted ${doc._id}`)
    }
  } else {
    console.log('\nNo remaining terms-of-service documents found.')
  }
}

run().catch(err => { console.error(err); process.exit(1) })
