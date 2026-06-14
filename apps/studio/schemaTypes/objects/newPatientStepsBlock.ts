import {ClipboardIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const newPatientStepsBlockStep = defineType({
  name: 'newPatientStepsBlockStep',
  title: 'Step',
  type: 'object',
  icon: ClipboardIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Card image (optional)',
      type: 'image',
      description: 'Shown in the upper portion of the card.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'iconName',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Phone', value: 'phone'},
          {title: 'Clipboard', value: 'clipboard'},
          {title: 'Calendar check', value: 'calendar-check'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'string'}),
    defineField({
      name: 'ctaHref',
      title: 'CTA link',
      type: 'string',
      description: 'Use tel:3048388606 for phone links.',
      hidden: ({parent}) => !parent?.ctaLabel,
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})

export const newPatientStepsBlock = defineType({
  name: 'newPatientStepsBlock',
  title: 'New patient steps',
  type: 'object',
  icon: ClipboardIcon,
  description: 'Step-by-step cards walking new patients through getting started.',
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
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [defineArrayMember({type: 'newPatientStepsBlockStep'})],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {heading: 'sectionHeading'},
    prepare: ({heading}) => ({
      title: 'New patient steps',
      subtitle: heading ?? 'No heading set',
    }),
  },
})
