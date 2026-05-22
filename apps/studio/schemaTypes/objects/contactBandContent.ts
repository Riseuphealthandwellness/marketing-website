import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contactBandContent = defineType({
  name: 'contactBandContent',
  title: 'Contact band content',
  type: 'object',
  icon: EnvelopeIcon,
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
  ],
})
