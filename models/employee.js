let mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		admin: {
			type: Boolean,
			default: false,
		},
		// feedbackRequired: {
		// 	type: [],
		// 	ref: "Employee",
		// },
	},
	{
		timestamps: true,
	}
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
