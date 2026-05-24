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
  slug: string;
  title: string;
  description: string;
  body?: unknown[];
  href?: string;
  seo?: SeoFields;
};

export type Program = {
  slug: string;
  title: string;
  description: string;
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

export type PatientAccessLinks = {
  portal: string;
  scheduling: string;
  intake: string;
  referral: string;
};

export type SiteSettings = {
  name: string;
  tagline?: string;
  copyrightText?: string;
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
  contactBand?: ContactBandContent;
  footerNotice?: string;
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

export type MarketingPage = {
  title: string;
  eyebrow?: string;
  description: string;
  blocks?: PageBlock[];
  contactForm?: ContactFormContent;
  emptyStateText?: string;
  newPatientAccessCards?: NewPatientAccessCard[];
  newPatientSteps?: NewPatientStep[];
  seo?: SeoFields;
};

export type LegalPageContent = {
  title: string;
  body?: unknown[];
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

export type Condition = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  body?: unknown[];
  learnMoreUrl?: string;
  learnMoreLabel?: string;
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
