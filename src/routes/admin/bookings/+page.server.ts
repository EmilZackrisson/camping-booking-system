import mongoose from 'mongoose';
import { Booking } from '$lib/mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request }) {
	try {
		await mongoose.connect(MONGO_CONNECTION_STRING);

		const bookings = await Booking.find({}).sort({ dateArrival: -1 });

		await mongoose.disconnect();

		return {
			bookings
		};
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: error }));
	}
}
