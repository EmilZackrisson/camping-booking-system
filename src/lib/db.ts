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

		accomodation._id = accomodation._id.toString();

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

		accomodations.map((accomodation) => {
			accomodation._id = accomodation._id.toString();
		});

		return accomodations;
	} catch (e) {
		console.log('GET ACCOMMODATION ERROR', e);
		throw e;
	}
}

async function createAccomodation(accomodation: IAccomodation) {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);
		const createdAccomodation: IAccomodation = await Accomodation.create(accomodation);

		createdAccomodation._id = createdAccomodation._id.toString();

		return createdAccomodation;
	} catch (e) {
		console.log('CREATE ACCOMMODATION ERROR', e);
		throw e;
	}
}

async function getEmployee(id: string) {
	try {
		console.log('Getting employee with id: ', id);
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);

		const employee: IEmployee = (await Employee.findById(id).lean()) as IEmployee;

		if (!employee) {
			console.log('No employee found with id: ', id);
			return null;
		}

		employee._id = employee._id.toString();

		console.log('Employee: ', employee);

		return employee;
	} catch (e) {
		console.log('GET EMPLOYEE ERROR', e);
	}
}

async function getEmployees() {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);
		const employees: IEmployee[] = await Employee.find().lean();
		employees.map((employee) => {
			employee._id = employee._id.toString();
		});

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

		createdEmployee._id = createdEmployee._id.toString();

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

		bookings.map((booking) => {
			booking._id = booking._id.toString();
		});

		return bookings;
	} catch (e) {
		console.log('GET BOOKINGS ERROR', e);
		throw e;
	}
}

async function getBooking(id: string) {
	try {
		await mongoose.connect(env.MONGO_CONNECTION_STRING as string);
		const booking: IBooking = await Booking.find({ _id: id }).lean();

		booking._id = booking._id.toString();

		console.log('GET BOOKING', booking);

		return booking;
	} catch (e) {
		console.log('GET BOOKINGS ERROR', e);
	}
}

export {
	getAccomodation,
	getAccomodations,
	createAccomodation,
	getEmployees,
	getEmployee,
	createEmployee,
	getBookings,
	getBooking
};
