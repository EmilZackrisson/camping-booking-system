import mongoose from 'mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import Employee from '../models/Employee';

async function validateAdmin(cookie: string) {
	await mongoose.connect(MONGO_CONNECTION_STRING);

	const employeeFromDb = await Employee.findOne({ sessions: { $elemMatch: { token: cookie } } });

	if (employeeFromDb?.role !== 'Admin') {
		return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
	}

	employeeFromDb.sessions.map((session: { token: string; expires: string | number | Date }) => {
		if (session.token === cookie) {
			if (new Date(session.expires) < new Date()) {
				return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
			}
		}
	});

	await mongoose.disconnect();

	if (!employeeFromDb) {
		return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
	}

	return { error: null, status: null, body: { role: 'Admin' } };
}

async function validateEmployee(cookie: string) {
	await mongoose.connect(MONGO_CONNECTION_STRING);

	const employeeFromDb = await Employee.findOne({ sessions: { $elemMatch: { token: cookie } } });

	console.log(employeeFromDb);

	employeeFromDb?.sessions.map((session: { token: string; expires: string | number | Date }) => {
		if (session.token === cookie) {
			if (new Date(session.expires) < new Date()) {
				return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
			}
		}
	});

	await mongoose.disconnect();

	if (!employeeFromDb) {
		return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
	}

	return { error: null, status: null, body: { role: employeeFromDb.role } };
}

export { validateAdmin, validateEmployee };
