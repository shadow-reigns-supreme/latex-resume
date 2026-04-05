import { test, expect, type Page } from '@playwright/test';

// Helper: clear localStorage and load a page fresh
async function freshPage(page: Page, url: string, colorScheme: 'light' | 'dark' = 'light') {
  await page.emulateMedia({ colorScheme });
  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

test.describe('theme toggle — existence', () => {
  test('toggle button is visible on the resume page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.theme-toggle')).toBeVisible();
  });

  test('toggle button is visible on the blog index page', async ({ page }) => {
    await page.goto('/blog/');
    await expect(page.locator('.theme-toggle')).toBeVisible();
  });
});

test.describe('theme toggle — behavior (light system preference)', () => {
  test('clicking toggle switches html[data-theme] to dark', async ({ page }) => {
    await freshPage(page, '/');
    await page.locator('.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('clicking toggle twice returns to light', async ({ page }) => {
    await freshPage(page, '/');
    const toggle = page.locator('.theme-toggle');
    await toggle.click();
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('clicking toggle on blog page switches to dark', async ({ page }) => {
    await freshPage(page, '/blog/');
    await page.locator('.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('theme toggle — behavior (dark system preference)', () => {
  test('clicking toggle switches html[data-theme] to light', async ({ page }) => {
    await freshPage(page, '/', 'dark');
    await page.locator('.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('clicking toggle twice returns to dark', async ({ page }) => {
    await freshPage(page, '/', 'dark');
    const toggle = page.locator('.theme-toggle');
    await toggle.click();
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('theme toggle — persistence across page reload', () => {
  test('dark theme survives a hard reload', async ({ page }) => {
    await freshPage(page, '/');
    await page.locator('.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('light override survives a hard reload under dark system preference', async ({ page }) => {
    await freshPage(page, '/', 'dark');
    await page.locator('.theme-toggle').click(); // dark → light
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});

test.describe('theme toggle — persistence across View Transition navigation', () => {
  test('dark theme set on resume persists after navigating to blog', async ({ page }) => {
    await freshPage(page, '/');
    await page.locator('.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.locator('a[href="/blog/"]').first().click();
    await page.waitForURL('**/blog/**');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('dark theme set on blog persists after navigating back to resume', async ({ page }) => {
    await freshPage(page, '/blog/');
    await page.locator('.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.locator('a[href="/"]').first().click();
    await page.waitForURL('/');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('theme toggle still works after navigating resume → blog → resume', async ({ page }) => {
    await freshPage(page, '/');

    // Navigate to blog
    await page.locator('a[href="/blog/"]').first().click();
    await page.waitForURL('**/blog/**');

    // Navigate back
    await page.locator('a[href="/"]').first().click();
    await page.waitForURL('/');

    // Toggle should still work — this is the core regression test
    await page.locator('.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.locator('.theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});
