// os1000/src/entry/referrer.ts
export function getSourceContext() {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  const ref = document.referrer;

  const fromLumina =
    utmSource === 'lunadarkside.com' ||
    (ref && /lunadarkside\.com$/i.test(new URL(ref).hostname));

  return { 
    fromLumina, 
    campaign: params.get('utm_campaign') ?? undefined, 
    content: params.get('utm_content') ?? undefined 
  };
}