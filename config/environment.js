require("dotenv").config();

let development = {
	db: "mongodb://127.0.0.1:27017/EmployeeReviewSystem",
};

let production = {
	db: process.env.db,
};
module.exports = production;
