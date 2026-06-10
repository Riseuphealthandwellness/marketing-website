import {defineField} from 'sanity'

export const careCardColorOptions = [
  {title: 'Rise Red', value: 'riseRed'},
  {title: 'Deep Slate', value: 'deepSlate'},
  {title: 'Coal', value: 'coal'},
  {title: 'Ember Orange', value: 'emberOrange'},
  {title: 'Sunburst Gold', value: 'sunburstGold'},
  {title: 'Dawn Coral', value: 'dawnCoral'},
]

export function careCardColorField({group}: {group?: string} = {}) {
  return defineField({
    name: 'cardColor',
    title: 'Card color',
    type: 'string',
    group,
    description: 'Color used for the card panel on services/programs listing pages.',
    options: {
      layout: 'dropdown',
      list: careCardColorOptions,
    },
  })
}

export const careIconOptions = [
  {title: 'Arrow right', value: 'arrowRight'},
  {title: 'Brain', value: 'brain'},
  {title: 'Check circle', value: 'checkCircle'},
  {title: 'Clipboard list', value: 'clipboardList'},
  {title: 'Heart handshake', value: 'heartHandshake'},
  {title: 'Heart pulse', value: 'heartPulse'},
  {title: 'Map pin', value: 'mapPin'},
  {title: 'Phone call', value: 'phoneCall'},
  {title: 'Route', value: 'route'},
  {title: 'Send', value: 'send'},
  {title: 'Shield check', value: 'shieldCheck'},
  {title: 'Sparkles', value: 'sparkles'},
  {title: 'Stethoscope', value: 'stethoscope'},
  {title: 'Users', value: 'usersRound'},
]

export function careIconField({
  required = false,
  group,
}: {
  required?: boolean
  group?: string
} = {}) {
  return defineField({
    name: 'icon',
    title: 'Icon',
    type: 'string',
    group,
    options: {
      layout: 'dropdown',
      list: careIconOptions,
    },
    validation: required ? (rule) => rule.required() : undefined,
  })
}
