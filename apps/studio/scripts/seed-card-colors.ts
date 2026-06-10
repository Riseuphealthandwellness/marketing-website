/**
 * Backfills cardColor onto all service and program documents in Sanity.
 * Colors are assigned in the same rotation that was previously hardcoded in the
 * page components, preserving the current visual appearance and locking each
 * document to a stable color regardless of sort order changes.
 *
 * Run from the apps/studio directory:
 *   npx sanity exec scripts/seed-card-colors.ts --with-user-token
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

const serviceColors = ['riseRed', 'deepSlate', 'coal', 'emberOrange']
const programColors = ['deepSlate', 'riseRed', 'coal', 'emberOrange']

async function run() {
  const [services, programs] = await Promise.all([
    client.fetch<{_id: string; title: string}[]>(
      `*[_type == "service"] | order(coalesce(sortOrder, 9999) asc, title asc){ _id, title }`,
    ),
    client.fetch<{_id: string; title: string}[]>(
      `*[_type == "program"] | order(coalesce(sortOrder, 9999) asc, title asc){ _id, title }`,
    ),
  ])

  console.log(`Seeding cardColor for ${services.length} service(s) and ${programs.length} program(s)…`)

  for (const [i, service] of services.entries()) {
    const cardColor = serviceColors[i % serviceColors.length]!
    await client.patch(service._id).set({cardColor}).commit()
    console.log(`  ✓  [service] ${service.title} → ${cardColor}`)
  }

  for (const [i, program] of programs.entries()) {
    const cardColor = programColors[i % programColors.length]!
    await client.patch(program._id).set({cardColor}).commit()
    console.log(`  ✓  [program] ${program.title} → ${cardColor}`)
  }

  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
