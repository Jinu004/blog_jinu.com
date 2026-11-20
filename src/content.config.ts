import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_KEYS } from './lib/categories';

// Posts are Markdown files in src/content/blog/.
// The URL slug is the file name without ".md" and without a leading number prefix:
//   01-my-first-clinic-pitch.md  ->  /blog/my-first-clinic-pitch
const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.md',
    generateId: ({ entry }) =>
      (entry.split('/').pop() ?? entry)
        .replace(/\.md$/i, '')
        .replace(/^\d+[-_]/, '')
        .toLowerCase(),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Pin this post as the large "Latest post" card on /blog (newest pinned post wins).
    featured: z.boolean().default(false),
    // One of: clinic-diaries, clinic-tips, building-receptionai (see src/lib/categories.ts)
    category: z.enum(CATEGORY_KEYS).default('clinic-diaries'),
    // Optional cover image in public/, e.g. { src: /images/front-desk.jpg, alt: "..." }.
    // Without it, a green cover is drawn in code.
    cover: z
      .object({
        src: z.string().min(1),
        alt: z.string().min(1, 'A cover image needs alt text'),
      })
      .optional(),
  }),
});

export const collections = { blog };
