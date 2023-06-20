import type { RequestHandler } from '@sveltejs/kit';
import { getEmployees, createEmployee } from '$lib/db';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async (request) => {
	try {
		const employees = await getEmployees();

		if (employees.length > 0) {
			return new Response(JSON.stringify({ error: 'App already setup!' }), {
				status: 302,
				headers: {
					Location: '/admin'
				}
			});
		}

		const body = await request.request.json();

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(body.password, salt);

		const employee = {
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			phone: body.phone,
			role: 'Admin',
			passwordHash: passwordHash,
			passwordSalt: salt,
			notes: body.notes
		};

		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);

		await createEmployee(employee);

		await mongoose.disconnect();

		return new Response(JSON.stringify('Admin account created!'));
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Something went wrong!' }));
	}
};
