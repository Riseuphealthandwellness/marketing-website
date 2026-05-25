import {BlockContentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const sidebarCard = defineType({
  name: 'sidebarCard',
  title: 'Sidebar card',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
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
      rows: 2,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Link label',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Link URL or path',
      type: 'string',
      hidden: ({parent}) => !parent?.ctaLabel,
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'ctaLabel'},
    prepare: ({title, subtitle}) => ({title, subtitle: subtitle ?? 'Sidebar card'}),
  },
})
