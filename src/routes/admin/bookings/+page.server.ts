import mongoose from 'mongoose';
import { Booking } from '$lib/mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import { validateEmployee } from '$lib/validateAccount';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	try {
		const token = cookies.get('token');

		const validatedEmployee = await validateEmployee(token as string);

		if (validatedEmployee.error) {
			return new Response(JSON.stringify({ error: validatedEmployee.error }), {
				status: validatedEmployee.status
			});
		}

		await mongoose.connect(MONGO_CONNECTION_STRING);

		const bookings = await Booking.find({}).sort({ dateArrival: -1 });

		await mongoose.disconnect();

		const json = JSON.parse(JSON.stringify(bookings));

		console.log(json);

		return { bookings: { json } };
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: error }));
	}
}
