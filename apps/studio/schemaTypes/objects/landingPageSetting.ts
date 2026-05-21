import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const landingPageSetting = defineType({
  name: 'landingPageSetting',
  title: 'Landing page setting',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'Contact', value: 'contact'},
          {title: 'Careers', value: 'careers'},
          {title: 'Insurance & payment', value: 'insurance-payment'},
          {title: 'Patient resources', value: 'patient-resources'},
          {title: 'Primary care', value: 'primary-care'},
          {title: 'Programs', value: 'programs'},
          {title: 'Referrals', value: 'referrals'},
          {title: 'Services', value: 'services'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
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
      of: [{type: 'pageSection'}, {type: 'ctaBlock'}],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug',
    },
  },
})
