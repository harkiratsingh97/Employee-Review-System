let Employee = require("../models/employee");
let jwt = require("jsonwebtoken");

//Registration of new Employee
module.exports.createEmployee = async function (req, res) {
	try {
		//Check whether Email is already present
		let employeeThere = await Employee.findOne({ email: req.body.email });

		if (employeeThere) {
			return res.json(200, { message: "Email is already registered" });
		}

		let newEmployee = await Employee.create(req.body);

		if (newEmployee) {
			return res.send(200, { message: "Employee created successfully" });
		} else {
			return res.send(400, {
				message: "User is not created, Please provide proper information",
			});
		}
	} catch (err) {
		console.log("Error in creating Employee", err);
	}
};

module.exports.loginUser = async function (req, res) {
	try {
		const user = await Employee.findOne({ email: req.body.email });
		if (!user || user.password != req.body.password) {
			return res.json(422, {
				message: "Invalid Username or Password",
			});
		} else {
			return res.json(200, {
				message: "User signed in Successfully",
				data: {
					token: jwt.sign(user.toJSON(), "Employee", { expiresIn: "100000" }),
				},
			});
		}
	} catch (err) {
		return res.json(500, { message: "Internal Server Error" });
	}
};
