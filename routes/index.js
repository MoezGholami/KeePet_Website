const express 		= require('express');
const router 		= express.Router();	
const appRoot 		= require('app-root-path');
const bodyParser 	= require('body-parser');
const mongoose 		= require("mongoose");	
const passport 		= require("passport");
const User 			= require(appRoot + "/domain/models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

// router.get('/register', function(req, res, next) {
// 	res.render('register');
// })

// router.post('/register', function(req, res, next) {
// 	var newUser = new User({
// 		username: req.body.username, 
// 		email: req.body.email,
// 		firstName: req.body.firstname,
// 		lastName: req.body.lastname
// 	});

// 	User.register(newUser, req.body.password, function(err, user) {
// 		if(err) {
// 			console.log(err);
// 			return res.render('register');
// 		} else {
// 			passport.authenticate("local")(req, res, function() {
// 				res.redirect('/owner');
// 			});
// 		}
// 	});
// });

// router.get('/login', function(req, res, next) {
// 	res.render('login');
// });

// router.post('/login', passport.authenticate("local", 
// 	{
// 		successRedirect: "/owner",
// 		failureRedirect: "/login"
// 	}), function(req, res, next) {
// 		res.send("login logic");
// });

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/owner');
});


module.exports = router;
