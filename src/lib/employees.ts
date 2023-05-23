import mongoose from 'mongoose';
import Employee from '../models/Employee';

import { MONGO_CONNECTION_STRING } from '$env/static/private';

async function getEmployees() {
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

	return filteredEmployees;
}

export { getEmployees };
