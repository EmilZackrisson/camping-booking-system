import type { RequestHandler } from '@sveltejs/kit';
import { getBookings } from '$lib/db';
import { validateEmployee } from '$lib/validateAccount';

export const GET = (async ({ cookies }) => {
	const token = cookies.get('token');

	const validatedEmployee = await validateEmployee(token as string);

	if (validatedEmployee.error) {
		throw Error();
	}

	const bookings = await getBookings();

	return new Response(JSON.stringify(bookings));
}) satisfies RequestHandler;
