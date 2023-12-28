let express = require("express");
let router = express.Router();
let passport = require("passport");
let middleware = require("../middlewares/middleware");

let AdminController = require("../controllers/admin");

router.get(
	"/",
	passport.checkAuthentication,
	middleware.checkAdmin,
	middleware.getEmployees,
	AdminController.adminDashboard
);
router.get(
	"/:id",
	passport.checkAuthentication,
	middleware.checkAdmin,
	middleware.getEmployees,
	middleware.getAllReviews,
	AdminController.selectedUser
);

router.get('/addAdmin/:id', middleware.checkAdmin, AdminController.addAdmin)
module.exports = router;
