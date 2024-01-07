
let express = require("express");
let PORT = "8080";
let app = express();
var bodyParser = require("body-parser");
let db = require("./config/mongoose.js");
let env = require('./config/environment.js')
let expressLayouts = require("express-ejs-layouts");

const session = require("express-session");
const passport = require("passport");
const pasportLocal = require("./config/passport-local-strategy");

//Requiring Mongostore to store sessions
const MongoStore = require("connect-mongo");
const { eventNames } = require("./models/review.js");

//Settings up Layouts
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

//Setting up statics
app.use(express.static("assets"));

// Setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Setting up Mongo Store to store sessions
app.use(
	session({
		name: "employee",
		secret: "employee",
		store: MongoStore.create(
			{
				mongoUrl: env.db,
				autoRemove: "disabled",
			},
			function (err) {
				console.log(err || "connect-mongo setup ok");
			}
		),

		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},
	})
);

// Using passport for Auth and setting up current user
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Routing to routes
app.use("/", require("./routes/index.js"));

//Listening to Express server on given PORT
app.listen(PORT, (err) => {
	if (err) {
		console.log("Error in starting express server ", err);
	}
	console.log("Server is up and running at Port: 8080");
	return;
});
