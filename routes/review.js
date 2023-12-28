let express = require("express");
let router = express.Router();

const reviewController = require("../controllers/review");

router.post("/createReview", reviewController.createNewReview);

module.exports = router;
