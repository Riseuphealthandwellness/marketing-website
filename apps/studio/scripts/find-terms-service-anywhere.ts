import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

function findTermsOfService(obj: unknown, path = ''): string[] {
  const hits: string[] = []
  if (typeof obj === 'string') {
    if (obj.toLowerCase().includes('terms-of-service') || obj.toLowerCase().includes('terms of service')) {
      hits.push(`${path} = "${obj}"`)
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => hits.push(...findTermsOfService(item, `${path}[${i}]`)))
  } else if (obj && typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
      hits.push(...findTermsOfService(val, path ? `${path}.${key}` : key))
    }
  }
  return hits
}

async function run() {
  const docs = await client.fetch(`*[!(_id in path("_.**"))]{ _id, _type, ... }`)
  let found = false
  for (const doc of docs) {
    const hits = findTermsOfService(doc)
    if (hits.length) {
      found = true
      console.log(`\n─── ${doc._id} (${doc._type}) ───`)
      hits.forEach(h => console.log(`  ${h}`))
    }
  }
  if (!found) console.log('No "terms-of-service" / "terms of service" found in any document.')
}

run().catch(err => { console.error(err); process.exit(1) })
