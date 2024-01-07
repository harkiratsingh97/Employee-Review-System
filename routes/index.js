let express = require("express");
let router = express.Router();

router.use("/", require("./home"));

// Route used for Employee
router.use("/employee", require("./employee"));

// Route used for Admin
router.use("/admin", require("./admin"));

// Route used for Reviews
router.use("/review", require("./review"));

module.exports = router;
