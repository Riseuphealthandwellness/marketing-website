import {announcement} from './documents/announcement'
import {condition} from './documents/condition'
import {drug} from './documents/drug'
import {drugReferenceAnnotation} from './annotations/drugReference'
import {faq} from './documents/faq'
import {homepage} from './documents/homepage'
import {homepageV2Settings} from './documents/homepageV2Settings'
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
import {contactFormContent} from './objects/contactFormContent'
import {homepageHero} from './objects/homepageHero'
import {homepageCareOptions} from './objects/homepageCareOptions'
import {homepageFeaturePanel, homepageFeaturePanelItem} from './objects/homepageFeaturePanel'
import {
  homepageV2AdvantageComponent,
  homepageV2CenterCard,
  homepageV2CareCoordinationComponent,
  homepageV2CareMapCard,
  homepageV2FinalCtaComponent,
  homepageV2HeroComponent,
  homepageV2IconCard,
  homepageV2OfferingReference,
  homepageV2ProcessComponent,
  homepageV2ProcessStep,
  homepageV2ServicesComponent,
  homepageV2StartPathCard,
} from './objects/homepageV2Components'
import {link} from './objects/link'
import {navLink} from './objects/navLink'
import {navMegaMenu} from './objects/navMegaMenu'
import {navItemGroup} from './objects/navItemGroup'
import {newPatientAccessCard} from './objects/newPatientAccessCard'
import {newPatientStep} from './objects/newPatientStep'
import {careModelBlock} from './objects/careModelBlock'
import {careModelItem} from './objects/careModelItem'
import {conditionsBlock} from './objects/conditionsBlock'
import {embeddedService} from './objects/embeddedService'
import {faqBlock} from './objects/faqBlock'
import {pageSection} from './objects/pageSection'
import {programsBlock} from './objects/programsBlock'
import {seoFields} from './objects/seoFields'
import {serviceHighlight} from './objects/serviceHighlight'
import {
  servicesPageContent,
  servicesPageFeature,
  servicesPageFeatureStat,
  servicesPageReferences,
  servicesPageSection,
} from './objects/servicesPageContent'
import {servicesBlock} from './objects/servicesBlock'
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
import { servicesPageIntro } from './objects/servicesPageIntro'

export const schemaTypes = [
  siteSettings,
  siteFooter,
  drug,
  drugReferenceAnnotation,
  navigation,
  homepage,
  homepageV2Settings,
  websitePage,
  service,
  program,
  provider,
  location,
  condition,
  faq,
  announcement,
  accessLinks,
  aboutCommunityCta,
  aboutContent,
  aboutHero,
  aboutIconCard,
  aboutIconSection,
  aboutTeamSection,
  contactBandContent,
  contactFormContent,
  homepageHero,
  homepageCareOptions,
  homepageFeaturePanel,
  homepageFeaturePanelItem,
  homepageV2AdvantageComponent,
  homepageV2CenterCard,
  homepageV2CareCoordinationComponent,
  homepageV2CareMapCard,
  homepageV2FinalCtaComponent,
  homepageV2HeroComponent,
  homepageV2IconCard,
  homepageV2OfferingReference,
  homepageV2ProcessComponent,
  homepageV2ProcessStep,
  homepageV2ServicesComponent,
  homepageV2StartPathCard,
  link,
  navLink,
  navMegaMenu,
  navItemGroup,
  newPatientAccessCard,
  newPatientStep,
  careModelBlock,
  careModelItem,
  conditionsBlock,
  embeddedService,
  faqBlock,
  pageSection,
  programsBlock,
  servicesBlock,
  sidebarCard,
  seoFields,
  servicesPageContent,
  servicesPageFeature,
  servicesPageFeatureStat,
  servicesPageReferences,
  servicesPageSection,
  navMegaMenuAutoReferenceLinks,
  ctaButton,
  websitePageBreadcrumbs,
  servicesPageIntro,
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
