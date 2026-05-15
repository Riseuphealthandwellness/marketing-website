import {PinIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: PinIcon,
  groups: [
    {name: 'contact', title: 'Contact', default: true},
    {name: 'details', title: 'Details'},
    {name: 'map', title: 'Map'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'contact',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      group: 'contact',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'array',
      description: 'One entry per line, e.g. "Monday–Friday: 8am–5pm".',
      of: [{type: 'string'}],
      group: 'details',
    }),
    defineField({
      name: 'parking',
      title: 'Parking',
      type: 'text',
      rows: 2,
      description: 'Parking and transportation information shown on the locations page.',
      group: 'details',
    }),
    defineField({
      name: 'accessibilityNotes',
      title: 'Accessibility notes',
      type: 'text',
      rows: 2,
      description: 'ADA compliance, accessible entrances, etc.',
      group: 'details',
    }),
    defineField({
      name: 'appointmentNotes',
      title: 'Appointment notes',
      type: 'text',
      rows: 2,
      description: 'What patients should know before their appointment.',
      group: 'details',
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service area',
      type: 'string',
      description: 'Geographic area or counties served from this location.',
      group: 'details',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
      description: 'Used to pin this location on the map.',
      group: 'map',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address',
    },
  },
})
