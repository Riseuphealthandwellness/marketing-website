import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const conditionsBlock = defineType({
  name: 'conditionsBlock',
  title: 'Conditions list',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
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
  ],
  preview: {
    select: {title: 'heading', category: 'category'},
    prepare: ({title, category}) => ({
      title: title || 'Conditions list',
      subtitle: category ?? 'No service area set',
    }),
  },
})
