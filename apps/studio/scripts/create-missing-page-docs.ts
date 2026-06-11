/**
 * Creates missing websitePage documents for pages that are in websiteManagedPages
 * but don't yet have a Sanity document.
 *
 * Run from apps/studio:
 *   npx sanity exec scripts/create-missing-page-docs.ts --with-user-token
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

const docsToCreate = [
  {
    _id: 'website-page-medications',
    _type: 'websitePage',
    key: 'medications',
    path: '/care/medications',
    pageType: 'landing',
    status: 'published',
    title: 'Medications we offer',
    eyebrow: 'Medications',
    description:
      'Evidence-based medications used as part of individualized treatment plans at Rise Up Health & Wellness.',
  },
  {
    _id: 'website-page-patients-rights-privacy',
    _type: 'websitePage',
    key: 'patients-rights-privacy',
    path: '/patients-rights-privacy',
    pageType: 'landing',
    status: 'published',
    title: 'Your Privacy is Important to Us',
    eyebrow: 'Patient rights',
    description:
      'Rise Up is committed to protecting our patients\' privacy. We make all reasonable efforts to comply with applicable federal and state privacy regulations, including HIPAA/HITECH.',
  },
]

async function run() {
  for (const doc of docsToCreate) {
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_id == $id][0]{ _id }`,
      { id: doc._id },
    )
    if (existing) {
      console.log(`  ⏭  ${doc._id} already exists — skipping`)
      continue
    }
    await client.create(doc)
    console.log(`  ✅  Created ${doc._id}`)
  }
  console.log('\nDone.\n')
}

run().catch(err => { console.error(err); process.exit(1) })
