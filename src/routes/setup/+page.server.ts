import type { PageServerLoad } from '../admin/bookings/edit/[id]/$types';
import { getEmployees } from '$lib/db';

export const load = (async () => {
	try {
		// Check if app is setup already
		const employees = await getEmployees();
		console.log('Employees', employees.length);
		if (employees.length > 0) {
			return {
				status: 302,
				redirect: '/admin'
			};
		}
	} catch (error) {
		console.error('SETUP SERVER ERROR', error);
		return {
			status: 500,
			error: 'Something went wrong!'
		};
	}
}) satisfies PageServerLoad;
