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
      name: 'routePath',
      title: 'Route path',
      type: 'string',
      initialValue: '/',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'draft',
      options: {
        layout: 'radio',
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
        ],
      },
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
    select: {
      title: 'title',
      status: 'status',
    },
    prepare({title, status}) {
      return {
        title: title ?? 'Homepage',
        subtitle: status === 'published' ? 'Published homepage' : 'Draft homepage',
      }
    },
  },
})
