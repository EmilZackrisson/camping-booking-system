import { validateEmployee } from '$lib/validateAccount';
import type { PageServerLoad } from './$types';
import { getAccomodations } from '$lib/db';

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

		const accomodations = await getAccomodations();

		console.log(accomodations);

		return { accomodations: JSON.stringify({ accomodations }) };
	} catch (e) {
		console.log('GET ACCOMMODATION ERROR', e);
	}
}) satisfies PageServerLoad;
