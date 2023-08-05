import { validateEmployee } from '$lib/validateAccount';
import type { PageServerLoad } from './$types';
import { getBooking } from '$lib/db';

export const load = (async ({ params, cookies }) => {
	try {
		const token = cookies.get('jwt');

		const validatedEmployee = await validateEmployee(token as string);

		if (validatedEmployee.error) {
			return new Response(JSON.stringify({ error: validatedEmployee.error }), {
				status: validatedEmployee.status
			});
		}

		const id = params.id.replace('$', '');

		const booking = await getBooking(id);

		if (!booking) {
			console.log('Booking not found');
			return new Response(JSON.stringify({ error: 'Booking not found', status: 404 }));
		}

		console.log(booking);

		return {
			booking
		};
	} catch (error) {
		console.error(error);
		return { error };
	}
}) satisfies PageServerLoad;
