let Employee = require("../models/employee");
let Review = require("../models/review");

//Middleware function to get all the employees from the database
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

//Middleware function to get all the Reviews from the database
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

//Middleware function to redirect to Admin dashboard if user is Admin
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

//Middleware function to redirect to Employee dashboard if user is Employee
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
