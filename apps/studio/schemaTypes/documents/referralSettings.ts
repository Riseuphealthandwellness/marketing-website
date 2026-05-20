import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const referralSettings = defineType({
  name: 'referralSettings',
  title: 'Referral settings',
  type: 'document',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'referralPdf',
      title: 'Referral PDF',
      type: 'file',
      description: 'Upload the printable referral form shown as a download button on the referrals page.',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'downloadLabel',
      title: 'Download button label',
      type: 'string',
      initialValue: 'Download referral PDF',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Referral settings',
      subtitle: 'Referral page PDF and routing',
    }),
  },
})
