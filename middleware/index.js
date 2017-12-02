const mongoose = require("mongoose");
const passport = require("passport");	

var middlewareObj = {};

middlewareObj.checkLoggedIn = function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/owner/login');
}

module.exports = middlewareObj;