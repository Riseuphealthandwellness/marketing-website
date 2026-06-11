/**
 * Updates the hero path cards on the homepageV2 to Option A copy.
 * Run from apps/studio:
 *   npx sanity exec scripts/update-homepage-v2-path-cards.ts --with-user-token
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

function k() {
  return Math.random().toString(36).slice(2, 11)
}

async function run() {
  const doc = await client.fetch<{ _id: string; components: { _type: string; _key: string; pathCards?: unknown[] }[] } | null>(
    `*[_type == "homepageV2Settings"][0]{ _id, components[] { _type, _key, pathCards } }`,
  )

  if (!doc) {
    console.error('No homepageV2Settings document found.')
    process.exit(1)
  }

  const heroIndex = doc.components.findIndex(c => c._type === 'homepageV2HeroComponent')
  if (heroIndex === -1) {
    console.error('No homepageV2HeroComponent found in components array.')
    process.exit(1)
  }

  const newPathCards = [
    {
      _key: k(),
      title: 'Accepting new patients',
      body: "We'll help you verify insurance, answer questions, and get your first visit booked.",
      icon: 'clipboardList',
      link: {
        label: 'How to get started',
        href: '/new-patients',
      },
    },
    {
      _key: k(),
      title: 'Addiction & recovery',
      body: 'Medication-assisted treatment and primary care coordinated by the same team — no handoffs, no gaps.',
      icon: 'heartHandshake',
      link: {
        label: 'Addiction medicine',
        href: '/care/services/addiction-medicine',
      },
    },
  ]

  await client
    .patch(doc._id)
    .set({ [`components[${heroIndex}].pathCards`]: newPathCards })
    .commit()

  console.log('✅  Path cards updated.')
}

run().catch(err => { console.error(err); process.exit(1) })
