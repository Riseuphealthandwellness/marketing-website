// apps/studio/src/schemaTypes/objects/servicesPageIntro.ts
import {defineField, defineType} from 'sanity'

export const servicesPageIntro = defineType({
  name: 'servicesPageIntro',
  title: 'Services page intro',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
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
  ],
})