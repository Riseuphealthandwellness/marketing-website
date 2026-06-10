// apps/studio/src/schemaTypes/objects/websitePageBreadcrumbs.ts
import {defineField, defineType} from 'sanity'

export const websitePageBreadcrumbs = defineType({
  name: 'websitePageBreadcrumbs',
  title: 'Website page breadcrumbs',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show breadcrumbs',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'items',
      title: 'Custom breadcrumb items',
      type: 'array',
      description:
        'Optional override. Generated breadcrumbs include Home, ancestor pages, and the current page as the final unlinked crumb.',
      of: [{type: 'link'}],
    }),
  ],
})
