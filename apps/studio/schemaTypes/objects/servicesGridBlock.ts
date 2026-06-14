import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const servicesGridBlock = defineType({
  name: 'servicesGridBlock',
  title: 'Services — card grid',
  type: 'object',
  icon: HeartIcon,
  description: 'Renders all enabled services as a 2-column card grid with icon badges. Good for overview pages.',
  fields: [
    defineField({
      name: 'sectionEyebrow',
      title: 'Section eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'sectionHeading',
      title: 'Section heading',
      type: 'string',
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Card link label',
      type: 'string',
      initialValue: 'Learn more',
    }),
    defineField({
      name: 'showViewAllCard',
      title: 'Show "All services" card',
      type: 'boolean',
      initialValue: true,
      description: 'Appends a final card linking to the full services page.',
    }),
    defineField({
      name: 'viewAllLabel',
      title: '"All services" card title',
      type: 'string',
      initialValue: 'All services',
      hidden: ({parent}) => !parent?.showViewAllCard,
    }),
    defineField({
      name: 'viewAllDescription',
      title: '"All services" card description',
      type: 'string',
      hidden: ({parent}) => !parent?.showViewAllCard,
    }),
  ],
  preview: {
    select: {sectionHeading: 'sectionHeading'},
    prepare: () => ({title: 'Services — card grid', subtitle: 'All enabled services'}),
  },
})
