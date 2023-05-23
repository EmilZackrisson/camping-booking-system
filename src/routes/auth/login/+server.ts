import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Employee from '../../../models/Employee.js';
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

	const storedPasswordHash = employee.passwordHash as string;

	const isPasswordCorrect = await bcrypt.compare(password, storedPasswordHash);

	console.log(isPasswordCorrect);

	if (!isPasswordCorrect) {
		return new Response(JSON.stringify({ code: 401 }));
	}

	const token = genToken();
	console.log(token);

	const expires = new Date();
	expires.setDate(expires.getDate() + 7);

	await employee.updateOne({
		sessions: [...employee.sessions, { token: token, expires: expires }]
	});

	await mongoose.disconnect();

	return new Response(JSON.stringify({ token: token, expires: expires }));
}

const rand = function () {
	return Math.random().toString(36).substr(2); // remove `0.`
};

const genToken = function () {
	return rand() + rand(); // to make it longer
};
