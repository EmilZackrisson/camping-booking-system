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
	Vehicles: [{ length: Number, width: Number, regNr: String, type: String }],
	Accommodations: String,
	notes: String
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
