import mongoose from 'mongoose';

const AccomodationSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	slotName: { type: String, required: true },
	location: { type: String, required: true },
	type: { type: String, required: true },
	price: [{ type: Number, day: Number }],
	description: { type: String, required: true },
	electricity: { type: Boolean, required: true }
});

export default mongoose.models.Booking || mongoose.model('Booking', AccomodationSchema);
