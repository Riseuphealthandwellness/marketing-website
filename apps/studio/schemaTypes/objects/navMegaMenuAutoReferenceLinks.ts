import {defineField, defineType} from 'sanity'

export const navMegaMenuAutoReferenceLinks = defineType({
  name: 'navMegaMenuAutoReferenceLinks',
  title: 'Mega menu auto reference links',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show service reference links',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'excludeServices',
      title: 'Exclude services',
      type: 'array',
      description:
        'Use this to omit services such as Primary care from the generated mega-menu reference groups.',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'showConditions',
      title: 'Show active condition links',
      type: 'boolean',
      description:
        'Adds a generated condition column using only conditions attached to enabled services, after excluded services are removed.',
      initialValue: false,
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'conditionGroupTitle',
      title: 'Condition group title',
      type: 'string',
      description: 'Heading for the generated condition column.',
      initialValue: 'Conditions we treat',
      hidden: ({parent}) => !parent?.enabled || !parent?.showConditions,
    }),
  ],
})
