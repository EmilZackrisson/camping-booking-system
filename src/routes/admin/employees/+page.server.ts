import { getEmployees } from '$lib/employees';
import { validateAdmin } from '$lib/validateAccount';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const validatedAdmin = await validateAdmin(cookies.get('token') as string);

	if (validatedAdmin.error) {
		return new Response(JSON.stringify({ error: validatedAdmin.error }), {
			status: validatedAdmin.status
		});
	}

	const employees = await getEmployees();

	console.log(employees);

	const x = JSON.parse(JSON.stringify(employees));

	return { employees: x };
}) satisfies PageServerLoad;
