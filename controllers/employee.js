let Employee = require("../models/employee");
let Reviews = require("../models/review");
//Registration of new Employee
module.exports.createEmployee = async function (req, res) {
	try {
		//Check whether Email is already present
		let employeeThere = await Employee.findOne({ email: req.body.email });

		if (employeeThere) {
			return res.status(400).json({ message: "already there" });
		}

		let newEmployee = await Employee.create(req.body);

		if (newEmployee) {
			return res.status(200).json({ message: "Successfully created" });
		} else {
			return res.status(400);
		}
	} catch (err) {
		console.log("Error in creating Employee", err);
	}
};

module.exports.loginUser = async function (req, res) {
	return res.redirect("/employee");
};

module.exports.employeeDashboard = async function (req, res) {
	const reviewByUser = await Reviews.find({
		from_user: req.user.id,
		review: undefined,
	}).populate("to_user");
	// console.log(reviewByUser);

	return res.render("employee_view.ejs", {
		title: "Employee Dashboard",
		currentEmployee: req.user,
		pendingForReview: reviewByUser,
		user: res.locals.user,
		loggedIn: true,
		userSelected: "undefined",
	});
};

module.exports.updateEmployee = async function (req, res) {
	try {
		let updatedEmployee = await Employee.findByIdAndUpdate(
			req.body.id,
			req.body
		);
		return res.redirect("back");
	} catch (err) {
		console.log(err);
		return;
	}
};

module.exports.deleteUser = async function (req, res) {
	try {
		let deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
		await Reviews.deleteMany({ to_user: req.params.id });
		await Reviews.deleteMany({ from_user: req.params.id });

		if (deletedEmployee) {
			return res.redirect("/employee");
		} else {
			return res.json(400, { message: "Error deleting user" });
		}
	} catch (err) {
		console.log(err);
		return res.json(500, { message: "Internal Server error" });
	}
};

module.exports.addForReview = async function (req, res) {
	try {
		// let updateEmployee = await Employee.findByIdAndUpdate(req.query.id, {
		// 	$push: { feedbackRequired: req.query.idToAdd },
		// });
		let newReview = await Reviews.create({
			from_user: req.query.idToAdd,
			to_user: req.query.id,
		});
		newReview = await Reviews.findOne({
			from_user: req.query.idToAdd,
			to_user: req.query.id,
		}).populate("from_user");
		// newReview.populate("from_user");
		console.log(newReview);
		return res.json(200, {
			message: "Added successfully",
			data: newReview,
		});
	} catch (err) {
		console.log(err);
		return;
	}
};

module.exports.removeFromReview = async function (req, res) {
	try {
		// let updateEmployee = await Employee.findByIdAndUpdate(req.query.id, {
		// 	$pull: { feedbackRequired: req.query.idToRemove },
		// });
		console.log(req.query.idToRemove, req.query.id);
		let deletedReview = await Reviews.findOneAndDelete({
			from_user: req.query.idToRemove,
			to_user: req.query.id,
		}).populate("from_user");

		console.log(deletedReview);
		return res.json(200, {
			message: "Added successfully",
			data: deletedReview,
		});
	} catch (err) {
		console.log(err);
		return;
	}
};
