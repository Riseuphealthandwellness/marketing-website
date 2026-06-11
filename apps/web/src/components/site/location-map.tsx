"use client";

import { Expand, MapPin, X } from "lucide-react";
import { useState } from "react";

type LocationMapProps = {
  mapSrc: string;
  locationName: string;
  address: string;
  lat?: number;
  lng?: number;
  expandedSrc: string;
};

export function LocationMap({
  mapSrc,
  locationName,
  address,
  lat,
  lng,
  expandedSrc,
}: LocationMapProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
        {/* Map image with expand button */}
        <div className="relative">
          <div
            aria-label={`Map showing ${locationName}`}
            className="h-80 bg-cover bg-center lg:h-[420px]"
            role="img"
            style={{ backgroundImage: `url(${mapSrc})` }}
          />
          <button
            aria-label="Expand map"
            className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-white/90 px-3 py-1.5 text-xs font-semibold text-brand-coal shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-action"
            onClick={() => setExpanded(true)}
            type="button"
          >
            <Expand aria-hidden="true" className="size-3.5" />
            Expand
          </button>
        </div>

        {/* Address + directions */}
        <div className="p-4">
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-warm-accent" />
            <span className="whitespace-pre-line">{address}</span>
          </p>
          {lat && lng ? (
            <a
              className="mt-3 block text-sm font-semibold text-brand-action hover:underline"
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
              rel="noreferrer"
              target="_blank"
            >
              Get directions →
            </a>
          ) : null}
        </div>
      </div>

      {/* Expanded overlay */}
      {expanded ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-coal/70 p-4 backdrop-blur-sm"
          role="dialog"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-coal">
                <MapPin aria-hidden="true" className="size-4 text-brand-warm-accent" />
                {locationName}
              </p>
              <button
                aria-label="Close map"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setExpanded(false)}
                type="button"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <div
              aria-label={`Expanded map showing ${locationName}`}
              className="h-[60vh] w-full bg-cover bg-center"
              role="img"
              style={{ backgroundImage: `url(${expandedSrc})` }}
            />
            {lat && lng ? (
              <div className="border-t border-border px-5 py-3">
                <a
                  className="text-sm font-semibold text-brand-action hover:underline"
                  href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open in Google Maps →
                </a>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
