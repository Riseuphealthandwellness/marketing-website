import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  const services = await client.fetch<{ _id: string; title: string; slug: string; medications: { name: string; slug: string }[] }[]>(
    `*[_type == "service"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      "medications": medications[]->{ name, "slug": slug.current }
    }`
  )

  console.log('\nAll service slugs:')
  for (const s of services) {
    console.log(`  ${s.slug}  →  ${s.title}`)
  }

  const addiction = services.find(s => s.slug?.includes('addiction'))
  if (addiction) {
    console.log(`\nMedications on "${addiction.title}" (${addiction.slug}):`)
    for (const m of addiction.medications ?? []) {
      console.log(`  ${m.slug}  →  ${m.name}`)
    }
  } else {
    console.log('\nNo service with "addiction" in slug found.')
  }

  const suboxone = await client.fetch<{ name: string; slug: string } | null>(
    `*[_type == "drug" && (slug.current match "*suboxone*" || name match "*Suboxone*" || name match "*suboxone*")][0]{ name, "slug": slug.current }`
  )
  console.log('\nSuboxone drug entry:', suboxone ?? 'not found')
}

run().catch(err => { console.error(err); process.exit(1) })
