import {BlockContentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pageSection = defineType({
  name: 'pageSection',
  title: 'Content section',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h3'},
            {title: 'Sub-heading', value: 'h4'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    title: 'URL or path',
                    type: 'string',
                    description: 'Full URL (https://...) for external sites, or a path (/about) for internal pages.',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {title, subtitle: 'Content section'}
    },
  },
})
