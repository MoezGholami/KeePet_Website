var express = require('express');
var router = express.Router();	
var assert = require('assert');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");	
var passport = require("passport");
var User = require("../models/user");


//this is test post data
var allKeeperPosts = [
	{
		name: "Keivin",
		image: "http://www.printawallpaper.com/upload/5-colorful-home-decoration-ideas-1.jpg"
	},
	{
		name: "Keivin",
		image: "http://www.printawallpaper.com/upload/5-colorful-home-decoration-ideas-1.jpg"
	},
	{
		name: "Keivin",
		image: "http://www.printawallpaper.com/upload/5-colorful-home-decoration-ideas-1.jpg"
	},
	{
		name: "Keivin",
		image: "https://lh3.ggpht.com/zKLJhElVirXeK5eXg0nFIj0LyJtTdF65657L0yXgkl8XNqGJH2leEuGX26BjUib4QYKt=h900"
	},
	{
		name: "Keivin",
		image: "http://www.printawallpaper.com/upload/5-colorful-home-decoration-ideas-1.jpg"
	},
	{
		name: "Keivin",
		image: "http://www.printawallpaper.com/upload/5-colorful-home-decoration-ideas-1.jpg"
	},
	{
		name: "Keivin",
		image: "http://www.printawallpaper.com/upload/5-colorful-home-decoration-ideas-1.jpg"
	},
	{
		name: "Keivin",
		image: "https://lh3.ggpht.com/zKLJhElVirXeK5eXg0nFIj0LyJtTdF65657L0yXgkl8XNqGJH2leEuGX26BjUib4QYKt=h900"
	},
	{
		name: "Keivin",
		image: "http://www.printawallpaper.com/upload/5-colorful-home-decoration-ideas-1.jpg"
	}

];

/* GET home page. */

router.get('/', function(req, res, next) {
	res.render('owner', {allKeeperPosts: allKeeperPosts, currentUser: req.user});
});

router.post('/', function(req, res, next) {
	res.render('owner', {allKeeperPosts: allKeeperPosts});
});

router.get('/register', function(req, res, next) {
	res.render('register');
})

router.post('/register', function(req, res, next) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render('register');
		} else {
			passport.authenticate("local")(req, res, function() {
				res.redirect('/owner');
			});
		}
	});
});

router.get('/login', function(req, res, next) {
	res.render('login');
});

router.post('/login', passport.authenticate("local", 
	{
		successRedirect: "/owner",
		failureRedirect: "/owner/login"
	}), function(req, res, next) {
		res.send("login logic");
});

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/owner');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/owner/login');
}

router.get('/manage', isLoggedIn, function(req, res, next) {
	res.render('manage');
})


module.exports = router;
