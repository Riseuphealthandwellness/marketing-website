import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { SupplementalData, SupplementalSection } from "@/lib/supplemental-content/types";

function StatsSection({ items }: { items: Extract<SupplementalSection, { type: 'stats' }>['items'] }) {
  const statItems = items ?? [];
  return (
    <Section tone="muted" className="py-10 sm:py-12">
      <Container>
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {statItems.map((stat, i) => (
            <div key={i} className="flex flex-col rounded-lg border border-border bg-card px-5 py-6 shadow-sm">
              <dt className="order-2 mt-1 text-sm font-medium leading-5 text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="order-1 font-heading text-3xl font-black tracking-tight text-brand-rise-red sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

function ProseSection({ section }: { section: Extract<SupplementalSection, { type: 'prose' }> }) {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          {section.eyebrow ? (
            <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
              {section.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 font-heading text-2xl font-black leading-tight tracking-normal text-brand-coal sm:text-3xl">
            {section.heading}
          </h2>
          <div className="mt-5 space-y-4">
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-7 text-brand-trust/80">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function SymptomsSection({ section }: { section: Extract<SupplementalSection, { type: 'symptoms' }> }) {
  return (
    <Section tone="muted">
      <Container>
        {section.eyebrow ? (
          <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
            {section.eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 font-heading text-2xl font-black leading-tight tracking-normal text-brand-coal sm:text-3xl">
          {section.heading}
        </h2>
        {section.description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            {section.description}
          </p>
        ) : null}
        <div className={`mt-7 grid gap-8 ${section.groups.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {section.groups.map((group, gi) => (
            <div key={gi}>
              <h3 className="border-b-2 border-brand-action pb-2 font-heading text-sm font-black uppercase tracking-widest text-brand-coal">
                {group.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2.5 text-sm leading-6 text-foreground">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-action"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function StepsSection({ section }: { section: Extract<SupplementalSection, { type: 'steps' }> }) {
  return (
    <section className="bg-brand-deep-slate py-12 text-brand-warm-white sm:py-16 lg:py-20">
      <Container>
        {section.eyebrow ? (
          <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-soft-accent">
            {section.eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 font-heading text-2xl font-black leading-tight tracking-normal sm:text-3xl">
          {section.heading}
        </h2>
        {section.description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-brand-warm-white/72">
            {section.description}
          </p>
        ) : null}
        <ol className="mt-10 space-y-8">
          {section.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-5">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-rise-red font-heading text-sm font-black text-white"
              >
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="font-heading text-base font-black leading-snug text-brand-warm-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-brand-warm-white/72">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function BulletsSection({ section }: { section: Extract<SupplementalSection, { type: 'bullets' }> }) {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          {section.eyebrow ? (
            <p className="font-heading text-xs font-black uppercase tracking-widest text-brand-action">
              {section.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 font-heading text-2xl font-black leading-tight tracking-normal text-brand-coal sm:text-3xl">
            {section.heading}
          </h2>
          <ul className="mt-5 space-y-2.5">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-6 text-foreground">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-action"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export function SupplementalSections({ data }: { data: SupplementalData }) {
  return (
    <>
      {data.sections.map((section, i) => {
        switch (section.type) {
          case 'stats':
            return <StatsSection key={i} items={section.items} />;
          case 'prose':
            return <ProseSection key={i} section={section} />;
          case 'symptoms':
            return <SymptomsSection key={i} section={section} />;
          case 'steps':
            return <StepsSection key={i} section={section} />;
          case 'bullets':
            return <BulletsSection key={i} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
