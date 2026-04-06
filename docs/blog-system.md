# Blog System

All posts live in a MySQL `rays_blogs` table, fetched via n8n webhooks. The blog is fully database-driven — **never create `.astro` files for blog posts**. Static files shadow the `[slug]` route and break the publish workflow.

## How It Works

```
                   Build time                      Request time
                   ──────────                      ────────────
blog/index.astro ──→ n8n webhook ──→ post list     blog/[slug].astro ──→ n8n webhook ──→ single post
                                        ↓                                                      ↓
                                    renders index                                       renders via
                                    (prerendered)                                       Whitepaper.astro
```

`blog/index.astro` is prerendered: it hits n8n at build time, gets the post list, and bakes the HTML. Individual post pages are SSR: each request hits n8n live.

## n8n Webhooks

All require header: `x-shadowmen: 508e7579-374c-47ec-9d6d-a024f9a65a89`

| Purpose | Method | URL |
|---|---|---|
| All posts (build-time) | GET | `https://n8n.americanguntrader.com/webhook/491d8b14-ea4f-48b1-bde4-d1136a023a41` |
| Categories (build-time) | GET | `https://n8n.americanguntrader.com/webhook/67a78c43-734d-407a-9bfe-da21cca71d34` |
| Single post by slug (SSR) | GET | `https://n8n.americanguntrader.com/webhook/8d5b7bc7-f6ac-4b6c-a8ff-77296fb40e6a?slug={slug}` |
| Upsert post | MCP | `mcp__n8n-raywinkelman__Upsert` |
| Featured image search | MCP | `mcp__n8n-raywinkelman__GetFeaturedImage` |
| Submit sitemap | MCP | `mcp__n8n-raywinkelman__SubmitSitemap` |

## `rays_blogs` Table Schema

| Column | Type | Notes |
|---|---|---|
| `id` | int auto-increment | Match key for upserts |
| `title` | varchar | Full post title |
| `excerpt` | text | ~155 char meta description |
| `html` | longtext | Inner body HTML (Whitepaper slot content) |
| `category` | varchar | One of 8 permitted categories |
| `tags_csv` | varchar | Comma-separated tags |
| `keyword` | varchar | Primary target keyword |
| `slug` | varchar | URL slug — no slashes |
| `image_url` | varchar | `/blog-img/{slug}.avif` |
| `lang` | varchar | Always `en-US` (hardcoded in n8n) |
| `published_at` | datetime | Auto-set to `NOW()` on every upsert |
| `created_at` | datetime | Auto-set to `NOW()` on every upsert |
| `updated_at` | datetime | Auto-set to `NOW()` on every upsert |

## MCP Upsert Field Mapping

Publish via `mcp__n8n-raywinkelman__Upsert`:

| Parameter | Column | Notes |
|---|---|---|
| `Value_of_Column_to_Match_On` | `id` | Empty string = INSERT; existing id string = UPDATE |
| `values0_Value` | `title` | |
| `values1_Value` | `excerpt` | ~155 chars, lead with the answer |
| `values2_Value` | `html` | Inner body HTML only — no `<html>`/`<head>`/`<body>`, no Astro syntax |
| `values3_Value` | `category` | See permitted categories in `BLOGGING.md` |
| `values4_Value` | `tags_csv` | |
| `values5_Value` | `keyword` | Primary keyword |
| `values7_Value` | `slug` | No leading or trailing slash |
| `values8_Value` | `image_url` | `/blog-img/{slug}.avif` |

**`values6` does not exist** — skip from 5 to 7.

**`replaceEmptyStrings: true`** is set in the n8n workflow. Passing an empty string for any field NULLs that column. On updates, always pass ALL fields with their current values, not just the ones changing.

## What Whitepaper.astro Derives Automatically

`[slug].astro` passes `featuredImage={'/blog-img/' + post.slug + '.avif'}` to the layout, which then:

- Preloads the AVIF with `fetchpriority="high"` as the LCP asset
- Renders a `<figure class="wp-hero">` hero between nav and content
- Sets `og:image` to the AVIF at 1200×630 with correct dimension meta tags
- Sets `twitter:card` to `summary_large_image`
- Includes a `ImageObject` with `width: 1200, height: 630` in the JSON-LD BlogPosting
- Hides the hero via `onerror` if the image file is missing (graceful fallback)

## Featured Images

Every post requires both `{slug}.avif` and `{slug}.webp` in `public/blog-img/`. Filename must match the slug exactly.

Process with ImageMagick:
```bash
magick input.jpg -resize 1200x630^ -gravity Center -extent 1200x630 -strip -quality 80 public/blog-img/{slug}.avif
magick input.jpg -resize 1200x630^ -gravity Center -extent 1200x630 -strip -quality 82 public/blog-img/{slug}.webp
```

## Publishing Workflow

The `/blog` skill in `.claude/commands/blog.md` handles the full workflow:

1. Write post HTML (inner body only — see `BLOGGING.md` for template and AEO rules)
2. Call `GetFeaturedImage` MCP with primary keyword + `"landscape"` orientation
3. Download, crop to 1200×630, export as AVIF + WebP
4. Call `Upsert` MCP with all fields
5. Post appears immediately at `/blog/{slug}/` — no rebuild needed

## Category Filter (Blog Index)

The blog index renders category filter pills. The "All" filter hides `Guest Blog` posts by default — they only appear when the "Guest Blog" pill is explicitly clicked. This is enforced client-side in `blog/index.astro`'s inline `<script>`.
