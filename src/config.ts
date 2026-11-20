// Everything personal about the site lives in this one file.
// Pages and components read from here; nothing personal is hard-coded elsewhere.
//
// Rule for links: leave a value as an empty string ("") to hide it everywhere.
// Never put a placeholder here; an empty value is simply not shown.

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  author: string;
  location: string;
  tagline: string;
  shortBio: string;
  /** One-line author box under each post. */
  authorBlurb: string;
  intro: string;
  lang: string;
  ogLocale: string;
  /** Path (inside public/) of the default social sharing image. */
  ogImage: string;
  /** Path (inside public/) of a profile photo, or "" to show the "JJ" monogram. */
  photo: string;
  links: {
    /** Full URL, e.g. "https://receptionai.in" */
    receptionai: string;
    /** Full profile URL, e.g. "https://www.instagram.com/<handle>" */
    instagram: string;
    /** Plain email address, e.g. "name@domain" (shown as a mailto link) */
    email: string;
    /** WhatsApp number with country code, digits only, e.g. "91" followed by the number */
    whatsapp: string;
  };
}

export const config: SiteConfig = {
  siteName: 'Jinu Joy',

  // TODO: confirm the exact domain before deploying (no trailing slash).
  // This value is used for canonical URLs, the sitemap, RSS and robots.txt.
  siteUrl: 'https://jinujoy.com',

  author: 'Jinu Joy',
  location: 'Kochi, Kerala',

  tagline:
    'Building WhatsApp booking for small clinics in Kerala. Writing about what I learn from visiting them.',

  shortBio:
    'Engineering student and solo founder based in Kochi, Kerala. Building ReceptionAI, a WhatsApp assistant that answers patient messages and books appointments for small private clinics.',

  authorBlurb: 'Jinu Joy, Kochi. Building WhatsApp booking for small clinics.',

  intro:
    'I visit small clinics in person to learn how they handle bookings today, and I write down what I learn here. Short, plain notes from the field, written as I go.',

  lang: 'en-IN',
  ogLocale: 'en_IN',

  // Social sharing image. The SVG is a fallback so the build always works.
  // For proper link previews, put a 1200x630 PNG at public/og-default.png
  // and change this to '/og-default.png' (see README).
  ogImage: '/og-default.svg',

  // Profile photo. Put a square image (at least 640x640) in the public/ folder,
  // e.g. public/jinu.jpg, and set this to '/jinu.jpg'.
  // Leave it as '' (or if the file is missing) and a "JJ" monogram is shown instead.
  photo: '',

  links: {
    receptionai: 'https://receptionai.in',
    instagram: '',
    email: '',
    // 96332 07915 with India's country code (91). Used by the blog's WhatsApp button,
    // the footer and the Contact page. Set to '' to hide it everywhere.
    whatsapp: '919633207915',
  },
};
