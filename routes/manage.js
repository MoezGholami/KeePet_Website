const express 		= require('express');
const appRoot 		= require('app-root-path');
const router 		= express.Router();	
const assert 		= require('assert');
const bodyParser 	= require('body-parser');
const mongoose 		= require("mongoose");	
const User 			= require(appRoot + "/domain/models/user");
const middleware 	= require(appRoot + "/middleware/index"); 

router.get('/:id', middleware.checkLoggedIn, function(req, res, next) {
    console.log(req.user);
    res.render('manage', {firstname: req.user.firstName, lastname: req.user.lastName});
})

module.exports = router;
