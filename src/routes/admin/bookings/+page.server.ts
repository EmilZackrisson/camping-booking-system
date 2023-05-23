import mongoose from 'mongoose';
import { Booking } from '$lib/mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import { validateEmployee } from '$lib/validateAccount';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request }) {
	try {
		const token = request.cookies.get('token');

		const validatedEmployee = await validateEmployee(token as string);

		if (validatedEmployee.error) {
			return new Response(JSON.stringify({ error: validatedEmployee.error }), {
				status: validatedEmployee.status
			});
		}

		await mongoose.connect(MONGO_CONNECTION_STRING);

		const bookings = await Booking.find({}).sort({ dateArrival: -1 });

		await mongoose.disconnect();

		const string = JSON.stringify(bookings);

		return { bookings: string };
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: error }));
	}
}
