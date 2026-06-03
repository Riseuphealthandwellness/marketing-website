import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: HeartIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'references', title: 'Reference pages'},
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
      description: 'Detailed content shown on the service page.',
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
      description: 'Override the default service URL. Leave blank to use the slug.',
      group: 'content',
    }),
    defineField({
      name: 'conditions',
      title: 'Condition reference pages',
      type: 'array',
      description: 'Condition pages shown or associated with this service.',
      group: 'references',
      of: [{type: 'reference', to: [{type: 'condition'}]}],
    }),
    defineField({
      name: 'medications',
      title: 'Treatment / medication reference pages',
      type: 'array',
      description: 'Medication or treatment reference pages associated with this service.',
      group: 'references',
      of: [{type: 'reference', to: [{type: 'drug'}]}],
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
