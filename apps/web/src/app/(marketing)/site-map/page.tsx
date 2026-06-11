import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";
import { getConditionHref, getProgramHref, getServiceHref, getTreatmentHref } from "@/lib/care-routes";
import {
  getAllDrugs,
  getAllPublishedPages,
  getLocations,
  getNavigation,
  getPrograms,
  getProviders,
  getServices,
  getSiteFooter,
  getSiteSettings,
} from "@/lib/cms/content-source";
import type { NavItem, SiteNavItem } from "@/lib/cms/types";

export const metadata: Metadata = {
  title: "Site Map",
  description: "Find pages and resources on the Rise Up Health & Wellness website.",
};

type SiteMapLink = {
  href: string;
  label: string;
};

type SiteMapNode = {
  href?: string;
  label: string;
  children: Map<string, SiteMapNode>;
};

const canonicalHrefAliases = new Map([
  ["/services", "/care/services"],
  ["/programs", "/care/programs"],
  ["/primary-care", "/care/services/primary-care"],
  ["/care/primary-care", "/care/services/primary-care"],
  ["/care/addiction-medicine", "/care/services/addiction-medicine"],
  ["/about/patient-rights-privacy", "/patients-rights-privacy"],
  ["/about/privacy-policy", "/patients-rights-privacy/privacy-policy"],
  ["/about/notice-privacy-practices", "/patients-rights-privacy/notice-privacy-practices"],
  ["/about/terms-of-service", "/patients-rights-privacy/terms-of-use"],
  ["/privacy", "/patients-rights-privacy/privacy-policy"],
  ["/privacy-policy", "/patients-rights-privacy/privacy-policy"],
  ["/terms", "/patients-rights-privacy/terms-of-use"],
  ["/terms-of-service", "/patients-rights-privacy/terms-of-use"],
]);

function normalizeHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return null;

  const [path] = href.split(/[?#]/);
  if (!path) return null;

  const normalized = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return canonicalHrefAliases.get(normalized) ?? (normalized || "/");
}

function titleFromSegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function addLink(links: Map<string, SiteMapLink>, link: SiteMapLink) {
  const href = normalizeHref(link.href);
  if (!href) return;

  const label = link.label.trim();
  if (!label) return;

  links.set(href, { href, label });
}

function addNavigationLinks(links: Map<string, SiteMapLink>, items: SiteNavItem[]) {
  items.forEach((item) => {
    if (item._type === "navLink") {
      addLink(links, { href: item.href, label: item.label });
      return;
    }

    addLink(links, { href: item.ctaHref, label: item.ctaLabel || item.label });
    item.groups?.forEach((group) => {
      group.links.forEach((link: NavItem) => addLink(links, link));
    });
  });
}

function buildTree(links: SiteMapLink[]) {
  const root: SiteMapNode = { label: "Home", href: "/", children: new Map() };

  links
    .filter((link) => link.href !== "/")
    .sort((a, b) => a.href.localeCompare(b.href))
    .forEach((link) => {
      const segments = link.href.split("/").filter(Boolean);
      let current = root;

      segments.forEach((segment, index) => {
        const isLeaf = index === segments.length - 1;
        const existing = current.children.get(segment);
        const node =
          existing ??
          {
            label: titleFromSegment(segment),
            children: new Map<string, SiteMapNode>(),
          };

        if (isLeaf) {
          node.href = link.href;
          node.label = link.label;
        }

        current.children.set(segment, node);
        current = node;
      });
    });

  return root;
}

function sortedChildren(node: SiteMapNode) {
  return Array.from(node.children.values()).sort((a, b) => a.label.localeCompare(b.label));
}

function SiteMapLink({ node }: { node: SiteMapNode }) {
  if (!node.href) {
    return <span className="text-sm font-semibold text-brand-coal">{node.label}</span>;
  }

  return (
    <Link
      className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-trust transition-colors hover:text-brand-action"
      href={node.href}
    >
      <span>{node.label}</span>
      <ArrowRight
        aria-hidden={true}
        className="size-3.5 shrink-0 text-brand-trust/34 transition-all group-hover:translate-x-0.5 group-hover:text-brand-action"
      />
    </Link>
  );
}

function SiteMapBranch({ nodes, depth = 0 }: { nodes: SiteMapNode[]; depth?: number }) {
  if (!nodes.length) return null;

  return (
    <ul className={depth === 0 ? "space-y-3" : "mt-2 space-y-2"}>
      {nodes.map((node) => (
        <li key={node.href ?? node.label}>
          <SiteMapLink node={node} />
          {node.children.size > 0 ? (
            <div className="pl-4">
              <SiteMapBranch nodes={sortedChildren(node)} depth={depth + 1} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default async function SiteMapPage() {
  const [mainNav, footer, pages, services, programs, providers, locations, drugs, settings] = await Promise.all([
    getNavigation("main"),
    getSiteFooter(),
    getAllPublishedPages(),
    getServices(),
    getPrograms(),
    getProviders(),
    getLocations(),
    getAllDrugs(),
    getSiteSettings(),
  ]);

  const links = new Map<string, SiteMapLink>();
  addLink(links, { href: "/", label: "Home" });
  addNavigationLinks(links, mainNav);
  footer?.columns?.forEach((col) => col.links.forEach((link) => addLink(links, link)));
  pages.forEach((page) => addLink(links, { href: page.path, label: page.title }));

  services.forEach((service) => {
    const serviceHref = getServiceHref(service);
    addLink(links, { href: serviceHref, label: service.title });
    service.conditions?.forEach((condition) => {
      addLink(links, {
        href: getConditionHref(condition, { serviceSlug: service.slug }),
        label: condition.title,
      });
    });
    service.medications?.forEach((medication) => {
      addLink(links, {
        href: getTreatmentHref(medication),
        label: medication.name,
      });
    });
  });

  programs.forEach((program) => {
    addLink(links, { href: getProgramHref(program), label: program.title });
  });

  drugs.forEach((drug) => {
    addLink(links, { href: getTreatmentHref(drug), label: drug.name });
  });

  providers.forEach((provider) => {
    addLink(links, { href: `/team/${provider.slug}`, label: provider.name });
  });

  locations.forEach((location) => {
    addLink(links, { href: `/locations/${location.slug}`, label: location.name });
  });

  const tree = buildTree(Array.from(links.values()));

  return (
    <>
      <PageHero
        breadcrumbs={resolveBreadcrumbs("/site-map", undefined, settings?.showBreadcrumbs)}
        eyebrow="Site map"
        title="Find your way around"
        description="A complete index of published pages and resources on this website."
      />
      <section className="bg-brand-warm-white py-14 sm:py-16">
        <Container>
          <div className="mb-6 rounded-md border border-border bg-white p-5 shadow-sm">
            <SiteMapLink node={tree} />
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {sortedChildren(tree).map((node) => (
              <section
                key={node.href ?? node.label}
                className="rounded-md border border-border bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="border-b border-border pb-3">
                  <SiteMapLink node={node} />
                </div>
                {node.children.size > 0 ? (
                  <div className="mt-4">
                    <SiteMapBranch nodes={sortedChildren(node)} />
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
