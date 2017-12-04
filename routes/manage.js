const express 		= require('express');
const appRoot 		= require('app-root-path');
const router 		= express.Router();	
const assert 		= require('assert');
const bodyParser 	= require('body-parser');
const mongoose 		= require("mongoose");	
const User 			= require(appRoot + "/domain/models/user");
const middleware 	= require(appRoot + "/middleware/index"); 

router.get('/', middleware.checkLoggedIn, function(req, res, next) {
    res.render('manage', {
    	currentUser: req.user,
    	title: 'Manage'
    });
})

router.get('/edit', middleware.checkLoggedIn, function(req, res, next) {
    res.render('manage_edit', {
    	currentUser: req.user,
    	title: 'Profile Edit'
    });
})

router.post('/edit', middleware.checkLoggedIn, function(req, res, next) {
	User.findByIdAndUpdate(req.user._id, {
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
	})
    
})

module.exports = router;
