let express = require("express");
let router = express.Router();

router.get("/admin", (req, res) => {
	return res.json(200, { message: "You are on Admin page" });
});

module.exports = router;
