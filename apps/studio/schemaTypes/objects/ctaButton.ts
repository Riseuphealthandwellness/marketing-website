import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'CTA button',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL or path',
      type: 'string',
      description: 'Use site paths such as /contact or full URLs for external links.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
        ],
      },
      initialValue: 'primary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional icon shown next to the button label where supported.',
      options: {
        layout: 'dropdown',
        list: [
          {title: 'Automatic', value: 'auto'},
          {title: 'None', value: 'none'},
          {title: 'Phone', value: 'phone'},
          {title: 'Mail', value: 'mail'},
          {title: 'Arrow', value: 'arrow'},
          {title: 'External link', value: 'external'},
        ],
      },
      initialValue: 'auto',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
  },
})
