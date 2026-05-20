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
  url: string;
  phone: string;
  email: string;
  address: string;
  location: {
    lat?: number;
    lng?: number;
    zoom: number;
  };
  accessLinks: PatientAccessLinks;
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
  heading: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type PageBlock =
  | ({ _type: 'pageSection' } & PageSection)
  | ({ _type: 'ctaBlock' } & CtaBlock);

export type MarketingPage = {
  title: string;
  eyebrow?: string;
  description: string;
  blocks?: PageBlock[];
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
};

export type CmsImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type CmsFile = {
  url: string;
  originalFilename?: string;
};

export type ReferralSettings = {
  downloadLabel?: string;
  referralPdf?: CmsFile;
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

export type HomepageContent = {
  hero?: {
    eyebrow?: string;
    heading?: PortableHeading;
    description?: string;
    buttons?: CtaButton[];
    backgroundImage?: CmsImage;
    featureImage?: CmsImage;
  };
  careModelHighlights?: string[];
  serviceHighlights?: ServiceHighlight[];
  referralCta?: CtaBlock;
  seo?: SeoFields;
};
