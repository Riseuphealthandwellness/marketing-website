import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// Custom annotation component — renders a teal pill in the Studio editor
function DrugReferenceAnnotation({children}: {children: React.ReactNode}) {
  return (
    <span
      style={{
        background: 'rgba(20, 184, 166, 0.12)',
        borderBottom: '2px solid rgba(20, 184, 166, 0.55)',
        borderRadius: '2px',
        padding: '0 2px',
        color: 'inherit',
      }}
    >
      {children}
    </span>
  )
}

export const drugReferenceAnnotation = defineType({
  name: 'drugReference',
  title: 'Drug reference',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'drug',
      title: 'Drug',
      type: 'reference',
      to: [{type: 'drug'}],
      validation: (rule) => rule.required(),
    }),
  ],
  components: {
    annotation: DrugReferenceAnnotation,
  },
})
