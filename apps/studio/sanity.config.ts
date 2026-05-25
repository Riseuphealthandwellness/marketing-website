import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {landingPageSettingPages} from './schemaTypes/documents/landingPageSettings'
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
  title: 'Content',
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
      ...landingPageSettingPages.map((page) => ({
        id: `landing-page-settings-${page.slug}`,
        title: `${page.title} page settings`,
        schemaType: 'landingPageSettings',
        value: {
          slug: page.slug,
          title: page.pageTitle,
          eyebrow: page.eyebrow,
          description: page.description,
        },
      })),
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
