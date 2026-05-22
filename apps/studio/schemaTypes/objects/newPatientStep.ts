import {ClipboardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const newPatientStep = defineType({
  name: 'newPatientStep',
  title: 'New patient step',
  type: 'object',
  icon: ClipboardIcon,
  fields: [
    defineField({
      name: 'iconName',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Phone', value: 'phone'},
          {title: 'Clipboard', value: 'clipboard'},
          {title: 'Calendar check', value: 'calendar-check'},
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
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaType',
      title: 'Button destination',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Office phone', value: 'phone'},
          {title: 'Intake link', value: 'intake'},
          {title: 'Custom URL', value: 'custom'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      description: 'Supports [phone] for office phone buttons.',
      hidden: ({parent}) => parent?.ctaType === 'none',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Custom URL or path',
      type: 'string',
      hidden: ({parent}) => parent?.ctaType !== 'custom',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'ctaType'},
  },
})
