import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const quoteBlock = defineType({
  name: 'quoteBlock',
  title: 'Quote / Testimonial',
  type: 'object',
  icon: DocumentTextIcon,
  description: 'A large pull quote with optional author photo and attribution.',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'attribution', title: 'Name', type: 'string'}),
    defineField({name: 'role', title: 'Role / Title', type: 'string', description: 'e.g. "Physician" or "Patient"'}),
    defineField({
      name: 'photo',
      title: 'Headshot',
      type: 'image',
      description: 'Optional circular headshot of the person being quoted. Use the Unsplash tab or upload a photo.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'tone',
      title: 'Background',
      type: 'string',
      options: {
        list: [
          {title: 'Warm white', value: 'surface'},
          {title: 'Dark slate', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'surface',
    }),
  ],
  preview: {
    select: {title: 'attribution', subtitle: 'quote', media: 'photo'},
    prepare: ({title, subtitle, media}) => ({
      title: title || 'Quote',
      subtitle: subtitle ? `"${subtitle.slice(0, 55)}…"` : undefined,
      media,
    }),
  },
})
