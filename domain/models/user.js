const appRoot   = require('app-root-path');
const BasePet   = require(appRoot + '/domain/models/pet').basePet;
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
    email:  String,
    firstName: String,
    lastName: String
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.getAllPets = function(callback) {
    //callback(docs, error);
    var that = this;
    BasePet.find({'owner': that._id}, function(error, docs) {
        console.log(docs);
        callback(docs, error);
    });
};


module.exports = mongoose.model("User", UserSchema);
