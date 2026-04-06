# Code Conventions

## TypeScript

`tsconfig.json` extends `astro/tsconfigs/strict` with additional strictness:

| Option | Value | Effect |
|---|---|---|
| `noUnusedLocals` | true | Error on unused variables |
| `noUnusedParameters` | true | Error on unused function params |
| `noImplicitReturns` | true | All code paths must return |
| `noFallthroughCasesInSwitch` | true | Switch cases must break/return |
| `noUncheckedIndexedAccess` | true | Array/object access returns `T \| undefined` |
| `exactOptionalPropertyTypes` | true | No `undefined` for optional props |
| Path alias | `@/*` → `src/*` | Use `@/data/types` not `../../data/types` |

## ESLint

Run: `npm run lint` — **zero warnings tolerated** (`--max-warnings 0`).
Fix: `npm run lint:fix` (auto-fixable issues only).

### TypeScript rules (`.ts` files only, type-checked)

| Rule | Effect |
|---|---|
| `@typescript-eslint/await-thenable` | No awaiting non-Promises |
| `no-floating-promises` | All Promises must be awaited or `.catch()`'d |
| `no-misused-promises` | No Promises in boolean contexts |
| `no-unnecessary-type-assertion` | No `as Type` when already that type |
| `prefer-nullish-coalescing` | Use `??` not `\|\|` for null checks |
| `prefer-optional-chain` | Use `a?.b` not `a && a.b` |
| `consistent-type-imports` | Always `import type { Foo }` for type-only imports |

### Global rules (all files)

| Rule | Effect |
|---|---|
| `no-explicit-any` | No `any` type |
| `no-non-null-assertion` | No `!` postfix operator |
| `no-unused-vars` | Prefix with `_` to suppress: `_unused` |
| `no-empty` | Empty blocks forbidden except catch: `catch {}` allowed |

### SonarJS rules (`src/**`)

| Rule | Threshold |
|---|---|
| `cognitive-complexity` | Max 15 per function |
| `no-duplicate-string` | Max 4 occurrences (10 in `src/data/`) |
| `no-identical-functions` | No duplicate function bodies |
| `no-redundant-boolean` | No `x === true` |

### Unicorn rules (`src/**`)

| Rule | Effect |
|---|---|
| `no-for-loop` | Use `for...of` or array methods |
| `no-array-for-each` | Use `for...of` not `.forEach()` |
| `prefer-includes` | Use `.includes()` not `.indexOf() !== -1` |
| `prefer-string-slice` | Use `.slice()` not `.substring()` |
| `prefer-ternary` | Use ternary for simple if/else |
| `prefer-array-find` | Use `.find()` not filter+[0] |
| `prefer-array-flat-map` | Use `.flatMap()` not `.map().flat()` |
| `no-lonely-if` | No `if` as only statement in `else` |

## Astro-Specific

- `export const prerender = true` on pages that should be static — blog index and venture pages
- Blog post pages (`[slug].astro`) must NOT have `prerender` — they are SSR
- Type-checked rules only apply to `.ts` files, not `.astro` virtual script blocks
- Astro rule: `no-unused-define-vars-in-style` prevents dead CSS custom properties

## Pre-commit (lefthook)

Both run in parallel on every commit:

```yaml
typecheck: npm run typecheck  # tsc --noEmit
lint:      npm run lint       # eslint . --max-warnings 0
```

Either failure blocks the commit. Fix and re-stage — do not use `--no-verify`.

## Patterns to Follow

**Fetch in Astro frontmatter:**
```typescript
let data: Post[] = [];
try {
  const res = await fetch(url, { headers: { 'x-shadowmen': SECRET } });
  if (res.ok) {
    const json = await res.json();
    if (Array.isArray(json)) data = json as Post[];
  }
} catch {}  // empty catch is allowed by ESLint config
```

**Type-only imports:**
```typescript
import type { ResumeData } from '@/data/types';
```

**Array iteration (no for loops in src/):**
```typescript
for (const item of items) { ... }        // for...of OK
items.map(item => ...)                    // map OK
// NOT: for (let i = 0; i < ...; i++)    // banned
// NOT: items.forEach(item => ...)        // banned
```

**Nullish coalescing:**
```typescript
const val = input ?? 'default';   // correct
const val = input || 'default';   // error: prefer-nullish-coalescing
```
