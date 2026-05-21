import {DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const landingPageSettings = defineType({
  name: 'landingPageSettings',
  title: 'Landing page settings',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'landingPages',
      title: 'Landing pages',
      description: 'Page-specific hero, body, and SEO settings for top-level marketing pages.',
      type: 'array',
      of: [
        {
          type: 'object',
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
        },
      ],
      validation: (rule) =>
        rule.unique().custom((items) => {
          if (!items) return true
          const slugs = items.map((item) => item?.slug).filter(Boolean)
          return new Set(slugs).size === slugs.length || 'Each landing page can only be configured once'
        }),
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Landing page settings',
      subtitle: 'Hero, body, and SEO for static landing pages',
    }),
  },
})
