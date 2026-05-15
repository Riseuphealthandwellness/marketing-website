import {ListIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Internal identifier used by the frontend. Examples: main, footer-care, footer-about',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'navLink'}, {type: 'navMegaMenu'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
