import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const condition = defineType({
  name: 'condition',
  title: 'Condition',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Service area',
      type: 'string',
      options: {
        list: [
          {title: 'Primary care', value: 'primary-care'},
          {title: 'Addiction medicine', value: 'addiction-medicine'},
          {title: 'Weight loss management', value: 'weight-loss-mgmt'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      description: 'Shown in the condition list on the service page.',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Full content for the condition detail page. Leave blank to omit the detail page.',
      type: 'array',
      of: [
        {
          type: 'block',
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
                  {name: 'href', title: 'URL or path', type: 'string'},
                ],
              },
              {type: 'drugReference'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'learnMoreUrl',
      title: 'External learn more URL',
      type: 'url',
      description: 'Optional link to an external resource (e.g. the official treatment or medication website).',
    }),
    defineField({
      name: 'learnMoreLabel',
      title: 'External link label',
      type: 'string',
      description: 'Text shown for the external link. Defaults to "Learn more" if left blank.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
    },
    prepare: ({title, category}) => ({
      title,
      subtitle: category ?? 'No service area set',
    }),
  },
})
