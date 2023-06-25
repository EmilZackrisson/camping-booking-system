import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Employee from '../../../../models/Employee.js';
import { env } from '$env/dynamic/private';
import { validateAdmin } from '$lib/validateAccount';
import type { RequestHandler } from './$types';
import type { IEmployee } from '$lib/types';
import { json } from '@sveltejs/kit';
import { getEmployees } from '$lib/db.js';

export const POST = (async (request) => {
	const body = await request.request.json();
	console.log(body);

	const validatedAdmin = await validateAdmin(request.cookies.get('jwt') as string);

	if (validatedAdmin.error) {
		return json({ error: validatedAdmin.error }, { status: 401 });
	}

	await mongoose.connect(env.MONGO_CONNECTION_STRING as string);

	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(body.password, salt);

	const employee: IEmployee = new Employee({
		_id: new mongoose.Types.ObjectId(),
		firstName: body.firstName,
		lastName: body.lastName,
		email: body.email,
		phone: body.phone,
		role: body.role,
		notes: body.notes,
		passwordHash: passwordHash,
		passwordSalt: salt,
		sessions: []
	});

	const res = await employee.save();
	console.log('Response from mongoose', res);

	return json({ message: 'Employee created' }, { status: 201 });
}) satisfies RequestHandler;

export const GET = (async (request) => {
	try {
		const validatedAdmin = await validateAdmin(request.cookies.get('jwt') as string);

		console.log('validatedAdmin', validatedAdmin);

		if (validatedAdmin.error) {
			return json({ error: validatedAdmin.error }, { status: 401 });
		}

		const employees = await getEmployees();

		console.log('employees', employees);

		return json({ employees }, { status: 200 });
	} catch (error: any) {
		console.log('🚀 ~ file: +server.ts:78 ~ GET ~ error:', error);
		return json({ error: error.message }, { status: 500 });
	}
}) satisfies RequestHandler;

export const PUT = (async (request) => {
	const userId = request.url.searchParams.get('id');
	console.log('userId', userId);

	const body = await request.request.json();

	const typeOfChange = body.typeOfChange;
	const password = body.password;
	console.log('password', password);

	const validatedAdmin = await validateAdmin(request.cookies.get('jwt') as string);

	if (validatedAdmin.error) {
		return json({ error: validatedAdmin.error }, { status: 401 });
	}

	if (typeOfChange === 'password') {
		try {
			const salt = await bcrypt.genSalt(10);
			const passwordHash = await bcrypt.hash(password, salt);

			await mongoose.connect(env.MONGO_CONNECTION_STRING as string);

			const employee = await Employee.findById(userId);

			if (!employee) {
				return json({ error: 'Employee not found' }, { status: 404 });
			}

			employee.passwordHash = passwordHash;
			employee.passwordSalt = salt;

			await employee.save();

			console.log(`${employee.firstName} ${employee.lastName}s password changed`);
			return new Response(JSON.stringify({ message: 'Password Changed' }));
		} catch (error) {
			console.log('Error while changing password: ', error);
			// @ts-expect-error - error.message is a string
			return json({ error: error.message }, { status: 500 });
		}
	} else {
		return json({ error: 'Invalid type of change' }, { status: 400 });
	}
}) satisfies RequestHandler;
