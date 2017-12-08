var mongoose = require("mongoose");

var GUserSchema = new mongoose.Schema({
	id: String,
    email:  String,
    firstName: String,
    lastName: String,
    description: {type: String, default: ""}
});

module.exports = mongoose.model("GUser", GUserSchema);
