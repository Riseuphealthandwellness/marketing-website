import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const servicesBlock = defineType({
  name: 'servicesBlock',
  title: 'Services — compact list',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({
      title: title || 'Services list',
      subtitle: 'All services from Care library',
    }),
  },
})
