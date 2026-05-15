import {
  CircleDollarSign,
  Clock3,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const carePromises = [
  {
    title: "Less handoff, more follow-through",
    body: "People are not left to retell their story at every step. The work is organized around continuity, warm communication, and practical support.",
    icon: Clock3,
  },
  {
    title: "Care that respects privacy",
    body: "The public site keeps sensitive clinical details out of general web channels and points people toward approved intake or direct staff communication.",
    icon: ShieldCheck,
  },
  {
    title: "Built for real-world barriers",
    body: "Transportation, timing, paperwork, and trust all affect access. The experience is designed around the friction people actually face.",
    icon: CircleDollarSign,
  },
];

export function CareModelSection() {
  return (
    <Section className="overflow-hidden bg-surface py-20 text-brand-coal sm:py-24">
      <Container className="relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="absolute inset-y-0 right-0 hidden w-[62%] opacity-20 lg:block">
          <MapPinned aria-hidden="true" className="absolute right-8 top-8 size-24 text-brand-warm-accent/24" />
          <div className="h-full border-l border-brand-warm-accent/14 bg-brand-warm-white" />
        </div>
        <div className="relative">
          <p className="font-heading text-sm font-black uppercase text-brand-warm-accent">
            What makes Rise Up different
          </p>
          <Image
            alt="Clinician reviewing a healthcare record"
            className="mt-6 h-auto w-full object-contain"
            height={920}
            sizes="(min-width: 1024px) 38vw, 100vw"
            src="/images/illustrations/Asset%2033.png"
            width={1424}
          />
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
            Built for the moments when getting care feels hardest.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-coal/74">
            A healthcare website should do more than list services. It should
            lower confusion, protect privacy, and help people feel oriented
            before they ever pick up the phone.
          </p>
        </div>

        <div className="relative space-y-6">
          {carePromises.map((item) => {
            const Icon = item.icon;

            return (
              <div className="grid gap-4 border-t border-brand-warm-accent/22 pt-6 sm:grid-cols-[4rem_1fr]" key={item.title}>
                <div className="flex size-14 items-center justify-center rounded-md bg-brand-trust text-brand-soft-accent">
                  <Icon aria-hidden="true" className="size-7" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black tracking-normal text-brand-trust">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base leading-7 text-brand-coal/76">
                    {item.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
