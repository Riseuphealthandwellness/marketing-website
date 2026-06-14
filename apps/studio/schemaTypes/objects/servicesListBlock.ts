import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const servicesListBlock = defineType({
  name: 'servicesListBlock',
  title: 'Services — alternating panels',
  type: 'object',
  icon: HeartIcon,
  description: 'Renders all enabled services as alternating full-width panels. Services are pulled automatically.',
  fields: [
    defineField({
      name: 'sectionEyebrow',
      title: 'Section eyebrow',
      type: 'string',
      description: 'Small label above the heading (e.g. "Services")',
    }),
    defineField({
      name: 'sectionHeading',
      title: 'Section heading',
      type: 'string',
      description: 'Heading shown in the banner above the panels (e.g. "What we treat")',
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'View all link label',
      type: 'string',
      description: 'Text for the "All services →" link in the banner. Link goes to /care/services.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      initialValue: 'Learn more',
      description: 'Text on the button shown on each service panel.',
    }),
  ],
  preview: {
    select: {ctaLabel: 'ctaLabel'},
    prepare: () => ({title: 'Services list', subtitle: 'All enabled services — alternating panels'}),
  },
})
