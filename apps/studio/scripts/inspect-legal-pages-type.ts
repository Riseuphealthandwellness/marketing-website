import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  // All legalPage docs
  const legalDocs = await client.fetch(`*[_type == "legalPage"]{ _id, _type, title, slug, key, path, "bodyLength": length(body) }`)
  console.log('\n─── All legalPage documents ───')
  console.log(JSON.stringify(legalDocs, null, 2))

  // Full footer-about nav
  const footerAbout = await client.fetch(`*[_id == "navigation.footer-about"][0]`)
  console.log('\n─── navigation.footer-about ───')
  console.log(JSON.stringify(footerAbout, null, 2))

  // All navigation docs
  const navDocs = await client.fetch(`*[_type == "navigation"]{ _id, "itemCount": count(items), "itemHrefs": items[].href }`)
  console.log('\n─── All navigation docs ───')
  console.log(JSON.stringify(navDocs, null, 2))
}

run().catch(err => { console.error(err); process.exit(1) })
