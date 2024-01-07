const mongoose = require("mongoose");

//A model for Reviews stored in DB

const reviewSchema = new mongoose.Schema(
	{
		//Using rating for Star rating of employees
		rating: {
			type: Number,
			min: [0, "Must be at least 0, got {VALUE}"],
			max: [5, "Must be at below 5, got {VALUE}"],
		},

		//This is the actual review written by other employee
		review: {
			type: String,
			
		},

		//This defines the from user in the review
		from_user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			required: true,
		},

		//This defines the to user in the review
		to_user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
