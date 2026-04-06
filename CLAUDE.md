## Design Context

### Users
- **Recruiters & hiring managers** evaluating Ray for senior/executive engineering roles or contracts
- **Potential clients** considering Shadow Software LLC for engineering engagements
- Both audiences arrive expecting credibility, clarity, and proof of serious experience

### Brand Personality
- **Understated, authoritative, precise** — Swiss-design inspired minimalism
- Emotional goals: instant credibility, quiet confidence, respect for the visitor's time
- Ray is a founder/CEO with deep technical roots — the site should reflect someone who builds real things

### Ventures & CTAs
- Ray is the founder of **AmericanGuntrader.com**, **DabDash.com**, and **OrderPrepped.com**
- CTAs should feel organic and contextual, not salesy — integrated naturally into the resume narrative

### Aesthetic Direction
- **Minimal & refined** — restrained palette, generous whitespace, typographic hierarchy does the heavy lifting
- Light and dark modes via `prefers-color-scheme`, both equally considered
- Design tokens: `--accent: #2d4a7a` (light) / `#8ab0e2` (dark), `--bg: #f5f4f0` / `#141416`

### Anti-References (what this must NOT look like)
- Generic LinkedIn profile (headshot + timeline + endorsements)
- Developer portfolio template (dark mode, terminal aesthetic, card grids)
- Corporate consulting site (stock photos, blue gradients, buzzwords)
- Flashy startup landing page (hero sections, CTAs everywhere, animated illustrations)

### Design Principles
1. **Typography is the design** — hierarchy, weight, and spacing carry the visual identity
2. **Earned density** — information-rich but never cluttered; every element justifies its presence
3. **Quiet authority** — the design should feel like it was made by someone who doesn't need to prove anything
4. **Dual-purpose clarity** — a recruiter and a potential client should both find what they need within seconds
5. **Contextual commerce** — ventures and CTAs are woven into the narrative, never bolted on

---

## Author Profile

Ray Winkelman is a **full-time nomad and SaaS founder** — not an employee, not available for hire. Founder & CEO of Shadow Software LLC. No fixed home base — never reference a home city or "returning home." For full content rules, see `BLOGGING.md`.

---

## Docs

Detailed reference documentation lives in `docs/`:

| File | Contents |
|---|---|
| [`docs/architecture.md`](docs/architecture.md) | Tech stack, directory structure, page types, i18n routing, theme system, build |
| [`docs/blog-system.md`](docs/blog-system.md) | n8n webhooks, `rays_blogs` schema, MCP upsert field mapping, featured images, publish workflow |
| [`docs/design-system.md`](docs/design-system.md) | CSS tokens, typography, layout, animations, all component classes |
| [`docs/testing.md`](docs/testing.md) | Test setup, all test files, known post slugs, how to add tests for new posts |
| [`docs/code-conventions.md`](docs/code-conventions.md) | TypeScript strict options, ESLint rules, Unicorn/SonarJS rules, code patterns |

Blog content rules and publishing workflow: `BLOGGING.md`.
Blog publish skill: `.claude/commands/blog.md`.
