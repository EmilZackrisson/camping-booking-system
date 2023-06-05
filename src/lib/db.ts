import mongoose from 'mongoose';
import Accomodation from '../models/Accomodation';
import Employee from '../models/Employee';
import Booking from '../models/Booking';
import { env } from '$env/dynamic/private';
import type { IAccomodation, IEmployee, IBooking } from '$lib/types';

async function getAccomodation(id: string) {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING);
		const accomodation: IAccomodation = await Accomodation.find({ _id: id }).lean();
		await mongoose.disconnect();
		return accomodation;
	} catch (e) {
		console.log('GET ACCOMMODATION ERROR', e);
		throw e;
	}
}

async function getAccomodations() {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING);
		const accomodations: IAccomodation[] = await Accomodation.find().lean();
		await mongoose.disconnect();
		return accomodations;
	} catch (e) {
		console.log('GET ACCOMMODATION ERROR', e);
		throw e;
	}
}

async function createAccomodation(accomodation: IAccomodation) {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING);
		const createdAccomodation = await Accomodation.create(accomodation);
		await mongoose.disconnect();
		return createdAccomodation;
	} catch (e) {
		console.log('CREATE ACCOMMODATION ERROR', e);
		throw e;
	}
}

async function getEmployee(id: string) {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING);
		const employee: IEmployee = await Employee.find({ _id: id }).lean();
		await mongoose.disconnect();
		return employee;
	} catch (e) {
		console.log('GET EMPLOYEE ERROR', e);
		throw e;
	}
}

async function getEmployees() {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING);
		const employees: IEmployee[] = await Employee.find().lean();
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
	} catch (e) {
		console.log('GET EMPLOYEES ERROR', e);
		throw e;
	}
}

async function createEmployee(employee: {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: string;
	passwordHash: string;
	passwordSalt: string;
	notes: string;
}) {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING);

		const createdEmployee = await Employee.create({
			...employee,
			_id: new mongoose.Types.ObjectId()
		});
		await mongoose.disconnect();
		return createdEmployee;
	} catch (e) {
		console.log('CREATE EMPLOYEE ERROR', e);
		throw e;
	}
}

export {
	getAccomodation,
	getAccomodations,
	createAccomodation,
	getEmployees,
	getEmployee,
	createEmployee
};
