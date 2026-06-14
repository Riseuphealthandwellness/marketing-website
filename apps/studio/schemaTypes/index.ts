import {announcement} from './documents/announcement'
import {position} from './documents/position'
import {condition} from './documents/condition'
import {drug} from './documents/drug'
import {drugReferenceAnnotation} from './annotations/drugReference'
import {faq} from './documents/faq'
import {homepage} from './documents/homepage'
import {homepageSettings} from './documents/homepageSettings'
import {location} from './documents/location'
import {navigation} from './documents/navigation'
import {siteFooter} from './documents/siteFooter'
import {program} from './documents/program'
import {provider} from './documents/provider'
import {service} from './documents/service'
import {siteSettings} from './documents/siteSettings'
import {websitePage} from './documents/websitePage'
import {accessLinks} from './objects/accessLinks'
import {
  aboutCommunityCta,
  aboutContent,
  aboutHero,
  aboutIconCard,
  aboutIconSection,
  aboutTeamSection,
} from './objects/aboutContent'
import {ctaButton} from './objects/ctaButton'
import {ctaBlock} from './objects/ctaBlock'
import {contactBandContent} from './objects/contactBandContent'
import {contactFormBlock} from './objects/contactFormBlock'
import {contactFormContent} from './objects/contactFormContent'
import {homepageHero} from './objects/homepageHero'
import {homepageCareOptions} from './objects/homepageCareOptions'
import {homepageFeaturePanel, homepageFeaturePanelItem} from './objects/homepageFeaturePanel'
import {
  homepageAdvantageComponent,
  homepageCenterCard,
  homepageCareCoordinationComponent,
  homepageCareMapCard,
  homepageFinalCtaComponent,
  homepageHeroComponent,
  homepageIconCard,
  homepageOfferingReference,
  homepageProcessComponent,
  homepageProcessStep,
  homepageServicesComponent,
  homepageStartPathCard,
} from './objects/homepageComponents'
import {link} from './objects/link'
import {navLink} from './objects/navLink'
import {navMegaMenu} from './objects/navMegaMenu'
import {navItemGroup} from './objects/navItemGroup'
import {newPatientAccessCard} from './objects/newPatientAccessCard'
import {newPatientStep} from './objects/newPatientStep'
import {newPatientStepsBlock, newPatientStepsBlockStep} from './objects/newPatientStepsBlock'
import {blocksListBlock, blocksListItem} from './objects/blocksListBlock'
import {positionsListBlock} from './objects/positionsListBlock'
import {teamListBlock} from './objects/teamListBlock'
import {careModelBlock} from './objects/careModelBlock'
import {careModelItem} from './objects/careModelItem'
import {conditionsBlock} from './objects/conditionsBlock'
import {embeddedService} from './objects/embeddedService'
import {faqBlock} from './objects/faqBlock'
import {pageSection} from './objects/pageSection'
import {programsBlock} from './objects/programsBlock'
import {seoFields} from './objects/seoFields'
import {serviceHighlight} from './objects/serviceHighlight'

import {serviceConditionsBlock} from './objects/serviceConditionsBlock'
import {featureSplitBlock} from './objects/featureSplitBlock'
import {quoteBlock} from './objects/quoteBlock'
import {statItem, statsBandBlock} from './objects/statsBandBlock'
import {trustStripBlock} from './objects/trustStripBlock'
import {servicesBlock} from './objects/servicesBlock'
import {servicesGridBlock} from './objects/servicesGridBlock'
import {servicesListBlock} from './objects/servicesListBlock'
import {programsListBlock} from './objects/programsListBlock'
import {sidebarCard} from './objects/sidebarCard'
import {footerColumn} from './objects/footerColumn'
import {footerDisclaimer} from './objects/footerDisclaimer'
import {textColor} from './objects/textColor'
import {
  supplementalBulletsSection,
  supplementalProseSection,
  supplementalStatItem,
  supplementalStatsSection,
  supplementalStepItem,
  supplementalStepsSection,
  supplementalSymptomGroup,
  supplementalSymptomsSection,
} from './objects/supplementalContent'
import { navMegaMenuAutoReferenceLinks } from './objects/navMegaMenuAutoReferenceLinks'
import {conditionPageLabels, drugPageLabels} from './objects/pageLabels'
import { websitePageBreadcrumbs } from './objects/websitePageBreadcrumbs'


export const schemaTypes = [
  siteSettings,
  siteFooter,
  drug,
  drugReferenceAnnotation,
  navigation,
  homepage,
  homepageSettings,
  websitePage,
  service,
  program,
  provider,
  location,
  condition,
  faq,
  announcement,
  position,
  accessLinks,
  aboutCommunityCta,
  aboutContent,
  aboutHero,
  aboutIconCard,
  aboutIconSection,
  aboutTeamSection,
  contactBandContent,
  contactFormBlock,
  contactFormContent,
  homepageHero,
  homepageCareOptions,
  homepageFeaturePanel,
  homepageFeaturePanelItem,
  homepageAdvantageComponent,
  homepageCenterCard,
  homepageCareCoordinationComponent,
  homepageCareMapCard,
  homepageFinalCtaComponent,
  homepageHeroComponent,
  homepageIconCard,
  homepageOfferingReference,
  homepageProcessComponent,
  homepageProcessStep,
  homepageServicesComponent,
  homepageStartPathCard,
  link,
  navLink,
  navMegaMenu,
  navItemGroup,
  newPatientAccessCard,
  newPatientStepsBlock,
  newPatientStepsBlockStep,
  newPatientStep,
  blocksListBlock,
  blocksListItem,
  positionsListBlock,
  teamListBlock,
  careModelBlock,
  careModelItem,
  conditionsBlock,
  embeddedService,
  faqBlock,
  pageSection,
  programsBlock,
  programsListBlock,
  serviceConditionsBlock,
  featureSplitBlock,
  quoteBlock,
  statItem,
  statsBandBlock,
  trustStripBlock,
  servicesBlock,
  servicesGridBlock,
  servicesListBlock,
  sidebarCard,
  seoFields,
  navMegaMenuAutoReferenceLinks,
  ctaButton,
  websitePageBreadcrumbs,
  ctaBlock,
  footerColumn,
  footerDisclaimer,
  serviceHighlight,
  supplementalBulletsSection,
  supplementalProseSection,
  supplementalStatItem,
  supplementalStatsSection,
  supplementalStepItem,
  supplementalStepsSection,
  supplementalSymptomGroup,
  supplementalSymptomsSection,
  textColor,
  conditionPageLabels,
  drugPageLabels,
]
