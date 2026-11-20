import type { Post } from './posts';

/** The tag used for clinic visit write-ups. Its page is /tags/clinic-visits. */
export const DIARY_TAG = 'clinic visits';

/** "Clinic visits" -> "clinic-visits" */
export function tagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tagPath(tag: string): string {
  return `/tags/${tagSlug(tag)}`;
}

/** Map of tag slug -> { label, posts } for the given posts (keeps their order). */
export function groupByTag(posts: Post[]): Map<string, { label: string; posts: Post[] }> {
  const map = new Map<string, { label: string; posts: Post[] }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      const entry = map.get(slug) ?? { label: tag.trim(), posts: [] };
      if (!entry.posts.includes(post)) entry.posts.push(post);
      map.set(slug, entry);
    }
  }
  return map;
}
