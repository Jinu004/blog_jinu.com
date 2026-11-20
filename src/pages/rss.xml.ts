import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { config } from '../config';
import { getPublishedPosts, postPath } from '../lib/posts';

// Published posts only: drafts are never in the feed, even in dev.
export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: config.siteName,
    description: config.tagline,
    site: context.site ?? config.siteUrl,
    // Match the site's URLs (no trailing slash, see trailingSlash in astro.config.mjs).
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
      categories: post.data.tags,
    })),
    customData: `<language>${config.lang.toLowerCase()}</language>`,
  });
}
