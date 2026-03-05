import { test, expect } from '@playwright/test';

test.describe('Smart Travel Booking - Authentication', () => {

    test('User can register and login successfully', async ({ page }) => {
        // Given: The user is on the registration page
        await page.goto('/register');
        await expect(page.getByTestId('auth-title')).toHaveText('Create an Account');

        // When: The user fills in the registration form and submits
        await page.getByTestId('register-name-input').fill('Alice Travel');
        await page.getByTestId('auth-email-input').fill('alice@travel.com');
        await page.getByTestId('auth-password-input').fill('password123');
        await page.getByTestId('auth-submit-btn').click();

        // Then: The user should be redirected to the login page with a success message
        await expect(page).toHaveURL('/login');

        // When: The user logs in with the new credentials
        await page.getByTestId('auth-email-input').fill('alice@travel.com');
        await page.getByTestId('auth-password-input').fill('password123');
        await page.getByTestId('auth-submit-btn').click();

        // Then: Successful login should redirect to the dashboard
        await expect(page.getByTestId('login-success-view')).toBeVisible();
        await expect(page).toHaveURL('/dashboard');
        await expect(page.getByTestId('user-profile-name')).toHaveText('Alice Travel');
    });

    test('Shows error for invalid credentials', async ({ page }) => {
        // Given: The user is on the login page
        await page.goto('/login');

        // When: The user submits incorrect credentials
        await page.getByTestId('auth-email-input').fill('wrong@user.com');
        await page.getByTestId('auth-password-input').fill('wrongpass');
        await page.getByTestId('auth-submit-btn').click();

        // Then: An error message should be displayed (checking for a generic toast alert or form feedback)
        // In our app, we use react-hot-toast, so we check for its presence
        await expect(page.locator('div[role="status"]')).toContainText('Invalid credentials');
    });

});
