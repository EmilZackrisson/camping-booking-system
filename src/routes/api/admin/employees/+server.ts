import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Employee from '../../../../models/Employee.js';
import { env } from '$env/dynamic/private';
import { validateAdmin } from '$lib/validateAccount';
import type { RequestHandler } from './$types';
import type { IEmployee } from '$lib/types';

export const POST = (async (request) => {
	const body = await request.request.json();
	console.log(body);

	const validatedAdmin = await validateAdmin(request.cookies.get('token') as string);

	if (validatedAdmin.error) {
		return new Response(JSON.stringify({ error: validatedAdmin.error }), {
			status: validatedAdmin.status
		});
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

	await mongoose.disconnect();

	return new Response(JSON.stringify({ employee }));
}) satisfies RequestHandler;

export const GET = (async (request) => {
	const validatedAdmin = await validateAdmin(request.cookies.get('token') as string);

	if (validatedAdmin.error) {
		return new Response(JSON.stringify({ error: validatedAdmin.error }), {
			status: validatedAdmin.status
		});
	}

	await mongoose.connect(env.MONGO_CONNECTION_STRING as string);

	const employees = await Employee.find({});

	await mongoose.disconnect();

	const filteredEmployees = employees.map((employee) => {
		return {
			_id: employee._id,
			firstName: employee.firstName,
			lastName: employee.lastName,
			email: employee.email,
			phone: employee.phone,
			role: employee.role,
			notes: employee.notes
		};
	});

	return new Response(JSON.stringify({ employees: filteredEmployees }));
}) satisfies RequestHandler;

export const PUT = (async (request) => {
	const userId = request.url.searchParams.get('id');
	console.log('userId', userId);

	const body = await request.request.json();

	const typeOfChange = body.typeOfChange;
	const password = body.password;
	console.log('password', password);

	const validatedAdmin = await validateAdmin(request.cookies.get('token') as string);

	if (validatedAdmin.error) {
		return new Response(JSON.stringify({ error: validatedAdmin.error }), {
			status: validatedAdmin.status
		});
	}

	if (typeOfChange === 'password') {
		try {
			const salt = await bcrypt.genSalt(10);
			const passwordHash = await bcrypt.hash(password, salt);

			await mongoose.connect(env.MONGO_CONNECTION_STRING as string);

			const employee = await Employee.findById(userId);

			if (!employee) {
				return new Response(JSON.stringify({ error: 'Employee not found' }), { status: 404 });
			}

			employee.passwordHash = passwordHash;
			employee.passwordSalt = salt;

			await employee.save();

			await mongoose.disconnect();

			console.log(`${employee.firstName} ${employee.lastName}s password changed`);
			return new Response(JSON.stringify({ message: 'Password Changed' }));
		} catch (error) {
			console.log('Error while changing password: ', error);
			// @ts-expect-error - error.message is a string
			return new Response(JSON.stringify({ error: error.message }), { status: 500 });
		}
	} else {
		return new Response(JSON.stringify({ error: 'Invalid type of change' }), { status: 400 });
	}
}) satisfies RequestHandler;
