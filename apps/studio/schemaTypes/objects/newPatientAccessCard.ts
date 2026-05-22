import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const newPatientAccessCard = defineType({
  name: 'newPatientAccessCard',
  title: 'New patient access card',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Button destination',
      type: 'string',
      options: {
        list: [
          {title: 'Scheduling link', value: 'scheduling'},
          {title: 'Patient portal', value: 'portal'},
          {title: 'Referral page', value: 'referral'},
          {title: 'Custom URL', value: 'custom'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
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
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Custom URL or path',
      type: 'string',
      hidden: ({parent}) => parent?.linkType !== 'custom',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'linkType'},
  },
})
