import type { PageServerLoad } from './$types';
import { validateAdmin } from '$lib/validateAccount';
import { getEmployee } from '$lib/db';

export const load = (async ({ cookies, params }) => {
	try {
		const token = cookies.get('jwt');
		const id = params.id.replace('$', '');
		const validatedAdmin = await validateAdmin(token as string);

		if (validatedAdmin.error) {
			return new Response(JSON.stringify({ error: validatedAdmin.error }), {
				status: validatedAdmin.status
			});
		}

		const employee = await getEmployee(id);

		if (!employee) {
			console.log('Employee not found');
			return new Response(JSON.stringify({ error: 'Employee not found', status: 404 }));
		}

		return {
			employee
		};
	} catch (error) {
		console.error(error);
		return { error };
	}
	return {};
}) satisfies PageServerLoad;
