/**
 * Moves contactBand content from siteSettings into the website-page-contact doc.
 *
 * Run from apps/studio:
 *   npx sanity exec scripts/migrate-contact-band-to-contact-page.ts --with-user-token
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
  const settings = await client.fetch<{ contactBand?: { eyebrow?: string; heading?: string; description?: string } }>(
    `*[_type == "siteSettings"][0]{ contactBand }`,
  )

  if (!settings?.contactBand) {
    console.log('⚠️  No contactBand found in siteSettings — nothing to migrate.')
    return
  }

  const { eyebrow, heading, description } = settings.contactBand
  console.log('Found contactBand in siteSettings:')
  console.log(`  eyebrow: ${eyebrow}`)
  console.log(`  heading: ${heading}`)
  console.log(`  description: ${description}`)

  const contactPage = await client.fetch<{ _id: string } | null>(
    `*[_type == "websitePage" && key == "contact"][0]{ _id }`,
  )

  if (!contactPage) {
    console.error('❌  website-page-contact doc not found. Cannot migrate.')
    process.exit(1)
  }

  await client
    .patch(contactPage._id)
    .set({ contactBand: { eyebrow, heading, description } })
    .commit()

  console.log(`✅  Wrote contactBand to ${contactPage._id}`)

  await client
    .patch('siteSettings')
    .unset(['contactBand'])
    .commit()

  console.log('✅  Removed contactBand from siteSettings')
  console.log('\nDone.')
}

run().catch(err => { console.error(err); process.exit(1) })
