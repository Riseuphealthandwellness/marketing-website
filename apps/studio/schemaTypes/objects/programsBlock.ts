import {StackIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const programsBlock = defineType({
  name: 'programsBlock',
  title: 'Programs — card grid',
  type: 'object',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
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
      name: 'ctaLabel',
      title: 'Card button label',
      type: 'string',
      description: 'Text shown on each program card CTA. Defaults to "Learn more" when blank.',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({
      title: title || 'Programs grid',
      subtitle: 'All enabled programs',
    }),
  },
})
