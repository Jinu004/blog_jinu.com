import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { config } from '../config';

/**
 * Returns the site path ("/file.png") when the file exists in public/, otherwise null.
 * Runs at build time only (static site), so reading the file system is fine.
 */
export function publicFile(file: string): string | null {
  const name = (file ?? '').trim();
  if (!name || /^https?:\/\//i.test(name)) return null;
  const path = name.startsWith('/') ? name : `/${name}`;
  try {
    return existsSync(join(process.cwd(), 'public', path)) ? path : null;
  } catch {
    return null;
  }
}

/**
 * Returns the public path of the profile photo, or null when config.photo is empty
 * or the file does not exist in public/. Pages then show the monogram instead,
 * so the build never fails because of a missing photo.
 */
export function getPhoto(): string | null {
  return publicFile(config.photo ?? '');
}

/** "/favicon.png" when public/favicon.png exists, otherwise null (favicon.svg is used). */
export function getFaviconPng(): string | null {
  return publicFile('/favicon.png');
}

/** "Jinu Joy" -> "JJ" */
export function getInitials(): string {
  return config.author
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase())
    .slice(0, 2)
    .join('');
}
