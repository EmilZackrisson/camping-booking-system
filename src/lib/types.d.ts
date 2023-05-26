import type { Document } from 'mongoose';
import type { Vehicle } from 'src/types';

interface IAccomodation extends Document {
	slotName: string;
	location: string;
	type: string;
	prices: number[];
	description?: string;
	electricity: boolean;
}

interface IBooking extends Document {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	dateArrival: Date;
	dateDepart: Date;
	numberOfPersons: number;
	Vehicles: [{ type: string; regNr: string; length: number; width: number }];
	Accommodations: string;
	notes?: string;
}

interface IEmployee extends Document {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: string;
	notes?: string;
	passwordHash: string;
	passwordSalt: string;
	sessions: [{ token: string; expires: Date }];
}

interface IFilteredEmployee extends Document {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: string;
	notes?: string;
}

export { IAccomodation, IBooking, IEmployee, IFilteredEmployee };
