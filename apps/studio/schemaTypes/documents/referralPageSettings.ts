import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const referralPageSettings = defineType({
  name: 'referralPageSettings',
  title: 'Referral page',
  type: 'document',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Page blocks',
      type: 'array',
      of: [{type: 'pageSection'}, {type: 'ctaBlock'}],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
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
    }),
    defineField({
      name: 'missingPdfMessage',
      title: 'Missing PDF message',
      type: 'string',
    }),
    defineField({
      name: 'pdfSectionHeading',
      title: 'PDF section heading',
      type: 'string',
    }),
    defineField({
      name: 'pdfSectionDescription',
      title: 'PDF section description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'formEyebrow',
      title: 'Form eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'formHeading',
      title: 'Form heading',
      type: 'string',
    }),
    defineField({
      name: 'formDescription',
      title: 'Form description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'formDocumentNote',
      title: 'Form document note',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'formConsentLabel',
      title: 'Consent checkbox label',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => ({
      title: title || 'Referrals',
      subtitle: 'Referral page settings',
    }),
  },
})
