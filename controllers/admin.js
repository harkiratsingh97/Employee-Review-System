let Employee = require("../models/employee");
let Reviews = require("../models/review");

//View Admin Dashboard
module.exports.adminDashboard = async function (req, res) {
	try {
		return res.render("admin_view.ejs", {
			title: "Admin Dashboard",
			employees: req.employees,

			user: res.locals.user,
		});
	} catch (err) {
		console.log("error here " + err);
		return;
	}
};

//View an Employee's detail in Admin View
module.exports.selectedUser = async function (req, res) {
	try {
		let employee = await Employee.findById(req.params.id);
		let employeesForFeedback = await Reviews.find({
			to_user: req.params.id,
		}).populate("from_user");

		employeesForFeedback = employeesForFeedback.filter(
			(e) => e.from_user.admin == false
		);
		const map = new Map();
		for (e of employeesForFeedback) {
			map.set(e.from_user.id, true);
		}

		let arr = req.employees.filter((e) => {
			if (!map.get(e.id)) {
				return e;
			}
		});

		arr = arr.filter((e) => e.id != employee.id);

		return res.render("adminSelectedUser.ejs", {
			title: "Admin Dashboard",
			employee: employee,
			employeesForFeedback: employeesForFeedback,
			employees: arr,
			reviews: req.reviews,
			user: res.locals.user,
		});
	} catch (err) {
		console.log(err);
		return;
	}
};

//Function to add an Employee as Admin
module.exports.addAdmin = async function (req, res) {
	try {
		
		let addedAdmin = await Employee.findByIdAndUpdate(req.params.id, {
			admin: true,
		});
		if (addedAdmin) {
			return res.json(200, {
				message: "User made admin successfully",
				data: addedAdmin,
			});
		} else {
			return res.status(400).json({
				message: "there is somne issue while creating the user as Admin.",
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};
