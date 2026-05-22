import {
  AlarmClock,
  Brain,
  Calendar,
  CircleDollarSign,
  Clock3,
  HeartPulse,
  MapPinned,
  MapPin,
  Phone,
  Pill,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import Image from "next/image";
import type { ElementType } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { CareModelBlock } from "@/lib/cms/types";

const iconMap: Record<string, ElementType> = {
  "alarm-clock": AlarmClock,
  "clock": Clock3,
  "shield": ShieldCheck,
  "dollar": CircleDollarSign,
  "heart": HeartPulse,
  "users": Users,
  "phone": Phone,
  "calendar": Calendar,
  "map-pin": MapPin,
  "stethoscope": Stethoscope,
  "pill": Pill,
  "brain": Brain,
};

type CareModelSectionProps = CareModelBlock;

export function CareModelSection({ eyebrow, heading, description, items }: CareModelSectionProps) {
  if (!items?.length) return null;

  return (
    <Section className="overflow-hidden bg-surface py-20 text-brand-coal sm:py-24">
      <Container className="relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="absolute inset-y-0 right-0 hidden w-[62%] opacity-20 lg:block">
          <MapPinned aria-hidden="true" className="absolute right-8 top-8 size-24 text-brand-warm-accent/24" />
          <div className="h-full border-l border-brand-warm-accent/14 bg-brand-warm-white" />
        </div>
        <div className="relative">
          {eyebrow ? (
            <p className="font-heading text-sm font-black uppercase text-brand-warm-accent">
              {eyebrow}
            </p>
          ) : null}
          <Image
            alt="Clinician reviewing a healthcare record"
            className="mt-6 h-auto w-full object-contain"
            height={920}
            sizes="(min-width: 1024px) 38vw, 100vw"
            src="/images/illustrations/Asset%2033.png"
            width={1424}
          />
          {heading ? (
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
              {heading}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-coal/74">
              {description}
            </p>
          ) : null}
        </div>

        <div className="relative divide-y divide-border overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-soft)]">
          {items.map((item) => {
            const Icon = iconMap[item.iconName] ?? ShieldCheck;
            return (
              <div
                key={item.title}
                className="grid gap-4 p-5 sm:grid-cols-[4rem_1fr]"
              >
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
