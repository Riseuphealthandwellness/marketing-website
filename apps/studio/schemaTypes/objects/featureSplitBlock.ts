import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const featureSplitBlock = defineType({
  name: 'featureSplitBlock',
  title: 'Feature split',
  type: 'object',
  icon: BlockElementIcon,
  description: 'Two-column section — image fills one side, heading + text + CTA fills the other.',
  fields: [
    defineField({
      name: 'image',
      title: 'Feature image',
      type: 'image',
      description: 'Large photo that fills the image column. Use the Unsplash tab to find a photo.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'ctaLabel', title: 'Button label', type: 'string'}),
    defineField({name: 'ctaHref', title: 'Button link', type: 'string'}),
    defineField({
      name: 'tone',
      title: 'Content background',
      type: 'string',
      options: {
        list: [
          {title: 'Warm white', value: 'surface'},
          {title: 'White', value: 'white'},
          {title: 'Slate (dark)', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'surface',
    }),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare: ({title, media}) => ({
      title: title || 'Feature split',
      subtitle: 'Image + content',
      media,
    }),
  },
})
