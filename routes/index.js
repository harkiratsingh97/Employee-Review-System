let express = require("express");
let router = express.Router();

router.use("/", require("./admin"));
router.use("/employee", require("./employee"));

router.get("/", (req, res) => {
	return res.json(200, {
		message: "yes",
	});
});

module.exports = router;
