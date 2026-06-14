import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const position = defineType({
  name: 'position',
  title: 'Open position',
  type: 'document',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          'Primary care',
          'Treatment services',
          'Care coordination',
          'Administration',
          'Operations',
          'Community outreach',
        ],
      },
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'full-time'},
          {title: 'Part-time', value: 'part-time'},
          {title: 'Contract', value: 'contract'},
          {title: 'PRN / Per diem', value: 'prn'},
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Portland, OR · Hybrid" or "Remote"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'applyUrl',
      title: 'Application URL',
      type: 'url',
      description: 'Link to the job application or external posting.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first.',
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Sort order, title',
      name: 'sortOrderAsc',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: 'department', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'department',
    },
  },
})
