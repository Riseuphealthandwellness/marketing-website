import {InfoOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepageFeaturePanel = defineType({
  name: 'homepageFeaturePanel',
  title: 'Homepage feature panel',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'homepageFeaturePanelItem'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Button URL or path',
      type: 'string',
      hidden: ({parent}) => !parent?.ctaLabel,
    }),
  ],
})

export const homepageFeaturePanelItem = defineType({
  name: 'homepageFeaturePanelItem',
  title: 'Homepage feature panel item',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'iconName',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Phone', value: 'phone'},
          {title: 'Heart pulse', value: 'heart-pulse'},
          {title: 'Map pin', value: 'map-pin'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'text', subtitle: 'iconName'},
  },
})
