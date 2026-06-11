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
      validation: (rule) => rule.required().min(1),
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
