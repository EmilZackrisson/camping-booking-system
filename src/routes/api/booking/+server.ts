import mongoose from 'mongoose';
import Booking from '../../../models/Booking';
import { env } from '$env/dynamic/private';
import { validateEmployee } from '$lib/validateAccount';
import type { RequestHandler } from '@sveltejs/kit';
import type { IBooking } from '$lib/types';
import { Vehicle } from '$lib/classes';

export const GET = (async ({ url }) => {
	const id = url.searchParams.get('id');

	await mongoose.connect(env.MONGO_CONNECTION_STRING);

	const booking: IBooking | null = await Booking.findOne({ _id: id });

	if (!booking) {
		return new Response(JSON.stringify({ error: 'Booking not found' }));
	}

	return new Response(JSON.stringify(booking));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	try {
		console.log(request.body);

		const body = await request.json();

		console.log('New booking body.json', body);

		await mongoose.connect(env.MONGO_CONNECTION_STRING);

		const booking: IBooking = new Booking(body);
		booking._id = new mongoose.Types.ObjectId();

		let vehicles: Vehicle[] = [];

		if (body.caravanData) {
			const caravanData = JSON.parse(body.caravanData);
			console.log('Caravan data: ', caravanData);
			const vehicle = new Vehicle(caravanData.regNr, caravanData.length, 'Husvagn');

			vehicles = [...vehicles, vehicle];
		}

		if (body.motorhomeData) {
			const motorhomeData = JSON.parse(body.motorhomeData);

			const vehicle = new Vehicle(motorhomeData.regNr, motorhomeData.length, 'Husbil');

			console.log('Motorhome data: ', vehicle);
			vehicles = [...vehicles, vehicle];
		}

		console.log('Vehicles: ', vehicles);

		booking.Vehicles = JSON.stringify(vehicles);

		booking.dateArrival = new Date(body.dateArrival);
		booking.dateDepart = new Date(body.dateDepart);

		booking.Accommodations = body.typeOfAccommodation;

		booking.notes = body.message;

		console.log(booking);

		const res = await booking.save();
		console.log('Response from mongoose', res);

		return new Response(JSON.stringify(booking));
	} catch (error) {
		console.log('ERROR POST /booking/new\n', error);
		return new Response(JSON.stringify({ error: 'Something went wrong' }));
	}
}) satisfies RequestHandler;

export const DELETE = (async ({ url, cookies }) => {
	try {
		const token = cookies.get('jwt');

		const validatedAdmin = await validateEmployee(token as string);

		if (validatedAdmin.error) {
			return new Response(JSON.stringify({ error: validatedAdmin.error }));
		}

		const id = url.searchParams.get('id');

		await mongoose.connect(env.MONGO_CONNECTION_STRING);

		const res = await Booking.deleteOne({ _id: id });

		if (res.deletedCount === 0) {
			return new Response(JSON.stringify({ error: 'Booking not found' }));
		}

		return new Response(JSON.stringify({ success: true }));
	} catch (error) {
		console.log('ERROR DELETE /booking\n', error);
		return new Response(JSON.stringify({ error: 'Something went wrong' }));
	}
}) satisfies RequestHandler;
