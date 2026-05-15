import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const serviceHighlight = defineType({
  name: 'serviceHighlight',
  title: 'Service highlight',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'href',
      title: 'URL or path',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
