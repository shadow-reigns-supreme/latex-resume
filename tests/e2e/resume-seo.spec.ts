import { test, expect } from '@playwright/test';

test.describe('resume SEO — English', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct canonical URL', async ({ page }) => {
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://raywinkelman.com/');
  });

  test('has meta description', async ({ page }) => {
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect((desc ?? '').length).toBeGreaterThan(50);
  });

  test('has og:type profile', async ({ page }) => {
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('profile');
  });

  test('has og:image pointing to ray.png', async ({ page }) => {
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toContain('ray.png');
  });

  test('has twitter:card summary', async ({ page }) => {
    const card = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(card).toBe('summary');
  });

  test('has hreflang alternates for en, es, th', async ({ page }) => {
    const en = await page.locator('link[hreflang="en"]').getAttribute('href');
    const es = await page.locator('link[hreflang="es"]').getAttribute('href');
    const th = await page.locator('link[hreflang="th"]').getAttribute('href');
    const xDefault = await page.locator('link[hreflang="x-default"]').getAttribute('href');

    expect(en).toContain('raywinkelman.com');
    expect(es).toContain('/es/');
    expect(th).toContain('/th/');
    expect(xDefault).toContain('raywinkelman.com');
  });

  test('has JSON-LD with WebSite, Organization, Person, FAQPage', async ({ page }) => {
    const ldJson = await page.locator('script[type="application/ld+json"]').textContent();
    expect(ldJson).toBeTruthy();
    const data = JSON.parse(ldJson as string);
    expect(data['@context']).toBe('https://schema.org');

    const types = data['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toContain('WebSite');
    expect(types).toContain('Organization');
    expect(types).toContain('Person');
    expect(types).toContain('FAQPage');
  });

  test('Person schema has correct name and jobTitle', async ({ page }) => {
    const ldJson = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(ldJson as string);
    const person = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'Person');
    expect(person.name).toBe('Ray Winkelman');
    expect(person.jobTitle).toBe('Founder & CEO');
  });

  test('FAQPage has at least 3 questions', async ({ page }) => {
    const ldJson = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(ldJson as string);
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(3);
  });

  test('robots meta allows indexing', async ({ page }) => {
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('index');
    expect(robots).toContain('follow');
  });
});

test.describe('resume SEO — Spanish (no JSON-LD)', () => {
  test('has correct canonical for /es/', async ({ page }) => {
    await page.goto('/es/');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('/es/');
  });

  test('no JSON-LD on non-English pages', async ({ page }) => {
    await page.goto('/es/');
    const ldScripts = page.locator('script[type="application/ld+json"]');
    await expect(ldScripts).toHaveCount(0);
  });
});
