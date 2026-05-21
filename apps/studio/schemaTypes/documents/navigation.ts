import {ListIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const navigationSingletons = [
  {
    id: 'navigation-main',
    key: 'main',
    title: 'Main navigation',
    description: 'Header navigation used across the site.',
  },
  {
    id: 'navigation-footer-care',
    key: 'footer-care',
    title: 'Footer: Care',
    description: 'First footer link column.',
  },
  {
    id: 'navigation-footer-patients',
    key: 'footer-patients',
    title: 'Footer: Patients',
    description: 'Second footer link column.',
  },
  {
    id: 'navigation-footer-about',
    key: 'footer-about',
    title: 'Footer: About',
    description: 'Third footer link column.',
  },
] as const

const navigationKeys = navigationSingletons.map((nav) => nav.key)

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Internal frontend key. Use the fixed navigation entries in the Studio desk.',
      readOnly: true,
      options: {
        list: navigationSingletons.map((nav) => ({title: nav.title, value: nav.key})),
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          return navigationKeys.includes(value as (typeof navigationKeys)[number]) || 'Use one of the fixed navigation keys.'
        }),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'navLink'}, {type: 'navMegaMenu'}],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .custom((items, context) => {
            const parent = context.parent as {key?: string} | undefined
            const isFooter = parent?.key?.startsWith('footer-')
            const hasMegaMenu = items?.some((item) => item?._type === 'navMegaMenu')

            return isFooter && hasMegaMenu ? 'Footer navigation can only use Link items.' : true
          }),
    }),
  ],
})
