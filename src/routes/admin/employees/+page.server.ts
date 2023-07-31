import { getEmployees } from '$lib/db';
import { validateAdmin } from '$lib/validateAccount';
import type { Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IEmployee } from '$lib/types';

export const load = (async ({ cookies }: { cookies: Cookies }) => {
	const jwt = cookies.get('jwt');

	const validAdmin = await validateAdmin(jwt);

	if (validAdmin.error) {
		return { status: 401, body: validAdmin.error };
	}

	const employeesFromDb = (await getEmployees()) as IEmployee[];

	console.log(employeesFromDb);

	return { employees: employeesFromDb };
}) satisfies PageServerLoad;
