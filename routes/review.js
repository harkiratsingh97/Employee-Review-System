let express = require("express");
let router = express.Router();

const reviewController = require("../controllers/review");

//API endpoint to create a new review
router.post("/createReview", reviewController.createNewReview);

module.exports = router;
