import {defineField, defineType} from 'sanity'

export const footerDisclaimer = defineType({
  name: 'footerDisclaimer',
  title: 'Footer disclaimer',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Disclaimer text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {text: 'text'},
    prepare: ({text}) => ({title: text?.slice(0, 80) + (text?.length > 80 ? '…' : '')}),
  },
})
