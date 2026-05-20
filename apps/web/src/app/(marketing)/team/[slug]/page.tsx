import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { Badge } from "@/components/ui/badge";
import { getAllProviderSlugs, getProviderBySlug, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

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
  const provider = await getProviderBySlug(slug);
  if (!provider) notFound();

  return (
    <>
      <section className="border-b border-border bg-background py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
            {/* Photo */}
            <div className="flex justify-start lg:block">
              {provider.image?.url ? (
                <div className="relative size-52 overflow-hidden rounded-xl bg-muted lg:aspect-[3/4] lg:h-auto lg:w-full">
                  <Image
                    src={provider.image.url}
                    alt={provider.image.alt ?? provider.name}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 280px, 208px"
                    priority
                  />
                </div>
              ) : (
                <div className="size-52 rounded-xl bg-muted lg:aspect-[3/4] lg:h-auto lg:w-full" />
              )}
            </div>

            {/* Bio */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
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
                <p className="mt-6 max-w-3xl text-xl leading-8 text-foreground">{provider.shortBio}</p>
              ) : null}
              {provider.bio ? (
                <p className="mt-6 max-w-3xl whitespace-pre-line text-lg leading-8 text-muted-foreground">
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
            <div className="grid gap-8 md:grid-cols-3">
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
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {provider.locations.map((location) => (
                      <li key={location.slug}>{location.name}</li>
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
