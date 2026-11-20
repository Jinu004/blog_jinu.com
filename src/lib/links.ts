import { config } from '../config';

export interface SiteLink {
  label: string;
  href: string;
  /** Text shown on the contact page, e.g. the email address itself. */
  display: string;
  external: boolean;
}

const clean = (value: string | undefined) => (value ?? '').trim();
const digitsOnly = (value: string) => value.replace(/\D/g, '');

function receptionai(): SiteLink | null {
  const url = clean(config.links.receptionai);
  return url
    ? { label: 'ReceptionAI', href: url, display: url.replace(/^https?:\/\//, ''), external: true }
    : null;
}

function instagram(): SiteLink | null {
  const url = clean(config.links.instagram);
  return url
    ? { label: 'Instagram', href: url, display: url.replace(/^https?:\/\/(www\.)?/, ''), external: true }
    : null;
}

function email(): SiteLink | null {
  const address = clean(config.links.email);
  return address
    ? { label: 'Email', href: `mailto:${address}`, display: address, external: false }
    : null;
}

function whatsapp(): SiteLink | null {
  const number = digitsOnly(clean(config.links.whatsapp));
  return number
    ? { label: 'WhatsApp', href: `https://wa.me/${number}`, display: formatPhone(number), external: true }
    : null;
}

/** "919633207915" -> "+91 96332 07915" (Indian mobile); other numbers -> "+<digits>". */
function formatPhone(digits: string): string {
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}

export function getWhatsAppLink(): SiteLink | null {
  return whatsapp();
}

const present = (links: (SiteLink | null)[]) => links.filter((l): l is SiteLink => l !== null);

/** All links that have a value in the config. Empty values are left out. */
export function getLinks(): SiteLink[] {
  return present([receptionai(), instagram(), email(), whatsapp()]);
}

/** Only the ways to contact a person (email, WhatsApp, Instagram) that have a value. */
export function getContactMethods(): SiteLink[] {
  return present([email(), whatsapp(), instagram()]);
}

export function getReceptionAILink(): SiteLink | null {
  return receptionai();
}
