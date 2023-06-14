import { getEmployees } from '$lib/db';
import { validateAdmin } from '$lib/validateAccount';
import type { PageServerLoad } from './$types';
import type { IFilteredEmployee } from '$lib/types';

export const load = (async ({ cookies }) => {
	const validatedAdmin = await validateAdmin(cookies.get('token') as string);

	if (validatedAdmin.error) {
		return { error: validatedAdmin.error, status: validatedAdmin.status };
	}

	const employees: IFilteredEmployee[] = await getEmployees();

	console.log(employees);

	const x: IFilteredEmployee = JSON.parse(JSON.stringify(employees));

	return { employees: x };
}) satisfies PageServerLoad;
