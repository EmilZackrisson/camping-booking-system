import mongoose from 'mongoose';
import Booking from '../../../../../models/Booking';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import { validateEmployee } from '$lib/validateAccount';

/** @type {import('./$types').PageLoad} */
export async function load({ params, cookies }) {
	try {
		const token = cookies.get('token');

		const validatedEmployee = await validateEmployee(token as string);

		if (validatedEmployee.error) {
			return new Response(JSON.stringify({ error: validatedEmployee.error }), {
				status: validatedEmployee.status
			});
		}

		const id = params.id.replace('$', '');

		await mongoose.connect(MONGO_CONNECTION_STRING);

		const booking = await Booking.findById(id);

		await mongoose.disconnect();

		if (!booking) {
			return new Response(JSON.stringify({ error: 'Booking not found', status: 404 }));
		}

		console.log(booking);

		const json = JSON.stringify(booking);

		return {
			booking: json
		};
	} catch (error) {
		console.error(error);
		return { error };
	}
}
