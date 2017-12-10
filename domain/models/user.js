const appRoot   = require('app-root-path');
const BasePet   = require(appRoot + '/domain/models/pet').basePet;
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	gid: String,
    email:  String,
    firstName: String,
    lastName: String,
    description: {type: String, default: ""},
    image: {type: String, default: ""}
});

UserSchema.methods.getAllPets = function(callback) {
    //callback(docs, error);
    var that = this;
    BasePet.find({'owner': that._id}, function(error, docs) {
        console.log(docs);
        callback(docs, error);
    });
};
var User = mongoose.model("User", UserSchema);


module.exports = User;
