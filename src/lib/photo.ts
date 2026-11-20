import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { config } from '../config';

/**
 * Returns the public path of the profile photo, or null when config.photo is empty
 * or the file does not exist in public/. Pages then show the monogram instead,
 * so the build never fails because of a missing photo.
 * Runs at build time only (static site), so reading the file system is fine.
 */
export function getPhoto(): string | null {
  const photo = (config.photo ?? '').trim();
  if (!photo || /^https?:\/\//i.test(photo)) return null;
  const path = photo.startsWith('/') ? photo : `/${photo}`;
  try {
    return existsSync(join(process.cwd(), 'public', path)) ? path : null;
  } catch {
    return null;
  }
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
