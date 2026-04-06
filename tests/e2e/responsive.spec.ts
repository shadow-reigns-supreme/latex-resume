import { test, expect } from '@playwright/test';

test.describe('responsive — mobile viewport (375px)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('resume page loads and is scrollable', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1.name')).toBeVisible();
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    expect(bodyHeight).toBeGreaterThan(812);
  });

  test('nav is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav.top-nav')).toBeVisible();
  });

  test('venture cards are visible on mobile', async ({ page }) => {
    await page.goto('/');
    const ventures = page.locator('.venture');
    const count = await ventures.count();
    expect(count).toBeGreaterThanOrEqual(3);
    await expect(ventures.first()).toBeVisible();
  });

  test('blog index loads on mobile', async ({ page }) => {
    await page.goto('/blog/');
    await expect(page.locator('h1.wp-title')).toContainText('Blog');
    const items = page.locator('.blog-item:not([hidden])');
    expect(await items.count()).toBeGreaterThan(0);
  });

  test('blog post loads on mobile', async ({ page }) => {
    const res = await page.goto('/blog/claude-code-aeo-seo-tool/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1.wp-title')).toBeVisible();
  });
});

test.describe('responsive — tablet viewport (768px)', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('resume page renders all sections', async ({ page }) => {
    await page.goto('/');
    const labels = page.locator('.section-label');
    await expect(labels).toHaveCount(4);
  });

  test('venture whitepaper renders correctly', async ({ page }) => {
    await page.goto('/americanguntrader/');
    await expect(page.locator('h1.wp-title')).toBeVisible();
    await expect(page.locator('.wp-visit')).toBeVisible();
  });
});

test.describe('responsive — wide desktop (1920px)', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('content is constrained to max-width', async ({ page }) => {
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => {
      const body = document.querySelector('body');
      return body ? body.getBoundingClientRect().width : 0;
    });
    // max-w is 40rem = 640px at default font size
    expect(bodyWidth).toBeLessThanOrEqual(700);
  });
});
