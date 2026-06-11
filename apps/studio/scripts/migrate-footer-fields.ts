/**
 * Migrates footer content fields from siteSettings to the new siteFooter singleton.
 * Copies copyrightText, footerNotice, and footerDisclaimers, then unsets them from siteSettings.
 * Safe to run multiple times — only sets fields that exist in siteSettings.
 *
 * Run from the apps/studio directory:
 *   npx sanity exec scripts/migrate-footer-fields.ts --with-user-token
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

type FooterDisclaimer = {text: string; _key?: string; _type?: string}

type SourceFields = {
  copyrightText?: string
  footerNotice?: string
  footerDisclaimers?: FooterDisclaimer[]
}

async function run() {
  const source = await client.fetch<SourceFields>(
    `*[_type == "siteSettings"][0]{ copyrightText, footerNotice, footerDisclaimers[]{ _key, _type, text } }`,
  )

  if (!source) {
    console.log('No siteSettings document found. Nothing to migrate.')
    return
  }

  const fieldsToMigrate: Record<string, unknown> = {}
  const fieldsToUnset: string[] = []

  if (source.copyrightText) {
    fieldsToMigrate.copyrightText = source.copyrightText
    fieldsToUnset.push('copyrightText')
    console.log(`  copyrightText → "${source.copyrightText}"`)
  }

  if (source.footerNotice) {
    fieldsToMigrate.footerNotice = source.footerNotice
    fieldsToUnset.push('footerNotice')
    console.log(`  footerNotice → "${source.footerNotice.slice(0, 60)}…"`)
  }

  if (source.footerDisclaimers?.length) {
    fieldsToMigrate.footerDisclaimers = source.footerDisclaimers
    fieldsToUnset.push('footerDisclaimers')
    console.log(`  footerDisclaimers → ${source.footerDisclaimers.length} item(s)`)
  }

  if (Object.keys(fieldsToMigrate).length === 0) {
    console.log('No footer fields found in siteSettings. Nothing to migrate.')
    return
  }

  console.log('\nWriting to siteFooter…')
  await client
    .transaction()
    .createIfNotExists({_id: 'siteFooter', _type: 'siteFooter'})
    .patch('siteFooter', (p) => p.setIfMissing(fieldsToMigrate))
    .commit()
  console.log('  ✓  siteFooter updated')

  console.log('\nRemoving migrated fields from siteSettings…')
  await client.patch('siteSettings').unset(fieldsToUnset).commit()
  console.log(`  ✓  Unset: ${fieldsToUnset.join(', ')}`)

  console.log('\nDone.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
