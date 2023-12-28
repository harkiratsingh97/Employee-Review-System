module.exports.signUpPage = function (req, res) {
	return res.render("sign_up.ejs", {
		title: "title",
		user: res.locals.user,
	});
};

module.exports.signInPage = function (req, res) {
	return res.render("sign_in.ejs", {
		title: "title",
		loggedIn: false,
		user: res.locals.user,
	});
};
