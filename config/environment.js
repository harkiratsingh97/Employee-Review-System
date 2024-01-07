require("dotenv").config();

//Maintaning Dev Environment
let development = {
	db: "mongodb://127.0.0.1:27017/EmployeeReviewSystem",
};

//Maintaning Prod Environment
let production = {
	db: process.env.db,
};

module.exports = development;
