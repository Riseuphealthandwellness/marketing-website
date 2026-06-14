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
    <Section className="relative isolate overflow-hidden bg-surface py-14 text-brand-coal sm:py-16">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full opacity-[0.10]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 560"
      >
        <path
          d="M-80 440C130 356 268 496 472 392C648 300 758 174 992 244C1192 304 1302 200 1520 238"
          fill="none"
          stroke="rgb(78 101 112)"
          strokeWidth="1.5"
        />
        <path
          d="M-60 316C148 250 298 358 506 292C714 224 820 100 1040 158C1212 204 1326 120 1504 142"
          fill="none"
          stroke="rgb(78 101 112)"
          strokeWidth="1.5"
        />
        <path
          d="M-80 200C150 148 308 232 520 186C740 138 858 36 1092 88C1270 128 1370 62 1520 74"
          fill="none"
          stroke="rgb(78 101 112)"
          strokeWidth="1"
        />
      </svg>
      <Container className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
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

        <div className="relative divide-y divide-border overflow-hidden rounded-lg border border-border bg-white shadow-[var(--shadow-soft)]">
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
                  <h3 className="font-heading text-2xl font-black tracking-normal text-brand-coal">
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
