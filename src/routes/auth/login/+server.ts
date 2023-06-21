import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Employee from '../../../models/Employee.js';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from '@sveltejs/kit';
import type { IEmployee } from '$lib/types';
import jwt from 'jsonwebtoken';

export const POST = (async (request) => {
	const form = await request.request.json();

	await mongoose.connect(env.MONGO_CONNECTION_STRING);

	const email = form.email;
	const password = form.password;

	const employee: IEmployee | null = await Employee.findOne({ email: email });

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

	const jwtToken = jwt.sign(
		{
			id: employee._id,
			email: employee.email
		},
		env.JWT_SECRET as string,
		{
			expiresIn: '7d'
		}
	);

	const { firstName, lastName, role } = employee;

	// await employee.updateOne({
	// 	sessions: [...employee.sessions, jwtToken]
	// });

	employee.sessions.push(jwtToken);

	await employee.save();

	await mongoose.disconnect();

	return new Response(
		JSON.stringify({
			expires: expires,
			firstName: firstName,
			lastName: lastName,
			role: role,
			jwtToken: jwtToken
		})
	);
}) satisfies RequestHandler;

const rand = function () {
	return Math.random().toString(36).substr(2); // remove `0.`
};

const genToken = function () {
	return rand() + rand(); // to make it longer
};
