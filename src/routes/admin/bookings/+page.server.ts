import mongoose from 'mongoose';
import Booking from '../../../models/Booking.js';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import { validateEmployee } from '$lib/validateAccount';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	try {
		const token = cookies.get('token');

		const validatedEmployee = await validateEmployee(token as string);

		if (validatedEmployee.error) {
			return {
				status: validatedEmployee.status,
				body: JSON.stringify({ error: validatedEmployee.error })
			};
		}

		await mongoose.connect(MONGO_CONNECTION_STRING);

		const bookings = await Booking.find({}).sort({ dateArrival: -1 });

		await mongoose.disconnect();

		return { bookings };
	} catch (error) {
		console.log('GET BOOKING ERROR', error);
		return { error };
	}
}
