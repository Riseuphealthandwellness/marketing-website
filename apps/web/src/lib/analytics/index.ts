export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean | null>;
};

export type AnalyticsAdapter = {
  track(event: AnalyticsEvent): void;
};

const noopAdapter: AnalyticsAdapter = {
  track() {
    return undefined;
  },
};

export function getAnalyticsAdapter(): AnalyticsAdapter {
  const provider =
    process.env.ANALYTICS_PROVIDER ?? process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none";

  switch (provider) {
    default:
      return noopAdapter;
  }
}

export function trackEvent(event: AnalyticsEvent) {
  getAnalyticsAdapter().track(event);
}
