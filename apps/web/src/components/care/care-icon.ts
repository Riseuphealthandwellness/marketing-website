import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  HeartPulse,
  MapPin,
  PhoneCall,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import type { HomepageV2IconName } from "@/lib/cms/types";

export const careIconMap = {
  arrowRight: ArrowRight,
  brain: Brain,
  checkCircle: CheckCircle2,
  clipboardList: ClipboardList,
  heartHandshake: HeartHandshake,
  heartPulse: HeartPulse,
  mapPin: MapPin,
  phoneCall: PhoneCall,
  route: Route,
  send: Send,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  usersRound: UsersRound,
} satisfies Record<HomepageV2IconName, LucideIcon>;

export function getCareIcon(icon?: HomepageV2IconName): LucideIcon {
  return careIconMap[icon ?? "heartPulse"] ?? HeartPulse;
}

const careCardColorMap: Record<string, string> = {
  riseRed: "bg-brand-rise-red",
  deepSlate: "bg-brand-deep-slate",
  coal: "bg-brand-coal",
  emberOrange: "bg-brand-ember-orange",
  sunburstGold: "bg-brand-sunburst-gold",
  dawnCoral: "bg-brand-dawn-coral",
};

const fallbackColors = [
  "bg-brand-rise-red",
  "bg-brand-deep-slate",
  "bg-brand-coal",
  "bg-brand-ember-orange",
];

export function getCardColor(cardColor: string | undefined, index: number): string {
  if (cardColor && careCardColorMap[cardColor]) return careCardColorMap[cardColor]!;
  return fallbackColors[index % fallbackColors.length]!;
}
