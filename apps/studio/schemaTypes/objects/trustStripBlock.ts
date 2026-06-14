import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const trustStripBlock = defineType({
  name: 'trustStripBlock',
  title: 'Trust strip',
  type: 'object',
  icon: LaunchIcon,
  description: 'A slim full-width banner with a short claim and an optional CTA button.',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'Short claim or highlight — one sentence works best.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'ctaLabel', title: 'Button label', type: 'string'}),
    defineField({name: 'ctaHref', title: 'Button link', type: 'string'}),
    defineField({
      name: 'tone',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          {title: 'Slate blue (Trust)', value: 'trust'},
          {title: 'Brand red (Action)', value: 'action'},
          {title: 'Dark coal', value: 'dark'},
          {title: 'Warm amber', value: 'warm'},
        ],
        layout: 'radio',
      },
      initialValue: 'trust',
    }),
  ],
  preview: {
    select: {title: 'text'},
    prepare: ({title}) => ({title: title || 'Trust strip', subtitle: 'Accent band'}),
  },
})
