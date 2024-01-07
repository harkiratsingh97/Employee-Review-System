let express = require("express");

let router = express.Router();

let homeController = require("../controllers/home");
const passport = require("passport");

//API endpoint for redirecting to Sign up page
router.get('/', (req,res)=>{
    res.redirect('/sign-up')
})

//API endpoint for Sign up page
router.get("/sign-up", passport.signedIn, homeController.signUpPage);

//API endpoint for Sign in page
router.get("/sign-in",passport.signedIn, homeController.signInPage);

module.exports = router;
