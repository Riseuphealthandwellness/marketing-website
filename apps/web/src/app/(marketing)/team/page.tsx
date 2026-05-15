import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/sections/page-hero";
import { getProviders, getSiteSettings } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata({
    title: "Our Team",
    description: "Meet the providers and staff behind RiseUp Health & Wellness.",
    path: "/team",
    site: settings ?? undefined,
  });
}

export default async function TeamPage() {
  const providers = await getProviders();

  return (
    <>
      <PageHero
        eyebrow="People"
        title="Our Team"
        description="Clinicians and staff committed to integrated, compassionate care."
      />

      <Section>
        <Container>
          {providers.length === 0 ? (
            <p className="text-muted-foreground">Team profiles coming soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/team/${provider.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-shadow hover:shadow-md"
                >
                  {provider.image?.url ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                      <Image
                        src={provider.image.url}
                        alt={provider.image.alt ?? provider.name}
                        fill
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] w-full bg-muted" />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-heading text-lg font-black tracking-normal text-foreground group-hover:text-brand-action">
                      {provider.name}
                      {provider.credentials ? (
                        <span className="ml-1.5 font-sans text-sm font-normal text-muted-foreground">
                          {provider.credentials}
                        </span>
                      ) : null}
                    </h2>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-brand-warm-accent">
                      {provider.role}
                    </p>
                    {provider.bio ? (
                      <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{provider.bio}</p>
                    ) : null}
                    <span className="mt-4 text-sm font-semibold text-brand-action group-hover:underline">
                      View profile →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
