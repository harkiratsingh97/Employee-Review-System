let express = require("express");
let router = express.Router();

router.use("/", require("./home"));
router.use("/employee", require("./employee"));
router.use("/admin", require("./admin"));
router.use("/review", require("./review"));




module.exports = router;
