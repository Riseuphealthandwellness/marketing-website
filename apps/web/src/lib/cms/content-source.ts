import { cache } from "react";

import { getConditionHref, getProgramHref, getServiceHref } from "@/lib/care-routes";
import { isCmsConfigured, sanityClient } from "@/lib/cms/client";
import { cmsQueries } from "@/lib/cms/queries";
import type {
  Announcement,
  CareModelBlock,
  Condition,
  Drug,
  Faq,
  HomepageContent,
  HomepageSettings,
  Location,
  MarketingPage,
  NavItemGroup,
  Position,
  Program,
  Provider,
  ReferralSettings,
  Service,
  SiteFooter,
  SiteNavItem,
  SiteNavMegaMenu,
  SiteSettings,
} from "@/lib/cms/types";

export const CMS_CACHE_TAG = "sanity";

const sanityFetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate: 300, tags: [CMS_CACHE_TAG] } };

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
  const items = doc?.items ?? [];

  const needsAutoLinks = items.some(
    (item) =>
      item._type === "navMegaMenu" &&
      (item.autoReferenceLinks?.enabled ||
        item.autoReferenceLinks?.showConditions ||
        item.groups?.some(
          (g) =>
            (["Services", "Programs"].includes(g.title) ||
              isConditionReferenceGroupTitle(g.title, item.autoReferenceLinks?.conditionGroupTitle)) &&
            !g.links?.length,
        )),
  );
  if (!needsAutoLinks) return items;

  const [services, programs] = await Promise.all([
    sanityClient.fetch<Service[] | null>(cmsQueries.navigationReferenceServices, {}, sanityFetchOptions),
    sanityClient.fetch<Program[] | null>(cmsQueries.navigationReferencePrograms, {}, sanityFetchOptions),
  ]);

  return items.map((item) =>
    item._type === "navMegaMenu"
      ? withReferenceLinkGroups(item, services ?? [], programs ?? [])
      : item,
  );
}

function withReferenceLinkGroups(item: SiteNavMegaMenu, services: Service[], programs: Program[]): SiteNavMegaMenu {
  const excluded = new Set(item.autoReferenceLinks?.excludeServices?.map((s) => s._id) ?? []);
  const enabledServices = services.filter((s) => !excluded.has(s._id));

  const serviceLinks: NavItemGroup["links"] = enabledServices.map((s) => ({
    label: s.title,
    href: getServiceHref(s),
    description: s.description,
  }));
  const programLinks: NavItemGroup["links"] = programs.map((p) => ({
    label: p.title,
    href: getProgramHref(p),
    description: p.description,
  }));
  const conditionLinks = buildConditionReferenceLinks(enabledServices);

  const existingGroups = item.groups ?? [];

  // Fill in empty "Services"/"Programs"/"Conditions" placeholder groups in place so the
  // editor's ordering is preserved. Only groups with no links are filled —
  // groups that already have manual links are left untouched.
  const mergedGroups = existingGroups.map((g): NavItemGroup => {
    if (g.title === "Services" && !g.links?.length && serviceLinks.length) {
      return { ...g, links: serviceLinks };
    }
    if (g.title === "Programs" && !g.links?.length && programLinks.length) {
      return { ...g, links: programLinks };
    }
    if (
      isConditionReferenceGroupTitle(g.title, item.autoReferenceLinks?.conditionGroupTitle) &&
      !g.links?.length &&
      conditionLinks.length
    ) {
      return { ...g, links: conditionLinks };
    }
    return g;
  });

  // If "Services"/"Programs"/"Conditions" weren't in the manual list at all but
  // autoReferenceLinks is enabled, append them.
  if (item.autoReferenceLinks?.enabled) {
    const hasServices = existingGroups.some((g) => g.title === "Services");
    const hasPrograms = existingGroups.some((g) => g.title === "Programs");
    const hasConditions = existingGroups.some((g) =>
      isConditionReferenceGroupTitle(g.title, item.autoReferenceLinks?.conditionGroupTitle),
    );
    if (!hasServices && serviceLinks.length) mergedGroups.push({ title: "Services", links: serviceLinks });
    if (!hasPrograms && programLinks.length) mergedGroups.push({ title: "Programs", links: programLinks });
    if (item.autoReferenceLinks.showConditions && !hasConditions && conditionLinks.length) {
      mergedGroups.push({
        title: item.autoReferenceLinks.conditionGroupTitle ?? "Conditions we treat",
        links: conditionLinks,
      });
    }
  }

  return { ...item, groups: mergedGroups };
}

function isConditionReferenceGroupTitle(title: string, configuredTitle?: string) {
  return [configuredTitle, "Conditions", "Conditions we treat", "All conditions we treat"].includes(title);
}

function buildConditionReferenceLinks(services: Service[]): NavItemGroup["links"] {
  const conditions = new Map<string, NavItemGroup["links"][number]>();

  services.forEach((service) => {
    service.conditions?.forEach((condition) => {
      if (!condition.slug) return;
      const key = `${condition.category ?? "condition"}:${condition.slug}`;
      if (conditions.has(key)) return;

      conditions.set(key, {
        label: condition.title,
        href: getConditionHref(condition, { serviceSlug: service.slug }),
        description: condition.shortDescription,
      });
    });
  });

  return Array.from(conditions.values()).sort((a, b) => a.label.localeCompare(b.label));
}

export async function getSiteFooter(): Promise<SiteFooter | null> {
  if (!isCmsConfigured) return null;
  const footer = await sanityClient.fetch<SiteFooter | null>(cmsQueries.siteFooter, {}, sanityFetchOptions);
  if (!footer) return null;

  const needsAutoLinks = footer.columns?.some(
    (col) => ["Services", "Programs"].includes(col.heading) && !col.links?.length,
  );
  if (!needsAutoLinks) return footer;

  const [services, programs] = await Promise.all([
    sanityClient.fetch<Service[] | null>(cmsQueries.navigationReferenceServices, {}, sanityFetchOptions),
    sanityClient.fetch<Program[] | null>(cmsQueries.navigationReferencePrograms, {}, sanityFetchOptions),
  ]);

  const serviceLinks = (services ?? []).map((s) => ({ label: s.title, href: getServiceHref(s) }));
  const programLinks = (programs ?? []).map((p) => ({ label: p.title, href: getProgramHref(p) }));

  return {
    ...footer,
    columns: footer.columns?.map((col) => {
      if (col.heading === "Services" && !col.links?.length && serviceLinks.length) {
        return { ...col, links: serviceLinks };
      }
      if (col.heading === "Programs" && !col.links?.length && programLinks.length) {
        return { ...col, links: programLinks };
      }
      return col;
    }),
  };
}

export async function getMarketingPage(slug: string): Promise<MarketingPage | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<MarketingPage | null>(cmsQueries.pageBySlug, { slug }, sanityFetchOptions);
}

export async function getMarketingPageByPath(path: string): Promise<MarketingPage | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<MarketingPage | null>(cmsQueries.pageByPath, { path }, sanityFetchOptions);
}

export async function getAllPageSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allPageSlugs, {}, sanityFetchOptions);
  return rows?.map((r) => r.slug) ?? [];
}

export async function getAllPagePaths(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ path: string }[] | null>(cmsQueries.allPagePaths, {}, sanityFetchOptions);
  return rows?.map((r) => r.path).filter(Boolean) ?? [];
}

export async function getAllPublishedPages(): Promise<{ title: string; path: string }[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ title: string; path: string }[] | null>(
    cmsQueries.allPublishedPages,
    {},
    sanityFetchOptions,
  );
  return rows?.filter((page) => Boolean(page.path)) ?? [];
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<HomepageContent | null>(cmsQueries.homepage, {}, sanityFetchOptions);
}

export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<HomepageSettings | null>(
    cmsQueries.homepageSettings,
    {},
    sanityFetchOptions,
  );
}

export async function getReferralSettings(): Promise<ReferralSettings | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<ReferralSettings | null>(cmsQueries.referralSettings, {}, sanityFetchOptions);
}

// Drugs

export const getAllDrugs = cache(async (): Promise<Drug[]> => {
  if (!isCmsConfigured) return [];
  try {
    const rows = await sanityClient.fetch<Drug[] | null>(cmsQueries.allDrugs, {}, sanityFetchOptions);
    return rows ?? [];
  } catch (error) {
    console.warn("Unable to load drug autolink data from Sanity.", error);
    return [];
  }
});

export async function getDrugBySlug(slug: string): Promise<Drug | null> {
  if (!isCmsConfigured) return null;
  return sanityClient.fetch<Drug | null>(cmsQueries.drugBySlug, { slug }, sanityFetchOptions);
}

export async function getAllDrugSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<{ slug: string }[] | null>(cmsQueries.allDrugSlugs, {}, sanityFetchOptions);
  return rows?.map((r) => r.slug) ?? [];
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

// Positions

export async function getOpenPositions(): Promise<Position[]> {
  if (!isCmsConfigured) return [];
  const rows = await sanityClient.fetch<Position[] | null>(cmsQueries.openPositions, {}, sanityFetchOptions);
  return rows ?? [];
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
