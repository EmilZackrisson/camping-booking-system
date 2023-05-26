interface IAccomodation {
	_id: string;
	slotName: string;
	location: string;
	type: string;
	prices: number[];
	description: string;
	electricity: boolean;
}

interface IBooking {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	dateArrival: Date;
	dateDepart: Date;
	numberOfPersons: number;
	Vehicles: [{ length: number; width: number; regNr: string; type: string }];
	Accommodations: string;
	notes: string;
}

interface IEmployee {
	_id: string;
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

export { IAccomodation, IBooking, IEmployee };
