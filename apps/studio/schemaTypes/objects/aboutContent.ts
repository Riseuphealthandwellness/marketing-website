import {InfoOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const aboutIconOptions = [
  {title: 'Badge check', value: 'badge-check'},
  {title: 'Heart handshake', value: 'heart-handshake'},
  {title: 'Map pin', value: 'map-pin'},
  {title: 'Route', value: 'route'},
  {title: 'Sparkles', value: 'sparkles'},
  {title: 'Stethoscope', value: 'stethoscope'},
  {title: 'Users', value: 'users'},
]

export const aboutContent = defineType({
  name: 'aboutContent',
  title: 'About page content',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'aboutHero',
    }),
    defineField({
      name: 'glance',
      title: 'At a glance',
      type: 'aboutIconSection',
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'aboutIconSection',
    }),
    defineField({
      name: 'team',
      title: 'Team section',
      type: 'aboutTeamSection',
    }),
    defineField({
      name: 'community',
      title: 'Community CTA',
      type: 'aboutCommunityCta',
    }),
    defineField({
      name: 'featuredNarrativeHeadings',
      title: 'Featured narrative section headings',
      description:
        'Page section headings that should use the custom split narrative layout on the About page.',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})

export const aboutHero = defineType({
  name: 'aboutHero',
  title: 'About hero',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({name: 'primaryLabel', title: 'Primary button label', type: 'string'}),
    defineField({name: 'primaryHref', title: 'Primary button URL or path', type: 'string'}),
    defineField({name: 'secondaryLabel', title: 'Secondary button label', type: 'string'}),
    defineField({name: 'secondaryHref', title: 'Secondary button URL or path', type: 'string'}),
    defineField({name: 'imageAlt', title: 'Hero artwork alt text', type: 'string'}),
    defineField({name: 'panelEyebrow', title: 'Artwork panel eyebrow', type: 'string'}),
    defineField({name: 'panelDescription', title: 'Artwork panel description', type: 'text', rows: 2}),
  ],
})

export const aboutIconSection = defineType({
  name: 'aboutIconSection',
  title: 'About icon section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'aboutIconCard'}],
    }),
  ],
})

export const aboutTeamSection = defineType({
  name: 'aboutTeamSection',
  title: 'About team section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'ctaLabel', title: 'Desktop CTA label', type: 'string'}),
    defineField({name: 'ctaHref', title: 'Desktop CTA URL or path', type: 'string'}),
    defineField({name: 'mobileCtaLabel', title: 'Mobile CTA label', type: 'string'}),
    defineField({
      name: 'maxProviders',
      title: 'Number of team members to show',
      type: 'number',
      initialValue: 4,
      validation: (rule) => rule.integer().min(1).max(12),
    }),
  ],
})

export const aboutCommunityCta = defineType({
  name: 'aboutCommunityCta',
  title: 'About community CTA',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({name: 'ctaLabel', title: 'Button label', type: 'string'}),
    defineField({name: 'ctaHref', title: 'Button URL or path', type: 'string'}),
    defineField({name: 'imageAlt', title: 'Background artwork alt text', type: 'string'}),
  ],
})

export const aboutIconCard = defineType({
  name: 'aboutIconCard',
  title: 'About icon card',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'iconName',
      title: 'Icon',
      type: 'string',
      options: {list: aboutIconOptions},
    }),
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'detail', title: 'Detail', type: 'text', rows: 2}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
  ],
  preview: {
    select: {
      label: 'label',
      title: 'title',
      subtitle: 'iconName',
    },
    prepare: ({label, title, subtitle}) => ({
      title: label ?? title ?? 'About icon card',
      subtitle,
    }),
  },
})
