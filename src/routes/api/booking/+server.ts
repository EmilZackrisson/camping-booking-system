import mongoose from 'mongoose';
import Booking from '../../../models/Booking';
import { env } from '$env/dynamic/private';
import { validateEmployee } from '$lib/validateAccount';
import type { RequestHandler } from '@sveltejs/kit';
import type { IBooking } from '$lib/types';

export const GET = (async ({ url }) => {
	const id = url.searchParams.get('id');

	await mongoose.connect(env.MONGO_CONNECTION_STRING);

	const booking: IBooking | null = await Booking.findOne({ _id: id });

	await mongoose.disconnect();

	if (!booking) {
		return new Response(JSON.stringify({ error: 'Booking not found' }));
	}

	return new Response(JSON.stringify(booking));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	try {
		console.log(request.body);

		const body = await request.json();

		console.log(body);

		await mongoose.connect(env.MONGO_CONNECTION_STRING);

		const booking: IBooking = new Booking(body);
		booking._id = new mongoose.Types.ObjectId();

		let vehicles: any = [];

		if (body.caravanData) {
			const caravanData = JSON.parse(body.caravanData);
			console.log('Caravan data: ', caravanData);
			caravanData.type = 'Husvagn';
			vehicles = [...vehicles, caravanData];
		}

		if (body.motorhomeData) {
			const motorhomeData = JSON.parse(body.motorhomeData);
			motorhomeData.type = 'Husbil';
			console.log('Motorhome data: ', motorhomeData);
			vehicles = [...vehicles, motorhomeData];
		}

		booking.Vehicles = vehicles;

		booking.dateArrival = new Date(body.dateArrival);
		booking.dateDepart = new Date(body.dateDepart);

		booking.Accommodations = body.typeOfAccommodation;

		booking.notes = body.message;

		console.log(booking);

		const res = await booking.save();
		console.log('Response from mongoose', res);

		await mongoose.disconnect();

		return new Response(JSON.stringify(booking));
	} catch (error) {
		console.log('ERROR POST /booking/new\n', error);
		return new Response(JSON.stringify({ error: 'Something went wrong' }));
	}
}) satisfies RequestHandler;

export const DELETE = (async ({ url, cookies }) => {
	try {
		const token = cookies.get('token');

		const validatedAdmin = await validateEmployee(token as string);

		if (validatedAdmin.error) {
			return new Response(JSON.stringify({ error: validatedAdmin.error }));
		}

		const id = url.searchParams.get('id');

		await mongoose.connect(env.MONGO_CONNECTION_STRING);

		const res = await Booking.deleteOne({ _id: id });

		await mongoose.disconnect();

		if (res.deletedCount === 0) {
			return new Response(JSON.stringify({ error: 'Booking not found' }));
		}

		return new Response(JSON.stringify({ success: true }));
	} catch (error) {
		console.log('ERROR DELETE /booking\n', error);
		return new Response(JSON.stringify({ error: 'Something went wrong' }));
	}
}) satisfies RequestHandler;
