/**
 * Meta Pixel helper utilities.
 *
 * Pixel ID: 1897063957630483
 *
 * This module:
 *  - Provides a safe `trackEvent()` wrapper so components can fire standard
 *    and custom pixel events without worrying about whether `fbq` is loaded.
 *  - Exports the raw init snippet as a string constant so the root shell can
 *    inject it via `dangerouslySetInnerHTML` without risk of copy-paste drift.
 */

export const META_PIXEL_ID = "1897063957630483";

/**
 * Full base-code snippet. Injected once in the document `<head>`.
 * Initialises the pixel and fires the initial PageView.
 */
export const META_PIXEL_INIT_SCRIPT = `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${META_PIXEL_ID}');
  fbq('track', 'PageView');
`;

/**
 * Noscript image URL for the fallback `<noscript>` tag.
 */
export const META_PIXEL_NOSCRIPT_SRC = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;

// ── Typed wrapper around the global fbq function ──

type FbqStandard =
  | "PageView"
  | "Lead"
  | "Contact"
  | "ViewContent"
  | "CompleteRegistration"
  | "InitiateCheckout"
  | "AddToCart"
  | "Purchase"
  | "Search"
  | "Schedule";

interface FbqFn {
  (method: "track", event: FbqStandard, params?: Record<string, unknown>): void;
  (method: "trackCustom", event: string, params?: Record<string, unknown>): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): void;
}

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

/**
 * Safely fire a Meta Pixel event. No-ops on the server or when `fbq` is not
 * yet available (e.g. blocked by ad-blocker).
 *
 * @example
 *   trackEvent("Lead", { content_name: "callback_form" });
 *   trackEvent("ViewContent", { content_name: "landing_page" });
 */
export function trackEvent(
  event: FbqStandard,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") {
    console.warn(`[MetaPixel] fbq not loaded — skipping "${event}"`);
    return;
  }
  window.fbq("track", event, params);
}

/**
 * Fire a custom (non-standard) pixel event.
 *
 * @example
 *   trackCustomEvent("FormOpen", { source: "hero_cta" });
 */
export function trackCustomEvent(
  event: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") {
    console.warn(`[MetaPixel] fbq not loaded — skipping custom "${event}"`);
    return;
  }
  window.fbq("trackCustom", event, params);
}
