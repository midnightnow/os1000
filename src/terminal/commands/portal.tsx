import { trackBreadcrumbNavigation } from '../../telemetry/ga4';

export function portalCommand(): string {
  trackBreadcrumbNavigation(
    window.location.pathname,
    'lunadarkside.com',
    'portal_command'
  );

  // Open Luna Darkside portal in same tab to maintain session continuity
  setTimeout(() => {
    window.location.href = 'https://luna-darkside.web.app/?utm_source=os1000&utm_medium=command&utm_campaign=portal_return';
  }, 1000);
  
  return `Returning to Luna Darkside portal...

🌙 Redirecting to the music catalog and artist hub.`;
}