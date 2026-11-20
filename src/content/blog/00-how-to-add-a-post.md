---
title: How to add a post
description: A note for the site owner on where posts live, what the frontmatter means, and how drafts work.
date: 2026-11-20
category: building-receptionai
tags: [meta]
draft: true
---

This post is a draft, so it is never published. You can read it while running `npm run dev`.

## Where posts go

Every post is one Markdown file in `src/content/blog/`. The file name becomes the address of the post. A number at the start of the file name is dropped, so it can be used to keep files in order:

```text
src/content/blog/01-my-first-clinic-pitch.md  ->  /blog/my-first-clinic-pitch
```

Use lowercase words joined by hyphens. Once a post is published, do not rename the file, or old links will break.

## The frontmatter

The block between the two `---` lines at the top of the file is the frontmatter. The build checks it and stops with an error if something is wrong.

```yaml
---
title: My first clinic pitch            # required
description: One or two sentences.      # required, at most 160 characters
date: 2026-11-20                        # required, YYYY-MM-DD
updated: 2026-12-01                     # optional, when you change a published post
tags: [clinics, whatsapp]               # optional
category: clinic-diaries                # optional: clinic-diaries (default), clinic-tips, building-receptionai
cover:                                  # optional; without it a green cover is drawn
  src: /images/front-desk.jpg           # a file in public/images/
  alt: Front desk of a small clinic     # required when there is a cover
featured: true                          # optional: pin as the big "Latest post" card on /blog
draft: true                             # optional, defaults to false
---
```

The description is the post's summary. It is used on the blog cards, the home page, the RSS feed and when the post is shared on social media.

The category decides which filter chip the post appears under on `/blog`. Reading time is worked out from the word count.

## Drafts

- `draft: true` keeps the post off the live site completely: no page, no list entry, no RSS, no sitemap.
- In `npm run dev` drafts are shown with a "Draft" badge so you can read them.
- To publish, change it to `draft: false` (or delete the line), set `date` to the publishing date, commit and push.

## Writing

Use `##` for section headings (the post title is already the main heading). Normal Markdown works: lists, links, **bold**, `code`, quotes and code blocks.

> A blockquote looks like this.

## Images

Put images next to the posts, for example in `src/content/blog/images/`, and link them with a relative path:

```md
![Front desk of a small clinic, with a phone and an appointment book](./images/front-desk.jpg)
```

The text in the square brackets is the alt text. It is required: the build fails if an image has none. Describe what the image shows for someone who cannot see it. Images placed this way are resized and given their width and height automatically, so the page does not jump while loading.
