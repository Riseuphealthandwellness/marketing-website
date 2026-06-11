/**
 * Fixes breadcrumb settings on legal pages:
 * - Enables breadcrumbs on website-page-terms-of-use (was incorrectly set to false)
 * - Updates stale path on website-page-terms-of-service to match the real URL
 *
 * Run from apps/studio:
 *   npx sanity exec scripts/fix-legal-page-breadcrumbs.ts --with-user-token
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
  // Fix terms-of-use breadcrumbs (was false, should be true)
  await client
    .patch('website-page-terms-of-use')
    .set({ 'breadcrumbs.enabled': true })
    .commit()
  console.log('✅  website-page-terms-of-use breadcrumbs.enabled → true')

  // Fix stale path on the old terms-of-service doc so it doesn't pollute the sitemap
  // The real page is at /patients-rights-privacy/terms-of-use, not terms-of-service
  await client
    .patch('website-page-terms-of-service')
    .set({ path: '/patients-rights-privacy/terms-of-use' })
    .commit()
  console.log('✅  website-page-terms-of-service path fixed → /patients-rights-privacy/terms-of-use')
}

run().catch(err => { console.error(err); process.exit(1) })
