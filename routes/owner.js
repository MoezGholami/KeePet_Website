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
const async = require('async');
var multer  = require('multer');
var upload = multer();


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

router.get('/new_job_post', middleware.checkLoggedIn, (req, res, next) => {
    console.log(req.user);
    req.user.getAllPets((pets)=>{
        console.log(pets);
        res.render('job_post', {allKeeperPosts: allKeeperPosts, 
            currentUser: req.user,
            pets: pets, 
            title: 'New Job Post'
        });
    });
});

router.post('/new_job_post_upload', middleware.checkLoggedIn, (req, res, next) => {
    console.log('moezgholami: job:');
    console.log(req.user);
    JobPost.store(req.user._id, req.body, function(error, instance){
        console.log('saved successfully');
        res.redirect('/owner');
    });
});

router.post('/insec_new_job_post_upload', (req, res, next) => {
    console.log('START OF REQUEST BODY');
    console.log(req.body);
    console.log('END OF REQUEST BODY');
    var pets = req.body.pets;
    var email = req.body.email;
    var PetIDs = [];
    User.findOne({email: email}, function(error, user){
        async.map(pets, (pet, done) => {
            pet.photo = new Buffer(pet.image, 'base64');
            pet.owner = user._id;
            Pet.storePet(pet.type, pet, (error, instance)=>{
                if(instance)
                    PetIDs.push(instance._id);
                done(error, instance);
            });
        }, (error, pets)=> {
            var params = {};
            params.PetIDs = PetIDs;
            params.start_date = req.body.start_date;
            params.end_date = req.body.end_date;
            params.latitude = req.body.latitude;
            params.longitude = req.body.longitude;
            params.description = req.body.description;
            params.addons = req.body.addons;
            JobPost.store(user._id, params, (error, instance) => {
                res.send({hello: 'moez'});
            });
        });
    });
});


router.get('/all_job_posts', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    JobPost.find().populate([{path: 'pets', model: 'Pet'}, {path: 'owner', model: 'User'}]).exec((error, posts) => {
        async.map(posts, (post, done) => {
            console.log(post);
            var p = JSON.parse(JSON.stringify(post));
            for(var i=0; i<post.pets.length; i++)
            {
                var url = post.pets[i].getPhotoUrl();
                p.pets[i].photo = url;
            }
            done(null, p);
        }, (error, posts)=>{res.send(JSON.stringify(posts));});
    });
});

router.get('/remove_job_post/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    JobPost.remove({_id: req.params.id}, (error)=> {res.send(error);});
});

router.get('/remove_job_post_api/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    JobPost.remove({_id: req.params.id}, ()=> {res.send({email: 'ali'});});
});

router.post('/all_job_posts', middleware.checkLoggedIn, (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(posts));
});


router.get('/view_pet/:id', (req, res, next) => {
    Pet.basePet.findById(req.params.id, (err, foundPet) => {
        if(err) {
            console.log(err);
        } else {
            res.render('view_pet', {pet: foundPet, currentUser: req.user, title: 'Your Pets'});
        }
    });
});

router.get('/store_pet', middleware.checkLoggedIn, (req, res, next) => {
    res.render('store_pet_select', {currentUser: req.user, title: 'Choose a pet'});
});

router.post('/store_pet', middleware.checkLoggedIn, (req, res, next) => {
    var category = req.body.category;
    Pet.getPetSchema(category, (error, schema) => {
        if(error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(403);
            res.send(JSON.stringify(error));
        } else {
            res.render('store_pet', {category: category, schema: schema, currentUser: req.user, title: 'Create a pet profile'});
        }
    });
});

router.post('/post_pet',[upload.single('photo')], (req, res, next) => {
    var params = req.body;
    console.log('moez: body');
    console.log(params);
    var isApi = false || params.isApi;
    params.owner = req.user._id;
    params.photo = req.file.buffer;
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
            res.redirect('/owner/view_pet/' + instance._id);
        }
    });
});

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
            res.render('owned_pets', {pets: pets, currentUser: req.user, title: 'Pets you own'});
        }
    });
});

router.get('/pet_photo/:id', (req, res, next) => {
    Pet.basePet.findById(req.params.id, (error, animal) => {
        res.setHeader('Content-Type', 'image/png');
        res.send(animal.photo);
    });
});

module.exports = router;
