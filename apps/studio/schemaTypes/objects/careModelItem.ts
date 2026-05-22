import {defineField, defineType} from 'sanity'

export const careModelItem = defineType({
  name: 'careModelItem',
  title: 'Care model item',
  type: 'object',
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
})
