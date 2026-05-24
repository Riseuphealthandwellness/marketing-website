import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactBand } from "@/components/sections/contact-band";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { TeamMemberPortrait } from "@/components/team/team-member-portrait";
import { getMarketingPage, getProviders } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";

export const generateMetadata = () => metadataForPage("about");

export default async function AboutPage() {
  const [providers, page] = await Promise.all([getProviders(), getMarketingPage("about")]);
  if (!page) notFound();

  return (
    <>
      <PageHero
        eyebrow={page?.eyebrow}
        title={page.title}
        description={page?.description}
      />
      {page?.blocks && page.blocks.length > 0 ? <PageBlocks blocks={page.blocks} /> : null}

      {providers.length > 0 ? (
        <Section tone="muted">
          <Container>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="font-heading text-sm font-black uppercase tracking-widest text-brand-warm-accent">
                  People
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight tracking-normal text-foreground sm:text-4xl">
                  Meet the team
                </h2>
              </div>
              <Link
                href="/team"
                className="hidden shrink-0 text-sm font-semibold text-brand-action hover:underline sm:block"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {providers.slice(0, 4).map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/team/${provider.slug}`}
                  className="group flex flex-col items-center rounded-lg bg-white p-5 text-center text-brand-coal shadow-sm transition-shadow hover:shadow-md"
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

            <div className="mt-8 sm:hidden">
              <Link href="/team" className="text-sm font-semibold text-brand-action hover:underline">
                View all team members →
              </Link>
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactBand />
    </>
  );
}
