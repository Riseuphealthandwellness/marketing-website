import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contactFormBlock = defineType({
  name: 'contactFormBlock',
  title: 'Contact Form',
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
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'topics',
      title: 'Topic options',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}: {title?: string}) {
      return {title: title || 'Contact Form', subtitle: 'Contact form block'}
    },
  },
})
