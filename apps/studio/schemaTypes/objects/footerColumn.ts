import {defineField, defineType} from 'sanity'

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer column',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'navLink'}],
      description: 'Leave empty on a "Services" or "Programs" column to auto-populate from the care library.',
    }),
  ],
  preview: {
    select: {heading: 'heading', links: 'links'},
    prepare: ({heading, links}: {heading?: string; links?: unknown[]}) => ({
      title: heading ?? 'Untitled column',
      subtitle: `${links?.length ?? 0} link${links?.length !== 1 ? 's' : ''}`,
    }),
  },
})
