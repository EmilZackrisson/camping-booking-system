import type { RequestHandler } from './$types';
import mongoose from 'mongoose';
import Employee from '../../../../models/Employee';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const headers = request.headers;

	for (const header of headers) {
		if (header[0] === 'authorization') {
			console.log('AUTHORIZATION HEADER FOUND', header[1]);
			const token = header[1].split(' ')[1];

			await mongoose.connect(env.MONGO_CONNECTION_STRING as string);

			const employee = await Employee.findOne({ sessions: token });

			if (employee) {
				employee.sessions = [];
				await employee.save();
			}
		}
	}

	return new Response(
		JSON.stringify({
			message: 'Logged out of all devices'
		}),
		{
			headers: {
				'content-type': 'application/json'
			}
		}
	);
};
