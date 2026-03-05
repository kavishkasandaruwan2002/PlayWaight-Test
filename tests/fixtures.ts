import { test as base, expect, type Page } from '@playwright/test';

type MyFixtures = {
    loggedInPage: Page;
};

// Define a custom fixture for a logged-in user
export const test = base.extend<MyFixtures>({
    loggedInPage: async ({ page }, use) => {
        console.log('Fixture: Navigating to /login');
        await page.goto('/login');
        console.log('Fixture: Filling credentials');
        await page.getByTestId('auth-email-input').fill('john@example.com');
        await page.getByTestId('auth-password-input').fill('password123');
        console.log('Fixture: Clicking login');
        await page.getByTestId('auth-submit-btn').click();

        // Wait for success and redirection
        await expect(page).toHaveURL('/dashboard');
        await expect(page.getByTestId('dashboard-title')).toBeVisible();
        await expect(page.getByTestId('login-success-view')).toBeVisible();

        // Provide the page to the test
        await use(page);
    },
});

export { expect };
