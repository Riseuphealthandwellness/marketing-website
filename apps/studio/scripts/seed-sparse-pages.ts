/**
 * Seeds content for sparse websitePage documents and fixes stale path values.
 * Run from apps/studio:
 *   npx sanity exec scripts/seed-sparse-pages.ts --with-user-token
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k23sgnrq',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

function k() {
  return Math.random().toString(36).slice(2, 11)
}

function para(text: string) {
  return {
    _type: 'block' as const,
    _key: k(),
    style: 'normal',
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
    markDefs: [],
  }
}

function ctaBlock(opts: {
  eyebrow?: string
  heading: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}) {
  return { _type: 'ctaBlock' as const, _key: k(), ...opts }
}

function pageSection(heading: string, ...paragraphs: string[]) {
  return {
    _type: 'pageSection' as const,
    _key: k(),
    heading,
    body: paragraphs.map(para),
  }
}

async function patch(id: string, label: string, data: Record<string, unknown>) {
  const exists = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id })
  if (!exists) {
    console.log(`  ⚠️  ${label} — document not found, skipping`)
    return
  }
  await client.patch(id).setIfMissing(data).commit()
  console.log(`  ✅  ${label}`)
}

async function set(id: string, label: string, data: Record<string, unknown>) {
  const exists = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id })
  if (!exists) {
    console.log(`  ⚠️  ${label} — document not found, skipping`)
    return
  }
  await client.patch(id).set(data).commit()
  console.log(`  ✅  ${label}`)
}

async function run() {
  console.log('\n── Fixing stale paths ──────────────────────────────')

  await set('website-page-addiction-medicine', 'addiction-medicine path', {
    path: '/care/services/addiction-medicine',
  })
  await set('website-page-primary-care', 'primary-care path', {
    path: '/care/services/primary-care',
  })
  await set('website-page-weight-loss-mgmt', 'weight-loss-mgmt path', {
    path: '/care/services/weight-loss-management',
  })

  console.log('\n── Careers ─────────────────────────────────────────')

  await patch('website-page-careers', 'careers blocks', {
    blocks: [
      pageSection(
        'Why work at Rise Up?',
        'Rise Up Health & Wellness is built around a simple belief: when providers are supported and fulfilled, patients receive better care. We operate as a truly integrated team — primary care, addiction medicine, and wellness support working side by side under one roof.',
        'We value collaboration over hierarchy, whole-person care over fragmented visits, and community connection over convenience. Our providers aren\'t siloed specialists — they\'re partners in a shared mission to serve patients who too often fall through the cracks of the traditional healthcare system.',
      ),
      pageSection(
        'What we value in a teammate',
        'We look for clinicians and support staff who lead with empathy, communicate openly across disciplines, and believe that every patient — regardless of circumstance — deserves respectful, evidence-based care.',
        'Prior experience in addiction medicine or behavioral health is a plus, but curiosity, humility, and commitment to continuous learning matter just as much to us.',
      ),
      ctaBlock({
        eyebrow: 'Open positions',
        heading: 'Interested in joining our team?',
        description: 'We\'re always looking for compassionate, skilled healthcare professionals. Reach out to start a conversation about current and upcoming opportunities.',
        primaryLabel: 'Contact us',
        primaryHref: '/contact',
      }),
    ],
  })

  console.log('\n── Insurance & Payment ─────────────────────────────')

  await patch('website-page-insurance-payment', 'insurance-payment blocks', {
    blocks: [
      pageSection(
        'Insurance we accept',
        'Rise Up Health & Wellness accepts most major commercial insurance plans, as well as Medicaid and Medicare. We work with a wide range of carriers and are continuously expanding our network.',
        'Because coverage varies by plan and service, we recommend calling our office or verifying with your insurer before your first appointment. Our team is glad to help you understand your benefits and any expected out-of-pocket costs.',
      ),
      pageSection(
        'Self-pay and payment options',
        'We offer self-pay rates for patients without insurance or for services not covered by your plan. Transparent, upfront pricing is important to us — we\'ll always let you know what to expect before you\'re seen.',
        'Flexible payment arrangements may be available for patients who qualify. Ask our team about options that work for your situation.',
      ),
      ctaBlock({
        eyebrow: 'Questions about coverage?',
        heading: 'We\'re here to help you figure it out',
        description: 'Insurance and billing can be confusing. Reach out to our team and we\'ll help you understand your options before your visit.',
        primaryLabel: 'Contact our team',
        primaryHref: '/contact',
        secondaryLabel: 'New patients',
        secondaryHref: '/new-patients',
      }),
    ],
  })

  console.log('\n── Contact form content ────────────────────────────')

  await patch('website-page-contact', 'contact form content', {
    contactForm: {
      eyebrow: 'Send us a message',
      heading: 'How can we help?',
      description: 'Fill out the form below and someone from our team will follow up with you shortly. For urgent matters or to speak with someone directly, please call our office.',
      topics: [
        'General question',
        'New patient inquiry',
        'Existing patient',
        'Referral question',
        'Insurance or billing',
        'Employment inquiry',
        'Other',
      ],
    },
  })

  await patch('website-page-contact', 'contact blocks', {
    blocks: [
      pageSection(
        'Get in touch',
        'Our team is here to answer questions, help you get started as a new patient, or connect you with the right resources. We do our best to respond to all messages within one business day.',
      ),
    ],
  })

  console.log('\n── Team page ───────────────────────────────────────')

  await patch('website-page-team', 'team blocks', {
    blocks: [
      pageSection(
        'Care delivered by people who know you',
        'Our providers are more than specialists — they\'re partners in your health. Because we operate as an integrated practice, your primary care provider, addiction medicine clinician, and wellness team all communicate directly and share context about your care.',
        'That means fewer gaps, fewer repeated conversations, and a team that sees you as a whole person — not a set of separate diagnoses.',
      ),
    ],
  })

  console.log('\n── Locations page ──────────────────────────────────')

  await patch('website-page-locations', 'locations blocks', {
    blocks: [
      pageSection(
        'Where to find us',
        'Rise Up Health & Wellness serves patients across the region. Select a location below to view address, hours, and contact information. We offer in-person visits and, where available, telehealth appointments for established patients.',
      ),
    ],
  })

  console.log('\n── Programs page ───────────────────────────────────')

  await patch('website-page-programs', 'programs blocks', {
    blocks: [
      pageSection(
        'Structured care, personalized to you',
        'Our programs bring together medical treatment, behavioral support, and wellness resources under a single, coordinated plan. Each is designed around a specific patient need — so you get focused attention from a team that understands your situation from day one.',
      ),
    ],
  })

  console.log('\n── Referrals page ──────────────────────────────────')

  await patch('website-page-referrals', 'referrals blocks', {
    blocks: [
      pageSection(
        'Referring a patient to Rise Up',
        'We accept referrals for primary care, addiction medicine, and integrated wellness services. Our team makes the intake process straightforward for both referring providers and new patients.',
        'You can submit a referral using the form below, download our referral PDF, or call our office directly. We aim to contact referred patients within one business day to schedule an intake.',
      ),
    ],
  })

  console.log('\nDone.\n')
}

run().catch(err => { console.error(err); process.exit(1) })
