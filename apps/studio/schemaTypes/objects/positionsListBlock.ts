import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const positionsListBlock = defineType({
  name: 'positionsListBlock',
  title: 'Open positions list',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({name: 'sectionEyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'sectionHeading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({
      name: 'emptyStateText',
      title: 'Empty state text',
      type: 'string',
      description: 'Shown when there are no open positions.',
      initialValue: 'No open positions at this time. Check back soon.',
    }),
  ],
  preview: {
    select: {title: 'sectionHeading'},
    prepare: ({title}) => ({title: title || 'Open positions list'}),
  },
})
