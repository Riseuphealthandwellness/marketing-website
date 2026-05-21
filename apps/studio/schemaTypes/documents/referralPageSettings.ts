import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const referralPageSettings = defineType({
  name: 'referralPageSettings',
  title: 'Referral page settings',
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
      title: 'Referral page settings',
      subtitle: 'Referral PDF and download button',
    }),
  },
})
