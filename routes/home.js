let express = require("express");

let router = express.Router();

let homeController = require("../controllers/home");
const passport = require("passport");

router.get('/', (req,res)=>{
    res.redirect('/sign-up')
})

router.get("/sign-up", passport.signedIn, homeController.signUpPage);

router.get("/sign-in",passport.signedIn, homeController.signInPage);

module.exports = router;
