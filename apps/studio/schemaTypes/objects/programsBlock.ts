import {StackIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const programsBlock = defineType({
  name: 'programsBlock',
  title: 'Programs grid',
  type: 'object',
  icon: StackIcon,
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
      title: title || 'Programs grid',
      subtitle: 'All programs from Care library',
    }),
  },
})
