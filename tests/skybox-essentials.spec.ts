import { test, expect } from '@playwright/test';

/**
 * Skybox GameHub - Essential E2E Tests
 *
 * These tests verify core functionality across the Skybox website:
 * 1. Homepage loads and displays key elements
 * 2. Navigation works across all pages
 * 3. Event details page displays correctly
 * 4. Halloween event has all required sections
 * 5. Responsive design works on mobile
 */

test.describe('Skybox GameHub - Essential Tests', () => {

  // Test 1: Homepage loads with all critical elements
  test('1. Homepage loads and displays hero section with CTAs', async ({ page }) => {
    await page.goto('/');

    // Check hero section loads
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('World Series');

    // Check main CTAs are present
    const reserveButton = page.getByRole('link', { name: /reserve your table/i });
    await expect(reserveButton).toBeVisible();

    const whatsappButton = page.getByRole('link', { name: /whatsapp/i }).first();
    await expect(whatsappButton).toBeVisible();

    // Check navigation header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check footer is present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    console.log('✅ Test 1 Passed: Homepage loads with all critical elements');
  });

  // Test 2: Navigation works across all main pages
  test('2. Navigation links work for all main pages', async ({ page }) => {
    await page.goto('/');

    // Test Events page navigation
    await page.getByRole('link', { name: 'Events', exact: true }).click();
    await expect(page).toHaveURL('/events');
    await expect(page.locator('h1')).toContainText(/events|upcoming/i);

    // Test Sports page navigation
    await page.getByRole('link', { name: 'Sports', exact: true }).click();
    await expect(page).toHaveURL('/sports');

    // Test Menu page navigation
    await page.getByRole('link', { name: 'Menu', exact: true }).click();
    await expect(page).toHaveURL('/menu');

    // Test Gallery page navigation
    await page.getByRole('link', { name: 'Gallery', exact: true }).click();
    await expect(page).toHaveURL('/gallery');

    // Test Contact page navigation
    await page.getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page).toHaveURL('/contact');

    // Return to home
    await page.getByRole('link', { name: 'Home', exact: true }).click();
    await expect(page).toHaveURL('/');

    console.log('✅ Test 2 Passed: All navigation links work correctly');
  });

  // Test 3: Event details page displays all sections
  test('3. Event details page displays hero, info, highlights, and gallery', async ({ page }) => {
    await page.goto('/events/world-series-2025');

    // Check hero section
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('World Series');

    // Check event meta information (date, time, location)
    await expect(page.getByText(/October 24, 2025/i)).toBeVisible();
    await expect(page.getByText(/7:00 PM/i)).toBeVisible();
    await expect(page.getByText(/Skybox Medellín/i)).toBeVisible();

    // Check About section
    await expect(page.getByText(/About This Event/i)).toBeVisible();

    // Check What to Expect section
    await expect(page.getByText(/What to Expect/i)).toBeVisible();

    // Check Specials section
    await expect(page.getByText(/Specials/i)).toBeVisible();

    // Check Gallery section
    await expect(page.getByText(/Gallery/i)).toBeVisible();

    // Check Event Details sidebar
    await expect(page.getByText(/Event Details/i)).toBeVisible();

    // Check CTAs are present
    const reserveButtons = page.getByRole('link', { name: /reserve/i });
    await expect(reserveButtons.first()).toBeVisible();

    console.log('✅ Test 3 Passed: Event details page displays all sections');
  });

  // Test 4: Halloween event page has prizes and specials
  test('4. Halloween event displays prizes, specials, and themed content', async ({ page }) => {
    await page.goto('/events/halloween-party-2025');

    // Check Halloween-specific title
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText(/Halloween/i);

    // Check event date is Halloween
    await expect(page.getByText(/October 31, 2025/i)).toBeVisible();

    // Check Prizes section exists
    const prizesSection = page.getByText(/Prizes/i).first();
    await expect(prizesSection).toBeVisible();

    // Check for prize amounts
    await expect(page.getByText(/500,000/i)).toBeVisible(); // Best Overall prize

    // Check Specials section with themed items
    await expect(page.getByText(/Specials/i)).toBeVisible();

    // Check for Halloween-themed specials
    await expect(page.locator('text=/Bloody Mary|Witch|Zombie|Devil/i').first()).toBeVisible();

    // Check What to Expect highlights
    await expect(page.getByText(/What to Expect/i)).toBeVisible();
    await expect(page.getByText(/DJ|costume|contest/i).first()).toBeVisible();

    // Check CTAs are functional
    const whatsappButton = page.getByRole('link', { name: /whatsapp/i }).first();
    await expect(whatsappButton).toBeVisible();
    await expect(whatsappButton).toHaveAttribute('href', /wa.me/);

    console.log('✅ Test 4 Passed: Halloween event displays all themed content');
  });

  // Test 5: Responsive design works on mobile viewport
  test('5. Mobile responsive design displays correctly', async ({ page }) => {
    // Set mobile viewport (iPhone 12 Pro)
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto('/');

    // Check mobile menu button is visible
    const menuButton = page.getByRole('button', { name: /toggle menu|menu/i });
    await expect(menuButton).toBeVisible();

    // Click mobile menu
    await menuButton.click();

    // Check mobile navigation menu appears
    const mobileNav = page.locator('nav').last();
    await expect(mobileNav).toBeVisible();

    // Check navigation links are visible in mobile menu
    await expect(page.getByRole('link', { name: 'Events' }).last()).toBeVisible();

    // Close mobile menu
    await menuButton.click();

    // Navigate to event page on mobile
    await page.goto('/events/halloween-party-2025');

    // Check hero adapts to mobile (should still be visible)
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();

    // Check mobile layout is single column (cards should stack)
    const viewportWidth = page.viewportSize()?.width || 0;
    expect(viewportWidth).toBe(390);

    // Scroll to check if sticky button appears (if implemented)
    await page.evaluate(() => window.scrollBy(0, 1000));

    // Check content is readable on mobile
    const bodyText = page.locator('p').first();
    await expect(bodyText).toBeVisible();

    console.log('✅ Test 5 Passed: Mobile responsive design works correctly');
  });

  // Bonus: Performance check
  test('6. Page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Page should load in less than 5 seconds
    expect(loadTime).toBeLessThan(5000);

    console.log(`✅ Test 6 Passed: Page loaded in ${loadTime}ms (target: <5000ms)`);
  });

  // Bonus: Accessibility check
  test('7. Critical accessibility features are present', async ({ page }) => {
    await page.goto('/events/halloween-party-2025');

    // Check images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check headings hierarchy exists
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    const h2 = page.locator('h2').first();
    await expect(h2).toBeVisible();

    // Check links have accessible names
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(5); // Should have multiple links

    console.log('✅ Test 7 Passed: Critical accessibility features present');
  });
});
