import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {navigationSingletons} from './schemaTypes/documents/navigation'
import {websiteManagedPages} from './schemaTypes/documents/websitePage'
import {structure} from './structure'
import {StudioIcon} from './studioIcon'

const hiddenCreateSchemaTypes = new Set([
  'homepage',
  'navigation',
  'websitePage',
  'siteSettings',
])

export default defineConfig({
  name: 'default',
  title: 'Rise Up Health & Wellness',
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
      {
        id: 'website-page-home',
        title: 'Homepage',
        schemaType: 'websitePage',
        value: {
          key: 'home',
          path: '/',
          pageType: 'home',
          status: 'published',
          title: 'Homepage',
        },
      },
      ...websiteManagedPages.map((page) => ({
        id: page.id,
        title: `${page.title} page settings`,
        schemaType: 'websitePage',
        value: {
          key: page.key,
          path: page.path,
          pageType: 'landing',
          status: 'published',
          title: page.pageTitle,
          eyebrow: page.eyebrow,
          description: page.description,
        },
      })),
      {
        id: 'website-page-privacy-policy',
        title: 'Privacy policy',
        schemaType: 'websitePage',
        value: {
          key: 'privacy-policy',
          path: '/privacy-policy',
          pageType: 'legal',
          status: 'published',
          title: 'Privacy Policy',
        },
      },
      {
        id: 'website-page-terms-of-service',
        title: 'Terms of service',
        schemaType: 'websitePage',
        value: {
          key: 'terms-of-service',
          path: '/terms-of-service',
          pageType: 'legal',
          status: 'published',
          title: 'Terms of Service',
        },
      },
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
