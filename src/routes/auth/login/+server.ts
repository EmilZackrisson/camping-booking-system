import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { Employee } from '$lib/mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';

/** @type {import('./$types').RequestHandler}*/
export async function POST(request) {
	const form = await request.request.json();

	await mongoose.connect(MONGO_CONNECTION_STRING);

	const email = form.email;
	const password = form.password;

	const employee = await Employee.findOne({ email: email });

	console.log(employee);

	if (!employee) {
		return new Response(JSON.stringify({ code: 401 }));
	}

	const passwordHash = employee.passwordHash as string;

	const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

	console.log(isPasswordCorrect);

	if (!isPasswordCorrect) {
		return new Response(JSON.stringify({ code: 401 }));
	}

	const token = genToken();
	console.log(token);

	await employee.updateOne({ sessions: [...employee.sessions, { token: token }] });

	await mongoose.disconnect();

	return new Response(JSON.stringify({ token: token }));
}

const rand = function () {
	return Math.random().toString(36).substr(2); // remove `0.`
};

const genToken = function () {
	return rand() + rand(); // to make it longer
};
