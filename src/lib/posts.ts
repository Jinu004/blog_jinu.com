import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Drafts (draft: true) are shown only while running `npm run dev`, so the owner can
 * preview them. In `npm run build` they are excluded from every page, list, the RSS
 * feed and the sitemap, and their own page is not generated.
 */
const SHOW_DRAFTS = import.meta.env.DEV;

function sortNewestFirst(posts: Post[]): Post[] {
  return posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id),
  );
}

/** Posts for pages: published only in production, plus drafts in dev. Newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => SHOW_DRAFTS || data.draft !== true);
  return sortNewestFirst(posts);
}

/** Published posts only, always (used by the RSS feed). Newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  return sortNewestFirst(posts);
}

export function postPath(post: Post): string {
  return `/blog/${post.id}`;
}

/** Rough reading time at 200 words per minute, at least 1 minute. */
export function readingTime(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/** Dates in frontmatter are parsed as UTC midnight, so format in UTC to avoid off-by-one days. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
