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

export const homepageV2StartPathCard = defineType({
  name: 'homepageV2StartPathCard',
  title: 'Homepage V2 start path card',
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

export const homepageV2IconCard = defineType({
  name: 'homepageV2IconCard',
  title: 'Homepage V2 icon card',
  type: 'object',
  icon: HeartIcon,
  fields: [
    iconField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})

export const homepageV2OfferingReference = defineType({
  name: 'homepageV2OfferingReference',
  title: 'Homepage V2 offering reference',
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

export const homepageV2ProcessStep = defineType({
  name: 'homepageV2ProcessStep',
  title: 'Homepage V2 process step',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    iconField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})

export const homepageV2CareMapCard = defineType({
  name: 'homepageV2CareMapCard',
  title: 'Homepage V2 care map card',
  type: 'object',
  icon: HeartIcon,
  fields: [
    iconField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'label', title: 'Small label', type: 'string'}),
  ],
  preview: {select: {title: 'title', subtitle: 'label'}},
})

export const homepageV2CenterCard = defineType({
  name: 'homepageV2CenterCard',
  title: 'Homepage V2 center card',
  type: 'object',
  icon: HeartIcon,
  fields: [
    iconField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})

export const homepageV2HeroComponent = defineType({
  name: 'homepageV2HeroComponent',
  title: 'Homepage V2 hero',
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
      of: [{type: 'homepageV2StartPathCard'}],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})

export const homepageV2AdvantageComponent = defineType({
  name: 'homepageV2AdvantageComponent',
  title: 'Homepage V2 advantage section',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    ...sectionIntroFields,
    defineField({
      name: 'cards',
      title: 'Advantage cards',
      type: 'array',
      of: [{type: 'homepageV2IconCard'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})

export const homepageV2ServicesComponent = defineType({
  name: 'homepageV2ServicesComponent',
  title: 'Homepage V2 services section',
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
      name: 'offerings',
      title: 'Services and programs',
      type: 'array',
      description:
        'Ordered list sourced from the central Content > Services and Content > Programs documents.',
      of: [{type: 'homepageV2OfferingReference'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})

export const homepageV2ProcessComponent = defineType({
  name: 'homepageV2ProcessComponent',
  title: 'Homepage V2 process section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    ...sectionIntroFields,
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{type: 'homepageV2ProcessStep'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})

export const homepageV2CareCoordinationComponent = defineType({
  name: 'homepageV2CareCoordinationComponent',
  title: 'Homepage V2 care coordination section',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    ...sectionIntroFields,
    defineField({
      name: 'centerCard',
      title: 'Center card',
      type: 'homepageV2CenterCard',
    }),
    defineField({
      name: 'careMapCards',
      title: 'Care map cards',
      type: 'array',
      of: [{type: 'homepageV2CareMapCard'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {select: {title: 'heading', subtitle: 'eyebrow'}},
})

export const homepageV2FinalCtaComponent = defineType({
  name: 'homepageV2FinalCtaComponent',
  title: 'Homepage V2 final CTA',
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
