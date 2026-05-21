import {DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pageSettings = defineType({
  name: 'pageSettings',
  title: 'Page settings',
  type: 'document',
  icon: DocumentsIcon,
  groups: [
    {name: 'homepage', title: 'Homepage', default: true},
    {name: 'landingPages', title: 'Landing pages'},
    {name: 'referrals', title: 'Referrals'},
  ],
  fields: [
    defineField({
      name: 'homepage',
      title: 'Homepage',
      type: 'object',
      group: 'homepage',
      fields: [
        defineField({
          name: 'hero',
          title: 'Hero',
          type: 'object',
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Heading',
              description: 'Use the text color annotation to apply approved brand palette colors.',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [],
                  lists: [],
                  marks: {
                    decorators: [],
                    annotations: [{type: 'textColor'}],
                  },
                },
              ],
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'buttons',
              title: 'Buttons',
              type: 'array',
              of: [{type: 'ctaButton'}],
              validation: (rule) => rule.max(2),
            }),
            defineField({
              name: 'backgroundImage',
              title: 'Background image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'featureImage',
              title: 'Right-side feature image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'careModelHighlights',
          title: 'Care model highlights',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'serviceHighlights',
          title: 'Care option cards',
          type: 'array',
          of: [{type: 'serviceHighlight'}],
        }),
        defineField({
          name: 'referralCta',
          title: 'Referral CTA',
          type: 'ctaBlock',
        }),
        defineField({
          name: 'seo',
          title: 'SEO',
          type: 'seoFields',
        }),
      ],
    }),
    defineField({
      name: 'landingPages',
      title: 'Landing pages',
      description: 'Page-specific hero, body, and SEO settings for top-level marketing pages.',
      type: 'array',
      group: 'landingPages',
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
    defineField({
      name: 'referrals',
      title: 'Referrals page',
      type: 'object',
      group: 'referrals',
      fields: [
        defineField({
          name: 'referralPdf',
          title: 'Referral PDF',
          type: 'file',
          description: 'Upload the printable referral form shown as a download button on the referrals page.',
          options: {
            accept: 'application/pdf',
          },
        }),
        defineField({
          name: 'downloadLabel',
          title: 'Download button label',
          type: 'string',
          initialValue: 'Download referral PDF',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Page settings',
      subtitle: 'Homepage and page-specific settings',
    }),
  },
})
