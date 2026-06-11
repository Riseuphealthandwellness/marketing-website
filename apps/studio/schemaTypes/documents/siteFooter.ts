import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const SITE_FOOTER_ID = 'siteFooter'

export const siteFooter = defineType({
  name: 'siteFooter',
  title: 'Footer',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'columns',
      title: 'Link columns',
      type: 'array',
      of: [{type: 'footerColumn'}],
      description: 'Navigation columns shown across the footer.',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal links',
      type: 'array',
      of: [{type: 'navLink'}],
      description: 'Links in the bottom bar (Privacy Policy, Terms, etc.).',
    }),
    defineField({
      name: 'footerNotice',
      title: 'Footer notice',
      type: 'text',
      rows: 2,
      description: 'Short notice displayed above the disclaimers (e.g. regulatory or access note).',
    }),
    defineField({
      name: 'footerDisclaimers',
      title: 'Disclaimers',
      type: 'array',
      of: [{type: 'footerDisclaimer'}],
      description: 'Regulatory or legal disclaimer paragraphs in the bottom bar.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright text',
      type: 'string',
      description: 'Supports tokens: [year], [name], [privacy], [terms].',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Footer'}),
  },
})
