import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const careModelBlock = defineType({
  name: 'careModelBlock',
  title: 'Care model section',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the heading.',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'careModelItem',
          fields: [
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
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'iconName',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Alarm clock', value: 'alarm-clock'},
                  {title: 'Clock', value: 'clock'},
                  {title: 'Shield', value: 'shield'},
                  {title: 'Dollar / cost', value: 'dollar'},
                  {title: 'Heart', value: 'heart'},
                  {title: 'Users / team', value: 'users'},
                  {title: 'Phone', value: 'phone'},
                  {title: 'Calendar', value: 'calendar'},
                  {title: 'Map pin', value: 'map-pin'},
                  {title: 'Stethoscope', value: 'stethoscope'},
                  {title: 'Pill', value: 'pill'},
                  {title: 'Brain / cognition', value: 'brain'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare: ({title}) => ({title}),
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading'},
    prepare: ({heading}) => ({
      title: heading || 'Care model section',
      subtitle: 'Care model block',
    }),
  },
})
