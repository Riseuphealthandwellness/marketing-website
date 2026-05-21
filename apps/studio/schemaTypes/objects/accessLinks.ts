import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const accessLinks = defineType({
  name: 'accessLinks',
  title: 'Access links',
  type: 'object',
  icon: LinkIcon,
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
})
