import mongoose from 'mongoose';
import Booking from '../../../models/Booking.js';
import { env } from '$env/dynamic/private';
import { validateEmployee } from '$lib/validateAccount';

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

		await mongoose.connect(env.MONGO_CONNECTION_STRING);

		const bookings = await Booking.find({}).sort({ dateArrival: -1 }).lean();

		await mongoose.disconnect();

		console.log(bookings);

		return { bookings: JSON.stringify({ bookings }) };
	} catch (error) {
		console.log('GET BOOKING ERROR', error);
		return { error };
	}
}
