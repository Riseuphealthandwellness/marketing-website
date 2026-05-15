import {ColorWheelIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const textColor = defineType({
  name: 'textColor',
  title: 'Text color',
  type: 'object',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Rise Red', value: 'riseRed'},
          {title: 'Ember Orange', value: 'emberOrange'},
          {title: 'Sunburst Gold', value: 'sunburstGold'},
          {title: 'Dawn Coral', value: 'dawnCoral'},
          {title: 'Deep Slate', value: 'deepSlate'},
          {title: 'Coal', value: 'coal'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'color',
    },
    prepare({title}) {
      return {
        title: title ?? 'Text color',
      }
    },
  },
})
