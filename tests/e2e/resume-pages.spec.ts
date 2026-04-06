import { test, expect } from '@playwright/test';

test.describe('resume — English (/)', () => {
  test('loads with 200 status', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.status()).toBe(200);
  });

  test('renders Ray Winkelman heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1.name')).toContainText('Ray Winkelman');
  });

  test('renders all four sections', async ({ page }) => {
    await page.goto('/');
    const labels = page.locator('.section-label');
    await expect(labels).toHaveCount(4); // synopsis, ventures, experience, education
  });

  test('renders at least one venture card', async ({ page }) => {
    await page.goto('/');
    const ventures = page.locator('.venture');
    expect(await ventures.count()).toBeGreaterThanOrEqual(3);
  });

  test('renders at least one role', async ({ page }) => {
    await page.goto('/');
    const roles = page.locator('.role');
    expect(await roles.count()).toBeGreaterThanOrEqual(1);
  });

  test('renders education entries', async ({ page }) => {
    await page.goto('/');
    const edus = page.locator('.edu');
    expect(await edus.count()).toBeGreaterThanOrEqual(2);
  });

  test('headshot image loads', async ({ request }) => {
    const imgRes = await request.get('/ray.avif');
    expect(imgRes.status()).toBe(200);
  });

  test('has lang="en" on html element', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test.describe('resume — Spanish (/es/)', () => {
  test('loads with 200 status', async ({ page }) => {
    const res = await page.goto('/es/');
    expect(res?.status()).toBe(200);
  });

  test('renders Ray Winkelman heading', async ({ page }) => {
    await page.goto('/es/');
    await expect(page.locator('h1.name')).toContainText('Ray Winkelman');
  });

  test('has lang="es" on html element', async ({ page }) => {
    await page.goto('/es/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });

  test('renders all four sections', async ({ page }) => {
    await page.goto('/es/');
    const labels = page.locator('.section-label');
    await expect(labels).toHaveCount(4);
  });
});

test.describe('resume — Thai (/th/)', () => {
  test('loads with 200 status', async ({ page }) => {
    const res = await page.goto('/th/');
    expect(res?.status()).toBe(200);
  });

  test('renders Ray Winkelman heading', async ({ page }) => {
    await page.goto('/th/');
    await expect(page.locator('h1.name')).toContainText('Ray Winkelman');
  });

  test('has lang="th" on html element', async ({ page }) => {
    await page.goto('/th/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'th');
  });

  test('renders all four sections', async ({ page }) => {
    await page.goto('/th/');
    const labels = page.locator('.section-label');
    await expect(labels).toHaveCount(4);
  });
});
