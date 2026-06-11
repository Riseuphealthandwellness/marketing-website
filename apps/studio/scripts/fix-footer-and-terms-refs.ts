/**
 * Fixes stale terms-of-service and privacy-policy references:
 *
 * 1. navigation.footer-about — updates the Terms of Service link to Terms of Use
 *    (canonical URL) and Privacy Policy to its canonical URL
 * 2. Renames orphaned legalPage "Terms of Service" docs to "Terms of Use"
 *    so they're not confusing in Studio (they have no key/path and aren't
 *    read by the frontend)
 *
 * Run from apps/studio:
 *   npx sanity exec scripts/fix-footer-and-terms-refs.ts --with-user-token
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
  // 1. Fix navigation.footer-about
  const footerAbout = await client.fetch<{
    _id: string
    items: { _key: string; href: string; label: string }[]
  }>(`*[_id == "navigation.footer-about"][0]{ _id, items }`)

  if (!footerAbout) {
    console.log('⚠️  navigation.footer-about not found')
  } else {
    const updatedItems = footerAbout.items.map((item) => {
      if (item.href === '/terms-of-service') {
        return { ...item, href: '/patients-rights-privacy/terms-of-use', label: 'Terms of Use' }
      }
      if (item.href === '/privacy-policy') {
        return { ...item, href: '/patients-rights-privacy/privacy-policy', label: 'Privacy Policy' }
      }
      return item
    })
    await client.patch(footerAbout._id).set({ items: updatedItems }).commit()
    console.log('✅  navigation.footer-about — updated Terms of Service → Terms of Use (canonical URL)')
    console.log('✅  navigation.footer-about — updated Privacy Policy → canonical URL')
  }

  // 2. Rename orphaned legalPage terms docs
  for (const id of ['legal-page-terms', 'legalPage.terms']) {
    const exists = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id })
    if (!exists) { console.log(`  ⏭  ${id} not found`); continue }
    await client.patch(id).set({ title: 'Terms of Use' }).commit()
    console.log(`✅  ${id} — renamed "Terms of Service" → "Terms of Use"`)
  }

  console.log('\nDone.')
}

run().catch(err => { console.error(err); process.exit(1) })
