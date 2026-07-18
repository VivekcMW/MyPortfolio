/**
 * Central site URL configuration.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in your host (Netlify → Site settings → Environment
 * variables) to the fully-qualified origin the site is actually served from.
 * Falls back to the current Netlify preview host so canonicals, sitemap, and
 * OG images always resolve — never to a non-existent domain.
 *
 * Examples:
 *   NEXT_PUBLIC_SITE_URL="https://vivekanand.dev"
 *   NEXT_PUBLIC_SITE_URL="https://uxvivek.netlify.app"
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://uxvivek.netlify.app"
).replace(/\/$/, "");

/** Cal.com / Calendly / other booking URL. Falls back to mailto on the contact page. */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "";
