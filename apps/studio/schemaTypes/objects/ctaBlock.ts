import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'CTA block',
  type: 'object',
  icon: LaunchIcon,
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryLabel',
      title: 'Primary button label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryHref',
      title: 'Primary button URL or path',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryLabel',
      title: 'Secondary button label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryHref',
      title: 'Secondary button URL or path',
      type: 'string',
      hidden: ({parent}) => !parent?.secondaryLabel,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'primaryLabel',
    },
  },
})
