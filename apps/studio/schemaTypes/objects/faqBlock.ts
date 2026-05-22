import {HelpCircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ section',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'FAQ category',
      type: 'string',
      options: {
        list: [
          {title: 'Care', value: 'care'},
          {title: 'Patients', value: 'patients'},
          {title: 'Referrals', value: 'referrals'},
          {title: 'Billing', value: 'billing'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'heading', category: 'category'},
    prepare: ({title, category}) => ({
      title: title || 'FAQ section',
      subtitle: category ? `${category} FAQs` : 'No category set',
    }),
  },
})
