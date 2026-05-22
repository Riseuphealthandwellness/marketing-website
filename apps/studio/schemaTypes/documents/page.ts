import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Shown as the page heading and in the browser tab.',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path for this page. Use a plain slug for top-level pages (e.g. "faq" → /faq) or a prefixed path to nest under an existing section (e.g. "care/what-to-expect" → /care/what-to-expect).',
      options: {
        source: 'title',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9/]+/g, '-')
            .replace(/^-+|-+$/g, ''),
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Published', value: 'published'},
          {title: 'Draft', value: 'draft'},
        ],
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label shown above the page title.',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Shown below the title in the page header.',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'blocks',
      title: 'Page blocks',
      type: 'array',
      description: 'Build the page body by adding and reordering blocks.',
      of: [{type: 'pageSection'}, {type: 'ctaBlock'}, {type: 'careModelBlock'}, {type: 'conditionsBlock'}, {type: 'faqBlock'}, {type: 'servicesBlock'}, {type: 'programsBlock'}],
      group: 'content',
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
      slug: 'slug.current',
      status: 'status',
    },
    prepare({title, slug, status}) {
      return {
        title,
        subtitle: `${slug ? `/${slug}` : 'No slug'} · ${status ?? 'draft'}`,
      }
    },
  },
})
