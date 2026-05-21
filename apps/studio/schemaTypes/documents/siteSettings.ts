import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Organization profile',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'contact', title: 'Contact'},
    {name: 'location', title: 'Location'},
    {name: 'access', title: 'Access links'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Logo subtitle',
      type: 'text',
      rows: 2,
      group: 'identity',
      description: 'Shown below the site name in the header logo. Use Enter to break across two lines.',
    }),
    defineField({
      name: 'url',
      title: 'Site URL',
      type: 'url',
      group: 'identity',
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
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'location',
      title: 'Map location',
      type: 'geopoint',
      group: 'location',
    }),
    defineField({
      name: 'locationZoom',
      title: 'Map zoom',
      type: 'number',
      group: 'location',
      initialValue: 13,
      validation: (rule) => rule.min(0).max(22),
    }),
    defineField({
      name: 'logo',
      title: 'Logo image',
      type: 'image',
      group: 'identity',
      description: 'Brand mark shown in the header and footer. Falls back to the built-in image if not set.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright text',
      type: 'string',
      group: 'footer',
      description:
        'Shown in the footer. Supports [year], [name], [privacy], and [terms]. Defaults to "© [year] [name]. All rights reserved. | [privacy] | [terms]" if left blank.',
    }),
    defineField({
      name: 'headerCta',
      title: 'Header call to action',
      type: 'ctaButton',
      group: 'access',
    }),
    defineField({
      name: 'accessLinks',
      title: 'Access links',
      type: 'object',
      group: 'access',
      fields: [
        defineField({
          name: 'portal',
          title: 'Patient portal URL',
          type: 'url',
        }),
        defineField({
          name: 'scheduling',
          title: 'Scheduling URL',
          type: 'url',
        }),
        defineField({
          name: 'intake',
          title: 'Intake URL',
          type: 'string',
          description: 'Use a site path such as /patient-resources or a full external URL.',
        }),
        defineField({
          name: 'referral',
          title: 'Referral URL',
          type: 'string',
          description: 'Use a site path such as /referrals or a full external URL.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'url',
    },
  },
})
