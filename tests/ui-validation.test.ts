import { test, expect } from '@playwright/test';

test.describe('Smart Travel Booking - UI Validation & Responsiveness', () => {

    test('Verify home page title and hero section elements', async ({ page }) => {
        // Given: The user visits the home page
        await page.goto('/');

        // Then: The page title should be correct
        await expect(page).toHaveTitle(/Vite \+ React/); // Adjust this once we change the HTML title

        // Check for hero elements
        await expect(page.getByTestId('hero-title')).toBeVisible();
        await expect(page.getByTestId('hero-title')).toContainText('Your Journey');
        await expect(page.getByTestId('search-location-input')).toHaveAttribute('placeholder', 'Where are you going?');
        await expect(page.getByTestId('search-hero-btn')).toBeEnabled();
    });

    test('Validate navigation menu links and active states', async ({ page }) => {
        // Given: The user visits the home page
        await page.goto('/');

        // When: The user clicks on the 'Hotels' link in the navbar
        await page.getByTestId('nav-hotels').click();

        // Then: The URL should change and the hotel page title should be present
        await expect(page).toHaveURL('/hotels');
        await expect(page.getByTestId('hotel-page-title')).toBeVisible();

        // When: The user clicks on the 'Vehicles' link in the navbar
        await page.getByTestId('nav-vehicles').click();

        // Then: The URL should change to vehicles
        await expect(page).toHaveURL('/vehicles');
        await expect(page.getByTestId('vehicle-page-title')).toBeVisible();

        // When: The user clicks on the logo
        await page.getByTestId('navbar-logo').click();

        // Then: It should navigate back home
        await expect(page).toHaveURL('/');
    });

    test('Check mobile toggle visibility on small screens', async ({ page }) => {
        // Given: The browser viewport is set to a mobile size
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // Then: The mobile menu toggle should be visible instead of desktop links
        await expect(page.locator('button:has(svg[class*="lucide-menu"])')).toBeVisible();
        await expect(page.getByTestId('nav-hotels')).not.toBeVisible();

        // When: The user clicks the menu button
        await page.locator('button:has(svg[class*="lucide-menu"])').click();

        // Then: Mobile menu items should be displayed
        await expect(page.getByText('Home', { exact: true })).toBeVisible();
        await expect(page.getByText('Hotels', { exact: true })).toBeVisible();
    });

});
