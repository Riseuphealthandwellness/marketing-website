import type { BreadcrumbConfig } from "@/lib/breadcrumbs";
import type { SupplementalSection } from "@/lib/supplemental-content/types";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavItemGroup = {
  title: string;
  links: NavItem[];
};

export type SiteNavLink = {
  _type: 'navLink';
  label: string;
  href: string;
};

export type SiteNavMegaMenu = {
  _type: 'navMegaMenu';
  label: string;
  image: CmsImage;
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  groups?: NavItemGroup[];
  autoReferenceLinks?: {
    enabled?: boolean;
    excludeServices?: { _id: string }[];
  };
};

export type SiteNavItem = SiteNavLink | SiteNavMegaMenu;

export type SeoFields = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImage?: {
    url: string;
    alt: string;
  };
};

export type ServiceHighlight = {
  title: string;
  description: string;
  href: string;
};

export type Service = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  icon?: HomepageV2IconName;
  cardColor?: string;
  cardEyebrow?: string;
  sortOrder?: number;
  body?: unknown[];
  href?: string;
  conditions?: Pick<Condition, 'slug' | 'title' | 'category' | 'shortDescription'>[];
  medications?: Pick<Drug, 'slug' | 'name' | 'genericName' | 'description'>[];
  seo?: SeoFields;
};

export type Program = {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  icon?: HomepageV2IconName;
  cardColor?: string;
  cardEyebrow?: string;
  sortOrder?: number;
  audience?: string;
  body?: unknown[];
  href?: string;
  seo?: SeoFields;
};

export type Provider = {
  slug: string;
  name: string;
  role: string;
  credentials?: string;
  department?: string;
  pronouns?: string;
  shortBio?: string;
  bio: string;
  image?: CmsImage;
  specialties?: string[];
  languages?: string[];
  locations?: Pick<Location, "slug" | "name">[];
  acceptingNewPatients?: boolean;
  seo?: SeoFields;
};

export type Location = {
  slug: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  hours?: string[];
  parking?: string;
  accessibilityNotes?: string;
  appointmentNotes?: string;
  serviceArea?: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
};

export type FooterColumn = {
  _key?: string;
  heading: string;
  links: { label: string; href: string }[];
};

export type SiteFooter = {
  columns?: FooterColumn[];
  legalLinks?: { label: string; href: string }[];
  footerNotice?: string;
  footerDisclaimers?: { text: string }[];
  copyrightText?: string;
};

export type PatientAccessLinks = {
  portal: string;
  scheduling: string;
  intake: string;
  referral: string;
};

export type SiteSettings = {
  name: string;
  tagline?: string;
  url: string;
  phone: string;
  email: string;
  contactInboxEmail?: string;
  referralInboxEmail?: string;
  address: string;
  location: {
    lat?: number;
    lng?: number;
    zoom: number;
  };
  accessLinks: PatientAccessLinks;
  showBreadcrumbs?: boolean;
  contactBand?: ContactBandContent;
  headerCta?: CtaButton;
  logo?: CmsImage;
};

export type ResourceLink = {
  title: string;
  description: string;
  href: string;
};

export type PageSection = {
  heading: string;
  body: unknown[];
};

export type CtaBlock = {
  eyebrow?: string;
  heading: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type ConditionsBlock = {
  category: string;
  heading?: string;
  conditions: Pick<Condition, 'slug' | 'title' | 'shortDescription'>[];
};

export type FaqBlock = {
  category: string;
  heading?: string;
  faqs: Faq[];
};

export type ServicesBlock = {
  heading?: string;
  services: Pick<Service, 'slug' | 'title' | 'description' | 'href'>[];
};

export type ProgramsBlock = {
  heading?: string;
  programs: Pick<Program, 'slug' | 'title' | 'description' | 'audience' | 'href'>[];
};

export type CareModelItem = {
  title: string;
  body: string;
  iconName: string;
};

export type CareModelBlock = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items: CareModelItem[];
};

export type PageBlock =
  | ({ _type: 'pageSection' } & PageSection)
  | ({ _type: 'ctaBlock' } & CtaBlock)
  | ({ _type: 'careModelBlock' } & CareModelBlock)
  | ({ _type: 'conditionsBlock' } & ConditionsBlock)
  | ({ _type: 'faqBlock' } & FaqBlock)
  | ({ _type: 'servicesBlock' } & ServicesBlock)
  | ({ _type: 'programsBlock' } & ProgramsBlock);

export type SidebarCard = {
  heading: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type AboutIconName =
  | 'badge-check'
  | 'heart-handshake'
  | 'map-pin'
  | 'route'
  | 'sparkles'
  | 'stethoscope'
  | 'users';

export type AboutIconCard = {
  _key?: string;
  iconName?: AboutIconName;
  label?: string;
  title?: string;
  detail?: string;
  description?: string;
};

export type AboutContent = {
  hero?: {
    heading?: string;
    backgroundImage?: CmsImage;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    imageAlt?: string;
    panelEyebrow?: string;
    panelDescription?: string;
  };
  glance?: {
    eyebrow?: string;
    heading?: string;
    items?: AboutIconCard[];
  };
  values?: {
    eyebrow?: string;
    heading?: string;
    items?: AboutIconCard[];
  };
  team?: {
    eyebrow?: string;
    heading?: string;
    ctaLabel?: string;
    ctaHref?: string;
    mobileCtaLabel?: string;
    maxProviders?: number;
  };
  community?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    backgroundImage?: CmsImage;
    ctaLabel?: string;
    ctaHref?: string;
    imageAlt?: string;
  };
  featuredNarrativeHeadings?: string[];
};

export type ServicesPageSectionContent = {
  eyebrow?: string;
  heading?: string;
  description?: string;
};

export type ServicesPageContent = {
  intro?: ServicesPageSectionContent;
  feature?: ServicesPageSectionContent & {
    ctaLabel?: string;
    ctaHref?: string;
    image?: CmsImage;
    stats?: {
      value?: string;
      label?: string;
      description?: string;
    }[];
  };
  services?: ServicesPageSectionContent & {
    ctaLabel?: string;
  };
  references?: ServicesPageSectionContent & {
    conditionsHeading?: string;
    treatmentsHeading?: string;
    ctaLabel?: string;
  };
  programs?: ServicesPageSectionContent & {
    ctaLabel?: string;
  };
};

export type MarketingPage = {
  title: string;
  path?: string;
  breadcrumbs?: BreadcrumbConfig;
  heroImage?: CmsImage;
  eyebrow?: string;
  description?: string;
  aboutContent?: AboutContent;
  servicesPageContent?: ServicesPageContent;
  body?: unknown[];
  blocks?: PageBlock[];
  sidebar?: SidebarCard[];
  contactForm?: ContactFormContent;
  emptyStateText?: string;
  newPatientAccessCards?: NewPatientAccessCard[];
  newPatientSteps?: NewPatientStep[];
  recordRequestPdf?: CmsFile;
  recordRequestPdfLabel?: string;
  seo?: SeoFields;
};

export type CtaButton = {
  label: string;
  href: string;
  style?: 'primary' | 'secondary';
  icon?: 'auto' | 'none' | 'phone' | 'mail' | 'arrow' | 'external';
};

export type CmsImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  lqip?: string;
};

export type CmsFile = {
  url: string;
  originalFilename?: string;
};

export type ReferralSettings = {
  downloadLabel?: string;
  formConsentLabel?: string;
  formDescription?: string;
  formDocumentNote?: string;
  formEyebrow?: string;
  formHeading?: string;
  missingPdfMessage?: string;
  pdfSectionDescription?: string;
  pdfSectionHeading?: string;
  referralPdf?: CmsFile;
};

export type ContactBandContent = {
  eyebrow: string;
  heading: string;
  description: string;
};

export type ContactFormContent = {
  eyebrow: string;
  heading: string;
  description: string;
  note?: string;
  topics: string[];
};

export type NewPatientStep = {
  iconName: 'phone' | 'clipboard' | 'calendar-check';
  title: string;
  body: string;
  ctaType: 'none' | 'phone' | 'intake' | 'custom';
  ctaLabel?: string;
  ctaHref?: string;
};

export type NewPatientAccessCard = {
  linkType: 'scheduling' | 'portal' | 'referral' | 'custom';
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
};

export type HomepageFeaturePanelItem = {
  iconName: 'phone' | 'heart-pulse' | 'map-pin';
  text: string;
};

export type HomepageFeaturePanel = {
  eyebrow: string;
  items: HomepageFeaturePanelItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type HomepageCareOptions = {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type BrandTextColor =
  | 'default'
  | 'riseRed'
  | 'emberOrange'
  | 'sunburstGold'
  | 'dawnCoral'
  | 'deepSlate'
  | 'coal';

export type PortableHeading = {
  _key: string;
  _type: 'block';
  children?: Array<{
    _key: string;
    _type: 'span';
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: 'textColor';
    color?: BrandTextColor;
  }>;
}[];

export type DrugPageLabels = {
  eyebrow?: string;
  genericNameLabel?: string;
  aliasesLabel?: string;
};

export type Drug = {
  name: string;
  genericName?: string;
  aliases: string[];
  slug: string;
  image?: CmsImage;
  description?: string;
  body?: unknown[];
  learnMoreUrl?: string;
  learnMoreLabel?: string;
  pageLabels?: DrugPageLabels;
  supplementalSections?: SupplementalSection[];
  seo?: SeoFields;
};

export type DrugReferenceMark = {
  _key: string;
  _type: 'drugReference';
  drug: Pick<Drug, 'name' | 'slug' | 'description'>;
};

export type ConditionPageLabels = {
  eyebrow?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  medicationsHeading?: string;
  viewAllLabel?: string;
};

export type Condition = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  image?: CmsImage;
  body?: unknown[];
  learnMoreUrl?: string;
  learnMoreLabel?: string;
  pageLabels?: ConditionPageLabels;
  supplementalSections?: SupplementalSection[];
  seo?: SeoFields;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Announcement = {
  title?: string;
  message?: string;
  link?: {
    label?: string;
    href?: string;
  };
};

export type HomepageContent = {
  hero?: {
    eyebrow?: string;
    heading?: PortableHeading;
    description?: string;
    buttons?: CtaButton[];
    backgroundImage?: CmsImage;
    featureImage?: CmsImage;
  };
  careOptions?: HomepageCareOptions;
  careModelHighlights?: string[];
  heroFeaturePanel?: HomepageFeaturePanel;
  serviceHighlights?: ServiceHighlight[];
  referralCta?: CtaBlock;
  seo?: SeoFields;
};

export type HomepageV2IconName =
  | 'arrowRight'
  | 'brain'
  | 'checkCircle'
  | 'clipboardList'
  | 'heartHandshake'
  | 'heartPulse'
  | 'mapPin'
  | 'phoneCall'
  | 'route'
  | 'send'
  | 'shieldCheck'
  | 'sparkles'
  | 'stethoscope'
  | 'usersRound';

export type HomepageV2Link = {
  label: string;
  href: string;
  description?: string;
};

export type HomepageV2StartPathCard = {
  icon: HomepageV2IconName;
  title: string;
  body: string;
  link: HomepageV2Link;
};

export type HomepageV2IconCard = {
  icon: HomepageV2IconName;
  title: string;
  body: string;
};

export type HomepageV2Offering = {
  _key?: string;
  item?: {
    _id: string;
    _type: 'service' | 'program';
    slug: string;
    title: string;
    description: string;
    icon?: HomepageV2IconName;
    cardEyebrow?: string;
    audience?: string;
    href?: string;
  };
};

export type HomepageV2ProcessStep = {
  icon: HomepageV2IconName;
  title: string;
  body: string;
};

export type HomepageV2CareMapCard = {
  icon: HomepageV2IconName;
  title: string;
  label?: string;
};

export type HomepageV2Component =
  | {
      _type: 'homepageV2HeroComponent';
      enabled?: boolean;
      eyebrow?: string;
      heading: string;
      description?: string;
      backgroundImage?: CmsImage;
      buttons?: CtaButton[];
      pathCards?: HomepageV2StartPathCard[];
    }
  | {
      _type: 'homepageV2AdvantageComponent';
      enabled?: boolean;
      eyebrow?: string;
      heading: string;
      description?: string;
      cards?: HomepageV2IconCard[];
    }
  | {
      _type: 'homepageV2ServicesComponent';
      enabled?: boolean;
      eyebrow?: string;
      heading: string;
      description?: string;
      featureImage?: CmsImage;
      offerings?: HomepageV2Offering[];
    }
  | {
      _type: 'homepageV2ProcessComponent';
      enabled?: boolean;
      eyebrow?: string;
      heading: string;
      description?: string;
      steps?: HomepageV2ProcessStep[];
    }
  | {
      _type: 'homepageV2CareCoordinationComponent';
      enabled?: boolean;
      eyebrow?: string;
      heading: string;
      description?: string;
      centerCard?: {
        icon: HomepageV2IconName;
        title: string;
        body?: string;
      };
      careMapCards?: HomepageV2CareMapCard[];
    }
  | {
      _type: 'homepageV2FinalCtaComponent';
      enabled?: boolean;
      eyebrow?: string;
      heading: string;
      buttons?: CtaButton[];
    };

export type HomepageV2Settings = {
  title: string;
  routePath: string;
  status: 'draft' | 'published';
  components?: HomepageV2Component[];
  seo?: SeoFields;
};
