import { config } from '../config';
import { getPhoto } from './photo';
import { getReceptionAILink } from './links';

/**
 * Structured data (schema.org JSON-LD) that tells search engines who the site is about.
 * Only real values from src/config.ts are used; anything empty is left out.
 */

const site = new URL(config.siteUrl);
const abs = (path: string) => new URL(path, site).href;

export const PERSON_ID = abs('/#person');
export const WEBSITE_ID = abs('/#website');

export function personSchema() {
  const photo = getPhoto();
  const receptionai = getReceptionAILink();
  const sameAs = [config.links.instagram].map((v) => v.trim()).filter(Boolean);
  const [locality, region] = config.location.split(',').map((s) => s.trim());

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: config.author,
    url: abs('/'),
    description: config.shortBio,
    jobTitle: 'Founder',
    ...(photo ? { image: abs(photo) } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(locality ? { addressLocality: locality } : {}),
      ...(region ? { addressRegion: region } : {}),
      addressCountry: 'IN',
    },
    ...(receptionai
      ? { worksFor: { '@type': 'Organization', name: 'ReceptionAI', url: receptionai.href } }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Home page: the website plus the person it belongs to. */
export function homeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: abs('/'),
        name: config.siteName,
        description: config.tagline,
        inLanguage: config.lang,
        publisher: { '@id': PERSON_ID },
      },
      personSchema(),
    ],
  };
}

/** About page: a profile page about the person. */
export function aboutSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: abs('/about'),
    name: `About ${config.author}`,
    inLanguage: config.lang,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: personSchema(),
  };
}
