import type { PageServerLoad } from './$types';
import { getEmployee } from '$lib/db';
import { validateAdmin } from '$lib/validateAccount';

export const load = (async ({ params, cookies }) => {
	const employeeId = params.id;

	console.log(employeeId);

	const token = cookies.get('token');

	if (!token) {
		return new Response(JSON.stringify({ error: 'No token found' }), {
			status: 401
		});
	}

	const validatedAdmin = await validateAdmin(token);

	if (validatedAdmin.error) {
		return new Response(JSON.stringify({ error: validatedAdmin.error }), {
			status: validatedAdmin.status
		});
	}

	const employee = await getEmployee(employeeId);

	if (!employee) {
		return new Response(JSON.stringify({ error: 'No employee found' }), {
			status: 404
		});
	}

	return { employee: JSON.parse(JSON.stringify(employee)) };
}) satisfies PageServerLoad;
