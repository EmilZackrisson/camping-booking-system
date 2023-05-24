import mongoose from 'mongoose';
import Booking from '../../../models/Booking';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import type { RequestEvent } from './$types';

export async function GET({ url }) {
	const id = url.searchParams.get('id');

	await mongoose.connect(MONGO_CONNECTION_STRING);

	const booking = await Booking.findOne({ _id: id });

	await mongoose.disconnect();

	if (!booking) {
		return new Response(JSON.stringify({ error: 'Booking not found' }));
	}

	return new Response(JSON.stringify(booking));
}

export async function POST({ request }: RequestEvent) {
	try {
		console.log(request.body);

		const body = await request.json();

		console.log(body);

		await mongoose.connect(MONGO_CONNECTION_STRING);

		const booking = new Booking(body);
		booking._id = new mongoose.Types.ObjectId();

		const vehicles: Vehicle[] = [];

		if (body.caravanData) {
			const caravanData: Vehicle = JSON.parse(body.caravanData);
			console.log('Caravan data: ', caravanData);
			caravanData.type = 'Husvagn';
			vehicles.push(caravanData);
		}

		if (body.motorhomeData) {
			const motorhomeData: Vehicle = JSON.parse(body.motorhomeData);
			motorhomeData.type = 'Husbil';
			console.log('Motorhome data: ', motorhomeData);
			vehicles.push(motorhomeData);
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
}
