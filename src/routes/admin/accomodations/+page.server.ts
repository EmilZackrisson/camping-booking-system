import mongoose from 'mongoose';
import Accomodation from '../../../models/Accomodation';
import { validateEmployee } from '$lib/validateAccount';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
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

		const accomodations = await Accomodation.find();

		await mongoose.disconnect();

		console.log(accomodations);

		return { accomodations: JSON.stringify({ accomodations }) };
	} catch (e) {
		console.log('GET ACCOMMODATION ERROR', e);
	}
}) satisfies PageServerLoad;
