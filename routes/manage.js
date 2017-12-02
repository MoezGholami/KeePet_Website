const express 		= require('express');
const appRoot 		= require('app-root-path');
const router 		= express.Router();	
const assert 		= require('assert');
const bodyParser 	= require('body-parser');
const mongoose 		= require("mongoose");	
const User 			= require(appRoot + "/domain/models/user");
const middleware 	= require(appRoot + "/middleware/index"); 

router.get('/:id', middleware.checkLoggedIn, function(req, res, next) {
	User.findById(req.params.id, (err, foundUser) => {
		if(err) {
			console.log(err);
		} else {
			res.render('manage', {firstname: foundUser.firstName, lastname: foundUser.lastName});
		}
	});
})

module.exports = router;