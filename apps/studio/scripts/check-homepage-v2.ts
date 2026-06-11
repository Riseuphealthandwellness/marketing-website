import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function run() {
  const result = await client.fetch(`*[_type == "homepageV2Settings"][0]{
    components[] {
      _type,
      enabled,
      eyebrow,
      heading,
      description,
      pathCards[] {
        title,
        body,
        icon,
        "linkHref": link.href,
        "linkLabel": link.label
      }
    }
  }`)

  const hero = result?.components?.find((c: { _type: string }) => c._type === 'homepageV2HeroComponent')
  console.log('\n── Hero path cards ──────────────────────────────')
  console.log('Eyebrow:', hero?.eyebrow)
  console.log('Heading:', hero?.heading)
  console.log('Description:', hero?.description)
  console.log('\nPath cards:')
  for (const card of hero?.pathCards ?? []) {
    console.log(`\n  Title: ${card.title}`)
    console.log(`  Body:  ${card.body}`)
    console.log(`  Icon:  ${card.icon}`)
    console.log(`  Link:  ${card.linkLabel} → ${card.linkHref}`)
  }
}

run().catch(err => { console.error(err); process.exit(1) })
