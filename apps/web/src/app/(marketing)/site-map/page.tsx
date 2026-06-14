import type { Metadata } from "next";
import Link from "next/link";

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

function NodeLink({ node, depth }: { node: SiteMapNode; depth: number }) {
  const labelClass =
    depth === 0
      ? "text-4xl font-black tracking-tight text-foreground"
      : depth === 1
        ? "text-2xl font-bold text-foreground"
        : depth === 2
          ? "text-lg font-semibold text-foreground/80"
          : "text-base text-muted-foreground";

  const pathClass =
    depth <= 1
      ? "shrink-0 font-mono text-sm text-muted-foreground/45"
      : "shrink-0 font-mono text-xs text-muted-foreground/45";

  const rowClass =
    depth <= 1
      ? "-mx-3 px-3 py-2 rounded-lg"
      : "-mx-2 px-2 py-1 rounded-md";

  if (!node.href) {
    return <span className={labelClass}>{node.label}</span>;
  }

  return (
    <Link
      href={node.href}
      className={`group flex w-full items-center ${rowClass} hover:bg-brand-trust/[0.06] transition-colors`}
    >
      <span className={`${labelClass} shrink-0 group-hover:text-brand-trust transition-colors`}>{node.label}</span>
      <span aria-hidden className="mx-3 flex-1 self-center border-b border-dotted border-muted-foreground/25 group-hover:border-brand-trust/20 transition-colors" />
      <span className={`${pathClass} shrink-0 group-hover:text-brand-trust/50 transition-colors`}>{node.href}</span>
    </Link>
  );
}

function SiteMapBranch({ nodes, depth = 0 }: { nodes: SiteMapNode[]; depth?: number }) {
  if (!nodes.length) return null;

  const spacing =
    depth === 1 ? "space-y-8" :
    depth === 2 ? "space-y-3" :
    "space-y-2";

  const indentClass =
    depth === 2
      ? "mt-3 ml-1 border-l-2 border-brand-trust/15 pl-6 space-y-3"
      : depth >= 3
        ? "mt-2 ml-1 border-l border-border pl-5 space-y-1.5"
        : `mt-6 ${spacing}`;

  if (depth === 1) {
    return (
      <ul className={`mt-6 ${spacing}`}>
        {nodes.map((node) => (
          <li key={node.href ?? node.label}>
            <NodeLink node={node} depth={depth} />
            {node.children.size > 0 ? (
              <SiteMapBranch nodes={sortedChildren(node)} depth={depth + 1} />
            ) : null}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={indentClass}>
      {nodes.map((node) => (
        <li key={node.href ?? node.label}>
          <NodeLink node={node} depth={depth} />
          {node.children.size > 0 ? (
            <SiteMapBranch nodes={sortedChildren(node)} depth={depth + 1} />
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
  footer?.columns?.forEach((col) => col.links?.forEach((link) => addLink(links, link)));
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
      <section className="bg-brand-warm-white py-16 sm:py-20">
        <Container>
          <div>
            <NodeLink node={tree} depth={0} />
            <SiteMapBranch nodes={sortedChildren(tree)} depth={1} />
          </div>
        </Container>
      </section>
    </>
  );
}
