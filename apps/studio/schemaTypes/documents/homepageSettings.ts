import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepageSettings = defineType({
  name: 'homepageSettings',
  title: 'Homepage settings',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'homepageHero',
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
    prepare: () => ({
      title: 'Homepage settings',
      subtitle: 'Hero, homepage sections, and SEO',
    }),
  },
})
