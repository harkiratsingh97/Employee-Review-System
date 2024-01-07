const mongoose = require("mongoose");
let Review = require("../models/review");

//Function to Create a nee review if doesn't already exist
module.exports.createNewReview = async function (req, res) {
	try {
		
		if (req.body.to_user == "undefined") {
			return res.redirect("back");
		}
		let reviewThere = await Review.find({
			to_user: req.body.to_user,
			from_user: req.body.from_user,
		});
		
		if (reviewThere.length) {
			await Review.findOneAndUpdate(
				{ to_user: req.body.to_user, from_user: req.body.from_user },
				{ review: req.body.review, rating: req.body.rating }
			);
			return res.redirect("back");
		}
		const newReview = await Review.create(req.body);
		if (newReview) {
			
			return res.redirect("back");
		} else {
			return res.json(400, {
				message: "There was some issue submitting the feedback",
				data: newReview,
			});
		}
	} catch (err) {
		console.log(err);
		return res.json(500, { message: "Internal Server Error" });
	}
};

//Function to update a Review
module.exports.updateReview = async function (req, res) {
	try {
		let updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body);
		if (updatedReview) {
			return res.json(200, {
				message: "Feedback Updated successfully",
				data: updatedReview,
			});
		} else {
			return res.json(400, {
				message: "There was some issue in updating the feedback",
				data: updatedReview,
			});
		}
	} catch (err) {
		console.log(err);
		return res.json(500, { message: "Internal Server Error" });
	}
};
