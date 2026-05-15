import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const provider = defineType({
  name: 'provider',
  title: 'Provider',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'firstName',
      title: 'First name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last name',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Display name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
