import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  const footer = await client.fetch(`*[_type == "siteFooter"][0]`)
  console.log('\n─── Footer ───')
  console.log(JSON.stringify(footer, null, 2))

  const nav = await client.fetch(`*[_type == "siteNavigation"]`)
  console.log('\n─── Navigation ───')
  console.log(JSON.stringify(nav, null, 2))

  const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
  console.log('\n─── Site Settings ───')
  console.log(JSON.stringify(settings, null, 2))
}

run().catch(err => { console.error(err); process.exit(1) })
