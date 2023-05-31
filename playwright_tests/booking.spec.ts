import { test, expect, Page } from '@playwright/test';

test.describe('Add and remove a booking', () => {
	let page: Page;
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});

	let bookingId: string;

	test('create booking', async ({ page }) => {
		await page.goto('https://cbs.emilzackrisson.se/booking/new');

		// Fill contact information
		await page.fill("input[name='firstName']", 'Play');
		await page.fill("input[name='lastName']", 'Wright');
		await page.fill("input[name='email']", 'text@example.com');
		await page.fill("input[name='phone']", '0701234567');
		await page.fill("input[name='dateArrival']", '2030-01-01');
		await page.fill("input[name='dateDepart']", '2030-01-07');
		await page.fill("input[name='numberOfPersons']", '69');

		// Fill accomodation information
		await page.check("input[name='tent']");
		await page.check("input[name='caravan']");

		// Fill caravan information
		await page.fill("input[name='caravanLength']", '10');
		await page.fill("input[name='caravanWidth']", '10');
		await page.fill("input[name='caravanRegNr']", 'ABC123');

		// Fill extra information
		await page.fill("textarea[name='message']", 'This is a test message');
		await page.check("input[name='gdpr']");

		// Submit form
		await page.click("button[type='submit']");

		// Wait on API response
		const res = await page.waitForResponse(
			(response) => response.url().includes('/api/booking') && response.status() === 200
		);

		// Extract booking ID from response
		bookingId = (await res.json()).bookingId;
	});

	test('remove booking', async ({ page }) => {
		await page.goto('https://cbs.emilzackrisson.se/admin/bookings');

		await page.waitForSelector('table');
	});
});
