import {defineField, defineType} from 'sanity'

const sharedSectionFields = [
  defineField({
    name: 'enabled',
    title: 'Show section',
    type: 'boolean',
    initialValue: true,
  }),
  defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
  defineField({name: 'heading', title: 'Heading', type: 'string'}),
]

export const supplementalStatItem = defineType({
  name: 'supplementalStatItem',
  title: 'Supplemental stat',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show stat',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'value', title: 'Value', type: 'string'}),
    defineField({name: 'label', title: 'Label', type: 'string'}),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label'},
  },
})

export const supplementalStepItem = defineType({
  name: 'supplementalStepItem',
  title: 'Supplemental step',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show step',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 3}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'body'},
  },
})

export const supplementalSymptomGroup = defineType({
  name: 'supplementalSymptomGroup',
  title: 'Supplemental symptom group',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {title: 'heading'},
  },
})

export const supplementalStatsSection = defineType({
  name: 'supplementalStatsSection',
  title: 'Stats section',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      of: [{type: 'supplementalStatItem'}],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Stats section'}),
  },
})

export const supplementalProseSection = defineType({
  name: 'supplementalProseSection',
  title: 'Prose section',
  type: 'object',
  fields: [
    ...sharedSectionFields,
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 3}],
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'eyebrow'},
  },
})

export const supplementalSymptomsSection = defineType({
  name: 'supplementalSymptomsSection',
  title: 'Grouped list section',
  type: 'object',
  fields: [
    ...sharedSectionFields,
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({
      name: 'groups',
      title: 'Groups',
      type: 'array',
      of: [{type: 'supplementalSymptomGroup'}],
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'eyebrow'},
  },
})

export const supplementalStepsSection = defineType({
  name: 'supplementalStepsSection',
  title: 'Steps section',
  type: 'object',
  fields: [
    ...sharedSectionFields,
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{type: 'supplementalStepItem'}],
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'eyebrow'},
  },
})

export const supplementalBulletsSection = defineType({
  name: 'supplementalBulletsSection',
  title: 'Bullets section',
  type: 'object',
  fields: [
    ...sharedSectionFields,
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'eyebrow'},
  },
})
