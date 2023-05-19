import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	dateArrival: Date,
	dateDepart: Date,
	numberOfPersons: Number,
	Vehicles: Array,
	Accommodations: String,
	notes: String
});

const EmployeeSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	role: String,
	notes: {
		type: String,
		default: ''
	},
	passwordHash: String,
	passwordSalt: String,
	sessions: Array
});

const Employee = mongoose.model('Employee', EmployeeSchema);

const Booking = mongoose.model('Booking', BookingSchema);

export { Booking, Employee };
