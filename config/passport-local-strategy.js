const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const Employee = require("../models/employee");

//authentication using passport
passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passReqToCallback: true,
		},

		async function (req, email, password, done) {
			try {
				const employee = await Employee.findOne({ email: email });

				if (!employee || employee.password != password) {
					// req.flash('error', 'Invalid Username/Password');
					return done(null, false);
				}

				return done(null, employee);
			} catch (err) {
				// req.flash('error', err);
				return done(err);
			}
		}
	)
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (employee, done) {
	done(null, employee.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
	try {
		const employee = await Employee.findById(id);
		return done(null, employee);
	} catch (err) {
		console.log("Error in finding user --> Passport");
		return done(err);
	}
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
	// if the user is signed in then pass the control to the next function (Controller's action)
	if (req.isAuthenticated()) {
		return next();
	} else {
		return res.redirect("/sign-in");
	}
};

passport.setAuthenticatedUser = function (req, res, next) {
	if (req.isAuthenticated()) {
		//req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
		res.locals.user = req.user;
	}
	return next();
};

// if the use is signed in then dont allow them to go to sign in or sign up page
passport.signedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/employee");
	}
	next();
};

module.exports = passport;
