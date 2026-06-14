import Link from "next/link";

import { TeamMemberPortrait } from "@/components/team/team-member-portrait";
import { Badge } from "@/components/ui/badge";
import type { Provider } from "@/lib/cms/types";

type TeamMemberCardProps = {
  provider: Provider;
};

export function TeamMemberCard({ provider }: TeamMemberCardProps) {
  return (
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
  );
}
