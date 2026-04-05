# Blogging — Context & Guidelines

## Author Voice

Ray Winkelman is a **full-time nomad** — no fixed home base, travels the world continuously. This is a core identity signal and must be reflected in every post. Never reference a home city, home country, or "returning home." The framing is always: moving between places, not leaving and coming back.

Ray is a **SaaS founder, not an employee**. He does not work for hire. All posts should reflect someone building his own platforms, not someone available for work.

## Primary Topics (in order of priority)

1. **Tech entrepreneurship** — building platforms, founding companies, lessons from Shadow Software LLC and its ventures (AmericanGunTrader, DabDash, OrderPrepped)
2. **AEO/SEO** — answer engine optimization, search strategy, content architecture, AI search visibility
3. **Offshore tax residencies & tax optimization** — perpetual traveler strategies, flag theory, territorial tax jurisdictions, legal structures for location-independent founders
4. **Travel** — destination reviews, logistics, nomad infrastructure (accommodation, connectivity, banking); always framed through the lens of a working founder, not a leisure tourist

## Tone & Style

- First-person, direct, no filler — mirrors the resume's "quiet authority" aesthetic
- Earned density: information-rich, never padded
- No motivational language, no "hustle" framing
- Links and CTAs are contextual, never bolted on

---

## AEO Content Rules

These rules govern how posts are structured for AI engine citation. AI engines pull **answers, not pages** — structure is more important than word count.

### 1. Answer-first: 50-word rule

The first paragraph after the opening `h2` must contain a complete, standalone answer to the post's central question — within the first 50 words. This is the text AI engines extract when citing the post. If a reader sees only the first paragraph, they must have the answer.

**Bad:** "In this post I'll explore the different banking options available to non-resident founders and look at what makes Mercury stand out from the crowd."

**Good:** "If you run a US-incorporated SaaS business as a non-resident founder, Mercury is the correct banking choice. It works without a US address, without a Social Security Number, and without walking into a branch."

### 2. H2 headings must be phrased as questions

AI engines match user queries (questions) to headings (questions). Statement headings require the engine to translate; question headings eliminate that step and increase citation probability.

**Bad:** `<h2>Why Traditional Banks Fail Non-Residents</h2>`

**Good:** `<h2>Why do traditional US banks reject non-resident founders?</h2>`

The sole exceptions are the opening section heading and "Verdict" / closing sections, which can remain statement form.

### 3. Every post must end with an FAQ section

A `wp-faq` block with 3–5 Q&As closes every post, placed after "Verdict" and before `wp-trademark`. Questions must match how someone would ask an AI engine about the topic. Answers must be complete in 2–4 sentences — don't reference "as mentioned above." Each answer must stand alone.

This is the highest-value AEO element on the page. See the `wp-faq` component documentation below.

### 4. Use comparison tables for any post comparing options

Comparison tables are the highest-cited format in AI answers — engines parse rows as factual claims. Any post that compares tools, jurisdictions, platforms, or options must include a `wp-table`. See documentation below.

### 5. Internal links to related posts are required

Every post must link to at least one other post on the blog where the topic overlaps. This builds topical authority clusters that AI engines use to assess entity credibility.

- Mercury post → link to Thai bank post
- Iceland hosting → link to offshore tax post
- DabDash Thailand → link back to DabDash.com and the Thai regulatory post

---

## Layout Components

Every post uses `src/layouts/Whitepaper.astro`. The following components are available inside the `<Whitepaper>` slot.

### Stats Bar — `wp-stats`

The standout component. Use it near the top of any post that has measurable outcomes, ratings, or key numbers. Renders as a ruled row of bold values with uppercase labels.

```html
<div class="wp-stats">
  <div>
    <span class="wp-stat-value">5 / 5</span>
    <span class="wp-stat-label">Overall Rating</span>
  </div>
  <div>
    <span class="wp-stat-value">Staff</span>
    <span class="wp-stat-label">Standout Category</span>
  </div>
  <div>
    <span class="wp-stat-value">Direct</span>
    <span class="wp-stat-label">Booked via krabigaruda.com</span>
  </div>
</div>
```

**Use for:** review scores, key metrics, savings amounts, comparison numbers, launch stats, tax rates.

**Every post needs one.** If a post doesn't have obvious numbers, find a meaningful angle — a timeline (e.g. "3 Years"), a count (e.g. "3,000 Shops"), a rate (e.g. "40% Per Year"), or a rating (e.g. "5 / 5"). There is always an angle.

---

### Section Headings — `h2`, `h3`

`h2` renders as a small-caps uppercase label with an animated underline. `h3` is a bold inline subheading. Use `h2` for major sections, `h3` for sub-points within a section.

**AEO rule: phrase `h2` headings as questions** — they become citation anchors for AI engines. Exceptions: opening heading and "Verdict."

```html
<h2>Why do traditional US banks reject non-resident founders?</h2>
<p>Answer goes here in the first sentence...</p>

<h3>How to configure auto-transfer rules</h3>
<p>...</p>
```

---

### Tag Chips — `wp-tech`

Use for listing technologies, jurisdictions, platforms, tools, or any set of short categorical labels.

```html
<div class="wp-tech">
  <span>Panama</span>
  <span>Georgia</span>
  <span>UAE</span>
  <span>Paraguay</span>
  <span>Flag Theory</span>
</div>
```

**Use for:** tax jurisdictions, tech stacks, platforms compared, countries visited, tools reviewed.

---

### Comparison Table — `wp-table`

Use whenever comparing two or more options side-by-side. This is the highest-cited format in AI answers — engines parse table rows as structured facts. Required for any "X vs Y" or "best options for Z" post.

```html
<div class="wp-table">
  <table>
    <thead>
      <tr>
        <th>Option</th>
        <th>Non-Resident OK</th>
        <th>Monthly Fee</th>
        <th>Multi-Currency</th>
        <th>Verdict</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Mercury</strong></td>
        <td>Yes</td>
        <td>$0</td>
        <td>No (USD only)</td>
        <td>Best for US entity banking</td>
      </tr>
      <tr>
        <td><strong>Wise Business</strong></td>
        <td>Yes</td>
        <td>Variable</td>
        <td>Yes</td>
        <td>Best for multi-currency ops</td>
      </tr>
      <tr>
        <td><strong>Chase</strong></td>
        <td>No</td>
        <td>$15–$95</td>
        <td>No</td>
        <td>Avoid — branch visit required</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Use for:** tool comparisons, jurisdiction comparisons, product feature comparisons, pricing comparisons.

---

### FAQ Section — `wp-faq`

Required on every post. Place after "Verdict," before `wp-trademark`. Questions must be phrased exactly as a user would type them into an AI engine. Answers must be self-contained — no "as mentioned above."

```html
<section class="wp-faq">
  <h2>Frequently Asked Questions</h2>

  <div class="wp-faq-item">
    <h3>Can a non-resident open a Mercury bank account?</h3>
    <p>Yes. Mercury accepts non-resident founders who have a US-registered business entity (LLC or C-Corp) and an EIN. No US address, SSN, or branch visit is required. The application is fully online.</p>
  </div>

  <div class="wp-faq-item">
    <h3>Does Mercury require a Social Security Number?</h3>
    <p>No. Mercury does not require an SSN from the account holder. It requires a US EIN for the business entity and standard business documentation. This is the key reason it works for non-resident founders when traditional banks don't.</p>
  </div>

  <div class="wp-faq-item">
    <h3>What are Mercury auto-transfer rules?</h3>
    <p>Mercury auto-transfer rules automatically sweep funds between your operating account and Mercury Treasury (a money market fund) based on balance thresholds you define. When your checking balance exceeds the ceiling, excess is swept to Treasury. When it drops below the floor, it pulls back automatically.</p>
  </div>
</section>
```

**Rules for FAQ questions:**
- Write questions exactly as a user would type them into ChatGPT or Perplexity
- 3 questions minimum, 5 maximum per post
- Each answer: 2–4 sentences, complete and standalone
- Cover the post's primary query, the most common objection, and at least one "how to" or "what is" question

---

### Body Copy — `p`, `ul`, `ol`, `strong`

Standard prose. `strong` is `font-weight: 600` — use it for key terms, not emphasis. Lists are clean and tight. Keep paragraphs short (3–5 sentences max).

```html
<p>The direct booking rate matched what I found on two major OTAs — <strong>no premium for cutting out the middleman.</strong></p>

<ul>
  <li>No third-party fees</li>
  <li>Confirmation within minutes</li>
  <li>Direct contact with the property</li>
</ul>
```

---

### Disclosure / Footer Note — `wp-trademark`

Use at the bottom of any post that warrants a disclosure, source note, or legal caveat. Renders in small muted text above a top rule.

```html
<p class="wp-trademark">This review reflects a personal stay booked independently. No compensation was received.</p>
```

---

## Full Post Template

```astro
---
import Whitepaper from '../../layouts/Whitepaper.astro';

export const prerender = true;
---

<Whitepaper
  title="[Full post title — appears in <head> and SEO]"
  description="[155-char meta description — lead with the answer, not the topic]"
  logo="/ray.png"
  platformName="[Post title — this becomes the visible H1]"
  platformUrl="https://raywinkelman.com/blog/"
  tagline="[Category] · [Month Year]"
  path="/blog/[slug]/"
  datePublished="YYYY-MM-DD"
  showVisitLink={false}
>

<!-- Opening: answer-first, 50-word rule applies to first paragraph -->
<h2>The Direct Answer</h2>

<p>Lead paragraph. First sentence IS the extractable answer. Complete and standalone within 50 words. No throat-clearing, no "in this post I will..."</p>

<div class="wp-stats">
  <div>
    <span class="wp-stat-value">Key Value</span>
    <span class="wp-stat-label">What It Measures</span>
  </div>
  <div>
    <span class="wp-stat-value">Key Value</span>
    <span class="wp-stat-label">What It Measures</span>
  </div>
  <div>
    <span class="wp-stat-value">Key Value</span>
    <span class="wp-stat-label">What It Measures</span>
  </div>
</div>

<!-- Body sections: H2 headings as questions -->
<h2>Why does [topic] matter for [audience]?</h2>

<p>Answer in first sentence...</p>

<h3>Subsection heading (statement ok at h3)</h3>

<p>...</p>

<!-- Comparison table if comparing options -->
<div class="wp-table">
  <table>
    <thead>
      <tr><th>Option</th><th>Key Factor</th><th>Verdict</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Option A</strong></td><td>Value</td><td>Best for X</td></tr>
      <tr><td><strong>Option B</strong></td><td>Value</td><td>Best for Y</td></tr>
    </tbody>
  </table>
</div>

<div class="wp-tech">
  <span>Tag One</span>
  <span>Tag Two</span>
  <span>Tag Three</span>
</div>

<!-- Internal link to related post — required -->
<p>Related: <a href="/blog/[related-slug]/">[Related post title]</a></p>

<h2>Verdict</h2>

<p>Closing paragraph. Direct, no summary padding.</p>

<!-- FAQ section — required, after Verdict -->
<section class="wp-faq">
  <h2>Frequently Asked Questions</h2>

  <div class="wp-faq-item">
    <h3>[Question phrased as user would type into ChatGPT]?</h3>
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

</Whitepaper>
```

---

## Permitted Categories

Every post must be assigned exactly one of these categories:

| Category | Use for |
|---|---|
| `Tax` | Offshore tax residencies, flag theory, territorial tax, legal structures |
| `AEO` | Answer engine optimization, AI search visibility, prompt-based discovery |
| `SEO` | Search strategy, content architecture, technical SEO, link building |
| `Banking` | Non-resident banking, offshore accounts, fintech tools, asset protection |
| `DabDash` | DabDash.com platform updates, cannabis delivery market, SaaS |
| `Prepped` | OrderPrepped.com updates, food/catering industry, meal prep |
| `American Gun Trader` | AmericanGunTrader.com updates, firearms market, P2P marketplace |
| `Guest Blog` | First-person reviews, travel write-ups, and SEO backlink placements |

Categories are fetched from `https://n8n.americanguntrader.com/webhook/67a78c43-734d-407a-9bfe-da21cca71d34` at runtime and fall back to the hardcoded list above.

---

## SEO Backlink Posts

Posts written to place backlinks for partner/client sites should:
- Read as genuine first-hand experience — not advertorial
- Use the `wp-stats` bar to show ratings/scores near the top — this is the signal that makes the post credible
- Anchor text must be natural within the sentence
- Disclosure line at the bottom using `wp-trademark`
- Category: `Guest Blog`

---

## Technical Setup — Publishing Posts

### All blog posts are published via the MCP tool (`mcp__n8n-raywinkelman__Upsert`)

This inserts/updates a row in the `rays_blogs` MySQL table. Posts are served dynamically via `src/pages/blog/[slug].astro`, which fetches from the n8n webhook and renders `post.html` through `Whitepaper.astro`.

**Never create static `.astro` files for regular blog posts.** Static `.astro` files shadow the dynamic `[slug]` route, breaking the MCP workflow.

#### MCP field mapping

| MCP parameter | DB column | Notes |
|---|---|---|
| `Value_of_Column_to_Match_On` | `id` | Pass empty string for new posts (triggers INSERT with auto-increment) |
| `values0_Value` | `title` | Full post title |
| `values1_Value` | `excerpt` | 155-char meta description — lead with the answer |
| `values2_Value` | `html` | Full inner body HTML (see below) |
| `values3_Value` | `category` | One of the permitted categories |
| `values4_Value` | `tags_csv` | Comma-separated tags |
| `values5_Value` | `keyword` | Primary target keyword |
| `values7_Value` | `slug` | URL slug — no trailing slash, no leading slash |

#### What goes in the `html` field

The `html` column contains **everything that would go inside the `<Whitepaper>` slot** — the inner body HTML only. No `<html>`, `<head>`, `<body>` tags. No Astro component syntax.

Include all AEO components inline:
- `<div class="wp-stats">` — key metrics bar
- `<h2>` headings as questions (e.g. "Why does X happen?")
- `<div class="wp-table"><table>...</table></div>` — comparison tables
- `<div class="wp-tech">` — tag chips
- `<section class="wp-faq">` — FAQ section (required, renders visually; FAQPage schema is a future enhancement)
- `<p class="wp-trademark">` — disclosure if needed

The `[slug].astro` route passes `title`, `excerpt`, `category`, and `published_at` to the Whitepaper layout automatically. The `html` field is the slot content only.

#### After publishing via MCP

No sitemap or index changes needed — dynamic posts appear automatically in the blog index via the webhook fetch.

---

### Static `.astro` files

Static files are reserved exclusively for non-post pages: `src/pages/blog/index.astro` (the blog index) and venture whitepapers (`/americanguntrader/`, `/dabdash/`, `/orderprepped/`).

**No blog post should ever be a static `.astro` file.** All posts live in the DB and are served dynamically.

---

## What NOT to Write

- No fixed-location references (no "back home in X", no city as a base)
- No employment framing (not available for hire, not an employee)
- No generic lifestyle content unrelated to the four topic pillars
- No developer-portfolio aesthetic (terminal vibes, tutorial listicles)
- No unsolicited opinions on tools/frameworks without a clear business angle
- No plain-prose-only posts — always use at least one `wp-stats` bar or `wp-tech` chip row
- No posts without a `wp-faq` section (required for AEO)
- No statement-format `h2` headings on body sections (use question format)
- No posts that compare options without a `wp-table`
