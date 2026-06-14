import {BlockContentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const blocksListItem = defineType({
  name: 'blocksListItem',
  title: 'Card',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Card image (optional)',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleSuffix',
      title: 'Title suffix',
      type: 'string',
      description: 'Small text shown after the title, similar to credentials on team cards.',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Optional badge shown above the title, similar to department on team cards.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Uppercase line shown below the title, similar to role on team cards.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'string'}),
    defineField({
      name: 'ctaHref',
      title: 'CTA link',
      type: 'string',
      hidden: ({parent}) => !parent?.ctaLabel,
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
})

export const blocksListBlock = defineType({
  name: 'blocksListBlock',
  title: 'Blocks list',
  type: 'object',
  icon: BlockContentIcon,
  description: 'A heading, description, and a grid of manually managed content cards.',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Cards',
      type: 'array',
      of: [defineArrayMember({type: 'blocksListItem'})],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {heading: 'sectionHeading'},
    prepare: ({heading}) => ({
      title: 'Blocks list',
      subtitle: heading ?? 'Manual card grid',
    }),
  },
})
