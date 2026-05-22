import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepageSettings = defineType({
  name: 'homepageSettings',
  title: 'Homepage settings',
  type: 'document',
  icon: HomeIcon,
  initialValue: {
    title: 'Homepage settings',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'homepageHero',
    }),
    defineField({
      name: 'heroFeaturePanel',
      title: 'Hero feature panel',
      type: 'homepageFeaturePanel',
    }),
    defineField({
      name: 'careModelHighlights',
      title: 'Care model highlights',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'serviceHighlights',
      title: 'Care option cards',
      type: 'array',
      of: [{type: 'serviceHighlight'}],
    }),
    defineField({
      name: 'careOptions',
      title: 'Care options intro',
      type: 'homepageCareOptions',
    }),
    defineField({
      name: 'referralCta',
      title: 'Referral CTA',
      type: 'ctaBlock',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => ({
      title: title || 'Homepage settings',
      subtitle: 'Hero, homepage sections, and SEO',
    }),
  },
})
