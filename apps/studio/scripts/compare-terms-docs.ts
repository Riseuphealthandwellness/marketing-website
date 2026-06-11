import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  const docs = await client.fetch(`*[_id in ["website-page-terms-of-service", "website-page-terms-of-use"]]{
    _id, _createdAt, _updatedAt,
    key, path, status, pageType,
    title, eyebrow, description,
    breadcrumbs,
    "bodyLength": length(body),
    "blocksLength": length(blocks),
    sidebar,
    seo
  }`)

  for (const doc of docs) {
    console.log(`\n─── ${doc._id} ───────────────────────────`)
    console.log(`  key:         ${doc.key}`)
    console.log(`  path:        ${doc.path}`)
    console.log(`  status:      ${doc.status}`)
    console.log(`  pageType:    ${doc.pageType}`)
    console.log(`  title:       ${doc.title}`)
    console.log(`  eyebrow:     ${doc.eyebrow ?? '—'}`)
    console.log(`  description: ${doc.description ?? '—'}`)
    console.log(`  breadcrumbs: ${JSON.stringify(doc.breadcrumbs)}`)
    console.log(`  body blocks: ${doc.bodyLength ?? 0}`)
    console.log(`  page blocks: ${doc.blocksLength ?? 0}`)
    console.log(`  sidebar:     ${doc.sidebar?.length ?? 0} cards`)
    console.log(`  seo:         ${JSON.stringify(doc.seo)}`)
    console.log(`  created:     ${doc._createdAt}`)
    console.log(`  updated:     ${doc._updatedAt}`)
  }

  // Check if either key is referenced anywhere else in Sanity (nav, footer, etc.)
  console.log('\n─── References in other documents ──────────────────')
  const refs = await client.fetch(`*[references("website-page-terms-of-service") || references("website-page-terms-of-use")]{ _id, _type, title }`)
  if (refs.length === 0) {
    console.log('  No other documents reference either doc.')
  } else {
    for (const r of refs) {
      console.log(`  ${r._type} / ${r._id}: ${r.title ?? '—'}`)
    }
  }
}

run().catch(err => { console.error(err); process.exit(1) })
