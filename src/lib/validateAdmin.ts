import mongoose from 'mongoose';
import { MONGO_CONNECTION_STRING } from '$env/static/private';
import { Employee } from '$lib/mongoose';

async function validateAdmin(cookie: string) {
	await mongoose.connect(MONGO_CONNECTION_STRING);

	const employeeFromDb = await Employee.findOne({ sessions: { $elemMatch: { token: cookie } } });

	if (employeeFromDb?.role !== 'Admin') {
		return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
	}

	await mongoose.disconnect();

	if (!employeeFromDb) {
		return { error: 'Unauthorized', status: 401, body: 'Unauthorized' };
	}

	return { error: null, status: null, body: { role: 'Admin' } };
}

export { validateAdmin };
