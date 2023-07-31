import type { PageServerLoad } from './$types';
import { getEmployee } from '$lib/db';
import { getInfoFromToken } from '$lib/utils';

export const load = (async ({ cookies }) => {
	const jwt = cookies.get('jwt');

	if (!jwt) {
		return {
			status: 401,
			error: 'Unauthorized'
		};
	}

	const { id } = getInfoFromToken(jwt);

	const employee = await getEmployee(id);

	console.log(employee);

	return {
		status: 200,
		body: {
			employee: employee
		}
	};
}) satisfies PageServerLoad;
