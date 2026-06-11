/**
 * Deletes the three legacy footer navigation documents that were replaced by the
 * siteFooter singleton. These are no longer queried by the frontend.
 *
 * Run from the apps/studio directory:
 *   npx sanity exec scripts/delete-legacy-footer-nav.ts --with-user-token
 */

import {createClient} from '@sanity/client'

const IDS = ['navigation-footer-care', 'navigation-footer-patients', 'navigation-footer-about']

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  const docs = await client.fetch<{_id: string; title: string}[]>(
    `*[_id in $ids]{ _id, title }`,
    {ids: IDS},
  )

  if (docs.length === 0) {
    console.log('No legacy footer nav documents found — already deleted.')
    return
  }

  for (const doc of docs) {
    await client.delete(doc._id)
    console.log(`  ✓  Deleted: ${doc._id} (${doc.title})`)
  }

  console.log('\nDone.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
