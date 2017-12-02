var express = require('express');
const appRoot = require('app-root-path');
var router = express.Router();	
var assert = require('assert');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");	
var passport = require("passport");
var User = require(appRoot + "/domain/models/user");


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

router.get('/', function(req, res, next) {
	res.render('owner', {allKeeperPosts: allKeeperPosts, currentUser: req.user});
});

router.get('/new_job_post', (req, res, next) => {
	res.render('job_post', {allKeeperPosts: allKeeperPosts, currentUser: req.user, title: 'New Job Post'});
});

module.exports = router;
