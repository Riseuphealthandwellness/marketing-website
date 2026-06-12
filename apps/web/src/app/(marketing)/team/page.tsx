import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageBlocks } from "@/components/sections/page-blocks";
import { PageHero } from "@/components/sections/page-hero";
import { TeamMemberPortrait } from "@/components/team/team-member-portrait";
import { Badge } from "@/components/ui/badge";
import { getMarketingPage, getProviders, getSiteSettings } from "@/lib/cms/content-source";
import { metadataForPage } from "@/app/(marketing)/_lib/page-helpers";
import { resolveBreadcrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => metadataForPage("team");

export default async function TeamPage() {
  const [teamMembers, page, settings] = await Promise.all([
    getProviders(),
    getMarketingPage("team"),
    getSiteSettings(),
  ]);
  if (!page) notFound();
  const breadcrumbs = resolveBreadcrumbs(page.path, page.breadcrumbs, settings?.showBreadcrumbs);

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={page?.eyebrow}
        title={page.title}
        description={page?.description}
      />
      {page?.blocks && page.blocks.length > 0 ? (
        <div className="pb-4 pt-6 sm:pb-6 sm:pt-8">
          <Container>
            <PageBlocks blocks={page.blocks} compact />
          </Container>
        </div>
      ) : null}

      <Section className="pt-4 sm:pt-6">
        <Container>
          {teamMembers.length === 0 ? (
            page?.emptyStateText ? <p className="text-muted-foreground">{page.emptyStateText}</p> : null
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/team/${provider.slug}`}
                  className="group flex flex-col rounded-lg border border-border bg-white p-4 text-brand-coal shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex justify-center pb-4 pt-2">
                    <TeamMemberPortrait
                      image={provider.image}
                      name={provider.name}
                      className="transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    {provider.department ? (
                      <Badge className="mb-3 w-fit border-brand-trust/20 bg-brand-trust/10 text-brand-trust">
                        {provider.department}
                      </Badge>
                    ) : null}
                    <h2 className="font-heading text-lg font-black tracking-normal text-brand-coal">
                      {provider.name}
                      {provider.credentials ? (
                        <span className="ml-1.5 font-sans text-sm font-normal text-brand-trust/78">
                          {provider.credentials}
                        </span>
                      ) : null}
                    </h2>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-brand-warm-accent">
                      {provider.role}
                    </p>
                    {provider.shortBio || provider.bio ? (
                      <p className="mt-3 line-clamp-3 text-sm text-brand-trust/82">
                        {provider.shortBio ?? provider.bio}
                      </p>
                    ) : null}
                    {provider.specialties?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {provider.specialties.slice(0, 3).map((specialty) => (
                          <span
                            className="rounded-full bg-brand-warm-white px-2.5 py-1 text-xs font-semibold text-brand-trust"
                            key={specialty}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
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
