let express = require("express");
let router = express.Router();
let passport = require("passport");

let EmployeController = require("../controllers/employee");
const middleware = require("../middlewares/middleware");

router.post("/create-employee", EmployeController.createEmployee);

router.post(
	"/login",
	passport.authenticate("local", { failureRedirect: "/sign-in" }),
	EmployeController.loginUser
);

router.get("/logout", passport.checkAuthentication, (req, res) => {
	req.logOut((err) => {
		if (err) {
			return res.json(500, { message: "Error in logging out" });
		}
		return res.redirect("/sign-in");
	});
});
router.get(
	"/",
	passport.checkAuthentication,
	middleware.checkEmp,
	EmployeController.employeeDashboard
);

router.post(
	"/update",
	passport.checkAuthentication,
	EmployeController.updateEmployee
);

router.get(
	"/deleteUser/:id",
	passport.checkAuthentication,
	EmployeController.deleteUser
);

router.put(
	"/addForReview",
	passport.checkAuthentication,
	EmployeController.addForReview
);

router.put(
	"/removeFromReview",
	passport.checkAuthentication,
	EmployeController.removeFromReview
);
module.exports = router;
