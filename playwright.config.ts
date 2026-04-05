import { defineConfig, devices } from '@playwright/test';

// Run `npm run dev` before running tests.
// Playwright will reuse the existing server if already running.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false, // SPA state tests must run serially
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
});
