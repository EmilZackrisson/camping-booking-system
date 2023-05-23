// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	type BookingForm = {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;

		dateArrival: Date;
		dateDepart: Date;

		numberOfPersons: number;

		Vehicles: Vehicle[];

		Accommodations: string;

		notes: string?;
	};

	type Vehicle = {
		length: number;
		width: number;
		regNr: string;
	};
}

export {};
