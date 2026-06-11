/**
 * Audits all managed websitePage documents to show which exist and have content.
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
  const pages = await client.fetch<{
    _id: string
    title: string
    key: string
    path: string
    status: string
    eyebrow: string
    description: string
    hasBody: boolean
    blockCount: number
    hasHeroImage: boolean
    hasSidebar: boolean
    hasAboutContent: boolean
    hasServicesContent: boolean
    hasNewPatientSteps: boolean
    hasNewPatientCards: boolean
  }[]>(`*[_type == "websitePage"] | order(path asc) {
    _id,
    title,
    key,
    path,
    status,
    eyebrow,
    description,
    "hasBody": defined(body) && length(body) > 0,
    "blockCount": length(blocks),
    "hasHeroImage": defined(heroImage),
    "hasSidebar": defined(sidebar) && length(sidebar) > 0,
    "hasAboutContent": defined(aboutContent),
    "hasServicesContent": defined(servicesPageContent),
    "hasNewPatientSteps": defined(newPatientSteps) && length(newPatientSteps) > 0,
    "hasNewPatientCards": defined(newPatientAccessCards) && length(newPatientAccessCards) > 0,
  }`)

  console.log(`\nFound ${pages.length} websitePage documents:\n`)

  for (const p of pages) {
    const content = []
    if (p.hasBody) content.push('body')
    if (p.blockCount) content.push(`${p.blockCount} blocks`)
    if (p.hasHeroImage) content.push('heroImage')
    if (p.hasSidebar) content.push('sidebar')
    if (p.hasAboutContent) content.push('aboutContent')
    if (p.hasServicesContent) content.push('servicesContent')
    if (p.hasNewPatientSteps) content.push('steps')
    if (p.hasNewPatientCards) content.push('accessCards')
    if (p.eyebrow) content.push('eyebrow')
    if (p.description) content.push('description')

    const status = content.length === 0 ? '❌ EMPTY' : content.length <= 2 ? '⚠️  SPARSE' : '✅'
    console.log(`${status}  [${p.status ?? 'no-status'}]  ${p._id}`)
    console.log(`       path: ${p.path ?? '—'}  |  title: ${p.title ?? '—'}`)
    if (content.length) console.log(`       has: ${content.join(', ')}`)
    console.log()
  }
}

run().catch(err => { console.error(err); process.exit(1) })
