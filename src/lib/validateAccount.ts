import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';
import Employee from '../models/Employee';
import jwt from 'jsonwebtoken';

async function validateAdmin(token: string | undefined) {
	if (!token) {
		return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
	}

	try {
		jwt.verify(token, env.JWT_SECRET as string, async function (err) {
			if (err) {
				console.log(err);
				return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
			}

			await mongoose.connect(env.MONGO_CONNECTION_STRING);

			const employeeFromDb = await Employee.findOne({ sessions: token });

			if (employeeFromDb?.role !== 'Admin' || !employeeFromDb) {
				console.log('Unauthorized');
				return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
			}

			console.log(employeeFromDb);

			if (!employeeFromDb) {
				return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
			}

			console.log(employeeFromDb.email, 'authorized');

			return { error: null, status: null, body: { role: 'Admin' } };
		});

		return { error: null, status: null, body: { role: 'Admin' } };
	} catch (error) {
		console.log('Error validating admin', error);

		return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
	}
}

async function validateEmployee(token: string) {
	await mongoose.connect(env.MONGO_CONNECTION_STRING);

	const employeeFromDb = await Employee.findOne({ sessions: token });

	// console.log(employeeFromDb);

	employeeFromDb?.sessions.map((session: { token: string; expires: string | number | Date }) => {
		if (session.token === token) {
			if (new Date(session.expires) < new Date()) {
				return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
			}
		}
	});

	if (!employeeFromDb) {
		return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
	}

	return { error: null, status: null, body: { role: employeeFromDb.role } };
}

export { validateAdmin, validateEmployee };
