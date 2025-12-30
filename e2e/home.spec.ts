import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('should load correctly and display hero title', async ({ page }) => {
        await page.goto('/');

        // Check for the personalized title we verified earlier
        await expect(page.getByRole('heading', { name: 'Building the Future of AI & Web' })).toBeVisible();
        await expect(page.getByText('Creative Technologist & AI Specialist')).toBeVisible();
    });

    test('should have working navigation to projects', async ({ page }) => {
        await page.goto('/');

        // Click the "View My Work" button
        await page.getByRole('link', { name: 'View My Work' }).click();

        // Should scroll to projects section (url might contain #projects)
        // Or we verify the projects heading is visible
        await expect(page.getByRole('heading', { name: 'Featured Projects' })).toBeVisible();
    });

    test('should display project cards with correct titles', async ({ page }) => {
        await page.goto('/');

        // Verify our specific personalized projects are there
        await expect(page.getByText('Enterprise AI Voice Assistant')).toBeVisible();
        await expect(page.getByText('Immersive 3D Commerce Platform')).toBeVisible();
    });

    test('mobile menu should toggle', async ({ page, isMobile }) => {
        if (!isMobile) test.skip();

        await page.goto('/');

        // Mobile menu specific locator (assuming it's the one in the fixed full-screen overlay)
        const mobileNavInfo = page.locator('nav').filter({ hasText: 'Home' }).last();
        // .last() is a bit risky, better to use strict visibility or specific parent class
        // Looking at navbar.tsx, the mobile menu is in a fixed container.
        // Let's rely on visibility.

        // Check that NO visible Home link exists initially (desktop hidden, mobile closed)
        await expect(page.getByRole('link', { name: 'Home' })).not.toBeVisible();

        // Open menu
        await page.getByLabel('Toggle menu').click();

        // Check that a visible Home link now exists
        await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

        // Click it
        await page.getByRole('link', { name: 'Projects' }).click();

        // Should NOT be visible again (menu closed)
        await expect(page.getByRole('link', { name: 'Home' })).not.toBeVisible();
    });
});
