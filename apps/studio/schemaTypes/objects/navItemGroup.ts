import {defineField, defineType} from 'sanity'

export const navItemGroup = defineType({
  name: 'navItemGroup',
  title: 'Nav item group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Group title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'link'}],
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
