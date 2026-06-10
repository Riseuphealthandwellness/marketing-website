import {StackIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {careCardColorField, careIconField} from '../objects/careIconOptions'

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  icon: StackIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'display', title: 'Display'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    careIconField({group: 'display'}),
    careCardColorField({group: 'display'}),
    defineField({
      name: 'cardEyebrow',
      title: 'Card eyebrow',
      type: 'string',
      description: 'Short label shown above the title in cards and homepage offering modules.',
      group: 'display',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first in program lists.',
      group: 'display',
    }),
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
      description: 'Who this program is designed for, e.g. "Adults 18+".',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'Used in card previews and search results.',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Full description',
      type: 'array',
      description: 'Detailed content shown on the program page or expanded view.',
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
            annotations: [],
          },
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'href',
      title: 'URL or path',
      type: 'string',
      description: 'Override the default program URL. Leave blank to use the slug.',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
