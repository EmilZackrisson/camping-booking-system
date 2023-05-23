import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { Employee } from '$lib/mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import { validateAdmin } from '$lib/validateAccount';

/** @type {import('./$types').RequestHandler}*/
export async function POST(request) {
	const body = await request.request.json();
	console.log(body);

	const validatedAdmin = await validateAdmin(request.cookies.get('token') as string);

	if (validatedAdmin.error) {
		return new Response(JSON.stringify({ error: validatedAdmin.error }), {
			status: validatedAdmin.status
		});
	}

	await mongoose.connect(MONGO_CONNECTION_STRING);

	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(body.password, salt);

	const employee = new Employee({
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
}

/** @type {import('./$types').RequestHandler}*/
export async function GET(request) {
	const validatedAdmin = await validateAdmin(request.cookies.get('token') as string);

	if (validatedAdmin.error) {
		return new Response(JSON.stringify({ error: validatedAdmin.error }), {
			status: validatedAdmin.status
		});
	}

	await mongoose.connect(MONGO_CONNECTION_STRING);

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
}
