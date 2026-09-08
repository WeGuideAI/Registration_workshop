// Abstract analytics interface.
// Plug in GA4, PostHog, Mixpanel etc. by implementing the track function below.

export type AnalyticsEvent =
  | 'page_view'
  | 'registration_form_started'
  | 'slot_selected'
  | 'registration_submitted'
  | 'registration_success'
  | 'registration_failure'

export interface AnalyticsProperties {
  slot_id?: string
  session_title?: string
  error_code?: string
  [key: string]: string | number | boolean | undefined
}

function track(event: AnalyticsEvent, properties?: AnalyticsProperties): void {
  if (typeof window === 'undefined') return

  // ── Plug in your analytics provider here ────────────────────────
  // Example — Google Analytics 4:
  //   window.gtag?.('event', event, properties)
  // Example — PostHog:
  //   window.posthog?.capture(event, properties)
  // ────────────────────────────────────────────────────────────────

  if (process.env.NODE_ENV === 'development') {
    console.debug('[Analytics]', event, properties ?? {})
  }
}

export const analytics = { track }
