"use client";

import Image from "next/image";
import { Expand, Mail, MapPin, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

type ContactBandClientProps = {
  phone: string;
  email: string;
  address: string;
  mapSrc: string | null;
  mapSrcLarge: string | null;
};

export function ContactBandClient({
  phone,
  email,
  address,
  mapSrc,
  mapSrcLarge,
}: ContactBandClientProps) {
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    if (!mapOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMapOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mapOpen]);

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-lg bg-brand-trust text-brand-warm-white shadow-[var(--shadow-soft)]">
        <div className="grid md:grid-cols-[1fr_1fr]">
          <div className="border-b border-brand-warm-white/16 p-5 transition-colors duration-200 hover:bg-brand-rise-red md:border-b-0 md:border-r">
            <Phone aria-hidden="true" className="size-6 text-brand-soft-accent" />
            <h3 className="mt-4 font-heading text-2xl font-black tracking-normal">Call</h3>
            <a
              className="mt-3 block text-lg font-bold text-brand-warm-white"
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            >
              {phone}
            </a>
          </div>

          <div className="border-b border-brand-warm-white/16 p-5 transition-colors duration-200 hover:bg-brand-rise-red md:border-b-0">
            <Mail aria-hidden="true" className="size-6 text-brand-soft-accent" />
            <h3 className="mt-4 font-heading text-2xl font-black tracking-normal">Email</h3>
            <a
              className="mt-3 block whitespace-nowrap text-base font-bold text-brand-warm-white sm:text-lg md:text-[clamp(0.9rem,1.45vw,1.125rem)]"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-stretch border-t border-brand-warm-white/16 md:flex-row">
          <div className="w-full shrink-0 p-5 transition-colors duration-200 hover:bg-brand-rise-red md:w-[40%]">
            <MapPin aria-hidden="true" className="size-6 text-brand-soft-accent" />
            <h3 className="mt-4 font-heading text-2xl font-black tracking-normal">Location</h3>
            <p className="mt-3 text-base leading-7 text-brand-warm-white/78">{address}</p>
          </div>

          <div
            aria-label="Map preview of our location"
            className="relative min-h-48 flex-1 self-stretch overflow-hidden border-t border-brand-warm-white/16 md:border-l md:border-t-0"
            role="img"
          >
            {mapSrc ? (
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -bottom-8 bg-cover bg-center"
                style={{ backgroundImage: `url(${mapSrc})` }}
              />
            ) : null}
            {mapSrcLarge ? (
              <button
                aria-label="Expand map"
                className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-md bg-white/90 text-brand-trust shadow transition-colors hover:bg-white"
                onClick={() => setMapOpen(true)}
                type="button"
              >
                <Expand aria-hidden="true" className="size-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {mapOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMapOpen(false);
          }}
        >
          <div className="relative w-full max-w-3xl overflow-hidden rounded-xl shadow-2xl">
            <button
              aria-label="Close map"
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-md bg-white/90 text-brand-trust shadow transition-colors hover:bg-white"
              onClick={() => setMapOpen(false)}
              type="button"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
            {mapSrcLarge ? (
              <Image
                alt="Map of our location"
                className="h-auto w-full"
                height={1200}
                src={mapSrcLarge}
                width={1600}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
