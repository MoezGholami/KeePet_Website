const express = require('express');
const appRoot = require('app-root-path');
const router = express.Router();	
const assert = require('assert');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");	
const passport = require("passport");
const middleware 	= require(appRoot + "/middleware/index"); 
const User = require(appRoot + "/domain/models/user");
const JobPost = require(appRoot + "/domain/models/jobPost");


//this is test post data
var allKeeperPosts = [];
for(var i=0; i<16; i++)
    allKeeperPosts.push({
		name: "Keivin",
		image: "http://www.printawallpaper.com/upload/5-colorful-home-decoration-ideas-1.jpg"
	});

router.get('/', function(req, res, next) {
	res.render('owner', {allKeeperPosts: allKeeperPosts, currentUser: req.user});
});

router.get('/new_job_post', (req, res, next) => {
	res.render('job_post', {allKeeperPosts: allKeeperPosts, currentUser: req.user, title: 'New Job Post'});
});

router.post('/new_job_post_upload', middleware.checkLoggedIn, (req, res, next) => {
    JobPost.store(req.user._id, req.body).then(()=>{
        //TODO: show job after that
        console.log('saved successfully');
        res.send({redirect: '/'});
    });
});

var post = {
    animals: [
        {
            type: 'Dog',
            name: 'Joe',
            breed: 'Husky',
            sex: 'male',
            age_month: '34'
        },
        {
            type: 'Dog',
            name: 'Jeni',
            breed: 'Husky',
            sex: 'female',
            age_month: '30'
        }
    ],
    from: '2017-11-06T22:31:54.466Z',
    to: '2017-12-06T22:31:54.466Z',
    description: 'some description',
    options: [
        'opt1', 'opt2', 'opt4'
    ]
};
var posts = [];
for(var i=0; i<5; i++)
    posts.push(post);

router.get('/all_job_posts', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(posts));
});

router.post('/all_job_posts', middleware.checkLoggedIn, (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(posts));
});

module.exports = router;
