import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {navigationSingletons} from './schemaTypes/documents/navigation'
import {structure} from './structure'
import {StudioIcon} from './studioIcon'

const hiddenCreateSchemaTypes = new Set([
  'homepage',
  'homepageSettings',
  'landingPageSettings',
  'legalPage',
  'navigation',
  'pageSettings',
  'referralPageSettings',
  'referralSettings',
  'siteSettings',
])

export default defineConfig({
  name: 'default',
  title: 'RiseUp Marketing Website',
  icon: StudioIcon,

  projectId: 'k23sgnrq',
  dataset: 'production',

  releases: {
    enabled: false,
  },

  scheduledPublishing: {
    enabled: false,
  },

  plugins: [structureTool({structure})],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter((template) => !hiddenCreateSchemaTypes.has(template.schemaType)),
      ...navigationSingletons.map((nav) => ({
        id: `navigation-${nav.key}`,
        title: nav.title,
        schemaType: 'navigation',
        value: {
          title: nav.title.replace(/^Footer: /, ''),
          key: nav.key,
        },
      })),
    ],
  },
})
