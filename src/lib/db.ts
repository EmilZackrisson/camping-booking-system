import mongoose from 'mongoose';
import Accomodation from '../models/Accomodation';
import Employee from '../models/Employee';
import Booking from '../models/Booking';
import { env } from '$env/dynamic/private';
import type { IAccomodation, IEmployee, IBooking } from '$lib/types';

async function getAccomodation(id: string) {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);
		const accomodation: IAccomodation = await Accomodation.find({ _id: id }).lean();

		return accomodation;
	} catch (e) {
		console.log('GET ACCOMMODATION ERROR', e);
		throw e;
	}
}

async function getAccomodations() {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);
		const accomodations: IAccomodation[] = await Accomodation.find().lean();

		return accomodations;
	} catch (e) {
		console.log('GET ACCOMMODATION ERROR', e);
		throw e;
	}
}

async function createAccomodation(accomodation: IAccomodation) {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);
		const createdAccomodation = await Accomodation.create(accomodation);

		return createdAccomodation;
	} catch (e) {
		console.log('CREATE ACCOMMODATION ERROR', e);
		throw e;
	}
}

async function getEmployee(id: string) {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);
		const employee: IEmployee = await Employee.find({ _id: id }).lean();

		return employee;
	} catch (e) {
		console.log('GET EMPLOYEE ERROR', e);
		throw e;
	}
}

async function getEmployees() {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);
		const employees: IEmployee[] = await Employee.find().lean();

		return employees;
	} catch (e) {
		console.log('GET EMPLOYEES ERROR', e);
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
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);

		const createdEmployee = await Employee.create({
			...employee,
			_id: new mongoose.Types.ObjectId()
		});

		return createdEmployee;
	} catch (e) {
		console.log('CREATE EMPLOYEE ERROR', e);
		throw e;
	}
}

async function getBookings() {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);
		const bookings: IBooking[] = await Booking.find().lean();

		return bookings;
	} catch (e) {
		console.log('GET BOOKINGS ERROR', e);
		throw e;
	}
}

export {
	getAccomodation,
	getAccomodations,
	createAccomodation,
	getEmployees,
	getEmployee,
	createEmployee,
	getBookings
};
