import {defineField, defineType} from 'sanity'

export const drugPageLabels = defineType({
  name: 'drugPageLabels',
  title: 'Drug page labels',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Page eyebrow',
      type: 'string',
      description: 'Shown above the treatment name. Default: "Treatments"',
    }),
    defineField({
      name: 'genericNameLabel',
      title: '"Generic name" label',
      type: 'string',
      description: 'Default: "Generic name"',
    }),
    defineField({
      name: 'aliasesLabel',
      title: '"Also known as" label',
      type: 'string',
      description: 'Default: "Also known as"',
    }),
  ],
})

export const conditionPageLabels = defineType({
  name: 'conditionPageLabels',
  title: 'Condition page labels',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Page eyebrow',
      type: 'string',
      description: 'Shown above the title. Default: "Conditions"',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'Sidebar CTA heading',
      type: 'string',
      description: 'Default: "Ready to get started?"',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Sidebar CTA description',
      type: 'text',
      rows: 2,
      description: 'Default: "Our team can help you understand your options and take the next step."',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'Sidebar CTA button label',
      type: 'string',
      description: 'Default: "Start your care"',
    }),
    defineField({
      name: 'ctaButtonHref',
      title: 'Sidebar CTA button link',
      type: 'string',
      description: 'Default: "/new-patients"',
    }),
    defineField({
      name: 'medicationsHeading',
      title: 'Medications sidebar heading',
      type: 'string',
      description: 'Default: "Medications & treatments"',
    }),
    defineField({
      name: 'viewAllLabel',
      title: '"View all" link label',
      type: 'string',
      description: 'Default: "View all treatments"',
    }),
  ],
})
