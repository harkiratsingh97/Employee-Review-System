let express = require("express");
let router = express.Router();
let passport = require("passport");

let EmployeController = require("../controllers/employee");
router.post("/create-employee", EmployeController.createEmployee);
router.post("/login", EmployeController.loginUser);
router.get(
	"/profile",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.status(200).json({ message: "Hey you are on profile" });
	}
);
module.exports = router;
