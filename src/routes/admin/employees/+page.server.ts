import { getEmployees } from '$lib/employees';
import { validateAdmin } from '$lib/validateAccount';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies }) {
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
}
