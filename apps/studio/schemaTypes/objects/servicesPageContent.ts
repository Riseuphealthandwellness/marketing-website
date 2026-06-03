import {ControlsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const sectionFields = [
  defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
  defineField({name: 'heading', title: 'Heading', type: 'string'}),
  defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
]

export const servicesPageContent = defineType({
  name: 'servicesPageContent',
  title: 'Services page content',
  type: 'object',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro section',
      type: 'servicesPageIntro',
    }),
    defineField({
      name: 'feature',
      title: 'Feature panel',
      type: 'object',
      fields: [
        ...sectionFields,
        defineField({name: 'ctaLabel', title: 'Button label', type: 'string'}),
        defineField({name: 'ctaHref', title: 'Button URL or path', type: 'string'}),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'value', title: 'Value', type: 'string'}),
                defineField({name: 'label', title: 'Label', type: 'string'}),
                defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
              ],
              preview: {
                select: {title: 'value', subtitle: 'label'},
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services section',
      type: 'object',
      fields: [
        ...sectionFields,
        defineField({name: 'ctaLabel', title: 'Card CTA label', type: 'string'}),
      ],
    }),
    defineField({
      name: 'references',
      title: 'Reference pages section',
      type: 'object',
      fields: [
        ...sectionFields,
        defineField({name: 'conditionsHeading', title: 'Conditions heading', type: 'string'}),
        defineField({name: 'treatmentsHeading', title: 'Treatments heading', type: 'string'}),
        defineField({name: 'ctaLabel', title: 'Link CTA label', type: 'string'}),
      ],
    }),
    defineField({
      name: 'programs',
      title: 'Programs section',
      type: 'object',
      fields: [
        ...sectionFields,
        defineField({name: 'ctaLabel', title: 'Card CTA label', type: 'string'}),
      ],
    }),
  ],
})
