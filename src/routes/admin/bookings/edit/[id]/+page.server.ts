import mongoose from 'mongoose';
import { Booking } from '$lib/mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
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
