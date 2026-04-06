# Testing

## Setup

Playwright E2E only — no unit tests. Chromium browser only. Tests run against the dev server (`npm run dev`).

```bash
npm run dev        # start dev server first (required)
npm run test       # run all tests headless
npm run test:ui    # run with Playwright UI (interactive)
npm run test:headed # run with visible browser
```

Config: `playwright.config.ts` — `baseURL: http://localhost:4321`, `reuseExistingServer: true`, `fullyParallel: false`.

## Test Files

| File | What it covers |
|---|---|
| `tests/e2e/resume-pages.spec.ts` | All 3 locales (/, /es/, /th/) load, correct `lang` attr, 4 sections render, headshot loads |
| `tests/e2e/resume-seo.spec.ts` | Canonical URLs, OG tags, hreflang alternates, JSON-LD (WebSite/Org/Person/FAQ), robots meta |
| `tests/e2e/venture-whitepapers.spec.ts` | All 3 ventures load, h1 visible, Visit link, wp-body has content, SEO meta, JSON-LD |
| `tests/e2e/blog-posts.spec.ts` | 16 known posts load at correct slug, featured images return 200, SEO (og:image, twitter:card, canonical, JSON-LD) |
| `tests/e2e/blog-filter.spec.ts` | Category filter default state, Guest Blog hidden, switching categories, aria-pressed state |
| `tests/e2e/theme-toggle.spec.ts` | Toggle exists, switches theme, persists across reload, persists across view transitions |
| `tests/e2e/navigation.spec.ts` | Nav links present, aria-current on active page, cross-page clicks, aria-labels, alt text |
| `tests/e2e/responsive.spec.ts` | Mobile (375px), tablet (768px), desktop (1920px) — content visible, max-width constrained |

## Known Slugs (blog-posts.spec.ts)

Update this array when new posts are published:

```typescript
const POSTS = [
  { slug: 'nuvion-peptides-canada-fast-shipping', title: 'Nuvion Peptides' },
  { slug: 'paraguay-tax-residency', title: 'Paraguay' },
  { slug: 'swiss-banking-for-founders', title: 'Swiss Banking' },
  { slug: 'thailand-tax-strategy-183-days', title: 'Thailand' },
  { slug: 'us-real-estate-depreciation', title: 'Real Estate Depreciation' },
  { slug: 'wyoming-nonresident-passthrough-llc', title: 'Wyoming' },
  { slug: 'panama-tax-residency', title: 'Panama' },
  { slug: 'uae-tax-residency', title: 'UAE' },
  { slug: 'renounce-canadian-tax-residency', title: 'Canadian Tax Residency' },
  { slug: 'claude-code-aeo-seo-tool', title: 'Claude Code' },
  { slug: 'mercury-bank-non-resident-saas-founders', title: 'Mercury' },
  { slug: 'expats-should-not-open-thai-bank-accounts', title: 'Thai Bank Account' },
  { slug: 'bali-founder-scene-is-theater', title: 'Bali' },
  { slug: 'iceland-hosting-high-risk-adjacent-tech', title: 'Iceland Hosting' },
  { slug: 'dabdash-for-thai-dispensaries', title: 'DabDash' },
  { slug: 'krabi-vacation-review', title: 'Krabi' },
];
```

## CI Behavior

`playwright.config.ts` sets `retries: process.env['CI'] ? 2 : 0` and `forbidOnly: !!process.env['CI']`. No GitHub Actions are currently configured — tests run manually.

## Adding Tests for New Posts

After publishing a new post via MCP, add the slug to the `POSTS` array in `tests/e2e/blog-posts.spec.ts`. The test will verify:
- Post loads at `/blog/{slug}/` (200 status, no redirect)
- Featured image exists at `/blog-img/{slug}.avif` (200 status, `content-type: avif`)
