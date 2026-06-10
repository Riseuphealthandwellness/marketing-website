import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contactBandContent = defineType({
  name: 'contactBandContent',
  title: 'Contact band content',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phoneLabel',
      title: 'Phone card label',
      type: 'string',
      initialValue: 'Call',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email card label',
      type: 'string',
      initialValue: 'Email',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationLabel',
      title: 'Location card label',
      type: 'string',
      initialValue: 'Location',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mapPreviewLabel',
      title: 'Map preview label',
      type: 'string',
      initialValue: 'Map preview of our location',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'expandMapLabel',
      title: 'Expand map button label',
      type: 'string',
      initialValue: 'Expand map',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'closeMapLabel',
      title: 'Close map button label',
      type: 'string',
      initialValue: 'Close map',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mapImageAlt',
      title: 'Expanded map image alt text',
      type: 'string',
      initialValue: 'Map of our location',
      validation: (rule) => rule.required(),
    }),
  ],
})
