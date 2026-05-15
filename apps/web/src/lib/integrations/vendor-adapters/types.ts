export type VendorSystem = "portal" | "scheduling" | "intake" | "referrals";

export type VendorLinkRequest = {
  system: VendorSystem;
  returnTo?: string;
};

export type VendorLinkAdapter = {
  getLaunchUrl(request: VendorLinkRequest): Promise<string>;
};

export type VendorAdapterRegistry = Partial<Record<VendorSystem, VendorLinkAdapter>>;

