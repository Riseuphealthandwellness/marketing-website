import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const teamListBlock = defineType({
  name: 'teamListBlock',
  title: 'Team listing',
  type: 'object',
  icon: UsersIcon,
  description: 'Automatically renders all team members marked to show on the Team page.',
  fields: [
    defineField({
      name: 'sectionEyebrow',
      title: 'Section eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'sectionHeading',
      title: 'Section heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {heading: 'sectionHeading'},
    prepare: ({heading}) => ({
      title: 'Team listing',
      subtitle: heading ?? 'All visible team members',
    }),
  },
})
