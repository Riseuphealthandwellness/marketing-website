function clampInt(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.trunc(value)));
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export async function GET(request: Request) {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (!token) {
    return new Response("Mapbox not configured", { status: 404 });
  }

  const url = new URL(request.url);
  const lat = Number(url.searchParams.get("lat"));
  const lng = Number(url.searchParams.get("lng"));
  const zoom = Number(url.searchParams.get("z") ?? url.searchParams.get("zoom") ?? "13");

  if (!isFiniteNumber(lat) || !isFiniteNumber(lng) || !isFiniteNumber(zoom)) {
    return new Response("Invalid coordinates", { status: 400 });
  }

  // Reasonable thumbnail limits for cards.
  const width = clampInt(Number(url.searchParams.get("w") ?? "480"), 200, 1280);
  const height = clampInt(Number(url.searchParams.get("h") ?? "300"), 200, 1280);
  const scale = url.searchParams.get("scale") === "2" ? 2 : 1;
  const safeZoom = Math.max(0, Math.min(22, zoom));

  const requestedStyle = url.searchParams.get("style") ?? "mapbox/streets-v12";
  const allowedStyles = new Set([
    "mapbox/streets-v12",
    "mapbox/outdoors-v12",
    "mapbox/light-v11",
    "mapbox/dark-v11",
    "mapbox/satellite-streets-v12",
  ]);
  const styleId = allowedStyles.has(requestedStyle) ? requestedStyle : "mapbox/streets-v12";
  const marker = `pin-s+d84b2a(${lng},${lat})`;
  const mapboxUrl =
    `https://api.mapbox.com/styles/v1/${styleId}/static/` +
    `${marker}/${lng},${lat},${safeZoom},0/${width}x${height}` +
    (scale === 2 ? "@2x" : "") +
    `?access_token=${encodeURIComponent(token)}&attribution=false&logo=false`;

  const response = await fetch(mapboxUrl);
  if (!response.ok) {
    return new Response("Mapbox request failed", { status: 502 });
  }

  const contentType = response.headers.get("content-type") ?? "image/png";
  const body = await response.arrayBuffer();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

