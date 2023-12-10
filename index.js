let express = require("express");
let PORT = "8080";
let app = express();
var bodyParser = require("body-parser");
let db = require("./config/mongoose.js");

const passportJwt = require("./config/passport-jwt-strategy.js");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./routes/index.js"));

app.listen(PORT, (err) => {
	if (err) {
		console.log("Error in starting express server ", err);
	}
	console.log("Server is up and running at Port: 8080");
	return;
});
