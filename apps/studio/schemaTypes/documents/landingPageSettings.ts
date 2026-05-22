import {DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const landingPageSettingPages = [
  {
    id: 'landing-page-settings-care',
    slug: 'care',
    group: 'care',
    title: 'Care overview',
    pageTitle: 'Integrated care, all in one place.',
    eyebrow: 'Care',
    description:
      'We bring primary care, addiction medicine, recovery support, and wellness care together so your team already knows your history — no retelling required.',
  },
  {
    id: 'landing-page-settings-contact',
    slug: 'contact',
    group: 'patientAccess',
    title: 'Contact',
    pageTitle: 'Contact Rise Up',
    eyebrow: 'Contact',
    description:
      'Reach Rise Up for non-urgent questions, referrals, access support, and general information.',
  },
  {
    id: 'landing-page-settings-careers',
    slug: 'careers',
    group: 'organization',
    title: 'Careers',
    pageTitle: 'Work with Rise Up',
    eyebrow: 'Careers',
    description: 'Explore opportunities to join a team focused on integrated, community-rooted care.',
  },
  {
    id: 'landing-page-settings-insurance-payment',
    slug: 'insurance-payment',
    group: 'patientAccess',
    title: 'Insurance and payment',
    pageTitle: 'Insurance and payment information',
    eyebrow: 'Insurance and payment',
    description: 'Find general insurance and payment information before starting care with Rise Up.',
  },
  {
    id: 'landing-page-settings-patient-resources',
    slug: 'patient-resources',
    group: 'patientAccess',
    title: 'Patient resources',
    pageTitle: 'Patient resources',
    eyebrow: 'Patient resources',
    description:
      'Helpful links and guidance for patients navigating care, appointments, and support resources.',
  },
  {
    id: 'landing-page-settings-addiction-medicine',
    slug: 'addiction-medicine',
    group: 'care',
    title: 'Addiction medicine',
    pageTitle: 'Addiction medicine at Rise Up',
    eyebrow: 'Addiction medicine',
    description: 'Evidence-based addiction medicine integrated with primary care and recovery support.',
  },
  {
    id: 'landing-page-settings-primary-care',
    slug: 'primary-care',
    group: 'care',
    title: 'Primary care',
    pageTitle: 'Primary care connected to the whole picture',
    eyebrow: 'Primary care',
    description: 'Primary care at Rise Up is coordinated with recovery support and ongoing wellness needs.',
  },
  {
    id: 'landing-page-settings-services',
    slug: 'services',
    group: 'care',
    title: 'Services',
    pageTitle: 'Care that works together',
    eyebrow: 'Services',
    description: 'Explore integrated primary care, recovery services, and wellness support from Rise Up.',
  },
  {
    id: 'landing-page-settings-programs',
    slug: 'programs',
    group: 'care',
    title: 'Programs',
    pageTitle: 'Programs built around real needs',
    eyebrow: 'Programs',
    description:
      'Learn about Rise Up programs designed to support recovery, wellness, and long-term stability.',
  },
  {
    id: 'landing-page-settings-weight-loss-mgmt',
    slug: 'weight-loss-mgmt',
    group: 'care',
    title: 'Weight loss management',
    pageTitle: 'Weight loss management',
    eyebrow: 'Weight loss',
    description: 'Medical support for weight loss goals, metabolic health, and long-term wellness.',
  },
  {
    id: 'landing-page-settings-new-patients',
    slug: 'new-patients',
    group: 'patientAccess',
    title: 'New patients',
    pageTitle: 'Starting care is simpler than it sounds',
    eyebrow: 'New patients',
    description:
      "Whether you're coming in for primary care, weight loss management, or addiction medicine — we'll walk you through every step.",
  },
  {
    id: 'landing-page-settings-about',
    slug: 'about',
    group: 'organization',
    title: 'About',
    pageTitle: 'Whole-person care, rooted in community',
    eyebrow: 'About us',
    description:
      'RiseUp Health & Wellness brings primary care, addiction medicine, recovery support, and wellness care together under one roof — so patients get coordinated support.',
  },
  {
    id: 'landing-page-settings-team',
    slug: 'team',
    group: 'organization',
    title: 'Team',
    pageTitle: 'Our Team',
    eyebrow: 'People',
    description: 'Clinicians and staff committed to integrated, compassionate care.',
  },
  {
    id: 'landing-page-settings-locations',
    slug: 'locations',
    group: 'organization',
    title: 'Locations',
    pageTitle: 'Our Locations',
    eyebrow: 'Where to find us',
    description: 'We serve patients across West Virginia from convenient community locations.',
  },
] as const

export const landingPageSettings = defineType({
  name: 'landingPageSettings',
  title: 'Landing page',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Page',
      type: 'string',
      options: {
        list: landingPageSettingPages.map((page) => ({
          title: page.title,
          value: page.slug,
        })),
      },
      hidden: true,
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Page blocks',
      type: 'array',
      of: [{type: 'pageSection'}, {type: 'ctaBlock'}, {type: 'careModelBlock'}, {type: 'conditionsBlock'}, {type: 'faqBlock'}, {type: 'servicesBlock'}, {type: 'programsBlock'}],
    }),
    defineField({
      name: 'contactForm',
      title: 'Contact form copy',
      type: 'contactFormContent',
      hidden: ({document}) => document?.slug !== 'contact',
    }),
    defineField({
      name: 'newPatientSteps',
      title: 'New patient steps',
      type: 'array',
      of: [{type: 'newPatientStep'}],
      hidden: ({document}) => document?.slug !== 'new-patients',
    }),
    defineField({
      name: 'newPatientAccessCards',
      title: 'New patient access cards',
      type: 'array',
      of: [{type: 'newPatientAccessCard'}],
      hidden: ({document}) => document?.slug !== 'new-patients',
    }),
    defineField({
      name: 'emptyStateText',
      title: 'Empty state text',
      type: 'string',
      description: 'Shown only on pages that list documents, such as Team or Locations.',
      hidden: ({document}) => !['team', 'locations'].includes(String(document?.slug ?? '')),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
    defineField({
      name: 'landingPages',
      title: 'Legacy landing pages',
      description: 'Legacy field retained for schema compatibility. Use the individual page settings documents instead.',
      type: 'array',
      of: [{type: 'landingPageSetting'}],
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare: ({title, slug}) => {
      const page = landingPageSettingPages.find((item) => item.slug === slug)

      return {
        title: title || page?.title || 'Landing page',
        subtitle: page ? `${page.title} page settings` : 'Landing page settings',
      }
    },
  },
})
