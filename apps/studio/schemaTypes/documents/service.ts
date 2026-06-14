import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {careCardColorField, careIconField} from '../objects/careIconOptions'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: HeartIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'blocks', title: 'Blocks'},
    {name: 'display', title: 'Display'},
    {name: 'references', title: 'Reference pages'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'When off, this service is hidden from all listings and its page returns a 404.',
      initialValue: true,
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'Used in card previews and search results.',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero background image',
      type: 'image',
      description: 'Optional background image behind the page title. Leave blank for the default solid background.',
      group: 'display',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
      ],
    }),
    careIconField({group: 'display'}),
    careCardColorField({group: 'display'}),
    defineField({
      name: 'cardEyebrow',
      title: 'Card eyebrow',
      type: 'string',
      description: 'Short label shown above the title in cards and homepage offering modules.',
      group: 'display',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first in service lists.',
      group: 'display',
    }),
    defineField({
      name: 'href',
      title: 'URL or path',
      type: 'string',
      description: 'Override the default service URL. Leave blank to use the slug.',
      group: 'content',
    }),
    defineField({
      name: 'sidebar',
      title: 'Sidebar cards',
      type: 'array',
      description:
        'Optional cards shown alongside the service page body. Use for next steps, related care, or quick links.',
      group: 'content',
      of: [{type: 'sidebarCard'}],
    }),
    defineField({
      name: 'blocks',
      title: 'Page blocks',
      type: 'array',
      group: 'blocks',
      of: [
        {type: 'pageSection'},
        {type: 'ctaBlock'},
        {type: 'featureSplitBlock'},
        {type: 'statsBandBlock'},
        {type: 'trustStripBlock'},
        {type: 'quoteBlock'},
        {type: 'faqBlock'},
        {type: 'careModelBlock'},
        {type: 'blocksListBlock'},
        {type: 'newPatientStepsBlock'},
      ],
    }),
    defineField({
      name: 'conditions',
      title: 'Condition reference pages',
      type: 'array',
      description: 'Condition pages shown or associated with this service.',
      group: 'references',
      of: [{type: 'reference', to: [{type: 'condition'}]}],
    }),
    defineField({
      name: 'medications',
      title: 'Treatment / medication reference pages',
      type: 'array',
      description: 'Medication or treatment reference pages associated with this service.',
      group: 'references',
      of: [{type: 'reference', to: [{type: 'drug'}]}],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      enabled: 'enabled',
    },
    prepare({title, subtitle, enabled}) {
      return {
        title: enabled === false ? `[Disabled] ${title}` : title,
        subtitle,
      }
    },
  },
})
