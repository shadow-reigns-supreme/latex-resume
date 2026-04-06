import { test, expect } from '@playwright/test';

test.describe('navigation — resume pages', () => {
  test('resume nav has language links (EN, ES, TH) and Blog', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav.top-nav');
    await expect(nav.locator('a[href="/"]')).toBeVisible();
    await expect(nav.locator('a[href="/es/"]')).toBeVisible();
    await expect(nav.locator('a[href="/th/"]')).toBeVisible();
    await expect(nav.locator('a[href="/blog/"]')).toBeVisible();
  });

  test('current language has aria-current="page"', async ({ page }) => {
    await page.goto('/');
    const enLink = page.locator('nav.top-nav a[href="/"]');
    await expect(enLink).toHaveAttribute('aria-current', 'page');
  });

  test('ES page marks ES as current', async ({ page }) => {
    await page.goto('/es/');
    const esLink = page.locator('nav.top-nav a[href="/es/"]');
    await expect(esLink).toHaveAttribute('aria-current', 'page');
  });
});

test.describe('navigation — whitepaper/blog pages', () => {
  test('whitepaper nav has venture links and Blog', async ({ page }) => {
    await page.goto('/blog/');
    const nav = page.locator('nav.top-nav');
    await expect(nav.locator('a[href="/"]')).toBeVisible();
    await expect(nav.locator('a[href="/americanguntrader/"]')).toBeVisible();
    await expect(nav.locator('a[href="/dabdash/"]')).toBeVisible();
    await expect(nav.locator('a[href="/orderprepped/"]')).toBeVisible();
    await expect(nav.locator('a[href="/blog/"]')).toBeVisible();
  });

  test('Blog link has aria-current on /blog/', async ({ page }) => {
    await page.goto('/blog/');
    const blogLink = page.locator('nav.top-nav a[href="/blog/"]');
    await expect(blogLink).toHaveAttribute('aria-current', 'page');
  });

  test('venture page marks itself as current', async ({ page }) => {
    await page.goto('/americanguntrader/');
    const agtLink = page.locator('nav.top-nav a[href="/americanguntrader/"]');
    await expect(agtLink).toHaveAttribute('aria-current', 'page');
  });
});

test.describe('navigation — cross-page links', () => {
  test('resume footer links to blog', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.site-footer a[href="/blog/"]')).toBeVisible();
  });

  test('whitepaper footer links back to resume', async ({ page }) => {
    await page.goto('/blog/');
    await expect(page.locator('.site-footer a[href="/"]')).toBeVisible();
  });

  test('clicking Blog from resume navigates to /blog/', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav.top-nav a[href="/blog/"]').click();
    await page.waitForURL('**/blog/**');
    await expect(page.locator('h1.wp-title')).toContainText('Blog');
  });
});

test.describe('accessibility — focus and landmarks', () => {
  test('nav has aria-label', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav.top-nav');
    const label = await nav.getAttribute('aria-label');
    expect(label).toBeTruthy();
  });

  test('theme toggle has aria-label', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('.theme-toggle');
    await expect(toggle).toHaveAttribute('aria-label', 'Toggle theme');
  });

  test('headshot has alt text', async ({ page }) => {
    await page.goto('/');
    const img = page.locator('img.headshot');
    const alt = await img.getAttribute('alt');
    expect(alt).toBeTruthy();
  });

  test('venture logos have alt text', async ({ page }) => {
    await page.goto('/');
    const logos = page.locator('img.venture-logo');
    const count = await logos.count();
    for (let i = 0; i < count; i++) {
      const alt = await logos.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('all nav separators are aria-hidden', async ({ page }) => {
    await page.goto('/');
    const seps = page.locator('.nav-sep');
    const count = await seps.count();
    for (let i = 0; i < count; i++) {
      await expect(seps.nth(i)).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
