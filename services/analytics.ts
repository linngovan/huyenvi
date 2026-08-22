declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// Maps this app's GA4 event names to their Meta Pixel equivalent. `standard: true` fires
// via fbq('track', ...) using one of Meta's recognized event names (better campaign
// optimization); otherwise fires via fbq('trackCustom', ...). `toMetaParams` reshapes this
// event's GA4 params into Meta's expected field names for standard events (match quality
// matters for optimization — passing e.g. `hexagram_name` verbatim as a custom field
// doesn't). Events not listed here (product_sheet_shown/dismissed, result_time_spent) are
// GA4-only — internal UI signals with no value for ad optimization.
const META_EVENT_MAP: Record<string, {
  name: string;
  standard?: boolean;
  toMetaParams?: (params?: Record<string, unknown>) => Record<string, unknown>;
}> = {
  click_xin_que: { name: 'ClickXinQue' },
  view_result: {
    name: 'ViewContent',
    standard: true,
    toMetaParams: (p) => ({
      content_name: p?.hexagram_name,
      content_category: 'kinh_dich',
      content_type: 'divination_result',
    }),
  },
  select_item: {
    name: 'InitiateCheckout',
    standard: true,
    toMetaParams: (p) => ({
      content_name: p?.product_name,
      content_category: p?.item_list_name,
      affiliate_link: p?.affiliate_link,
    }),
  },
  click_gieo_que_lai: { name: 'GieoQueLai' },
};

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  const meta = META_EVENT_MAP[eventName];
  if (meta && typeof window.fbq === 'function') {
    window.fbq(meta.standard ? 'track' : 'trackCustom', meta.name, meta.toMetaParams?.(params) ?? params);
  }
}
