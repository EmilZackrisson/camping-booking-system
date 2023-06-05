import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { validateAdmin } from '$lib/validateAccount';
import { createEmployee } from '$lib/db';
import bcrypt from 'bcrypt';

export const POST = (async ({ request, cookies }) => {
	const validatedAdmin = await validateAdmin(cookies.get('token') as string);

	if (validatedAdmin.error) {
		throw error(401, 'Unauthorized');
	}

	const body = await request.json();

	try {
		console.log('NEW EMPLOYEE: ', body);

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(body.password, salt);

		const newEmployee = {
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			phone: body.phone,
			role: body.role,
			notes: body.notes,
			passwordHash: passwordHash,
			passwordSalt: salt
		};

		await createEmployee(newEmployee);

		return new Response(JSON.stringify({ message: 'Added employee' }));
	} catch (e) {
		throw error(500);
	}
}) satisfies RequestHandler;
