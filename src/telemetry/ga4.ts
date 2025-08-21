// os1000/src/telemetry/ga4.ts
declare global { interface Window { dataLayer: any[]; } }

export function gtagEvent(name: string, params: Record<string, any> = {}) {
  window.dataLayer = window.dataLayer || [];
  // @ts-ignore
  window.gtag?.('event', name, params);
}