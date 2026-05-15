import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Logo subtitle',
      type: 'text',
      rows: 2,
      description: 'Shown below the site name in the header logo. Use Enter to break across two lines.',
    }),
    defineField({
      name: 'url',
      title: 'Site URL',
      type: 'url',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'location',
      title: 'Map location',
      type: 'geopoint',
    }),
    defineField({
      name: 'locationZoom',
      title: 'Map zoom',
      type: 'number',
      initialValue: 13,
      validation: (rule) => rule.min(0).max(22),
    }),
    defineField({
      name: 'logo',
      title: 'Logo image',
      type: 'image',
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
      name: 'headerCta',
      title: 'Header call to action',
      type: 'ctaButton',
    }),
    defineField({
      name: 'accessLinks',
      title: 'Access links',
      type: 'object',
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
