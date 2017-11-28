var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserProfileSchema = new Schema({
	
})

UserProfileSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("UserProfile", UserProfileSchema);