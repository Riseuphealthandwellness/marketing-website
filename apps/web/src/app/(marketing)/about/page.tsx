import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  MapPin,
  Route,
  Sparkles,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortableTextContent } from "@/components/cms/portable-text-content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { TeamMemberPortrait } from "@/components/team/team-member-portrait";
import { getMarketingPage, getProviders } from "@/lib/cms/content-source";
import type { AboutContent, AboutIconName, PageBlock } from "@/lib/cms/types";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => metadataForPage("about");

const aboutIcons = {
  "badge-check": BadgeCheck,
  "heart-handshake": HeartHandshake,
  "map-pin": MapPin,
  route: Route,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  users: UsersRound,
} satisfies Record<AboutIconName, typeof BadgeCheck>;

type AboutNarrativeBlock = Extract<PageBlock, { _type: "pageSection" }>;

const aboutNarrativeHeadings = new Set([
  "Treatment that meets people where they are",
  "Integrated, not just co-located",
]);

function isAboutNarrativeBlock(block: PageBlock): block is AboutNarrativeBlock {
  return block._type === "pageSection" && aboutNarrativeHeadings.has(block.heading);
}

const defaultAboutContent: AboutContent = {
  hero: {
    heading: "Whole-person care, rooted in community.",
    primaryLabel: "Start care",
    primaryHref: "/new-patients",
    secondaryLabel: "Meet the team",
    secondaryHref: "/team",
    imageAlt:
      "Original collage artwork showing integrated care, community connection, and Appalachian landscape motifs",
    panelEyebrow: "Our mission, vision, and values",
    panelDescription:
      "Make care easier to enter, easier to understand, and easier to stay connected to.",
  },
  glance: {
    eyebrow: "Rise Up at a glance",
    heading: "A simpler front door for connected healthcare.",
    items: [
      {
        _key: "glance-integrated-care",
        iconName: "stethoscope",
        label: "Integrated care",
        detail: "Primary care plus recovery support",
      },
      {
        _key: "glance-clear-access",
        iconName: "route",
        label: "Clear access",
        detail: "New patients and referrals routed simply",
      },
      {
        _key: "glance-whole-person-focus",
        iconName: "sparkles",
        label: "Whole-person focus",
        detail: "Wellness, stability, and follow-through",
      },
      {
        _key: "glance-local-team",
        iconName: "badge-check",
        label: "Local team",
        detail: "Care designed for West Virginia communities",
      },
    ],
  },
  values: {
    eyebrow: "What guides us",
    heading: "Care is more durable when it is coordinated.",
    items: [
      {
        _key: "value-care-stays-connected",
        iconName: "heart-handshake",
        title: "Care stays connected",
        description:
          "Primary care, treatment, recovery support, and wellness goals stay in the same conversation.",
      },
      {
        _key: "value-people-before-process",
        iconName: "users",
        title: "People before process",
        description:
          "Patients and families get a clear starting point, plain next steps, and support from real staff.",
      },
      {
        _key: "value-rooted-in-west-virginia",
        iconName: "map-pin",
        title: "Rooted in West Virginia",
        description:
          "Our model is built around local access, community referrals, and long-term relationships.",
      },
    ],
  },
  team: {
    eyebrow: "People",
    heading: "Meet the team",
    ctaLabel: "View all",
    mobileCtaLabel: "View all team members",
  },
  community: {
    eyebrow: "Community connections",
    heading: "Built for patients, families, and referral partners.",
    description:
      "Whether someone reaches out directly or through a provider, Rise Up gives them a clear route into support that can continue over time.",
    ctaLabel: "Referral information",
    ctaHref: "/referrals",
    imageAlt:
      "Original collage artwork showing integrated care, community connection, and Appalachian landscape motifs",
  },
};

function AboutNarrativeBlocks({ blocks }: { blocks: AboutNarrativeBlock[] }) {
  return (
    <Section className="bg-white py-10 sm:py-12 lg:py-14">
      <Container>
        <div className="mx-auto max-w-6xl divide-y divide-border">
          {blocks.map((block, index) => {
            const Icon = index % 2 === 0 ? HeartHandshake : Stethoscope;

            return (
              <article
                className="grid gap-5 py-8 first:pt-0 last:pb-0 lg:grid-cols-[0.42fr_0.58fr] lg:gap-10"
                key={`${block.heading}-${index}`}
              >
                <div>
                  <span className="mb-4 inline-flex size-11 items-center justify-center rounded-full bg-brand-warm-accent/14 text-brand-action">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h2 className="max-w-xl font-heading text-3xl font-black leading-tight tracking-normal text-brand-coal sm:text-4xl">
                    {block.heading}
                  </h2>
                </div>
                <div className="border-l-2 border-brand-warm-accent/45 pl-5">
                  <PortableTextContent
                    value={block.body}
                    className="[&_p]:text-lg [&_p]:leading-8 [&_p]:text-brand-trust/82"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default async function AboutPage() {
  const [providers, page] = await Promise.all([getProviders(), getMarketingPage("about")]);
  if (!page) notFound();
  const breadcrumbs = page.path ? buildBreadcrumbs(page.path) : undefined;
  const about = page.aboutContent ?? defaultAboutContent;
  const hero = about?.hero;
  const glance = about?.glance;
  const values = about?.values;
  const team = about?.team;
  const community = about?.community;
  const pageBlocks = page.blocks ?? [];
  const narrativeBlocks = pageBlocks.filter(isAboutNarrativeBlock);
  const remainingBlocks = pageBlocks.filter((block) => !isAboutNarrativeBlock(block));

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />

      <section className="relative isolate min-h-[480px] overflow-hidden border-b border-brand-coal/15 sm:min-h-[540px] lg:min-h-[600px]">
        {/* Full-bleed background image */}
        <Image
          alt={hero?.imageAlt ?? ""}
          className="absolute inset-0 h-full w-full object-cover"
          fill
          priority
          sizes="100vw"
          src="/images/content/about-community-collage.png"
        />
        {/* Subtle dark scrim over entire image */}
        <div aria-hidden="true" className="absolute inset-0 bg-brand-coal/40" />

        <Container className="relative flex items-center py-14 sm:py-18 lg:py-24">
          {/* Frosted text card */}
          <div className="max-w-xl rounded-xl bg-white/80 p-7 shadow-[0_8px_40px_rgb(31_28_25_/_22%)] backdrop-blur-md sm:p-9">
            {breadcrumbs && breadcrumbs.length > 1 ? (
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-trust/65">
                  {breadcrumbs.map((crumb, index) => (
                    <li className="flex items-center gap-2" key={`${crumb.label}-${index}`}>
                      {index > 0 ? <span aria-hidden="true">/</span> : null}
                      {crumb.href ? (
                        <Link className="hover:text-brand-action hover:underline" href={crumb.href}>
                          {crumb.label}
                        </Link>
                      ) : (
                        <span>{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            {page.eyebrow ? (
              <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-action">
                {page.eyebrow}
              </p>
            ) : null}
            <h1 className="mt-3 font-heading text-4xl font-black leading-tight tracking-normal text-brand-coal sm:text-5xl lg:text-6xl">
              {hero?.heading ?? page.title}
            </h1>
            {page.description ? (
              <p className="mt-4 text-base leading-7 text-brand-coal/76 sm:text-lg">
                {page.description}
              </p>
            ) : null}
            {hero?.primaryLabel || hero?.secondaryLabel ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {hero.primaryLabel && hero.primaryHref ? (
                  <Link
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-action px-6 font-heading text-sm font-bold text-brand-warm-white shadow-[var(--shadow-soft)] transition-colors hover:bg-brand-action-hover"
                    href={hero.primaryHref}
                  >
                    {hero.primaryLabel}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                ) : null}
                {hero.secondaryLabel && hero.secondaryHref ? (
                  <Link
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-brand-trust/25 bg-white/75 px-6 font-heading text-sm font-bold text-brand-trust transition-colors hover:bg-brand-trust/10"
                    href={hero.secondaryHref}
                  >
                    {hero.secondaryLabel}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {glance ? (
        <Section className="bg-white py-10 sm:py-12 lg:py-14">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              {glance.eyebrow ? (
                <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-action">
                  {glance.eyebrow}
                </p>
              ) : null}
              {glance.heading ? (
                <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-brand-trust sm:text-4xl">
                  {glance.heading}
                </h2>
              ) : null}
            </div>
            {glance.items?.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {glance.items.map((item) => {
                  const Icon = aboutIcons[item.iconName ?? "badge-check"];
                  return (
                    <div
                      className="rounded-md border border-border bg-brand-warm-white p-4 text-center shadow-sm"
                      key={item._key ?? item.label}
                    >
                      <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-brand-warm-accent/15 text-brand-action">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      {item.label ? (
                        <h3 className="mt-3 font-heading text-base font-black tracking-normal text-brand-coal">
                          {item.label}
                        </h3>
                      ) : null}
                      {item.detail ? (
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {values ? (
        <Section className="bg-brand-trust py-12 text-brand-warm-white sm:py-14">
          <Container>
            <div className="grid gap-7 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
              <div>
                {values.eyebrow ? (
                  <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-soft-accent">
                    {values.eyebrow}
                  </p>
                ) : null}
                {values.heading ? (
                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal sm:text-4xl">
                    {values.heading}
                  </h2>
                ) : null}
              </div>
              {values.items?.length ? (
                <div className="grid gap-3 md:grid-cols-3">
                  {values.items.map((value) => {
                    const Icon = aboutIcons[value.iconName ?? "badge-check"];
                    return (
                      <div
                        className="rounded-md bg-white/[0.09] p-4 ring-1 ring-white/12"
                        key={value._key ?? value.title}
                      >
                        <Icon aria-hidden="true" className="size-7 text-brand-soft-accent" />
                        {value.title ? (
                          <h3 className="mt-4 font-heading text-lg font-black tracking-normal">
                            {value.title}
                          </h3>
                        ) : null}
                        {value.description ? (
                          <p className="mt-3 text-sm leading-6 text-brand-warm-white/76">
                            {value.description}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {narrativeBlocks.length > 0 ? <AboutNarrativeBlocks blocks={narrativeBlocks} /> : null}
      {remainingBlocks.length > 0 ? <PageBlocks blocks={remainingBlocks} /> : null}

      {providers.length > 0 && team ? (
        <Section className="bg-brand-warm-white py-12 sm:py-14">
          <Container>
            <div className="mb-7 flex items-end justify-between">
              <div>
                {team?.eyebrow ? (
                  <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-action">
                    {team.eyebrow}
                  </p>
                ) : null}
                {team?.heading ? (
                  <h2 className="mt-2 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
                    {team.heading}
                  </h2>
                ) : null}
              </div>
              {team?.ctaLabel ? (
                <Link
                  href="/team"
                  className="hidden shrink-0 text-sm font-semibold text-brand-action hover:underline sm:inline-flex sm:items-center sm:gap-1"
                >
                  {team.ctaLabel}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {providers.slice(0, 4).map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/team/${provider.slug}`}
                  className="group flex flex-col items-center rounded-md bg-white p-4 text-center text-brand-coal shadow-sm transition-shadow hover:shadow-md"
                >
                  <TeamMemberPortrait
                    image={provider.image}
                    name={provider.name}
                    size="sm"
                    className="mb-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <h3 className="font-heading font-black tracking-normal text-brand-coal">
                    {provider.name}
                  </h3>
                  {provider.credentials ? (
                    <p className="text-xs text-brand-trust/78">{provider.credentials}</p>
                  ) : null}
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-warm-accent">
                    {provider.role}
                  </p>
                </Link>
              ))}
            </div>

            {team?.mobileCtaLabel ? (
              <div className="mt-8 sm:hidden">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-action hover:underline"
                >
                  {team.mobileCtaLabel}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {community ? (
        <section className="relative overflow-hidden bg-brand-coal text-brand-warm-white">
          <div className="absolute inset-y-0 right-0 w-3/5">
            <Image
              alt="Fall foliage across the Appalachian mountain range in West Virginia"
              className="h-full w-full object-cover opacity-80"
              fill
              sizes="60vw"
              src="/images/content/about-mountains.jpg"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(31_28_25)_42%,rgb(31_28_25_/_0.88)_56%,transparent_78%)]" />
          <Container className="relative py-5 lg:py-6">
            <div className="max-w-lg">
              {community.eyebrow ? (
                <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-soft-accent">
                  {community.eyebrow}
                </p>
              ) : null}
              {community.heading ? (
                <h2 className="mt-2 text-2xl font-black leading-tight tracking-normal sm:text-3xl">
                  {community.heading}
                </h2>
              ) : null}
              {community.description ? (
                <p className="mt-2 max-w-sm text-sm leading-6 text-brand-warm-white/74">
                  {community.description}
                </p>
              ) : null}
              {community.ctaLabel && community.ctaHref ? (
                <Link
                  className="mt-4 inline-flex items-center gap-2 rounded-md border border-brand-warm-white/30 px-4 py-2 font-heading text-sm font-bold hover:bg-brand-warm-white/10"
                  href={community.ctaHref}
                >
                  {community.ctaLabel}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      <ContactBand />
    </>
  );
}
