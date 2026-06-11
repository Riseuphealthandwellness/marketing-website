import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'k23sgnrq', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_AUTH_TOKEN })
async function run() {
  for (const id of ['website-page-patient-rights-privacy', 'drafts.website-page-patient-rights-privacy']) {
    const exists = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id })
    if (!exists) { console.log(`  ⏭  ${id} — not found`); continue }
    await client.delete(id)
    console.log(`  ✅  Deleted ${id}`)
  }
}
run().catch(err => { console.error(err); process.exit(1) })
