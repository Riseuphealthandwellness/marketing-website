import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
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
    description: `${provider.role} at RiseUp Health & Wellness.`,
    path: `/team/${slug}`,
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
              <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
                {provider.role}
              </p>
              <h1 className="mt-2 font-heading text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl">
                {provider.name}
                {provider.credentials ? (
                  <span className="ml-2 font-sans text-2xl font-normal text-muted-foreground sm:text-3xl">
                    {provider.credentials}
                  </span>
                ) : null}
              </h1>
              {provider.bio ? (
                <p className="mt-6 text-lg leading-8 text-muted-foreground">{provider.bio}</p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <ContactBand />
    </>
  );
}
