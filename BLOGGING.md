# Blogging — Content Rules & Publishing Workflow

## Author Voice

Ray Winkelman is a **full-time nomad** — no fixed home base, moves continuously. Never reference a home city or "returning home."

Ray is a **SaaS founder, not an employee**. He builds platforms, doesn't take jobs. All posts reflect someone running his own businesses.

**Tone:** First-person, direct, no filler. Information-dense, never padded. No motivational language, no "hustle" framing.

---

## Topic Pillars (priority order)

1. **Tech entrepreneurship** — platform building, SaaS lessons, Shadow Software LLC and its ventures
2. **AEO/SEO** — answer engine optimization, search strategy, AI search visibility
3. **Offshore tax residencies** — flag theory, territorial tax, perpetual traveler strategies, legal structures
4. **Travel** — destination reviews, nomad logistics; always through a working-founder lens, never leisure tourism

---

## AEO Content Rules

AI engines pull **answers, not pages** — structure is more important than word count.

### 1. Answer-first (50-word rule)
The first paragraph after the opening `h2` must contain a complete, standalone answer to the post's central question — within 50 words. This is the text AI engines extract.

**Bad:** "In this post I'll explore the different banking options available to non-resident founders..."

**Good:** "If you run a US-incorporated SaaS business as a non-resident founder, Mercury is the correct banking choice. It works without a US address, without a Social Security Number, and without walking into a branch."

### 2. H2 headings must be questions
AI engines match user queries (questions) to headings (questions). Statement headings require the engine to translate; question headings eliminate that step.

**Bad:** `<h2>Why Traditional Banks Fail Non-Residents</h2>`

**Good:** `<h2>Why do traditional US banks reject non-resident founders?</h2>`

**Exceptions:** the opening section heading and "Verdict" / closing sections may be statement form.

### 3. FAQ section required on every post
A `wp-faq` block with 3–5 Q&As closes every post, placed after "Verdict" and before `wp-trademark`. Questions must match how someone would ask an AI engine. Answers must be 2–4 sentences, complete and standalone — never reference "as mentioned above."

### 4. Comparison table for any X-vs-Y post
Any post comparing tools, jurisdictions, platforms, or options must include a `wp-table`. This is the highest-cited format in AI answers.

### 5. Internal links required
Every post must link to at least one other post where topics overlap.

---

## Components Reference

All components are CSS classes applied to plain HTML — no Astro syntax in post content.

### Stats Bar — `wp-stats`
Required on every post. Key metrics rendered as a ruled row. If the post lacks obvious numbers, find an angle: timeline, count, rate, or rating.

```html
<div class="wp-stats">
  <div>
    <span class="wp-stat-value">5 / 5</span>
    <span class="wp-stat-label">Overall Rating</span>
  </div>
  <div>
    <span class="wp-stat-value">$0</span>
    <span class="wp-stat-label">Monthly Fee</span>
  </div>
  <div>
    <span class="wp-stat-value">Online</span>
    <span class="wp-stat-label">Application</span>
  </div>
</div>
```

### Section Headings — `h2`, `h3`
`h2` renders small-caps uppercase with an animated underline. Use for major sections — phrase as questions. `h3` is a bold inline subheading — statement form OK.

### Tag Chips — `wp-tech`
Short categorical labels: tech stacks, jurisdictions, platforms, countries.

```html
<div class="wp-tech">
  <span>Panama</span>
  <span>Flag Theory</span>
  <span>Territorial Tax</span>
</div>
```

### Comparison Table — `wp-table`
Required for any post comparing options. Highest-cited format in AI answers.

```html
<div class="wp-table">
  <table>
    <thead>
      <tr><th>Option</th><th>Non-Resident OK</th><th>Monthly Fee</th><th>Verdict</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Mercury</strong></td><td>Yes</td><td>$0</td><td>Best for US entity banking</td></tr>
      <tr><td><strong>Chase</strong></td><td>No</td><td>$15–$95</td><td>Avoid — branch required</td></tr>
    </tbody>
  </table>
</div>
```

### FAQ Section — `wp-faq`
Required on every post. After "Verdict," before `wp-trademark`.

```html
<section class="wp-faq">
  <h2>Frequently Asked Questions</h2>

  <div class="wp-faq-item">
    <h3>Can a non-resident open a Mercury bank account?</h3>
    <p>Yes. Mercury accepts non-resident founders with a US-registered business entity (LLC or C-Corp) and an EIN. No US address, SSN, or branch visit required. The application is fully online.</p>
  </div>

  <div class="wp-faq-item">
    <h3>Does Mercury require a Social Security Number?</h3>
    <p>No. Mercury requires a US EIN for the business entity, not an SSN from the account holder. This is why it works for non-resident founders when traditional banks don't.</p>
  </div>

  <div class="wp-faq-item">
    <h3>What are Mercury auto-transfer rules?</h3>
    <p>Mercury auto-transfer rules sweep funds between your operating account and Mercury Treasury based on balance thresholds you define. When your balance exceeds the ceiling, excess sweeps to Treasury. When it drops below the floor, it pulls back automatically.</p>
  </div>
</section>
```

**FAQ rules:** 3 minimum, 5 maximum. Cover the primary query, the most common objection, and at least one "how to" or "what is." Every answer stands alone.

### Disclosure — `wp-trademark`
Use at the bottom of posts that warrant a disclosure or legal caveat.

```html
<p class="wp-trademark">This review reflects a personal stay booked independently. No compensation was received.</p>
```

---

## Full Post HTML Template

The `html` DB column contains **inner body HTML only** — everything that goes inside the `<Whitepaper>` slot. No `<html>`, `<head>`, `<body>`. No Astro syntax.

```html
<!-- Opening: answer-first, 50-word rule on first paragraph -->
<h2>Opening Heading (statement form OK here)</h2>

<p>First sentence IS the extractable answer. Complete and standalone within 50 words. No throat-clearing.</p>

<div class="wp-stats">
  <div><span class="wp-stat-value">Value</span><span class="wp-stat-label">Label</span></div>
  <div><span class="wp-stat-value">Value</span><span class="wp-stat-label">Label</span></div>
  <div><span class="wp-stat-value">Value</span><span class="wp-stat-label">Label</span></div>
</div>

<!-- Body: H2 headings as questions -->
<h2>Why does [topic] matter for [audience]?</h2>

<p>Answer in first sentence...</p>

<h3>Subsection heading (statement OK at h3)</h3>

<p>...</p>

<!-- Comparison table if post compares options -->
<div class="wp-table">
  <table>
    <thead><tr><th>Option</th><th>Key Factor</th><th>Verdict</th></tr></thead>
    <tbody>
      <tr><td><strong>Option A</strong></td><td>Value</td><td>Best for X</td></tr>
      <tr><td><strong>Option B</strong></td><td>Value</td><td>Best for Y</td></tr>
    </tbody>
  </table>
</div>

<div class="wp-tech">
  <span>Tag One</span>
  <span>Tag Two</span>
</div>

<!-- Internal link — required -->
<p>Related: <a href="/blog/[related-slug]/">[Related post title]</a></p>

<h2>Verdict</h2>

<p>Closing paragraph. Direct, no summary padding.</p>

<!-- FAQ — required, after Verdict -->
<section class="wp-faq">
  <h2>Frequently Asked Questions</h2>
  <div class="wp-faq-item">
    <h3>[Question as a user would type it into ChatGPT]?</h3>
    <p>Complete standalone answer in 2–4 sentences.</p>
  </div>
  <div class="wp-faq-item">
    <h3>[Second question]?</h3>
    <p>Complete standalone answer.</p>
  </div>
  <div class="wp-faq-item">
    <h3>[Third question]?</h3>
    <p>Complete standalone answer.</p>
  </div>
</section>

<p class="wp-trademark">Disclosure line if applicable.</p>
```

---

## Permitted Categories

Exactly one per post:

| Category | Use for |
|---|---|
| `Tax` | Offshore tax residencies, flag theory, territorial tax, legal structures |
| `AEO` | Answer engine optimization, AI search visibility, prompt-based discovery |
| `SEO` | Search strategy, content architecture, technical SEO, link building |
| `Banking` | Non-resident banking, offshore accounts, fintech tools, asset protection |
| `DabDash` | DabDash.com updates, cannabis delivery market, SaaS |
| `Prepped` | OrderPrepped.com updates, food/catering industry, meal prep |
| `American Gun Trader` | AmericanGunTrader.com updates, firearms market, P2P marketplace |
| `Guest Blog` | First-person reviews, travel write-ups, SEO backlink placements |

`Guest Blog` posts are hidden from the blog index by default — only shown when the "Guest Blog" filter pill is clicked.

---

## Guest Blog / Backlink Posts

Posts written for SEO backlinks should:
- Read as genuine first-hand experience — not advertorial
- Use `wp-stats` near the top to show ratings/scores (makes the post credible)
- Use natural anchor text within the sentence
- Include a disclosure at the bottom using `wp-trademark`
- Category: `Guest Blog`

---

## Publishing Workflow

All posts are published via the `/blog` skill (`.claude/commands/blog.md`). The full steps are there. Summary:

### 1. Write the post
HTML only — the inner body template above. Determine the `slug` (lowercase, hyphenated, no slashes).

### 2. Fetch + process featured image
Every post requires a featured image. Call `GetFeaturedImage` MCP with the primary keyword and `"landscape"` orientation. Process to exactly **1200×630 px** as AVIF + WebP:

```bash
magick input.jpg -resize 1200x630^ -gravity Center -extent 1200x630 -strip -quality 80 public/blog-img/{slug}.avif
magick input.jpg -resize 1200x630^ -gravity Center -extent 1200x630 -strip -quality 82 public/blog-img/{slug}.webp
```

Filename must match slug exactly. Both files must exist before publishing.

### 3. Publish via MCP Upsert

See `CLAUDE.md` for the full field mapping table. Key points:
- `Value_of_Column_to_Match_On`: empty string for new posts
- `values2_Value`: the inner body HTML only
- `values8_Value`: `/blog-img/{slug}.avif`
- Never pass an empty string for any field you want to preserve (`replaceEmptyStrings: true` destroys content)

Posts appear at `/blog/{slug}/` immediately after upsert — no rebuild needed.

### Static `.astro` files
Reserved exclusively for `src/pages/blog/index.astro` and the three venture whitepapers. **No blog post should ever be a static `.astro` file.**

---

## What NOT to Write

- Fixed-location references ("back home in X", a city as a base)
- Employment framing (not available for hire, not an employee)
- Generic lifestyle content outside the four topic pillars
- Developer-portfolio aesthetic (terminal vibes, tutorial listicles)
- Unsolicited opinions on tools/frameworks without a clear business angle
- Plain-prose-only posts — every post needs at least one `wp-stats` or `wp-tech`
- Posts without a `wp-faq` section
- Statement-format `h2` headings on body sections (use question format)
- Posts that compare options without a `wp-table`
