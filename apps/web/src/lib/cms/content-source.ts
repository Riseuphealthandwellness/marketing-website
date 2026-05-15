import { isCmsConfigured, sanityClient } from "@/lib/cms/client";
import { cmsQueries } from "@/lib/cms/queries";
import type {
  HomepageContent,
  LegalPageContent,
  Location,
  MarketingPage,
  Program,
  Provider,
  Service,
  SiteNavItem,
  SiteSettings,
} from "@/lib/cms/types";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<SiteSettings | null>(cmsQueries.siteSettings, {}, { next: { revalidate: 300 } });
}

export async function getNavigation(slug: string): Promise<SiteNavItem[]> {
  if (!isCmsConfigured) return [];
  const doc = await sanityClient.fetch<{ items: SiteNavItem[] } | null>(
    cmsQueries.navigation,
    { slug },
    { next: { revalidate: 300 } },
  );
  // DEBUG: remove after confirming nav data is correct
  console.log("[nav]", slug, JSON.stringify(doc, null, 2));
  return doc?.items ?? [];
}

export async function getFooterNav(): Promise<{ title: string; links: { label: string; href: string }[] }[]> {
  if (!isCmsConfigured) return [];
  const slugs = ["footer-care", "footer-patients", "footer-about"];
  const docs = await Promise.all(
    slugs.map((slug) =>
      sanityClient.fetch<{ title: string; items: { label: string; href: string }[] } | null>(
        cmsQueries.navigation,
        { slug },
        { next: { revalidate: 300 } },
      ),
    ),
  );
  return docs
    .filter((doc): doc is NonNullable<typeof doc> => doc !== null && doc.items?.length > 0)
    .map((doc) => ({ title: doc.title, links: doc.items }));
}

export async function getMarketingPage(slug: string): Promise<MarketingPage | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<MarketingPage | null>(cmsQueries.pageBySlug, { slug }, { next: { revalidate: 300 } });
}

export async function getAllPageSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allPageSlugs, {}, { next: { revalidate: 300 } });
  return rows?.map((r) => r.slug) ?? [];
}

export async function getLegalPage(id: "legalPage.privacy" | "legalPage.terms"): Promise<LegalPageContent | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<LegalPageContent | null>(cmsQueries.legalPageById, { id }, { next: { revalidate: 300 } });
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<HomepageContent | null>(cmsQueries.homepage, {}, { next: { revalidate: 300 } });
}

// Services

export async function getServices(): Promise<Service[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Service[] | null>(cmsQueries.services, {}, { next: { revalidate: 300 } });
  return rows ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Service | null>(cmsQueries.serviceBySlug, { slug }, { next: { revalidate: 300 } });
}

export async function getAllServiceSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allServiceSlugs, {}, { next: { revalidate: 300 } });
  return rows?.map((r) => r.slug) ?? [];
}

// Programs

export async function getPrograms(): Promise<Program[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Program[] | null>(cmsQueries.programs, {}, { next: { revalidate: 300 } });
  return rows ?? [];
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Program | null>(cmsQueries.programBySlug, { slug }, { next: { revalidate: 300 } });
}

export async function getAllProgramSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allProgramSlugs, {}, { next: { revalidate: 300 } });
  return rows?.map((r) => r.slug) ?? [];
}

// Providers

export async function getProviders(): Promise<Provider[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Provider[] | null>(cmsQueries.providers, {}, { next: { revalidate: 300 } });
  return rows ?? [];
}

export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Provider | null>(cmsQueries.providerBySlug, { slug }, { next: { revalidate: 300 } });
}

export async function getAllProviderSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allProviderSlugs, {}, { next: { revalidate: 300 } });
  return rows?.map((r) => r.slug) ?? [];
}

// Locations

export async function getLocations(): Promise<Location[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Location[] | null>(cmsQueries.locations, {}, { next: { revalidate: 300 } });
  return rows ?? [];
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Location | null>(cmsQueries.locationBySlug, { slug }, { next: { revalidate: 300 } });
}

export async function getAllLocationSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allLocationSlugs, {}, { next: { revalidate: 300 } });
  return rows?.map((r) => r.slug) ?? [];
}
