import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const drug = defineType({
  name: 'drug',
  title: 'Drug / Medication',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Primary name',
      description: 'Brand or most common name (e.g. "Spravato"). Used as the display name.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'genericName',
      title: 'Generic / scientific name',
      description: 'e.g. "esketamine"',
      type: 'string',
    }),
    defineField({
      name: 'aliases',
      title: 'Aliases',
      description: 'Additional names or spellings to match during auto-linking.',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      description: 'One or two sentences shown in tooltips, link previews, and the page subtitle.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Body content',
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
                fields: [{name: 'href', title: 'URL or path', type: 'string'}],
              },
              {type: 'drugReference'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'learnMoreUrl',
      title: 'External learn-more URL',
      type: 'url',
    }),
    defineField({
      name: 'learnMoreLabel',
      title: 'External link label',
      description: 'Text shown on the learn-more button. Defaults to "Learn more".',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'genericName', media: 'image'},
    prepare: ({title, subtitle, media}) => ({
      title,
      subtitle: subtitle ?? 'No generic name set',
      media,
    }),
  },
})
