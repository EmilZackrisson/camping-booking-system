import mongoose from 'mongoose';

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
	sessions: [{ token: String, expires: Date }]
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
