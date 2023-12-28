const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
	{
		rating: {
			type: Number,
			min: [0, "Must be at least 0, got {VALUE}"],
			max: [5, "Must be at below 5, got {VALUE}"],
		},
		review: {
			type: String,
			// required: true,
		},
		from_user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			required: true,
		},
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
