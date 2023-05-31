import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('https://cbs.emilzackrisson.se/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle('Camping Booking System');
});

/*
test('new booking link', async ({ page }) => {
	await page.goto('https://cbs.emilzackrisson.se/');

	// Click the get started link.
	await page.getByRole('link', { name: 'New Booking' }).click();

	// Expects the URL to contain intro.
	await expect(page).toHaveURL(/.*booking\/new/);
});
*/
