import {ListIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const navigationSingletons = [
  {
    id: 'navigation-main',
    key: 'main',
    title: 'Main navigation',
    description: 'Header navigation used across the site.',
  },
] as const

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
      description: 'Internal frontend key. Use the fixed navigation entries in the Studio desk.',
      readOnly: true,
      options: {
        list: [{title: 'Main navigation', value: 'main'}],
      },
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
