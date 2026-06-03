import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const navMegaMenu = defineType({
  name: 'navMegaMenu',
  title: 'Mega menu',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The button text shown in the nav bar.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Feature image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image alt text',
      type: 'string',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Featured panel title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Featured panel description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Featured panel CTA label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaHref',
      title: 'Featured panel CTA URL or path',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'groups',
      title: 'Link groups',
      type: 'array',
      of: [{type: 'navItemGroup'}],
    }),
    defineField({
      name: 'autoReferenceLinks',
      title: 'Auto reference links',
      type: 'navMegaMenuAutoReferenceLinks',
      description: 'Automatically add condition and treatment reference links from selected service entries.',
    }),
  ],
  preview: {
    select: {title: 'label'},
    prepare({title}) {
      return {title, subtitle: 'Mega menu'}
    },
  },
})
