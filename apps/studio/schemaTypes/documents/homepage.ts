import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
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
    prepare: () => ({title: 'Homepage'}),
  },
})
