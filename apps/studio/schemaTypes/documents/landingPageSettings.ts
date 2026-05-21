import {DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const landingPageSettings = defineType({
  name: 'landingPageSettings',
  title: 'Landing page settings',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'landingPages',
      title: 'Landing pages',
      description: 'Page-specific hero, body, and SEO settings for top-level marketing pages.',
      type: 'array',
      of: [{type: 'landingPageSetting'}],
      validation: (rule) =>
        rule.unique().custom((items) => {
          if (!items) return true
          const slugs = items.map((item) => item?.slug).filter(Boolean)
          return new Set(slugs).size === slugs.length || 'Each landing page can only be configured once'
        }),
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Landing page settings',
      subtitle: 'Hero, body, and SEO for static landing pages',
    }),
  },
})
