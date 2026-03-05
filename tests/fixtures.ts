import { test as base, expect } from '@playwright/test';

// Define a custom fixture for a logged-in user
export const test = base.extend({
    loggedInPage: async ({ page }, use) => {
        // Navigate to login
        await page.goto('/login');

        // Perform login
        await page.getByTestId('auth-email-input').fill('john@example.com');
        await page.getByTestId('auth-password-input').fill('password123');
        await page.getByTestId('auth-submit-btn').click();

        // Wait for success and redirection
        await expect(page.getByTestId('login-success-view')).toBeVisible();
        await expect(page).toHaveURL('/dashboard');

        // Provide the page to the test
        await use(page);
    },
});

export { expect };
