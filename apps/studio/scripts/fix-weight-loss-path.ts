/**
 * Fixes the weight-loss-mgmt page path back to its actual URL.
 * The seed script incorrectly set it to /care/services/weight-loss-management —
 * the page is actually served at /care/weight-loss-mgmt via care/[slug].
 *
 * Run from apps/studio:
 *   npx sanity exec scripts/fix-weight-loss-path.ts --with-user-token
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
  await client.patch('website-page-weight-loss-mgmt').set({ path: '/care/weight-loss-mgmt' }).commit()
  console.log('✅  Fixed weight-loss-mgmt path → /care/weight-loss-mgmt')
}

run().catch(err => { console.error(err); process.exit(1) })
