import { test, expect } from './fixtures';

test.describe('Smart Travel Booking - Hotel & Vehicle Reservations', () => {

    test('User can book a hotel and see it in the dashboard', async ({ loggedInPage }) => {
        // Given: The user is logged in and on the hotel listing page
        await loggedInPage.goto('/hotels');

        // When: The user searches for a hotel and clicks 'Book Now'
        await expect(loggedInPage.getByTestId('hotel-page-title')).toHaveText('Top Hotels to Stay');
        await loggedInPage.getByTestId('book-hotel-btn-0').click();

        // Then: A booking modal should open
        await expect(loggedInPage.getByTestId('booking-modal')).toBeVisible();
        await expect(loggedInPage.getByTestId('confirm-booking-btn')).toBeVisible();

        // When: The user selects a date and confirms the booking
        await loggedInPage.getByTestId('booking-date-input').fill('2026-06-15');
        await loggedInPage.getByTestId('confirm-booking-btn').click();

        // Then: A success message should appear and the modal should close
        await expect(loggedInPage.locator('div[role="status"]')).toContainText('Successfully booked');
        await expect(loggedInPage.getByTestId('booking-modal')).not.toBeVisible();

        // When: The user navigates to the dashboard
        await loggedInPage.goto('/dashboard');

        // Then: The new booking should be visible in the history list
        const bookingList = loggedInPage.getByTestId('dashboard-bookings-list');
        await expect(bookingList).toContainText('Grand Luxury Resort');
        await expect(bookingList.locator('div[role="status"]')).toContainText('Confirmed');
    });

    test('User can rent a vehicle successfully', async ({ loggedInPage }) => {
        // Given: The user is on the vehicle rental page
        await loggedInPage.goto('/vehicles');

        // When: The user rents a vehicle
        await loggedInPage.getByTestId('book-vehicle-btn-0').click();
        await loggedInPage.getByTestId('vehicle-booking-date-input').fill('2026-07-20');
        await loggedInPage.getByTestId('confirm-vehicle-booking-btn').click();

        // Then: Successful rental confirmation should appear
        await expect(loggedInPage.locator('div[role="status"]')).toContainText('Successfully booked');

        // Check dashboard again
        await loggedInPage.goto('/dashboard');
        await expect(loggedInPage.getByTestId('dashboard-bookings-list')).toContainText('Toyota Camry');
    });

});
