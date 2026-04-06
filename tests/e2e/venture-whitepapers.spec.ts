import { test, expect } from '@playwright/test';

const VENTURES = [
  { path: '/americanguntrader/', name: 'AmericanGunTrader', expectedTitle: /AmericanGunTrader/i },
  { path: '/dabdash/', name: 'DabDash', expectedTitle: /DabDash/i },
  { path: '/orderprepped/', name: 'OrderPrepped', expectedTitle: /OrderPrepped/i },
];

test.describe('venture whitepapers — routing', () => {
  for (const venture of VENTURES) {
    test(`${venture.name} — loads at ${venture.path}`, async ({ page }) => {
      const res = await page.goto(venture.path);
      expect(res?.status()).toBe(200);
    });
  }
});

test.describe('venture whitepapers — content', () => {
  for (const venture of VENTURES) {
    test(`${venture.name} — has h1 title`, async ({ page }) => {
      await page.goto(venture.path);
      const title = page.locator('h1.wp-title');
      await expect(title).toBeVisible();
      await expect(title).toHaveText(venture.expectedTitle);
    });

    test(`${venture.name} — has Visit site link`, async ({ page }) => {
      await page.goto(venture.path);
      await expect(page.locator('.wp-visit')).toBeVisible();
    });

    test(`${venture.name} — has wp-body content`, async ({ page }) => {
      await page.goto(venture.path);
      const body = page.locator('.wp-body');
      await expect(body).toBeVisible();
      const text = await body.textContent();
      expect(text?.length).toBeGreaterThan(100);
    });
  }
});

test.describe('venture whitepapers — SEO', () => {
  for (const venture of VENTURES) {
    test(`${venture.name} — has canonical URL`, async ({ page }) => {
      await page.goto(venture.path);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toContain(venture.path);
    });

    test(`${venture.name} — has meta description`, async ({ page }) => {
      await page.goto(venture.path);
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc).toBeTruthy();
      expect((desc ?? '').length).toBeGreaterThan(20);
    });

    test(`${venture.name} — has JSON-LD structured data`, async ({ page }) => {
      await page.goto(venture.path);
      const ldJson = await page.locator('script[type="application/ld+json"]').textContent();
      expect(ldJson).toBeTruthy();
      const data = JSON.parse(ldJson as string);
      expect(data['@context']).toBe('https://schema.org');
      expect(data['@graph']).toBeDefined();
    });

    test(`${venture.name} — has og:title`, async ({ page }) => {
      await page.goto(venture.path);
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
    });
  }
});
