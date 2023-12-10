let passport = require("passport");
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
var Employee = require("../models/employee");

var opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: "Employee",
};

passport.use(
	new JwtStrategy(opts, async function (jwt_payload, done) {
		try {
			const employee = Employee.findById(jwt_payload._id);

			if (employee) {
				return done(null, employee);
			} else {
				return done(null, false);
				// or you could create a new account
			}
		} catch (err) {
			if (err) {
				return done(err, false);
			}
		}
	})
);

module.exports = passport;
