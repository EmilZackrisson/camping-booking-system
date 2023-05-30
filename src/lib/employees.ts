import mongoose from 'mongoose';
import Employee from '../models/Employee';

import type { IEmployee } from '$lib/types';

import { env } from '$env/dynamic/private';

async function getEmployees() {
	await mongoose.connect(env.MONGO_CONNECTION_STRING);
	const employees: IEmployee[] = await Employee.find({});
	await mongoose.disconnect();

	return employees.map((employee) => {
		return {
			_id: employee._id,
			firstName: employee.firstName,
			lastName: employee.lastName,
			email: employee.email,
			phone: employee.phone,
			role: employee.role,
			notes: employee.notes
		} as IEmployee;
	});
}

export { getEmployees };
