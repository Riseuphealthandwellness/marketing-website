/**
 * Backfills pageLabels onto all drug documents in Sanity.
 *
 * Run from the apps/studio directory:
 *   npx sanity exec scripts/seed-drug-labels.ts --with-user-token
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

const defaultPageLabels = {
  eyebrow: 'Treatments',
  genericNameLabel: 'Generic name',
  aliasesLabel: 'Also known as',
}

async function run() {
  const drugs = await client.fetch<{_id: string; name: string}[]>(
    `*[_type == "drug"]{ _id, name }`,
  )

  console.log(`Seeding pageLabels for ${drugs.length} drug(s)…`)

  for (const drug of drugs) {
    await client.patch(drug._id).set({pageLabels: defaultPageLabels}).commit()
    console.log(`  ✓  ${drug.name}`)
  }

  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
