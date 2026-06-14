import {StackIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const programsListBlock = defineType({
  name: 'programsListBlock',
  title: 'Programs — alternating panels',
  type: 'object',
  icon: StackIcon,
  description: 'Renders all enabled programs as alternating full-width panels. Programs are pulled automatically.',
  fields: [
    defineField({
      name: 'sectionEyebrow',
      title: 'Section eyebrow',
      type: 'string',
      description: 'Small label above the heading (e.g. "Programs")',
    }),
    defineField({
      name: 'sectionHeading',
      title: 'Section heading',
      type: 'string',
      description: 'Heading shown in the banner above the panels (e.g. "Structured support")',
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'View all link label',
      type: 'string',
      description: 'Text for the "All programs →" link in the banner. Link goes to /care/programs.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      initialValue: 'Learn more',
      description: 'Text on the button shown on each program panel.',
    }),
  ],
  preview: {
    select: {sectionHeading: 'sectionHeading'},
    prepare: () => ({title: 'Programs list', subtitle: 'All enabled programs — alternating panels'}),
  },
})
