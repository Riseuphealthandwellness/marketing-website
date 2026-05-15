import { cn } from "@/lib/utils";

type MiniMapProps = {
  className?: string;
  height?: number;
  lat?: number;
  lng?: number;
  width?: number;
  zoom?: number;
  style?: string;
};

export function MiniMap({
  className,
  height = 220,
  lat,
  lng,
  width = 360,
  zoom = 13,
  style = "mapbox/streets-v12",
}: MiniMapProps) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return (
      <div className={cn("flex items-center justify-center px-3 text-xs text-muted-foreground", className)}>
        Set lat/lng in Site Settings to show the map
      </div>
    );
  }

  const src = `/api/map/static?lat=${lat}&lng=${lng}&z=${zoom}&w=${width}&h=${height}&scale=2&style=${encodeURIComponent(style)}`;

  return (
    <div
      aria-label="Map preview of our location"
      className={cn("bg-cover bg-center", className)}
      role="img"
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}
