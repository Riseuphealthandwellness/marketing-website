import { isCmsConfigured, sanityClient } from "@/lib/cms/client";
import { cmsQueries } from "@/lib/cms/queries";
import type {
  Announcement,
  CareModelBlock,
  Condition,
  Faq,
  HomepageContent,
  LegalPageContent,
  Location,
  MarketingPage,
  Program,
  Provider,
  ReferralSettings,
  Service,
  SiteNavItem,
  SiteSettings,
} from "@/lib/cms/types";

export const CMS_CACHE_TAG = "sanity";

const sanityFetchOptions = {
  next: { revalidate: 300, tags: [CMS_CACHE_TAG] },
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<SiteSettings | null>(cmsQueries.siteSettings, {}, sanityFetchOptions);
}

export async function getNavigation(slug: string): Promise<SiteNavItem[]> {
  if (!isCmsConfigured) return [];
  const doc = await sanityClient.fetch<{ items: SiteNavItem[] } | null>(
    cmsQueries.navigation,
    { id: `navigation-${slug}` },
    sanityFetchOptions,
  );
  return doc?.items ?? [];
}

export async function getFooterNav(): Promise<{ title: string; links: { label: string; href: string }[] }[]> {
  if (!isCmsConfigured) return [];
  const slugs = ["footer-care", "footer-patients", "footer-about"];
  const docs = await Promise.all(
    slugs.map((slug) =>
      sanityClient.fetch<{ title: string; items: { label: string; href: string }[] } | null>(
        cmsQueries.navigation,
        { id: `navigation-${slug}` },
        sanityFetchOptions,
      ),
    ),
  );
  return docs
    .filter((doc): doc is NonNullable<typeof doc> => doc !== null && doc.items?.length > 0)
    .map((doc) => ({ title: doc.title, links: doc.items }));
}

export async function getMarketingPage(slug: string): Promise<MarketingPage | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<MarketingPage | null>(cmsQueries.pageBySlug, { slug }, sanityFetchOptions);
}

export async function getAllPageSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allPageSlugs, {}, sanityFetchOptions);
  return rows?.map((r) => r.slug) ?? [];
}

export async function getLegalPage(id: "legal-page-privacy" | "legal-page-terms"): Promise<LegalPageContent | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<LegalPageContent | null>(cmsQueries.legalPageById, { id }, sanityFetchOptions);
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<HomepageContent | null>(cmsQueries.homepage, {}, sanityFetchOptions);
}

export async function getReferralSettings(): Promise<ReferralSettings | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<ReferralSettings | null>(cmsQueries.referralSettings, {}, sanityFetchOptions);
}

// Conditions

export async function getConditionsByCategory(category: string): Promise<Condition[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Condition[] | null>(cmsQueries.conditionsByCategory, { category }, sanityFetchOptions);
  return rows ?? [];
}

export async function getConditionBySlug(slug: string): Promise<Condition | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Condition | null>(cmsQueries.conditionBySlug, { slug }, sanityFetchOptions);
}

export async function getAllConditionSlugs(): Promise<{ slug: string; category: string }[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string; category: string }[] | null>(cmsQueries.allConditionSlugs, {}, sanityFetchOptions);
  return rows ?? [];
}

// Care model

export async function getCareModelBlock(): Promise<CareModelBlock | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<CareModelBlock | null>(cmsQueries.careModelBlock, {}, sanityFetchOptions);
}

// FAQs

export async function getFaqsByCategory(category: string): Promise<Faq[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Faq[] | null>(cmsQueries.faqsByCategory, { category }, sanityFetchOptions);
  return rows ?? [];
}

// Announcements

export async function getAnnouncement(): Promise<Announcement | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Announcement | null>(cmsQueries.announcement, {}, sanityFetchOptions);
}

// Services

export async function getServices(): Promise<Service[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Service[] | null>(cmsQueries.services, {}, sanityFetchOptions);
  return rows ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Service | null>(cmsQueries.serviceBySlug, { slug }, sanityFetchOptions);
}

export async function getAllServiceSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allServiceSlugs, {}, sanityFetchOptions);
  return rows?.map((r) => r.slug) ?? [];
}

// Programs

export async function getPrograms(): Promise<Program[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Program[] | null>(cmsQueries.programs, {}, sanityFetchOptions);
  return rows ?? [];
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Program | null>(cmsQueries.programBySlug, { slug }, sanityFetchOptions);
}

export async function getAllProgramSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allProgramSlugs, {}, sanityFetchOptions);
  return rows?.map((r) => r.slug) ?? [];
}

// Providers

export async function getProviders(): Promise<Provider[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Provider[] | null>(cmsQueries.providers, {}, sanityFetchOptions);
  return rows ?? [];
}

export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Provider | null>(cmsQueries.providerBySlug, { slug }, sanityFetchOptions);
}

export async function getAllProviderSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allProviderSlugs, {}, sanityFetchOptions);
  return rows?.map((r) => r.slug) ?? [];
}

// Locations

export async function getLocations(): Promise<Location[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Location[] | null>(cmsQueries.locations, {}, sanityFetchOptions);
  return rows ?? [];
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Location | null>(cmsQueries.locationBySlug, { slug }, sanityFetchOptions);
}

export async function getAllLocationSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allLocationSlugs, {}, sanityFetchOptions);
  return rows?.map((r) => r.slug) ?? [];
}
