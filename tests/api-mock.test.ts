import { test, expect } from '@playwright/test';

test.describe('Smart Travel Booking - API Mocking & Stubbing', () => {

    test('Mock hotel listing API and display custom results', async ({ page }) => {
        // Given: The user navigates to the hotel page, but the API response is intercepted and mocked
        await page.route('**/api/hotels', async route => {
            const json = [
                {
                    _id: 'mock-1',
                    name: 'Playwright Mock Hotel',
                    location: 'Virtual Desert',
                    price: 999,
                    image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=500&auto=format&fit=crop&q=60',
                    rating: 5.0,
                    description: 'This is a mocked API response for testing.'
                }
            ];
            await route.fulfill({ json });
        });

        // When: The user navigates to the hotels page
        await page.goto('/hotels');

        // Then: The mocked data should be displayed on the UI
        await expect(page.getByTestId('hotel-name-0')).toHaveText('Playwright Mock Hotel');
        await expect(page.getByTestId('hotel-grid')).toContainText('Virtual Desert');
        await expect(page.getByTestId('hotel-grid')).toContainText('$999');
        await expect(page.getByTestId('hotel-name-0')).toBeVisible();

        // Verification: Click on Book Now should open modal with mocked hotel details
        await page.getByTestId('book-hotel-btn-0').click();
        await expect(page.getByTestId('booking-modal')).toBeVisible();
        await expect(page.getByTestId('booking-modal')).toContainText('Playwright Mock Hotel');
    });

    test('Simulate server error and verify alert message', async ({ page }) => {
        // Given: The user navigates to the vehicle page, but the API fails with a 500 error
        await page.route('**/api/vehicles', route => route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Internal Server Error (Mocked)' })
        }));

        // When: The user visits the vehicles page
        await page.goto('/vehicles');

        // Then: An error message should be displayed to the user
        await expect(page.locator('div[role="status"]').first()).toContainText('Failed to load vehicles');
        await expect(page.getByTestId('vehicle-grid')).toBeEmpty();
    });

});
