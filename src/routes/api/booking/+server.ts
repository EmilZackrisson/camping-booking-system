import mongoose from 'mongoose';
import { Booking } from '$lib/mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
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

/** @type {import('./$types').RequestHandler}*/
export async function POST(request) {
	try {
		const body = await request.request.json();

		console.log(body);

		await mongoose.connect(MONGO_CONNECTION_STRING);

		const booking = new Booking(body);
		booking._id = new mongoose.Types.ObjectId();

		booking.Vehicles.push({ caravan: JSON.parse(body.caravanData) });
		booking.Vehicles.push({ motorhome: JSON.parse(body.motorhomeData) });

		booking.dateArrival = new Date(body.arrivalDate);
		booking.dateDepart = new Date(body.departureDate);

		booking.Accommodations = body.typeOfAccommodation;

		booking.notes = body.message;

		console.log(booking);

		const res = await booking.save();
		console.log('Response from mongoose', res);

		await mongoose.disconnect();

		return new Response(JSON.stringify(booking));
	} catch (error) {
		console.log(error);
	}
}
