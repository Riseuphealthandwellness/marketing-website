/**
 * Fixes the services page breadcrumb that was explicitly disabled in Sanity.
 * Sets breadcrumbs.enabled = true on website-page-services.
 *
 * Run from the apps/studio directory:
 *   npx sanity exec scripts/fix-services-breadcrumbs.ts --with-user-token
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  const doc = await client.fetch<{_id: string; breadcrumbs?: {enabled?: boolean}}>(
    `*[_id == "website-page-services"][0]{ _id, breadcrumbs }`,
  )

  if (!doc) {
    console.log('website-page-services not found.')
    return
  }

  console.log('Current breadcrumbs:', JSON.stringify(doc.breadcrumbs))

  await client.patch('website-page-services').set({'breadcrumbs.enabled': true}).commit()
  console.log('✓  breadcrumbs.enabled set to true on website-page-services')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
