import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepageSettings = defineType({
  name: 'homepageSettings',
  title: 'Homepage settings',
  type: 'document',
  icon: HomeIcon,
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
  preview: {
    prepare: () => ({
      title: 'Homepage settings',
      subtitle: 'Hero, homepage sections, and SEO',
    }),
  },
})
