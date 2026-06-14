import {BlockElementIcon, HeartIcon, HomeIcon, LaunchIcon, StackIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {careIconField} from './careIconOptions'

const iconField = careIconField({required: true})

const sectionIntroFields = [
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
  }),
  defineField({
    name: 'heading',
    title: 'Heading',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 3,
  }),
]

export const homepageStartPathCard = defineType({
  name: 'homepageStartPathCard',
  title: 'Homepagestart path card',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    iconField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'link', title: 'Link', type: 'link', validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'link.href'}},
})

export const homepageIconCard = defineType({
  name: 'homepageIconCard',
  title: 'Homepageicon card',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Card image',
      type: 'image',
      description: 'Optional background image shown above the card text. Use the Unsplash tab to search for a photo.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    iconField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})

export const homepageOfferingReference = defineType({
  name: 'homepageOfferingReference',
  title: 'Homepageoffering reference',
  type: 'object',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'item',
      title: 'Service or program',
      type: 'reference',
      to: [{type: 'service'}, {type: 'program'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'item.title',
      subtitle: 'item._type',
    },
  },
})

export const homepageProcessStep = defineType({
  name: 'homepageProcessStep',
  title: 'Homepageprocess step',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    iconField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})

export const homepageCareMapCard = defineType({
  name: 'homepageCareMapCard',
  title: 'Homepagecare map card',
  type: 'object',
  icon: HeartIcon,
  fields: [
    iconField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'label', title: 'Small label', type: 'string'}),
  ],
  preview: {select: {title: 'title', subtitle: 'label'}},
})

export const homepageCenterCard = defineType({
  name: 'homepageCenterCard',
  title: 'Homepagecenter card',
  type: 'object',
  icon: HeartIcon,
  fields: [
    iconField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})

export const homepageHeroComponent = defineType({
  name: 'homepageHeroComponent',
  title: 'Homepagehero',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{type: 'ctaButton'}],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: 'pathCards',
      title: 'Path cards',
      type: 'array',
      of: [{type: 'homepageStartPathCard'}],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})

export const homepageAdvantageComponent = defineType({
  name: 'homepageAdvantageComponent',
  title: 'Homepageadvantage section',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    ...sectionIntroFields,
    defineField({
      name: 'cards',
      title: 'Advantage cards',
      type: 'array',
      of: [{type: 'homepageIconCard'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})

export const homepageServicesComponent = defineType({
  name: 'homepageServicesComponent',
  title: 'Homepageservices section',
  type: 'object',
  icon: StackIcon,
  fields: [
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    ...sectionIntroFields,
    defineField({
      name: 'featureImage',
      title: 'Feature image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'listingSource',
      title: 'Listing source',
      type: 'string',
      description:
        'Use the selected list exactly, or automatically include every enabled service. Selected services stay first when using the automatic list.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Selected services and programs', value: 'selected'},
          {title: 'All active services', value: 'allActiveServices'},
        ],
      },
      initialValue: 'selected',
    }),
    defineField({
      name: 'offerings',
      title: 'Services and programs',
      type: 'array',
      description:
        'Ordered list sourced from the central Content > Services and Content > Programs documents. In automatic mode, selected active services appear first and remaining active services are appended.',
      of: [{type: 'homepageOfferingReference'}],
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {listingSource?: string} | undefined
          if (parent?.listingSource === 'allActiveServices') return true
          return Array.isArray(value) && value.length > 0
            ? true
            : 'Add at least one service or program, or switch Listing source to all active services.'
        }),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})

export const homepageProcessComponent = defineType({
  name: 'homepageProcessComponent',
  title: 'Homepageprocess section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    ...sectionIntroFields,
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{type: 'homepageProcessStep'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})

export const homepageCareCoordinationComponent = defineType({
  name: 'homepageCareCoordinationComponent',
  title: 'Homepagecare coordination section',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    ...sectionIntroFields,
    defineField({
      name: 'centerCard',
      title: 'Center card',
      type: 'homepageCenterCard',
    }),
    defineField({
      name: 'careMapCards',
      title: 'Care map cards',
      type: 'array',
      of: [{type: 'homepageCareMapCard'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})

export const homepageFinalCtaComponent = defineType({
  name: 'homepageFinalCtaComponent',
  title: 'Homepagefinal CTA',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{type: 'ctaButton'}],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})
