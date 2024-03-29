import mongoose from 'mongoose';
import Booking from '../../../../../models/Booking';
import { env } from '$env/dynamic/private';
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
			return new Response(JSON.stringify({ error: 'Booking not found', status: 404 }));
		}

		return {
			booking: booking
		};
	} catch (error) {
		console.error(error);
		return { error };
	}
}) satisfies PageServerLoad;
