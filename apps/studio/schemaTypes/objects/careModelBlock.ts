import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const careModelBlock = defineType({
  name: 'careModelBlock',
  title: 'Care model section',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the heading.',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'careModelItem'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading'},
    prepare: ({heading}) => ({
      title: heading || 'Care model section',
      subtitle: 'Care model block',
    }),
  },
})
