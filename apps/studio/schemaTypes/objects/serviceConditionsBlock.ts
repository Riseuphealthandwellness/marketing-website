import {SearchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const serviceConditionsBlock = defineType({
  name: 'serviceConditionsBlock',
  title: 'Conditions & treatments reference',
  type: 'object',
  icon: SearchIcon,
  description: 'Renders conditions and medications linked to all enabled services as two alphabetical lists.',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Section description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'conditionsHeading',
      title: 'Conditions column heading',
      type: 'string',
      initialValue: 'Conditions we treat',
    }),
    defineField({
      name: 'treatmentsHeading',
      title: 'Medications & treatments column heading',
      type: 'string',
      initialValue: 'Medications & treatments',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Conditions & treatments reference',
      subtitle: 'Auto-built from enabled services',
    }),
  },
})
