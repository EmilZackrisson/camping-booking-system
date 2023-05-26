import mongoose from 'mongoose';

const AccomodationSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	slotName: { type: String, required: true },
	location: { type: String, required: true },
	type: { type: String, required: true },
	prices: [{ type: Number, required: true }],
	description: { type: String, required: true },
	electricity: { type: Boolean, required: true }
});

export default mongoose.models.Accomodation || mongoose.model('Accomodation', AccomodationSchema);
