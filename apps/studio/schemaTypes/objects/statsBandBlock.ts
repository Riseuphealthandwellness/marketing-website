import {StackIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat item',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Value', type: 'string', description: 'e.g. ">120" or "4.9★"', validation: (rule) => rule.required()}),
    defineField({name: 'label', title: 'Label', type: 'string', description: 'e.g. "Medical Centers"', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Supporting text', type: 'string', description: 'One short sentence shown below the label.'}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

export const statsBandBlock = defineType({
  name: 'statsBandBlock',
  title: 'Stats band',
  type: 'object',
  icon: StackIcon,
  description: 'Dark section with large key statistics — e.g. ">120 locations", "<60 min wait time".',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      validation: (rule) => rule.required().min(1).max(4),
      of: [defineArrayMember({type: 'statItem'})],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      description: 'Optional photo shown behind the stats with a dark overlay. Use the Unsplash tab.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: () => ({title: 'Stats band', subtitle: 'Key statistics'}),
  },
})
