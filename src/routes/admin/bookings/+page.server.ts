import { getBookings } from '$lib/db';
import { validateEmployee } from '$lib/validateAccount';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const jwt = cookies.get('jwt');

	if (!jwt) {
		return {
			status: 401,
			error: 'Unauthorized'
		};
	}

	const validEmployee = await validateEmployee(jwt);

	if (validEmployee.error) {
		return {
			status: 401,
			error: 'Unauthorized'
		};
	}

	const bookings = await getBookings();

	return { bookings: bookings };
}) satisfies PageServerLoad;
