import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepageSettings = defineType({
  name: 'homepageSettings',
  title: 'Homepage settings',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Homepage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'components',
      title: 'Homepage components',
      description: 'Ordered sections rendered on the homepage.',
      type: 'array',
      of: [
        {type: 'homepageHeroComponent'},
        {type: 'homepageAdvantageComponent'},
        {type: 'homepageServicesComponent'},
        {type: 'homepageProcessComponent'},
        {type: 'homepageCareCoordinationComponent'},
        {type: 'homepageFinalCtaComponent'},
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title ?? 'Homepage'}
    },
  },
})
