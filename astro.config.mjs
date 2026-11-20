// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { config } from './src/config.ts';

/**
 * Small rehype plugin for Markdown posts:
 * - every image must have non-empty alt text (the build fails otherwise),
 * - every image is lazy loaded and decoded asynchronously.
 */
function rehypeImageDefaults() {
  return (/** @type {any} */ tree, /** @type {any} */ file) => {
    /** @param {any} node */
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'img') {
        node.properties = node.properties || {};
        const alt = node.properties.alt;
        if (typeof alt !== 'string' || alt.trim() === '') {
          throw new Error(
            `Image "${node.properties.src}" in ${file?.path ?? 'a post'} has no alt text. ` +
              'Write it as ![a short description of the image](path/to/image.jpg).',
          );
        }
        if (!node.properties.loading) node.properties.loading = 'lazy';
        if (!node.properties.decoding) node.properties.decoding = 'async';
      }
      if (Array.isArray(node.children)) node.children.forEach(visit);
    };
    visit(tree);
  };
}

export default defineConfig({
  site: config.siteUrl,
  output: 'static',
  // URLs never end in a slash: /about, /blog, /blog/my-post.
  // build.format "file" writes about.html etc., which Cloudflare Pages serves at /about
  // without adding a slash, so the canonical URLs match what visitors see.
  trailingSlash: 'never',
  build: { format: 'file' },
  // The dev toolbar floats over the bottom of the page in `npm run dev`; turn it off
  // so the preview matches the real site.
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => !/\/404(\.html)?\/?$/.test(page),
    }),
  ],
  markdown: {
    // White site only: one light code theme (the CSS gives code blocks a light grey background).
    shikiConfig: {
      theme: 'github-light',
    },
    rehypePlugins: [rehypeImageDefaults],
  },
});
