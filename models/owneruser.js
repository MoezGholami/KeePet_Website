var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var OwnerUserSchema = new mongoose.Schema({
	username: String,
	password: String
});

OwnerUserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("OwnerUser", OwnerUserSchema);