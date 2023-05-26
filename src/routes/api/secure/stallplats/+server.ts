import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { validateEmployee } from '$lib/validateAccount';
import Accomodation from '../../../../models/Accomodation';
import mongoose from 'mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import { onOffToBoolean } from '$lib/utils';

export const POST = (async ({ request, cookies }) => {
	const token = cookies.get('token');
	const body = await request.json();

	const validatedEmployee = await validateEmployee(token as string);

	if (validatedEmployee.error) {
		throw error(validatedEmployee.status, validatedEmployee.error);
	}

	try {
		await mongoose.connect(MONGO_CONNECTION_STRING);

		const electricity = onOffToBoolean(body.electricity);

		const prices = [
			body.priceDay1,
			body.priceDay2,
			body.priceDay3,
			body.priceDay4,
			body.priceDay5,
			body.priceDay6,
			body.priceDay7
		];

		const accomodation = new Accomodation({
			_id: new mongoose.Types.ObjectId(),
			slotName: body.slotName,
			location: body.location,
			type: 'Ställplats',
			price: prices,
			description: body.description,
			electricity: electricity
		});

		const res = await accomodation.save();

		await mongoose.disconnect();

		return new Response(JSON.stringify({ message: 'Added accomodation with id: ' + res._id }));
	} catch (e) {
		throw error(500);
	}
}) satisfies RequestHandler;
