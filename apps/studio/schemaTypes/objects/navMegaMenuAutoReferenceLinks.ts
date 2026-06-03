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
  ],
})