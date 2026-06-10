import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepageV2Settings = defineType({
  name: 'homepageV2Settings',
  title: 'Homepage V2 settings',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Home Page 2',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'routePath',
      title: 'Route path',
      type: 'string',
      initialValue: '/home-page-2',
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
      description: 'Ordered sections rendered by the Home Page 2 template.',
      type: 'array',
      of: [
        {type: 'homepageV2HeroComponent'},
        {type: 'homepageV2AdvantageComponent'},
        {type: 'homepageV2ServicesComponent'},
        {type: 'homepageV2ProcessComponent'},
        {type: 'homepageV2CareCoordinationComponent'},
        {type: 'homepageV2FinalCtaComponent'},
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
        title: title ?? 'Home Page 2',
        subtitle: status === 'published' ? 'Published concept homepage' : 'Draft concept homepage',
      }
    },
  },
})
