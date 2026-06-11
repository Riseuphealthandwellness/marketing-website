import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { TeamMemberPortrait } from "@/components/team/team-member-portrait";
import { Badge } from "@/components/ui/badge";
import { getAllProviderSlugs, getProviderBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProviderSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [provider, settings] = await Promise.all([getProviderBySlug(slug), getSiteSettings()]);
  if (!provider) return {};
  return createPageMetadata({
    title: provider.name,
    description: provider.shortBio ?? `${provider.role} at RiseUp Health & Wellness.`,
    path: `/team/${slug}`,
    seo: provider.seo,
    site: settings ?? undefined,
  });
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const [provider, settings] = await Promise.all([getProviderBySlug(slug), getSiteSettings()]);
  if (!provider) notFound();

  const breadcrumbs = resolveBreadcrumbs(`/team/${slug}`, undefined, settings?.showBreadcrumbs);
  const showBreadcrumbs = breadcrumbs && breadcrumbs.length > 1;

  return (
    <>
      <section className="border-b border-border bg-background py-10 sm:py-14">
        <Container>
          {showBreadcrumbs ? (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-y-1">
                {breadcrumbs.map((crumb, i) => (
                  <li key={i} className="flex items-center">
                    {i > 0 ? (
                      <ChevronRight aria-hidden="true" className="mx-1.5 size-3 shrink-0 text-muted-foreground/50" />
                    ) : null}
                    {!crumb.href ? (
                      <span className="text-xs font-medium text-muted-foreground sm:text-sm">{crumb.label}</span>
                    ) : (
                      <Link href={crumb.href} className="text-xs font-medium text-muted-foreground/70 transition-colors hover:text-foreground sm:text-sm">
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-10">
            <div className="flex justify-center lg:justify-start">
              <TeamMemberPortrait
                image={provider.image}
                name={provider.name}
                size="lg"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-action">
                  {provider.role}
                </p>
                {provider.department ? (
                  <Badge className="border-brand-trust/20 bg-brand-trust/10 text-brand-trust">
                    {provider.department}
                  </Badge>
                ) : null}
                {provider.acceptingNewPatients ? (
                  <Badge className="border-brand-action/20 bg-brand-action/10 text-brand-action">
                    Accepting new patients
                  </Badge>
                ) : null}
              </div>
              <h1 className="mt-2 font-heading text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl">
                {provider.name}
                {provider.credentials ? (
                  <span className="ml-2 font-sans text-2xl font-normal text-muted-foreground sm:text-3xl">
                    {provider.credentials}
                  </span>
                ) : null}
              </h1>
              {provider.pronouns ? (
                <p className="mt-3 text-sm font-semibold text-muted-foreground">{provider.pronouns}</p>
              ) : null}
              {provider.shortBio ? (
                <p className="mt-5 max-w-3xl text-xl leading-8 text-foreground">{provider.shortBio}</p>
              ) : null}
              {provider.bio ? (
                <p className="mt-5 max-w-3xl whitespace-pre-line text-lg leading-8 text-muted-foreground">
                  {provider.bio}
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {provider.specialties?.length || provider.languages?.length || provider.locations?.length ? (
        <Section>
          <Container>
            <div className="grid gap-6 md:grid-cols-3">
              {provider.specialties?.length ? (
                <div>
                  <h2 className="font-heading text-lg font-black tracking-normal text-foreground">
                    Specialties
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {provider.specialties.map((specialty) => (
                      <Badge key={specialty}>
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {provider.languages?.length ? (
                <div>
                  <h2 className="font-heading text-lg font-black tracking-normal text-foreground">
                    Languages
                  </h2>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {provider.languages.map((language) => (
                      <li key={language}>{language}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {provider.locations?.length ? (
                <div>
                  <h2 className="font-heading text-lg font-black tracking-normal text-foreground">
                    Locations
                  </h2>
                  <ul className="mt-4 space-y-2 text-sm">
                    {provider.locations.map((location) => (
                      <li key={location.slug}>
                        <Link
                          href={`/locations/${location.slug}`}
                          className="text-brand-trust transition-colors hover:text-brand-action"
                        >
                          {location.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
