import {DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepageCareOptions = defineType({
  name: 'homepageCareOptions',
  title: 'Homepage care options',
  type: 'object',
  icon: DocumentsIcon,
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
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Button URL or path',
      type: 'string',
      hidden: ({parent}) => !parent?.ctaLabel,
    }),
  ],
})
