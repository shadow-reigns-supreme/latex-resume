# Design System

## CSS Design Tokens

Defined in `src/styles/global.css`. All components reference these vars — never hardcode colors.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f5f4f0` | `#141416` |
| `--text` | `#1c1b18` | `#e5e4e0` |
| `--text-muted` | `#71706b` | `#908f8a` |
| `--accent` | `#2d4a7a` | `#8ab0e2` |
| `--rule` | `#d5d4d0` | `#2c2c30` |
| `--max-w` | `40rem` | — |
| `--gutter` | `clamp(1.25rem, 5vw, 3rem)` | — |
| `--font` | `'Space Grotesk', 'Noto Sans Thai', sans-serif` | — |

Dark mode activates via `@media (prefers-color-scheme: dark)` then can be overridden by `html[data-theme="light|dark"]`.

## Typography

- Base size: `0.9375rem` (15px)
- Line-height: `1.65`
- Font: Space Grotesk 400/500/700 — loaded non-blocking via Google Fonts
- Thai pages also load Noto Sans Thai (same weights)
- `-webkit-font-smoothing: antialiased` + `text-rendering: optimizeLegibility`

## Layout

- Max width: `40rem` — applied to `body` directly
- Horizontal padding: `clamp(1.25rem, 5vw, 3rem)` — responsive gutter
- Vertical padding: `clamp(3rem, 12vh, 8rem) var(--gutter) 4rem`
- Content is centered via `margin: 0 auto` on body

## Animations

Two custom easing functions:
- `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` — fast-out, used for reveals and underline draws
- `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` — overshoot spring, used for logo hover

View transitions:
- Old page: 0.15s ease-out
- New page: 0.25s ease-out

All animations respect `prefers-reduced-motion` — disable with `animation: none !important` and `opacity: 1 !important`.

## Scroll Reveal

`.reveal` elements (resume sections, whitepaper content) use IntersectionObserver to fade in as they enter the viewport. JS adds `.visible` class. Without JS, elements are always visible (no `.js` class on `<html>`).

Whitepaper body children (`.wp-body > *`) have a staggered reveal with CSS `--wp-i` counter.

## Resume Components

| Class | Element | Purpose |
|---|---|---|
| `.name` | `h1` | Large uppercase name with letter-stagger animation |
| `.section-label` | `h2` | Small-caps uppercase section header with animated underline |
| `.role` | `article` | Experience entry with border-bottom rule |
| `.venture` | `article` | Venture card with left accent border, hover indent |
| `.edu` | `article` | Education entry |
| `.top-nav` | `nav` | Fixed top-right nav with scroll blur backdrop |
| `.theme-toggle` | `button` | Sun/moon icon button (icon shown based on current theme) |
| `.site-footer` | `footer` | Copyright + download button |

## Whitepaper Components

See `BLOGGING.md` for usage examples.

| Class | Element | Purpose |
|---|---|---|
| `.wp-header` | `header` | Platform logo + title + tagline + optional "Visit site" link |
| `.wp-hero` | `figure` | Featured image (1200×630 aspect ratio) |
| `.wp-body` | `main` | Post content wrapper |
| `.wp-stats` | `div` | Ruled row of bold metrics — required on every post |
| `.wp-tech` | `div` | Tag chip row (jurisdictions, tech stacks, platforms) |
| `.wp-table` | `div` | Scrollable comparison table wrapper |
| `.wp-faq` | `section` | FAQ accordion (HTML only, no JS collapse) |
| `.wp-faq-item` | `div` | Individual Q&A pair |
| `.wp-trademark` | `p` | Small muted disclosure line with top rule |
| `.cat-nav` | `nav` | Blog index category filter pills |
| `.cat-pill` | `button` | Individual filter pill (`.active` state) |
| `.blog-list` | `ul` | Post list |
| `.blog-item` | `li` | Post card with `data-category` for JS filtering |

## Print Styles

Both `global.css` and `whitepaper.css` include `@media print` blocks:
- Nav and footer hidden
- Body padding reduced to `0.5in 0.6in`
- Font size reduced to `9.5pt`
- All animations/transforms reset
- White background forced
- `break-inside: avoid` on roles and ventures
