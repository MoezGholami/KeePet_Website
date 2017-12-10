var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	id: String,
    email:  String,
    firstName: String,
    lastName: String,
    description: {type: String, default: ""},
    image: {type: String, default: ""}
});

module.exports = mongoose.model("User", UserSchema);