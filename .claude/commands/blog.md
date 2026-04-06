You are writing and publishing a blog post for raywinkelman.com. Follow every rule in BLOGGING.md exactly. This skill covers the full workflow from writing to image to publish.

## Step 1 — Write the post

Follow all rules from BLOGGING.md:
- Author voice: full-time nomad, SaaS founder, not for hire
- 50-word answer-first rule on first paragraph
- H2 headings as questions (except opening and Verdict)
- Required: `wp-stats`, `wp-faq`, internal link
- Required for comparisons: `wp-table`
- One permitted category

Determine the `slug` (lowercase, hyphenated, no leading/trailing slash).

## Step 2 — Fetch the featured image

Call `GetFeaturedImage` with:
- `parameters0_Value`: the post's primary keyword (e.g. "mercury bank non-resident")
- `parameters2_Value`: `"landscape"`

The tool returns JSON. Parse `response[0].photos[0].src.large2x` for the download URL.

## Step 3 — Download, crop, and compress

```bash
mkdir -p /home/shadow/Source/raywinkelman.com/public/blog-img

curl -L -o /tmp/blog_featured_raw.jpg "{LARGE2X_URL}"

# AVIF (primary)
magick /tmp/blog_featured_raw.jpg \
  -resize 1200x630^ -gravity Center -extent 1200x630 \
  -strip -quality 80 \
  /home/shadow/Source/raywinkelman.com/public/blog-img/{SLUG}.avif

# WebP (fallback)
magick /tmp/blog_featured_raw.jpg \
  -resize 1200x630^ -gravity Center -extent 1200x630 \
  -strip -quality 82 \
  /home/shadow/Source/raywinkelman.com/public/blog-img/{SLUG}.webp

rm /tmp/blog_featured_raw.jpg
ls -lh /home/shadow/Source/raywinkelman.com/public/blog-img/{SLUG}.*
```

Verify both files exist before continuing.

## Step 4 — Publish via MCP

**Actual column mapping** (verified — do not deviate):

| Parameter | DB column | Value |
|---|---|---|
| `Value_of_Column_to_Match_On` | `id` | `""` for new post (INSERT), existing id string for UPDATE |
| `values0_Value` | `title` | Full post title |
| `values1_Value` | `excerpt` | 155-char excerpt — lead with the answer |
| `values2_Value` | `html` | Full inner body HTML (slot content only) |
| `values3_Value` | `category` | One permitted category |
| `values4_Value` | `tags_csv` | Comma-separated tags |
| `values5_Value` | `keyword` | Primary keyword |
| `values7_Value` | `slug` | URL slug — no leading/trailing slash |
| `values8_Value` | `image_url` | `/blog-img/{slug}.avif` — matches the file saved in Step 3 |

**Note**: `lang` is hardcoded to `en-US` in the n8n workflow — no parameter needed. Timestamps (`published_at`, `created_at`, `updated_at`) are auto-generated.

## Image rules

- **Always** call `GetFeaturedImage` — no post ships without a featured image
- **Always** process to exactly **1200×630 px**
- **Always** produce both `.avif` and `.webp` in `public/blog-img/`
- Image is served at `/blog-img/{slug}.avif` — filename must match slug exactly
- Never use external image URLs

## What the layout does automatically

`Whitepaper.astro` derives the image path as `/blog-img/{slug}.avif` and:
- Preloads the AVIF with `fetchpriority="high"` as the LCP asset
- Renders a `<figure class="wp-hero">` hero (1200×630) between header and content
- Sets `og:image` to 1200×630 with correct dimensions
- Sets `twitter:card` to `summary_large_image`
- Includes `ImageObject` with width/height in JSON-LD `BlogPosting`
- Hides the hero automatically if the image file is missing (`onerror`)
