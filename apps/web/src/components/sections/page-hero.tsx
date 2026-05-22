import { Container } from "@/components/layout/container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-brand-coal/20 bg-brand-trust py-9 text-brand-warm-white before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,var(--brand-warm-accent),var(--brand-emphasis),var(--brand-soft-accent))] before:content-[''] sm:py-12">
      <Container>
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="flex items-center gap-3 font-heading text-xs font-black uppercase tracking-widest text-brand-emphasis sm:text-sm">
              <span className="h-px w-8 bg-brand-emphasis" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 font-heading text-3xl font-black leading-tight tracking-normal text-brand-warm-white sm:text-4xl lg:text-[2.65rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-7 text-brand-warm-white/78 sm:text-lg sm:leading-8">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
