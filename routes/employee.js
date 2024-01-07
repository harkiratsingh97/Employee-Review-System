let express = require("express");
let router = express.Router();
let passport = require("passport");

let EmployeController = require("../controllers/employee");
const middleware = require("../middlewares/middleware");

//API endpoint to create a New Employee
router.post("/create-employee", EmployeController.createEmployee);

//API endpoint for Login (Employee/ Admin)
router.post(
	"/login",
	passport.authenticate("local", { failureRedirect: "/sign-in" }),
	EmployeController.loginUser
);

//API endpoint for Login (Employee/ Admin)
router.get("/logout", passport.checkAuthentication, (req, res) => {
	req.logOut((err) => {
		if (err) {
			return res.json(500, { message: "Error in logging out" });
		}
		return res.redirect("/sign-in");
	});
});

//API endpoint to get Employee Dashboard
router.get(
	"/",
	passport.checkAuthentication,
	middleware.checkEmp,
	EmployeController.employeeDashboard
);

//API endpoint to update Employee details
router.post(
	"/update",
	passport.checkAuthentication,
	EmployeController.updateEmployee
);

//API endpoint for deleting and employee
router.get(
	"/deleteUser/:id",
	passport.checkAuthentication,
	EmployeController.deleteUser
);

//API endpoint to add an employee in the review for other employee
router.put(
	"/addForReview",
	passport.checkAuthentication,
	EmployeController.addForReview
);

//API endpoint to remove an employee from the review for other employee
router.put(
	"/removeFromReview",
	passport.checkAuthentication,
	EmployeController.removeFromReview
);

module.exports = router;
