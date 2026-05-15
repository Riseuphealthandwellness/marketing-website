import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {StudioIcon} from './studioIcon'

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
  },
})
