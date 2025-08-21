// Google Analytics 4 Event Tracking for OS1000

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export interface EventParams {
  [key: string]: string | number | boolean;
}

export function trackVideoEvent(action: string, params: EventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'video',
      event_label: params.video_title || 'Unknown',
      custom_parameter_video_url: params.video_url,
      custom_parameter_embed_type: params.embed_type,
      ...params
    });
  }
}

export function trackCommandEvent(command: string, params: EventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'os1000_command_executed', {
      event_category: 'terminal',
      event_label: command,
      command_type: command,
      source: 'os1000',
      timestamp: Date.now(),
      ...params
    });
  }
}

export function trackPlayCommand(trackSlug: string, success: boolean, params: EventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'os1000_command_play', {
      event_category: 'music',
      event_label: trackSlug,
      track_slug: trackSlug,
      success: success,
      source: 'os1000',
      timestamp: Date.now(),
      ...params
    });
  }
}

export function trackBreadcrumbNavigation(fromPath: string, toPath: string, source: string = 'unknown') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'os1000_breadcrumb_click', {
      event_category: 'navigation',
      from_path: fromPath,
      to_path: toPath,
      source: source,
      timestamp: Date.now()
    });
  }
}

export function trackWelcomeCustomization(referralSource: string = 'direct') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'os1000_welcome_customized', {
      event_category: 'personalization',
      referral_source: referralSource,
      timestamp: Date.now()
    });
  }
}

// Generic event tracker for flexibility
export function gtagEvent(eventName: string, params: EventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      timestamp: Date.now(),
      source: 'os1000',
      ...params
    });
  }
}