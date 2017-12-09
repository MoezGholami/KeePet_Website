const express = require('express');
const appRoot = require('app-root-path');
const router = express.Router();	
const assert = require('assert');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");	
const passport = require("passport");
const middleware 	= require(appRoot + "/middleware/index"); 
const User = require(appRoot + "/domain/models/user");
const Pet = require(appRoot + "/domain/models/pet");
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


router.get('/view_pet/:id', middleware.checkLoggedIn, (req, res, next) => {
    
});

router.get('/store_pet', middleware.checkLoggedIn, (req, res, next) => {
    res.render('store_pet', {currentUser: req.user, title: 'Create a pet profile'})});

router.get('/owned_pets', middleware.checkLoggedIn, (req, res, next) => {
    var isApi = false || req.query.isApi;
    req.user.getAllPets((pets, error)=>{
        if(error)
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(403);
            res.send(JSON.stringify(error));
        }
        else if(isApi) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify(pets));
        }
        else {
            res.send({redirect: '/pets'});
        }
    });
});

router.post('/store_pet', middleware.checkLoggedIn, (req, res, next) => {
    var params = req.body;
    console.log('moez: modelname');
    console.log(params);
    var isApi = false || params.isApi;
    params.owner = req.user._id;
    var modelName = params.modelName;
    Pet.storePet(modelName, params, (error, instance) => {
        if(instance)
            instance.owner = undefined;
        if(error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(403);
            res.send(JSON.stringify(error));
        }
        else if(isApi) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify(instance));
        }
        else {
            console.log(instance._id);
            res.render("this is a new pet")
        }
    });
});

module.exports = router;
