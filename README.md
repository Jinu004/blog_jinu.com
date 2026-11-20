# jinujoy-blog

Personal blog of Jinu Joy. A static site built with [Astro](https://astro.build): Markdown posts, an RSS feed and a sitemap, plain CSS, system fonts, no tracking, no cookies and no third-party requests.

This folder is separate from the ReceptionAI repo and should live in its own Git repository.

## What each file does

| Path | Purpose |
| --- | --- |
| `src/config.ts` | **Everything personal**: site name, domain, tagline, bio, intro and links. Edit this first. |
| `src/content.config.ts` | Defines the blog collection: where posts live, how slugs are made, and the frontmatter rules. |
| `src/content/blog/*.md` | The posts. One Markdown file per post. |
| `src/lib/posts.ts` | Loads posts, filters drafts, sorts newest first, reading time and date formatting. |
| `src/lib/links.ts` | Builds the list of links from the config and drops any that are empty. |
| `src/layouts/BaseLayout.astro` | The page shell every page uses: `<head>`, skip link, header, main, footer. |
| `src/components/BaseHead.astro` | Title, description, canonical URL, Open Graph, Twitter card, favicon, RSS link, JSON-LD. |
| `src/components/Header.astro` | Site name and main navigation. |
| `src/components/Footer.astro` | Links from the config, RSS link, copyright line. |
| `src/components/LinkList.astro` | A row of links from the config (used on home, post pages, footer). |
| `src/components/PostList.astro` | A list of posts (title, date, description). |
| `src/components/FormattedDate.astro` | A `<time>` element with a readable date. |
| `src/components/PostCard.astro` | One post as a card (title, date, reading time, description, first tag). |
| `src/components/EmptyPosts.astro` | The "First post coming soon" card shown when nothing is published. |
| `src/components/Avatar.astro` | Your photo with an accent ring, or the "JJ" monogram when there is no photo. |
| `src/components/BlogCard.astro` | Post card on the blog page and "More posts": cover, category, title, summary, date, reading time. |
| `src/components/FeaturedPost.astro` | The large "Latest post" card at the top of `/blog`. |
| `src/components/PostCover.astro` | The post's cover image, or a green gradient with a category icon drawn in code. |
| `src/components/WhatsAppCta.astro` | "Run a small clinic? Message me on WhatsApp." block (uses `links.whatsapp` and `links.receptionai`). |
| `src/lib/categories.ts` | The three blog categories and their labels (the filter chips on `/blog`). |
| `src/lib/photo.ts` | Checks that the photo in the config (and `public/favicon.png`) exist in `public/`; otherwise the monogram (and `favicon.svg`) is used. |
| `src/lib/tags.ts` | Tag slugs and grouping, and the "clinic visits" diary tag. |
| `src/pages/tags/[tag].astro` | One page per tag (`/tags/<tag>`), only for tags used by published posts. |
| `src/pages/index.astro` | Home page (`/`). |
| `src/pages/blog/index.astro` | Blog (`/blog`): search, category chips, featured post, post grid, "Load more", WhatsApp block. |
| `src/pages/blog/[slug].astro` | One page per post (`/blog/<slug>`): reading layout, progress bar, share row, author box, more posts. |
| `src/pages/about.astro` | About page (`/about`). |
| `src/pages/contact.astro` | Contact page (`/contact`), only shows methods that are set in the config. |
| `src/pages/404.astro` | "Page not found" page, also shown for a post address that does not exist. |
| `src/pages/rss.xml.ts` | RSS feed at `/rss.xml` (published posts only). |
| `src/pages/robots.txt.ts` | Generates `/robots.txt` (allow all, points to the sitemap) from the domain in the config. |
| `src/styles/global.css` | The only stylesheet. White theme, one green accent, normal-flow layout. |
| `public/favicon.svg` | "JJ" monogram icon, used when `public/favicon.png` does not exist. |
| `public/og-default.svg` | Default image used when a page is shared on social media. |
| `astro.config.mjs` | Astro settings: site URL, sitemap, URL style, code highlighting, image alt-text check. |
| `package.json` | Dependencies and the `dev`, `build` and `preview` scripts. |
| `tsconfig.json` | TypeScript settings for the editor. |
| `.node-version` | Tells Cloudflare Pages to use Node 22. |
| `.gitignore` | Keeps `node_modules`, `dist`, `.astro` and `.env*` files out of Git. |

The sitemap (`/sitemap-index.xml`) is created by the `@astrojs/sitemap` integration during the build.

## Change the config

Open `src/config.ts` and edit the values.

- `siteUrl`: confirm the exact domain (no trailing slash). It is used for canonical links, the sitemap, RSS and robots.txt.
- `links`: fill in `instagram` (full profile URL) and `email` (plain address) when you want them on the site. `whatsapp` is set to `919633207915` (91 + 96332 07915); it is used by the blog's WhatsApp button, the footer and the Contact page.
- `authorBlurb`: the one-line author box under each post.
- **Any link left as `""` is hidden everywhere.** Nothing shows until it has a real value.
- `photo`: see "Add your photo" below.

## Add your photo

1. Use a square photo, at least 640 × 640 pixels, and keep the file small (under about 200 KB; JPG or WebP).
2. Put it in the `public/` folder, for example `D:\jinujoy-blog\public\jinu.jpg`.
3. In `src/config.ts` set `photo: '/jinu.jpg'`.

It is used on the home page, the About page, the small round logo in the header and the "Written by" card under each post. While `photo` is empty, or if the file is not found, a green "JJ" monogram is shown instead and the build still works.

## Favicon and header photo

- **Tab icon:** put a square 128 × 128 PNG at `public/favicon.png` (keep it under 20 KB). When that file exists at build time, it is used as the browser tab icon and the Apple touch icon. Without it, `public/favicon.svg` (the "JJ" monogram) is used.
- **Header logo:** the small round logo next to the site name uses `photo` from `src/config.ts` (see "Add your photo" above), with the "JJ" monogram as the fallback.

## Categories, tags and the clinic visit diaries

Every post has one `category`: `clinic-diaries` (the default), `clinic-tips` or `building-receptionai`. On `/blog` the chips All, Clinic diaries, Clinic tips and Building ReceptionAI filter by it, and the search box filters by title and summary. A filter can be linked directly, for example `/blog?category=clinic-diaries`; the home page "Read the diaries" button uses that link.

Tags are optional extras. Each tag becomes a page at `/tags/<tag>` (for example `clinic visits` → `/tags/clinic-visits`), only when a published post uses it.

## Featured post

The large "Latest post" card on `/blog` is the newest published post. To pin a different one, add `featured: true` to its frontmatter (if several have it, the newest wins).

## Covers

Add a cover image with:

```yaml
cover:
  src: /images/front-desk.jpg
  alt: Front desk of a small clinic with an appointment book
```

Put the file in `public/images/`. Use a 16:9 image (for example 1200 × 675). Without a cover, a soft green cover with an icon for the category is drawn in code. A post's cover is also used as its social sharing image.

## Placeholder posts

`03-placeholder-…`, `04-placeholder-…` and `05-placeholder-…` in `src/content/blog/` exist only to judge the design. They are drafts (visible in `npm run dev` only) and contain no real facts. Replace or delete them.

## Look

The site is white only (no dark mode): white background, near-black text, light grey borders and one deep green accent (`#0d6b57`). Colours are set at the top of `src/styles/global.css`. No cookies or browser storage are used.

## Add a post

1. Create a file in `src/content/blog/`, for example `03-what-a-front-desk-told-me.md`. The address becomes `/blog/what-a-front-desk-told-me` (a leading number is dropped).
2. Start it with frontmatter:

   ```yaml
   ---
   title: What a front desk told me
   description: One or two sentences, at most 160 characters.
   date: 2026-12-01
   category: clinic-diaries
   tags: [clinics]
   draft: true
   ---
   ```

3. Write the post in Markdown below it. Use `##` for section headings.
4. Preview it with `npm run dev` (drafts show there with a "Draft" badge).
5. When it is ready, set `draft: false`, set `date` to the publishing day, then commit and push.

Rules checked by the build: `title`, `description` (max 160 characters) and `date` are required; `updated`, `category`, `cover`, `tags` and `draft` are optional. The description is the summary shown on cards, and reading time is calculated from the word count. Every image needs alt text: `![what the image shows](./images/photo.jpg)`. Keep images in `src/content/blog/images/` and use relative paths so Astro can size them.

The draft post `00-how-to-add-a-post.md` explains this too and can be read in dev mode.

**Drafts:** a post with `draft: true` is left out of the production build completely: home page, blog list, RSS, sitemap and its own page.

## Run it locally

You need Node.js 20 or newer (22 recommended).

```powershell
cd D:\jinujoy-blog
```

```powershell
npm install
```

```powershell
npm run dev
```

Then open the address it prints (usually `http://localhost:4321`).

To check the production version (drafts hidden):

```powershell
npm run build
```

```powershell
npm run preview
```

Astro's command-line tool sends anonymous usage data by default. The website itself does not. To turn the CLI telemetry off on your machine:

```powershell
npx astro telemetry disable
```

## Deploy to Cloudflare Pages

1. **Create a new, empty GitHub repository for this folder** (for example `jinujoy-blog`). Do **not** use the ReceptionAI repository.
2. Push this folder to it:

   ```powershell
   cd D:\jinujoy-blog
   ```

   ```powershell
   git init
   ```

   ```powershell
   git add .
   ```

   ```powershell
   git commit -m "First version of the blog"
   ```

   ```powershell
   git branch -M main
   ```

   ```powershell
   git remote add origin https://github.com/<your-github-username>/jinujoy-blog.git
   ```

   ```powershell
   git push -u origin main
   ```

3. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and pick the new repository.
4. Build settings:
   - Framework preset: Astro (or None)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - If Cloudflare asks for a Node version, add an environment variable `NODE_VERSION` = `22`. (The `.node-version` file already asks for 22.)
5. Deploy. You get a `*.pages.dev` address to check everything.
6. **Add the custom domain:** in the Pages project, open **Custom domains → Set up a custom domain** and enter the domain from `siteUrl`.

### DNS at BigRock

Pick one of these two options:

- **Option A: keep DNS at BigRock.** In BigRock's DNS management panel for the blog's domain, add the CNAME record exactly as Cloudflare shows it (name and target, usually your `*.pages.dev` address). Note: Cloudflare only allows a CNAME setup for a subdomain such as `www.jinujoy.com` or `blog.jinujoy.com`. For the bare domain (`jinujoy.com`) Cloudflare requires Option B.
- **Option B: move the domain's DNS to Cloudflare.** Add the domain as a site in Cloudflare, then in BigRock change that domain's nameservers to the two Cloudflare shows you. After it is active, connect the custom domain in Pages and Cloudflare creates the record for you. Before switching, copy across any existing records (for example email) that the domain already uses.

> **Warning: never touch the DNS records of `receptionai.in`.** Only change DNS for the blog's own domain. Editing `receptionai.in` records could take the ReceptionAI website, WhatsApp webhooks or email offline.

After every push to `main`, Cloudflare Pages rebuilds and publishes the site automatically.

## Social sharing image

Link previews on WhatsApp, Facebook, X and LinkedIn need a PNG or JPG; most of them ignore SVG.

1. Make a 1200 × 630 PNG (any image editor, or open `public/og-default.svg` in a browser and take a screenshot at that size).
2. Save it as `public/og-default.png`.
3. In `src/config.ts` change `ogImage` to `'/og-default.png'`.

Until then `public/og-default.svg` stays as the fallback, so the build always passes.
