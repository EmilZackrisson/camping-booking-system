import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { validateEmployee } from '$lib/validateAccount';
import Accomodation from '../../../../models/Accomodation';
import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';
import { onOffToBoolean } from '$lib/utils';

export const POST = (async ({ request, cookies }) => {
	const token = cookies.get('jwt');
	const body = await request.json();

	console.log(body);

	const validatedEmployee = await validateEmployee(token as string);

	if (validatedEmployee.error) {
		throw error(validatedEmployee.status, validatedEmployee.error);
	}

	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING);

		const electricity = onOffToBoolean(body.electricity);

		const prices = Object.values(body.prices);

		const accomodation = new Accomodation({
			_id: new mongoose.Types.ObjectId(),
			slotName: body.slotName,
			location: body.location,
			type: 'Ställplats',
			prices: prices,
			description: body.description,
			electricity: electricity
		});

		const res = await accomodation.save();

		return new Response(JSON.stringify({ message: 'Added accomodation with id: ' + res._id }));
	} catch (e) {
		throw error(500);
	}
}) satisfies RequestHandler;

export const GET = (async ({ cookies }) => {
	const token = cookies.get('jwt');

	const validatedEmployee = await validateEmployee(token as string);

	if (validatedEmployee.error) {
		throw error(validatedEmployee.status, validatedEmployee.error);
	}

	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING);

		const accomodations = await Accomodation.find({}).lean();

		return new Response(JSON.stringify({ accomodations }));
	} catch (e) {
		throw error(500);
	}
}) satisfies RequestHandler;
