let Employee = require("../models/employee");
let Review = require("../models/review");
module.exports.getEmployees = async function (req, res, next) {
	try {
		let employees = await Employee.find({ admin: false });
		req.employees = employees;
		return next();
	} catch (err) {
		console.log("error here " + err);
		return;
	}
};

module.exports.getAllReviews = async function (req, res, next) {
	try {
		let reviews = await Review.find({ to_user: req.params.id }).populate(
			"from_user"
		);

		if (reviews) {
			reviews.rating = 0;
			let numberofActualReviews = 0;
			for (let review of reviews) {
				if (review.review != undefined) {
					reviews.rating += review.rating;
					numberofActualReviews++;
				}
			}
			reviews.rating /= numberofActualReviews;
			req.reviews = reviews;

			return next();
		} else {
			return res.json(400, { message: "Error getting reviews" });
		}
	} catch (err) {
		console.log(err);
		return res.json(500, { message: "Internal server error" });
	}
};

module.exports.checkAdmin = async function (req, res, next) {
	if (req.user) {
		if (req.user.admin == true) {
			return next();
		} else {
			return res.redirect("/employee");
		}
	}
	return res.redirect("/sign-in");
};

module.exports.checkEmp = async function (req, res, next) {
	if (req.user) {
		if (req.user.admin == true) {
			return res.redirect("/admin");
		} else {
			return next();
		}
	}
	next();
};
