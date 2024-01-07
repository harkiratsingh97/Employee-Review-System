let express = require("express");
let router = express.Router();
let passport = require("passport");
let middleware = require("../middlewares/middleware");
let AdminController = require("../controllers/admin");

//API endpoint to get Admin Dashboard
router.get(
	"/",
	passport.checkAuthentication,
	middleware.checkAdmin,
	middleware.getEmployees,
	AdminController.adminDashboard
);

//API endpoint to get Admin Dashboard for Selected User
router.get(
	"/:id",
	passport.checkAuthentication,
	middleware.checkAdmin,
	middleware.getEmployees,
	middleware.getAllReviews,
	AdminController.selectedUser
);

//API endpoint to add any Employee as Admin
router.get('/addAdmin/:id', middleware.checkAdmin, AdminController.addAdmin)

module.exports = router;
