var mongoose = require("mongoose");
var extend = require('mongoose-schema-extend');
var Schema = mongoose.schema;

var PetSchema = new mongoose.Schema({
    birthDate: Date,
    sex: String
});

var DogSchema = PetSchema.extend({
  breedName : String
});

module.exports = mongoose.model("Pet", PetSchema);
