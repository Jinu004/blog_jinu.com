// Blog categories. The key is what you write in a post's frontmatter:
//   category: clinic-diaries
// The order here is the order of the filter chips on /blog.

export const CATEGORY_KEYS = ['clinic-diaries', 'clinic-tips', 'building-receptionai'] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export const CATEGORIES: Record<CategoryKey, { label: string; letter: string }> = {
  'clinic-diaries': { label: 'Clinic diaries', letter: 'D' },
  'clinic-tips': { label: 'Clinic tips', letter: 'T' },
  'building-receptionai': { label: 'Building ReceptionAI', letter: 'R' },
};

export function categoryLabel(key: CategoryKey): string {
  return CATEGORIES[key].label;
}

/** Link to the blog with this category filter applied. */
export function categoryHref(key: CategoryKey): string {
  return `/blog?category=${key}`;
}
