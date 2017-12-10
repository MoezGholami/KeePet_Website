const express 		= require('express');
const appRoot 		= require('app-root-path');
const router 		= express.Router();	
const assert 		= require('assert');
const bodyParser 	= require('body-parser');
const mongoose 		= require("mongoose");	
const User 			= require(appRoot + "/domain/models/user");
const middleware 	= require(appRoot + "/middleware/index"); 

router.get('/', function(req, res, next) {
    console.log('moez: in manage');
    console.log(req.user);
	User.findOne({gid: req.user.gid}, (err, existUser) => {
        if(err) {
          console.log(err);
        } else {
		    res.render('manage', {
		    	currentUser: existUser,
		    	title: 'Manage'
		    });
        }
    });
});

router.get('/edit', middleware.checkLoggedIn, function(req, res, next) {
	User.findOne({gid: req.user.gid}, (err, existUser) => {
        if(err) {
          console.log(err);
        } else {
		    res.render('manage_edit', {
		    	currentUser: existUser,
		    	title: 'Profile Edit'
		    });
        }
    });
});

router.post('/edit', middleware.checkLoggedIn, function(req, res, next) {
	User.findOne({gid: req.user.gid}, (err, existUser) => {
        if(err) {
          console.log(err);
        } else {
			User.findByIdAndUpdate(existUser._id, {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				description: req.body.description
			}, (err, updatedUser) => {
				if(err) {
					res.redirect('/manage/edit');
				} else {
					console.log(updatedUser);
					res.redirect('/manage');
				}
			});
        }
    });
});

module.exports = router;
