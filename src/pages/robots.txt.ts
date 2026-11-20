import type { APIContext } from 'astro';
import { config } from '../config';

// Generated at build time so the sitemap URL always follows siteUrl in src/config.ts.
export function GET(context: APIContext) {
  const sitemap = new URL('sitemap-index.xml', context.site ?? config.siteUrl).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
